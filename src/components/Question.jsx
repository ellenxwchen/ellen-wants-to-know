import styles from './Question.module.css'

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
        <input
          id={question.id}
          className={styles.input}
          type="text"
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

    </div>
  )
}
