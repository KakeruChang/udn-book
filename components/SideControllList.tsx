import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

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
  font-size: 30px;
`
const SubLink = styled.a`
  font-size: 18px;
`

const SideControllList: FC = () => {
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
        <MainLink href={mainLink} onClick={(e) => checkLink(e, i)}>
          Page{i}
        </MainLink>
      </Link>
    )
    anchorList.push(
      <Link href={subLink1} key={`sub-${i}-1`}>
        <SubLink href={subLink1}>Part-1</SubLink>
      </Link>
    )
    anchorList.push(
      <Link href={subLink2} key={`sub-${i}-2`}>
        <SubLink href={subLink2}>Part-2</SubLink>
      </Link>
    )
  }

  return <Wrapper>{anchorList}</Wrapper>
}

export default SideControllList
