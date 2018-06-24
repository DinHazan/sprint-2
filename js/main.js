'use strict'


var gCtx
var gCanvas
var gCurrentImg
var gSelectedText;
function renderImg(imgs) {
    var elImgContainer = document.querySelector('.img-container')
    elImgContainer.innerHTML = ''
    imgs.forEach(function (img) {
        elImgContainer.innerHTML += `
        <li class="flex"><img src="${img.url}" alt="" onclick="renderImgToCanvas( this ,'${img.url}' , '${img.id}')"></li>
        `
    })
    renderStyleTools()
}
renderImg(gImgs)

function renderStyleTools() {
    var elFontSize = document.querySelector('#font-size')
    for (var i = 10; i < 100;) {
        elFontSize.innerHTML += `
        <option value="${i}">
        `
        i = i + 10
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
    displayOftenKeyword()  
}

function renderImgToCanvas(elImg, imgUrl, id) {
    gCurrentImg = elImg
    gMeme.selectedImgId = id
    console.log(imgUrl);
    var height = gCurrentImg.naturalHeight;
    var width = gCurrentImg.naturalWidth;
    var ratio = height / width
    var elImgContainer = document.querySelector('.img-container')
    elImgContainer.style.display = 'none'
    renderCanvas(imgUrl, ratio)
}


function renderCanvas(url, ratio) {
    var elCanvasContainer = document.querySelector('.canvas-container')
    elCanvasContainer.style.display = 'flex'
    gCanvas = document.querySelector('#myCanvas')
    var width = window.innerWidth / 2;
    var height = Math.min(width * ratio, window.innerHeight);
    gCanvas.width = width;
    gCanvas.height = height;
    console.log('width', width);
    console.log('height', height);
    gCtx = gCanvas.getContext('2d')
    drawImage(url)
}

function drawImage(url) {
    console.log('width', gCanvas.width);
    console.log('height', gCanvas.height);
    var img = new Image()
    img.src = url
    img.onload = function () {
        img.height = gCanvas.height;
        console.log(img);
        img.width = gCanvas.width;
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

var gTextAlign;
var gFontSize;
var gFontColor;
var gFont;
var gTextPos = {
    x: 10,
    y: 20,
}

function updateStyle(ev, txt) {
    ev.preventDefault()
    gTextAlign = getRadioCheckedValue('align-text', 'align')
    gFontSize = document.querySelector('.font-size') === null ? '20' : document.querySelector('.font-size').value
    gFontColor = document.querySelector('.font-color') === null ? 'red' : document.querySelector('.font-color').value
    gFont = getRadioCheckedValue('fontStyle', 'fontStyle')
    if (gMeme.txts.length > 0) {
        var lastText = gMeme.txts[gMeme.txts.length - 1];
        lastText.color = gFontColor;
        lastText.size = gFontSize;
        lastText.align = gTextAlign;
        lastText.font = gFont;
    }
    drawText(txt, 164, 278)
}

function returnBack() {
    var elCanvasContainer = document.querySelector('.canvas-container')
    var elImgContainer = document.querySelector('.img-container')
    elCanvasContainer.style.display = 'none'
    elImgContainer.style.display = 'grid'
    renderImg(gImgs)
}
function isValidPlace(x , y){
    debugger
    var pos = getMousePos(gCanvas, x, y)
    if(!gMeme.txts) return
    var selectText = gMeme.txts.filter(function(meme){
        var width =  meme.X + meme.size * meme.line.length 
        var height =  meme.Y - meme.size 
        if(width >= pos.x && pos.x >= meme.X && height <= pos.y && pos.y <= meme.Y) return meme
    })
    console.log('selected text' , selectText);
    if(selectText){
        gSelectedText = selectText;
        return
    }
}

function touchCanvas(ev) {
    gTextPos.x = ev.clientX
    gTextPos.y = ev.clientY
    isValidPlace(gTextPos.x , gTextPos.y)
    addInput(gTextPos.x, gTextPos.y);
    console.log("touchCanvas: X: " + ev.clientX + " Y: " + ev.clientY);
}

function addInput(x, y) {

    console.log(x);
    console.log(y);
    var input = document.createElement('input');
    input.type = 'text';
    input.style.position = 'fixed';
    input.style.left = x + 'px';
    input.style.top = y + 'px';
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
    var imgUrl = gImgs[gMeme.selectedImgId - 1].url
    drawImage(imgUrl)
    var pos = getMousePos(gCanvas, x, y)
    console.log("After getMousePos:\n x: " + pos.x + "\n y: " + pos.y);
    x = pos.x;
    y = pos.y;

    if (txt !== '') {
        var newText = {}; //=new Text();
        newText.line = txt;
        newText.size = gFontSize === undefined ? '30' : gFontSize;
        newText.color = gFontColor === undefined ? 'red' : gFontColor;;
        newText.align = gTextAlign === undefined ? 'center' : gTextAlign;
        newText.font = gFont === undefined ? 'impact' : gFont;
        newText.X = x+10;
        newText.Y = y+10;
        addMeme(newText)
    }
    setTimeout(renderTxt, 1)

}

function textPosUpdateX(num) {
    gTextPos.x += num
}

function renderTxt() {
    gMeme.txts.forEach(function (text) {
        var fontSize = text.size + 'px' + ' ' + text.font
        gCtx.fillStyle = `${text.color}`
        gCtx.font = `${fontSize}`
        gCtx.textBaseline = 'Middle';
        gCtx.textAlign = text.align;
        gCtx.fillText(text.line, text.X, text.Y);
    })
}

function getMousePos(canvas, x, y) {
    var rect = canvas.getBoundingClientRect();
    console.log("getMousePos:\n x: " + x + "\n y: " + y);
    return {
        x: (x - rect.left),
        y: (y - rect.top)
    };
}

function isChecked() {
    var radios = document.getElementsByName('font');
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            alert(radios[i].value);
            break;
        }
    }
}

function getRadioCheckedValue(form_name, option) {
    var radios = document.forms[form_name][option]
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
}

function displayOftenKeyword() {
    debugger
    var avg = 0;
    gTags.forEach(function (tag) {
        avg += tag.chooseCount
    })
    var mostComoons = gTags.map(function (tag) {
        return (tag / avg)
    })

    console.log(mostComoons);

}


function displayKeywords(mostComkeys) {
    mostComkeys.forEach(function (keyPres) {
        if(key < 10){
            render
        }
    })
}