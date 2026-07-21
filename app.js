const { useState, useMemo, useEffect } = React;
const C = window.CONTENT;

function Nav({ lang, setLang, current }) {
  const nav = C.nav[lang];
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="brand">
          <div className="brand-mark"><img src={window.__resources.logo} alt="Mẫu Chi Uyên" /></div>
          <div>
            <div className="brand-name">Mẫu Chi Uyên <span className="tc">· 母之苑</span></div>
            <div className="brand-sub">{lang === "vi" ? "một nơi để về" : "一個可以回去的地方"}</div>
          </div>
        </a>
        <div className="nav-links">
          {nav.map((n) =>
          <a key={n.id} href={`#${n.id}`}>{n.label}</a>
          )}
        </div>
        <div className="lang-toggle" role="tablist">
          <button className={lang === "vi" ? "active" : ""} onClick={() => setLang("vi")}>Tiếng Việt</button>
          <button className={lang === "zh" ? "active" : ""} onClick={() => setLang("zh")}>繁體中文</button>
        </div>
      </div>
    </nav>);

}

function Hero({ lang, onJoin, onStory }) {
  const h = C.hero[lang];
  return (
    <section className="hero" id="top">
      <div>
        <div className="hero-eyebrow">{h.eyebrow}</div>
        <h1 className="hero-title">
          {h.title} <em>{h.titleEm}</em>
          <span className="tc-title" style={{ fontWeight: "400", margin: "1px 0px 0px" }}>{h.tcTitle}</span>
        </h1>
        <p className="hero-lede">{h.lede}</p>
        <div className="hero-ctas">
          <button className="btn btn-primary" onClick={onJoin}>
            {h.cta1} <span>→</span>
          </button>
          <button className="btn btn-secondary" onClick={onStory}>
            {h.cta2}
          </button>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-card hero-card-1 stripe-bg"></div>
        <div className="hero-card hero-card-2">
          <div className="seal">母之苑</div>
          <div className="seal-sub">{h.sealSub}</div>
        </div>
        <div className="hero-card-sprout">{h.sproutText}</div>
      </div>
    </section>);

}

function Letter({ lang }) {
  const l = C.letter[lang];
  return (
    <section className="letter" id="about">
      <div className="letter-inner">
        <aside className="letter-aside">
          <div className="letter-stamp">
            <img src={window.__resources.logo} alt="Mẫu Chi Uyên" />
          </div>
          <div className="credit">
            <span style={{ fontSize: "15px", color: "var(--ink-soft)" }}>{l.creditSmall}</span>
            <strong>{l.creditName}</strong>
            {l.creditRole}
          </div>
        </aside>
        <div className="letter-body">
          <div className="section-kicker">{l.kicker}</div>
          {l.paras.map((para, i) => {
            if (para.type === "p") return <p key={i} className={para.drop ? "dropcap" : ""}>{para.text}</p>;
            if (para.type === "quote") return <blockquote key={i}>{para.text}</blockquote>;
            if (para.type === "h") return <p key={i} style={{ fontFamily: "var(--serif)", fontSize: "22px", fontWeight: 500, color: "var(--sage-dark)", marginTop: "12px", marginBottom: "14px" }}>{para.text}</p>;
            if (para.type === "ul") return (
              <ul key={i}>{para.items.map((item, j) => <li key={j}>{item}</li>)}</ul>);

            return null;
          })}
        </div>
      </div>
    </section>);

}

function Programs({ lang }) {
  const p = C.programs[lang];
  return (
    <section className="section" id="programs">
      <div className="section-head">
        <div>
          <div className="section-kicker">{p.kicker}</div>
          <h2 className="section-title">
            {p.title}
            <span className="tc-title">{p.tcTitle}</span>
          </h2>
        </div>
        <p className="section-intro">{p.intro}</p>
      </div>
      <div className="programs-grid">
        {p.items.map((it) => {
          const Tag = it.href ? "a" : "article";
          const extraProps = it.href ? { href: it.href } : {};
          return (
            <Tag key={it.num} className={`program ${it.featured ? "featured" : ""}`} {...extraProps}>
              <div className="program-num">{it.num}</div>
              <h3 className="program-title">{it.title}</h3>
              <div className="program-sub">{it.sub}</div>
              <p className="program-desc">{it.desc}</p>
              <span className="pill">{it.pill}</span>
              {it.href && <span className="program-link">{it.linkLabel || "→"}</span>}
            </Tag>
          );
        })}
      </div>
    </section>);

}

