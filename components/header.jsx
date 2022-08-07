import Link from 'next/link'
import HeaderLoginStatusBox from './headerLoginStatusBox';
import styles from './header.module.css';


export default function Header({ children, siteTitle }) {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}></div>
      <Link href="/">{ siteTitle }</Link>
      <div className={styles.headerRight}><HeaderLoginStatusBox/></div>
    </div>
  );
}
