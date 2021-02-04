import { useEffect, useRef, useState, FC } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'

import { RootStateType } from 'redux/reducers/rootReducer'

const Bg = styled.div`
  width: 100vw;
  max-width: 100%;
`
const Space = styled.div`
  width: 100%;
  height: 100vh;
  font-size: ${(props) => {
    if (props.textSize === 'L') {
      return '80px'
    }
    if (props.textSize === 'M') {
      return '60px'
    }
    return '40px'
  }};
  text-align: center;
`
const BottomLine = styled.div`
  width: 100%;
  border: 1px solid black;
`
interface PageListProps {
  title: string
  rootUrl: string
}

const PageList: FC<PageListProps> = ({ title, rootUrl }: PageListProps) => {
  const router = useRouter()
  const { id } = router.query
  const textSize = useSelector((state: RootStateType) => state.textSize)
  const bottomRef = useRef(null)
  const [trigger, setTrigger] = useState(false)

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTrigger(true)
        }
      })
    }

    const observer = new IntersectionObserver(callback, options)
    observer.observe(bottomRef.current)
  }, [])

  useEffect(() => {
    if (trigger) {
      if (id && typeof id === 'string') {
        // prevent going to next page again
        window.scrollTo(0, 0)
        console.log('pagelist: window.scrollTo(0, 0)')

        router.push(`${rootUrl}/${parseInt(id, 10) + 1}`)
        // if (router.asPath.indexOf('#') !== -1) {
        //   router.push(router.asPath)
        // } else {
        //   router.push(`${rootUrl}/${parseInt(id, 10) + 1}`)
        // }

        setTrigger(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, router])

  return (
    <>
      <Head>
        <title>{`${title}${id}`}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Bg>
        <Space id={`list-${id}-part1`} textSize={textSize}>
          {`${title}-${id}-Part1`}
        </Space>
        <Space id={`list-${id}-part2`} textSize={textSize}>
          {`${title}-${id}-Part2`}
        </Space>
        <BottomLine ref={bottomRef} />
      </Bg>
    </>
  )
}

export default PageList
