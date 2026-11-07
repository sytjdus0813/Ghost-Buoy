import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppScreen from '../../components/layout/AppScreen'
import { Header } from '../../components/layout/Header'
import { formatDuration, useStore } from '../../data/store'
import iconPlus from '../../assets/log/icon-plus.svg'
import chartGrid from '../../assets/log/chart-grid.svg'
import chartArea from '../../assets/log/chart-area.svg'
import chartLine from '../../assets/log/chart-line.svg'
import chartDotGlow from '../../assets/log/chart-dot-glow.svg'
import chartDot from '../../assets/log/chart-dot.svg'
import iconSort from '../../assets/explore/icon-chevron-sort.svg'
import iconRow from '../../assets/log/icon-chevron-sm.svg'
import styles from './LogMain.module.css'

// Figma chart(39:15922) 레이어: [에셋, 바깥 inset, 안쪽 inset]
const CHART_LAYERS: Array<[string, string, string]> = [
  [chartGrid, '22.73% 0', '-0.69% 0'],
  [chartArea, '16.21% 0.62% 0 0', '0'],
  [chartLine, '16.21% 0.62% 35.76% 0', '-2.37% -0.32%'],
  [chartDotGlow, '9.38% -0.59% 75% 96.19%', '0'],
  [chartDot, '13.54% 0.59% 79.17% 97.36%', '-10.39%'],
]

const METRICS = ['수심', '시간', '횟수'] as const
const FILTERS = [
  { id: 'all', label: '전체' },
  { id: 'free', label: '프리' },
  { id: 'scuba', label: '스쿠버' },
] as const

function fullDate(iso: string) {
  const d = new Date(iso)
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`
}

/** Figma: log/main (39:15885) */
export default function LogMain() {
  const { sessions } = useStore()
  const [metric, setMetric] = useState<(typeof METRICS)[number]>('수심')
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['id']>('all')
  const list = sessions.filter((s) => filter === 'all' || s.type === filter)

  return (
    <AppScreen header={<Header />} gap={15}>
      <div className={styles.content}>
        <Link to="/log/calendar?write=1" className={styles.newCard}>
          <span className={styles.newText}>
            <b>새 다이빙 로그 작성</b>
            <small>프리다이빙 · 스쿠버 · CCR · 수영장 훈련</small>
          </span>
          <img src={iconPlus} width={24} height={24} alt="" />
        </Link>

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span>
              <b>{50 + sessions.length}</b>
              <small>회</small>
            </span>
            총 다이빙
          </div>
          <div className={styles.stat}>
            <span>
              <b>218</b>
              <small>h</small>
            </span>
            누적 시간
          </div>
          <div className={styles.stat}>
            <span>
              <b>6</b>
              <small>곳</small>
            </span>
            다이빙 사이트
          </div>
        </div>

        <section className={styles.growth}>
          <div className={styles.growthHead}>
            <h2>성장 리포트</h2>
            <span className={styles.spacer} />
            {/* ⚠️ 시간·횟수 그래프는 Figma에 없음 — 탭 선택만 동작 */}
            <div className={styles.seg} role="tablist">
              {METRICS.map((m) => (
                <button key={m} type="button" role="tab" aria-selected={metric === m} className={metric === m ? styles.segOn : styles.segOff} onClick={() => setMetric(m)}>
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.big}>
            <span>
              <b>32.4</b>
              <small>m</small>
            </span>
            <span className={styles.delta}>▲ 12%</span>
          </div>
          <p className={styles.caption}>최대 수심 · 지난달 대비 3.4m 더 깊어졌어요</p>
          <div className={styles.chart} aria-label="월별 최대 수심 그래프">
            {CHART_LAYERS.map(([src, outer, inner]) => (
              <div key={src} className={styles.layer} style={{ inset: outer }}>
                <div className={styles.layer} style={{ inset: inner }}>
                  <img src={src} alt="" />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.months}>
            {['6월', '7월', '8월', '9월', '10월'].map((m) => (
              <span key={m}>{m}</span>
            ))}
            <b>11월</b>
          </div>
        </section>

        <div className={styles.sectionHead}>
          <h2>지난 기록</h2>
          <span className={styles.spacer} />
          <Link to="/log/calendar" className={styles.more}>
            전체보기
            <img src={iconSort} width={14} height={14} alt="" />
          </Link>
        </div>

        {/* PRD 5.4: 프리 / 스쿠버 필터 (⚠️ Figma에 없는 요소 — 섹션 제목 아래 텍스트 탭으로 최소 추가) */}
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button key={f.id} type="button" className={filter === f.id ? styles.filterOn : styles.filter} onClick={() => setFilter(f.id)}>
              {f.label}
            </button>
          ))}
        </div>

        <ul className={styles.list}>
          {list.map((s) => (
            <li key={s.id}>
              <Link to={`/log/${s.id}`} className={styles.row}>
                <img className={styles.thumb} src={s.cover} alt="" />
                <span className={styles.rowText}>
                  <b>{s.location}</b>
                  <small>
                    {fullDate(s.date)} · 버디 {s.buddies.length}명 · {formatDuration(s.totalDuration)}
                  </small>
                </span>
                <img src={iconRow} width={14} height={14} alt="" />
              </Link>
            </li>
          ))}
          {list.length === 0 && <li className={styles.empty}>기록이 없어요</li>}
        </ul>
      </div>
    </AppScreen>
  )
}
