// JS 
"use strict";

function View(model, controller) {
  this.model = model;
  this.controller = controller;

  this.booksContainer = document.getElementsByClassName("tiles-container")[0];
  this.searchInputElement = document.getElementById("book-search");
  this.historyPanelArray = document.getElementsByClassName("history__item-description");
  this.bookFilters = document.getElementsByClassName("filters")[0];
  this.addBookButton = document.getElementById("addabook-button");

  this.menu = document.getElementsByClassName("navigation--main")[0];
  this.contentBufer = null;
}

View.prototype.init = function () {
  var that = this;

  this.model.onReady.subscribe(function (lists) {
    that.updateBookList(lists[0]);
    that.updateRecentActions(lists[1]);
  });

  this.searchInputElement.addEventListener("input", function () {
    var str = that.searchInputElement.value;
    that.controller.search(str);
  });

  this.booksContainer.addEventListener("click", function () {
    if (event.target.tagName == "I") {

      var userRating = event.target.dataset.order;
      userRating = parseFloat(userRating);
      var bookIndex = event.target.parentNode.parentNode.dataset.index;

      that.controller.changeRating(bookIndex, userRating);

    } else if (event.target.tagName != "H3" 
            && event.target.tagName != "I" 
            && event.target.tagName != "A" ) {

      var bookIndex = null;
      if (event.target.className == "preview")
      {
        bookIndex = event.target.dataset.index;
      } else { // img, p, div.rating
        bookIndex = event.target.parentNode.dataset.index;
      }

      if (bookIndex) {
        var title = that.model.bookList[bookIndex].title;
        var author = that.model.bookList[bookIndex].author;
        var rating = that.model.bookList[bookIndex].rating;
        var tagSet = that.model.bookList[bookIndex].tags.join(", ");

        var tags = "";
        for (var i = 0; i < that.model.tagList.length; i++) {
         if ( ~tagSet.indexOf(that.model.tagList[i]) ) {
          tags += "<label><input type=\"checkbox\" name=\"tags\" checked>" 
              + that.model.tagList[i] + "</label> <br>";
         } else {
          tags += "<label><input type=\"checkbox\" name=\"tags\">" 
              + that.model.tagList[i] + "</label> <br>";
         }
        }
  
        var htmlBookDescriptionString = "<table>"
          + "<caption><h3>"
          + title
          + "</h3></caption>"
          + "<tr><td>Author:</td><td>"
          + author
          + "</td></tr>"
          + "<tr><td>Rating:</td><td>"
          + rating
          + "</td></tr>"
  
          + "<tr><td>Tags:</td><td id=\"list-of-tags\">"
          + tags
          + "<input class=\"inputfield\" type=\"text\" placeholder=\"Custom Tag\" id=\"custom-tag\">"
          + "</td></tr>"
  
          + "<tr><td colspan=2>"
          + "<button class=\"button button--cta\" type=\"button\" name=\"newbookmodal\" "
          + "id=\"add-tag-button\"><span class=\"button__wrapper\">"
          + "<span class=\"button__text\">Save tags</span>"
          + "</span></button>"
          + "</td></tr>"
  
          + "</table>";

        var modalWindow = new ModalWindow();
        modalWindow.make(htmlBookDescriptionString);

        var addTagButton = document.getElementById("add-tag-button"); 
        addTagButton.addEventListener("click", that.onModalAddTagButtonClick.bind(that, bookIndex));

      } // if bookIndex

    } // else if click was on a book

  });

  this.bookFilters.addEventListener("change", function () {
    that.controller.filterBooks(event.target.id);
  });

  this.addBookButton.addEventListener("click", function () {
    var htmlBookInfoInputsString = "<table>"
        + "<caption><h3>Add new book</h3></caption>"

        + "<tr><td><label for=\"input-author\">Author:</label></td>"
        + "<td><input class=\"inputfield\" type=\"text\" id=\"input-author\" "
        + "placeholder=\"Charles Dickens\" required></td></tr>"

        + "<tr><td><label for=\"input-title\">Title:</label></td>"
        + "<td><input class=\"inputfield\" type=\"text\" id=\"input-title\" "
        + "placeholder=\"Bleak House\" required></td></tr>"

       //+ "<tr><td><label for=\"input-cover\">Cover:</label></td>"
       //+ "<td><input type=\"file\" id=\"input-cover\"></td></tr>"

        + "<tr><td colspan=2>"
        + "<button class=\"button button--cta\" type=\"button\" name=\"newbookmodal\" "
        + "id=\"add-button\"><span class=\"button__wrapper\">"
        + "<i class=\"fa fa-plus\"></i>"
        + "<span class=\"button__text\">Add a book</span>"
        + "</span></button>"
        + "</td></tr>"
        + "</table>";

    var modalWindow = new ModalWindow();
    modalWindow.make(htmlBookInfoInputsString);

    var addButton = document.getElementById("add-button"); 
    addButton.addEventListener("click", that.onModalAddBookButtonClick.bind(that));

  });

  this.menu.addEventListener("click", function () {
    if ( event.target.tagName == "I" || event.target.tagName == "SPAN") {
      var itemId = event.target.parentNode.id;
    } else {
      var itemId = event.target.id;
    }
    console.log(itemId);
    console.log(that);
    that.controller.loadPage(itemId);

    var refArray = that.menu.getElementsByClassName("navigation__item");
    for (var i = 0; i < refArray.length; i++) {
      refArray[i].classList.remove("current");
    }
    document.getElementById(itemId).classList.add("current");
  });
}

