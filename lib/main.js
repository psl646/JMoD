DOMNodeCollection = require('./dom_node_collection.js');
var functions = [];

// $l is the core function.  It receives one argument (arg).
$l = function (arg) {
  var elementsArray;
  var nodeCollection;

  // If arg type is a string, it is expected to be a CSS selector
  // which is used to identify nodes on a page.
  if ( typeof arg === "string" ) {
    console.log("ARG IS STRING");
    nodeCollection = _createDOMNodeFromString(arg);
  }
  else if ( arg instanceof HTMLElement) {
    console.log("ARG IS HTML ELEMENT");
    elementsArray = [arg];
    nodeCollection = new DOMNodeCollection(elementsArray);
  }
  else if ( arg instanceof Function ) {
    console.log("ARG IS FUNCTION");
    var functions = [];
    functions.push(arg);
    if ( document.readyState === "complete" ) {
      functions.forEach( function (fn) {
        fn();
      });
    }
    return;
  }
  // Returns an instance of DOMNodeCollection
  return nodeCollection;
}

var _createDOMNodeFromString = function (arg) {
  // Matches will be a NodeList (array-like object), which is retrieved via the
  // native JavaScript API
  var matches = document.querySelectorAll(arg);
  // We use the slice method for arrays on the 'matches' object to create an
  // actual array-object of matches - with each element being an HTMLElement
  var elementsArray = [].slice.call(matches);
  // We create an instance of DOMNodeCollection using elementsArray as the input
  // The DOMNodeCollection will have an instance variable pointing to elementsArray
  return new DOMNodeCollection(elementsArray);
};





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
