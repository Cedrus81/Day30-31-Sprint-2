'use strict'
const IMG_STORAGE = 'imagesDB'
const MY_MEME = 'myMemeDB'
const MEMES_DB = 'memesDB'
var gImages
var gElCanvas = document.querySelector('canvas')
var gCtx = document.querySelector('canvas').getContext('2d')


function init() {
    gImages = loadFromStorage(IMG_STORAGE) || createImages()
    renderKeywords()
    renderGallery()
    renderStickers()
    addListeners() // at meme/meme-controller.js
}

function renderStickers() {
    const elSection = document.querySelector('.special-controls')
    let strHTML = '<button value="-1" class="btn" onclick="onNavStickers(this.value)">&laquo;</button>'
    // debugger
    for (let i = 0; i < 3; i++) {
        strHTML += `<img src="${gStickers.stickers[(gStickers.startIdx + i) % gStickers.stickers.length]}" alt="">`
    }
    // gStickers.every((sticker, idx) => {
    //     strHTML += `<img src="${sticker}" alt="">`
    //     if (idx >= 2) return false
    //     return true
    // })
    strHTML += '<button value="1" class="btn" onclick="onNavStickers(this.value)">&raquo;</button>'
    elSection.innerHTML = strHTML
}

function renderKeywords() {
    const elList = document.querySelector('.keyword-links')
    let strHTML = ''
    const keywords = getKeyWords()

    keywords.every((keyword, idx) => {
        strHTML += `<li style="font-size: ${setKeywordSize(keyword.value)}em;" onclick="onClickKeyword('${keyword.name}')">${keyword.name}</li > `
        return (idx < 5) //limit amount shown to 6
    })
    elList.innerHTML = strHTML
}

function renderGallery() {
    const elGallery = document.querySelector('.main-gallery')
    const images = getImages()
    let strHTML = ''
    images.forEach(img =>
        strHTML += `<img class="gallery-item" onclick="onNewMeme('${img.id}')" src="${img.url}" alt="">`
    )
    elGallery.innerHTML = strHTML
}


function onClickKeyword(name) {
    const keyword = getKeyWordByName(name)
    keyword.value++
    setTxtFilter(name)
    renderKeywords()
    renderGallery()
}

function doSwitchDisplay() {
    const elEditor = document.querySelector('.editor')
    const elGallery = document.querySelector('.main-content')
    elEditor.classList.toggle('hidden')
    elGallery.classList.toggle('hidden')
}

function onRandomMeme() {
    const meme = getMeme()
    meme.fontSize = getRandomInt(58, 16)
    setMemeFont() //todo placeholder only
    meme.url = getRandomImage()
    meme.text = getRandomSetence()
    //switch display
    doSwitchDisplay()
    renderMeme()
}

function onFilterImagesByText(txt) {
    setTxtFilter(txt)
    renderKeywordDatalist()
    renderGallery()
}

function renderKeywordDatalist() {
    const elDatalist = document.querySelector('#keyList')
    const kws = getKeyWords()
    let strHTML = ''
    let count = 0
    kws.every(kw => {
        if (kw.name.toLowerCase().includes(gFilters.txt.toLowerCase())) {
            strHTML += `<option value="${kw.name}"></option>`
            count++
        }
        if (count === 4) return false // limit datalist size to 4
        return true
    })
    elDatalist.innerHTML = strHTML
}




