import { useState } from 'react'
import AppScreen from '../../components/layout/AppScreen'
import { HeaderInto } from '../../components/layout/Header'
import ListRow, { RowChip } from '../../components/ListRow'
import hero from '../../assets/community/following-post.png'
import chipDot from '../../assets/community/chip-dot.svg'
import iconFilm from '../../assets/mission/icon-film.svg'
import iconObserve from '../../assets/mission/icon-observe.svg'
import iconPin from '../../assets/device/icon-pin.svg'
import styles from './DeviceAdd.module.css'

// 로봇별 목업 값 (botA는 Figma 그대로, B·C는 예시)
const BOTS = {
  botA: { battery: 85, remain: 160, status: '촬영 중' },
  botB: { battery: 72, remain: 135, status: '대기 중' },
  botC: { battery: 41, remain: 70, status: '충전 중' },
} as const
type BotId = keyof typeof BOTS

/** Figma: device/add (39:16577) — 로봇(드론) 상세 */
export default function DeviceAdd() {
  const [bot, setBot] = useState<BotId>('botA')
  const b = BOTS[bot]

  return (
    <AppScreen header={<HeaderInto title="장비 추가" backTo="/device" />} gap={12}>
      <div className={styles.content}>
        <div className={styles.tabs} role="tablist">
          {(Object.keys(BOTS) as BotId[]).map((id) => (
            <button key={id} type="button" role="tab" aria-selected={bot === id} className={bot === id ? styles.tabOn : styles.tab} onClick={() => setBot(id)}>
              {id}
            </button>
          ))}
          <button type="button" className={styles.tabAdd}>
            + 추가
          </button>
        </div>

        <div className={styles.hero}>
          <img className={styles.heroImg} src={hero} alt="" />
          <span className={styles.heroShade} />
          <span className={styles.statusPill}>
            <img src={chipDot} width={7} height={7} alt="" />
            {b.status}
          </span>
          <span className={styles.heroTitle}>
            <b>Ghost Diver · {bot}</b>
            <small>S/N 00Buoy1283628-{bot}</small>
          </span>
        </div>

        <div className={styles.stats}>
          <span className={styles.stat}>
            <span>
              <b>{b.battery}</b>
              <small>%</small>
            </span>
            배터리
          </span>
          <i />
          <span className={styles.stat}>
            <span>
              <b>{b.remain}</b>
              <small>분</small>
            </span>
            잔여 작동
          </span>
          <i />
          <span className={styles.stat}>
            <span>
              <b>양호</b>
            </span>
            통신
          </span>
        </div>

        <h2 className={styles.subtitle}>로봇 기능</h2>

        <div className={styles.list}>
          <ListRow icon={iconFilm} title="팀원 추적 촬영" sub="촬영 설정 · 켜짐" trailing={<RowChip>설정하기</RowChip>} />
          <ListRow icon={iconObserve} title="미션 · 팀원 관찰" sub="미션 관리" to="/explore/mission/detail" />
          <ListRow icon={iconPin} title="현재 위치" sub="양양 00 다이빙 포인트 · 16:40:25" to="/device/system" />
        </div>
      </div>
    </AppScreen>
  )
}
