import { useRef, type ReactNode } from 'react'
import { fitStyle, useFitScale } from './useFitScale'

const FRAME_H = 852

/** 헤더·navbar 없이 프레임 전체를 쓰는 화면(로그인, 설정)용 모바일 화면 맞춤 */
export default function FitScreen({ children }: { children: ReactNode }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const scale = useFitScale(boxRef, innerRef, FRAME_H)
  return (
    <div ref={boxRef} style={{ height: '100%', overflowY: scale < 1 ? 'hidden' : 'auto' }}>
      <div ref={innerRef} className="page-enter" style={fitStyle(scale)}>
        {children}
      </div>
    </div>
  )
}
