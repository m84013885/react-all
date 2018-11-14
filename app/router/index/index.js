'use strict'
import resize from '../../utils/resize'
import Router from './router'
import share from '../../utils/share'
import isPC from '../../utils/isPC'
const ndMain = document.getElementById('main')
const pcWidth = 600
resize(isPC(), pcWidth)
if (isPC()) {
  ndMain.style.width = pcWidth + 'px'
  ndMain.style.margin = '0 auto'
}
const enter = function () { ReactDOM.render(<Router />, ndMain) }
window.onload = function () {
  share()
  enter()
}
