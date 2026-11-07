import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../data/store'
import type { DiveType } from '../../data/types'
import iconClose from '../../assets/log/icon-close.svg'
import iconPhoto from '../../assets/log/icon-photo.svg'
import iconVideo from '../../assets/log/icon-video.svg'
import iconPlus from '../../assets/log/icon-plus-sm.svg'
import styles from './LogWriteSheet.module.css'

/** Figma: log/log-detail-self (39:15960) — 직접 작성 시트. 항목 이름을 placeholder로 사용 */
export default function LogWriteSheet({ onClose }: { onClose: () => void }) {
  const navigate = useNavigate()
  const { sessions, addManualSession } = useStore()
  const [name, setName] = useState('')
  const [type, setType] = useState<DiveType | ''>('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [minutes, setMinutes] = useState('')
  const [depth, setDepth] = useState('')
  const [memo, setMemo] = useState('')
  const [photos, setPhotos] = useState<string[]>([])

  function submit(e: FormEvent) {
    e.preventDefault()
    const s = addManualSession({
      name,
      type: type || 'free',
      date: date || new Date().toISOString().slice(0, 10),
      time,
      minutes: Number(minutes) || 0,
      maxDepth: Number(depth) || 0,
      memo,
    })
    navigate(`/log/${s.id}`)
  }

  // 날짜/시각 입력은 비어 있을 때 Figma처럼 항목 이름이 보이도록 text → date/time 전환
  const swap = (kind: 'date' | 'time') => ({
    type: 'text' as string,
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => (e.target.type = kind),
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      if (!e.target.value) e.target.type = 'text'
    },
  })

  return (
    <div className={styles.dim} role="presentation">
      <form className={styles.sheet} role="dialog" aria-modal="true" aria-label="다이빙 로그 작성" onSubmit={submit}>
        <div className={styles.closeRow}>
          <button type="button" className={styles.close} aria-label="닫기" onClick={onClose}>
            <img src={iconClose} width={24} height={24} alt="" />
          </button>
        </div>

        <div className={styles.fields}>
          <input className={styles.row} placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
          <select className={`${styles.row} ${type ? '' : styles.placeholder}`} value={type} onChange={(e) => setType(e.target.value as DiveType)}>
            <option value="" disabled>
              유형
            </option>
            <option value="free">프리다이빙</option>
            <option value="scuba">스쿠버</option>
          </select>
          <input className={styles.row} placeholder="다이빙 번호" inputMode="numeric" defaultValue="" aria-label={`다이빙 번호 (비우면 ${sessions.length + 51}번)`} />
          <input className={styles.row} placeholder="날짜" value={date} onChange={(e) => setDate(e.target.value)} {...swap('date')} />
          <input className={styles.row} placeholder="현재 시각" value={time} onChange={(e) => setTime(e.target.value)} {...swap('time')} />
          <input className={styles.row} placeholder="다이빙 시간" inputMode="numeric" value={minutes} onChange={(e) => setMinutes(e.target.value.replace(/\D/g, ''))} />
          <input className={styles.row} placeholder="최대 수심" inputMode="decimal" value={depth} onChange={(e) => setDepth(e.target.value.replace(/[^\d.]/g, ''))} />
          <label className={styles.memoLabel} htmlFor="memo">
            메모
          </label>
          <textarea id="memo" className={`${styles.row} ${styles.memo}`} placeholder="진행 상황에 대해 작성해주세요." value={memo} onChange={(e) => setMemo(e.target.value)} rows={1} />

          <label className={styles.media}>
            <span>
              <img src={iconPhoto} width={24} height={24} alt="" />
              사진 추가{photos.length ? ` (${photos.length})` : ''}
            </span>
            <img src={iconPlus} width={24} height={24} alt="" />
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => setPhotos(Array.from(e.target.files ?? []).map((f) => f.name))}
            />
          </label>
          <label className={styles.media}>
            <span>
              <img src={iconVideo} width={24} height={24} alt="" />
              동영상 추가
            </span>
            <img src={iconPlus} width={24} height={24} alt="" />
            <input type="file" accept="video/*" hidden />
          </label>
        </div>

        <div className={styles.buttons}>
          <button type="button" className={styles.cancel} onClick={onClose}>
            취소
          </button>
          <button type="submit" className={styles.save}>
            저장하기
          </button>
        </div>
      </form>
    </div>
  )
}
