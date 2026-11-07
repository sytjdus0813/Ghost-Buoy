import type { ReactNode } from 'react'
import AppScreen from '../layout/AppScreen'
import { HeaderInto } from '../layout/Header'
import ExploreChips from './ExploreChips'
import styles from './ExploreSub.module.css'

type Props = {
  title: string
  children: ReactNode
  /** chips 아래 본문까지 간격 (Figma: 지도/미션 12, 커뮤니티/도감 16) */
  gap?: number
  overlay?: ReactNode
}

/** 탐험 공통 상단: header + explore/chips(y=126)를 스크롤 영역 밖에 고정 */
export function ExploreTop({ header }: { header: ReactNode }) {
  return (
    <>
      {header}
      <div className={styles.chipsBar}>
        <ExploreChips />
      </div>
    </>
  )
}

/** 탐험 하위 화면 공통: header/into(제목) → 고정 chips → 본문(스크롤) */
export default function ExploreSub({ title, children, gap = 12, overlay }: Props) {
  return (
    <AppScreen header={<ExploreTop header={<HeaderInto title={title} backTo="/explore" />} />} gap={gap} overlay={overlay}>
      <div className={styles.body}>{children}</div>
    </AppScreen>
  )
}
