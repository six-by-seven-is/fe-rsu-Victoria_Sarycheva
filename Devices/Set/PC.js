// JS OOP
"use strict";

function PC(name) {
  var screen = new DisplayUnit("iiyama monitor", 16);
  var mainframe = new Mainframe("barebone", 30);
  var keyboard = new Keyboard("Genius keyboard", 5);
  var mouse = new MousePointer("Logitech mouse", 4);
  var printer = new Printer("Canon LBP 2900b laser printer", 259, 75);
  Set.call(this, name, [screen, mainframe, keyboard, mouse, printer]);
}

PC.prototype = Object.create(Set.prototype);