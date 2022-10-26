function getMemeById(memeId) {
    return getMemes().find(meme => meme.id === memeId)
}
function getKeyWords() {
    gKeywords
    return gKeywords
}

function createMemes() {
    const memes = []
    for (let i = 0; i < 18; i++) {
        memes[i] = {
            id: makeId(),
            url: `./images-square/${i + 1}.jpg`,
            keywords: [],
        }
    }
    saveToStorage(MEME_STORAGE, memes)
}

function getMemes() {
    return gMemes
}

// return the wanted size of the keyword on the search-bar. maximum allowed is 2.5em
function setFontSize(value) {
    return Math.min(2.8, 1 + value * 0.2)
}