var gKeywords = [
    { name: 'Men', value: 2 },
    { name: 'Dogs', value: 3 },
    { name: 'Smile', value: 7 },
    { name: 'Car', value: 1 },
    { name: 'Success', value: 5 },
    { name: 'Animals', value: 6 },
    { name: 'Baby', value: 1 },
    { name: 'Surprised', value: 3 },
    { name: 'Bad', value: 4 },
    { name: 'Funny', value: 8 },
    { name: 'Sports', value: 2 },
    { name: 'Movie', value: 3 },
]

var gFilters = { txt: '' }



function getImgById(imgId) {
    return getImages().find(image => image.id === imgId)
}
function getKeyWords() {
    return gKeywords
}
function get(params) {

}
function createImages() {
    const images = []
    for (let i = 0; i < 18; i++) {
        images[i] = {
            id: makeId(),
            url: `./images-square/${i + 1}.jpg`,
            keywords: [getRandomKeyword(), getRandomKeyword()],
        }
    }
    saveToStorage(IMG_STORAGE, images)
}

function getRandomKeyword() {
    const keywords = getKeyWords()
    return keywords[getRandomInt(keywords.length)]
}

function getImages() {
    return gImages.filter(img => filterKeywords(img.keywords))
}

function filterKeywords(kws) {
    return kws.some(kw => kw.name.toLowerCase().includes(gFilters.txt.toLowerCase()))
}
// return the wanted size of the keyword on the search-bar. maximum allowed is 2.5em
function setKeywordSize(value) {
    return Math.min(2.8, 1 + value * 0.2)
}

function getKeyWordByName(name) {
    const keywords = getKeyWords()
    return keywords.find(kw => kw.name === name)
}

function getRandomImage() {
    const images = loadFromStorage(IMG_STORAGE)
    return images[getRandomInt(images.length - 1)].url
}

function setTxtFilter(txt) {
    gFilters.txt = txt.toLowerCase()
}