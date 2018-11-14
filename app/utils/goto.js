export const goIndex = (args) => {
  const json = {
    method: 'reqNative',
    action: 'open_user_profile',
    modul: 'account',
    callbackId: '',
    args: JSON.stringify(args)
  }
  const jsonStr = JSON.stringify(json)
  prompt('__native_call=>' + jsonStr)
}
export const goLive = (args) => {
  const json = {
    method: 'reqNative',
    action: 'open_live',
    modul: 'live',
    callbackId: '',
    args: JSON.stringify(args)
  }
  const jsonStr = JSON.stringify(json)
  prompt('__native_call=>' + jsonStr)
}
export const goHome = (args) => {
  const json = {
    method: 'reqNative',
    action: 'toLive',
    modul: 'jump',
    callbackId: '',
    args: JSON.stringify(args)
  }
  const jsonStr = JSON.stringify(json)
  prompt('__native_call=>' + jsonStr)
}
export const goCharge = (args) => {
  const json = {
    method: 'reqNative',
    action: 'charge',
    modul: 'charge',
    callbackId: '',
    args: JSON.stringify(args)
  }
  const jsonStr = JSON.stringify(json)
  prompt('__native_call=>' + jsonStr)
}
export const toUrl = (url) => {
  const json = {
    method: 'reqNative',
    action: 'activity',
    modul: 'open_web',
    args: {
      url
    }
  }
  const jsonString = JSON.stringify(json)
  prompt('__native_call=>' + jsonString)
}
export function closeView () {
  const json = {
    method: 'reqNative',
    modul: 'close',
    action: ''
  }
  const jsonString = JSON.stringify(json)
  prompt('__native_call=>' + jsonString)
}
