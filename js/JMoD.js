/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	DOMNodeCollection = __webpack_require__(1);
	
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
	  // Sets the defaults which will be used to merge with the options argument
	  var defaults = {
	    url: '',
	    type: 'GET',
	    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	    data: {},
	    success: function () {},
	    error: function () {}
	  };
	
	  var request = this.extend(defaults, options);
	
	  var xhr = new XMLHttpRequest();
	  xhr.open(request.type, request.url);
	
	  xhr.onload = function () {
	    if(xhr.status === 200) {
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


/***/ },
/* 1 */
/***/ function(module, exports) {

	// Takes in an array of HTMLElements and sets the array to an instance variable
	function DOMNodeCollection(elementsArray) {
	  this.elementsArray = elementsArray;
	}
	
	// Takes an optional string argument
	DOMNodeCollection.prototype.innerHTML = function (string) {
	  // If no string argument is given,
	  // return the innerHTML of the first HTMLElement in the elementsArray.
	  if (string === undefined){
	    return this.elementsArray[0].innerHTML;
	  }
	  // If given a string argument, set the innerHTML of each element as the
	  // provided string input
	  else {
	    for (var i = 0; i < this.elementsArray.length; i++) {
	      this.elementsArray[i].innerHTML = string;
	    }
	  }
	};
	
	// Deletes the innerHTML of the DOMNodeCollection instance.
	DOMNodeCollection.prototype.deleteInnerHTML = function () {
	  this.innerHTML("");
	};
	
	DOMNodeCollection.prototype.append = function (arg) {
	  if (arg instanceof HTMLElement){
	    for (var i = 0; i < this.elementsArray.length; i++) {
	      this.elementsArray[i].innerHTML += arg.outerHTML;
	    }
	  }
	  else if (typeof arg === "string") {
	    for (var i = 0; i < this.elementsArray.length; i++) {
	      this.elementsArray[i].innerHTML += arg;
	    }
	  }
	  else if (arg instanceof DOMNodeCollection) {
	    for (var i = 0; i < this.elementsArray.length; i++) {
	      this.elementsArray[i].innerHTML += arg.outerHTML();
	    }
	  }
	};
	
	// Returns the outerHTML of each element in the DOMNodeCollection
	DOMNodeCollection.prototype.outerHTML = function () {
	  var outerHTML = "";
	  for (var i = 0; i < this.elementsArray.length; i++) {
	    outerHTML += this.elementsArray[i].outerHTML;
	  }
	  return outerHTML;
	};
	
	DOMNodeCollection.prototype.attr = function (key, value) {
	  if (value === undefined){
	    return this.elementsArray[0].getAttribute(key);
	  }
	  for (var i = 0; i < this.elementsArray.length; i++) {
	    this.elementsArray[i].setAttribute(key, value);
	  }
	};
	
	// Will add className argument to the class attribute
	DOMNodeCollection.prototype.addClass = function (className) {
	  for (var i = 0; i < this.elementsArray.length; i++) {
	    var oldClasses = this.elementsArray[i].getAttribute('class');
	    if (!oldClasses){
	      var newClasses = className;
	    } else {
	      var newClasses = oldClasses + ' ' + className;
	    }
	    this.elementsArray[i].setAttribute('class', newClasses);
	  }
	};
	
	// Will remove className argument from the class attribute
	DOMNodeCollection.prototype.removeClass = function (className) {
	  for (var i = 0; i < this.elementsArray.length; i++) {
	    var oldClasses = this.elementsArray[i].getAttribute('class');
	    if (!oldClasses) {
	      continue;
	    }
	    var newClasses = oldClasses.replace(className, "");
	    this.elementsArray[i].setAttribute('class', newClasses);
	  }
	};
	
	// DOMNodeCollection#children is a method that returns a DOMNodeCollection of
	// all the children of all HTMLElements in the instance variable elementsArray
	DOMNodeCollection.prototype.children = function () {
	  var allChildren = [];
	  for (var i = 0; i < this.elementsArray.length; i++) {
	    var childrenArray = [].slice.call(this.elementsArray[i].children)
	    allChildren = allChildren.concat(childrenArray);
	  }
	  return new DOMNodeCollection(allChildren);
	};
	
	// DOMNodeCollection#parent returns a DOMNodeCollection of the parents of each
	// of the HTMLElements
	DOMNodeCollection.prototype.parent = function () {
	  var allParents = [];
	  for (var i = 0; i < this.elementsArray.length; i++) {
	    var parentElement = this.elementsArray[i].parentElement;
	    // Does not push the same parentElement into the allParents array
	    if (!allParents.includes(parentElement)){
	      allParents.push(parentElement);
	    }
	  }
	  return new DOMNodeCollection(allParents);
	};
	
	// DOMNodeCollection#find returns a DOMNodeCollection of all the nodes matching
	// the selector passed in as an argument that are descendants of the HTMLElements
	// in the instance variable elementsArray
	DOMNodeCollection.prototype.find = function (selector) {
	  var allFound = [];
	  for (var i = 0; i < this.elementsArray.length; i++) {
	    var found = [].slice.call(this.elementsArray[i].querySelectorAll(selector));
	    if (found.length > 0){
	      allFound = allFound.concat(found);
	    }
	  }
	  return new DOMNodeCollection(allFound);
	};
	
	// Removes the DOMNodeCollection from the DOM by setting the outerHTML to ""
	DOMNodeCollection.prototype.remove = function () {
	  for (var i = 0; i < this.elementsArray.length; i++) {
	    this.elementsArray[i].outerHTML = "";
	  }
	  this.elementsArray = [];
	};
	
	// Adds an event listener of 'type' with a callback on each HTMLElement in the
	// instance variable
	DOMNodeCollection.prototype.on = function (type, callback) {
	  for (var i = 0; i < this.elementsArray.length; i++) {
	    this.elementsArray[i].addEventListener(type, callback);
	  }
	};
	
	// Removes the event listener of 'type' with a callback on each HTMLElement in the
	// instance variable
	DOMNodeCollection.prototype.off = function (type, callback) {
	  for (var i = 0; i < this.elementsArray.length; i++) {
	    this.elementsArray[i].removeEventListener(type, callback);
	  }
	};
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=JMoD.js.map