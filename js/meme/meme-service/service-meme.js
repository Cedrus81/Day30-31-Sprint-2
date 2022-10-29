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
        selectedItemIdx: 0,
        items: [],
    }
    addNewLine()
}

function createRandomMeme() {
    createMeme()
    gMeme.img = getRandomImage()
    gMeme.items[0].fontSize = getRandomInt(58, 16)
    gMeme.items[0].text = getRandomSetence()
}

function getMeme() {
    return gMeme
}

function getContext() {
    return gCtx
}

function addNewLine() {
    const { x, y } = { x: gElCanvas.width / 2, y: gElCanvas.height / 8 }
    const newLine = {
        type: 'line',
        isDragged: false,
        text: 'New Line',
        fontSize: 48,
        font: 'px Impact',
        fillStyle: 'white',
        textAlign: 'center',
        strokeStyle: '#000000',
        x,
        y,
    }
    newLine.lineWidth = newLine.fontSize / 15
    gMeme.items.push(newLine)
    gMeme.selectedItemIdx = gMeme.items.length - 1
}

function addSticker(sticker) {
    const img = new Image();
    img.src = sticker.src
    const { width, height } = setStickerSize(img)
    gMeme.items.push({
        type: 'sticker',
        isDrag: false,
        x: 0,
        y: 0,
        img,
        width,
        height
    })
    gMeme.selectedItemIdx = gMeme.items.length - 1
}

function setStickersStartIdx(value) {
    gStickers.startIdx = gStickers.startIdx + value
}

function setMemeImg(imgId) {
    const img = new Image();
    img.src = getImgById(imgId).url
    gMeme.img = img
}

function setFont(font) {
    getCurrentItem().font = font
}

function setMemeText(text) {
    gMeme.items[gMeme.selectedItemIdx].text = text
}

function setLineContext(line) {
    gCtx.font = line.fontSize + line.font
    gCtx.fillStyle = line.fillStyle
    gCtx.strokeStyle = line.strokeStyle
    gCtx.lineWidth = line.lineWidth
    gCtx.textAlign = line.textAlign
}

function setTextAlign(value) {
    getCurrentItem().textAlign = value
}

function setFontSize(value, line) {
    line.fontSize += value
}

function zoomSticker(value, sticker) {
    sticker.width += sticker.width / 10 * value
    sticker.height += sticker.height / 10 * value
}

function setLineFillStyle(color) {
    getCurrentItem().fillStyle = color
}

function setStrokeStyle(color) {
    getCurrentItem().strokeStyle = color
}
function navItem() {
    gMeme.selectedItemIdx++
    if (gMeme.selectedItemIdx >= gMeme.items.length) gMeme.selectedItemIdx = 0

}

function removeItem() {
    gMeme.items.splice(gMeme.selectedItemIdx, 1)
    if (!gMeme.items.length) addNewLine()
    navItem()
}

function getRandomSetence() {
    return gMemeSetences[getRandomInt(gMemeSetences.length - 1)]
}

function getCurrentItem() {
    return gMeme.items[gMeme.selectedItemIdx]
}

function setStickerSize(img) {
    const { width, height } = img
    const ratio = height / width
    let newHeight = 150
    let newWidth = newHeight / ratio
    return { width: newWidth, height: newHeight }
}

// TOUCH EVENTS
function isObjectClicked(pos) {
    gMeme.items.some((item, idx) => {
        console.log(pos);
        switch (item.type) {
            case 'line':
                if (isInLine(item, pos)) {
                    selectItem(idx)
                    return true
                }
                break
            case 'sticker':
                if (isInSticker(item, pos)) {
                    selectItem(idx)
                    return true
                }
                break
        }
    })
}

function isInSticker(sticker, pos) {
    if (
        pos.y < sticker.y + sticker.height && pos.y > sticker.y
        && pos.x < sticker.x + sticker.width && pos.x > sticker.x) {
        return true
    }
}

function isInLine(line, pos) {
    if (pos.y <= line.y && pos.y >= line.y - line.fontSize &&
        Math.abs(line.x - pos.x) <= (line.fontSize * line.text.length / 4)) {
        return true
    }
}

function selectItem(idx) {
    gMeme.selectedItemIdx = idx
    gMeme.items[idx].isDrag = true
    document.querySelector('canvas').classList.add('grab')
}