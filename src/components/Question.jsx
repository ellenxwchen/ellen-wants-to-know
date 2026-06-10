import { useRef, useLayoutEffect } from 'react'
import styles from './Question.module.css'

function AutoGrowTextarea({ className, value, onChange, ...props }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [value])

  return (
    <textarea
      ref={ref}
      className={className}
      value={value}
      onChange={onChange}
      rows={1}
      {...props}
    />
  )
}

export default function Question({ question, value, onChange, index }) {
  return (
    <div className={styles.question}>
      <label className={styles.label} htmlFor={question.id}>
        <span className={styles.labelNum}>{String(index + 1).padStart(2, '0')}.</span>
        {question.label}
      </label>

      {question.hint && (
        <p className={styles.hint}>{question.hint}</p>
      )}

      {question.type === 'short' && (
        <AutoGrowTextarea
          id={question.id}
          className={styles.input}
          placeholder={question.placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          autoComplete="off"
        />
      )}

      {question.type === 'long' && (
        <textarea
          id={question.id}
          className={styles.textarea}
          placeholder={question.placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={4}
        />
      )}

      {question.type === 'choice' && (
        <div className={`${styles.choices} ${question.fun ? styles.choicesFun : ''}`}>
          {question.options.map(opt => (
            <button
              key={opt}
              type="button"
              className={`${styles.choice} ${question.fun ? styles.choiceFun : ''} ${value === opt ? styles.choiceSelected : ''}`}
              onClick={() => onChange(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {question.type === 'multicheck' && (
        <div className={styles.checks}>
          {question.options.map(opt => {
            const checked = Array.isArray(value) && value.includes(opt)
            return (
              <button
                key={opt}
                type="button"
                className={`${styles.check} ${checked ? styles.checkSelected : ''}`}
                onClick={() => {
                  if (checked) {
                    onChange(value.filter(v => v !== opt))
                  } else {
                    onChange([...(Array.isArray(value) ? value : []), opt])
                  }
                }}
              >
                <span className={styles.checkBox}>{checked ? '✓' : ''}</span>
                {opt}
              </button>
            )
          })}
        </div>
      )}

      {question.type === 'multicheck_freeform' && (
        <div className={styles.checksFreeform}>
          <div className={styles.checks}>
            {question.options.map(opt => {
              const checked = value?.selected?.includes(opt)
              return (
                <button
                  key={opt}
                  type="button"
                  className={`${styles.check} ${checked ? styles.checkSelected : ''}`}
                  onClick={() => {
                    const current = value?.selected ?? []
                    const next = checked ? current.filter(v => v !== opt) : [...current, opt]
                    onChange({ ...value, selected: next })
                  }}
                >
                  <span className={styles.checkBox}>{checked ? '✓' : ''}</span>
                  {opt}
                </button>
              )
            })}
          </div>
          <AutoGrowTextarea
            className={`${styles.input} ${styles.freeformInput}`}
            placeholder={question.freeformPlaceholder}
            value={value?.freeform ?? ''}
            onChange={e => onChange({ ...value, freeform: e.target.value })}
            autoComplete="off"
          />
        </div>
      )}

    </div>
  )
}
