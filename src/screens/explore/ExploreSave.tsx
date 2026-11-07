import { useMemo, useState } from 'react'
import ExploreSub from '../../components/explore/ExploreSub'
import SearchBar from '../../components/SearchBar'
import UnderlineTabs from '../../components/UnderlineTabs'
import turtle from '../../assets/save/turtle.png'
import nudibranch from '../../assets/save/nudibranch.png'
import starfish from '../../assets/save/starfish.png'
import lionfish from '../../assets/save/lionfish.png'
import manta from '../../assets/community/feed-manta.png'
import seaCucumber from '../../assets/community/upload-2.png'
import iconLock from '../../assets/save/icon-lock.svg'
import styles from './ExploreSave.module.css'

type Rarity = '매우 희귀' | '희귀' | '보통' | '흔함'
type Creature = { name: string; img?: string; rarity: Rarity; date: string; found: boolean }

// 배지 색: 매우 희귀는 Figma icon/epic(point2 / point-base) 그대로.
// ⚠️ 희귀·보통·흔함 배지는 Figma에 아직 없어서 이전 도감 디자인의 배지 색을 재사용
const BADGE: Record<Rarity, string> = {
  '매우 희귀': styles.veryRare,
  희귀: styles.rare,
  보통: styles.rareLight,
  흔함: styles.common,
}

// Figma(매우 희귀 탭): 발견 2종 + 미발견 2종(icon/lock + 불투명도 50)
// ⚠️ 희귀·보통·흔함 탭은 Figma에 없음 → 같은 구성으로 추가. 사진이 없는 생물은 회색 칸으로 표시
const CREATURES: Creature[] = [
  { name: '푸른바다거북', img: turtle, rarity: '매우 희귀', date: '10.16', found: true },
  { name: '갯민숭달팽이', img: nudibranch, rarity: '매우 희귀', date: '10.16', found: true },
  { name: '빨강불가사리', img: starfish, rarity: '매우 희귀', date: '10.16', found: false },
  { name: '쏠배감펭', img: lionfish, rarity: '매우 희귀', date: '10.16', found: false },
  { name: '만타가오리', img: manta, rarity: '희귀', date: '10.16', found: true },
  { name: '돌기해삼', img: seaCucumber, rarity: '희귀', date: '10.03', found: true },
  { name: '해마', rarity: '희귀', date: '-', found: false },
  { name: '문어', rarity: '희귀', date: '-', found: false },
  { name: '자리돔', rarity: '보통', date: '-', found: false },
  { name: '혹돔', rarity: '보통', date: '-', found: false },
  { name: '망둑어', rarity: '흔함', date: '-', found: false },
  { name: '군소', rarity: '흔함', date: '-', found: false },
]

const TABS = ['매우 희귀', '희귀', '보통', '흔함'].map((label) => ({ label }))

/** Figma: explore/save (39:15630) — 생물 도감 */
export default function ExploreSave() {
  const [query, setQuery] = useState('')
  const [rarity, setRarity] = useState<string>('매우 희귀')

  // 탭 = 등급 필터. 검색어가 있으면 모든 등급에서 찾음 (발견한 생물만)
  const list = useMemo(() => {
    const q = query.trim()
    if (q) return CREATURES.filter((c) => c.found && c.name.includes(q))
    return CREATURES.filter((c) => c.rarity === rarity)
  }, [query, rarity])

  return (
    <ExploreSub title="생물 도감" gap={16}>
      <SearchBar placeholder="생물 이름을 검색해보세요" onSearch={setQuery} />

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.value}>
            <b>12</b>
            <small>종</small>
          </span>
          <span className={styles.label}>발견한 생물</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.value}>
            <b>3</b>
            <small>종</small>
          </span>
          <span className={styles.label}>희귀 생물</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.value}>
            <b>23</b>
            <small>%</small>
          </span>
          <span className={styles.label}>도감 완성</span>
        </div>
      </div>

      <UnderlineTabs tabs={TABS} value={rarity} onChange={setRarity} layout="fixed" />

      <div className={styles.grid}>
        {list.map((c) => (
          <article key={c.name} className={`${styles.card} ${c.found ? '' : styles.locked}`} aria-label={c.found ? c.name : `${c.name} (미발견)`}>
            <span className={styles.photoWrap}>
              {c.img ? <img className={styles.photo} src={c.img} alt={c.found ? c.name : ''} /> : <span className={styles.photo} />}
              {!c.found && <img className={styles.lock} src={iconLock} width={48} height={48} alt="" />}
            </span>
            <div className={styles.info}>
              <h3 className={styles.name}>{c.name}</h3>
              <div className={styles.meta}>
                <span className={`${styles.badge} ${BADGE[c.rarity]}`}>{c.rarity}</span>
                <span className={styles.spacer} />
                <span className={styles.date}>{c.date}</span>
              </div>
            </div>
          </article>
        ))}
        {list.length === 0 && <p className={styles.empty}>검색 결과가 없어요</p>}
      </div>
    </ExploreSub>
  )
}
