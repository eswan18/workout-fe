import Head from 'next/head';
import ContentContainer from './contentContainer';
import Header from './header';
import styles from './mainLayout.module.css';

export const siteTitle = "Ethan's Workout App"


export default function MainLayout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <meta
          name="description"
          content="Ethan's minimal workout app"
        />
        <meta name="og:title" content={siteTitle} />
      </Head>
      <Header siteTitle={siteTitle}/>
      <ContentContainer>
        <main>{children}</main>
      </ContentContainer>
    </div>
  );
}
