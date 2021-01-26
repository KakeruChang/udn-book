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
`
const FadeInAnimation = (index) => {
  const getWidth = (progress) => {
    if (progress >= (index + 1) * 12.5 && progress <= (index + 4) * 12.5) {
      return '100%'
    }
    return '0'
  }

  return keyframes`
  0% { width: 0; }
  12.5%{width: ${getWidth(12.5)};}
  25%{width: ${getWidth(25)};}
  37.5%{width: ${getWidth(37.5)};}
  50% { width: ${getWidth(50)}; }
  62.5%{width: ${getWidth(62.5)};}
  75%{width:${getWidth(75)};}
  87.5%{width: ${getWidth(87.5)};}
  100% { width: 0; }
`
}

const FadeIn = styled.div`
  background-color: black;
  height: 25vh;
  animation-duration: ${(props) => `${props.seconds}s`};
  animation-name: ${(props) => FadeInAnimation(props.timeIndex)};
  width: 0;
  position: absolute;
  top: ${(props) => `${props.timeIndex * 25}vh`};
`

const Loading: FC = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state: RootStateType) => state.isLoading)
  const [isExist, setIsExist] = useState(false)
  const animationSeconds = 2

  useEffect(() => {
    if (isLoading) {
      setIsExist(true)

      // setTimeout(() => {
      //   setIsExist(false)
      //   dispatch(endLoading())
      // }, animationSeconds * 1000)
    } else {
      console.log('endloading')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  //   useEffect(() => {
  //     if (isLoading) {
  //       setLoadingState(true)
  //     } else {
  //       setTimeout(() => {
  //         setLoadingState(false)
  //       }, 5000)
  //     }
  //   }, [isLoading])

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