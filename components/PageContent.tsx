import { FC, Fragment, ReactNode, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import styled from 'styled-components'

import SideControllList from 'components/SideControllList'
import ProgressToNextPage from 'components/ProgressToNextPage'
import { startLoading, endLoading } from 'redux/actions/loadingAction'
import { links } from 'data/index'
import { RootStateType } from 'redux/reducers/rootReducer'

const Wrapper = styled.div``

const Title = styled.h1`
  text-align: center;
`
const Space = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 100%;
`

const BottomLine = styled.div`
  width: 100%;
  height: 1px;
`

interface PageContentProps {
  title: string
  children?: ReactNode
}

const PageContent: FC<PageContentProps> = ({
  title,
  children
}: PageContentProps) => {
  const [trigger, setTrigger] = useState(false)
  const [rollInTrigger, setRollInTrigger] = useState(false)
  const bottomRef = useRef(null)
  const router = useRouter()
  const dispatch = useDispatch()
  const isLoading = useSelector((state: RootStateType) => state.isLoading)

  useEffect(() => {
    if (!isLoading.status && isLoading.title.length > 0) {
      console.log('end loading：', isLoading)
      setRollInTrigger(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading.status])

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    }
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTrigger(true)
        }
      })
    }

    const observer = new IntersectionObserver(callback, options)
    observer.observe(bottomRef.current)

    if (isLoading.status) {
      dispatch(endLoading())
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (trigger) {
      for (let i = 0; i < links.length; i += 1) {
        if (router.pathname === links[i].link) {
          const nextPageIndex = i + 1
          if (nextPageIndex < links.length) {
            dispatch(startLoading(links[nextPageIndex].title))
            router.push(links[nextPageIndex].link)
          }
        }
      }
    }
  }, [dispatch, router, trigger])

  return (
    <Fragment key={title}>
      <Head>
        <title>{title}</title>
      </Head>
      <Wrapper trigger={rollInTrigger}>
        <Space id='list-part1'>
          <Title>{title}</Title>
        </Space>
        <Space id='list-part2' />
        {children}
        <SideControllList />
        <ProgressToNextPage />
        <BottomLine ref={bottomRef} />
      </Wrapper>
    </Fragment>
  )
}

PageContent.defaultProps = {
  children: null
}

export default PageContent
