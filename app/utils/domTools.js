export function getElementPagePosition (node) {
  if (!node || !node.offsetTop || node.tagName.toLowerCase() === 'body' || node.tagName.toLowerCase() === 'html') {
    return {
      top: 0,
      left: 0
    }
  }
  const parentPos = getElementPagePosition(node.offsetParent)
  const pos = {
    top: node.offsetTop + parentPos.top,
    left: node.offsetLeft + parentPos.left
  }
  return pos
}

export function setScrollTop (scrollTop) {
  document.documentElement.scrollTop = scrollTop
  document.body.scrollTop = scrollTop
}
