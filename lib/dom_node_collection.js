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
