import axios from 'axios'

export const getGoods = axios.get('/api/goods').then(res => res.data, e => console.log(e))

export const getRatings = axios.get('/api/ratings').then(res => res.data, e => console.log(e))

export const getSeller = axios.get('/api/seller').then(res => res.data, e => console.log(e))
