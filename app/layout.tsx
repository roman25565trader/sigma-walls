import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";
import "./globals.css";
import "./sections.css";
const golos = localFont({ src: [{ path: "./fonts/golos-400.ttf", weight: "400" }, { path: "./fonts/golos-600.ttf", weight: "600" }, { path: "./fonts/golos-700.ttf", weight: "700" }], variable: "--font-golos", display: "swap" });
export const metadata: Metadata = {
  title: "Натяжные Сигма-стены — тихо, быстро, красиво",
  description: "Стены с текстильной фактурой: ровнее, быстрее, выгоднее. Натяжные Сигма-стены — идеальная геометрия и поверхность стен, в 10 раз быстрее традиционных технологий.",
  icons: { icon: "/images/Vector.svg" },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="ru" className={golos.variable}><body><SiteHeader />{children}<SiteFooter /></body></html>;
}
