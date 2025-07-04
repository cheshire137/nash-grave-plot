import {useEffect} from 'react'
import {usePage} from '../contexts/PageContext'
import {Link, PageLayout} from '@primer/react'
import styles from './AboutPage.module.css'

function AboutPage() {
  const {setHeaderItems, setPageTitle} = usePage()

  useEffect(() => setPageTitle('About this site'), [setPageTitle])
  useEffect(() => setHeaderItems([]), [setHeaderItems])

  return (
    <PageLayout.Content padding="normal" sx={{fontSize: 2}}>
      <div className={styles.container}>
        <p>
          Hi! I live in Nashville, Tennessee and have an interest in some of the local cemeteries. I wanted to build
          this app to explore the data that the{' '}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://data.nashville.gov/maps/829ba5846e704ffd86b339f1ede647f7"
          >
            Nashville Open Data Portal
          </Link>{' '}
          provides.
        </p>
        <p>
          If you find any bugs or want to contribute, issues and pull requests are welcome on the{' '}
          <Link target="_blank" rel="noopener noreferrer" href="https://github.com/cheshire137/nash-grave-plot">
            GitHub repository
          </Link>
          . I'm also interested in your feature requests, though no guarantee I'll get to them. Thanks!
        </p>
        <p>
          &mdash;{' '}
          <Link target="_blank" rel="noopener noreferrer" href="https://ruby.social/@cheshire137">
            @cheshire137
          </Link>
        </p>
      </div>
    </PageLayout.Content>
  )
}

export default AboutPage
