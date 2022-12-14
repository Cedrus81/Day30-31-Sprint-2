'use strict'
const IMG_STORAGE = 'imagesDB'
const MY_MEME = 'myMemeDB'
const MEMES_DB = 'memesDB'

var gElCanvas = document.querySelector('canvas')
var gCtx = gElCanvas.getContext('2d')


function init() {
    renderKeywords()
    renderKeywordDropdown()
    renderGallery()
    renderStickerSelection()
}

function onToggleDropDown(elDropdown) {
    elDropdown.querySelector('.dropdown-menu').classList.toggle('opaque')
}

function renderKeywordDropdown() {
    const elMenu = document.querySelector('.dropdown-menu')
    let strHTML = `<div onclick="onClickKeyword('')">All</div>`
    getKeyWords().forEach(kw => strHTML += `<div onclick="onClickKeyword('${kw.name}')">${kw.name}</div>`)
    elMenu.innerHTML = strHTML
}

function renderStickerSelection() {
    const elSection = document.querySelector('.special-controls')
    let strHTML = '<button value="-1" class="btn" onclick="onNavStickers(this.value)">&laquo;</button>'
    for (let i = 0; i < 3; i++) {
        strHTML += `<img onclick="onAddSticker(this)" src="${gStickers.stickers[Math.abs((gStickers.startIdx + i) % gStickers.stickers.length)]}" alt="">`
    }
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
    if (name) {
        const keyword = getKeyWordByName(name)
        keyword.value++
    }
    setTxtFilter(name)
    renderKeywords()
    renderGallery()
}

function doSwitchDisplay() {
    const elEditor = document.querySelector('.editor')
    const elGallery = document.querySelector('.main-content')
    elEditor.classList.toggle('hidden')
    elGallery.classList.toggle('hidden')
    addListeners() // at meme/meme-controller.js
}

function onRandomMeme() {
    createRandomMeme()
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




