import { FC, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

interface TimelineIndicatorProps {
  timelineHeight: number
}

const Wrapper = styled.div`
  position: fixed;
  right: 5vw;
  top: 10vh;
  height: 80vh;
  width: 40px;
  border-radius: 20px;
  background-color: rgb(150, 150, 150);
`
const Indicator = styled.div`
  position: absolute;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: #fff;
  border: 1px solid rgb(150, 150, 150);
`

const TimelineIndicator: FC<TimelineIndicatorProps> = ({
  timelineHeight
}: TimelineIndicatorProps) => {
  const wrapperRef = useRef(null)
  const [indicatorPosition, setIndicatorPosition] = useState('0px')

  const getMousePosition = (e) => {
    const wrapperTop = wrapperRef.current.offsetTop
    const wrapperHeight = wrapperRef.current.offsetHeight
    const progress = (e.clientY - wrapperTop) / wrapperHeight

    window.scrollTo({ top: (timelineHeight - window.innerHeight) * progress })
  }

  const scrollHandler = () => {
    if (timelineHeight !== 0 && wrapperRef.current) {
      const percentage =
        window.pageYOffset / (timelineHeight - window.innerHeight)
      const result = percentage * (wrapperRef.current.offsetHeight - 40)

      setIndicatorPosition(`${result}px`)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler, false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timelineHeight])

  return (
    <Wrapper ref={wrapperRef} onMouseMove={(e) => getMousePosition(e)}>
      <Indicator style={{ top: indicatorPosition }} />
    </Wrapper>
  )
}

export default TimelineIndicator
