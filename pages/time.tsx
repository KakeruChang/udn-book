import { useState, FC } from 'react'
import TimeLine from 'components/Timeline'
import TimelineIndicator from 'components/TimelineIndicator'

const Time: FC = () => {
  const [viewportHeight, setViewportHeight] = useState(0)

  return (
    <>
      <TimeLine
        viewportHeight={viewportHeight}
        setViewportHeight={setViewportHeight}
      />
      <TimelineIndicator timelineHeight={viewportHeight} />
    </>
  )
}

export default Time
