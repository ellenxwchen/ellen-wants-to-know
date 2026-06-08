import Question from './Question'
import styles from './FormSection.module.css'

export default function FormSection({ section, answers, onAnswer }) {
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <span className={styles.emoji}>{section.emoji}</span>
        <div>
          <h1 className={styles.title}>{section.title}</h1>
          <p className={styles.subtitle}>{section.subtitle}</p>
        </div>
      </div>

      {section.blurb && (
        <div className={styles.blurb}>
          <span className={styles.blurbQuote}>"</span>
          {section.blurb}
        </div>
      )}

      <div className={styles.questions}>
        {section.questions.map((question, i) => (
          <Question
            key={question.id}
            question={question}
            value={answers[question.id] ?? (question.type === 'multicheck' ? [] : '')}
            onChange={(val) => onAnswer(question.id, val)}
            index={i}
          />
        ))}
      </div>
    </div>
  )
}
