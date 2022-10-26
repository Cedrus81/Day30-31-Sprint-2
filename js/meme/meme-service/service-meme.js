var gMeme = {
    fontSize: 38
}
var gMemeSetences = [
    `I have nothing but respect for you -- and not much of that`,
    `Anyone who says he can see through women is missing a lot`,
    `I intend to live forever, or die trying`,
    `Whatever it is, I'm against it`,
    `Before I speak, I have something important to say`,
    `Never let your best friends get lonely, keep disturbing them.`,
    `If Cinderella’s shoe fit perfectly, then why did it fall off?`,
    `If you’re hotter than me, then that means I’m cooler than you.`,
    `My wallet is like an onion, opening it makes me cry.`,
    `Friends buy you food. Best friends eat your food.`,
    `Papercut: A tree’s final moment of revenge.`,
    ` Common sense is like deodorant, those who need it the most never use it.`,
    `Life always offers you a second chance. It’s called tomorrow.`,
    `My six pack is protected by a layer of fat.`,
    `When nothing is going right, go left.`,
    `If you have crazy friends you have everything you’ll ever need.`,
]

function getMeme() {
    return gMeme
}

function getContext() {
    return gCtx
}

function setMemeImg(imgId) {
    const meme = getMeme()
    meme.url = getImgById(imgId).url
    saveToStorage(MY_MEME, meme)
}

function setMemeText(text) {
    const meme = getMeme()
    meme.text = text
}


//todo: set it dinamically through the controls
function setMemeFont() {
    const meme = getMeme()
    gCtx.font = meme.fontSize + 'px Impact';
    gCtx.fillStyle = 'white'
    gCtx.lineWidth = meme.fontSize / 15
    gCtx.textAlign = 'center'

}


function getRandomSetence() {
    return gMemeSetences[getRandomInt(gMemeSetences.length - 1)]
}