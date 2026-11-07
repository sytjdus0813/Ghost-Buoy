import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppScreen from '../../components/layout/AppScreen'
import { HeaderInto } from '../../components/layout/Header'
import { useStore } from '../../data/store'
import { TICKS } from './sessionTicks'
import ringSubtract from '../../assets/session/ring-subtract.svg'
import iconDiver from '../../assets/session/icon-diver.svg'
import styles from './HomeSession.module.css'

// 링 기하 (Figma: 300 링, 구멍 216 → 띠 두께 42, 중심선 반지름 129)
const C = 150
const R = 129
const BAND = 42
const FULL_MINUTES = 120

/** 경과 초 → 각도(도). 0분 = 12시 방향, 시계 방향 */
const angleOf = (sec: number) => Math.min((sec / 60 / FULL_MINUTES) * 360, 359.9)

function pointAt(deg: number, r = R) {
  const rad = (deg * Math.PI) / 180
  return { x: C + r * Math.sin(rad), y: C - r * Math.cos(rad) }
}

function arcPath(deg: number, r = R) {
  const start = pointAt(0, r)
  const end = pointAt(deg, r)
  // 길이 0이어도 round cap으로 점이 보이도록 같은 점까지 선을 그림
  if (deg < 0.01) return `M ${start.x} ${start.y} L ${end.x} ${end.y + 0.001}`
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${deg > 180 ? 1 : 0} 1 ${end.x} ${end.y}`
}

/** 파란 진행 호 (Ellipse 16 자리, light 링 아래) */
function ProgressArc({ elapsed }: { elapsed: number }) {
  return (
    <svg className={styles.ring} width={300} height={300} viewBox="0 0 300 300" aria-hidden>
      <path d={arcPath(angleOf(elapsed))} stroke="var(--point)" strokeWidth={BAND} strokeLinecap="round" fill="none" />
    </svg>
  )
}

/** 흰 점선 + 다이버 아이콘 (Ellipse 19 / icon 자리, light 링 위) */
function ProgressDots({ elapsed }: { elapsed: number }) {
  const deg = angleOf(elapsed)
  const tip = pointAt(deg)
  return (
    <>
      <svg className={styles.ring} width={300} height={300} viewBox="0 0 300 300" aria-hidden>
        {deg > 2 && (
          <path d={arcPath(deg, R - 6)} stroke="#fff" strokeWidth={1.6} strokeDasharray="1.6 4" strokeLinecap="round" fill="none" />
        )}
      </svg>
      <img
        className={styles.diver}
        src={iconDiver}
        width={24}
        height={24}
        alt=""
        style={{ left: tip.x - 12, top: tip.y - 12 + 40 }}
      />
    </>
  )
}

const tickAssets = import.meta.glob<string>('../../assets/session/ticks/tick-*.svg', { eager: true, import: 'default' })
const tick = (i: number) => tickAssets[`../../assets/session/ticks/tick-${String(i + 1).padStart(2, '0')}.svg`]

function hhmmss(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':')
}

const TYPE_LABEL = { free: '프리', scuba: '스쿠버' } as const

/** Figma: home/session (39:15282) — 다이빙 중 화면 (PRD 5.6 세션 연결 흐름 시뮬레이션) */
export default function HomeSession() {
  const navigate = useNavigate()
  const { active, startSession, endSession } = useStore()
  const [now, setNow] = useState(() => Date.now())

  // 이 화면에 들어오면 세션 시작 (이미 진행 중이면 이어서)
  useEffect(() => {
    startSession()
  }, [startSession])

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])

  const elapsed = active ? Math.max(0, Math.floor((now - active.startedAt) / 1000)) : 0
  const started = active ? new Date(active.startedAt) : new Date()
  const startLabel = started.toLocaleTimeString('ko-KR', { hour: 'numeric', minute: '2-digit' })

  function handleEnd() {
    const s = endSession()
    navigate(s ? `/log/${s.id}` : '/log')
  }

  return (
    <AppScreen header={<HeaderInto title="다이빙 세션" backTo="/home" />} background="var(--schemes-on-primary)" gap={36}>
      <div className={styles.info}>
        <p className={styles.when}>오늘 - {startLabel}</p>
        <p className={styles.where}>{active?.location ?? '제주특별자치도 월령포구'}</p>
      </div>

      <div className={styles.dial} role="timer" aria-label={`경과 시간 ${hhmmss(elapsed)}`}>
        {/*
          진행 호: Figma의 Ellipse 16(파란 호, 0→30분 고정 모양)과 Ellipse 19(점선)는
          고정 이미지라 시간에 맞춰 늘릴 수 없어 같은 색·두께·반지름의 SVG로 그림.
          한 바퀴 = 120분 (눈금 0·30·60·90).
        */}
        <ProgressArc elapsed={elapsed} />
        <p className={styles.time}>{hhmmss(elapsed)}</p>
        <img className={styles.subtract} src={ringSubtract} width={300} height={300} alt="" />
        <ProgressDots elapsed={elapsed} />
        <div className={styles.ticks}>
          {TICKS.map(([outer, inner], i) => (
            <div key={i} className={styles.tick} style={{ inset: outer }}>
              <div className={styles.tickInner} style={{ inset: inner }}>
                <img src={tick(i)} alt="" />
              </div>
            </div>
          ))}
          <span className={styles.label} style={{ left: 98.32, top: 0 }}>0</span>
          <span className={styles.label} style={{ left: 193.12, top: 94.8 }}>30</span>
          <span className={styles.label} style={{ left: 95, top: 189.61 }}>60</span>
          <span className={styles.label} style={{ left: 0.19, top: 94.8 }}>90</span>
        </div>
        <p className={styles.type}>{TYPE_LABEL[active?.type ?? 'free']}</p>
      </div>

      <p className={styles.caption}>
        다이빙 컴퓨터와 연동되어 입수와 출수 시간을
        <br />
        정확하게 기록합니다.
      </p>

      {/* ⚠️ Figma에 종료 버튼이 없음 — PRD 5.6 "다이빙 종료"를 위해 home/main의 outline btn 스타일을 재사용 */}
      <button type="button" className={styles.end} onClick={handleEnd}>
        다이빙 종료
      </button>
    </AppScreen>
  )
}
