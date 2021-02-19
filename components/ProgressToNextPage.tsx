import { FC, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { links } from 'data'

const Wrapper = styled.div`
  height: 200vh;
`

const LoadingWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  position: sticky;
  top: 0;
  transition: all 1s;
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
const LoadingBarWrapper = styled.div`
  margin-top: 50px;
  width: 80%;
`

const LoadingBar = styled.div`
  background-color: #fff;
  height: 10px;
`

interface NextContent {
  title?: string
}

const ProgressToNextPage: FC = () => {
  const wrapperRef = useRef(null)
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [isNextExist, setIsNextExist] = useState(false)
  const [nextContent, setNextContent] = useState<NextContent>(null)

  const scrollHandler = () => {
    if (wrapperRef.current) {
      const { pageYOffset, innerHeight } = window
      const wrapperTop = wrapperRef.current.offsetTop

      if (
        pageYOffset >= wrapperTop &&
        pageYOffset <= wrapperTop + innerHeight
      ) {
        setProgress(
          Math.round((((pageYOffset - wrapperTop) * 100) / innerHeight) * 100) /
            100
        )
      }
    }
  }

  const checkNextPage = () => {
    for (let i = 0; i < links.length; i += 1) {
      if (links[i].link === router.pathname && i !== links.length - 1) {
        setIsNextExist(true)
        setNextContent({ title: links[i + 1].title })
        break
      }
    }
  }

  useEffect(() => {
    checkNextPage()

    window.addEventListener('scroll', scrollHandler, false)
    return () => {
      window.removeEventListener('scroll', scrollHandler, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isNextExist) {
    return (
      <Wrapper ref={wrapperRef}>
        <LoadingWrapper fadeOutTrigger>
          <h1>{nextContent.title}</h1>
          <LoadingText>Loading...</LoadingText>
          <LoadingBarWrapper>
            <LoadingBar style={{ width: `${progress}%` }} />
          </LoadingBarWrapper>
        </LoadingWrapper>
      </Wrapper>
    )
  }
  return null
}

export default ProgressToNextPage
