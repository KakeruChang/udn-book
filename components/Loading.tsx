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
`
const FadeAnimation = (index, count) => keyframes`
  ${0 + index * (100 / (2 * count))}% { transform: translateX(100%) }
  ${50 + index * (100 / (2 * count))}% { transform: translateX(-100%) }
  100% { transform: translateX(-100%)}
`

const FadeIn = styled.div`
  background-color: black;
  height: ${(props) => `${100 / props.count}vh`};
  animation-duration: ${(props) => `${props.seconds}s`};
  animation-name: ${(props) => FadeAnimation(props.timeIndex, props.count)};
  width: 100vw;
  transform: translateX(100%);
  position: absolute;
  top: ${(props) => `${props.timeIndex * (100 / props.count)}vh`};
`

const Loading: FC = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const isLoading = useSelector((state: RootStateType) => state.isLoading)
  const [isExist, setIsExist] = useState(false)
  const animationSeconds = 2.5

  useEffect(() => {
    if (isLoading) {
      document.body.setAttribute('style', 'overflow: hidden;')
      setIsExist(true)

      setTimeout(() => {
        if (router.asPath.indexOf('#') === -1) {
          console.log('isloading: window.scrollTo({ top: 0 })')
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
  }, [isLoading])

  const FadeInList = () => {
    const count = 20
    const list = []
    for (let i = 0; i < count; i += 1) {
      list.push(
        <FadeIn
          count={count}
          timeIndex={i}
          isLoading={isLoading}
          seconds={animationSeconds}
          key={`fade${i}`}
        />
      )
    }
    return list
  }

  if (isExist) {
    return <Wrapper>{FadeInList()}</Wrapper>
  }
  return null
}

export default Loading
