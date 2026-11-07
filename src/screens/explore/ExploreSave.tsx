import { useMemo, useState } from 'react'
import ExploreSub from '../../components/explore/ExploreSub'
import SearchBar from '../../components/SearchBar'
import UnderlineTabs from '../../components/UnderlineTabs'
import turtle from '../../assets/save/turtle.png'
import nudibranch from '../../assets/save/nudibranch.png'
import starfish from '../../assets/save/starfish.png'
import lionfish from '../../assets/save/lionfish.png'
import styles from './ExploreSave.module.css'

type Rarity = '매우 희귀' | '희귀' | '보통' | '흔함'

// 배지 색은 Figma 카드별 값 그대로 (희귀 배지의 글자색이 카드마다 다름)
const CREATURES: Array<{ name: string; img: string; rarity: Rarity; date: string; badge: string }> = [
  { name: '푸른바다거북', img: turtle, rarity: '매우 희귀', date: '10.16', badge: styles.veryRare },
  { name: '갯민숭달팽이', img: nudibranch, rarity: '희귀', date: '10.16', badge: styles.rareLight },
  { name: '빨강불가사리', img: starfish, rarity: '흔함', date: '10.16', badge: styles.common },
  { name: '쏠배감펭', img: lionfish, rarity: '희귀', date: '10.16', badge: styles.rare },
]

const TABS = ['매우 희귀', '희귀', '보통', '흔함'].map((label) => ({ label }))

/** Figma: explore/save (39:15630) — 생물 도감 */
export default function ExploreSave() {
  const [query, setQuery] = useState('')
  const [rarity, setRarity] = useState<string>('매우 희귀')

  // ⚠️ Figma는 '매우 희귀' 탭에서도 4종을 모두 보여줌 → 탭은 정렬 기준(선택한 등급 먼저)으로 사용
  const list = useMemo(() => {
    const q = query.trim()
    return CREATURES.filter((c) => !q || c.name.includes(q)).sort(
      (a, b) => Number(b.rarity === rarity) - Number(a.rarity === rarity),
    )
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
          <article key={c.name} className={styles.card}>
            <img className={styles.photo} src={c.img} alt={c.name} />
            <div className={styles.info}>
              <h3 className={styles.name}>{c.name}</h3>
              <div className={styles.meta}>
                <span className={`${styles.badge} ${c.badge}`}>{c.rarity}</span>
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
