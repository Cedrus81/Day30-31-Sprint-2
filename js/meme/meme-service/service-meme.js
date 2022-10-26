var gMeme

function createMeme() {
    return {
        fontSize: 48
    }
}


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