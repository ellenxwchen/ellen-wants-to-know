import styles from './Confetti.module.css'

const COLORS = ['#7aaee8', '#a8cbf0', '#b89adb', '#d4849a', '#e8b4c2', '#d4a843']
const PIECES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
  size: 6 + Math.random() * 8,
  delay: Math.random() * 1.5,
  duration: 2.5 + Math.random() * 2,
  rotate: Math.random() * 360,
  drift: (Math.random() - 0.5) * 200,
  shape: Math.random() > 0.5 ? '50%' : '2px',
}))

export default function Confetti() {
  return (
    <div className={styles.root} aria-hidden>
      {PIECES.map(p => (
        <span
          key={p.id}
          className={styles.piece}
          style={{
            left: `${p.left}%`,
            backgroundColor: p.color,
            width: p.size,
            height: p.size,
            borderRadius: p.shape,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--rotate': `${p.rotate}deg`,
            '--drift': `${p.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
