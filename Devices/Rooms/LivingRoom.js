// JS OOP
"use strict";

function LivingRoom() {
  var airConditioner = new Conditioner("Air conditioner", 80, 45);
  var computer = new PC("my PC");
  Room.call(this, "Living-room", [airConditioner, computer]);
}

LivingRoom.prototype = Object.create(Room.prototype);