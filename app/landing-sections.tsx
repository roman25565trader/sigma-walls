"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { BITRIX_FORM, PHONE_DISPLAY, PHONE_TEL } from "./contacts";
import { compareColumns, compareRows, everyday, faq, rooms, scenarios, values, wallLayers } from "./site-data";

function NextArrow() { return <span aria-hidden="true">↗</span>; }

function BitrixForm() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!BITRIX_FORM.scriptSrc || !host.current) return;
    const script = document.createElement("script");
    script.src = BITRIX_FORM.scriptSrc;
    script.async = true;
    script.dataset.b24Form = BITRIX_FORM.containerId;
    script.dataset.skipMoving = "true";
    host.current.appendChild(script);
    return () => { script.remove(); };
  }, []);
  return <div className="lead-bitrix" ref={host} />;
}

function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [sent, setSent] = useState(false);
  if (BITRIX_FORM.scriptSrc) return <BitrixForm />;
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!agree) return;
    setSent(true);
  }
  if (sent) {
    return (
      <div className="lead-form">
        <a className="primary section-cta lead-form-button" href={PHONE_TEL}>{PHONE_DISPLAY} <NextArrow /></a>
        <small>Заявка принята. Если удобнее голосом — позвоните, обсудим расчёт.</small>
      </div>
    );
  }
  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <label><span className="visually-hidden">Ваше имя</span><input name="name" autoComplete="name" placeholder="Ваше имя" value={name} onChange={event => setName(event.target.value)} required/></label>
      <label><span className="visually-hidden">Номер телефона</span><input name="phone" type="tel" autoComplete="tel" placeholder="Номер телефона" value={phone} onChange={event => setPhone(event.target.value)} required/></label>
      <button className="primary section-cta lead-form-button" type="submit">Получить расчёт <NextArrow /></button>
      <label className="lead-consent">
        <input type="checkbox" name="consent" checked={agree} onChange={event => setAgree(event.target.checked)} required/>
        <span>Я согласен с <a href="/privacy">политикой конфиденциальности</a> и <a href="/privacy#consent">обработкой персональных данных</a> для обратной связи.</span>
      </label>
    </form>
  );
}

