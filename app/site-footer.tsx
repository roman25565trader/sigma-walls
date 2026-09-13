import Image from "next/image";
import Link from "next/link";
import { MessengerIcons } from "./messengers";
import { legalDocs, PHONE_DISPLAY, PHONE_TEL, siteNav } from "./site-nav";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <Link href="/#home" className="footer-brand">
          <Image src="/images/Vector.svg" alt="Натяжные Сигма-стены" width={170} height={88} style={{ height: "auto" }} />
          <small>Натяжные стены для вашего дома</small>
        </Link>
        <div className="footer-col">
          <h3>Навигация</h3>
          <nav aria-label="Навигация в подвале">
            {siteNav.map(item => <Link key={item.href} href={`/${item.href}`}>{item.label}</Link>)}
          </nav>
        </div>
        <div className="footer-col">
          <h3>Документы</h3>
          <nav aria-label="Документы">
            {legalDocs.map(item => <Link key={item.href} href={item.href}>{item.label}</Link>)}
          </nav>
          <p className="footer-note">Реквизиты и оферта появятся здесь после публикации.</p>
        </div>
        <div className="footer-col footer-contacts">
          <h3>Контакты</h3>
          <a className="footer-phone" href={PHONE_TEL}>{PHONE_DISPLAY}</a>
          <MessengerIcons />
          <p>Географию монтажа уточняйте по телефону.</p>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Sigma</span>
        <span>Изображения интерьеров — визуализации</span>
        <Link href="/#home">Наверх ↑</Link>
      </div>
    </footer>
  );
}
