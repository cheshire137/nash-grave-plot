import {Link} from '@primer/react'
import styles from './Footer.module.css'

function Footer() {
  return (
    <div className={styles.container}>
      <Link
        target="_blank"
        sx={{display: 'inline-block'}}
        muted={true}
        rel="noopener noreferrer"
        href="https://github.com/cheshire137/nash-grave-plot"
      >
        View source
      </Link>
      <div className={styles.dataSource}>
        Data from{' '}
        <Link
          target="_blank"
          muted={true}
          rel="noopener noreferrer"
          href="https://data.nashville.gov/maps/829ba5846e704ffd86b339f1ede647f7"
        >
          Davidson County Cemetery Survey
        </Link>
      </div>
      <span>Data last updated Oct 17, 2023</span>
    </div>
  )
}

export default Footer
