import { useState } from 'react'
import { sections } from '../data/questions'
import FormSection from './FormSection'
import ProgressBar from './ProgressBar'
import Confetti from './Confetti'
import styles from './Form.module.css'

const BG_STARS = [
  { cls: 'deco1', char: '✦', size: 32, delay: 0 },
  { cls: 'deco2', char: '✧', size: 20, delay: 1.5 },
  { cls: 'deco3', char: '✶', size: 18, delay: 3 },
  { cls: 'deco4', char: '✦', size: 28, delay: 4.5 },
  { cls: 'deco5', char: '✧', size: 14, delay: 2 },
  { cls: 'deco6', char: '✶', size: 22, delay: 0.8 },
  { cls: 'deco7', char: '✦', size: 16, delay: 3.5 },
  { cls: 'deco8', char: '✧', size: 26, delay: 5 },
  { cls: 'deco9', char: '✶', size: 12, delay: 1.2 },
  { cls: 'deco10', char: '✦', size: 20, delay: 2.8 },
]

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
        <Confetti />
        {BG_STARS.map(s => (
          <span
            key={s.cls}
            className={`${styles.deco} ${styles[s.cls]}`}
            style={{ fontSize: s.size, animationDelay: `${s.delay}s` }}
          >
            {s.char}
          </span>
        ))}
        <div className={styles.submittedCard}>
          <div className={styles.submittedEmoji}>🎉</div>
          <h1 className={styles.submittedTitle}>you're done!</h1>
          <p className={styles.submittedSub}>
            ellen is going to love reading this!!!!
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
      {BG_STARS.map(s => (
        <span
          key={s.cls}
          className={`${styles.deco} ${styles[s.cls]}`}
          style={{ fontSize: s.size, animationDelay: `${s.delay}s` }}
        >
          {s.char}
        </span>
      ))}

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
