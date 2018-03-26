const padLeftZero = (str) => {
  return (`00${str}`).substr(str.length)
}

export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    // RegExp.$1 为 yyyy, 调用 String.prototype.replace() 替换字符串
    // str.substr(start[, length])
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
  }
  let obj  = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let key in obj) {
    if (new RegExp(`(${key})`).test(fmt)) {
      let str = `${obj[key]}`
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}
