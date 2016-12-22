// JS 
"use strict";

function ModalWindow() {};

ModalWindow.prototype.make = function (formContentString) {
  var oldModal = document.getElementById("modal-w");

  var modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "modal-w";

  var form = document.createElement("form");
  form.className = "book-parameters";
  
  form.innerHTML = formContentString;

  var closeButton = document.createElement("button");
  closeButton.className = "close-modal";
  closeButton.type = "button";
  closeButton.innerHTML = "✖";

  closeButton.addEventListener("click", function() {
    this.parentNode.classList.add("non-visual");
  });

  modal.appendChild(form);
  modal.appendChild(closeButton);

  document.body.replaceChild(modal, oldModal);

  //return modal;
};