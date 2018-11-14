import { goLive, goIndex } from './goto'
export default function gotoRoom (obj) {
  if (window.serverData.isAnchor) {
    return
  }
  if (!window.serverData.inapp_info) {
    window.location.href = window.serverData.download
    return
  }
  const { uid, source, platform_id, live } = obj
  const args = { uid, source, platform_id }
  if (live) {
    goLive(args)
  }
  else {
    goIndex(args)
  }
}
