import { useEffect, useState } from 'react'
import iconFollow from '../../assets/mission/icon-follow.svg'
import iconObserve from '../../assets/mission/icon-observe.svg'
import iconFilm from '../../assets/mission/icon-film.svg'
import iconScan from '../../assets/mission/icon-scan.svg'

export const MODES = [
  { id: 'follow', icon: iconFollow, title: '동행 모드', desc: '다이버를 따라 함께 이동' },
  { id: 'observe', icon: iconObserve, title: '관찰 모드', desc: '해양생물·환경 관찰 기록' },
  { id: 'film', icon: iconFilm, title: '촬영 모드', desc: '다이빙 장면 자동 촬영' },
  { id: 'scan', icon: iconScan, title: '지형 스캔', desc: '해저 지형 지도 데이터 생성' },
] as const

export type ModeId = (typeof MODES)[number]['id']

const KEY = 'ghostbuoy.missionMode'

/** 선택한 미션 모드 (브라우저에 기억) */
export function useMissionMode() {
  const [mode, setMode] = useState<ModeId>(() => {
    try {
      return (localStorage.getItem(KEY) as ModeId) || 'follow'
    } catch {
      return 'follow'
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(KEY, mode)
    } catch {
      /* 무시 */
    }
  }, [mode])
  return [mode, setMode] as const
}
