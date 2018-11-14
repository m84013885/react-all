'use strict'
import Router from './router'
const $main = document.getElementById('main')
const scaleToFix = function () {
  const windowW = window.innerWidth
  const scale = windowW / 96
  $main.style.webkitTransform = `scale(${scale})`
  $main.style.transform = `scale(${scale})`
}
const preloadImage = function () {
  const URL_PREFIX = 'https://static.app-remix.com/activityWeb/activityDouble11/assets/images/dw'
  for (let i = 0; i <= 49; i++) {
    const img = new Image()
    img.src = URL_PREFIX + i + '.png'
  }
}
scaleToFix()
preloadImage()
window.onload = function () {
  ReactDOM.render(<Router />, $main)
}
