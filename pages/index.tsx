import { NextPage, GetStaticProps } from 'next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
// import { END } from 'redux-saga'

import styles from 'styles/Home.module.css'
import { getLanguageBegin } from 'redux/actions/languageDataAction'
import { RootStateType } from 'redux/reducers/rootReducer'
// import { wrapper } from 'redux/store'
import { links } from 'data/index'
import { startLoading } from 'redux/actions/loadingAction'

// export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
//   async ({ store }) => {
//     if (Object.keys(store.getState().data.zh).length === 0) {
//       store.dispatch(getLanguageBegin())
//       store.dispatch(END)
//     }

//     await store.sagaTask.toPromise()
//   }
// )

const Home: NextPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const data = useSelector((state: RootStateType) => state.data)

  useEffect(() => {
    if (Object.keys(data.zh).length === 0) {
      dispatch(getLanguageBegin())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const clickHandler = (e, link, title) => {
    e.preventDefault()
    dispatch(startLoading(title))
    router.push(link, undefined, { shallow: true })
  }

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
              <a
                href={item.link}
                className={styles.card}
                onClick={(e) => clickHandler(e, item.link, item.title)}
              >
                <h3>{item.title} &rarr;</h3>
              </a>
            </Link>
          ))}
          <Link href='/timeline'>
            <a href='/timeline' className={styles.card}>
              <h3>timeline &rarr;</h3>
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
}

export default Home
