const TOKEN_KEY = 'ewa-token'
const USERNAME_KEY = 'ewa-username'

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
  localStorage.setItem('ewa-username', username)
}

export const getLocalUsername = () => localStorage.getItem(USERNAME_KEY)

export const login = (username, token) => {
  setLocalUsername(username)
  setLocalToken(token)
}

export const logout = () => {
  localStorage.removeItem(USERNAME_KEY)
  localStorage.removeItem(TOKEN_KEY)
}