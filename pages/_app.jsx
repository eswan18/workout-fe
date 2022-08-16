import '../styles.css'

// This file (and the following function) just ensure that the global CSS at ../styles.css is loaded for all pages.
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
  }