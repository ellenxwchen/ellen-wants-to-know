import styles from './ProgressBar.module.css'
import { sections } from '../data/questions'

export default function ProgressBar({ current, total }) {
  return (
    <div className={styles.bar}>
      {sections.map((section, i) => (
        <div
          key={section.id}
          className={`${styles.dot} ${i < current ? styles.done : ''} ${i === current ? styles.active : ''}`}
          title={section.title}
        />
      ))}
    </div>
  )
}
