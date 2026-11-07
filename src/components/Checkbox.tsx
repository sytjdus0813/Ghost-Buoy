import styles from './Checkbox.module.css'

type Props = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

/** Figma: 자동 로그인 행 (39:15011) — Rectangle 16 × 16 + 텍스트 */
export default function Checkbox({ label, checked, onChange }: Props) {
  return (
    <label className={styles.root}>
      <input
        type="checkbox"
        className={styles.native}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={styles.box} aria-hidden />
      <span className={styles.label}>{label}</span>
    </label>
  )
}
