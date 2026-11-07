import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'

/** Figma: btn 인스턴스 (39:15016) — 높이 56, radius 28, Button/KR 텍스트 */
export default function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={`${styles.button} ${className ?? ''}`} {...props} />
}
