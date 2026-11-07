import { useState } from 'react'
import { Link } from 'react-router-dom'
import AppScreen from '../../components/layout/AppScreen'
import { HeaderInto } from '../../components/layout/Header'
import ring from '../../assets/community/profile-ring.svg'
import photo from '../../assets/community/profile-photo.png'
import iconAddBuddy from '../../assets/community/icon-add-buddy.svg'
import iconPlay from '../../assets/community/icon-play-sm.svg'
import iconMulti from '../../assets/community/icon-multi.svg'
// 피드 그리드: Figma가 다른 화면과 같은 이미지 에셋을 재사용
import post0 from '../../assets/community/following-post.png'
import post1 from '../../assets/community/group-3.png'
import post2 from '../../assets/mission/point-munseom.png'
import post3 from '../../assets/save/turtle.png'
import post4 from '../../assets/save/nudibranch.png'
import post5 from '../../assets/community/upload-1.png'
import post6 from '../../assets/community/upload-2.png'
import post7 from '../../assets/community/feed-manta.png'
import post8 from '../../assets/community/upload-3.png'
import styles from './ExploreProfile.module.css'

const POSTS: Array<{ img: string; replay?: boolean; multi?: boolean }> = [
  { img: post0, replay: true },
  { img: post1, multi: true },
  { img: post2 },
  { img: post3 },
  { img: post4 },
  { img: post5, multi: true },
  { img: post6 },
  { img: post7 },
  { img: post8 },
]

const TABS = ['피드', '다이빙 로그', '도감'] as const

/** Figma: explore/profile (39:16797) */
export default function ExploreProfile() {
  const [tab, setTab] = useState<(typeof TABS)[number]>('피드')
  const [followed, setFollowed] = useState(false)

  return (
    <AppScreen header={<HeaderInto title="내 프로필" backTo="/explore/community" />} gap={12}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.avatar}>
            <img className={styles.ring} src={ring} width={92} height={92} alt="" />
            <img className={styles.photo} src={photo} width={80} height={80} alt="프로필 사진" />
            <span className={styles.lv}>Lv.5</span>
          </div>
          <div className={styles.follow}>
            <span>
              <b>48</b>게시물
            </span>
            <span>
              <b>{followed ? 313 : 312}</b>팔로워
            </span>
            <span>
              <b>190</b>팔로잉
            </span>
          </div>
        </div>

        <div className={styles.bio}>
          <b>바다탐험가</b>
          <small>@sea_explorer · 서울 다이버 모임</small>
          <p>주말마다 제주 바다로 가요. 프리다이빙 AIDA 2, 거북이 기록 수집 중</p>
        </div>

        <div className={styles.summary}>
          <span className={styles.sum}>
            <span>
              <b>52</b>
              <small>회</small>
            </span>
            총 다이빙
          </span>
          <i />
          <span className={styles.sum}>
            <span>
              <b>32.4</b>
              <small>m</small>
            </span>
            최대 수심
          </span>
          <i />
          <span className={styles.sum}>
            <span>
              <b>23</b>
              <small>종</small>
            </span>
            발견한 생물
          </span>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.primary} onClick={() => setFollowed((v) => !v)}>
            {followed ? '팔로잉' : '팔로우'}
          </button>
          <button type="button" className={styles.secondary}>
            메시지
          </button>
          <button type="button" className={styles.buddy} aria-label="버디 추가">
            <img src={iconAddBuddy} width={20} height={20} alt="" />
          </button>
        </div>

        <div className={styles.tabs} role="tablist">
          {TABS.map((t) => (
            <button key={t} type="button" role="tab" aria-selected={tab === t} className={tab === t ? styles.tabOn : styles.tab} onClick={() => setTab(t)}>
              {t}
              <span className={styles.underline} />
            </button>
          ))}
        </div>

        {tab === '피드' && (
          <div className={styles.grid}>
            {POSTS.map((p, i) => (
              <div key={i} className={styles.post}>
                <img src={p.img} alt="" />
                {p.replay && (
                  <span className={styles.replay}>
                    <img src={iconPlay} width={8} height={8} alt="" />
                    Ghost Replay
                  </span>
                )}
                {p.multi && <img className={styles.multi} src={iconMulti} width={16} height={16} alt="여러 장" />}
              </div>
            ))}
          </div>
        )}
        {/* ⚠️ 다이빙 로그·도감 탭 화면은 Figma에 없음 → 기존 화면으로 연결 */}
        {tab === '다이빙 로그' && (
          <Link className={styles.more} to="/log">
            다이빙 로그 전체 보기
          </Link>
        )}
        {tab === '도감' && (
          <Link className={styles.more} to="/explore/save">
            생물 도감 보기
          </Link>
        )}
      </div>
    </AppScreen>
  )
}