View.prototype.updateBookList = function (newList) {
  this.booksContainer.innerHTML = "";

  for (var i = 0; i < newList.length; i++) {
    if ( !newList[i].hidden ) {
      var aBook = this.makeDOMBook(newList[i], i);
      this.booksContainer.appendChild(aBook);
    }
  }

}

View.prototype.makeDOMBook = function (bk, index) {
  var book = document.createElement("div");
  book.className = "preview";
  book.dataset.tags = bk.tags.join(", ");
  book.dataset.index = index;
  
  var htmlBookDetailsString = "<img class=\"book-cover\" " 
      + "src=\""
      + bk.coverSrc
      + "\" alt=\"book cover image\">"
      + "<h3 class=\"book-title\">"
      + bk.title
      + "</h3><p class=\"book-author\">by <a class=\"reference\" href=\"#\">"
      + bk.author
      + "</a></p>";

  book.innerHTML = htmlBookDetailsString;

  var bRating = document.createElement("div");
  bRating.className = "rating";
  bRating.dataset.rating = bk.rating;

  for (var i = 1; i <= 5; i++) {
    var star = document.createElement("i");
    star.dataset.order = i;
    star.classList.add("fa");

    if ( i <= bk.rating ) {
      star.classList.add("fa-star");
    } else if ( (parseInt(bk.rating) != bk.rating) && (Math.ceil(bk.rating) == i) ) {
      star.classList.add("fa-star-half-o");
    } else {
      star.classList.add("fa-star-o");
    }

    bRating.appendChild(star);
  }

  book.appendChild(bRating);
  return book;
}

View.prototype.updateRecentActions = function (newList) {
  var now = new Date;
    
  this.historyPanelArray[1].innerHTML = this.makeDOMAction(newList[newList.length - 2], now);
  this.historyPanelArray[0].innerHTML = this.makeDOMAction(newList[newList.length - 1], now);
}

View.prototype.makeDOMAction = function (act, now) {
  var delay = Math.round( (now - act.when) / 1000 / 60 );
  
  var htmlActionString = "<p class=\"p--reduced-vertical-margin\">You "
    + act.action
    + " <a class=\"reference reference--bright\" href=\"#\">"
    + act.withBook
    + "</a> by "
    + "<a class=\"reference reference--bright\" href=\"#\">"
    + act.by
    + "</a> "
    + act.prep
    + "<a class=\"reference reference--bright\" href=\"#\"> "
    + act.where
    + "</a>. </p>"
    + "<p class=\"p--reduced-vertical-margin\">"
    + delay
    + " minutes ago</p>";
  
  return htmlActionString;
}

View.prototype.onModalAddTagButtonClick = function (bookIndex) {

  var checkTagsArray = document.getElementsByName("tags");
  var customTag = document.getElementById("custom-tag").value;

  var newTagsString = "";

    for (var i = 0; i < checkTagsArray.length; i++) {
     if ( checkTagsArray[i].checked) {
       newTagsString += checkTagsArray[i].parentNode.textContent + ", ";
     }
    }

    if (customTag) {
     newTagsString += customTag + ", ";
    }

    if (newTagsString) {
     newTagsString = newTagsString.slice(0, newTagsString.length - 2);
    }

  var newTagsArray = newTagsString.split(", ");
  this.controller.changeTags(bookIndex, newTagsArray);

  document.getElementById("modal-w").classList.add("non-visual");
}

View.prototype.onModalAddBookButtonClick = function () {
  var author = document.getElementById("input-author").value;
  var title = document.getElementById("input-title").value;
    
  if ( author == "" || title == "" ) {
    alert("Both author and title required!");
  } else {
    var src = "images/covers/book-cover-no.jpg";

     // var thumbnail = document.getElementById("input-cover").files[0];
     // console.log(thumbnail);
  
     //  if ( thumbnail ) {
     //    if (thumbnail.type.match('image.*')) {
     //      var reader = new FileReader();
    
     //      // Closure to capture the file information.
     //      reader.onload = (function() {
     //        return function(e) {
     //          // Render thumbnail.
     //          src = e.target.result;
     //        };
     //      })(thumbnail);
    
     //      // Read in the image file as a data URL.
     //      reader.readAsDataURL(thumbnail);
     //    }
     //  }
  
     // console.log(src);
  
    this.controller.addBook(title, author, 2.5, src );
    document.getElementById("modal-w").classList.add("non-visual");
  }
}

View.prototype.loadHistory = function (actionsList) {
  var browseBooksContent = document.getElementById("page-content");
  var historyContent = document.createElement("section");
  historyContent.className = "content";
  historyContent.id = "page-content";

  var now = new Date;

  for (var i = actionsList.length - 1; i >= 0; i--) {
    var item  = document.createElement("div");
    item.className = "history__item";

    var icon = document.createElement("p");
    icon.className = "p--reduced-vertical-margin";
    icon.innerHTML = "<i class=\"fa fa-clock-o\"></i>";

    var description  = document.createElement("div");
    description.className = "history__item-description";
    description.innerHTML = this.makeDOMAction(actionsList[i], now);

    item.appendChild(icon);
    item.appendChild(description);

    historyContent.appendChild(item);
  }

  this.contentBufer = browseBooksContent.parentNode.replaceChild(historyContent, browseBooksContent);
}

View.prototype.loadBooks = function () {
  var historyContent = document.getElementById("page-content");
  var browseBooksContent = this.contentBufer;

  historyContent.parentNode.replaceChild(browseBooksContent, historyContent);
}
