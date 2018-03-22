// 集中处理 api 方法
import axios from 'axios'

export const getGoods = params => {
  return axios.get('/api/goods', params)
    .then(res => res.data, e => console.log(e))
}

export const getRatings = params => {
  return axios.get('/api/ratings', params)
    .then(res => res.data, e => console.log(e))
}

export const getSeller = params => {
  return axios.get('/api/seller', params)
    .then(res => res.data, e => console.log(e))
}
