import { useEffect, useState, useCallback, useRef } from 'react'
import styles from './CursorTrail.module.css'

const CHARS = ['✦', '✶', '·', '✦', '✶']
let nextId = 0

export default function CursorTrail() {
  const [particles, setParticles] = useState([])
  const lastPos = useRef({ x: 0, y: 0 })
  const throttle = useRef(null)

  const addParticle = useCallback((x, y) => {
    const dx = Math.abs(x - lastPos.current.x)
    const dy = Math.abs(y - lastPos.current.y)
    if (dx < 10 && dy < 10) return
    lastPos.current = { x, y }

    const p = {
      id: nextId++,
      x,
      y,
      char: CHARS[Math.floor(Math.random() * CHARS.length)],
      offsetX: (Math.random() - 0.5) * 16,
      size: 10 + Math.random() * 10,
    }
    setParticles(prev => [...prev.slice(-20), p])
    setTimeout(() => setParticles(prev => prev.filter(q => q.id !== p.id)), 600)
  }, [])

  useEffect(() => {
    function onMove(e) {
      if (throttle.current) return
      throttle.current = requestAnimationFrame(() => {
        addParticle(e.clientX, e.clientY)
        throttle.current = null
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [addParticle])

  return (
    <div className={styles.root} aria-hidden>
      {particles.map(p => (
        <span
          key={p.id}
          className={styles.particle}
          style={{
            left: p.x + p.offsetX,
            top: p.y,
            fontSize: p.size,
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  )
}
