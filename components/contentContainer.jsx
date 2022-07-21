import styles from './contentContainer.module.css';

export default function ContentContainer({ children }) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}
