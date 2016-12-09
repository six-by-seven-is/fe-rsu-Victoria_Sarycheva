// JS OOP
"use strict";

function Conditioner(name, power, noisiness) {
  Ventilation.call(this, name, power, noisiness);
  this.temperature = 21;
}

Conditioner.prototype = Object.create(Ventilation.prototype);

Conditioner.prototype.setTemperature = function(temp) {
  this.temperature = temp;
};

Conditioner.prototype.getTemperature = function() {
  return this.temperature;
};

Conditioner.prototype.enable = function(temp) {
  this.setTemperature(temp);
  Ventilation.prototype.enable.aply(this);
};