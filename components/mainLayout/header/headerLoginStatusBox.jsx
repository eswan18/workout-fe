import Router from 'next/router';
import { useState, useEffect } from 'react';
import { getLocalUsername, logout } from '../../../lib/auth';
import styles from './headerLoginStatusBox.module.css';

export default function HeaderLoginStatusBox() {
  const [username, setUsername] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    /* Use the username from local storage if there is one. */
    const localUsername = getLocalUsername()
    if (localUsername) {
      setUsername(localUsername)
    }
    setLoading(false)
  }, [])

  const logoutAndGoToLogin = () => {
      logout()
      Router.push('/login')
  }
  const content = username
    ? (<>
        <p>{username}</p><button onClick={logoutAndGoToLogin}>Logout</button>
    </>)
    : (<p>Unauthenticated</p>)

  return !loading && (
    <div className={styles.box}>{content}</div>
  )
        
}