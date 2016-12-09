// JS OOP
"use strict";

function MousePointer(name, power) { 
  Machine.call(this, name, power);
}

MousePointer.prototype = Object.create(Machine.prototype);