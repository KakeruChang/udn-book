import { useState, useEffect, FC, Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import styled from 'styled-components'

const Viewport = styled.div`
  height: ${(props) => `${props.viewportHeight}px`};
  background-color: #fff;
`

const Scene3DContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  perspective: ${(props) => `${props.scenePerspective * props.cameraSpeed}px`};
  perspective-origin: ${(props) =>
    `${props.scenePerspectiveOriginX}% ${props.scenePerspectiveOriginY}%`};
  will-change: perspective-origin;
  transform: translate3d(0, 0, 0);
`
const Scene3D = styled.div`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100%;
  transform-style: preserve-3d;
  will-change: transform;
`

const getPosition = (positionList) => {
  let str = ''
  for (let i = 0; i < positionList.length; i += 1) {
    str += `
    &:nth-child(${i + 1}) {
      transform: translate3D(
        ${positionList[i].x}%,
        ${positionList[i].y}%,
        ${positionList[i].z}px
      );
    }
  `
  }
  return str
}

const Container = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  top: 40%;
  &:nth-child(2n) {
    left: 0;
  }
  &:nth-child(2n + 1) {
    right: 0;
  }

  ${(props) => getPosition(props.positionList)}
`

interface TimelineProps {
  setTimelineHeight: Dispatch<SetStateAction<number>>
}

const Timeline: FC<TimelineProps> = ({ setTimelineHeight }: TimelineProps) => {
  const [movieList, setMovieList] = useState([])
  const [positionList, setPositionList] = useState([])
  const [count, setCount] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [cameraZ, setCameraZ] = useState(0)
  const root = {
    scenePerspective: 1,
    scenePerspectiveOriginX: 50,
    scenePerspectiveOriginY: 30,
    itemZ: 2,
    cameraSpeed: 108
  }
  const cameraZDisplacement = 150

  const setSceneHeight = () => {
    const numberOfItems = movieList.length
    const { itemZ, scenePerspective, cameraSpeed } = root

    const height =
      window.innerHeight +
      scenePerspective * cameraSpeed +
      itemZ * cameraSpeed * numberOfItems

    // Update --viewportHeight value
    setViewportHeight(height)
    setTimelineHeight(height)
  }

  const moveCamera = () => {
    setCameraZ(window.pageYOffset + cameraZDisplacement)
  }

  const completeLoading = () => {
    setCount(count + 1)
  }

  useEffect(() => {
    if (count === movieList.length && movieList.length !== 0) {
      setSceneHeight()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count])

  useEffect(() => {
    const getData = async () => {
      const req = await fetch('https://ghibliapi.herokuapp.com/films')
      const data = await req.json()

      // 'generate position of x, y'
      const memo = []
      for (let i = 0; i < data.length; i += 1) {
        memo.push({
          x: Math.floor(Math.random() * 50) - 25,
          y: Math.floor(Math.random() * 100) - 50,
          z: root.itemZ * root.cameraSpeed * (-i - 1)
        })
      }
      setPositionList(memo)
      setMovieList(data)
    }

    getData()

    moveCamera()
    window.addEventListener('scroll', moveCamera)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Viewport viewportHeight={viewportHeight}>
      <Scene3DContainer
        scenePerspective={root.scenePerspective}
        cameraSpeed={root.cameraSpeed}
        scenePerspectiveOriginX={root.scenePerspectiveOriginX}
        scenePerspectiveOriginY={root.scenePerspectiveOriginY}
      >
        <Scene3D style={{ transform: `translateZ(${cameraZ}px)` }}>
          {movieList.map((movie, i) => (
            <Container
              positionList={positionList}
              className={i % 2 === 0 ? 'even' : ''}
              key={movie.id}
            >
              <div className='content'>
                <h1>{movie.title}</h1>
                <p>{movie.description}</p>
              </div>
              <div className='content at-center'>
                <h1 className='year'>{movie.release_date}</h1>
                <Image
                  onLoad={completeLoading}
                  src={`https://picsum.photos/id/${i}/150`}
                  width='150'
                  height='150'
                  alt=''
                />
              </div>
            </Container>
          ))}
        </Scene3D>
      </Scene3DContainer>
    </Viewport>
  )
}

export default Timeline
