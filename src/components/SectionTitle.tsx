import { Link } from 'react-router-dom'
import iconMiniarrow from '../assets/common/icon-miniarrow.svg'
import styles from './SectionTitle.module.css'

type Props = { title: string; moreTo?: string; moreLabel?: string }

/** Figma: subtitle (17:9883) — 섹션 제목 + 전체보기 */
export default function SectionTitle({ title, moreTo, moreLabel = '전체보기' }: Props) {
  return (
    <div className={styles.row}>
      <h2 className={styles.title}>{title}</h2>
      {moreTo && (
        <Link to={moreTo} className={styles.more}>
          {moreLabel}
          <img src={iconMiniarrow} width={14} height={14} alt="" />
        </Link>
      )}
    </div>
  )
}
