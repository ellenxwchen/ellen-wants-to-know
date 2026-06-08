import { useState } from 'react'
import styles from './Gate.module.css'

const CODE = import.meta.env.VITE_ACCESS_CODE

export default function Gate({ onUnlock }) {
  const [input, setInput] = useState('')
  const [shaking, setShaking] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (input.trim().toLowerCase() === CODE?.toLowerCase()) {
      onUnlock()
    } else {
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      setInput('')
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.lock}>🔑</div>
        <h1 className={styles.title}>ellen wants to know</h1>
        <p className={styles.sub}>enter the secret code to continue</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={`${styles.input} ${shaking ? styles.shake : ''}`}
            type="text"
            placeholder="what's the word?"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoComplete="off"
            autoFocus
            spellCheck={false}
          />
          <button className={styles.btn} type="submit">
            let me in →
          </button>
        </form>
      </div>
    </div>
  )
}
