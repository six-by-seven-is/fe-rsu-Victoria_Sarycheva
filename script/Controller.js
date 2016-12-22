// JS 
"use strict";

function Controller() {
  this.model = new Model();
  this.view = new View(this.model, this);
}

Controller.prototype.start = function () {
  this.view.init();

  var tags = ["Must read titles", "Best of list", "Classic novels", "Non fiction"]

  var books = [];

  books.push( new Book("Jewels of Nizam", "Greeta Devi", 5, "images/covers/book-cover1.jpg") );
  books.push( new Book("Cakes &amp; Bakes", "Sanjeev Kapoor", 5, "images/covers/book-cover2.jpg") );
  books.push( new Book("Jamie’s Kitchen", "Jamie Oliver", 4.5, "images/covers/book-cover3.jpg") );
  books.push( new Book("Inexpensive Family Meals", "Simon Holst", 4, "images/covers/book-cover4.jpg") );
  books.push( new Book("Paleo Slow Cooking", "Chrissy Gower", 4.5, "images/covers/book-cover5.jpg") );
  books.push( new Book("Cook Like an Italian", "Tobie Puttock", 4, "images/covers/book-cover6.jpg") );
  books.push( new Book("Indian Cooking", "Suneeta Vaswani", 5, "images/covers/book-cover7.jpg") );
  books.push( new Book("Jamie Does", "Jamie Oliver", 4, "images/covers/book-cover8.jpg") );
  books.push( new Book("Jamie's Italy", "Jamie Oliver", 5, "images/covers/book-cover9.jpg") );
  books.push( new Book("Vegetables Cookbook", "Matthew Biggs", 3.5, "images/covers/book-cover10.jpg") );

  var actions = [];

  actions.push( new Action("added ", "Fight Club", "Chuck Palahniuk", "to your", "Must Read Titles") );
  actions.push( new Action("added ", "The Trial", "Franz Kafka", "to your", "Must Read Titles") );
  
  this.model.setInitialData( tags, books, actions );

  // auxiliary functions to create initial arrays

  function Book (title, author, rating, coverSrc) {
    this.title = title, 
    this.author = author, 
    this.rating = rating, 
    this.coverSrc = coverSrc || "images/covers/book-cover-no.jpg",
    this.hidden = false,
    this.tags = []
  }
  
  function Action (action, withBook, by, prep, where) {
    this.action = action, 
    this.withBook = withBook, 
    this.by = by, 
    this.prep = prep || "", 
    this.where = where || "", 
    this.when = new Date
  }
}

Controller.prototype.search = function (str) {
  this.model.searchBook(str);
}

Controller.prototype.changeRating = function (bookIndex, userRating) {
  this.model.changeRating(bookIndex, userRating);
}

Controller.prototype.filterBooks = function (byCathegory) {
  switch (byCathegory) {
    case "popularbooks":
      this.model.mostPopularFilter();
      break;
    case "allbooks":
      this.model.clearFilter();
      break;
    default:
      this.model.clearFilter();
      break;
  }
  
}

Controller.prototype.changeTags = function (bookIndex, tagSet) {
  this.model.changeTagSet(bookIndex, tagSet);
}

Controller.prototype.addBook = function (title, author, rating, coverSrc) {
  this.model.addBook(title, author, rating, coverSrc);
}

Controller.prototype.loadPage = function (pageId) {
  switch (pageId) {
    case "browse-page-link":
      this.view.loadBooks();
      break;
    case "history-page-link":
      this.view.loadHistory(this.model.actionsHistory);
      break;
    default:
      break;
  }
  
}