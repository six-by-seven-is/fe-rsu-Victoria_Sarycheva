// JS OOP
"use strict";

function Machine(name, power) {
  this.name = name;
  this.power = power;
  this.enabled = false;
}

Machine.prototype.getName = function() {
  return this.name;
};

Machine.prototype.getPower = function() {
  return this.power;
};

Machine.prototype.enable = function() {
  this.enabled = true;
  console.log(this.name + " is on!");
};

Machine.prototype.disable = function() {
  this.enabled = false;
};

Machine.prototype.checkIfHas = function(what) {
  if (this.getName().toLowerCase().indexOf(what.toLowerCase()) >= 0) {
    console.log('"' + what + '" is a part of "' + this.getName() + '"');
	return true;
  //add parent property
  //add possibleToEnable flag
  } else {
	return false;
  }
};