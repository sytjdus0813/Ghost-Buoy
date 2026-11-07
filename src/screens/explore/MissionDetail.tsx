import { useState } from 'react'
import AppScreen from '../../components/layout/AppScreen'
import { HeaderInto } from '../../components/layout/Header'
import ModeCard from '../../components/explore/ModeCard'
import Segmented from '../../components/Segmented'
import { MODES, useMissionMode } from './missionMode'
import styles from './MissionDetail.module.css'

/** Figma: misson/detail (39:16644) — 미션 모드 선택 + 동행 모드 설정 */
export default function MissionDetail() {
  const [mode, setMode] = useMissionMode()
  const [target, setTarget] = useState('나')
  const [distance, setDistance] = useState('보통')
  const [move, setMove] = useState('뒤따라')
  const current = MODES.find((m) => m.id === mode) ?? MODES[0]

  return (
    <AppScreen header={<HeaderInto title="미션 관리" backTo="/explore/mission" />} gap={12}>
      <div className={styles.content}>
        <div className={styles.grid}>
          {MODES.map((m) => (
            <ModeCard key={m.id} icon={m.icon} title={m.title} desc={m.desc} selected={m.id === mode} onClick={() => setMode(m.id)} />
          ))}
        </div>

        <h2 className={styles.subtitle}>{current.title} 설정</h2>

        {/* ⚠️ Figma에는 동행 모드 설정만 있음 — 다른 모드도 같은 설정 패널을 보여줌 */}
        <div className={styles.settings}>
          <Segmented label="추적 대상" options={['나', '버디', '팀 전체']} value={target} onChange={setTarget} />
          <Segmented label="추적 거리" options={['가까이', '보통', '멀리']} value={distance} onChange={setDistance} />
          <Segmented label="이동 방식" options={['나란히', '뒤따라']} value={move} onChange={setMove} />
        </div>
      </div>
    </AppScreen>
  )
}
