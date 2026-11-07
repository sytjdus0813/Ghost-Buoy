import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../components/TextField";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";
import imageMain from "../assets/login/image-main.png";
import backgroundDot from "../assets/login/background-dot.svg";
import iconMail from "../assets/login/icon-mail.svg";
import iconLock from "../assets/login/icon-lock.svg";
import iconPasswordRight from "../assets/login/icon-password-right.svg";
import FitScreen from "../components/layout/FitScreen";
import styles from "./Login.module.css";

/**
 * Figma: Ghost-Buoy / login (39:14986)
 * PRD 3장에 따라 로그인은 MVP 제외 항목 → 실제 인증 없이 UI와 입력 동작만 구현.
 */
export default function Login() {
  // 임시 계정: 미리 채워 두어 바로 로그인 버튼을 누를 수 있게 함 (실제 인증 없음)
  const [email, setEmail] = useState("diver@ghostbuoy.app");
  const [password, setPassword] = useState("ghostbuoy");
  const [showPassword, setShowPassword] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);

  const canSubmit = email.trim() !== "" && password !== "";

  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // 실제 인증 없음 (PRD 3장) — 입력만 확인하고 홈으로 이동
    navigate("/home");
  }

  return (
    <FitScreen>
      <main className={styles.screen}>
        {/* dash (39:14987) */}
        <section className={styles.hero}>
          <img
            className={styles.dots}
            src={backgroundDot}
            width={372}
            height={534}
            alt=""
          />
          <div className={styles.imageMain}>
            <img src={imageMain} alt="" />
          </div>
          <h1 className={styles.title}>Ghost Buoy</h1>
          <p className={styles.subtitle}>
            함께 잠수하고, 함께 기록하는 바다
            <br />
            버디와 나를 잇는 스마트 다이빙 부표
          </p>
        </section>

        {/* loginset (39:14994) */}
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <TextField
            icon={iconMail}
            label="이메일 주소"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            icon={iconLock}
            label="비밀번호"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            trailing={
              <button
                type="button"
                className={styles.eye}
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                aria-pressed={showPassword}
              >
                <img src={iconPasswordRight} width={20} height={20} alt="" />
              </button>
            }
          />

          <div className={styles.options}>
            <Checkbox
              label="자동 로그인"
              checked={autoLogin}
              onChange={setAutoLogin}
            />
            <button type="button" className={styles.textButton}>
              비밀번호 찾기
            </button>
          </div>

          <Button type="submit" disabled={!canSubmit}>
            로그인
          </Button>
        </form>

        {/* loginset2 (39:15017) */}
        <nav className={styles.links}>
          <button type="button" className={styles.link}>
            회원가입
          </button>
          <span aria-hidden> | </span>
          <button type="button" className={styles.link}>
            다른 방법으로 로그인
          </button>
        </nav>
      </main>
    </FitScreen>
  );
}
