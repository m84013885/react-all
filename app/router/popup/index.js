'use strict'
import './css.css'
import { closeView, toUrl } from '../../utils/goto'

const $main = document.getElementById('main')

// 自动关闭，定时器
const autoCloseTimer = setTimeout(function () {
  closeView()
}, window.serverData.closeTime)

// 点击关闭按钮
$main.style.display = 'block'
$main.addEventListener('click', function (e) {
  if (e.target.className.indexOf('popup__image') > -1) {
    toUrl(window.serverData.activityURL)
    return
  }
  if (e.target.className.indexOf('popup__close') > -1) {
    clearTimeout(autoCloseTimer)
    closeView()
    return
  }
}, false)
