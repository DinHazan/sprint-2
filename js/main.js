'use strict'


var gCtx
var gCanvas
var gCurrentImg

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
    var ratio = height / width
    console.log(width);
    var elImgContainer = document.querySelector('.img-container')
    elImgContainer.style.display = 'none'
    renderCanvas(imgUrl, ratio)
}


function renderCanvas(url, ratio) {
    var elCanvasContainer = document.querySelector('.canvas-container')
    elCanvasContainer.style.display = 'flex'
    gCanvas = document.querySelector('#myCanvas')
    var width = window.innerWidth / 2;
    var height = width * ratio;
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
    var elBackgroundColor = document.querySelector('.background-color')
    var elCanvas = document.querySelector('canvas')
    elCanvas.style.backgroundColor = elBackgroundColor.value
    gMeme.txts[gMeme.txts.length - 1].size = elFontSize.value;
    // gMeme.txts[0].align = elFontAlign.innerText;
    gMeme.txts[gMeme.txts.length - 1].color = elFontColor.value;

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
    if (txt !== undefined) {
        gMeme.txts.push(gMeme.txts[0])
        gMeme.txts[gMeme.txts.length - 1].line = txt
    }
    debugger
    var elFont = document.querySelector('input[name="font"]:checked').value
    var imgUrl = gImgs[gMeme.selectedImgId - 1].url
    drawImage(imgUrl)
    x = '150'
    y = '150'
    var pos = getMousePos(gCanvas, x, y)
    x = pos.x
    y = pos.y
    setTimeout(renderTxt, 1)

    function renderTxt() {
        gMeme.txts.forEach(function (text) {
            var fontSize = text.size + 'px' + ' ' + elFont
            gCtx.fillStyle = `${text.color}`
            gCtx.font = `${fontSize}`
            gCtx.textBaseline = 'top';
            gCtx.textAlign = 'left';
            // gCtx.font = font;
            gCtx.fillText(text.line, x, y);
        })
    }

}



function getMousePos(canvas, x, y) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (x - rect.x),
        y: (y - rect.y)
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