import { useState, FC } from 'react'
import TimeLine from 'components/Timeline'
import TimelineIndicator from 'components/TimelineIndicator'

const Time: FC = () => {
  const [timelineHeight, setTimelineHeight] = useState(0)

  return (
    <>
      <TimeLine setTimelineHeight={setTimelineHeight} />
      <TimelineIndicator timelineHeight={timelineHeight} />
    </>
  )
}

export default Time
