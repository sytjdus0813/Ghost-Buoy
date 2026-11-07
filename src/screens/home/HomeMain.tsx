import { Link, useNavigate } from 'react-router-dom'
import AppScreen from '../../components/layout/AppScreen'
import { Header } from '../../components/layout/Header'
import { useStore } from '../../data/store'
import chipDot from '../../assets/home/chip-dot.svg'
import iconPlay from '../../assets/home/icon-play.svg'
import iconChevron from '../../assets/home/icon-chevron.svg'
import dotConnected from '../../assets/home/dot-connected.svg'
import styles from './HomeMain.module.css'

const colAssets = import.meta.glob<string>('../../assets/home/col-*.svg', { eager: true, import: 'default' })
const col = (n: string) => colAssets[`../../assets/home/col-${n}.svg`]

/** Figma Card/Revenue > Dots: [left, top, height, 에셋 번호] (col-22는 Figma에도 없음) */
const COLUMNS: Array<[number, number, number, string]> = [
  [0, 72, 11.5, '01'], [7, 64, 19.5, '02'], [14, 48, 35.5, '03'], [21, 24, 59.5, '04'],
  [28, 64, 19.5, '02'], [35, 64, 19.5, '02'], [42, 56, 27.5, '07'], [49, 40, 43.5, '08'],
  [56, 56, 27.5, '07'], [63, 80, 3.5, '10'], [70, 64, 19.5, '02'], [77, 72, 11.5, '01'],
  [84, 64, 19.5, '02'], [91, 64, 19.5, '02'], [98, 56, 27.5, '07'], [105, 64, 19.5, '02'],
  [112, 64, 19.5, '02'], [119, 80, 3.5, '10'], [126, 72, 11.5, '01'], [133, 64, 19.5, '02'],
  [140, 64, 19.5, '02'], [154, 48, 35.5, '23'], [161, 40, 43.5, '24'], [168, 0, 83.5, '25'],
  [175, 16, 67.5, '26'], [182, 32, 51.5, '27'], [189, 24, 59.5, '28'], [196, 48, 35.5, '23'],
  [203, 48, 35.5, '23'], [210, 64, 19.5, '31'], [217, 48, 35.5, '23'], [224, 72, 11.5, '33'],
  [231, 80, 3.5, '34'], [238, 64, 19.5, '31'], [245, 72, 11.5, '33'], [252, 80, 3.5, '34'],
  [259, 48, 35.5, '23'], [266, 64, 19.5, '31'], [273, 80, 3.5, '34'], [280, 80, 3.5, '34'],
  [287, 56, 27.5, '42'], [294, 64, 19.5, '31'], [301, 48, 35.5, '23'], [308, 64, 19.5, '31'],
  [315, 56, 27.5, '46'], [322, 64, 19.5, '47'], [329, 80, 3.5, '48'],
]

/** Figma: home/main (39:15019) */
export default function HomeMain() {
  const navigate = useNavigate()
  const { sessions, devices } = useStore()
  const latest = sessions[0]
  const buoy = devices.find((d) => d.type === 'buoy')

  return (
    <AppScreen header={<Header />}>
      <div className={styles.stack}>
        {/* Card/session */}
        <button type="button" className={styles.sessionCard} onClick={() => navigate('/home/session')}>
          <span className={styles.chip}>
            <img src={chipDot} width={7} height={7} alt="" />
            DIVE SESSION
          </span>
          <span className={styles.sessionBottom}>
            <span className={styles.sessionText}>
              <span className={styles.sessionTitle}>새 다이빙 세션 시작</span>
              <span className={styles.sessionSub}>
                최근 · {latest?.shortLocation ?? '제주 서귀포'} · {latest?.shortDate ?? '10월 16일'}
              </span>
            </span>
            <span className={styles.play} aria-hidden>
              <img src={iconPlay} width={22} height={22} alt="" />
            </span>
          </span>
        </button>

        {/* btn: 이전 기록 상세보기 */}
        <Link to={latest ? `/log/${latest.id}` : '/log'} className={styles.outlineBtn}>
          이전 기록 상세보기
        </Link>

        {/* card/dashboard */}
        <div className={styles.dashboard}>
          <Link to="/log" className={styles.feedback}>
            <span className={styles.feedbackHead}>
              <span className={styles.feedbackTitle}>AI 피드백</span>
              <img className={styles.flip} src={iconChevron} width={24} height={24} alt="" />
            </span>
            <span className={styles.feedbackText}>지난 다이빙에서 잘못된 자세로 부상 위험이 높았어요.</span>
          </Link>
          <Link to="/device" className={styles.buoy}>
            <span className={styles.buoyHead}>
              <img src={dotConnected} width={8} height={8} alt="" />
              <span>Buoy {buoy?.connected ? '연결됨' : '연결 안 됨'}</span>
            </span>
            <span className={styles.buoyValue}>
              <span className={styles.buoyNum}>{buoy?.battery ?? 82}</span>
              <span className={styles.buoyUnit}>%</span>
            </span>
            <span className={styles.battery}>
              <span className={styles.batteryFill} style={{ width: `${((buoy?.battery ?? 82) / 82) * 104}px` }} /* Figma: 82%일 때 104px */ />
            </span>
            <span className={styles.buoyFoot}>배터리 · 신호 양호</span>
          </Link>
        </div>

        {/* Card/Revenue */}
        <section className={styles.revenue}>
          <div className={styles.revHeader}>
            <div className={styles.titleRow}>
              <span>다이빙 시간</span>
              <span className={styles.tabs}>
                <span className={styles.tabOff}>주</span>
                <span className={styles.tabOff}>월</span>
                <span>시즌</span>
              </span>
            </div>
            <div className={styles.value}>
              <span className={styles.valueNum}>+42</span>
              <span className={styles.valueUnit}>m</span>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.chart}>
            <div className={styles.dots}>
              {COLUMNS.map(([left, top, h, n]) => (
                <img
                  key={left}
                  src={col(n)}
                  width={3.5}
                  height={h}
                  alt=""
                  style={{ position: 'absolute', left, top }}
                />
              ))}
            </div>
            <div className={styles.labels}>
              <span className={styles.labelOff}>10월 32시간42분</span>
              <span className={styles.labelOn}>11월 54시간 21분</span>
            </div>
          </div>
        </section>
      </div>
    </AppScreen>
  )
}
