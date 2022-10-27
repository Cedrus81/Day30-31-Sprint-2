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

function navLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function onAddLine() {
    addNewLine()

}


function onDrawText(text) {
    setMemeText(text)
    renderMeme()

}

function renderMeme() {
    gCtx.drawImage(gMeme.img, 0, 0)
    renderLines
    renderLines()
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
    gCtx.beginPath()
}

function onUp(ev) {
    ev.preventDefault()
    const pos = getEvPos(ev)
}

function onMove(ev) {
    // if (!gIsDraw) return
    ev.preventDefault()
    //Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
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