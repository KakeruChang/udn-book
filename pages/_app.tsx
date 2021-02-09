import { FC, ReactNode } from 'react'

// import store from '../redux/store'
import { wrapper } from 'redux/store'
import PageChanging from 'components/PageChanging'
import SideControllList from 'components/SideControllList'
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
      <BackToHome />
      <SideControllList />
    </>
  )
}

export default wrapper.withRedux(MyApp)
