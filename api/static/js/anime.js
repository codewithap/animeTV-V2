let img = document.querySelector("#img img");
let title = document.querySelector("#title");
let desc = document.querySelector("#desc");
let info = document.querySelector(".info");
let trailer = document.querySelector("#trailer");
let cover = document.querySelector(".black-cover");
let Spinner = document.querySelector(".Spinner");
let dBtn = document.querySelector('#WandDBtn');
let d = "";

function search(url) {
    fetch(`${url}`)
        .then(res => res.json())
        .then(data => sResult(data["data"]))
        // .catch(err => console.warn(err));
}

function sResult(data) {
    console.log(data);
    let t = ""
    img.src = data["images"]["jpg"]["large_image_url"];
    if(data["title_english"]!=null){
        t = data["title_english"];
    }else{
        t = data["title"];
    };
    title.innerHTML = t;
    if(data["synopsis"]== null){
        desc.innerHTML += ``;
    }else{
        desc.innerHTML += `
        ${data["synopsis"].slice(0,100)}<span id="dots">.....</span><span style="display: none" id="more">${data["synopsis"].slice(100,-1)}</span> &nbsp;&nbsp;&nbsp;<a style="color: blue" href="#" onclick="readMoreLess()" id="myBtn">Read More</a>
        `;}
    // info.style.backgroundImage = `url('${data["image_url"]}')`;
    d += data;
    dBtn.href += `/${id}?name=${t}&jpname=${data["title"]}`;
    trailer.src = data["trailer"]["embed_url"]
    document.querySelector("#Animtitle").innerHTML = data["title"];
    document.querySelector("#title_japanese").innerHTML = data["title_japanese"];
    document.querySelector("#epnum").innerHTML = data["episodes"];
    document.querySelector("#durationPerEp").innerHTML = data["duration"];
    document.querySelector("#rank").innerHTML = data["rank"];
    if(data["aired"]["string"].split("to")[1] == undefined){
        document.querySelector("#endDate").parentElement.setAttribute("style","display: none;");
        document.querySelector(".lastBorder").style.border = "none";
        document.querySelector("#startDate").innerHTML = data["aired"]["string"].split("to")[0];
    }else{
        document.querySelector("#startDate").innerHTML = data["aired"]["string"].split("to")[0];
        document.querySelector("#endDate").innerHTML = data["aired"]["string"].split("to")[1];
    }
    console.log(data["aired"]["string"].split("to")[1]);
    Spinner.style.display = "none";
    cover.style.display = "none";
}

search(base_anime_url)

function readMoreLess() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");

    if (dots.style.display === "none") {
        dots.style.display = "inline";
        btnText.innerHTML = "Read more";
        moreText.style.display = "none";
    }
    else {
        dots.style.display = "none";
        btnText.innerHTML = "Read less";
        moreText.style.display = "inline";
    }
}