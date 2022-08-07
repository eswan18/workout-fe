import styles from './loginForm.module.css';
import { useEffect, useState } from 'react';
import { getLocalUsername, login } from '../lib/auth';
import Router from 'next/router';

export default function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorText, setErrorText] = useState(null)
  
  useEffect(() => {
    // Prevent access this page if you're logged in; redirect to dashboard.
    redirectIfLoggedIn()
  }, [])

  const doLogin = (e) => {
    e.preventDefault()
    if ((username == "") | (password == "")) {
      alert('Please enter both a username and password')
      return
    }
    login({
      username,
      password, 
      onError: (err) => setErrorTextFromError(err),
      onSuccess: () => Router.push('/dashboard'),
    })
  }

  const redirectIfLoggedIn = () => {
    if (getLocalUsername() != null) {
      Router.push('/dashboard')
    }
  }

  const setErrorTextFromError = (error) => {
    if (typeof error === 'string' || error instanceof String) setErrorText(error)
    const msg = error?.message
    if (msg != null) setErrorText(msg)
    setErrorText('Unknown error')
  }

  return (
    <>
      <div className={styles.login}>
        <h1>login page</h1>
        <div style={{ marginTop: 30 }}>
            <div>
              <form>
                <label style={{ marginRight: 10 }}>Input Username</label>
                <input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label style={{ marginRight: 10 }}>Input Password</label>
                <input
                  type="text"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={doLogin}>Login</button>
                <p>{errorText}</p>
              </form>
            </div>
        </div>
      </div>
    </>
  );
}
