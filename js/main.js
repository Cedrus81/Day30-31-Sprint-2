'use strict'
const IMG_STORAGE = 'imagesDB'
const MY_MEME = 'myMemeDB'
const MEMES_DB = 'memesDB'
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
        strHTML += `<li style="font-size: ${setFontSize(keyword.value)}em;" onclick="onClickKeyword('${keyword.name}')">${keyword.name}</li > `
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
function getKeyWordByName(name) {
    const keywords = getKeyWords()
    return keywords.find(kw => kw.name === name)
}

function onClickKeyword(name) {
    const keyword = getKeyWordByName(name)
    keyword.value++
    renderKeywords()
}

function doSwitchDisplay() {
    const elEditor = document.querySelector('.editor')
    const elGallery = document.querySelector('.main-content')
    elEditor.classList.toggle('hidden')
    elGallery.classList.toggle('hidden')
}

function onRandomMeme() {
    debugger
    const meme = getMeme()
    meme.fontSize = getRandomInt(58)
    setMemeFont() //todo placeholder only
    meme.url = getRandomImage()
    meme.text = getRandomSetence()
    //switch display
    doSwitchDisplay()
    renderMeme()
}