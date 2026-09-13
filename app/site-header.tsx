"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MessengerIcons } from "./messengers";
import { headerNav, PHONE_DISPLAY, PHONE_TEL, siteNav } from "./site-nav";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const home = pathname === "/";
  const to = (hash: string) => (home ? hash : `/${hash}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`site-header${scrolled || open ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="header wrap">
        <a href={to("#home")} className="brand" aria-label="Натяжные Сигма-стены — главная" onClick={() => setOpen(false)}>
          <Image src="/images/Vector.svg" alt="" className="brand-logo" width={155} height={80} style={{ height: "auto" }} priority />
        </a>
        <nav className="header-nav" aria-label="Основная навигация">
          {headerNav.map(item => <a key={item.href} href={to(item.href)}>{item.label}</a>)}
        </nav>
        <MessengerIcons />
        <a className="phone header-phone-compact" href={PHONE_TEL} aria-label="Позвонить">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 3 4 1 1 5-3 1c1 3 4 6 7 7l1-3 5 1 1 4c-8 7-24-9-16-16Z" stroke="currentColor" strokeWidth="1.5"/></svg>
          {PHONE_DISPLAY}
        </a>
        <a className="header-cta" href={to("#contact")}>Рассчитать стоимость <Arrow diagonal /></a>
        <button
          type="button"
          className="header-burger"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(value => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className="header-menu" id="mobile-nav" hidden={!open}>
        <div className="wrap header-menu-inner">
          <nav aria-label="Меню на телефоне">
            {siteNav.map(item => (
              <a key={item.href} href={to(item.href)} onClick={() => setOpen(false)}>{item.label}</a>
            ))}
          </nav>
          <MessengerIcons />
          <a className="phone" href={PHONE_TEL} onClick={() => setOpen(false)}>
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 3 4 1 1 5-3 1c1 3 4 6 7 7l1-3 5 1 1 4c-8 7-24-9-16-16Z" stroke="currentColor" strokeWidth="1.5"/></svg>
            {PHONE_DISPLAY}
          </a>
          <a className="header-cta" href={to("#contact")} onClick={() => setOpen(false)}>Рассчитать стоимость <Arrow diagonal /></a>
        </div>
      </div>
    </header>
  );
}
