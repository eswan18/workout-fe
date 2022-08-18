import { useRouter } from 'next/router';
import Head from 'next/head';
import ContentContainer from './contentContainer';
import Header from './header';
import styles from './mainLayout.module.css';
import { useSession, signIn } from "next-auth/react"

export const siteTitle = "Ethan's Workout App"


export default function MainLayout({ children, home, unprotected }) {

  const router = useRouter()
  const { data: session } = useSession()

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
      <div className={styles.flexContainer}>
        <div className={styles.edgeSpacer}/>
        <div className={styles.contentArea}>
        {(unprotected || session)
          ?
          <ContentContainer>
            <main>{children}</main>
          </ContentContainer>
          :
          <button onClick={signIn}>Sign In</button>
        }
        </div>
        <div className={styles.edgeSpacer}/>
      </div>
    </div>
  );
}