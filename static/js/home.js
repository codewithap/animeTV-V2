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


