let button = document.querySelector('.nav-bar');
let nav = document.querySelector('.nav');
let body = document.querySelector('#body');
let blur = document.querySelector('.blur');
button.addEventListener('click', ()=>{
    nav.style.width = '80%';
    blur.classList.add('blur_bg');
    nav.style.border = '2px solid rgba(255, 255, 255, 1)';
    nav.style.padding = '0.7rem';
});

blur.addEventListener('click', ()=>{
    nav.style.width = '0';
    blur.classList.remove('blur_bg');
    nav.style.border = 'none';
    nav.style.padding = '0';
});

document.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};

window.ondragstart = function() { return false; } 


let nightModeBtn = document.querySelector("#nightMode");
let mode = localStorage.getItem("nightMode");

if(mode == true){
    dark()
}
else if(mode == false){
    light()
}


function dark(){
    document.querySelector("body").style.background = "#000";
    document.querySelector("body").style.color = "#fff";
}

function light(){
    document.querySelector("body").style.background = "#fff";
    document.querySelector("body").style.color = "#000";
}

nightModeBtn.addEventListener("click",()=>{
    if(mode == null || mode == false){
        dark()
        localStorage.setItem("nightMode",true)
    }
    else if(mode == true){
        light()
        localStorage.setItem("nightMode",false)
    }
});

function readMoreLess() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Read less";
      moreText.style.display = "inline";
    }
  }


