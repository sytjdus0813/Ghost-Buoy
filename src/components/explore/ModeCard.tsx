import iconCheck from '../../assets/mission/icon-check.svg'
import styles from './ModeCard.module.css'

type Props = {
  icon: string
  title: string
  desc: string
  selected?: boolean
  onClick?: () => void
}

/** Figma: mode-card (동행/관찰/촬영/지형 스캔) — 선택되면 하늘색 테두리 + 체크 */
export default function ModeCard({ icon, title, desc, selected, onClick }: Props) {
  return (
    <button type="button" className={`${styles.card} ${selected ? styles.selected : ''}`} onClick={onClick} aria-pressed={selected}>
      <span className={styles.top}>
        <span className={styles.iconBox}>
          <img src={icon} width={20} height={20} alt="" />
        </span>
        {selected && <img src={iconCheck} width={24} height={24} alt="선택됨" />}
      </span>
      <span className={styles.title}>{title}</span>
      <span className={styles.desc}>{desc}</span>
    </button>
  )
}
