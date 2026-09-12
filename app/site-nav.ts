export { PHONE_DISPLAY, PHONE_TEL } from "./contacts";

export const siteNav = [
  { href: "#home", label: "Главная" },
  { href: "#technology", label: "Технология" },
  { href: "#benefits", label: "Почему Сигма" },
  { href: "#scenarios", label: "Для кого" },
  { href: "#material", label: "Материалы" },
  { href: "#everyday", label: "В жизни" },
  { href: "#install", label: "Монтаж" },
  { href: "#compare", label: "Сравнение" },
  { href: "#faq", label: "Вопросы" },
  { href: "#contact", label: "Заявка" },
] as const;

export const headerNav = [
  { href: "#technology", label: "Технология" },
  { href: "#benefits", label: "Почему Сигма" },
  { href: "#material", label: "Материалы" },
  { href: "#compare", label: "Сравнение" },
  { href: "#faq", label: "Вопросы" },
] as const;

export const legalDocs = [
  { href: "/privacy", label: "Политика конфиденциальности" },
  { href: "/privacy#consent", label: "Согласие на обработку персональных данных" },
] as const;
