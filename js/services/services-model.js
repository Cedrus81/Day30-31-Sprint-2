var gKeywords = [
    { name: 'Men', value: 2 },
    { name: 'Dogs', value: 3 },
    { name: 'Smile', value: 7 },
    { name: 'Success', value: 5 },
    { name: 'Animals', value: 6 },
    { name: 'Baby', value: 1 },
    { name: 'Surprised', value: 3 },
    { name: 'Bad', value: 4 },
    { name: 'Funny', value: 8 },
    { name: 'Sports', value: 2 },
    { name: 'Movie', value: 3 },
]
var gImages = [{
    id: makeId(),
    url: `./images-square/1.jpg`,
    keywords: [gKeywords[0], gKeywords[7]],
},
{
    id: makeId(),
    url: `./images-square/2.jpg`,
    keywords: [gKeywords[1], gKeywords[4], gKeywords[5]],
},
{
    id: makeId(),
    url: `./images-square/3.jpg`,
    keywords: [gKeywords[1], gKeywords[4], gKeywords[5]],
},
{
    id: makeId(),
    url: `./images-square/4.jpg`,
    keywords: [gKeywords[4]],
},
{
    id: makeId(),
    url: `./images-square/5.jpg`,
    keywords: [gKeywords[5], gKeywords[3]],
}, {
    id: makeId(),
    url: `./images-square/6.jpg`,
    keywords: [gKeywords[10], gKeywords[0]],
}, {
    id: makeId(),
    url: `./images-square/7.jpg`,
    keywords: [gKeywords[5], gKeywords[6], gKeywords[8]],
}, {
    id: makeId(),
    url: `./images-square/8.jpg`,
    keywords: [gKeywords[0], gKeywords[10], gKeywords[7]],
}, {
    id: makeId(),
    url: `./images-square/9.jpg`,
    keywords: [gKeywords[5], gKeywords[7]],
}, {
    id: makeId(),
    url: `./images-square/10.jpg`,
    keywords: [gKeywords[0], gKeywords[2]],
}, {
    id: makeId(),
    url: `./images-square/11.jpg`,
    keywords: [gKeywords[0], gKeywords[9]],
}, {
    id: makeId(),
    url: `./images-square/12.jpg`,
    keywords: [gKeywords[0], gKeywords[7], gKeywords[10]],
}, {
    id: makeId(),
    url: `./images-square/13.jpg`,
    keywords: [gKeywords[0], gKeywords[3], gKeywords[2], gKeywords[10]],
}, {
    id: makeId(),
    url: `./images-square/14.jpg`,
    keywords: [gKeywords[10], gKeywords[6]],
}, {
    id: makeId(),
    url: `./images-square/15.jpg`,
    keywords: [gKeywords[10], gKeywords[7]],
}, {
    id: makeId(),
    url: `./images-square/16.jpg`,
    keywords: [gKeywords[10], gKeywords[8]],
}, {
    id: makeId(),
    url: `./images-square/17.jpg`,
    keywords: [gKeywords[0], gKeywords[7], gKeywords[3]],
}, {
    id: makeId(),
    url: `./images-square/18.jpg`,
    keywords: [gKeywords[6], gKeywords[10], gKeywords[7]],
},]

var gFilters = { txt: '' }

function getImgById(imgId) {
    return getImages().find(image => image.id === imgId)
}
function getKeyWords() {
    return gKeywords
}
function get(params) {

}

function getRandomKeyword() {
    const keywords = getKeyWords()
    return keywords[getRandomInt(keywords.length)]
}

function getImages() {
    return gImages.filter(img => filterKeywords(img.keywords))
}
function getKeywordbyName(name) {
    return gKeywords.find(kw => kw.name === name)
}
function filterKeywords(kws) {
    return kws.some(kw => kw.name.toLowerCase().includes(gFilters.txt))
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
    const img = new Image();
    const images = getImages()
    img.src = images[getRandomInt(images.length - 1)].url
    return img
}

function setTxtFilter(txt) {
    gFilters.txt = txt.toLowerCase()
}