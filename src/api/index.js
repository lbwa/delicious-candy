// 集中处理 api 方法
import axios from 'axios'

// 最佳实践，以常量定义可能多处使用的参数
const URL_GOODS = '/api/goods'
const URL_RATINGS = '/api/ratings'
const URL_SELLER = '/api/seller'

export const getGoods = params => {
  return axios.get(URL_GOODS, params)
    .then(res => res.data, e => console.log(e))
}

export const getRatings = params => {
  return axios.get(URL_RATINGS, params)
    .then(res => res.data, e => console.log(e))
}

export const getSeller = params => {
  return axios.get(URL_SELLER, params)
    .then(res => res.data, e => console.log(e))
}
