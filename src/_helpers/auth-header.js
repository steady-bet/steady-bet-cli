// deprecated : to remove since axios.service.js do the job with an interceptor
export function authHeader () {
  // return authorization header with jwt token
  // let user = JSON.parse(localStorage.getItem('user'))
  let accessToken = JSON.parse(localStorage.getItem('access_token'))

  if (accessToken && accessToken.token && accessToken.type) {
    return { 'Authorization': accessToken.type + ' ' + accessToken.token }
  } else {
    return {}
  }
}
