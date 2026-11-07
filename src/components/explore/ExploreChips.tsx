import { NavLink } from 'react-router-dom'
import styles from './ExploreChips.module.css'

const CHIPS = [
  { to: '/explore', label: '전체', end: true },
  { to: '/explore/map', label: '해저 지도' },
  { to: '/explore/community', label: '커뮤니티' },
  { to: '/explore/mission', label: '미션' },
  { to: '/explore/save', label: '생물 도감' },
]

/** Figma: explore/chips (39:16413) — 탐험 탭 상단 카테고리 */
export default function ExploreChips() {
  return (
    <nav className={styles.chips} aria-label="탐험 카테고리">
      {CHIPS.map((c) => (
        <NavLink
          key={c.to}
          to={c.to}
          end={c.end}
          className={({ isActive }) => `${styles.chip} ${isActive ? styles.active : ''}`}
        >
          {c.label}
        </NavLink>
      ))}
    </nav>
  )
}
