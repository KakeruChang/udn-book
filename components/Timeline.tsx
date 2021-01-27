import { useState, useEffect, FC } from 'react'
import Image from 'next/image'

const Timeline: FC = () => {
  const [movieList, setMovieList] = useState([])
  const [count, setCount] = useState(0)

  const setSceneHeight = () => {
    const numberOfItems = movieList.length // Or number of items you have in `.scene3D`
    const itemZ = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--itemZ')
    )
    const scenePerspective = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--scenePerspective'
      )
    )
    const cameraSpeed = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue(
        '--cameraSpeed'
      )
    )

    const height =
      window.innerHeight +
      scenePerspective * cameraSpeed +
      itemZ * cameraSpeed * numberOfItems

    // Update --viewportHeight value
    document.documentElement.style.setProperty('--viewportHeight', `${height}`)
  }

  const moveCamera = () => {
    document.documentElement.style.setProperty(
      '--cameraZ',
      `${window.pageYOffset}`
    )
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

      setMovieList(data)
    }

    getData()

    window.addEventListener('scroll', moveCamera)
  }, [])

  return (
    <div className='viewport'>
      <div className='scene3D-container'>
        <div className='scene3D'>
          {movieList.map((movie, i) => (
            <div
              className={`container ${i % 2 === 0 ? 'even' : ''}`}
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
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Timeline
