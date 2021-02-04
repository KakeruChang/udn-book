import { NextPage, GetStaticProps } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import Link from 'next/link'
import { END } from 'redux-saga'

import { getLanguageBegin } from 'redux/actions/languageDataAction'
import { RootStateType } from 'redux/reducers/rootReducer'
import { wrapper } from 'redux/store'
import styles from 'styles/Home.module.css'

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  async ({ store }) => {
    if (Object.keys(store.getState().data.zh).length === 0) {
      store.dispatch(getLanguageBegin())
      store.dispatch(END)
    }

    await store.sagaTask.toPromise()
  }
)

const Home: NextPage = () => {
  const dispatch = useDispatch()
  const data = useSelector((state: RootStateType) => state.data)
  const links = [
    { title: 'Overview', link: '/overview' },
    { title: 'Organization', link: '/organization' },
    { title: 'Newmedia', link: '/newmedia' },
    { title: 'Reporter', link: '/reporter' },
    { title: 'Vision', link: '/vision' }
  ]

  useEffect(() => {
    if (Object.keys(data.zh).length === 0) {
      dispatch(getLanguageBegin())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
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
          {links.map((item) => (
            <Link href={item.link} key={item.link}>
              <a href='/list/time' className={styles.card}>
                <h3>{item.title} &rarr;</h3>
              </a>
            </Link>
          ))}
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
}

export default Home
