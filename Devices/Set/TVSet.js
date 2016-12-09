// JS OOP
"use strict";

function TVSet(name) {
  var screen = new DisplayUnit("VDU", 50);
  var receiver = new Receiver("Digital receiver", 20);
  Set.call(this, name, [screen, receiver]);
}

TVSet.prototype = Object.create(Set.prototype);