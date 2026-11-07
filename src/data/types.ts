// PRD 6장 데이터 모델 (+ 화면 표시에 필요한 필드)

export type DiveType = 'free' | 'scuba'

export type Dive = {
  maxDepth: number // m
  duration: number // 초
  ghostDepth: number
  ghostDuration: number
  isRecord: boolean
}

export type Session = {
  id: string
  date: string // ISO
  /** 목록 제목 (예: 제주 서귀포 · 문섬) */
  location: string
  /** 상세 화면 제목 (예: 제주도 문섬) */
  spot: string
  shortLocation: string // 홈 카드용 (예: 제주 서귀포)
  shortDate: string // 홈 카드용 (예: 10월 16일)
  type: DiveType
  waterTemp: number
  buddies: string[]
  dives: Dive[]
  totalDuration: number // 초
  creatures: string[]
  /** 대표 이미지 (목록 썸네일, 상세 히어로) */
  cover: string
  /** 드론 촬영 미디어 (베스트 씬) */
  media: string[]
  /** 다이브 컴퓨터에서 자동으로 불러온 기록인지 */
  auto: boolean
  memo?: string
}

export type DeviceType = 'goggle' | 'buoy' | 'drone' | 'computer'

export type Device = {
  id: string
  type: DeviceType
  name: string
  connected: boolean
  battery: number
  docked?: boolean
  lastUsed?: string
}

export type Creature = {
  id: string
  name: string
  image?: string
  firstSeenDate: string
  location: string
}

export type Quest = {
  id: string
  title: string
  target: number
  progress: number
}

export type User = {
  id: string
  name: string
  diveType: DiveType
  buddies: string[]
}
