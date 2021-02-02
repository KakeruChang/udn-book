import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { RootStateType } from 'redux/reducers/rootReducer'

const Wrapper = styled.div`
  height: 100vh;
  width: 100px;
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
`
const MainLink = styled.a`
  font-weight: bolder;
  font-size: ${(props) => {
    if (props.textSize === 'L') {
      return '40px'
    }
    if (props.textSize === 'M') {
      return '30px'
    }
    return '20px'
  }};
`
const SubLink = styled.a`
  font-size: ${(props) => {
    if (props.textSize === 'L') {
      return '24px'
    }
    if (props.textSize === 'M') {
      return '18px'
    }
    return '12px'
  }};
`

const SideControllList: FC = () => {
  const textSize = useSelector((state: RootStateType) => state.textSize)
  const router = useRouter()
  const { id } = router.query
  const dataLength = 10

  const anchorList = []

  const checkLink = (e, index) => {
    if (typeof id === 'string' && parseInt(id, 10) === index) {
      e.preventDefault()
    }
  }

  for (let i = 0; i < dataLength; i += 1) {
    const mainLink = `/list/${i}`
    const subLink1 = `/list/${i}#list-${i}-part1`
    const subLink2 = `/list/${i}#list-${i}-part2`

    anchorList.push(
      <Link href={mainLink} key={`main-${i}`}>
        <MainLink
          href={mainLink}
          textSize={textSize}
          onClick={(e) => checkLink(e, i)}
        >
          Page{i}
        </MainLink>
      </Link>
    )
    anchorList.push(
      <Link href={subLink1} key={`sub-${i}-1`}>
        <SubLink href={subLink1} textSize={textSize}>
          Part-1
        </SubLink>
      </Link>
    )
    anchorList.push(
      <Link href={subLink2} key={`sub-${i}-2`}>
        <SubLink href={subLink2} textSize={textSize}>
          Part-2
        </SubLink>
      </Link>
    )
  }

  return <Wrapper>{anchorList}</Wrapper>
}

export default SideControllList