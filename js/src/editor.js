// Selector functions
function dqs(selector) { return document.querySelector(selector) }
function eqs(parent, selector) { return parent.querySelector(selector) }

// Input and output
const editor      = dqs('div#editor>div#input');
const output      = dqs('div#editor>textarea#output');
const counter     = dqs('div#editor>div#counter');

const
    tools         = dqs("div#editor>div#tools"), // Toolbar element

    clear         = eqs(tools, "button#clear"),
    heading       = eqs(tools, "button#heading"),

    italics       = eqs(tools, "button#italics"),
    bold          = eqs(tools, "button#bold"),
    underline     = eqs(tools, "button#underline"),
    strikethrough = eqs(tools, "button#strikethrough"),

    ul            = eqs(tools, "button#ul"),
    ol            = eqs(tools, "button#ol"),

    video         = eqs(tools, "button#video"),
    image         = eqs(tools, "button#image"),
    gfy           = eqs(tools, "button#gfy"),

    hr            = eqs(tools, "button#hr");

// FUNCTIONS
editor.addEventListener('keyup', update);

function update() {
    output.value = editor.innerHTML;
    counter.innerText = editor.innerText.length;

    italics.toggleActive('italic');
    bold.toggleActive('bold');
    underline.toggleActive('underline');
    strikethrough.toggleActive('strikethrough');
}

HTMLButtonElement.prototype.toggleActive =  function (command) {
    this.classList.toggle('active', document.queryCommandState(command));
}

function register(button, command, value = null) {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        document.execCommand(command, false, value);
        update();
    });
}

// BUTTON HANDLERS
editor.addEventListener('focus', init);

function init() {
    editor.removeEventListener('focus', init);

    // Register pure command buttons
    register(clear,         'removeFormat');
    register(heading,       'formatBlock', 'H2');

    register(italics,       'italic');
    register(bold,          'bold');
    register(underline,     'underline');
    register(strikethrough, 'strikethrough');

    register(ul,            'insertUnorderedList');
    register(ol,            'insertOrderedList');

    register(hr,            'insertHorizontalRule');


    // Add listeners for embeds
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

        let html = `<div class="embed"><iframe src="https://www.youtube.com/embed/${id}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe></div>`;
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
        let html = `<div class="embed"><iframe src='${url}' allowfullscreen></iframe></div>`;
        document.execCommand('insertHtml', false, html);
        update();
    });
}
