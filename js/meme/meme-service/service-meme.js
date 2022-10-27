var gMeme
var gMemeCollection = []
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

var gStickers = {
    startIdx: 0,
    stickers: [
        './stickers/ricky.png',
        './stickers/angry-women.png',
        './stickers/jordan-crying.png',
        './stickers/smart.png',
        './stickers/me-and-the-boys.png',
        './stickers/cat-crying.png',
    ],
}

function createMeme() {
    gMeme = {
        selectedLineIdx: 0,
        lines: []
    }
    addNewLine()
}


function getMeme() {
    return gMeme
}

function getContext() {
    return gCtx
}

function addNewLine() {
    const { x, y } = getCurrentPosition()
    const newLine = {
        text: 'New Line',
        fontSize: 48,
        font: 'px Impact',
        fillStyle: 'white',
        textAlign: 'center',
        pos: {
            x,
            y,
        },
    }
    newLine.lineWidth = newLine.fontSize / 15
    gMeme.lines.push(newLine)
    navLine()
}

function getCurrentPosition() {
    //handles exception if all lines were deleted
    if (gMeme.lines.length === 0) return { x: gElCanvas.width / 2, y: gElCanvas.height / 10 }
    return getCurrentLine().pos
}

function setStickersStartIdx(value) {
    gStickers.startIdx = Math.abs(gStickers.startIdx + value)
}

function setMemeImg(imgId) {
    const img = new Image();
    img.src = getImgById(imgId).url
    gMeme.img = img
}

function setMemeText(text) {
    gMeme.lines[gMeme.selectedLineIdx].text = text
}


function setLineContext(line) {
    gCtx.font = line.fontSize + line.font
    gCtx.fillStyle = line.fillStyle
    gCtx.lineWidth = line.lineWidth
    gCtx.textAlign = line.textAlign
}

function setTextAlign(value) {
    getCurrentLine().textAlign = value
}

function setLineFont(value) {
    const line = getCurrentLine()
    line.fontSize += value
}

function setLineFillStyle(color) {
    getCurrentLine().fillStyle = color
}

function navLine() {
    gMeme.selectedLineIdx++
    if (gMeme.selectedLineIdx >= gMeme.lines.length) gMeme.selectedLineIdx = 0
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    navLine()
    //todo: disable all buttons if gMeme.line.length === 0
}

function getRandomSetence() {
    return gMemeSetences[getRandomInt(gMemeSetences.length - 1)]
}

function getCurrentLine() {
    return gMeme.lines[gMeme.selectedLineIdx]
}




// TOUCH EVENTS

function isInObject(pos) {
    // console.log(pos);
    gMeme.lines.forEach((line, idx) => {
        console.log('y:', Math.abs(line.pos.y - pos.y), ' <', line.fontSize);
        console.log('x:', Math.abs(line.pos.x - pos.x), ' <', (line.fontSize / 4) * line.text.length);

        if (
            Math.abs(line.pos.y - pos.y) < line.fontSize &&
            Math.abs(line.pos.x - pos.x) < (line.fontSize * line.text.length) / 4) {
            console.log('is in borders!');
            gMeme.selectedLineIdx = idx
        } else console.log('is not in borders');
    })
}