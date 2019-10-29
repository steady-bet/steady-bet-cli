import { restHttp } from './axios.service'
import { authHeader } from '../_helpers'

export const userService = {
  login,
  logout,
  register,
  getById
//    getAll,
//    update,
//    delete: _delete
}

function login ({ username, password }) {
  console.log('*** service login = ' + username)
  console.log(restHttp)
  return restHttp.post('auth/authenticate', JSON.stringify({ username, password }))
    .then(function (response) {
      let jwtResponse = response.data
      console.log('user ' + username + ' found')
      // login successful if there's a jwt token in the response
      if (jwtResponse.token && jwtResponse.type && jwtResponse.user) {
        console.log(JSON.stringify(jwtResponse))
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        // localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('access_token', JSON.stringify(jwtResponse.token))
        localStorage.setItem('token_type', 'Bearer')
        localStorage.setItem('user', JSON.stringify(jwtResponse.user))
      }
      return jwtResponse
    })
    .catch(function (response) {
      console.log(response)
      if (!response.ok && response.status === 401) {
        logout()
        location.reload(true)
      }
      return Promise.reject(response.statusText)
    })
}

function logout () {
  localStorage.removeItem('access_token')
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

function register (user) {
  console.log('*** service register user = ' + JSON.stringify(user))
  return restHttp.post('auth/register', JSON.stringify(user))
    .then(response => {
      console.log(response.data)
      // login successful if there's a jwt token in the response
      let u = response.data
      //   if (u && u.jwToken) {
      //     // store user details and jwt token in local storage to keep user logged in between page refreshes
      //     localStorage.setItem('user', JSON.stringify(u))
      //   }
      return u
    })
    .catch(response => {
      console.log(response)
      return Promise.reject(response.statusText)
    })
}

function getById (id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return restHttp.get(`user/${id}`, requestOptions)
    .then(function (response) {
      // TODO
      console.log(response)
    })
    .catch(function (response) {
      console.log(response)
      return Promise.reject(response.statusText)
    })
}

/*

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse (response) {
  console.log(response.text())
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout()
        location.reload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
*/
