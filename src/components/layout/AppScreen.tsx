import type { CSSProperties, ReactNode } from 'react'
import Navbar from './Navbar'
import styles from './AppScreen.module.css'

type Props = {
  header: ReactNode
  children: ReactNode
  /** 하단 탭 표시 (기본 true) */
  nav?: boolean
  /** 화면 배경 (기본 var(--background)) */
  background?: string
  /** 헤더와 본문 사이 간격 (Figma 기준, 기본 16) */
  gap?: number
  /** 스크롤 영역 위에 고정으로 띄울 요소 (예: 글쓰기 버튼) */
  overlay?: ReactNode
}

/**
 * 공통 화면 틀: 상태바 영역 → header(50) → 본문(스크롤) → navbar(64, 하단 고정)
 * Figma 프레임의 header y=60, navbar y=754, home bar 34 기준.
 */
export default function AppScreen({ header, children, nav = true, background, gap = 16, overlay }: Props) {
  const style = { background, '--content-gap': `${gap}px` } as CSSProperties
  return (
    <div className={styles.screen} style={style}>
      <div className={styles.top}>{header}</div>
      <main className={`${styles.body} ${nav ? styles.withNav : ''}`}>{children}</main>
      {overlay}
      {nav && <Navbar />}
    </div>
  )
}
