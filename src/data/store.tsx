import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Device, DiveType, Session } from './types'
import { BEST_SCENES, MOCK_DEVICES, MOCK_SESSIONS } from './mock'
import defaultCover from '../assets/log/session-1.png'

/**
 * 앱 상태 (PRD 6장): 목업 JSON으로 시작하고,
 * 세션 추가 같은 변경 사항은 localStorage에 보관해 새로고침해도 유지.
 * 이미지 주소는 빌드마다 바뀌므로 저장하지 않고, 읽을 때 기본 이미지를 채운다.
 */
const KEY_SESSIONS = 'ghostbuoy.sessions.added.v2'
const KEY_ACTIVE = 'ghostbuoy.activeSession'

export type ActiveSession = {
  startedAt: number
  type: DiveType
  location: string
}

export type ManualLog = {
  name: string
  type: DiveType
  date: string // yyyy-mm-dd
  time: string // hh:mm
  minutes: number
  maxDepth: number
  memo: string
}

type Store = {
  sessions: Session[]
  devices: Device[]
  active: ActiveSession | null
  startSession: () => void
  endSession: () => Session | null
  addManualSession: (log: ManualLog) => Session
  toggleDevice: (id: string) => void
}

type StoredSession = Omit<Session, 'cover' | 'media'>

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* 저장소를 못 쓰는 환경(사생활 보호 모드 등)에서는 메모리에만 유지 */
  }
}

const withImages = (s: StoredSession): Session => ({ ...s, cover: defaultCover, media: s.auto ? BEST_SCENES : [] })
const strip = ({ cover: _c, media: _m, ...rest }: Session): StoredSession => rest

const shortDate = (d: Date) => `${d.getMonth() + 1}월 ${d.getDate()}일`

const Ctx = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [added, setAdded] = useState<Session[]>(() => read<StoredSession[]>(KEY_SESSIONS, []).map(withImages))
  const [active, setActive] = useState<ActiveSession | null>(() => read(KEY_ACTIVE, null))
  const [devices, setDevices] = useState<Device[]>(MOCK_DEVICES)

  useEffect(() => write(KEY_SESSIONS, added.map(strip)), [added])
  useEffect(() => write(KEY_ACTIVE, active), [active])

  const sessions = useMemo(
    () => [...added, ...MOCK_SESSIONS].sort((a, b) => b.date.localeCompare(a.date)),
    [added],
  )

  const startSession = useCallback(() => {
    setActive((cur) => cur ?? { startedAt: Date.now(), type: 'free', location: '제주특별자치도 월령포구' })
  }, [])

  /** PRD 5.6: '다이빙 종료' → 새 세션이 로그에 추가됨 */
  const endSession = useCallback(() => {
    if (!active) return null
    const now = new Date()
    const seconds = Math.max(1, Math.round((Date.now() - active.startedAt) / 1000))
    const prev = sessions.find((s) => s.type === active.type)?.dives[0]
    const maxDepth = prev ? +(prev.maxDepth + 2).toFixed(1) : 20 // 시뮬레이션: 지난 고스트보다 2m 더 (PRD 대표 시나리오)
    const session: Session = withImages({
      id: `s-${now.getTime()}`,
      date: now.toISOString(),
      location: '제주 · 월령포구',
      spot: '제주도 월령포구',
      shortLocation: '제주 월령포구',
      shortDate: shortDate(now),
      type: active.type,
      waterTemp: 21,
      buddies: ['우수민'],
      dives: [
        {
          maxDepth,
          duration: seconds,
          ghostDepth: prev?.maxDepth ?? maxDepth,
          ghostDuration: prev?.duration ?? seconds,
          isRecord: !!prev && maxDepth > prev.maxDepth,
        },
      ],
      totalDuration: seconds,
      creatures: [],
      auto: true,
    })
    setAdded((list) => [session, ...list])
    setActive(null)
    return session
  }, [active, sessions])

  /** log-detail-self: 직접 작성한 로그 저장 */
  const addManualSession = useCallback((log: ManualLog) => {
    const d = new Date(`${log.date}T${log.time || '09:00'}:00`)
    const date = Number.isNaN(d.getTime()) ? new Date() : d
    const name = log.name.trim() || '이름 없는 다이빙'
    const session: Session = withImages({
      id: `m-${Date.now()}`,
      date: date.toISOString(),
      location: name,
      spot: name,
      shortLocation: name,
      shortDate: shortDate(date),
      type: log.type,
      waterTemp: 0,
      buddies: [],
      dives: [{ maxDepth: log.maxDepth, duration: log.minutes * 60, ghostDepth: log.maxDepth, ghostDuration: log.minutes * 60, isRecord: false }],
      totalDuration: log.minutes * 60,
      creatures: [],
      auto: false,
      memo: log.memo,
    })
    setAdded((list) => [session, ...list])
    return session
  }, [])

  const toggleDevice = useCallback((id: string) => {
    setDevices((list) => list.map((d) => (d.id === id ? { ...d, connected: !d.connected } : d)))
  }, [])

  const value = useMemo(
    () => ({ sessions, devices, active, startSession, endSession, addManualSession, toggleDevice }),
    [sessions, devices, active, startSession, endSession, addManualSession, toggleDevice],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}

/** 목록용 시간 표기: 42분 / 3분 12초 */
export function formatDuration(sec: number) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  if (m >= 60) return `${Math.floor(m / 60)}시간 ${m % 60}분`
  return s && m < 10 ? `${m}분 ${s}초` : `${m}분`
}
