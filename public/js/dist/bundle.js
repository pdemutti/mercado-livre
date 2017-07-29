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


      var buyBtn = document.getElementById("buy-btn");
      if (buyBtn) {
        var modalDom = new ch.Modal(ch('#buy-btn')[0], {
          'content': ch('#dm_mdl_dom_cnt')[0]
        });
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
    return {
      'setup': setup
    };

}(undefined, window, window.document));
App.MercadoLivre.setup();

},{}]},{},[1]);
