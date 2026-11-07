import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

const TABS = [
  { to: '/home', label: 'Home' },
  { to: '/explore', label: 'Explore' },
  { to: '/device', label: 'Device' },
  { to: '/log', label: 'Log' },
  { to: '/my', label: 'My' },
]

/** Figma: navbar (39:16351) — 하단 탭 5개 */
export default function Navbar() {
  return (
    <nav className={styles.navbar} aria-label="하단 탭">
      <div className={styles.items}>
        {TABS.map((t) => (
          <NavLink key={t.to} to={t.to} className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ''}`}>
            {t.label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
