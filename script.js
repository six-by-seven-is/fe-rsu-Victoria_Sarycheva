// JS Context task
"use strict";

//Calculator should perform the following operations: Add; Subtract; Divide; Multiply.
//Calculator must store the current state. The initial value is 0.
//Calculator must have a method to get a current state:
//console.log(Calculator.getResult()) // 0
//All the operations manage the current result:
//Calculator.add(4)
//Calculator.substract(1)
//console.log(Calculator.getResult()) // 3
//Calculator must have a method to reset the current state:
//console.log(Calculator.reset()) // 0
//User must have a possibility to use the following technique:
//Calculator.add(4).reset().add(1).getResult() // 1

//Add a method for calculator which emulates request to a server and sets the state of Calculator (i.e. this.result = 5) when we get a response. Add callback function and call it after it..
//function getInitialState(callback) {
//  //Setting timeout to emulate a request to a server
//  setTimeout(function () {
//  //Set calculator state here
//    callback();
//  }, 500);
//}

function Calculator() {
  
  this.currentState = 0;
  
  this.add = function(newComponent){
    this.currentState += newComponent;
    return this;
  };
  
  this.substract = function(newComponent){
    this.currentState -= newComponent;
    return this;
  };
  
  this.multiply = function(newComponent){
    this.currentState *= newComponent;
    return this;
  };
  
  this.divide = function(newComponent){
    this.currentState /= newComponent;
    return this;
  };
  
  this.reset = function(){
    this.currentState = 0;
    return this;
  };
  
  this.getResult = function(){
    return this.currentState;   
  };

  this.getStateWithDelay = function(callback) { // emulates request
    setTimeout(function() {
      callback(this.currentState);
    }.bind(this), 750);
  };
    
};

var calculator = new Calculator();

console.log(calculator.getResult()); // 0
calculator.add(4);
calculator.substract(1);
console.log(calculator.getResult()); // 3
console.log(calculator.reset().getResult()); // 0
console.log(calculator.add(4).reset().add(1).getResult()); // 1

console.log("___request___")
calculator.reset();
calculator.add(4).multiply(7);
calculator.getStateWithDelay(function(result){
  console.log(result);
});
