import { useSession, signOut } from "next-auth/react"
import styles from './headerLoginStatusBox.module.css';

export default function HeaderLoginStatusBox() {
  const { data: session, status } = useSession()

  const content = status === "authenticated"
    ? (<>
        <p>{session.user.email}</p><button onClick={signOut}>Logout</button>
    </>)
    : (<p>Unauthenticated</p>)

  return <div className={styles.box}>{content}</div>
        
}