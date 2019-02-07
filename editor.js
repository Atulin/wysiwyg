const editor        = document.querySelector('div#editor>div#input');
const output        = document.querySelector('div#editor>textarea#output');

const clear       = document.querySelector("div#editor>div#tools>button#clear");
const heading       = document.querySelector("div#editor>div#tools>button#heading");

const italics       = document.querySelector("div#editor>div#tools>button#italics");
const bold          = document.querySelector("div#editor>div#tools>button#bold");
const underline     = document.querySelector("div#editor>div#tools>button#underline");
const strikethrough = document.querySelector("div#editor>div#tools>button#strikethrough");

const ul            = document.querySelector("div#editor>div#tools>button#ul");
const ol            = document.querySelector("div#editor>div#tools>button#ol");

const video         = document.querySelector("div#editor>div#tools>button#video");
const image         = document.querySelector("div#editor>div#tools>button#image");
const gfy           = document.querySelector("div#editor>div#tools>button#gfy");

const hr            = document.querySelector("div#editor>div#tools>button#hr");

// FUNCTIONS
editor.addEventListener('keyup', update);

function update() {
    output.value = editor.innerHTML;
}


// BUTTON HANDLERS
clear.addEventListener('mousedown', function (e){
    e.preventDefault();
    document.execCommand('removeFormat');
    update();
});

heading.addEventListener('mousedown', function (e){
    e.preventDefault();
    document.execCommand('formatBlock', false, 'H2');
    update();
});


italics.addEventListener('mousedown', function (e){
    e.preventDefault();
    document.execCommand('italic');
    update();
});

bold.addEventListener('mousedown', function (e){
    e.preventDefault();
    document.execCommand('bold');
    update();
});

underline.addEventListener('mousedown', function (e){
    e.preventDefault();
    document.execCommand('underline');
    update();
});

strikethrough.addEventListener('mousedown', function (e){
    e.preventDefault();
    document.execCommand('strikethrough');
    update();
});


ul.addEventListener('mousedown', function (e){
    e.preventDefault();
    document.execCommand('insertUnorderedList');
    update();
});

ol.addEventListener('mousedown', function (e){
    e.preventDefault();
    document.execCommand('insertOrderedList');
    update();
});


video.addEventListener('mousedown', function (e){
    e.preventDefault();
    let url = prompt("Link to the YouTube video");
    let id = '';

    if (url.includes('youtu.be')) {
        id = url.split('youtu.be/')[1];
        id = id.split('?')[0];
    } else {
        id = url.split('watch?v=')[1];
        id = id.split('&')[0];
    }

    console.log(id);

    let html = `<div style='position:relative; padding-bottom:calc(100.00% + 44px)'><iframe width="1920" height="978" src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`;
    document.execCommand('insertHtml', false, html);
    update();
});

image.addEventListener('mousedown', function (e){
    e.preventDefault();
    let url = prompt("Link to the image");
    let alt = prompt("Alternative text");
    let html = `<div style='position:relative; padding-bottom:calc(100.00% + 44px)'><img src="${url}" alt="${alt}"></div>`;
    document.execCommand('insertHtml', false, html);
    update();
});

gfy.addEventListener('mousedown', function (e){
    e.preventDefault();
    let url = prompt("Link to the Gfycat video");
    let html = `<div style='position:relative; padding-bottom:calc(100.00% + 44px)'><iframe src='${url}' frameborder='0' scrolling='no' width='100%' height='100%' style='position:absolute;top:0;left:0;' allowfullscreen></iframe></div>`;
    document.execCommand('insertHtml', false, html);
    update();
});

hr.addEventListener('mousedown', function (e){
    e.preventDefault();
    document.execCommand('insertHorizontalRule');
    update();
});
