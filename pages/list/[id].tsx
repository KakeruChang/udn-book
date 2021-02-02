import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styled from 'styled-components'

import SideControllList from 'components/SideControllList'
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

const Item: NextPage = () => {
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (trigger) {
      if (id && typeof id === 'string') {
        window.scrollTo(0, 0)
        router.push(`/list/${parseInt(id, 10) + 1}`)

        setTrigger(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  return (
    <>
      <Head>
        <title>Page{id}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Bg>
        <Space id={`list-${id}-part1`} textSize={textSize}>
          Page{id}-Part1
        </Space>
        <Space id={`list-${id}-part2`} textSize={textSize}>
          Page{id}-Part2
        </Space>
        <BottomLine ref={bottomRef} />
        <SideControllList />
      </Bg>
    </>
  )
}

export default Item
