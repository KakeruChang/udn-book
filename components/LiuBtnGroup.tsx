import { FC, useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
`

const LiuButton = styled.div`
  padding: 30px;
  margin: 10px;
  border: 1px solid black;
  color: ${(props) => (props.isActive ? '#fff' : '#000')};
  background-color: ${(props) => (props.isActive ? '#000' : '#fff')};
`

const Shadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`

const LiuBtnGroup: FC = () => {
  const data = ['123', '456', '789']
  const [active, setActive] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const refArray = useRef([])

  const clickHandler = (input, e) => {
    if (active.length > 0) {
      for (let i = 0; i < active.length; i += 1) {
        if (input === active[i]) {
          const copy = [...active]
          copy.splice(i, 1)
          setActive(copy)
        } else if (e.metaKey) {
          // e.ctrlKey
          const copy = [...active]
          copy.push(input)
          setActive(copy)
        } else {
          setActive([input])
          // setIsOpen(true)
        }
      }
    } else {
      setActive([input])
    }
  }

  const checkActive = (aim) => {
    for (let i = 0; i < active.length; i += 1) {
      if (aim === active[i]) {
        return true
      }
    }
    return false
  }

  const checkPosition = (e) => {
    const { clientX, clientY } = e
    let result = false

    refArray.current.forEach((element) => {
      const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = element
      const offsetRight = offsetLeft + offsetWidth
      const offsetBottom = offsetTop + offsetHeight

      if (
        clientX >= offsetLeft &&
        clientX <= offsetRight &&
        clientY >= offsetTop &&
        clientY <= offsetBottom
      ) {
        result = true
      }
    })

    if (!result) {
      setActive([])
    }
  }

  useEffect(() => {
    window.addEventListener('click', (e) => checkPosition(e))

    return () => {
      window.removeEventListener('click', checkPosition)
    }
  }, [])

  return (
    <Wrapper>
      {active}
      {data.map((item, i) => (
        <LiuButton
          key={item}
          isActive={checkActive(item)}
          ref={(el) => {
            refArray.current[i] = el
          }}
          onClick={(e) => clickHandler(item, e)}
        >
          {item}
        </LiuButton>
      ))}
      {isOpen && <Shadow onClick={() => setIsOpen(false)} />}
    </Wrapper>
  )
}

export default LiuBtnGroup
