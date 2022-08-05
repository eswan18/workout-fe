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
    localStorage.setItem('ewa-token', token)
}

export const getLocalToken = () => localStorage.getItem('ewa-token')

export const setLocalUsername = (username) => {
  localStorage.setItem('ewa-username', username)
}

export const getLocalUsername = () => localStorage.getItem('ewa-username')