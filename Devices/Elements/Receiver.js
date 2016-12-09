// JS OOP
"use strict";

function Receiver(name, power) { 
  Machine.call(this, name, power);
}

Receiver.prototype = Object.create(Machine.prototype);