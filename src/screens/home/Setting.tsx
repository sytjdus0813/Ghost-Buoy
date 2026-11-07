import { Link, useNavigate } from 'react-router-dom'
import { Header } from '../../components/layout/Header'
import iconClose from '../../assets/common/icon-close.svg'
import styles from './Setting.module.css'

const MENU = [
  { label: '내 기기', to: '/device' },
  { label: '다이빙 설정', to: '/my' },
  { label: '고스트 & 기록', to: '/log' },
  { label: '공유', to: '/explore/community' },
  { label: '안전', to: '/my' },
]

/** Figma: setting (39:15381) — 헤더 메뉴 버튼으로 여는 전체 화면 메뉴 */
export default function Setting() {
  const navigate = useNavigate()
  return (
    <div className={styles.screen}>
      <div className={styles.top}>
        <Header />
      </div>
      <nav className={styles.menu}>
        {MENU.map((m) => (
          <Link key={m.label} to={m.to} className={styles.item}>
            {m.label}
          </Link>
        ))}
      </nav>
      <div className={styles.footer}>
        <p>@Ghost Buoy</p>
        <div className={styles.links}>
          <span>이용약관</span>
          <span>개인정보 처리방침</span>
          <span>v1.0.2</span>
        </div>
      </div>
      <button type="button" className={styles.close} aria-label="닫기" onClick={() => navigate(-1)}>
        <img src={iconClose} width={24} height={24} alt="" />
      </button>
    </div>
  )
}
