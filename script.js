// JS Data Structure tasks
"use strict";
var testOutput = document.getElementById("test");

// DATE
(function() {

  //1. a JS program to display the current day and time. 
  var now = new Date();
  var currentDayOutput = document.getElementById("current-day");
  var options = {
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric'
    // ,
    // second: 'numeric'
  };
  currentDayOutput.innerHTML = "<em>Now it\'s:</em> " + now.toLocaleString("en-GB", options);
  
  //2. a JS program to get the current date. 
  var dateOutput = document.getElementById("current-date");
  options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  dateOutput.innerHTML = "<em>Current date is:</em> " + now.toLocaleString("en-GB", options);
  
  //3. a JS program to find 1st January be a Sunday between 2014 and 2050. 
  var date = new Date();
  date.setMonth(0, 1);
  var bufer = "";
  
  for (var i = 2014; i < 2051; i++) {
    date.setFullYear(i);
    if (date.getDay() === 0) {
      bufer += date.getFullYear() + ", ";
    }
  }
  bufer += "that\'s all between 2014 and 2050.";
  
  var anyOutput = document.getElementById("first-of-jan");
  anyOutput.innerHTML = "<em>The first of January is Sunday in:</em> " + bufer;
  
  //4. a JS program to calculate days left until next New Year.
  anyOutput = document.getElementById("new-year");
  anyOutput.innerHTML = (11 - now.getMonth()) + " month(s), " + (31 - now.getDate()) + " day(s) till the New Year\'s Day!";
})();



