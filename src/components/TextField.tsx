import type { InputHTMLAttributes, ReactNode } from 'react'
import styles from './TextField.module.css'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  /** 왼쪽 20 × 20 아이콘 */
  icon: string
  /** 오른쪽 20 × 20 영역 (예: 비밀번호 보기 버튼) */
  trailing?: ReactNode
  label: string
}

/** Figma: loginset > input (39:14995, 39:15001) */
export default function TextField({ icon, trailing, label, ...inputProps }: Props) {
  return (
    <label className={styles.field}>
      <img className={styles.icon} src={icon} width={20} height={20} alt="" />
      <input className={styles.input} placeholder={label} aria-label={label} {...inputProps} />
      {trailing}
    </label>
  )
}
