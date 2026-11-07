import { useState } from 'react'
import CommunityShell from '../../components/explore/CommunityShell'
import diver1 from '../../assets/community/diver-1.png'
import diver2 from '../../assets/community/diver-2.png'
import diver3 from '../../assets/community/diver-3.png'
import diver4 from '../../assets/community/diver-4.png'
import avatar from '../../assets/community/avatar.png'
import postImg from '../../assets/community/following-post.png'
import chipDot from '../../assets/community/chip-dot.svg'
import styles from './CommunityFollowing.module.css'

const DIVERS = [
  { name: '물빛다이버', group: '제주 프리다이빙', note: '공통 모임 2', img: diver1 },
  { name: '거북이친구', group: '양양 바다친구들', note: '함께 다이빙 1회', img: diver2 },
  { name: '심해산책', group: '서울 다이버 모임', note: '공통 모임 1', img: diver3 },
  { name: '누디홀릭', group: '잠실 모이자', note: '도감 12종 일치', img: diver4 },
]

/** Figma: explore/community-following (39:16709) — 추천 다이버 + 팔로잉 피드 */
export default function CommunityFollowing() {
  const [following, setFollowing] = useState<string[]>([])
  const toggle = (n: string) => setFollowing((f) => (f.includes(n) ? f.filter((x) => x !== n) : [...f, n]))

  return (
    <CommunityShell>
      <div className={styles.head}>
        <h2>추천 다이버</h2>
        <span>{'전체보기 >'}</span>
      </div>

      <div className={styles.divers}>
        {DIVERS.map((d) => (
          <div key={d.name} className={styles.diver}>
            <span className={styles.avatar}>
              <img src={d.img} width={66} height={66} alt="" />
            </span>
            <span className={styles.gap4} />
            <b className={styles.name}>{d.name}</b>
            <span className={styles.group}>{d.group}</span>
            <span className={styles.note}>{d.note}</span>
            <span className={styles.gap6} />
            <button type="button" className={styles.follow} onClick={() => toggle(d.name)} aria-pressed={following.includes(d.name)}>
              {following.includes(d.name) ? '팔로잉' : '팔로우'}
            </button>
          </div>
        ))}
      </div>

      <article className={styles.post}>
        <header className={styles.author}>
          <img src={avatar} width={36} height={36} alt="" />
          <span className={styles.who}>
            <b>물빛다이버</b>
            <small>제주 문섬 · 1시간 전</small>
          </span>
          <span className={styles.tag}>팔로잉</span>
        </header>
        <div className={styles.image}>
          <img src={postImg} alt="" />
          <span className={styles.shade} />
          <span className={styles.logChip}>
            <img src={chipDot} width={7} height={7} alt="" />
            다이빙 로그 · 최대 18.2m · 45분
          </span>
        </div>
        <p className={styles.text}>오늘 문섬에서 거북이랑 같이 헤엄쳤어요. 고스트 리플레이로 다시 보니까 더 신기하네요</p>
      </article>
    </CommunityShell>
  )
}
