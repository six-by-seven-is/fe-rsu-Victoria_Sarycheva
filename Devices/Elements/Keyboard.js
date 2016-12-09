// JS OOP
"use strict";

function Keyboard(name, power) { 
  Machine.call(this, name, power);
}

Keyboard.prototype = Object.create(Machine.prototype);