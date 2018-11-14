const getRootPath_web = function () {
  const curWwwPath = window.document.location.href
  const pathName = window.document.location.pathname
  const pos = curWwwPath.indexOf(pathName)
  const localhostPaht = curWwwPath.substring(0, pos)
  const projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1)
  return (localhostPaht + projectName)
}
export default getRootPath_web
