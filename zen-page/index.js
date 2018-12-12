// This is a javascript file to go along with home.html and home.css
// CSE 154, 04/12, Jose D Sanchez Frugone

"use strict";
(function() {

  let timer;

  window.onload = function() {



    if (document.body.classList.contains('diary')) {   // if on index, execute
      handleUser();
      handleParagraphs();
    }


    if (document.body.classList.contains('index')) {  // if on home, execute quote
      timer = setInterval(changeBackground, 8000);

      let currentBackground = 0;

      handleBackgroundPress();
      handleUser();
      quoteInfo();
    }
  };



  // Changes background when called, used in automatic background
  // change
  function changeBackground() {
    let sectionArray = document.querySelectorAll(".sections");
    let active = 0;

    for (let i = 0; i < sectionArray.length; i++) {
      if(sectionArray[i].classList.contains("visible")){
        active = i;
      }
    }

    for (let i = 0; i < sectionArray.length; i++) {
      if (i == active) {
        sectionArray[i].classList.remove("visible");
        sectionArray[i].classList.add("hidden");
      } else if (i == active + 1){
        sectionArray[i].classList.remove("hidden");
        sectionArray[i].classList.add("visible");
      } else if (active == sectionArray.length - 1) {
        sectionArray[0].classList.remove("hidden");
        sectionArray[0].classList.add("visible");
      }
    }
  }



  /* Collects all .sections background objects into array
      and cycles through them through left and right arrow
      key presses
  */
  function handleBackgroundPress() {
    let active = 0;
    let sectionArray = document.querySelectorAll(".sections");

    sectionArray[active].classList.remove("hidden");
    sectionArray[active].classList.add("visible");


    window.onkeyup = function(e) {


      for (let i = 0; i < sectionArray.length; i++) {
        if(sectionArray[i].classList.contains("visible")){
          active = i;
        }
      }

      sectionArray[active].classList.remove("visible");
      sectionArray[active].classList.add("hidden");
      let key = e.keyCode ? e.keyCode : e.which;


      if (key == 39 && active < sectionArray.length - 1) {
         active++;
      } else if (key == 39 && active == sectionArray.length - 1) {
        active = 0;
      } else if (key == 37 && active > 0) {
         active--;
      } else if (key == 37 && active == 0) {
        active = sectionArray.length - 1 ;
      }
      sectionArray[active].classList.remove("hidden");
      sectionArray[active].classList.add("visible");
    };
  }

  // Upon author click, gives more information on author, stops
  // background cycling or restarts background cycling
  function quoteInfo() {
    let blockArray = document.querySelectorAll(".container > blockquote");
    let authorArray = document.querySelectorAll(".author");
    let aInfoArray = document.querySelectorAll(".authorInfo");


    for (let i= 0; i < authorArray.length; i++) {
      authorArray[i].addEventListener("click", function(){
        aInfoArray[i].classList.remove("hidden");
        aInfoArray[i].classList.add("visible");
        blockArray[i].classList.remove("visible");
        blockArray[i].classList.add("hidden");
        clearInterval(timer);
      });

      aInfoArray[i].addEventListener("click", function(){
        aInfoArray[i].classList.remove("visible");
        aInfoArray[i].classList.add("hidden");
        blockArray[i].classList.remove("hidden");
        blockArray[i].classList.add("visible");
        timer = setInterval(changeBackground, 8000);
      });
    }
  }

  // Gives diary entries expanding property on mouse over
  function handleParagraphs() {
    let entryArray = document.querySelectorAll(".entries");


    for (let i = 0; i < entryArray.length; i++) {
      entryArray[i].addEventListener("mouseOver", function(){
        entryArray[i].style.height = "auto";
      });
    }
  }

  // handles user logging travels, adds user's name to page
  function handleUser() {
    let btn = document.getElementById("log-input");
    btn.onclick = function(){
      let response = window.prompt("Traveller, who are you?");
      if (response !== null && response !== "") {
        let idBox = document.getElementById("user");
        let txt = document.createTextNode("Wandering as " + response + ", a kind and curious soul");
        let span = document.createElement("SPAN");
        let para = document.createElement("P");
        span.appendChild(txt);
        para.appendChild(span);
        idBox.removeChild(document.querySelector("#user p"));
        idBox.appendChild(para);
        btn.value = "Change";
      }
    };
  }

  // helper function, returns element given id
  function $(id){
    return document.getElementById(id);
  }

})();
