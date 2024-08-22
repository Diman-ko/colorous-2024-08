const cols = document.querySelectorAll('.col')


document.addEventListener('keydown', event => {
    event.preventDefault()
    // console.log(event.code)
    if (event.code.toLowerCase() === "space") {
        setRenderColors()
    }
})



document.addEventListener("click", event => {
    // console.log(event.target.dataset)
    const type = event.target.dataset.type
    if (type === 'lock') {
        // console.log('perform lock')
        const node = event.target.tagName.toLowerCase() === 'i'
            ? event.target : event.target.children[0]
        // console.log(node)
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToClickBoard(event.target.textContent)
    }
})

function copyToClickBoard(text) {
    return navigator.clipboard.writeText(text)
}

function generateRandomColor() {
    // RGB
    const hexCods = '01234456789ABCDEF'
    color = ""
    for (let i = 0; i < 6; i++) {
        color += hexCods[Math.floor(Math.random() * hexCods.length)]
    }
    return '#' + color
}



function setRenderColors(isInitial) {
    // const colors = []
    const colors = isInitial ? getColorsFromHash() : []

    cols.forEach((col, index) => {
        //определить является ли кнопка заблокированной
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')
        // const color = generateRandomColor()
        if (isLocked) { // останавливает выполнение функции и дальше не идёт, выполняется return

            colors.push(text.textContent)
            return
        }


        // const color = chroma.random() // chroma генерирует разные цвета с помощью метода рандом

        const color = isInitial ? colors[index] ? colors[index] : chroma.random() : chroma.random()


        if ( !isInitial) {
            colors.push(color)
        }

        text.textContent = color
        col.style.background =  color //  меняем бакграунд

        setTextColor(text, color)
        setTextColor(button, color)
    })
    updateColorsHash(colors)
}




    // для определения оттенка
function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}


function updateColorsHash(colors = []) {
document.location.hash = colors.map((col) => col.toString().substring(1)).join('-')
}

function getColorsFromHash() {
    if (document.location.hash.length > 1) {
     return document.location.hash
         .substring(1)
         .split('-')
         .map(color => '#' + color)
    }
    return []
}

setRenderColors(true)

