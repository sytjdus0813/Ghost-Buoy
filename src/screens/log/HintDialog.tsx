import styles from './HintDialog.module.css'

type Props = { onYes: () => void; onNo: () => void }

/** Figma: Dialog · 힌트 (39:15876) — log-daitl-self 화면 */
export default function HintDialog({ onYes, onNo }: Props) {
  return (
    <div className={styles.dim} role="presentation" onClick={onNo}>
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="hint-title" onClick={(e) => e.stopPropagation()}>
        <div className={styles.text}>
          <p id="hint-title" className={styles.title}>
            Ghost Buoy에서
            <br />
            자동 저장된 기록이 있습니다.
            <br />
            수동으로 추가 작성 하시겠습니까?
          </p>
          <p className={styles.desc}>자동 기록도 수정할 수 있습니다.</p>
        </div>
        <div className={styles.buttons}>
          <button type="button" className={styles.no} onClick={onNo}>
            아니오
          </button>
          <button type="button" className={styles.yes} onClick={onYes}>
            네
          </button>
        </div>
      </div>
    </div>
  )
}