function Questions() {
  const [open, setOpen] = useState(0);
  const mid = Math.ceil(faq.length / 2);
  const columns = [faq.slice(0, mid), faq.slice(mid)];
  return (
    <div className="faq-grid">
      {columns.map((column, columnIndex) => (
        <div className="faq-col" key={columnIndex}>
          {column.map((item, localIndex) => {
            const i = columnIndex * mid + localIndex;
            const isOpen = open === i;
            return (
              <article className={`faq-item${isOpen ? " is-open" : ""}`} key={item.q}>
                <button type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${i}`} id={`faq-question-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                  <span className="question-number">{String(i + 1).padStart(2, "0")}</span>
                  <span>{item.q}</span>
                  <span className="question-plus" aria-hidden="true" />
                </button>
                <div className="faq-answer" id={`faq-answer-${i}`} role="region" aria-labelledby={`faq-question-${i}`} hidden={!isOpen}>
                  <div className="faq-answer-inner">
                    <p>{item.a}</p>
                    {item.listTitle && <p className="faq-answer-subtitle">{item.listTitle}</p>}
                    {item.list && <ul>{item.list.map(entry => <li key={entry}>{entry}</li>)}</ul>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function EverydayStories() {
  const [active, setActive] = useState(0);
  const item = everyday[active];
  return <div className="everyday-stage">
    <div className="everyday-visual" id="everyday-visual">
      {everyday.map((entry, i) => <div key={entry.q} className={`everyday-visual-frame${active === i ? " is-active" : ""}`}><Image src={entry.image} alt="" fill sizes="(max-width:700px) 100vw, 50vw"/></div>)}
    </div>
    <div className="everyday-copy">
      <h3>{item.q}</h3>
      <p>{item.a}</p>
      {item.list && <ol className="everyday-list">{item.list.map(entry => <li key={entry}>{entry}</li>)}</ol>}
      <div className="everyday-topics" role="tablist" aria-label="Вопросы о жизни со стенами">
        {everyday.map((entry, i) => <button key={entry.q} type="button" role="tab" aria-selected={active === i} aria-controls="everyday-visual" id={`everyday-tab-${i}`} className={active === i ? "is-active" : ""} onClick={() => setActive(i)} onKeyDown={event => { const next = event.key === "ArrowDown" || event.key === "ArrowRight" ? (i + 1) % everyday.length : event.key === "ArrowUp" || event.key === "ArrowLeft" ? (i + everyday.length - 1) % everyday.length : event.key === "Home" ? 0 : event.key === "End" ? everyday.length - 1 : null; if (next === null) return; event.preventDefault(); setActive(next); document.getElementById(`everyday-tab-${next}`)?.focus(); }}>{entry.q}</button>)}
      </div>
    </div>
  </div>;
}

function CompareTable() {
  return <>
    <div className="compare-table-wrap">
      <table className="compare-table">
        <thead>
          <tr>
            <th scope="col">Вид затрат</th>
            {compareColumns.map((column, i) => <th scope="col" key={column} className={i === compareColumns.length - 1 ? "is-sigma" : undefined}>{column}</th>)}
          </tr>
        </thead>
        <tbody>
          {compareRows.map(row => (
            <tr key={row.label} className={row.accent ? "is-accent" : undefined}>
              <th scope="row">{row.label}</th>
              {row.values.map((value, i) => <td key={value + i} className={i === row.values.length - 1 ? "is-sigma" : undefined}>{value}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="compare-cards">
      {compareColumns.map((column, columnIndex) => (
        <article key={column} className={`compare-card${columnIndex === compareColumns.length - 1 ? " is-sigma" : ""}`}>
          <h3>{column}</h3>
          <dl>
            {compareRows.map(row => (
              <div key={row.label}><dt>{row.label}</dt><dd>{row.values[columnIndex]}</dd></div>
            ))}
          </dl>
        </article>
      ))}
    </div>
  </>;
}

export default function LandingSections() {
  const installVideo = useRef<HTMLDialogElement>(null);
  const [room, setRoom] = useState(0);
  const [layer, setLayer] = useState(0);
  const [copyLayer, setCopyLayer] = useState(0);
  const [copyVisible, setCopyVisible] = useState(true);
  const selected = rooms[room];
  const selectedLayer = wallLayers[copyLayer];
  const swapTimer = useRef<number | null>(null);
  function selectLayer(next: number) {
    if (next === layer) return;
    setCopyVisible(false);
    setLayer(next);
    if (swapTimer.current) window.clearTimeout(swapTimer.current);
    swapTimer.current = window.setTimeout(() => {
      setCopyLayer(next);
      setCopyVisible(true);
    }, 180);
  }
  function onRoomTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === "ArrowRight" || event.key === "ArrowDown" ? (index + 1) % rooms.length : event.key === "ArrowLeft" || event.key === "ArrowUp" ? (index + rooms.length - 1) % rooms.length : event.key === "Home" ? 0 : event.key === "End" ? rooms.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    setRoom(next);
    document.getElementById(`room-tab-${next}`)?.focus();
  }
  useEffect(() => () => {
    if (swapTimer.current) window.clearTimeout(swapTimer.current);
  }, []);
  return <div className="landing-sections">
    <section className="section wrap technology-section" id="technology">
      <div className="technology-heading">
        <h2>Что такое <strong>Натяжные Сигма-стены?</strong></h2>
        <p>Три шага от существующего основания до идеально ровной стены.</p>
      </div>
      <div className="layer-tabs" role="tablist" aria-label="Слои натяжной стены">
        {wallLayers.map((item, i) => <button key={item.tab} type="button" role="tab" id={`layer-tab-${i}`} aria-controls="layer-panel" aria-selected={layer === i} tabIndex={layer === i ? 0 : -1} onClick={() => selectLayer(i)} onKeyDown={e => { const next = e.key === "ArrowRight" ? (i + 1) % wallLayers.length : e.key === "ArrowLeft" ? (i + wallLayers.length - 1) % wallLayers.length : e.key === "Home" ? 0 : e.key === "End" ? wallLayers.length - 1 : null; if (next !== null) { e.preventDefault(); selectLayer(next); document.getElementById(`layer-tab-${next}`)?.focus(); } }}><Image className="layer-tab-image" src={item.image} alt="" width={72} height={72} /><span className="layer-tab-copy"><small>0{i + 1}</small><strong>{item.tab}</strong><em>{item.tabDetail}</em></span></button>)}
      </div>
      <div id="layer-panel" role="tabpanel" aria-labelledby={`layer-tab-${layer}`} className="layer-panel">
        <div className={`layer-panel-copy${copyVisible ? "" : " is-fading"}`}>
          <span className="layer-eyebrow">{selectedLayer.eyebrow}</span>
          <h3>{selectedLayer.title}</h3>
          <p>{selectedLayer.description}</p>
          <a className="primary layer-more" href="#material">Узнать подробнее про материал <NextArrow /></a>
        </div>
        <div className="layer-panel-visual">
          {wallLayers.map((item, i) => <div key={item.tab} className={`layer-panel-image${layer === i ? " is-active" : ""}`} aria-hidden={layer !== i}><Image src={item.image} alt={layer === i ? item.alt : ""} fill sizes="(max-width:700px) 100vw, 48vw" /></div>)}
        </div>
      </div>
    </section>

    <section className="section value-section" id="benefits"><div className="wrap">
      <h2>Почему Сигма-стены — <strong>это новая реальность в ремонте?</strong></h2>
      <div className="value-grid">{values.map(item => (
        <article key={item.title}>
          <span className="value-icon"><Image src={item.image} alt="" width={240} height={240} /></span>
          <div><h3>{item.title}</h3><p>{item.text}</p></div>
        </article>
      ))}</div>
    </div></section>

    <section className="section scenarios-section" id="scenarios"><div className="wrap">
      <h2>Натяжные Сигма-стены — <strong>это лучшее решение для вас.</strong></h2>
      <div className="scenario-grid">{scenarios.map((item, i) => (
        <article className="scenario" key={item.title}>
          <div className="scenario-image"><Image src={item.image} alt={item.alt} fill sizes="(max-width:700px) 100vw, (max-width:1200px) 50vw, 25vw"/><span>0{i + 1}</span></div>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}</div>
    </div></section>

    <section className="section wrap gallery-section" id="material">
      <div className="section-heading-row">
        <h2>Выберите, как будут<br /><strong>выглядеть ваши стены.</strong></h2>
        <p>Детская, спальня, гостиная или кабинет — для каждой комнаты своя палитра оттенков и фактур. Листайте интерьеры и выбирайте настроение: цвет и ткань подберём по реальным образцам.</p>
      </div>
      <div className="gallery-stage">
        <div id="room-panel" role="tabpanel" aria-labelledby={`room-tab-${room}`} className="gallery-photo">
          <Image src={selected.image} alt={`${selected.tab} с натяжной Сигма-стеной`} width={1800} height={989} sizes="(max-width:700px) calc(100vw - 36px), min(1080px, 58vw)" style={{ width: "100%", height: "auto" }}/>
          <div className="gallery-glaze">
            <div className="gallery-glaze-copy">
              <span className="gallery-glaze-kicker">{selected.tab}</span>
              <h3>{selected.title}</h3>
              <p>{selected.desc}</p>
            </div>
            <div className="gallery-glaze-material">
              <a className="gallery-material-link" href={PHONE_TEL} aria-label="Обсудить похожий вариант">
                <Image src={selected.material} alt={`Фактура ткани для варианта «${selected.tab}»`} width={140} height={180}/>
                <span className="gallery-material-arrow" aria-hidden="true">↗</span>
              </a>
              <dl>
                <div><dt>Оттенок</dt><dd>{selected.tone}</dd></div>
                <div className="gallery-fabrics"><dt>Ткань</dt><dd><ul>{selected.fabrics.map(fabric => <li key={fabric}>{fabric}</li>)}</ul></dd></div>
              </dl>
            </div>
          </div>
        </div>
        <div className="gallery-previews" role="tablist" aria-label="Тип интерьера">
          {rooms.map((item, i) => (
            <button key={item.tab} type="button" role="tab" id={`room-tab-${i}`} aria-controls="room-panel" aria-selected={room === i} tabIndex={room === i ? 0 : -1} className="gallery-preview" onClick={() => setRoom(i)} onKeyDown={event => onRoomTabKeyDown(event, i)}>
              <span className="gallery-preview-thumb"><Image src={item.image} alt="" fill sizes="120px"/></span>
              <span className="gallery-preview-copy">
                <strong>{item.tab}</strong>
                <em>{item.tabNote}</em>
                <span className="gallery-preview-action">Посмотреть <span aria-hidden="true">→</span></span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>

    <section className="section everyday-section" id="everyday">
      <div className="wrap">
        <div className="everyday-heading">
          <h2>Красиво на фото.<br /><strong>А как это в жизни?</strong></h2>
          <p>Нажатие, пятно, розетка, телевизор, подсветка — то, что обычно выясняют уже на объекте.</p>
        </div>
        <EverydayStories />
      </div>
    </section>

    <section className="catalog-cta-section" id="catalog">
      <div className="catalog-cta-bg">
        <Image className="catalog-cta-photo catalog-cta-photo--desktop" src="/images/real/samples-stack.webp" alt="" fill sizes="100vw"/>
        <Image className="catalog-cta-photo catalog-cta-photo--mobile" src="/images/real/samples-touch.webp" alt="" fill sizes="100vw"/>
      </div>
      <div className="wrap">
        <div className="catalog-cta-copy">
          <h2>— Получите каталог<br />натяжных Сигма-стен<br /><strong>для вашего интерьера</strong></h2>
          <p>Посмотрите оттенки, фактуры и готовые комнаты — и решите, какие стены хотите увидеть у себя. Каталог бесплатный, без обязательств.</p>
          <a className="primary section-cta catalog-cta-button" href="#contact">Получить каталог бесплатно <NextArrow /></a>
        </div>
      </div>
    </section>

    <section className="section install-section" id="install">
      <div className="wrap">
        <div className="section-heading-row">
          <h2>Как установить<br /><strong>натяжные стены.</strong></h2>
          <p>Рассказываем, как установить готовые стены за 1 день.</p>
        </div>
        <div className="install-layout">
          <div className="install-visual">
            <Image src="/images/tutorial-preview.png" alt="Монтаж натяжной стены: полотно заправляют в профиль" width={1672} height={941} sizes="(max-width:700px) 100vw, 68vw" style={{width:"100%",height:"auto"}}/>
            <button type="button" className="video-orbit" aria-label="Смотреть инструкцию, как установить натяжные стены" onClick={() => installVideo.current?.showModal()}>
              <svg className="orbit-text" viewBox="0 0 180 180" aria-hidden="true"><defs><path id="install-text-circle" d="M90,90 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0"/></defs><text><textPath href="#install-text-circle" textLength="382" lengthAdjust="spacing">ИНСТРУКЦИЯ, КАК ЭТО УСТАНОВИТЬ · SIGMA · </textPath></text></svg>
              <span className="orbit-play"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 11 7-11 7Z" fill="currentColor"/></svg></span>
            </button>
          </div>
          <div className="install-copy">
            <h3>Монтаж за 1 день — чисто и тихо</h3>
            <p>Всё собирается по понятной схеме: без пыли, грязи и долгой подготовки стен. Профиль задаёт плоскость, мембрана поглощает шум, ткань закрывает конструкцию — и комната готова к заселению.</p>
            <a className="primary section-cta install-cta" href="#contact">Рассчитать стоимость стен <NextArrow /></a>
          </div>
        </div>
      </div>
      <dialog className="video-dialog" ref={installVideo} aria-labelledby="install-video-title" onClick={event => { if (event.target === event.currentTarget) installVideo.current?.close(); }}>
        <button className="close" type="button" aria-label="Закрыть видео" onClick={() => installVideo.current?.close()}>×</button>
        <h2 id="install-video-title">Как установить натяжные стены</h2>
        <div className="video-placeholder"><span>▷</span><p>Полный ролик монтажа скоро появится</p></div>
        <p>Профиль задаёт плоскость, полотно заправляется в профиль. Последовательность простая — её как раз показывает эта инструкция.</p>
        <a className="header-cta" href="#contact" onClick={() => installVideo.current?.close()}>Рассчитать стоимость стен</a>
      </dialog>
    </section>

    <section className="section compare-section" id="compare">
      <div className="wrap">
        <div className="section-heading-row">
          <h2>Натяжные Сигма-стены<br /><strong>в 10 раз быстрее.</strong></h2>
          <p>Натяжная стена по стоимости сопоставима с отделкой стены под покраску.</p>
        </div>
        <CompareTable />
        <p className="compare-note">Расчёт приведён для одного и того же объёма работ по стенам. Точная смета зависит от площади, состояния основания и выбранной ткани.</p>
        <a className="primary section-cta compare-cta" href="#contact">Рассчитать стоимость моих стен <NextArrow /></a>
      </div>
    </section>

    <section className="section faq-section" id="faq">
      <div className="wrap">
        <div className="faq-heading">
          <h2>Что ещё важно знать<br /><strong>перед установкой.</strong></h2>
          <p>Каждый интерьер индивидуален. Если вопроса нет в списке — задайте его по телефону.</p>
        </div>
        <Questions />
        <a className="text-link faq-ask" href={PHONE_TEL}>Задать свой вопрос <NextArrow /></a>
      </div>
    </section>
    <section className="lead-section" id="contact">
      <div className="lead-bg">
        <Image src="/images/intro.png" alt="" fill sizes="100vw" />
      </div>
      <div className="wrap lead-layout">
        <div className="lead-copy">
          <h2>Оставьте заявку<br />и получите расчёт<br /><strong>стоимости ваших стен.</strong></h2>
          <LeadForm />
        </div>
        <div className="lead-founder">
          <Image src="/images/real/founder.webp" alt="Основатель Сигма-стен с образцом профиля натяжной стены" fill sizes="(max-width:700px) 88vw, 55vw"/>
        </div>
      </div>
    </section>
  </div>;
}
