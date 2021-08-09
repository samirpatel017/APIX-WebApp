//Content Loaded
window.addEventListener("DOMContentLoaded", (e) => {
    var header = document.querySelector(".header1");
    var chatRoom = document.querySelector(".chat-room");
    var typeArea = document.querySelector(".type-area");
    var btnAdd = document.querySelector(".button-add");
    var others = document.querySelector(".others");
    var emojiBox = document.querySelector(".emoji-button .emoji-box");
    var emojiButton = document.querySelector(".others .emoji-button");
    var emojis = document.querySelectorAll(".emoji-box span");
    var inputText = document.querySelector("#inputText");
    var btnSend = document.querySelector(".button-send");
    var messageArea=document.querySelector(".message.message-right");
    //Header onclick event
    header.addEventListener("click", (e) => {
      if (typeArea.classList.contains("d-none")) {
        header.style.borderRadius = "20px 20px 0 0";
        header.style.height = "70px";
      } else {
        header.style.borderRadius = "0px";
        header.style.height = "50px";
      }
      typeArea.classList.toggle("d-none");
      chatRoom.classList.toggle("d-none");
    });
    //Button Add onclick event
   
    btnAdd.addEventListener("click", (e) => {
    
        others.classList.toggle("others-show");
        console.log('true')
       

      
    });
    //Emoji onclick event
    emojiButton.addEventListener("click", (e) => {
      emojiBox.classList.add("emoji-show");
    });
     //Button Send onclick event
   
    for (var emoji of emojis) {
      emoji.addEventListener("click", (e) => {
        e.stopPropagation();
        emojiBox.classList.remove("emoji-show");
        others.classList.remove("others-show");
        inputText.value+=e.target.textContent;
      });
    }
  });
  