'use strict'

var gImgs = [{
        id: 1,
        url: 'img/001.jpg',
        keywords: ['happy', 'crazy']
    },
    {
        id: 2,
        url: 'img/002.jpg',
        keywords: ['happy']
    },
    {
        id: 3,
        url: 'img/003.jpg',
        keywords: ['happy']
    },
    {
        id: 4,
        url: 'img/004.jpg',
        keywords: ['happy']
    },
    {
        id: 5,
        url: 'img/005.jpg',
        keywords: ['happy']
    },
    {
        id: 6,
        url: 'img/006.jpg',
        keywords: ['happy']
    },
    {
        id: 7,
        url: 'img/007.jpg',
        keywords: ['happy']
    },
    {
        id: 8,
        url: 'img/008.jpg',
        keywords: ['happy']
    },
    {
        id: 9,
        url: 'img/009.jpg',
        keywords: ['happy']
    },
    {
        id: 10,
        url: 'img/010.jpg',
        keywords: ['happy']
    },
    {
        id: 11,
        url: 'img/011.jpg',
        keywords: ['happy']
    },
    {
        id: 12,
        url: 'img/012.jpg',
        keywords: ['happy']
    },
    {
        id: 13,
        url: 'img/013.jpg',
        keywords: ['happy']
    },
    {
        id: 14,
        url: 'img/014.jpg',
        keywords: ['happy']
    },
    {
        id: 15,
        url: 'img/015.jpg',
        keywords: ['happy']
    },
    {
        id: 16,
        url: 'img/016.jpg',
        keywords: ['happy']
    },
    {
        id: 17,
        url: 'img/017.jpg',
        keywords: ['happy']
    },
    {
        id: 18,
        url: 'img/018.jpg',
        keywords: ['happy']
    },
    {
        id: 19,
        url: 'img/019.jpg',
        keywords: ['happy']
    },
    {
        id: 20,
        url: 'img/020.jpg',
        keywords: ['happy']
    },
    {
        id: 21,
        url: 'img/021.jpg',
        keywords: ['happy']
    },
    {
        id: 22,
        url: 'img/022.jpg',
        keywords: ['happy']
    },
    {
        id: 23,
        url: 'img/023.jpg',
        keywords: ['happy']
    },
    {
        id: 24,
        url: 'img/024.jpg',
        keywords: ['happy']
    },
    {
        id: 25,
        url: 'img/025.jpg',
        keywords: ['happy']
    },
    
]


var gMeme = {
    selectedImgId: 5,
    txts: [{
        line: 'I  never  eat  Falafel',
        size: 20,
        align: 'left',
        color: 'red'
    }]
}






function onSortByTag(tag) {
    tag = tag.toLowerCase()

    var fliteredImgs = gImgs.filter(function (img) {
        var isTagMatch = img.keywords.some(function (keyword) {
            if (keyword === tag) {
                return true
            }
        })
        if (isTagMatch === true) {
            return img
        }
    })
    return fliteredImgs
}