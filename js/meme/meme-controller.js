const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onNewMeme(imgId) {
    //model
    createMeme()
    setMemeImg(imgId)
    //DOM
    doSwitchDisplay()
    renderMeme()
}

function onNavLine() {
    navLine()
}

function onRemoveLine() {
    removeLine()
    renderMeme()
}


function onAddLine() {
    addNewLine()
    renderMeme()
}

function onSetFontSize(value) {
    setLineFont(+value)
    renderMeme()
}

function onSelectFillStyle(color) {
    setLineFillStyle(color)
    renderMeme()
}


function onDrawText(text) {
    setMemeText(text)
    renderMeme()

}


function onNavStickers(value) {
    setStickersStartIdx(+value)
    renderStickerSelection()
}


function renderMeme() {
    gCtx.drawImage(gMeme.img, 0, 0)
    renderLines()
    renderStickers()
}

function renderStickers() {
    gMeme.stickers.forEach(sticker => {
        const { x, y } = sticker
        gCtx.drawImage(sticker.img, x, y);
    })
}

function renderLines() {
    gMeme.lines.forEach(line => {
        if (line.text) {
            setLineContext(line)
            const { x, y } = line.pos
            gCtx.strokeText(line.text, x, y);
            gCtx.fillText(line.text, x, y);
        }
    })
}


function onSetTextAlign(value) {
    setTextAlign(value)
    renderMeme()
}

function onSaveMeme() {
    const meme = getMeme()
    const memeCollection = getMemeCollection()
    memeCollection.push(meme)
    saveToStorage(MEMES_DB, memeCollection)
}


function onClickSticker(sticker) {
    const img = new Image();
    img.src = sticker.src
    gMeme.stickers.push({
        img,
        x: gElCanvas.width / 2,
        y: gElCanvas.height / 2,
    }
    )
    renderMeme()
}







// CANVAS HANDLERS ########################

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    //Listen for resize ev 
    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMeme()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}


function onDown(ev) {
    ev.preventDefault()
    const pos = getEvPos(ev)
    isLineClicked(pos)
    // gCtx.beginPath()
}

function onUp(ev) {
    ev.preventDefault()
    const pos = getEvPos(ev)
    getCurrentLine().isDrag = false
    document.querySelector('canvas').classList.remove('grab')
}

function onMove(ev) {
    ev.preventDefault()
    if (!getCurrentLine().isDrag) {
        document.body.style.cursor = 'grab'
        return
    }
    //Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    getCurrentLine().pos = pos
    renderMeme()
}

function getEvPos(ev) {
    //Gets the offset pos , the default pos
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    // Check if its a touch ev
    if (TOUCH_EVS.includes(ev.type)) {
        //soo we will not trigger the mouse ev
        ev.preventDefault()
        //Gets the first touch point
        ev = ev.changedTouches[0]
        //Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}