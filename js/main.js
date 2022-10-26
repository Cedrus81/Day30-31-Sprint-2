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







// todo: move to service-model.js file
function getKeyWords() {
    gKeywords
    return gKeywords
}


// return the wanted size of the keyword on the search-bar. maximum allowed is 2.5em
function setFontSize(value) {
    return Math.min(2.5, 1 + value * 0.1)
}