// ARRAY & STRING
(function() {

  //5. a JS function to check whether an `input` is an array or not. 
  function checkIfIsArray(someVar) {
    // return someVar instanceof Array;
    return Object.prototype.toString.call(someVar) == '[object Array]';
  }
  console.log(checkIfIsArray([1, 2, 4, 0]));
  console.log(checkIfIsArray("qwe"));
  
  //6. a JS function to clone an array
  var orA = [1, 2, 4, 0];
  console.log(orA);
  function cloneAnArray(originalArray) {
    var copiedArray = [];
    for (var i = 0; i < originalArray.length; i++)
    {
      copiedArray[i] = originalArray[i];
    }
    return copiedArray;
  }
  
  var cA = cloneAnArray(orA);
  orA = [1, 2, 3, 'poiuy'];
  console.log(orA);
  console.log(cA);
  
  //7. a JS function to find the most frequent item of an array.
  function findMostFrequentItem(arr) {
    var obj = {};
  
    for (var i = 0; i < arr.length; i++) {
      var str = arr[i];
      if (obj[str]) {
        obj[str] += 1;
      } else {
        obj[str] = 1;
      }
    }
    //console.log(obj);

    var max = 0;
    var element;
    for (var key in obj) {
      if (obj[key] > max) {
        max = obj[key];
        element = key;
      }
    }
  
    return " Element: \'" + element + "\' is the most frequent.";
  }
  console.log(findMostFrequentItem([1, 2, 4, 7, 4, 7, 4, 15, 0]));

  //8. a JS function that inverts the case of the letters 
  //of the given string and returns new string
  function invertCase(str) {
    var invertedStr = "";
  for (var i = 0; i < str.length; i++)
    {
    if ((str[i] >= "A") && (str[i] <= "Z") 
    || (str[i] >= "А") && (str[i] <= "Я") || (str[i] == "Ё")) {
      invertedStr += str[i].toLowerCase();
    }
    if ((str[i] > "a") && (str[i] < "z") 
    || (str[i] >= "а") && (str[i] <= "я") || (str[i] == "ё")) {
      invertedStr += str[i].toUpperCase();
    }
    }
  return invertedStr;
  }
  var testStr = "ЙЦукенГшщзхъЁ"; //QwerTyuIOp ЙЦукенГшщзхъЁ
  console.log(testStr);
  console.log(invertCase(testStr));

  //9. a JS program to remove duplicate 
  //strings from a string array (ignore case sensitivity)
  function removeDoublesCaseInsensitive(strArray) {
    var obj = {};
  
    for (var i = 0; i < strArray.length; i++) {
      var str = strArray[i].toLowerCase();
      obj[str] = strArray[i];
    }
    //console.log(obj);
  
    strArray = [];
    for (var key in obj) {
      strArray.push(obj[key]);
    }
    return strArray;
  }
  var stringArray = ["qwe", "er", "uto", "er", "Qwe", "pois", "on"];
  console.log(removeDoublesCaseInsensitive(stringArray));
  
  //10. a JS program to shuffle an array
  function shuffleArray(arr) {
    var quantity = arr.length;

    for (var i = 0; i < quantity; i++){
      var index = Math.floor(Math.random()*quantity);
      arr.push(+arr.splice(index, 1));
    }

    return arr;
  }
  var orderedArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log(orderedArray);
  console.log(shuffleArray(orderedArray));
  
  //11. a JS function to remove
  // 'null', '0', '""', 'false', 'undefined' and 'NaN' 
  //values from an array
  function removeFalseValues(arr) {
    for (var i = 0; i < arr.length; i++){
      if (!arr[i]){
        arr.splice(i, 1);
      }
    }
    return arr;
  }
  console.log("False values removed: ");
  console.log(removeFalseValues([0, 1, NaN, 3, "uto", "", "Qwe", 7, null, 9, 10, false]));
  
  //12. a JS function to sort the following array of objects 
  //by title value using ‘sort’ method
  function sortArrByTitle(arr) {
    arr.sort(compareTitles);
  
    function compareTitles(a, b){
      return a.title.localeCompare(b.title);
    }
  
    return arr;
  }
  
  var library = [ 
    { author: 'Bill Gates', title: 'The Road Ahead', libraryID: 1254},
    { author: 'Steve Jobs', title: 'Walter Isaacson', libraryID: 4264},
    { author: 'Suzanne Collins', title: 'Mockingjay: The Final Book of The Hunger Games', libraryID: 3245}
  ];
  console.log(sortArrByTitle(library));
  
  //13. a JS function to merge two arrays and remove all duplicate elements
  function mergeArrays(arr1, arr2) {
    var obj = {};
  
    for (var i = 0; i < arr1.length; i++) {
      obj[arr1[i]] = arr1[i];
    }
  
    for (var i = 0; i < arr2.length; i++) {
      obj[arr2[i]] = arr2[i];
    }
  
    var resultArray = [];
    for (var key in obj) {
      resultArray.push(obj[key]);
    }
  
    return resultArray;
  }
  
  var firstArray = [2, "er", "uto", "er", "pois", "on"];
  var secondArray = [2, "2", 3, 4, "uto", 6, 7];
  console.log(mergeArrays(firstArray, secondArray));
  
  //14. a JS function to remove a specific element from an array
  function removeElement(arr, element) {
    var elementInArray = false;

    for (var i = 0; i < arr.length; i++) {
      if ( arr[i] === element) {
        elementInArray = true;
        break;
      } else {
        elementInArray = false;
      }
    }

    if ( elementInArray ){
      arr.splice(i, 1);
    }
    
    return arr;
  }

  console.log(removeElement(["2", 3, 2, 4, "uto", 6, 7], 2));
  
  //15. a JS function to get a random item from an array
  function getRandonItem(arr) {
    var quantity = arr.length;
    var index = Math.floor(Math.random()*quantity);
    return arr.splice(index, 1)[0];
  }
  console.log("Random item: ", getRandonItem([2, "2", 3, 4, "uto", 6, 7]));
  
  //16. a JS function to move an array element from one position to another
  function moveElement(arr, fromPos, toPos) {
    var bufer = arr.splice(fromPos, 1);
    arr.splice(toPos, 0, bufer[0]);
    return arr;
  }
  console.log(moveElement([2, "2", 3, 4, "uto", 6, 7], 1, 4));
  
})();




