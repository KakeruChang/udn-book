import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { links } from 'data/index'

const Wrapper = styled.div`
  height: 50vh;
  width: 100px;
  position: fixed;
  top: 100px;
  right: 100px;
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

  const anchorList = []

  const checkLink = (index, e) => {
    e.preventDefault()
    router.push(links[index].link, undefined, { shallow: true })
  }

  for (let i = 0; i < links.length; i += 1) {
    const subLink1 = `${links[i].link}#list-part1`
    const subLink2 = `${links[i].link}#list-part2`

    anchorList.push(
      <Link href={links[i].link} key={`main-${i}`}>
        <MainLink href={links[i].link} onClick={(e) => checkLink(i, e)}>
          {links[i].title}
        </MainLink>
      </Link>
    )
    anchorList.push(
      <Link href={subLink1} key={`sub-${i}-1`}>
        <SubLink href={subLink1}>上錨點</SubLink>
      </Link>
    )
    anchorList.push(
      <Link href={subLink2} key={`sub-${i}-2`}>
        <SubLink href={subLink2}>下錨點</SubLink>
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
