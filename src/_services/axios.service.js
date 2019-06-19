import axios from 'axios'

export const restHttp = axios.create({
  baseURL: 'http://localhost:8383/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-steady-bet': 'Steadybet powered by Credits'
  }
})
