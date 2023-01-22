const sresult = document.querySelector("#topAnimes");
const base_url = "https://api.jikan.moe/v4/top/anime";
let cover = document.querySelector(".black-cover");
let Spinner = document.querySelector(".Spinner");
let pageNum = 1;
let f=1;
topanimes = document.querySelector(".btn button");



// document.oncontextmenu = function(event) {
//     event.preventDefault();
//     event.stopPropagation();
//     return false;
// };

window.ondragstart = function() { return false; }

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

function search(url,z) {
    fetch(`${url}`)
        .then(res => res.json())
        .then(data => sResult(data,z))
        .catch(err => console.warn(err.message));
}

function sResult(data,z) {
    console.log(data)
    let animArr = data["data"]
    for (let i = 0; i < animArr.length; i++) {
        let t
        if(animArr[i]["title_english"] != null){
            t = animArr[i]["title_english"];
        }else{
            t = animArr[i]["title"];
        }
        sresult.innerHTML += template(t, animArr[i]["mal_id"], animArr[i]["images"]["webp"]["image_url"], i+1,z)
    }
    topanimes.innerHTML="Load More";
    cover.style.display = "none";
    Spinner.style.display = "none";
    topanimes.setAttribute("style",`
        color: black;
        background: #dfdede;
        transition: 0.4s ease-in-out;
    `)

}

function template(title, id, imgUrl, rank,z) {
    if (z>1){rank = rank+((z-1)*25)}
    let length = (String(rank).length);
    return `
    <div class="card">
            <a href="/anime/${id}/${title}?url=${imgUrl}"><button>
                <div style="background-image: url('${imgUrl}');height:16rem;width: 11rem">
                    <span class="rank" style="width: ${length+5}ch;height: ${length+4}ch">#${rank}</span>
                </div>
                <h4>${title}</h4>
            </button></a>
        </div>
    `;
}

for (let index = 1; index < pageNum + 1; index++) {
    search(base_url +`?page=${index}`,index);
}

function loadtopanimes(){
    topanimes.innerHTML ="Loading...";
    cover.style.display="block";
    Spinner.style.display = "block";
    topanimes.setAttribute("style",`
        color: white;
        background: black;
        transition: 0.4s ease-in-out;
    `)
    search(base_url +`?page=${f+1}`,f+1);
    f+=1;
}



