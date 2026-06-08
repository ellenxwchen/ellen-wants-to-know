import { useState } from 'react'
import { sections } from '../data/questions'
import FormSection from './FormSection'
import ProgressBar from './ProgressBar'
import styles from './Form.module.css'

export default function Form() {
  const [currentSection, setCurrentSection] = useState(0)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const section = sections[currentSection]
  const isLast = currentSection === sections.length - 1

  function handleAnswer(questionId, value) {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  function handleNext() {
    if (isLast) {
      setSubmitted(true)
    } else {
      setCurrentSection(prev => prev + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleBack() {
    setCurrentSection(prev => prev - 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (submitted) {
    return (
      <div className={styles.submitted}>
        <div className={styles.submittedCard}>
          <div className={styles.submittedEmoji}>🎉</div>
          <h1 className={styles.submittedTitle}>you're done!</h1>
          <p className={styles.submittedSub}>
            Ellen is going to love reading this.
          </p>
          <p className={styles.submittedNote}>
            (submissions coming soon — backend isn't wired up yet)
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.logo}>ellen wants to know</span>
          <ProgressBar current={currentSection} total={sections.length} />
        </div>
      </header>

      <main className={styles.main}>
        <FormSection
          key={section.id}
          section={section}
          answers={answers}
          onAnswer={handleAnswer}
        />

        <div className={styles.nav}>
          {currentSection > 0 && (
            <button className={styles.backBtn} onClick={handleBack}>
              ← back
            </button>
          )}
          <button className={styles.nextBtn} onClick={handleNext}>
            {isLast ? 'submit ✦' : 'next →'}
          </button>
        </div>
      </main>
    </div>
  )
}
