// import axios from 'axios'
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

function login (username, password) {
  console.log('*** login : username=' + username)
  const requestOptions = {
    headers: { 'Content-Type': 'application/json' }
  }
  return restHttp.post('users/authenticate', JSON.stringify({ username, password }), requestOptions)
    .then(function (response) {
      let user = response.data
      console.log('user ' + user.userName + ' found')
      // console.log(JSON.stringify(user))
      // login successful if there's a jwt token in the response
      if (user.token) {
        console.log('user ' + username + ' has a token ' + user.token)
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
  return restHttp.post('users/register', JSON.stringify({ user }))
    .then(function (response) {
      console.log(response)
      // login successful if there's a jwt token in the response
      let user = response.data && response.data.user
      if (user.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user))
      }
      return user
    })
    .catch(function (response) {
      console.log(response)
      return Promise.reject(response.statusText)
    })
}

function getById (id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }
  return restHttp.get(`users/${id}`, requestOptions)
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
