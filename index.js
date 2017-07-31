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
      return '<input type="text" required placeholder="Estoy Buscando" itemtype="//schema.org/SearchAction" max-length="120" id="'+ id +'" class="search-field" name="'+ id +'">';
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
    var objOnlyfour = [];

    results.reduce(function(previous, current, index){
      if(index < 5) {
        // console.log(current);
        objOnlyfour.push(current);
      }
    });

    res.render('index', {
      title: 'ML - Search',
      products: objOnlyfour,
      shipping: objOnlyfour.shipping,
      seller_address: objOnlyfour.seller_address,
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
          title: prdDt.data.title,
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
app.use('/theme', express.static(__dirname + '/node_modules/chico/dist/ui'));

app.listen('3001')
