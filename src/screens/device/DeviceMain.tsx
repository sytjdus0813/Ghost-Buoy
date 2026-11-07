import { Link } from 'react-router-dom'
import AppScreen from '../../components/layout/AppScreen'
import { Header } from '../../components/layout/Header'
import SectionTitle from '../../components/SectionTitle'
import ListRow from '../../components/ListRow'
import { useStore } from '../../data/store'
import dotGlow from '../../assets/device/dot-connected-glow.svg'
import orb1 from '../../assets/device/orb-1.svg'
import orb2 from '../../assets/device/orb-2.svg'
import orb3 from '../../assets/device/orb-3.svg'
import orbLogo from '../../assets/device/orb-logo.svg'
import iconBattery from '../../assets/device/icon-battery.svg'
import iconGps from '../../assets/device/icon-gps.svg'
import iconTemp from '../../assets/device/icon-temp.svg'
import dotStandby from '../../assets/device/dot-standby.svg'
import iconCamera from '../../assets/device/icon-camera.svg'
import iconSystem from '../../assets/device/icon-system.svg'
import iconAdd from '../../assets/device/icon-add.svg'
import robotImg from '../../assets/community/following-post.png'
import styles from './DeviceMain.module.css'

/** Figma: device/main (39:15701) */
export default function DeviceMain() {
  const { devices } = useStore()
  const buoy = devices.find((d) => d.type === 'buoy')

  return (
    <AppScreen header={<Header />} gap={12}>
      <div className={styles.content}>
        <Link to="/device/system" className={styles.hero}>
          <div className={styles.heroTop}>
            <div className={styles.heroText}>
              <span className={styles.badge}>현재 연결</span>
              <span className={styles.name}>Ghost Buoy #0813</span>
              <span className={styles.status}>
                <span className={styles.dot}>
                  <img src={dotGlow} alt="" />
                </span>
                {buoy?.connected ? '연결됨 · 2분 전 동기화' : '연결 끊김'}
              </span>
            </div>
            <div className={styles.orb} aria-hidden>
              <img className={styles.orb1} src={orb1} alt="" />
              <img className={styles.orb2} src={orb2} width={112} height={112} alt="" />
              <img className={styles.orb3} src={orb3} width={92} height={92} alt="" />
              <span className={styles.orbIcon}>
                <img src={orbLogo} width={33.896} height={42.1684} alt="" />
              </span>
            </div>
          </div>
          <div className={styles.stats}>
            <span className={styles.stat}>
              <span className={styles.statValue}>
                <img src={iconBattery} width={16} height={16} alt="" />
                <b className={styles.semibold}>{buoy?.battery ?? 82}%</b>
              </span>
              배터리
            </span>
            <span className={styles.stat}>
              <span className={styles.statValue}>
                <img src={iconGps} width={16} height={16} alt="" />
                <b>강함</b>
              </span>
              GPS 신호
            </span>
            <span className={styles.stat}>
              <span className={styles.statValue}>
                <span className={styles.tempIcon}>
                  <img src={iconTemp} alt="" />
                </span>
                <b>정상</b>
              </span>
              수온 센서
            </span>
          </div>
        </Link>

        <Link to="/device/add" className={styles.robot}>
          <img className={styles.robotImg} src={robotImg} alt="" />
          <span className={styles.robotText}>
            <span className={styles.robotName}>Ghost Diver R1</span>
            <span className={styles.robotStatus}>
              <img src={dotStandby} width={7} height={7} alt="" />
              대기 중 · 배터리 64%
            </span>
          </span>
          <span className={styles.camera}>
            <img src={iconCamera} width={16} height={16} alt="" />
            카메라
          </span>
        </Link>

        <div className={styles.titleWrap}>
          <SectionTitle title="내 장비" moreTo="/device/system" />
        </div>

        <div className={styles.list}>
          <ListRow variant="tile" icon={iconSystem} title="Ghost Buoy 시스템" sub="안전 구역 · 알림 · 펌웨어 (소유자 전용)" to="/device/system" />
          <ListRow variant="tile" icon={iconAdd} title="장비 추가" sub="다이브 컴퓨터, 수트, 마스크 등" to="/device/add" />
        </div>
      </div>
    </AppScreen>
  )
}
