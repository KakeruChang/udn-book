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
  top: 100px;
  right: 100px;
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
const links = [
  { title: 'Overview', link: '/overview' },
  { title: 'Organization', link: '/organization' },
  { title: 'Newmedia', link: '/newmedia' },
  { title: 'Reporter', link: '/reporter' },
  { title: 'Vision', link: '/vision' }
]

const SideControllList: FC = () => {
  const textSize = useSelector((state: RootStateType) => state.textSize)
  const router = useRouter()

  const anchorList = []

  const checkLink = (index) => {
    router.push(links[index].link, undefined, { shallow: true })
  }

  for (let i = 0; i < links.length; i += 1) {
    const subLink1 = `${links[i].link}/0`
    const subLink2 = `${links[i].link}/0#list-0-part2`

    anchorList.push(
      <Link href={links[i].link} key={`main-${i}`}>
        <MainLink
          href={links[i].link}
          textSize={textSize}
          onClick={() => checkLink(i)}
        >
          {links[i].title}
        </MainLink>
      </Link>
    )
    anchorList.push(
      <Link href={subLink1} key={`sub-${i}-1`}>
        <SubLink href={subLink1} textSize={textSize}>
          列表0
        </SubLink>
      </Link>
    )
    anchorList.push(
      <Link href={subLink2} key={`sub-${i}-2`}>
        <SubLink href={subLink2} textSize={textSize}>
          列表0-2
        </SubLink>
      </Link>
    )
  }

  const isExist = () =>
    router.pathname === '/' || router.pathname.indexOf('timeline') !== -1

  if (isExist()) {
    return null
  }

  return <Wrapper>{anchorList}</Wrapper>
}

export default SideControllList
