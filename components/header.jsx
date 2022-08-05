import { useEffect, useState } from 'react';
import { getLocalUsername } from '../lib/auth';
import styles from './header.module.css';


export default function Header({ children, siteTitle }) {
  const [username, setUsername] = useState(null)

  useEffect(() => {
    /* Use the username from local storage if there is one. */
    const localUsername = getLocalUsername('ewa-username')
    if (localUsername) {
      setUsername(localUsername)
    }
  }, [])

  return (
    <div className={styles.header}>
      { siteTitle }
      <div className={styles.headerRight}>{username || 'unauthenticated'}</div>
    </div>
  );
}
