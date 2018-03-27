/**
 * @param {数据 id} id
 * @param {同一 id 下不同类数据} key
 * @param {存储的值} value
 */
export function saveToLocal (id, key, value) {
  let data = window.localStorage.__data__  // __data__ 本地存储容器
  if (!data) { // 查询是否已经开辟容器 __data__
    data = {}  // 初始化 data
    data[id] = {}  // 初始化 data[id]
  } else {  // 已存在本地 __data__ 容器分支
    data = JSON.parse(data)
    if (!data[id]) { // 查询 id 是否存在
      data[id] = {}
    }
  }
  data[id][key] = value
  window.localStorage.__data__ = JSON.stringify(data)
  // nodejs 不存在 localStorage
}

/**
 * @param {目标 id} id
 * @param {目标 key} key
 * @param {默认值} def
 */
export function loadFormLocal (id, key, def) {
  let data = window.localStorage.__data__
  if (!data) { // 容器是否否存在
    return def
  } else {
    data = JSON.parse(data)[id]
    if (!data) {  // id 下的数据是否存在
      return def
    } else {
      let ret = data[key]
      return ret || def // key 下的数据是否存在
    }
  }
}
