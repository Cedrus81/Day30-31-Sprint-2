function getImgById(imgId) {
    return getImages().find(image => image.id === imgId)
}
function getKeyWords() {
    gKeywords
    return gKeywords
}

function createMemes() {
    const images = []
    for (let i = 0; i < 18; i++) {
        images[i] = {
            id: makeId(),
            url: `./images-square/${i + 1}.jpg`,
            keywords: [],
        }
    }
    saveToStorage(IMG_STORAGE, images)
}

function getImages() {
    return gImages
}

// return the wanted size of the keyword on the search-bar. maximum allowed is 2.5em
function setFontSize(value) {
    return Math.min(2.8, 1 + value * 0.2)
}