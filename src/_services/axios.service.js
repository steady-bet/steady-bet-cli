import axios from 'axios'

export const restHttp = axios.create({
  baseURL: 'http://localhost:8383/',
  timeout: 1000,
  headers: { 'X-steady-bet': 'Steadybet powered by Credits!' }
})
