import { useRouter } from 'next/router';
import Head from 'next/head';
import ContentContainer from './contentContainer';
import Header from './header';
import styles from './mainLayout.module.css';
import { getLocalToken } from '../lib/auth';
import { useEffect, useState } from 'react';

export const siteTitle = "Ethan's Workout App"


export default function MainLayout({ children, home, unprotected }) {

  const router = useRouter()
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    /* unprotected pages are always accessible */
    if (unprotected) {
      setAuthorized(true)
      return
    }
    /* Redirect to login page if not authed */
    const token = getLocalToken()
    if (token) {
      setAuthorized(true)
    } else {
      router.push('/login')
    }
  }, []);

  return (
    authorized &&
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