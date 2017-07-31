var App = App || {};

App.MercadoLivre = (function ($, win, doc) {
  'use strict';

    function setup () {
      /*
        Basic Javascript Structure for:
        - Detach a Handler Function to an Event, Such as Click, Focus, or Submit.
        - Load data asynchronously from the server using GET or POST HTTP requests.  
      */
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
