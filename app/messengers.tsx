import { messengers } from "./contacts";

const icons: Record<string, React.ReactNode> = {
  max: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20V4h3l5 8 5-8h3v16h-3v-9l-4 6h-2l-4-6v9Z" fill="currentColor"/></svg>,
  telegram: <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 17-7-3 16-5-5-3 3v-5l8-6-10 5Z" fill="currentColor"/></svg>,
  whatsapp: <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 18 3 21l5-1a9 9 0 1 0-3-2Z" stroke="currentColor" strokeWidth="1.5"/><path d="M8 7c-2 3 3 8 6 8l2-2-3-2-1 2-3-3 1-1Z" fill="currentColor"/></svg>,
};

export function MessengerIcons() {
  return (
    <div className="messengers">
      <span>Пишите:</span>
      {messengers.map(item => (
        <a key={item.key} href={item.href} className={`messenger ${item.key}`} target="_blank" rel="noopener noreferrer" aria-label={item.title}>
          {icons[item.key]}
        </a>
      ))}
    </div>
  );
}
