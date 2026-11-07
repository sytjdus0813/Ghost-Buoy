import { useState } from 'react'
import AppScreen from '../../components/layout/AppScreen'
import { HeaderInto } from '../../components/layout/Header'
import SectionTitle from '../../components/SectionTitle'
import dayEmpty from '../../assets/log/day-empty.svg'
import dayDive from '../../assets/log/day-dive.svg'
import dayToday from '../../assets/log/day-today.svg'
import dayFuture from '../../assets/log/day-future.svg'
import styles from './ExploreSchedule.module.css'

/**
 * ⚠️ Figma에 없는 화면 (explore/main "내 일정" 코멘트: 현재 UI 톤에 맞는 캘린더 페이지 제작 후 연결)
 * log/log 달력의 원형 칸(53px)과 색을 그대로 사용: 지난 날 = 테두리, 일정 = blueblack, 오늘 = point, 앞으로 = 회색
 */

type Plan = { day: number; title: string; place: string; time: string; joined: number; total: number }

// explore/main 카드 기준: 10/27 강릉 다이브 · 참가 3/4명 · D-3 → 오늘 = 10/24
const YEAR = 2026
const MONTH = 10
const TODAY = 24
const PLANS: Plan[] = [
  { day: 12, title: '양양 기사문항 펀다이브', place: '양양 기사문항', time: '09:00', joined: 4, total: 4 },
  { day: 27, title: '강릉 다이브', place: '강릉 사근진 해변', time: '08:30', joined: 3, total: 4 },
  { day: 31, title: '제주 문섬 투어', place: '제주 서귀포 · 문섬', time: '10:00', joined: 2, total: 6 },
]

const WEEK = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토']
const firstWeekday = new Date(YEAR, MONTH - 1, 1).getDay()
const daysInMonth = new Date(YEAR, MONTH, 0).getDate()
const cells: Array<number | null> = [
  ...Array<null>(firstWeekday).fill(null),
  ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
]
while (cells.length % 7) cells.push(null)

const planOf = (day: number) => PLANS.find((p) => p.day === day)
const dDay = (day: number) => (day === TODAY ? 'D-Day' : day > TODAY ? `D-${day - TODAY}` : '완료')

export default function ExploreSchedule() {
  const [selected, setSelected] = useState(27)
  const plan = planOf(selected)
  const upcoming = PLANS.filter((p) => p.day >= TODAY)

  return (
    <AppScreen header={<HeaderInto title="내 일정" backTo="/explore" />} gap={8}>
      <div className={styles.content}>
        <div className={styles.monthRow}>
          <b>{MONTH}월</b>
          <span>
            {YEAR} · 일정 {PLANS.length}개
          </span>
        </div>

        <div className={styles.calendar}>
          <div className={styles.week}>
            {WEEK.map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </div>
          <div className={styles.grid}>
            {cells.map((day, i) => {
              if (day === null) return <span key={i} className={styles.cell} />
              const has = !!planOf(day)
              const src = day === TODAY ? dayToday : has ? dayDive : day < TODAY ? dayEmpty : dayFuture
              const tone = day === TODAY || has ? styles.light : day < TODAY ? styles.past : ''
              return (
                <button
                  key={i}
                  type="button"
                  className={`${styles.cell} ${selected === day ? styles.selected : ''}`}
                  aria-label={`${MONTH}월 ${day}일${has ? ' 일정 있음' : ''}`}
                  aria-pressed={selected === day}
                  onClick={() => setSelected(day)}
                >
                  <img src={src} width={53} height={53} alt="" />
                  <span className={`${styles.num} ${tone}`}>{day}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className={styles.detail}>
          {plan ? (
            <div className={styles.planCard}>
              <span className={styles.cardLabel}>
                {MONTH}/{plan.day} ({WEEKDAY[new Date(YEAR, MONTH - 1, plan.day).getDay()]}) · {plan.time}
              </span>
              <span className={styles.cardTitle}>{plan.title}</span>
              <span className={styles.cardSub}>
                {plan.place} · 참가 {plan.joined}/{plan.total}명 · {dDay(plan.day)}
              </span>
            </div>
          ) : (
            <p className={styles.none}>
              {MONTH}/{selected} 일정이 없어요
            </p>
          )}
        </div>

        <SectionTitle title="다가오는 일정" moreTo="/explore/community" />
        <ul className={styles.list}>
          {upcoming.map((p) => (
            <li key={p.day}>
              <button type="button" className={styles.row} onClick={() => setSelected(p.day)}>
                <span className={styles.dateBox}>
                  <b>{p.day}</b>
                  <small>{WEEKDAY[new Date(YEAR, MONTH - 1, p.day).getDay()]}</small>
                </span>
                <span className={styles.rowText}>
                  <b>{p.title}</b>
                  <small>
                    {p.time} · 참가 {p.joined}/{p.total}명
                  </small>
                </span>
                <span className={styles.dday}>{dDay(p.day)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </AppScreen>
  )
}
