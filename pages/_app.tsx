import { FC, ReactNode } from 'react'

// import store from '../redux/store'
import { wrapper } from 'redux/store'
import PageChanging from 'components/PageChanging'
// import Loading from 'components/Loading'
import BackToHome from 'components/BackToHome'
import useRouteChange from 'hook/useRouteChange'
import '../styles/globals.css'
import '../styles/common.scss'

interface MyAppProps {
  Component: FC
  pageProps: JSX.IntrinsicAttributes & { children?: ReactNode }
}

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  useRouteChange()

  return (
    <>
      <Component {...pageProps} />
      <PageChanging />
      {/* <Loading /> */}
      <BackToHome />
    </>
  )
}

export default wrapper.withRedux(MyApp)
