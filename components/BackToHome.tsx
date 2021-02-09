import { useState, useEffect, FC } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const GoHomeButton = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  color: #fff;
  background-color: #000;
  font-size: 30px;
  padding: 10px;
`

const BackToHome: FC = () => {
  const router = useRouter()
  const [isExist, setIsExist] = useState(false)

  const goHome = () => {
    router.push('/')
    // router.push(links[index].link, undefined, { shallow: true })
  }

  useEffect(() => {
    if (router.pathname === '/') {
      setIsExist(false)
    } else {
      setIsExist(true)
    }
  }, [router])

  if (!isExist) return null
  return <GoHomeButton onClick={() => goHome()}>Home</GoHomeButton>
}
export default BackToHome
