import { Link } from 'react-router-dom'
import ExploreSub from '../../components/explore/ExploreSub'
import SectionTitle from '../../components/SectionTitle'
import ModeCard from '../../components/explore/ModeCard'
import { useMissionMode, MODES } from './missionMode'
import cardTurtle from '../../assets/mission/card-turtle.png'
import cardBuddy from '../../assets/mission/card-buddy.png'
import cardDepth from '../../assets/mission/card-depth.png'
import pointMunseom from '../../assets/mission/point-munseom.png'
import pointBeomseom from '../../assets/mission/point-beomseom.png'
import star1 from '../../assets/mission/star-1.svg'
import star2 from '../../assets/mission/star-2.svg'
import star3 from '../../assets/mission/star-3.svg'
import star4 from '../../assets/mission/star-4.svg'
import star5 from '../../assets/mission/star-5.svg'
import star6 from '../../assets/mission/star-6.svg'
import star7 from '../../assets/mission/star-7.svg'
import styles from './ExploreMission.module.css'

// 별 에셋 조합은 Figma 인스턴스 그대로 (두 번째 카드는 Figma에도 별이 4개)
const MISSIONS = [
  { img: cardTurtle, tag: '생물 관찰', title: ['푸른바다거북', '발견하기'], stars: [star1, star2, star3, star4, star5], cropped: true },
  { img: cardBuddy, tag: '게임', title: ['AI 버디 기록과', '경쟁하기'], stars: [star1, star2, star4, star5] },
  { img: cardDepth, tag: '기록 돌파', title: ['수심 80M 돌파하기'], stars: [star1, star2, star3, star6, star7] },
]

const POINTS = [
  { img: pointMunseom, name: '제주 문섬 다이빙 포인트', desc: '다양한 수중 경관 · 기록하기 좋은 포인트', rate: '87%' },
  { img: pointBeomseom, name: '제주 범섬 포인트', desc: '바다거북 출현 확률 높음', rate: '81%' },
]

/** Figma: explore/mission (39:15592) */
export default function ExploreMission() {
  const [mode] = useMissionMode()
  const current = MODES.find((m) => m.id === mode) ?? MODES[0]

  return (
    <ExploreSub title="미션">
      <SectionTitle title="미션 관리" moreTo="/explore/mission/detail" />
      <Link to="/explore/mission/detail" className={styles.modeLink}>
        <ModeCard icon={current.icon} title="미션 모드와 난이도를 변경해요" desc={`현재 ${current.title}`} selected />
      </Link>

      <SectionTitle title="추천 미션" moreTo="/explore/mission" />
      <div className={styles.missions}>
        {MISSIONS.map((m) => (
          <div key={m.tag} className={styles.mission}>
            <div className={styles.missionBg} aria-hidden>
              <img className={m.cropped ? styles.cropped : styles.cover} src={m.img} alt="" />
            </div>
            <span className={styles.tag}>{m.tag}</span>
            <p className={styles.missionTitle}>
              {m.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <span className={styles.stars}>
              {m.stars.map((s, i) => (
                <img key={i} src={s} width={12.8} height={12.8} alt="" />
              ))}
            </span>
          </div>
        ))}
      </div>

      <SectionTitle title="추천 포인트" moreTo="/explore/map" />
      <ul className={styles.points}>
        {POINTS.map((p) => (
          <li key={p.name}>
            <Link to="/explore/map" className={styles.point}>
              <img className={styles.pointImg} src={p.img} alt="" />
              <span className={styles.pointText}>
                <span className={styles.pointName}>{p.name}</span>
                <span className={styles.pointDesc}>{p.desc}</span>
              </span>
              <span className={styles.rate}>{p.rate}</span>
            </Link>
          </li>
        ))}
      </ul>
    </ExploreSub>
  )
}
