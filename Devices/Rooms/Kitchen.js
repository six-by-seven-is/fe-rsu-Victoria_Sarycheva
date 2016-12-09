// JS OOP
"use strict";

function Kitchen() {
  var extractVentilation = new Ventilation("Extract ventilation by Bosh", 60, 64);
  var tvset = new TVSet("Sony Bravia TV");
  Room.call(this, "Kitchen", [extractVentilation, tvset]);
}

Kitchen.prototype = Object.create(Room.prototype);