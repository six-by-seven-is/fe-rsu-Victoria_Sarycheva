// JS OOP
"use strict";

function Ventilation(name, power, noisiness) { //ExtractVentilation
  Machine.call(this, name, power);
  this.noisiness = noisiness;
}

Ventilation.prototype = Object.create(Machine.prototype);