// const currentURL = window.location.href
const ua = navigator.userAgent.toLowerCase()
// let device_info = [ 'iPhone', 'Android' ]
// let app_info = [ '其他', 'remix', '糗事百科', 'QQ', '微信', '微博' ]
const getDeviceInfo = function () {
  if (ua.match('android')) {
    return 1
  }
  else {
    return 0
  }
}
const getAppInfo = function () {
  if (ua.match('remix')) {
    return 1
  }
  else if (ua.match('qiubai')) {
    return 2
  }
  else if (ua.match('qq')) {
    return 3
  }
  else if (ua.match('micromessenger')) {
    return 4
  }
  else if (ua.match('weibo')) {
    return 5
  }
  else {
    return 0
  }
}
const config = {
  // 是否是主播
  isAnchor: !!window.serverData.isAnchor,
  // 是否在糗事百科的直播或者分享出去的页面里面里面
  qiubaizhibo: !!((window.location.href.match('qiubaizhibo') && !window.location.href.match('from'))),
  // 判断设备和APP
  app: getDeviceInfo(),
  device: getAppInfo(),
  login_info: window.serverData.login_info,
  inapp_info: window.serverData.inapp_info,
  download: window.serverData.download
}
export default config
