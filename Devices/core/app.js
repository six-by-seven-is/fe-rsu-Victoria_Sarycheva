// JS OOP
"use strict";

function Application() {

}

Application.prototype.start = function () {

  var device = null;

  var kitchen = new Kitchen();
  kitchen.showPower();
  device = kitchen.search("vent");
  console.log(device);
  device.enable();
  kitchen.search("TV");
  //console.log(kitchen.elements);

  console.log("");

  var livingRoom = new LivingRoom();
  livingRoom.showPower();
  //console.log(livingRoom.elements);
  device = livingRoom.search("printer");
  console.log(device);
  device.enable();
  device.print(1400);

};