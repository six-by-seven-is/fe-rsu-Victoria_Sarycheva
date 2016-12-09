// JS OOP
"use strict";

function Printer(name, power, cartridgeFill) { 
  Machine.call(this, name, power);
  this.cartridgeFill = cartridgeFill;
}

Printer.prototype = Object.create(Machine.prototype);

Printer.prototype.setCartridgeFill = function(fill) {
  if ( fill >= 0 && fill <= 100 ) {
  	this.cartridgeFill = fill;
  }
};

Printer.prototype.getCartridgeFill = function() {
  return this.cartridgeFill;
};

Printer.prototype.print = function(pages) {
  if ( this.enabled ) {

    var capability = Math.ceil(pages/20);
    if ( this.cartridgeFill > capability + 5 ) {
      console.log( this.name + " is printing..." );      
      this.cartridgeFill -= capability;
      console.log( "Done. " + this.cartridgeFill + "% of cartridge left.");
    } else if ( this.cartridgeFill >= capability ) {
      console.info( this.name + " can print only a few pages. Mind to refill the cartridge!");
      console.log( this.name + " is printing...");
      this.cartridgeFill -= capability;
      console.warn( "Done. " + this.cartridgeFill + "% of cartridge left.");
    } else {
      console.warn( "Refill the cartridge!");
      console.warn( this.cartridgeFill + "% of cartridge isn't enough to print " + pages + " pages.");
    }

  } else {
    console.error( this.name + " is not enabled. Turn it on!" );
  }
  
};
