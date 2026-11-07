import { useNavigate } from 'react-router-dom'
import logo from '../../assets/common/logo.svg'
import iconBell from '../../assets/common/icon-bell.svg'
import iconMenu from '../../assets/common/icon-menu.svg'
import iconBack from '../../assets/common/icon-back.svg'
import styles from './Header.module.css'

function Actions() {
  const navigate = useNavigate()
  return (
    <div className={styles.actions}>
      <button type="button" className={styles.circle} aria-label="알림">
        <img src={iconBell} width={20} height={20} alt="" />
      </button>
      <button type="button" className={styles.circle} aria-label="메뉴" onClick={() => navigate('/setting')}>
        <img src={iconMenu} width={20} height={20} alt="" />
      </button>
    </div>
  )
}

/** Figma: header (1:7417) — 로고 + 알림/메뉴 버튼 */
export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <span className={styles.logoMark}>
          <img src={logo} width={17.6853} height={22.0009} alt="" />
        </span>
        <span className={styles.title}>Ghost Buoy</span>
      </div>
      <Actions />
    </header>
  )
}

type IntoProps = {
  title: string
  /** 뒤로가기 대상. 없으면 브라우저 히스토리 뒤로 */
  backTo?: string
  /** 오른쪽 알림/메뉴 버튼 표시 (기본 true) */
  actions?: boolean
}

/** Figma: header/into (5:9161) — 뒤로가기 + 제목 + 알림/메뉴 버튼 */
export function HeaderInto({ title, backTo, actions = true }: IntoProps) {
  const navigate = useNavigate()
  return (
    <header className={styles.header}>
      <div className={styles.into}>
        <button
          type="button"
          className={styles.back}
          aria-label="뒤로"
          onClick={() => (backTo ? navigate(backTo) : navigate(-1))}
        >
          <img src={iconBack} width={24} height={24} alt="" />
        </button>
        <h1 className={styles.title}>{title}</h1>
      </div>
      {actions && <Actions />}
    </header>
  )
}