function Events({ lang, onRegister, registered }) {
  const e = C.events[lang];
  const labels = {
    vi: { open: "Đăng ký", full: "Hết chỗ", registered: "✓ Đã đăng ký" },
    zh: { open: "報名", full: "額滿", registered: "✓ 已報名" }
  }[lang];

  return (
    <section className="events" id="events">
      <div className="section" style={{ padding: "100px 40px" }}>
        <div className="section-head">
          <div>
            <div className="section-kicker">{e.kicker}</div>
            <h2 className="section-title">
              {e.title}
              <span className="tc-title">{e.tcTitle}</span>
            </h2>
          </div>
          <p className="section-intro">{e.intro}</p>
        </div>
        <div>
          {e.items.map((ev) => {
            const isReg = registered.has(ev.id);
            const status = isReg ? "registered" : ev.status;
            return (
              <div className="event-row" key={ev.id}>
                <div className="event-date">
                  <span className="day">{ev.day}</span>
                  <span className="mo">{ev.mo}</span>
                </div>
                <div>
                  <div className="event-title">{ev.title}</div>
                  <div className="event-title-tc">{ev.titleZh}</div>
                  <div className="event-meta">
                    {ev.meta.map((m, i) => <span key={i}>{m}</span>)}
                  </div>
                </div>
                <div className="event-location">{ev.location}</div>
                <div className="event-register">
                  {status === "open" &&
                  <button onClick={() => onRegister(ev)}>{labels.open} →</button>
                  }
                  {status === "full" && <button className="full">{labels.full}</button>}
                  {status === "registered" && <button className="registered">{labels.registered}</button>}
                </div>
              </div>);

          })}
        </div>
      </div>
    </section>);

}

function Stories({ lang }) {
  const s = C.stories[lang];
  return (
    <section className="section" id="stories">
      <div className="section-head">
        <div>
          <div className="section-kicker">{s.kicker}</div>
          <h2 className="section-title">
            {s.title}
            <span className="tc-title">{s.tcTitle}</span>
          </h2>
        </div>
        <p className="section-intro">{s.intro}</p>
      </div>
      <div className="stories-row">
        {s.items.map((st, i) =>
        <article key={i} className={`story ${st.lead ? "lead" : ""}`}>
            <p className="quote">{st.quote}</p>
            <div className="byline">
              <div className="avatar">{st.initial}</div>
              <div>
                <strong>{st.name}</strong>
                <span>{st.role}</span>
              </div>
            </div>
          </article>
        )}
      </div>
    </section>);

}

function Resources({ lang }) {
  const r = C.resources[lang];
  const [filter, setFilter] = useState("all");

  const counts = useMemo(() => {
    const c = { all: r.items.length };
    r.items.forEach((it) => {c[it.cat] = (c[it.cat] || 0) + 1;});
    return c;
  }, [r.items]);

  const filtered = filter === "all" ? r.items : r.items.filter((it) => it.cat === filter);

  return (
    <section className="section" id="resources">
      <div className="section-head">
        <div>
          <div className="section-kicker">{r.kicker}</div>
          <h2 className="section-title">
            {r.title}
            <span className="tc-title">{r.tcTitle}</span>
          </h2>
        </div>
        <p className="section-intro">{r.intro}</p>
      </div>
      <div className="resources-head">
        <div className="resource-filters">
          {r.filters.map((f) =>
          <button
            key={f.id}
            className={filter === f.id ? "active" : ""}
            onClick={() => setFilter(f.id)}>
            
              {f.label}
              <span className="count">{counts[f.id] || 0}</span>
            </button>
          )}
        </div>
      </div>
      <div className="resources-grid">
        {filtered.length === 0 ?
        <div className="resources-empty">—</div> :

        filtered.map((it, i) =>
        <div className="resource" key={i}>
              <div className={`resource-icon ${it.cat}`}>{it.icon}</div>
              <div>
                <div className="resource-title">{it.title}</div>
                <div className="resource-title-tc">{it.titleZh}</div>
                <p className="resource-desc">{it.desc}</p>
              </div>
              <div className="resource-lang">{r.langs[it.lang]}</div>
            </div>
        )
        }
      </div>
    </section>);

}

