import styles from './header.module.css';

export default function Header({ children, siteTitle }) {
  return (
    <div className={styles.header}>
      { siteTitle }
    </div>
  );
}
