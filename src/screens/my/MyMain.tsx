import { Link } from 'react-router-dom'
import AppScreen from '../../components/layout/AppScreen'
import { Header } from '../../components/layout/Header'
import { useStore } from '../../data/store'
import ring1 from '../../assets/my/avatar-ring-1.svg'
import ring2 from '../../assets/my/avatar-ring-2.svg'
import photo from '../../assets/my/avatar-photo.png'
import iconLicense from '../../assets/my/icon-license.svg'
import iconWave from '../../assets/my/icon-wave.svg'
import iconNight from '../../assets/my/icon-night.svg'
import iconNavigation from '../../assets/my/icon-navigation.svg'
import iconPin from '../../assets/my/icon-pin.svg'
import iconLock from '../../assets/my/icon-lock.svg'
import iconMore from '../../assets/explore/icon-chevron-sort.svg'
import styles from './MyMain.module.css'

const BADGES = [
  { icon: iconWave, label: '첫 다이브', bg: 'linear-gradient(135deg, rgb(125, 250, 227) 8.33%, rgb(33, 140, 191) 91.67%)' },
  { icon: iconNight, label: '나이트 다이브', bg: 'linear-gradient(135deg, rgb(140, 153, 255) 8.33%, rgb(77, 51, 178) 91.67%)' },
  { icon: iconNavigation, label: '30m 돌파', bg: 'linear-gradient(135deg, rgb(217, 255, 94) 8.33%, rgb(64, 178, 115) 91.67%)' },
  { icon: iconPin, label: '10곳 탐험', bg: 'linear-gradient(135deg, rgb(255, 191, 115) 8.33%, rgb(229, 89, 102) 91.67%)' },
]

const GOAL = 60

/** Figma: my/main (39:16082) */
export default function MyMain() {
  const { sessions } = useStore()
  // Figma 기준 52회 (목업 2건) + 새로 추가한 세션 수
  const count = 50 + sessions.length
  const left = Math.max(0, GOAL - count)

  return (
    <AppScreen header={<Header />} gap={12}>
      <div className={styles.content}>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <img className={styles.r1} src={ring1} width={100} height={100} alt="" />
            <img className={styles.r2} src={ring2} width={94} height={94} alt="" />
            <img className={styles.photo} src={photo} width={86} height={86} alt="프로필 사진" />
            <span className={styles.lv}>Lv.7</span>
          </div>
          <span className={styles.gap4} />
          <b className={styles.name}>강영수</b>
          <span className={styles.handle}>@ghost_yeongsu · #29412</span>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.license}>
            <img src={iconLicense} width={16} height={16} alt="" />
            라이선스
          </button>
          <Link to="/explore/profile" className={styles.editBtn}>
            프로필 편집
          </Link>
        </div>

        <div className={styles.stats}>
          <span className={styles.stat}>
            <span>
              <b>{count}</b>
              <small>회</small>
            </span>
            다이빙
          </span>
          <span className={styles.stat}>
            <span>
              <b>218:54</b>
            </span>
            총 다이빙 시간
          </span>
          <span className={styles.stat}>
            <span>
              <b>32</b>
              <small>m</small>
            </span>
            최대 수심
          </span>
        </div>

        <section className={styles.badges}>
          <div className={styles.head}>
            <h2>다이빙 배지</h2>
            <span className={styles.badgeCount}>12</span>
            <span className={styles.spacer} />
            <span className={styles.more}>
              더보기
              <img src={iconMore} width={14} height={14} alt="" />
            </span>
          </div>
          <div className={styles.badgeRow}>
            {BADGES.map((b) => (
              <span key={b.label} className={styles.badge}>
                <span className={styles.badgeIcon} style={{ backgroundImage: b.bg }}>
                  <img src={b.icon} width={26} height={26} alt="" />
                </span>
                {b.label}
              </span>
            ))}
            <span className={`${styles.badge} ${styles.locked}`}>
              <span className={styles.lockIcon}>
                <img src={iconLock} width={20} height={20} alt="" />
              </span>
              ???
            </span>
          </div>
        </section>

        <section className={styles.goal}>
          <div className={styles.goalHead}>
            <h2>2026 다이빙 목표</h2>
            <span className={styles.spacer} />
            <span className={styles.goalValue}>
              <b>{count} </b>/ {GOAL}회
            </span>
          </div>
          <div className={styles.bar}>
            {/* Figma: 52회일 때 282px */}
            <span className={styles.fill} style={{ width: `${(count / 52) * 282}px` }} />
          </div>
          <p className={styles.goalText}>{left > 0 ? `${left}회만 더 하면 목표 달성이에요!` : '목표를 달성했어요!'}</p>
        </section>
      </div>
    </AppScreen>
  )
}
