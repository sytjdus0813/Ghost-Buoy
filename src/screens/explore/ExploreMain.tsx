import { Link } from 'react-router-dom'
import AppScreen from '../../components/layout/AppScreen'
import { Header } from '../../components/layout/Header'
import { ExploreTop } from '../../components/explore/ExploreSub'
import SectionTitle from '../../components/SectionTitle'
import mapHero from '../../assets/explore/map-hero.png'
import mapRoute from '../../assets/explore/map-route.svg'
import pinCyan from '../../assets/explore/pin-cyan.svg'
import pinLime from '../../assets/explore/pin-lime.svg'
import iconArrow from '../../assets/explore/icon-arrow-up-right.svg'
import iconHeart from '../../assets/explore/icon-heart.svg'
import iconComment from '../../assets/explore/icon-comment.svg'
import post1 from '../../assets/explore/post-1.png'
import post2 from '../../assets/explore/post-2.png'
import post3 from '../../assets/explore/post-3.png'
import styles from './ExploreMain.module.css'

const POSTS = [
  { img: post1, title: '제주 바다에서 신기한 물고기 봤는데 이거 뭔가요?', meta: '제주 · 2시간 전', likes: 24, comments: 8 },
  { img: post2, title: '양양 수심 18m에서 만난 빨간 불가사리', meta: '양양 · 5시간 전', likes: 61, comments: 12 },
  { img: post3, title: '쏠배감펭 근처에선 이렇게 피하세요', meta: '포인트 팁 · 1일 전', likes: 132, comments: 27 },
]

/** Figma: explore/main (39:15399) */
export default function ExploreMain() {
  return (
    <AppScreen header={<ExploreTop header={<Header />} />}>
      <div className={styles.content}>

        <div className={styles.cards}>
          <Link to="/explore/community" className={styles.schedule}>
            <span className={styles.cardLabel}>내 일정</span>
            <span className={styles.cardTitle}>10/27 강릉 다이브</span>
            <span className={styles.cardSub}>참가 3/4명 · D-3</span>
          </Link>
          <div className={styles.ship}>
            <span className={`${styles.cardLabel} ${styles.point}`}>장비 배송</span>
            <span className={`${styles.cardTitle} ${styles.black}`}>미리 보내기</span>
            <span className={`${styles.cardSub} ${styles.muted}`}>포인트 근처 숍으로</span>
          </div>
        </div>

        <MapHero />

        <SectionTitle title="커뮤니티" moreTo="/explore/community" />

        <ul className={styles.community}>
          {POSTS.map((p) => (
            <li key={p.title}>
              <Link to="/explore/community" className={styles.post}>
                <img className={styles.thumb} src={p.img} alt="" />
                <span className={styles.postText}>
                  <span className={styles.postTitle}>{p.title}</span>
                  <span className={styles.meta}>
                    <span>{p.meta}</span>
                    <span className={styles.metaGap} />
                    <img src={iconHeart} width={14} height={14} alt="좋아요" />
                    <span className={styles.metaNum}>{p.likes}</span>
                    <img src={iconComment} width={14} height={14} alt="댓글" />
                    <span className={styles.metaNum}>{p.comments}</span>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </AppScreen>
  )
}

/** Figma: map-hero (39:15411) — 해저 지도 미리보기 카드 */
export function MapHero() {
  return (
    <div className={styles.map}>
      <div className={styles.mapBg} aria-hidden>
        <img className={styles.mapImg} src={mapHero} alt="" />
        <div className={styles.mapGlow} />
      </div>
      <img className={styles.route} src={mapRoute} width={361} height={232} alt="" />
      <span className={styles.pin} style={{ left: 23, top: 99 }}>
        <img src={pinCyan} width={12} height={12} alt="" />
        기사문항 · 8m
      </span>
      <span className={styles.pin} style={{ left: 194, top: 17 }}>
        <img src={pinLime} width={12} height={12} alt="" />
        양양 서피비치 · 12m
      </span>
      <Link to="/explore/map" className={styles.mapInfo}>
        <span className={styles.mapText}>
          <span className={styles.mapTitle}>해저 지도 · 양양 연안</span>
          <span className={styles.mapSub}>확인된 지형 128 · 저장 포인트 12</span>
        </span>
        <span className={styles.mapBtn}>
          <img src={iconArrow} width={18} height={18} alt="" />
        </span>
      </Link>
    </div>
  )
}
