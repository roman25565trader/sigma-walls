"use client";

import Image from "next/image";
import { useRef } from "react";
import LandingSections from "./landing-sections";
import { PHONE_DISPLAY, PHONE_TEL } from "./contacts";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export default function Home() {
  const videoDialog = useRef<HTMLDialogElement>(null);
  function openCalculator() { document.getElementById("contact")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); }
  return (
    <>
      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="room"><Image src="/images/living-room-v2.webp" alt="Белая дизайнерская гостиная с натяжными текстильными стенами и подсветкой по периметру" fill sizes="100vw" priority /></div>
          <div className="hero-content wrap">
            <h1 id="hero-title"><span className="headline-line">Стены с текстильной фактурой:</span><span className="headline-line"><strong>ровнее, быстрее, выгоднее</strong></span></h1>
            <p className="intro"><strong>Натяжные <span className="nowrap">Сигма-стены</span></strong> — идеальная геометрия и поверхность стен, <strong>в 10 раз быстрее</strong> традиционных технологий, стоимость сопоставима с традиционными технологиями.</p>
            <button className="primary hero-cta" onClick={openCalculator}>Рассчитать стоимость моих стен</button>
          </div>
          <button className="video-orbit" aria-label="Посмотреть, как это устроено — открыть видео" onClick={() => videoDialog.current?.showModal()}>
            <svg className="orbit-text" viewBox="0 0 180 180" aria-hidden="true"><defs><path id="text-circle" d="M90,90 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0"/></defs><text><textPath href="#text-circle" textLength="382" lengthAdjust="spacing">ПОСМОТРЕТЬ, КАК ЭТО УСТРОЕНО · SIGMA · </textPath></text></svg>
            <span className="orbit-play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z" fill="currentColor"/></svg></span>
          </button>
        </section>
        <LandingSections />
      </main>
      <dialog className="video-dialog video-dialog--vertical" ref={videoDialog} aria-labelledby="video-title" onClick={e => { if(e.target === e.currentTarget) videoDialog.current?.close(); }}>
        <button className="close" aria-label="Закрыть видео" onClick={() => videoDialog.current?.close()}>×</button>
        <h2 id="video-title">Как устроены Натяжные <span className="nowrap">Сигма-стены</span></h2>
        <div className="video-placeholder video-placeholder--vertical"><span>▷</span><p>Короткий вертикальный ролик скоро появится</p></div>
        <p>Существующая стена остаётся внутри конструкции, акустическая мембрана поглощает шум, а декоративная ткань создаёт идеально ровную поверхность.</p>
        <div className="video-dialog-actions">
          <a className="header-cta" href="#technology" onClick={() => videoDialog.current?.close()}>Подробнее о технологии <Arrow /></a>
          <a className="text-link" href={PHONE_TEL}>{PHONE_DISPLAY}</a>
        </div>
      </dialog>
    </>
  );
}
