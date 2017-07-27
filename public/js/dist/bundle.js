(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App = App || {};

App.MercadoLivre = (function ($, win, doc) {
  'use strict';

    function setup () {
      // for (var i = 0; i < elements.length; i++) {
      //   addEvent(elements[i], 'change', function change() {
      //     filter();
      //   });
      // }
      //
      // for(i = 0; i < page.length; i ++) {
      //   addEvent(page[i], 'click', paginate);
      // }
      // var carousel = new ch.Carousel(ch('#dm_crs_df')[0], {
      //     autoHeight: false,
      //     'async': 10
      // });


      // live('.search-bt', 'click', function(el, e, dataEl){
      //   var keySearch = doc.getElementById('search-products').value;
      //   location.replace('/search/' + keySearch);
      //   // console.log(keySearch)
      //   el.preventDefault();
      // });

      var caroulselEl = document.getElementById("dm_crs_df");
      if (caroulselEl && caroulselEl.hasChildNodes()) {
        setTimeout(function(){
          var el = ch('#dm_crs_df')[0];
          var carousel = new ch.Carousel(el, {
              'fx': false,
              'autoHeight': false
          })
        }, 100);
      }

    }
    function getData (url, success){
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      xhr.open('GET', url + "?" + getParams() );
      xhr.onreadystatechange = function() {
          if (xhr.readyState>3 && xhr.status==200) success(xhr.responseText);
      };
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.send();
      return xhr;
    }
    function success (data){
      var current = doc.querySelector('body'),
          live = doc.createElement('html'),
          selector = '#result-list';
      live.innerHTML = data;
      current.querySelector(selector).innerHTML = live.querySelector(selector).innerHTML;

      setup();
    }
    function live(selector, event, callback, context) {
      addEvent(context || document, event, function(e) {
          var qs = (context || document).querySelectorAll(selector);
          if (qs) {
              var el = e.target || e.srcElement, index = -1;
              var dataEl = el.dataset.id;
              while (el && ((index = Array.prototype.indexOf.call(qs, el)) === -1)) el = el.parentElement;
              if (index > -1) callback.call(el, e, dataEl);
          }
      });
    }
    function addEvent (el, type, handler){
      if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
    }
    function removeEvent (el, type, handler){
      if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
    }

    function filter () {
      var form = doc.getElementById('formSearch'),
        inputs = form.getElementsByTagName('input'),
        i,
        input;

      for (i = 0; i < inputs.length; i ++) {
        input = inputs[i];

        if (input.value !== '') {
          params[input.getAttribute('name')] = input.value;
        } else {
          delete params[input.getAttribute('name')];
        }
      }

      getData('/filter', success);
    }

    return {
      'setup': setup
    };

}(undefined, window, window.document));
App.MercadoLivre.setup();

},{}]},{},[1]);
