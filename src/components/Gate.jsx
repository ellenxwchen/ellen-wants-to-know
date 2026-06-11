import { useState, useCallback } from 'react'
import styles from './Gate.module.css'

const CODE = import.meta.env.VITE_ACCESS_CODE

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

let nextId = 0

export default function Gate({ onUnlock }) {
  const [input, setInput] = useState('')
  const [shaking, setShaking] = useState(false)
  const [sparks, setSparks] = useState([])

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

  const handleClick = useCallback((e) => {
    if (e.target.closest(`.${styles.card}`)) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const burst = Array.from({ length: 6 }, () => ({
      id: nextId++,
      x,
      y,
      char: Math.random() > 0.5 ? '✦' : '✶',
      angle: Math.random() * 360,
      dist: 30 + Math.random() * 50,
      size: 12 + Math.random() * 14,
    }))
    setSparks(prev => [...prev, ...burst])
    burst.forEach(s => {
      setTimeout(() => setSparks(prev => prev.filter(p => p.id !== s.id)), 700)
    })
  }, [])

  return (
    <div className={styles.wrapper} onClick={handleClick}>
      {BG_STARS.map(s => (
        <span
          key={s.cls}
          className={`${styles.deco} ${styles[s.cls]}`}
          style={{ fontSize: s.size, animationDelay: `${s.delay}s` }}
        >
          {s.char}
        </span>
      ))}

      {sparks.map(s => (
        <span
          key={s.id}
          className={styles.spark}
          style={{
            left: s.x,
            top: s.y,
            fontSize: s.size,
            '--angle': `${s.angle}deg`,
            '--dist': `${s.dist}px`,
          }}
        >
          {s.char}
        </span>
      ))}

      <div className={styles.card}>
        <img className={styles.emoji} src={`${import.meta.env.BASE_URL}favicon.png`} alt="" />
        <h1 className={styles.title}>ellen wants to know</h1>
        <p className={styles.sub}>psst — what's the secret word?</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={`${styles.input} ${shaking ? styles.shake : ''}`}
            type="text"
            placeholder="✦  type it here  ✦"
            value={input}
            onChange={e => setInput(e.target.value)}
            autoComplete="off"
            autoFocus
            spellCheck={false}
          />
          <button className={styles.btn} type="submit">
            let me in
          </button>
        </form>
      </div>
    </div>
  )
}
