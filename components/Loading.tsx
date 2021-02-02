import { FC, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components'

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
const FadeAnimation = (index) => keyframes`
  0% { width: 0; }
  ${20 + (index * 20) / 3}% { width: 100%; }
  ${80 - (index * 20) / 3}% { width: 100% }
  100% { width: 0; }
`

const FadeIn = styled.div`
  background-color: black;
  height: 25vh;
  animation-duration: ${(props) => `${props.seconds}s`};
  animation-name: ${(props) => FadeAnimation(props.timeIndex)};
  width: 0;
  position: absolute;
  top: ${(props) => `${props.timeIndex * 25}vh`};
`

const Loading: FC = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: RootStateType) => state.isLoading)
  const [isExist, setIsExist] = useState(false)
  const animationSeconds = 2.5

  useEffect(() => {
    if (isLoading) {
      document.body.setAttribute('style', 'overflow: hidden;')
      setIsExist(true)

      setTimeout(() => {
        document.body.setAttribute('style', 'overflow: visible;')
        setIsExist(false)
        dispatch(endLoading())
      }, animationSeconds * 1000)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  const FadeInList = () => {
    const number = 4
    const list = []
    for (let i = 0; i < number; i += 1) {
      list.push(
        <FadeIn
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
