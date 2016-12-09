// JS OOP
"use strict";

function DisplayUnit(name, power, diagonal) { 
  Machine.call(this, name, power);
  this.diagonal = diagonal || 11;
}

DisplayUnit.prototype = Object.create(Machine.prototype);