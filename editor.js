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
editor.addEventListener('focus', init);

function init() {
    console.log('focused');
    editor.removeEventListener('focus', init);

    clear.addEventListener('mousedown', function (e) {
        e.preventDefault();
        document.execCommand('removeFormat');
        update();
    });

    heading.addEventListener('mousedown', function (e) {
        e.preventDefault();
        document.execCommand('formatBlock', false, 'H2');
        update();
    });


    italics.addEventListener('mousedown', function (e) {
        e.preventDefault();
        document.execCommand('italic');
        update();
    });

    bold.addEventListener('mousedown', function (e) {
        e.preventDefault();
        document.execCommand('bold');
        update();
    });

    underline.addEventListener('mousedown', function (e) {
        e.preventDefault();
        document.execCommand('underline');
        update();
    });

    strikethrough.addEventListener('mousedown', function (e) {
        e.preventDefault();
        document.execCommand('strikethrough');
        update();
    });


    ul.addEventListener('mousedown', function (e) {
        e.preventDefault();
        document.execCommand('insertUnorderedList');
        update();
    });

    ol.addEventListener('mousedown', function (e) {
        e.preventDefault();
        document.execCommand('insertOrderedList');
        update();
    });


    video.addEventListener('mousedown', function (e) {
        e.preventDefault();
        let url = prompt("Link to the YouTube video");
        if (url == null) return;
        let id = '';

        if (url.includes('youtu.be')) {
            id = url.split('youtu.be/')[1];
            id = id.split('?')[0];
        } else {
            id = url.split('watch?v=')[1];
            id = id.split('&')[0];
        }

        console.log(id);

        let html = `<div class="embed"><iframe src="https://www.youtube.com/embed/${id}" frameborder="0" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`;
        document.execCommand('insertHtml', false, html);
        update();
    });

    image.addEventListener('mousedown', function (e) {
        e.preventDefault();
        let url = prompt("Link to the image");
        if (url == null) return;
        let alt = prompt("Alternative text");
        let html = `<div class="embed"><img src="${url}" alt="${alt}"></div>`;
        document.execCommand('insertHtml', false, html);
        update();
    });

    gfy.addEventListener('mousedown', function (e) {
        e.preventDefault();
        let url = prompt("Link to the Gfycat video");
        if (url == null) return;
        let html = `<div class="embed"><iframe src='${url}' frameborder='0' scrolling='no' allowfullscreen></iframe></div>`;
        document.execCommand('insertHtml', false, html);
        update();
    });

    hr.addEventListener('mousedown', function (e) {
        e.preventDefault();
        document.execCommand('insertHorizontalRule');
        update();
    });
}