function News({ lang }) {
  const n = C.news[lang];
  return (
    <section className="section" id="news">
      <div className="section-head">
        <div>
          <div className="section-kicker">{n.kicker}</div>
          <h2 className="section-title">
            {n.title}
            <span className="tc-title">{n.tcTitle}</span>
          </h2>
        </div>
        <p className="section-intro">{n.intro}</p>
      </div>
      <div className="news-grid">
        {n.items.map((it, i) =>
        <article className="news-item" key={i}>
            <div className={`news-thumb ${it.thumb}`} data-label={it.label}></div>
            <div className="news-date">{it.date}</div>
            <h3 className="news-title">{it.title}</h3>
            <div className="news-title-tc">{it.titleZh}</div>
            <p className="news-excerpt">{it.excerpt}</p>
          </article>
        )}
      </div>
    </section>);

}

function Contact({ lang }) {
  const c = C.contact[lang];
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", topic: c.f_topic_opts[0], msg: "" });

  useEffect(() => {
    setForm((f) => ({ ...f, topic: C.contact[lang].f_topic_opts[0] }));
  }, [lang]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 6000);
    setForm({ name: "", email: "", topic: c.f_topic_opts[0], msg: "" });
  };

  return (
    <section className="contact" id="contact">
      <div className="contact-inner">
        <div>
          <h2 className="contact-title">
            {c.title} <em>{c.titleEm}</em>
          </h2>
          <p className="contact-lede">{c.lede}</p>
          <div className="contact-channels">
            {c.channels.map((ch, i) =>
            <a key={i} className="channel" href={ch.href}>
                <div className="channel-icon">{ch.icon}</div>
                <div>
                  <strong>{ch.title}</strong>
                  <span>{ch.sub}</span>
                </div>
              </a>
            )}
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          {sent ?
          <div className="success">
              <div className="success-mark">✓</div>
              <h3>{c.f_success_title}</h3>
              <p>{c.f_success}</p>
            </div> :

          <React.Fragment>
              <h3>{c.formTitle}</h3>
              <div className="form-sub">{c.formSub}</div>
              <div className="form-row">
                <div className="field">
                  <label>{c.f_name}</label>
                  <input
                  type="text"
                  placeholder={c.f_name_ph}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required />
                
                </div>
                <div className="field">
                  <label>{c.f_email}</label>
                  <input
                  type="text"
                  placeholder={c.f_email_ph}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required />
                
                </div>
              </div>
              <div className="field">
                <label>{c.f_topic}</label>
                <select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
                  {c.f_topic_opts.map((o, i) => <option key={i}>{o}</option>)}
                </select>
              </div>
              <div className="field">
                <label>{c.f_msg}</label>
                <textarea
                placeholder={c.f_msg_ph}
                value={form.msg}
                onChange={(e) => setForm({ ...form, msg: e.target.value })}
                required />
              
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                {c.f_submit} →
              </button>
            </React.Fragment>
          }
        </form>
      </div>
    </section>);

}

