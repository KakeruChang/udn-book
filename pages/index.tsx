import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from 'styles/Home.module.css'

const Home: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>Create Next App</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <main className={styles.main}>
      <h1 className={styles.title}>
        Welcome to <a href='https://nextjs.org'>UDN</a>
      </h1>

      <div className={styles.grid}>
        <Link href='/time'>
          <a href='/time' className={styles.card}>
            <h3>Time &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>
        </Link>
        <Link href='/list/0'>
          <a href='/list/0' className={styles.card}>
            <h3>List &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>
        </Link>
        {/* <a
            href='https://github.com/vercel/next.js/tree/master/examples'
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href='https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a> */}
      </div>
    </main>

    <footer className={styles.footer}>
      <a
        href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
        target='_blank'
        rel='noopener noreferrer'
      >
        Powered by{' '}
        <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
      </a>
    </footer>
  </div>
)

export default Home
