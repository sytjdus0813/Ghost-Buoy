import location from '../assets/common/status-location.svg'
import lens from '../assets/common/status-lens.svg'
import signal from '../assets/common/status-signal.svg'
import wifi from '../assets/common/status-wifi.svg'
import battery from '../assets/common/status-battery.svg'
import batteryLevel from '../assets/common/status-battery-level.svg'
import styles from './StatusBar.module.css'

/** Figma: Status bar/iPhone 16/Main (39:14992) — 데스크톱 미리보기 전용 */
export default function StatusBar() {
  return (
    <div className={styles.bar}>
      <div className={styles.left}>
        <span className={styles.time}>9:41</span>
        <img src={location} width={14} height={14} alt="" />
      </div>
      <div className={styles.island}>
        <img className={styles.lens} src={lens} width={12} height={12} alt="" />
      </div>
      <div className={styles.right}>
        <span className={styles.network}>
          <img className={styles.signal} src={signal} width={18.5} height={12.5} alt="" />
        </span>
        <img src={wifi} width={18} height={14} alt="" />
        <span className={styles.battery}>
          <img src={battery} width={27} height={14} alt="" />
          <img className={styles.batteryLevel} src={batteryLevel} width={9.87925} height={14} alt="" />
          <span className={styles.batteryText}>32</span>
        </span>
      </div>
    </div>
  )
}
