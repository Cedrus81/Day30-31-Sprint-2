'use strict'

var gKeywords = [
    { name: 'Men', value: 2 },
    { name: 'Dogs', value: 3 },
    { name: 'Smile', value: 7 },
    { name: 'Car', value: 1 },
    { name: 'Success', value: 5 },
    { name: 'Angry', value: 2 },
]

function init() {
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
    //get images
    // for each, add inside .main-gallery
    const images = getImages()
    console.log(images);
    images.forEach(image =>
        elGallery.innerHTML += `<img class="gallery-item" src="${image.url}" alt="">`
    )
    // debugger
}





// todo: move to service-model.js file
function getKeyWords() {
    gKeywords
    return gKeywords
}

function getImages() {
    const images = []
    for (let i = 0; i < 18; i++) {
        images[i] = {
            id: makeId(),
            url: `./images-square/${i + 1}.jpg`,
            keywords: [],
        }
    }
    return images
}


// return the wanted size of the keyword on the search-bar. maximum allowed is 2.5em
function setFontSize(value) {
    return Math.min(2.5, 1 + value * 0.1)
}



// todo: move to service - utils

function makeId(length = 5) {
    var txt = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return txt;
}