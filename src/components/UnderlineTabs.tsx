import { NavLink } from 'react-router-dom'
import styles from './UnderlineTabs.module.css'

type Tab = { label: string; to?: string; value?: string }
type Props = {
  tabs: Tab[]
  /** 링크 대신 상태로 전환할 때 */
  value?: string
  onChange?: (v: string) => void
  /** 탭 폭: 'fill' = 균등 분배(커뮤니티), 'fixed' = 90px(도감) */
  layout?: 'fill' | 'fixed'
}

/** Figma: communinty-chips — 선택 시 Bold + 밑줄 */
export default function UnderlineTabs({ tabs, value, onChange, layout = 'fill' }: Props) {
  const cls = (active: boolean) => `${styles.tab} ${layout === 'fixed' ? styles.fixed : ''} ${active ? styles.on : ''}`
  return (
    <div className={styles.row}>
      {tabs.map((t) =>
        t.to ? (
          <NavLink key={t.label} to={t.to} end className={({ isActive }) => cls(isActive)}>
            {t.label}
          </NavLink>
        ) : (
          <button key={t.label} type="button" className={cls(value === (t.value ?? t.label))} onClick={() => onChange?.(t.value ?? t.label)}>
            {t.label}
          </button>
        ),
      )}
    </div>
  )
}
