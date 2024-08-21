const cols = document.querySelectorAll('.col')

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
        col.style.background = generateRandomColor()
    })
}

setRenderColors()

