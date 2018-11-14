import md5 from 'md5'
/*
  对象排序拼接成字符串
*/
function sigSortObj (obj) {
  if (!obj) {
    return ''
  }
  const arr = []
  let sigString = ''
  for (var key in obj) {
    arr.push(key)
  }
  arr.sort()
  for (let i = arr.length - 1; i >= 0; i--) {
    var key = arr[i]
    let tail = '&'
    if (i == 0) {
      tail = ''
    }
    sigString = sigString + (key + '=' + obj[key]) + tail
  }
  return sigString
}

/*
  websocket签名
  传入1个／2个 json对象，生成签名
*/
export function sigFunc1 (obj1, obj2) {
  if (!obj1) {
    return
  }
  const arr = []
  const salt = 'cc4bf957c3244a6ebb96cd63206f5632'
  const str1 = sigSortObj(obj1)
  const str2 = sigSortObj(obj2)
  const sigString = str1 + str2 + '&salt=' + salt
  const sig = md5(sigString)
  return {
    str: str1 + str2,
    sig
  }
}

/**
 * 接口生成签名 POST
 * @param {*必要参数} obj1
 * @param {*post参数} obj2
 */
export function sigFunc2 (obj1) {
  if (!obj1) { return }
  const salt = 'cc4bf957c3244a6ebb96cd63206f5632'
  const str1 = sigSortObj(obj1)
  const sigString = str1 + '&salt=' + salt
  const sig = md5(sigString)
  return {
    str: str1,
    sig
  }
}

/**
 * 接口生成签名 POST
 * @param {*必要参数} obj1
 * @param {*post参数} obj2
 */
function sigFunc (obj1, obj2) {
  if (!obj1) { return }
  const salt = 'cc4bf957c3244a6ebb96cd63206f5632'
  const str1 = sigSortObj(obj1)
  const str2 = sigSortObj(obj2)
  const sigString = str2 + '&' + str1 + '&salt=' + salt
  const sig = md5(sigString)
  return {
    str: str1,
    sig
  }
}

export default sigFunc
