export function getImg(path) {
    if (path) {
        let a = require(`.${path}`)
        return a
    } else {
        let b = require(`./Default.jpg`)
        return b
    }
}