// JS OOP
"use strict";

function Mainframe(name, power) { 
  Machine.call(this, name, power);
}

Mainframe.prototype = Object.create(Machine.prototype);