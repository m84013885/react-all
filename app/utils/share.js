import getRootPath_web from './root_path'
const shareFunc = function () {
  const { serverData } = window
  window.shareImg = serverData.share.pic
  window.shareTitle = serverData.share.title
  window.shareContent = serverData.share.content
  window.shareUrl = getRootPath_web() + '/activity/' + serverData.share.url
}
export default shareFunc
