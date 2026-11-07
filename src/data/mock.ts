import type { Device, Session } from './types'
import cover1 from '../assets/log/session-1.png'
import cover2 from '../assets/log/session-2.png'
import replayHero from '../assets/community/group-2.png'
import scene1 from '../assets/community/group-3.png'
import scene2 from '../assets/mission/point-munseom.png'
import scene3 from '../assets/save/nudibranch.png'

// 목업 데이터 — 화면에 보이는 값은 Figma 디자인의 텍스트와 맞춤 (log/main 지난 기록)

/** 베스트 씬 (Figma log-detail-auto 순서 그대로) */
export const BEST_SCENES = [scene1, scene1, scene2, scene3, scene2, scene3]
export const REPLAY_HERO = replayHero

export const MOCK_SESSIONS: Session[] = [
  {
    id: 's-1016',
    date: '2026-10-16T08:50:00+09:00',
    location: '제주 서귀포 · 문섬',
    spot: '제주도 문섬',
    shortLocation: '제주 서귀포',
    shortDate: '10월 16일',
    type: 'free',
    waterTemp: 22,
    buddies: ['우수민', '박서연', '물빛다이버', '거북이친구', '심해산책', '누디홀릭'],
    dives: [{ maxDepth: 18.2, duration: 95, ghostDepth: 16.2, ghostDuration: 88, isRecord: true }],
    totalDuration: 42 * 60,
    creatures: ['푸른바다거북', '갯민숭달팽이'],
    cover: cover1,
    media: BEST_SCENES,
    auto: true,
  },
  {
    id: 's-1003',
    date: '2026-10-03T10:20:00+09:00',
    location: '양양 기사문항',
    spot: '양양 기사문항',
    shortLocation: '양양 기사문항',
    shortDate: '10월 3일',
    type: 'free',
    waterTemp: 19,
    buddies: ['우수민', '박서연'],
    dives: [{ maxDepth: 16.2, duration: 88, ghostDepth: 15, ghostDuration: 80, isRecord: false }],
    totalDuration: 3 * 60 + 12,
    creatures: ['빨강불가사리'],
    cover: cover2,
    media: BEST_SCENES.slice(2),
    auto: true,
  },
]

export const MOCK_DEVICES: Device[] = [
  { id: 'buoy', type: 'buoy', name: 'Ghost Buoy #0813', connected: true, battery: 82 },
  { id: 'goggle', type: 'goggle', name: 'AR Goggle', connected: true, battery: 64 },
  { id: 'drone-1', type: 'drone', name: 'botA', connected: true, battery: 85, docked: false },
  { id: 'drone-2', type: 'drone', name: 'botB', connected: true, battery: 72, docked: true },
  { id: 'drone-3', type: 'drone', name: 'botC', connected: true, battery: 41, docked: true },
  { id: 'computer', type: 'computer', name: 'Dive Computer', connected: true, battery: 90 },
]
