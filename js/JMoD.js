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


/***/ },
/* 1 */
/***/ function(module, exports) {

	function DOMNodeCollection(elementsArray) {
	  this.elementsArray = elementsArray;
	}
	
	DOMNodeCollection.prototype.html = function (string) {
	  if (string === undefined){
	    return this.elementsArray[0].innerHTML;
	  } else {
	    for (var i = 0; i < this.elementsArray.length; i++) {
	      this.elementsArray[i].innerHTML = string;
	    }
	  }
	};
	
	DOMNodeCollection.prototype.empty = function () {
	  this.html("");
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
	
	DOMNodeCollection.prototype.children = function () {
	  var allChildren = [];
	  for (var i = 0; i < this.elementsArray.length; i++) {
	    var childrenArray = [].slice.call(this.elementsArray[i].children)
	    allChildren = allChildren.concat(childrenArray);
	  }
	  return new DOMNodeCollection(allChildren);
	};
	
	DOMNodeCollection.prototype.parent = function () {
	  var allParents = [];
	  for (var i = 0; i < this.elementsArray.length; i++) {
	    var parentElement = this.elementsArray[i].parentElement;
	    if (!allParents.includes(parentElement)){
	      allParents.push(parentElement);
	    }
	
	  }
	  return new DOMNodeCollection(allParents);
	};
	
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
	
	DOMNodeCollection.prototype.remove = function () {
	  for (var i = 0; i < this.elementsArray.length; i++) {
	    this.elementsArray[i].outerHTML = "";
	  }
	  this.elementsArray = [];
	};
	
	DOMNodeCollection.prototype.on = function (type, callback) {
	  for (var i = 0; i < this.elementsArray.length; i++) {
	    this.elementsArray[i].addEventListener(type, callback);
	  }
	};
	
	DOMNodeCollection.prototype.off = function (type, callback) {
	  for (var i = 0; i < this.elementsArray.length; i++) {
	    this.elementsArray[i].removeEventListener(type, callback);
	  }
	};
	
	
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=JMoD.js.map