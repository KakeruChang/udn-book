import { FC, ReactNode } from 'react'

// import store from '../redux/store'
import { wrapper } from 'redux/store'
import Loading from 'components/Loading'
import TextSizeController from 'components/TextSizeController'
import SideControllList from 'components/SideControllList'
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
      <Loading />
      <TextSizeController />
      <SideControllList />
    </>
  )
}

export default wrapper.withRedux(MyApp)
