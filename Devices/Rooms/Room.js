// JS OOP
"use strict";

function Room(name, devices) {
  Set.call(this, name, devices);
}

Room.prototype = Object.create(Set.prototype);