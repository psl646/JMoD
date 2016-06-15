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

DOMNodeCollection.prototype.attr = function (attribute, value) {
  if (value === undefined){
    return this.elementsArray[0].getAttribute(attribute);
  }
  for (var i = 0; i < this.elementsArray.length; i++) {
    this.elementsArray[i].setAttribute(attribute, value);
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
