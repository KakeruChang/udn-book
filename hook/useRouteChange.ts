import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { startLoading } from 'redux/actions/loadingAction'

const useRouteChange = (): void => {
  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      dispatch(startLoading())
    }

    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useRouteChange
