import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startPageChanging } from 'redux/actions/pageChangingAction'
import { RootStateType } from 'redux/reducers/rootReducer'

const useRouteChange = (): void => {
  const dispatch = useDispatch()
  const router = useRouter()
  const isLoading = useSelector((state: RootStateType) => state.isLoading)

  useEffect(() => {
    const handleRouteChangeComplete = () => {
      if (!isLoading) {
        dispatch(startPageChanging())
      }
    }

    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [dispatch, router, isLoading])
}

export default useRouteChange
