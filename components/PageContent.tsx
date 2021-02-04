import { FC, Fragment, ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import styles from 'styles/Home.module.css'
import SideControllList from 'components/SideControllList'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: 'center';
`
const Title = styled.h1`
  text-align: center;
`

const links = [
  { title: 'Overview', link: '/overview' },
  { title: 'Organization', link: '/organization' },
  { title: 'Newmedia', link: '/newmedia' },
  { title: 'Reporter', link: '/reporter' },
  { title: 'Vision', link: '/vision' }
]

interface PageContentProps {
  title: string
  rootUrl: string
  children?: ReactNode
}

const PageContent: FC<PageContentProps> = ({
  title,
  rootUrl,
  children
}: PageContentProps) => {
  const router = useRouter()

  const linkController = (e) => {
    e.preventDefault()
    router.push(
      links[Math.floor(Math.random() * Math.floor(5))].link,
      undefined,
      { shallow: true }
    )
  }

  return (
    <Fragment key={title}>
      <Head>
        <title>{title}</title>
      </Head>
      <Title>{title}</Title>
      <Wrapper>
        <Link href={`${rootUrl}/0`}>
          <a href={`${rootUrl}/0`} className={styles.card}>
            <h3>see content &rarr;</h3>
          </a>
        </Link>
        {children}
        <SideControllList />
      </Wrapper>
    </Fragment>
  )
}
PageContent.defaultProps = {
  children: null
}

export default PageContent
