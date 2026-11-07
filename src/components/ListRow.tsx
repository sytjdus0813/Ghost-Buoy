import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import chevron16 from '../assets/device/chevron.svg'
import chevron18 from '../assets/device/chevron-right.svg'
import styles from './ListRow.module.css'

type Props = {
  icon: string
  title: string
  sub: string
  to?: string
  onClick?: () => void
  /** 오른쪽: 기본은 chevron, 넘기면 대체 (예: '설정하기' chip) */
  trailing?: ReactNode
  /**
   * 'tile' = Figma gb/list-row (38px 회색 타일, chevron 16) — device/main
   * 'box'  = Figma row/* (40px #f3f7fb 박스, chevron 18) — device/system·add, my
   */
  variant?: 'tile' | 'box'
}

/** 목록 한 줄: 아이콘 + 제목/설명 + 오른쪽 (chevron 또는 chip) */
export default function ListRow({ icon, title, sub, to, onClick, trailing, variant = 'box' }: Props) {
  const tile = variant === 'tile'
  const body = (
    <>
      <span className={tile ? styles.tile : styles.box}>
        <img src={icon} width={20} height={20} alt="" />
      </span>
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        <span className={styles.sub}>{sub}</span>
      </span>
      {trailing ?? (tile ? <img src={chevron16} width={16} height={16} alt="" /> : <img src={chevron18} width={18} height={18} alt="" />)}
    </>
  )
  const cls = `${styles.row} ${tile ? styles.rowTile : ''}`
  if (to)
    return (
      <Link to={to} className={cls}>
        {body}
      </Link>
    )
  return (
    <button type="button" className={cls} onClick={onClick}>
      {body}
    </button>
  )
}

/** Figma chip '설정하기' */
export function RowChip({ children }: { children: ReactNode }) {
  return <span className={styles.chip}>{children}</span>
}
