JMoD
=====

JMoD (JavaScript Modifies Document) is a JS library which can be used to modify the DOM.  JMoD utilizes the native DOM API as the basis for its functionality.  JMoD currently supports DOM traversal/manipulation, event handling, and AJAX requests. JMoD is inspired by jQuery.


JMoD Library
-------------
$JMoD is the core function.  It receives one argument - which can be a CSS selector, HTMLElement, or function.  If a function is provided, it will be invoked if the DOM is loaded; otherwise, the function will be stored in a queue of callback functions to be invoked when the document is loaded.

If an HTMLElement or CSS selector is provided, a new instance of DOMNodeCollection will be returned.  The DOMNodeCollection takes in an array and sets it to an instance variable which it can manipulate.

$JMoD.ajax
-------------
As stated above; JMoD's core function is $JMod(arg).  JMoD is also capable of sending requests to the server via $JMoD.ajax.

$JMoD.ajax works by using the XMLHttpRequest API to send and receive data from the server.

```javascript

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

```

DOMNodeCollection
----------------------
Currently, the DOMNodeCollection has the following methods available for DOM manipulation:

###DOM Manipulation
`innerHTML(string)` - Set the DOM element to the input `string` value.

`deleteInnerHTML()` - Uses the innerHTML method; sets DOM elements to empty strings.

`outerHTML()` - Returns the outerHTML of each DOM element

`append(arg)` - Adds input `arg` to DOM elements as children.

`attr(attribute, value)` - Sets `attribute` equal to `value` for DOM elements.

`addClass(className)` - Add the class `className` to DOM elements.

`removeClass(className)` - Removes the class `className` from DOM elements.

`remove()` - Remove DOM elements from the DOM.


###DOM Retrieval
`children()` - Gets children of DOM elements, returns a new instance of `DOMNodeCollection`.

`parent()` - Gets parent of DOM elements, returns a new instance of `DOMNodeCollection`.

`find(selector)` - Find DOM elements by the `selector`, returns a new instance of `DOMNodeCollection`.

###DOM Event Handling

`on(type, callback)` - Adds a `callback` to DOM elements for a particular event `type`.

`off(type, callback)` - Removes `callback` from DOM elements for a particular event `type`.

Future Improvements
-----------------------
I would like to expand this library with more methods to manipulate the DOM.
