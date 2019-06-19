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

function login ({ email, password }) {
  console.log('*** service login = ' + email)
  return restHttp.post('user/authenticate', JSON.stringify({ email, password }))
    .then(function (response) {
      let user = response.data
      console.log('user ' + user.email + ' found')
      // login successful if there's a jwt token in the response
      if (user.jwToken) {
        // console.log('user ' + user.email + ' has a token ' + user.jwToken)
        console.log(JSON.stringify(user))
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user))
      }
      return user
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
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

function register (user) {
  console.log('Send user to register : user = ' + JSON.stringify(user))
  return restHttp.post('/user/register', JSON.stringify(user))
    .then(response => {
      console.log(response.data)
      // login successful if there's a jwt token in the response
      let u = response.data
      if (u && u.jwToken) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(u))
      }
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
