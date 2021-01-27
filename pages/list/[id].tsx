import { useEffect, useRef, useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Bg = styled.div`
  width: 100vw;
  max-width: 100%;
`
const Title = styled.div`
  font-size: 80px;
  font-weight: 900;
  position: fixed;
`
const Space = styled.div`
  width: 100%;
  height: 100vh;
  font-size: 80px;
  text-align: center;
`
const BottomLine = styled.div`
  width: 100%;
  border: 1px solid black;
`

const Item: NextPage = () => {
  const router = useRouter()
  const { id } = router.query
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
    <Bg>
      <Title>{id}</Title>
      <Space id={`list-${id}-part1`}>Part1</Space>
      <Space id={`list-${id}-part2`}>Part2</Space>
      <BottomLine ref={bottomRef} />
    </Bg>
  )
}

export default Item
