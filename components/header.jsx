import { useEffect, useState } from 'react';
import HeaderLoginStatusBox from './headerLoginStatusBox';
import styles from './header.module.css';


export default function Header({ children, siteTitle }) {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}></div>
      { siteTitle }
      <div className={styles.headerRight}><HeaderLoginStatusBox/></div>
    </div>
  );
}
