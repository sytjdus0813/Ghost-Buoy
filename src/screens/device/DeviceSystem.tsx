import { useEffect, useState } from 'react'
import AppScreen from '../../components/layout/AppScreen'
import { HeaderInto } from '../../components/layout/Header'
import SectionTitle from '../../components/SectionTitle'
import ListRow, { RowChip } from '../../components/ListRow'
import sysOrb from '../../assets/device/sys-orb.svg'
import sysLogo from '../../assets/device/sys-logo.svg'
import contour from '../../assets/device/contour.svg'
import pulse from '../../assets/device/pulse.svg'
import buoy from '../../assets/device/buoy.svg'
import dotLocation from '../../assets/device/dot-location.svg'
import iconPin from '../../assets/device/icon-pin.svg'
import iconZone from '../../assets/device/icon-zone.svg'
import iconRobot from '../../assets/device/icon-robot.svg'
import styles from './DeviceSystem.module.css'

/** Figma: device/system (39:16519) — Ghost Buoy 시스템 */
export default function DeviceSystem() {
  // GPS 좌표 옆 시간은 실시간 갱신 (목업)
  const [time, setTime] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const hms = time.toLocaleTimeString('en-GB', { hour12: false }) // 16:40:25 형식

  return (
    <AppScreen header={<HeaderInto title="Ghost Buoy 시스템" backTo="/device" />} gap={20}>
      <div className={styles.content}>
        <div className={styles.card}>
          <span className={styles.orb}>
            <img className={styles.orbBg} src={sysOrb} width={48.64} height={48.64} alt="" />
            <span className={styles.orbIcon}>
              <img src={sysLogo} width={17.9209} height={22.2943} alt="" />
            </span>
          </span>
          <span className={styles.cardText}>
            <b>Ghost Buoy 01</b>
            <small>S/N 00Buoy1283628</small>
          </span>
          <span className={styles.ok}>통신 양호</span>
        </div>

        <div className={styles.map}>
          <img className={styles.contour} src={contour} width={377} height={128} alt="" />
          <img className={styles.pulse} src={pulse} width={44} height={44} alt="" />
          <img className={styles.buoy} src={buoy} width={14} height={14} alt="부표 위치" />
          <div className={styles.pillWrap}>
            <span className={styles.pill}>
              <img src={dotLocation} width={8} height={8} alt="" />
              현재 위치 · 양양 00 포인트
            </span>
          </div>
        </div>

        <div className={styles.titleWrap}>
          <SectionTitle title="부표 상태" moreTo="/device/system" />
        </div>

        <div className={styles.list}>
          <ListRow icon={iconPin} title="GPS 좌표" sub={`38.02°N, 128.73°E · ${hms}`} />
          <ListRow icon={iconZone} title="안전 구역" sub="반경 50m · 설정 완료" trailing={<RowChip>설정하기</RowChip>} />
          <ListRow icon={iconRobot} title="로봇 관리" sub="연결된 로봇 4대" to="/device/add" />
        </div>

        <p className={styles.footer}>최초 등록 2026.10.16 · 최근 연결 2026.10.17</p>
      </div>
    </AppScreen>
  )
}
