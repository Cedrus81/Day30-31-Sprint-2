
function onLoadEditor(imgId) {
    //model
    gMeme = loadFromStorage(MY_MEME) || createMeme()
    setMemeImg(imgId)
    setMemeFont() //todo placeholder only

    //DOM
    doSwitchDisplay()
    renderMeme()
}



function setMemeFontSize(params) {

}


function onDrawText(text) {
    setMemeText(text)
    renderMeme()

}

function renderMeme() {
    const meme = getMeme()
    const img = new Image();
    img.src = meme.url
    gCtx.drawImage(img, 0, 0)
    gCtx.strokeText(meme.text, gElCanvas.width / 2, gElCanvas.height / 10);
    gCtx.fillText(meme.text, gElCanvas.width / 2, gElCanvas.height / 10);
}

function onSaveMeme() {
    const meme = getMeme()
    const memeCollection = getMemeCollection()
    memeCollection.push(meme)
    saveToStorage(MEMES_DB, memeCollection)
}