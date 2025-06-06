import PhotoDisplay from './PhotoDisplay'
import styles from './PhotoList.module.css'

interface PhotoListProps {
  value: {[url: string]: string}
}

export function PhotoList({value}: PhotoListProps) {
  return (
    <div className={styles.container}>
      {Object.keys(value).map((url) => (
        <PhotoDisplay url={url} description={value[url]} key={url} />
      ))}
    </div>
  )
}
