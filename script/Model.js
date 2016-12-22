// JS 
"use strict";

function Model() {
  this.actionsHistory = [];
  this.bookList = [];
  this.tagList = ["Must read titles", "Best of list", "Classic novels", "Non fiction"];

  this.onReady = new EventEmitter();
}

Model.prototype.addBook = function (bTitle, bAuthor, bRating, bCoverSrc) {
  var b = {
    hidden: false,
    tags: [],
    title: bTitle, 
    author: bAuthor, 
    rating: bRating, 
    coverSrc: bCoverSrc || "images/covers/book-cover-no.jpg"
  };
  this.bookList.push(b);

  this.addAction("added new book", b.title, b.author, "to the", "library");
  this.onReady.notify([this.bookList, this.actionsHistory]);
}

Model.prototype.addAction = function (aAction, aWithBook, aBy, aPrep, aWhere) {
  var ac = {
    action: aAction, 
    withBook: aWithBook, 
    by: aBy, 
    prep: aPrep || "", 
    where: aWhere || "", 
    when: new Date
  };
  this.actionsHistory.push(ac);
}

Model.prototype.searchBook = function (str) {
  if (str) {
    str = str.toLowerCase();

    for (var i = 0; i < this.bookList.length; i++) {
  
      var title = this.bookList[i].title.toLowerCase();
      var author = this.bookList[i].author.toLowerCase();
  
      if ( title.indexOf(str) == -1 && author.indexOf(str) == -1) {  
        this.bookList[i].hidden = true;
      } else {
        this.bookList[i].hidden = false;
      };
    }

    // 10-seconds period for a single search action
    var now = new Date;
    var lastAction = this.actionsHistory[this.actionsHistory.length - 1];
    var delay = Math.round( (now - lastAction.when) / 1000 );
    if (delay <= 10 && lastAction.action === "searched ") {
      lastAction.by = str;
    } else {
      this.addAction("searched ", "books", str, "", "");
    }
    
  } else {

    for (var i = 0; i < this.bookList.length; i++) {
        this.bookList[i].hidden = false;
    }

  }

  this.onReady.notify([this.bookList, this.actionsHistory]);
}

Model.prototype.changeRating = function (index, userRating) {
  this.bookList[index].rating = userRating;
  this.addAction("rated " + userRating + " stars to", this.bookList[index].title, this.bookList[index].author, "", "");
  
  this.onReady.notify([this.bookList, this.actionsHistory]);
}

Model.prototype.mostPopularFilter = function() {
  for (var i = 0; i < this.bookList.length; i++) {

    if ( this.bookList[i].rating == 5 ) {
      this.bookList[i].hidden = false;
    } else {
      this.bookList[i].hidden = true;
    };

  }

  this.addAction("filtered", "books", "Most Popular", "", "");
  this.onReady.notify([this.bookList, this.actionsHistory]);
}

Model.prototype.clearFilter = function() {
  for (var i = 0; i < this.bookList.length; i++) {
    this.bookList[i].hidden = false;
  }

  this.onReady.notify([this.bookList, this.actionsHistory]);
}

Model.prototype.changeTagSet = function(index, newTagList) {
  for (var i = 0; i < newTagList.length; i++) {
    if ( this.tagList.indexOf( newTagList[i] ) === -1 ) {
      this.tagList.push( newTagList[i] );
    }
  }

  this.bookList[index].tags = newTagList;
  var newTagsStr = newTagList.join(", ");
  this.addAction("changed tags at", this.bookList[index].title, this.bookList[index].author, "to", newTagsStr);
  
  this.onReady.notify([this.bookList, this.actionsHistory]);
}


Model.prototype.setInitialData = function (initialTags, initialBooks, initialHistory) {
  this.tagList = initialTags;
  this.bookList = initialBooks;
  this.actionsHistory = initialHistory;

  this.onReady.notify([this.bookList, this.actionsHistory]);
}