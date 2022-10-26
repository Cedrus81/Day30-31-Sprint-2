'use strict'
const MEME_STORAGE = 'memesDB'

const EDITOR_URL = 'http://127.0.0.1:5500/editor.html'
var gMemes
var gKeywords = [
    { name: 'Men', value: 2 },
    { name: 'Dogs', value: 3 },
    { name: 'Smile', value: 7 },
    { name: 'Car', value: 1 },
    { name: 'Success', value: 5 },
    { name: 'Angry', value: 2 },
]

function init() {
    gMemes = loadFromStorage(MEME_STORAGE) || createMemes()
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
    const memes = getMemes()
    console.log(memes);
    memes.forEach(meme =>
        elGallery.innerHTML += `<a href="http://127.0.0.1:5500/editor.html"><img class="gallery-item" onclick="renderMeme('${meme.id}')" src="${meme.url}" alt=""></a>`
    )
}


function renderMeme(memeId) {
    const meme = getMemeById(memeId)
    console.log(meme);
}



//todo: move to AJAX

function onGoToEditor(url, cb, memeId) {
    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if (XHR.readyState === XMLHttpRequest.DONE && XHR.status === 200) {
            window.location.replace(url)
            debugger
            cb(memeId)
        }
    }

    XHR.open('GET', url)
    XHR.send()
}



