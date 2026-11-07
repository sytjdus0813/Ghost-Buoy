import { useState } from 'react'
import CommunityShell from '../../components/explore/CommunityShell'
import avatar from '../../assets/community/avatar.png'
import feedTurtle from '../../assets/community/feed-turtle.png'
import feedManta from '../../assets/community/feed-manta.png'
import iconLike from '../../assets/community/icon-like.svg'
import iconComment from '../../assets/community/icon-comment.svg'
import iconShare from '../../assets/community/icon-share.svg'
import styles from './CommunityPopular.module.css'

const FEED = [
  {
    author: '바다탐험가',
    meta: '서울 다이버 모임 · 19분 전',
    tag: 'follow' as const,
    title: '제주 바다에서 신기한 물고기 봤는데 이거 뭔가요?',
    body: '오늘 제주도 처음 가봤는데 신기한 걸 봤네요. 가보신 분들 계시나요?',
    img: feedTurtle,
  },
  {
    author: '태국 러버',
    meta: '서울 다이버 모임 · 19분 전',
    tag: 'question' as const,
    title: '태국에서 만타가오리 드디어 봤어요',
    body: '지난번에 태국갔을때는 못봐서 아쉬웠는데 이번데 드디어 실물 영접했어요 ㅠㅠㅠ 너무 감동...',
    img: feedManta,
  },
]

/** Figma: explore/community-1 (39:15475) — 피드 카드 (하위 탭 '인기') */
export default function CommunityPopular() {
  const [followed, setFollowed] = useState(false)
  return (
    <CommunityShell>
      {FEED.map((p) => (
        <article key={p.title} className={styles.card}>
          <header className={styles.author}>
            <img className={styles.avatar} src={avatar} width={36} height={36} alt="" />
            <span className={styles.who}>
              <b>{p.author}</b>
              <small>{p.meta}</small>
            </span>
            {p.tag === 'follow' ? (
              <button type="button" className={styles.follow} onClick={() => setFollowed((v) => !v)}>
                {followed ? '팔로잉' : '팔로우하기'}
              </button>
            ) : (
              <span className={styles.question}>질문</span>
            )}
          </header>
          <h3 className={styles.title}>{p.title}</h3>
          <p className={styles.body}>{p.body}</p>
          <img className={styles.image} src={p.img} alt="" />
          <footer className={styles.actions}>
            <span>
              <img src={iconLike} width={18} height={18} alt="좋아요" />
              24
            </span>
            <span>
              <img src={iconComment} width={18} height={18} alt="댓글" />8
            </span>
            <span>
              <img src={iconShare} width={18} height={18} alt="" />
              공유
            </span>
          </footer>
        </article>
      ))}
    </CommunityShell>
  )
}
