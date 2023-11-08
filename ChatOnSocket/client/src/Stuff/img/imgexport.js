export function getImg(path) {
  if (path) {
    let a = require(`.${path}`);
    return a;
  } else {
    let b = require(`./default.jpeg`);
    return b;
  }
}
