// JS OOP
"use strict";

function Set(name, elements) {
  this.elements = elements;
  Machine.call(this, name, this.getPower());
}

Set.prototype = Object.create(Machine.prototype);

Set.prototype.getPower = function () {
  var totalPower = 0;

  for (var i = 0; i < this.elements.length; i++) {
    totalPower += this.elements[i].getPower();
  }

  return totalPower;
};

Set.prototype.showPower = function () {
  console.log('The total power of ' + this.getName() + ' is ' + this.getPower() + 'W ');
};

Set.prototype.search = function (what) {
  var element = null;
  
  if ( this.checkIfHas(what) ) {
    element = this;
  } else {

    for (var i = 0; i < this.elements.length; i++) {
      var elem = this.elements[i];

      if (elem.search) {
        element = elem.search.call(elem, what);
      } else {
        if ( elem.checkIfHas(what) ) {
          element = elem;
          break;
        }
      }

    }

  }

  return element;
};

Set.prototype.enable = function () {
  this.enable();

  this.elements.forEach(function (element) {
    element.enable();
  });
};