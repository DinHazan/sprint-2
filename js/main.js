'use strict'


var gCtx
var gCanvas


function renderImg(imgs) {
    var elImgContainer = document.querySelector('.img-container')
    elImgContainer.innerHTML = ''
    imgs.forEach(function (img) {
        elImgContainer.innerHTML += `
        <li class="flex container"><img src="${img.url}" alt="" onclick="renderToCanvas( this ,'${img.url} ${img.id}')"></li>
        `
    })
}
renderImg(gImgs)

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

function renderToCanvas(th, imgUrl ,id) {
    gMeme.selectedImgId = id 
    console.log(imgUrl);
    var height = th.naturalHeight;
    var width = th.naturalWidth;
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

function writeOnCanvas() {
    var elCanvas = document.querySelector('#myCanvas')

}

function drawText(ev , txt) {
    ev.preventDefault()
    var elFont = document.querySelector('.font')
    var elFontSize = document.querySelector('.font-size')
     var fontSize = elFontSize.innerText + "px"
    gCtx.fillStyle = 'red'
    gCtx.font = `"${fontSize} ${elFont.value}"`
    gCtx.fillText(txt, 50, 50)
    renderCanvas()
    // gCtx.strokeText(txt, 150, 150)
}

function returnBack() {
    var elCanvasContainer = document.querySelector('.canvas-container')
    var elImgContainer = document.querySelector('.img-container')
    elCanvasContainer.style.display = 'none'
    elImgContainer.style.display = 'flex'
    renderImg(gImgs)
}

function fontSizeRender(ev ,num) {
    ev.preventDefault()
    var elFontSize = document.querySelector('.font-size')
    var currrentNum = elFontSize.innerText 
    currrentNum = parseInt(currrentNum)
    if(currrentNum + num < 1 ) return
    elFontSize.innerText = currrentNum + num
}