function Footer({ lang }) {
  const f = C.footer[lang];
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div className="brand-mark" style={{ background: "var(--terracotta)" }}>母</div>
              <div>
                <div className="brand-name">Mẫu Chi Uyên</div>
                <div className="brand-sub">· 母之苑</div>
              </div>
            </div>
            <p>{f.about}</p>
          </div>
          <div className="footer-col">
            <h4>{f.col1}</h4>
            <ul>{f.col1_links.map((l, i) => <li key={i}><a href="#">{l}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>{f.col2}</h4>
            <ul>{f.col2_links.map((l, i) => <li key={i}><a href="#">{l}</a></li>)}</ul>
          </div>
          <div className="footer-col">
            <h4>{f.col3}</h4>
            <ul>{f.col3_links.map((l, i) => <li key={i}><a href="#">{l}</a></li>)}</ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div>{f.copy}</div>
          <div className="funding-badge">
            {f.badge} <strong>{f.badgeOrg}</strong>
          </div>
        </div>
      </div>
    </footer>);

}

function RegisterModal({ event, lang, onClose, onConfirm }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "" });
  const [done, setDone] = useState(false);

  if (!event) return null;

  const t = {
    vi: {
      title: "Đăng ký tham gia",
      sub: "chúng mình sẽ gặp bạn ở đó",
      name: "Tên", email: "Email", phone: "Điện thoại (tùy chọn)", note: "Có gì bạn muốn cho chúng mình biết?",
      notePh: "Ví dụ: mang theo em bé, lịch không tiện, cần hỗ trợ dịch...",
      submit: "Xác nhận đăng ký",
      successTitle: "Đăng ký thành công!",
      successMsg: "Email xác nhận đã được gửi. Hẹn gặp bạn sớm.",
      close: "Đóng"
    },
    zh: {
      title: "報名活動",
      sub: "我們在那裡等你",
      name: "姓名", email: "Email", phone: "電話 (選填)", note: "有想讓我們知道的事嗎?",
      notePh: "例如:會帶寶寶、時間不便、需要翻譯協助...",
      submit: "確認報名",
      successTitle: "報名成功!",
      successMsg: "確認信已寄出,期待與你見面。",
      close: "關閉"
    }
  }[lang];

  const handleSubmit = (e) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => {
      onConfirm(event.id);
      onClose();
      setDone(false);
    }, 1600);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        {done ?
        <div className="success">
            <div className="success-mark">✓</div>
            <h3>{t.successTitle}</h3>
            <p>{t.successMsg}</p>
          </div> :

        <React.Fragment>
            <h3>{t.title}</h3>
            <div className="modal-sub">{t.sub}</div>
            <div className="modal-event-meta">
              <div><strong>{event.title}</strong>{event.titleZh}</div>
              <div><strong>{event.day} {event.mo}</strong>{event.meta[0]}</div>
              <div style={{ gridColumn: "1/-1" }}><strong>{event.location}</strong>{event.meta.slice(1).join(" · ")}</div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="field">
                  <label>{t.name}</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                </div>
                <div className="field">
                  <label>{t.email}</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                </div>
              </div>
              <div className="field">
                <label>{t.phone}</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div className="field">
                <label>{t.note}</label>
                <textarea placeholder={t.notePh} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                {t.submit} →
              </button>
            </form>
          </React.Fragment>
        }
      </div>
    </div>);

}

function App() {
  const [lang, setLang] = useState(() => {
    try {return localStorage.getItem("mcu-lang") || "vi";} catch {return "vi";}
  });
  const [modalEvent, setModalEvent] = useState(null);
  const [registered, setRegistered] = useState(() => new Set(["evt-02"]));

  useEffect(() => {
    try {localStorage.setItem("mcu-lang", lang);} catch {}
    document.documentElement.lang = lang === "zh" ? "zh-Hant" : "vi";
  }, [lang]);

  return (
    <React.Fragment>
      <Nav lang={lang} setLang={setLang} />
      <Hero
        lang={lang}
        onJoin={() => {const el = document.getElementById("contact");if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });}}
        onStory={() => {const el = document.getElementById("about");if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });}} />
      
      <Letter lang={lang} />
      <Programs lang={lang} />
      <Events
        lang={lang}
        onRegister={(ev) => setModalEvent(ev)}
        registered={registered} />
      
      <Stories lang={lang} />
      <Resources lang={lang} />
      <News lang={lang} />
      <Contact lang={lang} />
      <Footer lang={lang} />
      {modalEvent &&
      <RegisterModal
        event={modalEvent}
        lang={lang}
        onClose={() => setModalEvent(null)}
        onConfirm={(id) => setRegistered((s) => new Set([...s, id]))} />

      }
    </React.Fragment>);

}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);