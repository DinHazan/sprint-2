'use strict'


var gCtx
var gCanvas
var gCurrentImg

function renderImg(imgs) {
    var elImgContainer = document.querySelector('.img-container')
    elImgContainer.innerHTML = ''
    imgs.forEach(function (img) {
        elImgContainer.innerHTML += `
        <li class="flex container"><img src="${img.url}" alt="" onclick="renderImgToCanvas( this ,'${img.url}' , '${img.id}')"></li>
        `
    })
    renderStyleTools()
}
renderImg(gImgs)

function renderStyleTools() {
    var elFontSize = document.querySelector('#font-size')
    for (var i = 0; i < 100;) {
        elFontSize.innerHTML += `
        <option value="${i}">
        `
        i = i + 2
    }
}

function sortByTag(ev) {
    var tag = document.querySelector('.val')
    var elImgContainer = document.querySelector('.img-container')
    var newImgs = onSortByTag(tag.value)
    if (newImgs.length === undefined) {
        elImgContainer.innerHTML = `<h2>there is no photo to display</h2>`
    } else {
        elImgContainer.innerHTML = ''
        renderImg(newImgs)
    }
}

function renderImgToCanvas(elImg, imgUrl, id) {
    gCurrentImg = elImg
    gMeme.selectedImgId = id
    console.log(imgUrl);
    var height = gCurrentImg.naturalHeight;
    var width = gCurrentImg.naturalWidth;
    console.log(width);
    var elImgContainer = document.querySelector('.img-container')
    elImgContainer.style.display = 'none'
    renderCanvas(imgUrl, height, width)
}

function renderCanvas(url, height, width) {
    var elCanvasContainer = document.querySelector('.canvas-container')
    gCanvas = document.querySelector('#myCanvas')
    elCanvasContainer.style.display = 'flex'
    gCanvas.width = width
    gCanvas.height = height
    gCtx = gCanvas.getContext('2d')
    drawImage(url)
}

function drawImage(url) {
    var img = new Image()
    img.src = url
    img.onload = function () {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function updateStyle(ev, txt) {
    ev.preventDefault()
    var elFontAlign = document.querySelector('.font-align')
    var elFontSize = document.querySelector('.font-size')
    var elFontColor = document.querySelector('.font-color')
    gMeme.txts[gMeme.txts.length-1].size = elFontSize.value;
    // gMeme.txts[0].align = elFontAlign.innerText;
    // gMeme.txts[0].color = elFontColor.innerText;

    drawText(txt, 256, 200)
    // gCtx.fillText(txt, 50, 50)
    // renderCanvas()
    // gCtx.strokeText(txt, 150, 150)
}

function returnBack() {
    var elCanvasContainer = document.querySelector('.canvas-container')
    var elImgContainer = document.querySelector('.img-container')
    elCanvasContainer.style.display = 'none'
    elImgContainer.style.display = 'flex'
    renderImg(gImgs)
}


function touchCanvas(ev) {
    addInput(ev.clientX, ev.clientY);
}

function addInput(x, y) {

    console.log(x);
    console.log(y);
    var input = document.createElement('input');
    input.type = 'text';
    input.style.position = 'fixed';
    input.style.left = (x - 4) + 'px';
    input.style.top = (y - 4) + 'px';
    input.style.background = 'transparent'
    input.onkeydown = handleEnter;
    document.body.appendChild(input);
    input.focus();
}

function handleEnter(ev) {
    var keyCode = ev.keyCode;
    if (keyCode === 13) {
        drawText(this.value, parseInt(this.style.left, 10), parseInt(this.style.top, 10));
        document.body.removeChild(this);
    }
}

function drawText(txt, x, y) {
    if (txt !==undefined) {
        gMeme.txts[gMeme.txts.length] = gMeme.txts[gMeme.txts.length - 1]
        gMeme.txts[gMeme.txts.length - 1].line = txt
    }
    var elFont = document.querySelector('.font')
    var imgUrl = gImgs[gMeme.selectedImgId - 1].url
    drawImage(imgUrl)

    function renderTxt() {
        gMeme.txts.forEach(function (text) {
            var fontSize = text.size + 'px' + ' ' + elFont.value
            gCtx.fillStyle = 'red'
            gCtx.font = `${fontSize}`
            gCtx.textBaseline = 'top';
            gCtx.textAlign = 'left';
            gCtx.font = font;
            gCtx.fillText(text.line, x - 20, y - 110);
        })
    }
    setTimeout(renderTxt, 1)
}