//17. a JS function to get difference between two dates in days
  function callDifferenceInDays(){

    function getDifferenceInDays(date1, date2) {
      date1 = new Date(date1);
      date2 = new Date(date2);
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      timeDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
      return timeDiff;
    }

    var form = document.forms.dates;
    var firstDate = form.elements.firstDate.value;
    var secondDate = form.elements.secondDate.value;
    
    testOutput.innerHTML = ("There are <strong>" + getDifferenceInDays(firstDate, secondDate) + "</strong> days berween the dates.");

  }

//18. a JS function to get the maximum date from an array of dates
  function getMaxDate(arr){
    var maxDate = "0";

    for (var i = 0; i < arr.length; i++) {
      if (arr[i] > maxDate){
        maxDate = arr[i];
      }
    }

    return maxDate;
  }

  console.log(getMaxDate(['2015/02/01', '2015/02/02', '2015/01/03']));
// Output : "2015/02/02"
// function works only for this input format as it compares strings

//19. a JS function to split a string and convert it into an array of words
  function splitStringIntoWords(str){
    //console.log(str + " >>>");
    var symbols = ["!", "?", ",", ".", ""];
    for (var i = 0; i < symbols.length - 1; i++) {
      str = str.split(symbols[i]).join(symbols[i + 1]);
      //console.log(str);
    }
    var arrayOfWords = str.split(" ");
    return arrayOfWords;
  }

  console.log(splitStringIntoWords('All Chinese fonts are produced by one company, SinoType.'));

//20. a JS function to capitalize the first letter of a string
  function capitalizeTheFirstLetter(str){
    //console.log(str + " >>>");
    var firstLetter = str.slice(0 , 1);
    str = firstLetter.toUpperCase() + str.slice(1);
    return str;
  }

  console.log(capitalizeTheFirstLetter('bruce Wayne is Batman'));

//21. a JS function to convert a string into camel case
  function camelize(str){

    var arr = splitStringIntoWords(str);
    arr = arr.join("-").split("-");

    for (var i = 1; i < arr.length; i++) {
      arr[i] = capitalizeTheFirstLetter(arr[i]);
    }

    str = arr.join("");
    return str;
  }

  console.log(camelize("Java Script")); // "JavaScript" 
  console.log(camelize("java-script")); // "javaScript" 
  console.log(camelize("Java Script Exercises")); // "JavaScriptExercises"


//22. a JS function to find the highest value in an array
//23. a JS function to find the lowest value in an array

  function compareMore(a, b) {
    if (a > b) {
      return true;
    } else {
      return false;
    }
  }

  function compareLess(a, b) {
    if (a < b) {
      return true;
    } else {
      return false;
    }
  }

  function findMostValue(arr, compare) {
    var value = arr[0];

    for (var i = 0; i < arr.length; i++) {
      if ( compare(arr[i], value) && isNumeric(arr[i]) ) {
        value = arr[i];
      }
    }

    return value;
  }

  console.log(findMostValue(["10", 3, 2, 4, "uto", 6, 7, false], compareMore));
  console.log(findMostValue(["10", 3, 2, 4, "uto", 6, 7, false], compareLess));

//24. a JS function to check to check whether a variable is numeric or not
  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  console.log(isNumeric(true));

//25. a JS function to calculate the sum of values in an array
function calcSumOfValues(arr) {
  var sum = 0;

  for (var i = 0; i < arr.length; i++) {
    if ( isNumeric(arr[i]) ) {
      sum += +arr[i];
    }
  }

  return sum;
}
console.log(calcSumOfValues(["10", 3, 2, 4, "uto", 6, 7, false]));

//26. a JS program to get the length of a JavaScript object
  function getLength(obj) {
    return "The length is: " + Object.keys(obj).length;
  }

//27. a JS program to list the properties of a JavaScript object
  function listProperties(obj) {
    var str = "";

    for (var key in obj) {
      str += obj[key] + "; ";
    }

    str = str.slice(0, str.length - 2);

    return "The properies are: " + str;
  }
  
  var myObj = {
    a : "first property",
    b : 2,
    c : "property №3"
  };

  console.log(getLength(myObj));
  console.log(listProperties(myObj));