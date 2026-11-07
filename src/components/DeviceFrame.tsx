import type { ReactNode } from 'react'
import StatusBar from './StatusBar'
import HomeBar from './HomeBar'
import styles from './DeviceFrame.module.css'

/**
 * 휴대폰에서는 화면 전체를 그대로 쓰고(실제 기기의 상태바/홈바 사용),
 * 데스크톱에서는 Figma 프레임 크기(393 × 852)의 폰 모양 미리보기로 보여준다.
 * Figma의 "Status bar/iPhone 16/Main", "Home bar/iPhone 15/Main" 인스턴스는
 * 데스크톱 미리보기에서만 표시한다.
 */
export default function DeviceFrame({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <div className={styles.device} id="device">
        <div className={styles.chrome} aria-hidden>
          <StatusBar />
        </div>
        <div className={styles.viewport}>{children}</div>
        <div className={`${styles.chrome} ${styles.homeBar}`} aria-hidden>
          <HomeBar />
        </div>
      </div>
    </div>
  )
}
