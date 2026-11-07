import styles from './Segmented.module.css'

type Props = {
  label: string
  options: string[]
  value: string
  onChange: (v: string) => void
}

/** Figma: group + segmented (misson/detail) */
export default function Segmented({ label, options, value, onChange }: Props) {
  return (
    <div className={styles.group} role="radiogroup" aria-label={label}>
      <span className={styles.label}>{label}</span>
      <div className={styles.track}>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            role="radio"
            aria-checked={o === value}
            className={`${styles.option} ${o === value ? styles.on : ''}`}
            onClick={() => onChange(o)}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  )
}
