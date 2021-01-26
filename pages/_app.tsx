import { FC, ReactNode } from 'react'

// import store from '../redux/store'
import { wrapper } from 'redux/store'
import Loading from 'components/Loading'
import '../styles/globals.css'
import '../styles/common.scss'

interface MyAppProps {
  Component: FC
  pageProps: JSX.IntrinsicAttributes & { children?: ReactNode }
}

const MyApp = ({ Component, pageProps }: MyAppProps) => (
  <>
    <Component {...pageProps} />
    <Loading />
  </>
)

export default wrapper.withRedux(MyApp)

// const MyApp: FC<MyAppProps> = ({ Component, pageProps }: MyAppProps) => (
//   <Provider store={store}>
//     <Component {...pageProps} />
//   </Provider>
// )

// export default MyApp
