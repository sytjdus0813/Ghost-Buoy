import { useState } from 'react'
import CommunityShell from '../../components/explore/CommunityShell'
import upload1 from '../../assets/community/upload-1.png'
import upload2 from '../../assets/community/upload-2.png'
import upload3 from '../../assets/community/upload-3.png'
import iconHeart from '../../assets/community/icon-heart-lg.svg'
import iconComment from '../../assets/community/icon-comment-lg.svg'
import iconBookmark from '../../assets/community/icon-bookmark.svg'
import styles from './CommunityRecent.module.css'

const POSTS = [
  { img: upload1, title: '제주바다에서 신기한 물고기 봤는데 이거 뭔가요?', body: '오늘 제주도 첨 가보는데 신기한거 봤네요. 가보신 분들 계시나요?' },
  { img: upload2, title: '이번주 강릉 날씨 어떤가요?', body: '10월에도 다이빙 할 수 있을까요?' },
  { img: upload3, title: '제주도 같이 가실 분 구해요', body: '안녕하세요 같이 제주도에서 다이빙 하실 분 구하고 있습니다. 초심자도 상관없어요.' },
]

/** Figma: explore/community-2 (39:15499) — 최근 글 목록 (하위 탭 '최근') */
export default function CommunityRecent() {
  const [saved, setSaved] = useState<string[]>([])
  return (
    <CommunityShell>
      <ul className={styles.list}>
        {POSTS.map((p) => (
          <li key={p.title} className={styles.item}>
            <img className={styles.thumb} src={p.img} alt="" />
            <p className={styles.title}>{p.title}</p>
            <p className={styles.body}>{p.body}</p>
            <img className={styles.heart} src={iconHeart} width={24} height={24} alt="좋아요" />
            <img className={styles.comment} src={iconComment} width={24} height={24} alt="댓글" />
            <span className={styles.time}>19분 전</span>
            <button
              type="button"
              className={styles.bookmark}
              aria-label="저장"
              aria-pressed={saved.includes(p.title)}
              onClick={() => setSaved((s) => (s.includes(p.title) ? s.filter((t) => t !== p.title) : [...s, p.title]))}
            >
              <img src={iconBookmark} width={24} height={24} alt="" />
            </button>
          </li>
        ))}
      </ul>
    </CommunityShell>
  )
}
