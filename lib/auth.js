import axios from 'axios';
const TOKEN_KEY = 'ewa-token'
const USERNAME_KEY = 'ewa-username'
const AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL

export async function authUser(username, password) {
  const creds = { username, password }

  console.log('here')
  console.log(creds)
  const auth_url = process.env.AUTH_URL
  console.log(auth_url)
  const tokenData = await fetch(auth_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(creds)
  })
    .then(response => {
      if (!response.ok) {
        console.log(response.json())
        return null
      }
      console.log('here2')
      console.log(response)
      return response.json()
    })
    .catch((error) => {
      alert(error)
      return null
    })

  return tokenData
}

export const setLocalToken = (token) => {
    localStorage.setItem(TOKEN_KEY, token)
}

export const getLocalToken = () => localStorage.getItem(TOKEN_KEY)

export const setLocalUsername = (username) => {
  localStorage.setItem(USERNAME_KEY, username)
}

export const getLocalUsername = () => localStorage.getItem(USERNAME_KEY)

export const login = (username, password) => {

  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)
  axios
    .post(AUTH_URL, formData)
    .then(function (response) {
      if (response.status == 201) {
        const token = response.data.access_token
        setLocalUsername(username)
        setLocalToken(token)
      }
    })
    .catch(function (error) {
      if (error?.response?.status == 401) {
        throw 'incorrect credentrials'
      } else {
        throw error
      }
    });
}

export const logout = () => {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(TOKEN_KEY)
}

