import { useEffect, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import AppScreen from '../../components/layout/AppScreen'
import { HeaderInto } from '../../components/layout/Header'
import SectionTitle from '../../components/SectionTitle'
import { useStore } from '../../data/store'
import { REPLAY_HERO } from '../../data/mock'
import buddy1 from '../../assets/log/buddy-1.png'
import buddy2 from '../../assets/log/buddy-2.png'
import buddy3 from '../../assets/log/buddy-3.png'
import iconPlay from '../../assets/explore/icon-play-dark.svg'
import styles from './LogDetail.module.css'

const BUDDY_IMG = [buddy1, buddy2, buddy3]
const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

/** Figma: log/log-detail-auto (39:16035) — 세션 상세 (리플레이 + 팀원 + 베스트 씬) */
export default function LogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { sessions } = useStore()
  const session = sessions.find((s) => s.id === id)
  const total = session?.totalDuration ?? 0

  // 리플레이 시뮬레이션: 재생 버튼/Ghost Replay → 1초에 30초씩 진행
  const [pos, setPos] = useState(12)
  const [playing, setPlaying] = useState(false)
  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => setPos((p) => (p + 30 >= total ? (setPlaying(false), total) : p + 30)), 1000)
    return () => clearInterval(t)
  }, [playing, total])
  const [viewer, setViewer] = useState<string | null>(null)

  if (!session) return <Navigate to="/log" replace />

  const d = new Date(session.date)
  const dateLabel = `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
  const typeLabel = session.type === 'free' ? '프리다이빙' : '스쿠버'
  const minutes = Math.round(total / 60)
  const dive = session.dives[0]

  const togglePlay = () => {
    if (pos >= total) setPos(0)
    setPlaying((v) => !v)
  }

  return (
    <AppScreen
      header={<HeaderInto title="지난 기록" backTo="/log" />}
      overlay={
        <>
          <div className={styles.buttons}>
            <button type="button" className={styles.edit} onClick={() => navigate('/log/calendar?write=1')}>
              수정하기
            </button>
            <button type="button" className={styles.replay} onClick={togglePlay}>
              {playing ? '일시정지' : 'Ghost Replay'}
            </button>
          </div>
          {viewer && (
            <button type="button" className={styles.viewer} aria-label="닫기" onClick={() => setViewer(null)}>
              <img src={viewer} alt="드론 촬영 미디어" />
            </button>
          )}
        </>
      }
    >
      <div className={styles.content}>
        <div className={styles.hero}>
          <img className={styles.heroImg} src={REPLAY_HERO} alt="" />
          <span className={styles.heroShade} />
          <span className={styles.replayPill}>
            {`● REPLAY  ${mmss(pos)} / ${mmss(total)}`}
          </span>
          <div className={styles.heroBottom}>
            <div className={styles.heroText}>
              <b>{session.spot}</b>
              <small>
                {dateLabel} · {typeLabel} {minutes}분
                {!session.auto && ' · 직접 작성'}
              </small>
              <span className={styles.track}>
                <span className={styles.progress} style={{ width: `${total ? (pos / total) * 100 : 0}%` }} />
              </span>
            </div>
            <button type="button" className={styles.play} aria-label={playing ? '일시정지' : '재생'} onClick={togglePlay}>
              <img src={iconPlay} width={20} height={20} alt="" />
            </button>
          </div>
        </div>

        {/* ⚠️ PRD 5.4 고스트 비교 — Figma에 전용 UI가 없어 팀원 카드와 같은 스타일로 한 줄 추가 */}
        {dive && (
          <div className={styles.team}>
            <span>고스트 대비</span>
            <span className={styles.spacer} />
            <b className={styles.ghost}>
              최대 {dive.maxDepth}m ({dive.maxDepth - dive.ghostDepth >= 0 ? '+' : ''}
              {(dive.maxDepth - dive.ghostDepth).toFixed(1)}m){dive.isRecord ? ' · 기록 경신' : ''}
            </b>
          </div>
        )}

        <div className={styles.team}>
          <span>함께한 팀원</span>
          <span className={styles.spacer} />
          <span className={styles.avatars}>
            {BUDDY_IMG.slice(0, Math.max(1, Math.min(3, session.buddies.length))).map((src, i) => (
              <img key={i} src={src} width={30} height={30} alt="" />
            ))}
          </span>
        </div>

        <SectionTitle title="베스트 씬" moreTo={`/log/${session.id}`} />
        {session.media.length > 0 ? (
          <div className={styles.scenes}>
            {session.media.map((m, i) => (
              <button key={i} type="button" className={styles.scene} onClick={() => setViewer(m)} aria-label={`미디어 ${i + 1} 보기`}>
                <img src={m} alt="" />
              </button>
            ))}
          </div>
        ) : (
          <p className={styles.noMedia}>드론 촬영 미디어가 없어요</p>
        )}
        <div className={styles.btnSpace} />
      </div>
    </AppScreen>
  )
}
