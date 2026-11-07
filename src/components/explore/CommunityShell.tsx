import type { ReactNode } from 'react'
import ExploreSub from './ExploreSub'
import SearchBar from '../SearchBar'
import SectionTitle from '../SectionTitle'
import UnderlineTabs from '../UnderlineTabs'
import group1 from '../../assets/community/group-1.png'
import group2 from '../../assets/community/group-2.png'
import group3 from '../../assets/community/group-3.png'
import iconWrite from '../../assets/community/icon-write.svg'
import styles from './CommunityShell.module.css'

const GROUPS = [
  { name: '서울 다이버 모임', img: group1 },
  { name: '제주 프리다이빙', img: group2 },
  { name: '양양 바다친구들', img: group3 },
  { name: '잠실 모이자', img: group2 },
  { name: '서울 프리', img: group1 },
]

// Figma 세 화면 모두 '팔로잉'에 밑줄 → 실제 앱에서는 현재 화면 탭에 밑줄
const TABS = [
  { label: '내 프로필', to: '/explore/profile' },
  { label: '팔로잉', to: '/explore/community/following' },
  { label: '인기', to: '/explore/community' },
  { label: '최근', to: '/explore/community/recent' },
  { label: '포인트 후기', to: '/explore/community/review' },
]

/** 커뮤니티 공통: 검색 → 내 모임 → 하위 탭 → 본문, 글쓰기 버튼 (explore/community-*) */
export default function CommunityShell({ children }: { children: ReactNode }) {
  return (
    <ExploreSub
      title="커뮤니티"
      gap={16}
      overlay={
        <button type="button" className={styles.write} aria-label="글쓰기">
          <img src={iconWrite} width={32} height={32} alt="" />
        </button>
      }
    >
      <SearchBar placeholder="오늘 제주도 모임을 검색해보세요" />
      <SectionTitle title="내 모임" moreTo="/explore/community" />
      <div className={styles.groups}>
        {GROUPS.map((g) => (
          <div key={g.name} className={styles.group}>
            <img src={g.img} alt="" />
            <span>{g.name}</span>
          </div>
        ))}
      </div>
      <UnderlineTabs tabs={TABS} />
      {children}
    </ExploreSub>
  )
}
