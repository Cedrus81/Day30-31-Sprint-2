'use strict'
const IMG_STORAGE = 'imagesDB'
const MY_MEME = 'myMemeDB'
var gImages
var gElCanvas = document.querySelector('canvas')
var gCtx = document.querySelector('canvas').getContext('2d')
var gKeywords = [
    { name: 'Men', value: 2 },
    { name: 'Dogs', value: 3 },
    { name: 'Smile', value: 7 },
    { name: 'Car', value: 1 },
    { name: 'Success', value: 5 },
    { name: 'Angry', value: 2 },
]

function init() {
    gImages = loadFromStorage(IMG_STORAGE) || createMemes()
    renderKeywords()
    renderGallery()
}


function renderKeywords() {
    const elList = document.querySelector('.keyword-links')
    let strHTML = ''
    const keywords = getKeyWords()

    keywords.forEach((keyword, idx) => {
        strHTML += `<li style="font-size: ${setFontSize(keyword.value)}em;">${keyword.name}</li > `
    })
    elList.innerHTML = strHTML
}

function renderGallery() {
    const elGallery = document.querySelector('.main-gallery')
    const images = getImages()
    images.forEach(img =>
        elGallery.innerHTML += `<img class="gallery-item" onclick="onLoadEditor('${img.id}')" src="${img.url}" alt="">`
    )
}





function doSwitchDisplay() {
    const elEditor = document.querySelector('.editor')
    const elGallery = document.querySelector('.main-content')
    elEditor.classList.toggle('hidden')
    elGallery.classList.toggle('hidden')
}

