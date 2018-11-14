// 适配不同浏览器的requestAnimFrame事件
window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
})()
// canvas帧动画类:直接new一个对象出来即可
const FrameAnimation1 = function (config) {
  this.imgArr = {}
  this.frameTime = (1000 / config.time) || 50
  this.type = config.type
  this.path = config.path
  // var dom = document.getElementById(config.id)
  this.dom = config.canvas
  this.ctx = this.dom.getContext('2d')
  this.frame = config.frame
  this.count = 0
  this.destroyed = false
  this.clearness(config)
}

FrameAnimation1.prototype.clearness = function (conf) {
  const canvas = this.dom
  const width = conf.frame.width
  const height = conf.frame.height
  if (window.devicePixelRatio) {
    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'
    canvas.height = height * window.devicePixelRatio
    canvas.width = width * window.devicePixelRatio
    // this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
  }
}

FrameAnimation1.prototype.preloadImageSource = function (config, preFunc, cb, frameCb, endFrameCb) {
  this.frame.width = this.dom.width
  this.frame.height = this.dom.height
  this.ctx.clearRect(0, 0, this.frame.width, this.frame.height)
  // 预加载图片
  const imgArr = []
  const count = config.count
  const prefix = config.prefix
  const type = this.type
  const path = this.path
  let posIndex = 0
  const self = this
  this.count = count
  this.frameTime = 20
  // console.log(this.frameTime);
  const startIndex = 0
  const endCount = count
  let firstImage
  for (let i = startIndex; i < endCount; i++) {
    const index = i
    // if (index < 10) {
    //   index = '0' + index
    // }
    const imgSrc = path + prefix + index + type
    if (i === startIndex) {
      this.firstImage = firstImage = imgSrc
      if (this.imgArr[firstImage] !== undefined) {
        preFunc && preFunc()
        self.setImageToCanvas(0, firstImage)
        self.startAnimation(cb, config, frameCb, endFrameCb, firstImage)
        return
      }
    }
    const image = new Image()
    image.src = imgSrc
    image.onload = onImageLoad
    imgArr.push(image)
  }

  function onImageLoad () {
    posIndex += 1
    const isOver = posIndex === count
    if (isOver) {
      self.imgArr[firstImage] = imgArr
      // console.log("预加载完毕");
      preFunc && preFunc()
      self.setImageToCanvas(0, firstImage)
      self.startAnimation(cb, config, frameCb, endFrameCb, firstImage)
    }
  }
}

FrameAnimation1.prototype.setImageToCanvas = function (index, imgSrcIndex) {
  const img = this.imgArr[imgSrcIndex][index]
  this.ctx.clearRect(0, 0, this.frame.width, this.frame.height)
  this.ctx.drawImage(img, 0, 0, this.frame.width, this.frame.height)
}
FrameAnimation1.prototype.startAnimation = function (callback, config, frameCb, endFrameCb, imgSrcIndex) {
  const self = this
  let lastTime = null
  let index = 0
  const step = function (ts) {
    if (self.destroyed) {
      return
    }
    let progress
    if (lastTime == null) {
      lastTime = ts
      requestAnimationFrame(step)
    }
    else {
      progress = ts - lastTime
      if (progress >= self.frameTime) {
        lastTime = ts
        index += 1
        self.setImageToCanvas(index, imgSrcIndex)
        if (index < self.count - 1) {
          requestAnimationFrame(step)
        }
        else {
          self.setImageToCanvas(0, imgSrcIndex)
          self.startAnimation(callback, config, frameCb, endFrameCb, imgSrcIndex)
          callback && callback()
        }
        if (index === config.playFrame) {
          frameCb && frameCb()
        }
        if (index === config.endFrame) {
          endFrameCb && endFrameCb()
        }
      }
      else {
        requestAnimationFrame(step)
      }
    }
  }
  requestAnimationFrame(step)
}
FrameAnimation1.prototype.destroy = function () {
  this.destroyed = true
}

export default FrameAnimation1
