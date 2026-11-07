import { useRef, type CSSProperties, type ReactNode } from 'react'
import Navbar from './Navbar'
import { fitStyle, useFitScale } from './useFitScale'
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
 * 모바일에서 화면이 짧으면, 프레임에 딱 맞게 디자인된 화면은 줄여서 스크롤 없이 보여 줌 (useFitScale).
 */
const FRAME_H = 852
const FRAME_STATUS = 60
const FRAME_HOME = 34
export default function AppScreen({ header, children, nav = true, background, gap = 16, overlay }: Props) {
  const style = { background, '--content-gap': `${gap}px` } as CSSProperties
  const topRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  // Figma 프레임에서 본문에 주어진 높이 = 852 - 상태바 - 헤더(칩 포함) - 위 간격 - 아래 여백
  const scale = useFitScale(bodyRef, innerRef, () => {
    const top = topRef.current
    const headerH = top ? top.offsetHeight - parseFloat(getComputedStyle(top).paddingTop) : 50
    const bottom = nav ? FRAME_HOME + 64 + 16 : FRAME_HOME + 24
    return FRAME_H - FRAME_STATUS - headerH - gap - bottom
  })

  return (
    <div className={styles.screen} style={style}>
      <div ref={topRef} className={styles.top}>
        {header}
      </div>
      <main ref={bodyRef} className={`${styles.body} ${nav ? styles.withNav : ''} ${scale < 1 ? styles.fitted : ''}`}>
        <div ref={innerRef} style={fitStyle(scale)}>
          {children}
        </div>
      </main>
      {overlay}
      {nav && <Navbar />}
    </div>
  )
}
