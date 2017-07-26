(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var App = App || {};

App.MercadoLivre = (function ($, win, doc) {
  'use strict';

    var params = {};

    function setup () {
      var page = doc.getElementsByClassName('item-page');
      var elements = doc.getElementsByClassName('filter-field');
      for (var i = 0; i < elements.length; i++) {

        /* ONLY NUMBER ALLOWED */
        var RemoveE = function (options) {
            if(this.prepare(options)) {
            this.bind(options);
          }
        }
        RemoveE.prototype.bind = function (options) {
          addEvent(elements[i], 'keydown', this.removeLetterE);
        }
        RemoveE.prototype.prepare = function (options) {
          this.input = doc.getElementsByClassName(options.class);
          this.name = this.input ? this.input.name : '';
          return this.input;
        }
        RemoveE.prototype.removeLetterE = function (evt) {
          return evt.key == 'e' ? evt.preventDefault() : true;
        }
        new RemoveE({'class': 'filter-field'});

        addEvent(elements[i], 'change', function change() {
          filter();
        });
      }

      for(i = 0; i < page.length; i ++) {
        addEvent(page[i], 'click', paginate);
      }
    }
    function onlyValid(){
      var RemoveE = function (options) {
          if(this.prepare(options)) {
          this.bind(options);
        }
      }
      RemoveE.prototype.bind = function (options) {
        addEvent(elements[i], 'keydown', this.removeLetterE);
      }
      RemoveE.prototype.prepare = function (options) {
        this.input = doc.getElementsByClassName(options.class);
        this.name = this.input ? this.input.name : '';
        return this.input;
      }
      RemoveE.prototype.removeLetterE = function (evt) {
        return evt.key == 'e' ? evt.preventDefault() : true;
      }
        new RemoveE({'class': 'filter-field'});
    }

    function getParams() {
      var urlEncondedParams = '';
      var i;
      var prop;
      var date = new Date();

      for (prop in params) {
        urlEncondedParams += prop + "=" + params[prop] + "&";
      }

      urlEncondedParams += '_' + date.getTime();

      return urlEncondedParams;
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
