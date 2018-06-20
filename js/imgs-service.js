'use strict'

var gImgs = [{
        id: 1,
        url: 'img/001.jpg',
        keywords: ['happy' , 'crazy']
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
]
//     {
//         id: 1,
//         url: 'img/popo.jpg',
//         keywords: ['happy']
//     },
//     {
//         id: 1,
//         url: 'img/popo.jpg',
//         keywords: ['happy']
//     },
//     {
//         id: 1,
//         url: 'img/popo.jpg',
//         keywords: ['happy']
//     },
//     {
//         id: 1,
//         url: 'img/popo.jpg',
//         keywords: ['happy']
//     },
//     {
//         id: 1,
//         url: 'img/popo.jpg',
//         keywords: ['happy']
//     },
//     {
//         id: 1,
//         url: 'img/popo.jpg',
//         keywords: ['happy']
//     },
//     {
//         id: 1,
//         url: 'img/popo.jpg',
//         keywords: ['happy']
//     },

// ]

function onSortByTag(tag) {
    debugger
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