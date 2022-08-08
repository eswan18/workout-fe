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
      onSuccess: () => Router.push('/dashboard'),
      onError: (err) => setErrorTextFromError(err),
    })
  }

  const redirectIfLoggedIn = () => {
    if (getLocalUsername() != null) {
      Router.push('/dashboard')
    }
  }

  const setErrorTextFromError = (error) => {
    if (typeof error === 'string' || error instanceof String) {
      setErrorText(error)
    } else {
      setErrorText(error?.message || 'Unknown error')
    }
  }

  return (
    <>
      <div className={styles.loginContainer}>
        <h1>Log into Your Account</h1>
        <div className={styles.loginForm}>
            <div>
              <form>
                <label style={{ marginRight: 10 }}>Username:</label>
                <input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label style={{ marginLeft: 30, marginRight: 10 }}>Password:</label>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ marginRight: 20 }}
                />
                <button onClick={doLogin}>Login</button>
                <div className={styles.errorContainer}>
                  { errorText ? <div className={styles.errorBar}><p>{errorText}</p></div> : null }
                </div>
              </form>
            </div>
        </div>
      </div>
    </>
  );
}
