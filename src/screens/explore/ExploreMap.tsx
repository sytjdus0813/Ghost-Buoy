import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ExploreSub from '../../components/explore/ExploreSub'
import SectionTitle from '../../components/SectionTitle'
import mapCourse from '../../assets/explore/map-course.png'
import waves from '../../assets/explore/map-course-waves.svg'
import fish from '../../assets/explore/map-course-fish.svg'
import pinStart from '../../assets/explore/pin-lime-start.svg'
import iconPlay from '../../assets/explore/icon-play-dark.svg'
import iconBookmark from '../../assets/explore/icon-bookmark.svg'
import iconShare from '../../assets/explore/icon-share.svg'
import iconSort from '../../assets/explore/icon-chevron-sort.svg'
import styles from './ExploreMap.module.css'

/** Figma: explore/map (39:15525) — 현재 위치 추천 코스 */
export default function ExploreMap() {
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)

  async function share() {
    try {
      await navigator.share?.({ title: '제주 물고기 지형', text: 'Ghost Buoy 추천 코스' })
    } catch {
      /* 공유 취소 */
    }
  }

  return (
    <ExploreSub title="해저 지도">
      <div className={styles.titleWrap}>
        <SectionTitle title="현재 위치 추천 코스" moreTo="/explore/map" />
      </div>

      <div className={styles.map}>
        <div className={styles.mapBg} aria-hidden>
          <img className={styles.mapImg} src={mapCourse} alt="" />
          <div className={styles.mapGlow} />
        </div>
        <img className={styles.waves} src={waves} width={361} height={236} alt="" />
        <span className={styles.pin}>
          <img src={pinStart} width={12} height={12} alt="" />
          START
        </span>
        <img className={styles.fish} src={fish} width={315} height={157.5} alt="물고기 모양 코스" />
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.start} onClick={() => navigate('/home/session')}>
          <img src={iconPlay} width={20} height={20} alt="" />
          코스 시작하기
        </button>
        <button
          type="button"
          className={styles.round}
          aria-label="코스 저장"
          aria-pressed={saved}
          onClick={() => setSaved((v) => !v)}
        >
          <img src={iconBookmark} width={20} height={20} alt="" />
        </button>
        <button type="button" className={styles.round} aria-label="공유" onClick={share}>
          <img src={iconShare} width={20} height={20} alt="" />
        </button>
      </div>

      <div className={styles.course}>
        <h2 className={styles.courseTitle}>제주 물고기 지형</h2>
        <p className={styles.courseDesc}>예상 시야가 양호하고 수중 지형 탐험에 적합해요</p>
        <div className={styles.tags}>
          <span className={styles.tag}>수중 지형 탐험</span>
          <span className={styles.tag}>해양생물 관찰</span>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            <b>40</b>
            <small>분</small>
          </span>
          <span className={styles.statLabel}>소요 시간</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            <b>초급</b>
          </span>
          <span className={styles.statLabel}>난이도</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statValue}>
            <b>3</b>
            <small>m</small>
          </span>
          <span className={styles.statLabel}>평균 수심</span>
        </div>
      </div>

      <div className={styles.reviewHead}>
        <h2>코스 리뷰</h2>
        <span className={styles.spacer} />
        <span className={styles.sort}>최신순</span>
        <img src={iconSort} width={14} height={14} alt="" />
      </div>

      <div className={styles.review}>
        <div className={styles.score}>
          <span className={styles.scoreNum}>4.3</span>
          <span className={styles.stars} aria-label="별점 4점">★★★★☆</span>
        </div>
        <div className={styles.reviewText}>
          <span className={styles.reviewTitle}>초심자에게 추천하는 코스</span>
          <span className={styles.reviewDesc}>물고기 모양 지형이 선명하고 수심이 얕아 편해요 · 리뷰 34</span>
        </div>
      </div>
    </ExploreSub>
  )
}
