/**
 * 解析 url 参数
 * @example ?id=12345&a=b
 * @return Object { id: 12345, a: b }
 */

export function urlParse () {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['?id=12345', '&a=b']
  if (arr) {
    arr.forEach(item => {
      let tempArr = item.substring(1).split('=')
      // decodeURIComponent 解码 url ，将已编码的 url 中所有能够识别的转义序列转换为原字符
      let key  = decodeURIComponent(tempArr[0])  // id key
      let val = decodeURIComponent(tempArr[1])   // id 值
      obj[key] = val
    })
  }
  return obj
}
