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
    renderItems()
}

function renderItems() {
    gMeme.items.forEach(item => {
        const { x, y } = item
        switch (item.type) {
            case 'line':
                renderLine(item, x, y)
                break
            case 'sticker':
                gCtx.drawImage(item.img, x, y, item.width, item.height)
                break
        }
    })
}

function renderLine(line, x, y) {
    setLineContext(line)
    gCtx.strokeText(line.text, x, y);
    gCtx.fillText(line.text, x, y);
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


function onAddSticker(sticker) {
    addSticker(sticker)
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
    isObjectClicked(pos)
}

function onUp(ev) {
    ev.preventDefault()
    const pos = getEvPos(ev)
    getCurrentItem().isDrag = false
    document.querySelector('canvas').classList.remove('grab')
}

function onMove(ev) {
    ev.preventDefault()
    if (!getCurrentItem().isDrag) {
        document.body.style.cursor = 'grab'
        return
    }
    //Get the ev pos from mouse or touch
    const { x, y } = getEvPos(ev)
    moveItem(x, y)
    renderMeme()
}

function moveItem(x, y) {
    const item = getCurrentItem()
    switch (item.type) {
        case 'line':
            item.x = x
            item.y = y + (item.fontSize / 2)
            break
        case 'sticker':
            item.x = x - (item.width / 2)
            item.y = y - (item.height / 2)
            break
    }
}

function moveLine(line, x, y) {

}

function moveSticker(sticker, x, y) {

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