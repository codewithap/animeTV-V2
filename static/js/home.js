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

  
const sresult = document.querySelector("#topAnimes");
    const base_url = "https://api.jikan.moe/v3/top/anime";


    function sleep(sleepDuration){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ 
        /* Do nothing */ 
    }
}

    function search(url) {
        fetch(`${url}`)
            .then(res => res.json())
            .then(data => sResult(data))
            .catch(err => console.warn(err.message));
    }

    function sResult(data){
        let animArr = data["top"]
        for(let i = 0;i<animArr.length;i++){
            sresult.innerHTML += template(animArr[i]["title"],animArr[i]["mal_id"],animArr[i]["image_url"],animArr[i]["rank"])
        }
    }

    function template(title,id,imgUrl,rank){
        let length = (String(rank).length);
    return `
    <div class="card">
            <a href="/anime?id=${id}"><button>
                <div style="background-image: url('${imgUrl}');height:16rem;width: 11rem">
                    <span class="rank" style="width: ${length+5}ch;height: ${length+4}ch">#${rank}</span>
                    
                </div>
                <h4>${title}</h4>
            </button></a>
        </div>
    `;
    }

    let pageNum = 2
    for (let index = 1; index < pageNum+1; index++) {
        
        search(base_url+`/${index}`);
        sleep(1500)
    }
    
