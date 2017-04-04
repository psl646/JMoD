DOMNodeCollection = require('./dom_node_collection.js');

// Array to store all the callback functions
var _callbackFnArray = [];
var _documentReadyStatus = false;

// $JMoD is the core function.  It receives one argument (arg).
$JMoD = function (arg) {
  var nodeCollection;

  // If arg type is a string, it is expected to be a CSS selector
  // which is used to identify nodes on a page.
  if ( typeof arg === "string" ) {
    nodeCollection = _createDOMNodeFromString(arg);
  }
  // What is an HTMLElement?  Why can't I access this part of the if block
  else if ( arg instanceof HTMLElement) {
    nodeCollection = new DOMNodeCollection([arg]);
  }
  // If the input arg is a function, we call the _registerCallbackFn with arg
  else if ( arg instanceof Function ) {
    _registerCallbackFn(arg);
    return;
  }

  // Returns an instance of DOMNodeCollection
  return nodeCollection;
}

// If the document is loaded, we invoke the arg function.
// If the document is NOT loaded, we place is in the _callbackFnArray queue
// to invoke later when the document is loaded
var _registerCallbackFn = function (arg) {
  if ( _documentReadyStatus ) {
    arg();
  } else {
    _callbackFnArray.push(arg);
  }
};

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

 // A function to merge JavaScript objects.
 // The arguments will be two or more objects.
$JMoD.extend = Object.assign;

$JMoD.ajax = function(options){
  // Creates defaults object which will be used to merge with the options argument
  var defaults = {
    url: '',
    type: 'GET',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {},
    success: function () {},
    error: function () {}
  };

  // Creates request object which rewrites default values with input data from options
  var request = this.extend(defaults, options);
  // Create XML HTTP Request object
  var xhr = new XMLHttpRequest();
  xhr.open(request.type, request.url);

  xhr.onload = function () {
    if(xhr.status === 200) {
      // Status code 200 success
      request.success(JSON.parse(xhr.response));
    } else {
      request.error(JSON.parse(xhr.response));
    }
  };

  xhr.send(JSON.stringify(request.data));
};

document.addEventListener('DOMContentLoaded', function (){
  _documentReadyStatus = true;
  _callbackFnArray.forEach( function (callbackFn) {
    callbackFn();
  });
});
