const cols = document.querySelectorAll('.col')


document.addEventListener('keydown', event => {
    console.log(event.code)
    if (event.code.toLowerCase() === "space") {
        setRenderColors()
    }
})

function generateRandomColor() {
    // RGB
    const hexCods = '01234456789ABCDEF'
    color = ""
    for (let i = 0; i < 6; i++) {
        color += hexCods[Math.floor(Math.random() * hexCods.length)]
    }
    return '#' + color
}
function setRenderColors() {
    cols.forEach(col => {
        const text = col.querySelector('h2')
        const button = col.querySelector('button')
        // const color = generateRandomColor()
        const color = chroma.random() // chroma генерирует разные цвета с помощью метода рандом

        text.textContent = color
        col.style.background =  color //  меняем бакграунд

        setTextColor(text, color)
        setTextColor(button, color)
    })
}
    // для определения оттенка
function setTextColor(text, color) {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

setRenderColors()

