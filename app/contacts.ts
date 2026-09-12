export const PHONE_DISPLAY = "+7 986 723 18 84";
export const PHONE_TEL = "tel:+79867231884";

export const MAX_LINK = "https://max.ru/u/f9LHodD0cOIE6zqvluzWMPy0yuliP2rzH49oRr5WO_9vM9xJnnKV70x6BM4";
export const TELEGRAM_LINK = "https://t.me/+79867231884";
export const WHATSAPP_LINK = "https://wa.me/79867231884";

export const messengers = [
  { key: "max", label: "MAX", href: MAX_LINK, title: "Написать в MAX" },
  { key: "telegram", label: "Telegram", href: TELEGRAM_LINK, title: "Написать в Telegram" },
  { key: "whatsapp", label: "WhatsApp", href: WHATSAPP_LINK, title: "Написать в WhatsApp" },
] as const;

export const BITRIX_FORM = {
  scriptSrc: "",
  containerId: "",
} as const;

export const operator = {
  name: "",
  inn: "",
  ogrn: "",
  address: "",
  email: "",
} as const;
