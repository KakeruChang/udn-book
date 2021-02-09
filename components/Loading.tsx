import { FC, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { useRouter } from 'next/router'

import { RootStateType } from 'redux/reducers/rootReducer'
import { endLoading } from 'redux/actions/loadingAction'

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: #000;
  color: #fff;
  font-size: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const LoadingText = styled.div`
  font-size: 50px;
  font-weight: bolder;
`

const LoadingAnimation = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`

const LoadingWrapper = styled.div`
  margin-top: 50px;
  width: 80%;
`
const LoadingBar = styled.div`
  background-color: #fff;
  width: 0;
  height: 10px;
  animation-duration: ${(props) => `${props.seconds}s`};
  animation-name: ${LoadingAnimation};
`

const Loading: FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const isLoading = useSelector((state: RootStateType) => state.isLoading)
  const [isExist, setIsExist] = useState(false)
  const animationSeconds = 2.5

  useEffect(() => {
    if (isLoading.status) {
      document.body.setAttribute('style', 'overflow: hidden;')
      setIsExist(true)

      setTimeout(() => {
        if (router.asPath.indexOf('#') === -1) {
          window.scrollTo({ top: 0 })
        }
      }, (animationSeconds * 1000) / 2)

      setTimeout(() => {
        document.body.setAttribute('style', 'overflow: visible;')
        setIsExist(false)
        dispatch(endLoading())
      }, animationSeconds * 1000)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading.status])

  if (isExist) {
    return (
      <Wrapper>
        <h1>{isLoading.title}</h1>
        <LoadingText>Loading...</LoadingText>
        <LoadingWrapper>
          <LoadingBar seconds={animationSeconds} />
        </LoadingWrapper>
      </Wrapper>
    )
  }
  return null
}

export default Loading
