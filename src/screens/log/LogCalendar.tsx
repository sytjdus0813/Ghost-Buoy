import { useNavigate, useSearchParams } from 'react-router-dom'
import AppScreen from '../../components/layout/AppScreen'
import { Header } from '../../components/layout/Header'
import SectionTitle from '../../components/SectionTitle'
import { useStore } from '../../data/store'
import dayFuture from '../../assets/log/day-future.svg'
import dayToday from '../../assets/log/day-today.svg'
import dayEmpty from '../../assets/log/day-empty.svg'
import dayDive from '../../assets/log/day-dive.svg'
import dayBlank from '../../assets/log/day-blank.svg'
import LogWriteSheet from './LogWriteSheet'
import styles from './LogCalendar.module.css'

type Cell = 'blank' | 'empty' | 'dive' | 'today' | 'future'
const ASSET: Record<Cell, string> = { blank: dayBlank, empty: dayEmpty, dive: dayDive, today: dayToday, future: dayFuture }

// Figma log/log (39:15772) 달력 칸 배치 그대로 (b=빈칸 e=기록 없음 d=다이빙 t=오늘 f=앞으로)
const GRID = ['beeddee', 'dedeedd', 'dtfffff', 'fffffff', 'fffffbb']
const CODE: Record<string, Cell> = { b: 'blank', e: 'empty', d: 'dive', t: 'today', f: 'future' }
const WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

/**
 * Figma: log/log (39:15751) + log-detail-auto / log-detail-self
 * Figma 코멘트: 기록이 있는 칸 → 바로 상세(log-detail-auto), 기록이 없는 칸 → 수동 기록(log-detail-self)
 */
export default function LogCalendar() {
  const navigate = useNavigate()
  const { sessions } = useStore()
  const [params, setParams] = useSearchParams()
  const writing = params.get('write') === '1'

  const openWrite = () => setParams({ write: '1' })
  const closeWrite = () => setParams({})
  // 달력은 Figma 배치 그대로라 날짜가 없음 → 다이빙 칸을 순서대로 세션에 연결
  let diveIndex = 0

  return (
    <AppScreen
      header={<Header />}
      gap={8}
      overlay={writing && <LogWriteSheet onClose={closeWrite} />}
    >
      <div className={styles.content}>
        <SectionTitle title="지난 기록" moreTo="/log" />
        <p className={styles.day}>11</p>
        <div className={styles.yearRow}>
          <span>2026</span>
          <b>화요일</b>
        </div>
        <div className={styles.calendar}>
          <div className={styles.week}>
            {WEEK.map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </div>
          <div className={styles.grid}>
            {GRID.map((row, r) => (
              <div key={r} className={styles.row}>
                {row.split('').map((c, i) => {
                  const cell = CODE[c]
                  const img = <img src={ASSET[cell]} width={53} height={53} alt="" />
                  if (cell === 'dive') {
                    const session = sessions.length ? sessions[diveIndex++ % sessions.length] : undefined
                    return (
                      <button
                        key={i}
                        type="button"
                        className={styles.cell}
                        aria-label="다이빙 기록 보기"
                        onClick={() => navigate(session ? `/log/${session.id}` : '/log')}
                      >
                        {img}
                      </button>
                    )
                  }
                  if (cell === 'empty')
                    return (
                      <button key={i} type="button" className={styles.cell} aria-label="다이빙 기록 직접 작성" onClick={openWrite}>
                        {img}
                      </button>
                    )
                  return (
                    <span key={i} className={styles.cell}>
                      {img}
                      {cell === 'today' && <span className={styles.todayNum}>15</span>}
                    </span>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppScreen>
  )
}
