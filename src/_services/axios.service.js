import axios from 'axios'

export const restHttp = axios.create({
  baseURL: 'http://localhost:8383/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-steady-bet': 'Steadybet powered by Credits'
  }
})

// http://axios-js.com/docs/index.html#Interceptors
restHttp.interceptors.request.use(
  function (config) {
    console.log('coucou petite perruche : je suis l\'interceptor')
    const accessToken = localStorage.getItem('access_token')
    const tokenType = localStorage.getItem('token_type')
    if (tokenType && accessToken) {
      config.headers.Authorization = tokenType + ' ' + accessToken
      config.withCredentials = true
      console.log(config.headers.Authorization)
    } else {
      delete restHttp.defaults.headers.common.Authorization
    }
    return config
  },
  function (error) { return Promise.reject(error) }
)

/*
TODO later...
possible to send 2 request and wait for the 2 result before processing

function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()])
  .then(axios.spread(function (acct, perms) {
    // Both requests are now complete
  }));
*/
