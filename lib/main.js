DOMNodeCollection = require('./dom_node_collection.js');
var functions = [];

$l = function (arg) {

  if ( typeof arg === "string" ) {
    var matches = document.querySelectorAll(arg);
    var elementsArray = [].slice.call(matches);
    var nodeCollection = new DOMNodeCollection(elementsArray);
  }
  else if ( arg instanceof HTMLElement) {
    var elementsArray = [arg];
    var nodeCollection = new DOMNodeCollection(elementsArray);
  }
  else if ( arg instanceof Function ) {
    functions.push(arg);
    if(document.readyState === "complete") {
      functions.forEach( function (fn) {
        fn();
      });
      functions = [];
    }
    return;
  }
  return nodeCollection;
}

$l.extend = Object.assign;


$l.ajax = function(options){
  var defaults = {
    success: function() {},
    error: function() {},
    url: '',
    type: 'GET',
    data: {},
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
  };

  this.extend(defaults, options);
  var xhr = new XMLHttpRequest();
  xhr.open(defaults.type, defaults.url);

  xhr.onload = function () {
    if(xhr.status === 200) {
      defaults.success(JSON.parse(xhr.response));
    } else {
      defaults.error(JSON.parse(xhr.response));
    }
  };

  xhr.send(defaults.data);
};

document.onreadystatechange = function () {
  if( document.readyState === "complete" ) {
    functions.forEach( function (fn) {
      fn();
    });
    functions = [];
  }
}
