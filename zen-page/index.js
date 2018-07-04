// This is a javascript file to go along with home.html and home.css
// CSE 154, 04/12, Jose D Sanchez Frugone

"use strict";
(function() {

  let timer;

  window.onload = function() {



    if (document.body.classList.contains('index')) {   // if on index, execute
      timer = setInterval(changeBackground, 8000);
      let currentBackground = 0;
      handleBackgroundPress();
      handleUser();
      handleParagraphs();
      setTimeout(function(){
        window.alert("As before, use arrow keys to cycle backgrounds." +
      " Hover over entries to expand.");
      }, 1500);
    }


    if (document.body.classList.contains('home')) {  // if on home, execute quote
      timer = setInterval(changeBackground, 8000);

      let currentBackground = 0;

      handleBackgroundPress();
      handleUser();
      quoteInfo();
      setTimeout(function(){
        window.alert("Try pressing on Ryokan for more info" +
        " You can also log your stay on the bottom left corner." +
        " Try visiting the creative diary section too.");
      }, 1000);
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
        let txt = document.createTextNode("Wandering as " + response + ", a kind, curious soul");
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


  function keeperConversation() {


    let affirm = $("yes");
    affirm.addEventListener("click", function(){
      let you = $("you");
      let you2 = you.cloneNode(true);
      you.innerText ="";
      addLine(you, "You: please", 800);
      let keeper = $("keeper-txt");
      addLine(keeper, "Keeper: Very well,", 1800);
      addLine(keeper, "Keeper: though I cannot guarantee it will make sense.", 2500);
      addLine(keeper, "Keeper: It is difficult to say with these things...", 3500);
      setTimeout(ajax, 5000);
      setTimeout(callAjax, 5000);
      setTimeout(function(){
        keeper.innerText= "Keeper: Traveller, would you like another?";
        setTimeout(function (){
          keeper.appendChild(you2);
          $('yes').innerText = "show me";
          $('no').innerText = "this is enough";
          keeperConversation();
        }, 1000);
      }, 9000);

    });


    let deny = $("no");
    deny.addEventListener("click", function(){
      let you = $("you");
      let you2 = you.cloneNode(true);
      you.innerText = "";
      addLine( you, "You: no, that's quite alright", 1000);
      let keeper = $("keeper-txt");
      addLine(keeper, "Keeper: Ahh, youth ...", 2000);
      addLine(keeper, "Keeper: Well,", 3500);
      setTimeout(function(){
        keeper.innerText = "";
      }, 4500);
      addLine(keeper, "Keeper: Let me know if you change your mind", 5000);
      setTimeout(function(){
        setTimeout(function(){
          keeper.appendChild(you2);
          $('yes').innerText = "ready";
          $('no').innerText = "no thanks, keeper";
          keeperConversation();
        }, 3000);
      }, 5000);

    });
  }



  // JASONP ajax call, circunventing CORS restrictions
  function ajax(){
    if (document.getElementsByTagName('script').length > 1) {
      let children = document.head.children;
      children[(children.length - 2)].parentNode.removeChild(children.length - 1);
    }
    let head = document.head;
    let script = document.createElement("SCRIPT");
    script.src = " http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1&_jsonp=myCallBack";
    head.appendChild(script);
  }

  // make an Ajax request by directly setting
  // a new image tag's src attribute as the API url
  function callAjax() {
    let url = "https://picsum.photos/400/600/?random";
    let newImg = document.createElement("IMG");
    let imgDiv = $("random-img");
    imgDiv.innerHTML = "";
    newImg.src = url;
    imgDiv.appendChild(newImg);
    setTimeout(function(){
      imgDiv.classList.remove("hidden");
      imgDiv.classList.add("visible");
    }, 1000);
  }


function showImg(responseText){
  console.log(responseText);
  let jsonResponse = JSON.parse(responseText);
}

// helper function, adds a new line of text
// the passed in parent with a delay given by
// time
function addLine(parent, sentence, time) {
  setTimeout(function() {
    let lnBreak = document.createElement("BR");
    parent.appendChild(lnBreak);
    parent.appendChild(document.createTextNode(sentence));
  }, time);
}

  // helper function, returns element given id
  function $(id){
    return document.getElementById(id);
  }

  // helper function, checks the status of
  // an ajax calledfunction checkStatus(response) {
  function checkStatus(response) {
     if (response.status >= 200 && response.status < 300) {
       return response.text();
     } else {
       return Promise.reject(new Error(response.status +
                                        ": " + response.statusText));
     }
   }
})();

// JASONP call back function
function myCallBack(resObject){
  let quote = document.getElementById("quote");
  let dialogue = document.getElementById("keeper-txt");
  dialogue.innerHtml = "";
  let span = document.createElement("SPAN");
  span.innerHTML = resObject[0].content;
  span.innerHTML = span.innerText;
  quote.innerHTML = "";
  quote.appendChild(span)
  let span2 = document.createElement("SPAN");
  span2.innerHTML = "<br> - " + resObject[0].title;
  quote.appendChild(span2);
  quote.classList.remove("hidden");
  quote.classList.add("visible")
}
