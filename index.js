var express = require('express')
var app = express()
var fs = require('fs')
var _ = require('lodash')
var engines = require('consolidate')
var axios = require('axios');
var exphbs = require('express-handlebars');

app.engine('hbs', exphbs({extname: 'hbs', defaultLayout: 'layout', layoutDir: __dirname + '/views/layouts/'}))

var hbs = exphbs.create({
  helpers: {
    input_label: function (context, options) {
      id = options.hash.id;
      return '<label for="'+ id +'" class="control-label">'+ context +'</label>';
    },
    input_text: function (context, options) {
      id = options.hash.id;
      return '<input type="text" placeholder="Estoy Buscando" max-length="120" id="'+ id +'" class="search-field" name="'+ id +'">';
    },
    breadcrumb: function (context, options) {
      var category = context.data.root.category;
      var html = "<ul class='product-list'>";

       axios.get('https://api.mercadolibre.com/categories/' + category)
        .then((response) => {
            var res = response;
            var myStringArray = res.data.path_from_root;

            for(var i=0, j=myStringArray.length; i<j; i++) {
              html = html + "<li>" + myStringArray[i].name + "</li>";
            }
            html +=  "</ul>";
          })
          .catch((error) => {
            console.log(error)
          });
          return html;

      }
    }
});
app.set('views', './views')
app.set('view engine', 'hbs')

app.get('/', function (req, res) {

  axios.get('https://api.mercadolibre.com/sites/MLA/search?q=' + req.query)
  .then(function (response) {
    res.render('index', {
      title: 'ML - Anúncios',
      helpers: hbs.helpers
    })

  })
  .catch(function (error) {
    console.log(error);
  });
})

app.get('/items?:search', function (req, res, next) {
  axios.get('https://api.mercadolibre.com/sites/MLA/search?q=' + req.query.search)
  .then(function (response) {
    var results = response.data.results;
    res.render('index', {
      title: 'ML - Search',
      products: results,
      shipping: results.shipping,
      seller_address: results.seller_address,
      helpers: hbs.helpers
    })
  })
  .catch(function (error) {
    console.log(error);
  });
});


app.get('/items/:tagId', function (req, res, next) {
  function getProductDetails() {
    return axios.get('https://api.mercadolibre.com/items/' + req.params.tagId);
  }

  function getProductDescription() {
    return axios.get('https://api.mercadolibre.com/items/' + req.params.tagId + '/description');
  }

  axios.all([getProductDetails(), getProductDescription()])
    .then(axios.spread(function (prdDt, prdDes) {
        var obj = {
          titlePage: 'ML - Produto',
          idPdp: prdDt.data.id,
          titlePdp: prdDt.data.title,
          permalink: prdDt.data.permalink,
          pictures: prdDt.data.pictures,
          thumbnail: prdDt.data.thumbnail,
          price: prdDt.data.price,
          descriptionTxt: prdDes.data.text,
          descriptionPlainTxt: prdDes.data.plain_text,
          descriptionSnapshotUrl: prdDes.data.snapshot.url,
          freeShipping: prdDt.data.shipping.free_shipping,
          category: prdDt.data.category_id,
          helpers: hbs.helpers
        };
        res.render('pdp', obj);
    }));
});

app.use(express.static('public'));
// app.use('/theme', express.static(__dirname + '/node_modules/chico/dist/ui'));

app.listen('3001')
