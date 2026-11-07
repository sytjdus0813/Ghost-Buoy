import { useLayoutEffect, useState, type RefObject } from 'react'

/** 이보다 더 줄여야 하면 글자가 너무 작아지므로 축소 대신 스크롤 */
const MIN_SCALE = 0.7

/**
 * 모바일 화면 맞춤: Figma 프레임(852) 안에 들어가도록 디자인된 내용은
 * 실제 화면이 더 짧을 때 비율 그대로 줄여서 스크롤 없이 보여 줌.
 * 프레임보다 원래 긴 내용(designHeight 초과)은 그대로 스크롤.
 *
 * @param box     스크롤 영역 (clientHeight - padding = 실제로 쓸 수 있는 높이)
 * @param content 내용 (transform은 레이아웃 크기에 영향이 없어 측정값이 흔들리지 않음)
 * @param designHeight Figma 프레임에서 이 내용에 주어진 높이 (함수면 측정 시점에 계산)
 */
export function useFitScale(
  box: RefObject<HTMLElement | null>,
  content: RefObject<HTMLElement | null>,
  designHeight: number | (() => number),
) {
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const b = box.current
    const c = content.current
    if (!b || !c) return
    const measure = () => {
      const cs = getComputedStyle(b)
      const avail = b.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom)
      const h = c.offsetHeight
      const design = typeof designHeight === 'function' ? designHeight() : designHeight
      const fitsFrame = h <= design + 1
      const s = fitsFrame && avail < h ? avail / h : 1
      setScale(s >= MIN_SCALE ? s : 1)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(b)
    ro.observe(c)
    return () => ro.disconnect()
  })

  return scale
}

/** 축소 중일 때 내용에 줄 스타일 (위쪽 가운데 기준) */
export const fitStyle = (scale: number) =>
  scale < 1 ? { transform: `scale(${scale})`, transformOrigin: 'top center' } : undefined
