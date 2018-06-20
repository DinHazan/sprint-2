'use strict'


function renderImg(imgs) {
    var elImgContainer = document.querySelector('.img-container')
    imgs.forEach(function (img) {
        elImgContainer.innerHTML += `
        <li class="flex container"><img src="${img.url}" alt="" onclick="renderToCanvas( this ,'${img.url}')"></li>
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

function renderToCanvas(th ,imgUrl) {
    console.log(imgUrl);
    var height = th.naturalHeight;
    var width = th.naturalWidth;
    console.log(width);
    
    var elImgContainer = document.querySelector('.img-container')
    elImgContainer.style.display = 'none'
    renderCanvas(imgUrl , height , width)
}

function renderCanvas(url , height , width){
    var elCanvas = document.querySelector('#myCanvas')
    elCanvas.style.display = 'block'
    elCanvas.width = width
    elCanvas.height = height
    var ctx = elCanvas.getContext('2d')
    drawImage(ctx , url , elCanvas)
}

function drawImage(ctx , url , canvas) {
    var img = new Image()
    img.src = url
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
}