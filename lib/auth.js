import axios from 'axios';
const TOKEN_KEY = 'ewa-token'
const USERNAME_KEY = 'ewa-username'
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL

export const setLocalToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const getLocalToken = () => localStorage.getItem(TOKEN_KEY)

export const setLocalUsername = (username) => {
  localStorage.setItem(USERNAME_KEY, username)
}

export const getLocalUsername = () => localStorage.getItem(USERNAME_KEY)

export const login = ({username, password, onError, onSuccess}) => {
  // Log in a user against the api, adding their jwt to local storage
  // Returns null
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)
  const success = false
  const err = null

  axios
    .post(AUTH_URL, formData)
    .then(function (response) {
      const token = response.data.access_token
      success = true
      setLocalUsername(username)
      setLocalToken(token)
      onSuccess()
    })
    .catch(function (error) {
      console.debug(error)
      if (error.response) {
        if (error.response.status == 401) {
          console.log('updating err')
          err = 'Incorrect credentials'
        } else {
          err = error.message
        }
      } else if (error.request) {
        err = 'Unable to reach API'
      } else {
        err = 'Unknown error'
      }
      onError(error)
    });

}

export const logout = () => {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(TOKEN_KEY)
}

