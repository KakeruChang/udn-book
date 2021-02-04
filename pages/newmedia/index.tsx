import PageContent from 'components/PageContent'
import { NextPage } from 'next'
import Link from 'next/link'

import styles from 'styles/Home.module.css'

const Newmedia: NextPage = () => (
  <>
    <PageContent title='Newmedia' rootUrl='/newmedia'>
      <Link href='/newmedia/timeline'>
        <a href='/newmedia/timeline' className={styles.card}>
          <h3>timeline &rarr;</h3>
        </a>
      </Link>
    </PageContent>
  </>
)

export default Newmedia
