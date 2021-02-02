import { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { RootStateType } from 'redux/reducers/rootReducer'
import { largeText, mediumText, smallText } from 'redux/actions/textAction'

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  right: 15vw;
  width: 100px;
  z-index: 5;
`
const SizeButton = styled.div`
  flex: 0 0 33.33.%;
  max-width: 33.33.%;
  text-align: center;
  border: 1px solid #000;
  border-radius: 2px;
  padding: 20px;
  color: ${(props) => (props.isActive ? '#fff' : '#000')};
  background-color: ${(props) => (props.isActive ? '#000' : '#fff')};
`

const TextSizeController: FC = () => {
  const dispatch = useDispatch()
  const textSize = useSelector((state: RootStateType) => state.textSize)

  return (
    <Wrapper>
      <SizeButton
        isActive={textSize === 'S'}
        onClick={() => dispatch(smallText())}
      >
        小
      </SizeButton>
      <SizeButton
        isActive={textSize === 'M'}
        onClick={() => dispatch(mediumText())}
      >
        中
      </SizeButton>
      <SizeButton
        isActive={textSize === 'L'}
        onClick={() => dispatch(largeText())}
      >
        大
      </SizeButton>
    </Wrapper>
  )
}

export default TextSizeController
