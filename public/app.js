(function () {
  const BIZ_TEMPLATES = [
    {
      id: "roadside",
      name: "Пътна помощ / Автопомощ",
      defaultTitle: "ПЪТНА МОЩ 24/7 — БЪЛГАРИЯ",
      defaultCity: "Перник • София • Магистрали",
      services: [
        { title: "Репатрак и транспорт", desc: "Бърз транспорт на автомобили, джипове и ванове." },
        { title: "Ток, гуми и гориво", desc: "Подаване на ток, смяна на гума и помощ на място." },
        { title: "Тежка намеса", desc: "Изваждане при канавки, кал и тежки условия." }
      ],
      photos: [
        "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1000&q=85",
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=85"
      ]
    },
    {
      id: "construction",
      name: "Строителство и ремонти",
      defaultTitle: "СТРОИТЕЛЕН ЦЕНТЪР — БГ",
      defaultCity: "Перник & Софийска област",
      services: [
        { title: "Груб строеж и покриви", desc: "Конструкции, зидария и покривни системи." },
        { title: "Вътрешни ремонти", desc: "Замазки, шпакловки, гипсокартон и довършителни работи." },
        { title: "Топлоизолация и фасади", desc: "Изолации и фасадни решения." }
      ],
      photos: [
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=85",
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1000&q=85"
      ]
    },
    {
      id: "autoservice",
      name: "Автосервиз и детайлинг",
      defaultTitle: "PRO AUTO LAB BULGARIA",
      defaultCity: "София • Перник",
      services: [
        { title: "Диагностика и ходова част", desc: "Компютърна диагностика, спирачки и окачване." },
        { title: "Полиране и детайлинг", desc: "Възстановяване на блясък и защитни покрития." },
        { title: "Масла и обслужване", desc: "Смяна на масла, филтри и профилактика." }
      ],
      photos: [
        "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=1000&q=85",
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=85"
      ]
    },
    {
      id: "shop",
      name: "Онлайн магазин БГ",
      defaultTitle: "BG MARKET PRO",
      defaultCity: "Цяла България",
      services: [
        { title: "Каталог с наличности", desc: "Продукти, цени и бърз избор." },
        { title: "Доставка с куриер", desc: "Експресна доставка с преглед." },
        { title: "Пакетни оферти", desc: "Комбинации и специални цени." }
      ],
      photos: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1000&q=85"
      ]
    },
    {
      id: "ai-tech",
      name: "AI и софтуер",
      defaultTitle: "RED SOFTWARE TEAM",
      defaultCity: "България • Онлайн",
      services: [
        { title: "Уеб системи и приложения", desc: "Сайтове, панели и сървърни API-та." },
        { title: "AI автоматизации", desc: "Ботове, потоци и автоматизация." },
        { title: "Сигурност и поддръжка", desc: "Стабилна работа и следене." }
      ],
      photos: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=85"
      ]
    }
  ];

  const PALETTES = {
    "crimson-hd": { primary: "#ef233c", glow: "rgba(239, 35, 60, 0.28)", bg: "#07090e", surface: "#101624", border: "rgba(239, 35, 60, 0.45)" },
    "cobalt-hd": { primary: "#38bdf8", glow: "rgba(56, 189, 248, 0.26)", bg: "#060a12", surface: "#0e1729", border: "rgba(56, 189, 248, 0.45)" },
    "emerald-hd": { primary: "#10b981", glow: "rgba(16, 185, 129, 0.26)", bg: "#050c09", surface: "#0c1d17", border: "rgba(16, 185, 129, 0.45)" },
    "amber-hd": { primary: "#f59e0b", glow: "rgba(245, 158, 11, 0.26)", bg: "#0c0905", surface: "#1b1409", border: "rgba(245, 158, 11, 0.45)" }
  };
  const paletteKeys = Object.keys(PALETTES);

  const SW_CATEGORIES = ["AI & Vision", "Automation & Bots", "Cyber & Monitoring", "Business & ERP"];
  const SW_BASES = [
    "Traffic & Vision Analyzer", "Auto Lead Bot", "Threat Pulse Radar", "Smart Invoice Core",
    "Inventory Sync Engine", "Order Dispatch Hub", "Auto Support Agent", "Log Sentinel Pro",
    "Fleet Route Optimizer", "Catalog Price Sync", "Booking Flow Engine", "Alert Webhook Relay"
  ];
  const SOFTWARE_200 = Array.from({ length: 200 }, (_, idx) => {
    const num = idx + 1;
    const cat = SW_CATEGORIES[idx % SW_CATEGORIES.length];
    const base = SW_BASES[idx % SW_BASES.length];
    const priceEur = 29 + ((idx * 17) % 270);
    return {
      id: `SW-${String(num).padStart(3, "0")}`,
      name: `${base} v${1 + (idx % 5)}.${idx % 10}`,
      category: cat,
      price: `${priceEur} EUR`,
      summary: `Модул ${cat} с визуализация, жив тест и интеграция.`
    };
  });

  const state = {
    mode: "studio",
    bizId: "roadside",
    title: "ПЪТНА МОЩ 24/7 — БЪЛГАРИЯ",
    city: "Перник • София • Магистрали",
    paletteKey: "crimson-hd",
    variantNum: 1,
    note: "Денонощна реакция, ясни условия и бърз контакт.",
    photos: [...BIZ_TEMPLATES[0].photos],
    files: {},
    activeFile: "index.html",
    lastPreviewUrl: "",
    selectedSoftware: SOFTWARE_200[0]
  };

  let clipTimer = null;

  const $ = (id) => document.getElementById(id);
  const esc = (s) =>
    String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  function setStatus(msg) {
    const el = $("statusMsg");
    if (el) el.textContent = msg;
  }

  function getCurrentBiz() {
    return BIZ_TEMPLATES.find((b) => b.id === state.bizId) || BIZ_TEMPLATES[0];
  }

  function applyPaletteVars() {
    const pal = PALETTES[state.paletteKey] || PALETTES["crimson-hd"];
    document.documentElement.style.setProperty("--accent", pal.primary);
    document.documentElement.style.setProperty("--accent-glow", pal.glow);
  }

  function syncInputs() {
    if ($("bizTitleInput")?.value.trim()) state.title = $("bizTitleInput").value.trim();
    if ($("bizCityInput")?.value.trim()) state.city = $("bizCityInput").value.trim();
    if ($("promptBox")?.value.trim()) state.note = $("promptBox").value.trim();
    if ($("paletteSelect")?.value) state.paletteKey = $("paletteSelect").value;
  }

  function compileProject() {
    syncInputs();
    applyPaletteVars();
    const biz = getCurrentBiz();
    const pal = PALETTES[state.paletteKey] || PALETTES["crimson-hd"];

    const css = `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: ${pal.bg}; color: #f8fafc;
  font-family: Inter, system-ui, -apple-system, sans-serif;
  padding: 22px;
}
.wrap { max-width: 1120px; margin: 0 auto; }
.hero {
  background: ${pal.surface}; border: 1px solid ${pal.border};
  box-shadow: 0 14px 36px ${pal.glow}; border-radius: 16px; padding: 24px; margin-bottom: 16px;
}
.kicker { font-size: 0.72rem; font-weight: 800; letter-spacing: 0.1em; color: ${pal.primary}; text-transform: uppercase; margin-bottom: 6px; }
h1 { font-size: 1.85rem; margin-bottom: 8px; }
.sub { color: #cbd5e1; font-size: 0.94rem; margin-bottom: 14px; }
.cta { background: ${pal.primary}; color: #fff; border: 0; border-radius: 9px; padding: 10px 18px; font-weight: 800; cursor: pointer; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
.card { background: ${pal.surface}; border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; padding: 16px; }
.card h3 { color: ${pal.primary}; font-size: 1rem; margin-bottom: 6px; }
.card p { color: #cbd5e1; font-size: 0.86rem; }
.media-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; }
.media-grid img { width: 100%; height: 180px; object-fit: cover; border-radius: 10px; }
@media (max-width: 820px) { .cards { grid-template-columns: 1fr; } }`;

    const cardsHtml = biz.services
      .map((s) => `<div class="card"><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p></div>`)
      .join("\n    ");

    const imgsHtml = state.photos
      .map((src, i) => `<img src="${esc(src)}" alt="Кадър ${i + 1}">`)
      .join("\n    ");

    const html = `<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8">
  <title>${esc(state.title)}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="wrap">
    <section class="hero">
      <div class="kicker">${esc(biz.name)} • ${esc(state.city)} • V${state.variantNum}</div>
      <h1>${esc(state.title)}</h1>
      <p class="sub">${esc(state.note)}</p>
      <button id="ctaBtn" class="cta" type="button">СВЪРЖИ СЕ С НАС</button>
      <div id="ctaOut" style="margin-top:10px;font-size:0.88rem;color:#e2e8f0;"></div>
    </section>
    <section class="cards">
      ${cardsHtml}
    </section>
    <section class="media-grid">
      ${imgsHtml}
    </section>
  </div>
  <script src="app.js"></script>
</body>
</html>`;

    const js = `document.getElementById("ctaBtn")?.addEventListener("click", () => {
  const el = document.getElementById("ctaOut");
  if (el) el.textContent = "Активна заявка за ${esc(state.title)} (${esc(state.city)}) — 0879 813 928.";
});`;

    state.files = { "index.html": html, "style.css": css, "app.js": js };
    state.lastPreviewUrl = "";

    if ($("variantLabel")) $("variantLabel").textContent = `Вариант #${state.variantNum} • ${state.paletteKey}`;
    if ($("codeBox")) $("codeBox").value = state.files[state.activeFile] || "";
    if ($("liveFrame")) {
      $("liveFrame").srcdoc = html
        .replace(/<link[^>]*href=["']style\.css["'][^>]*>/i, `<style>${css}</style>`)
        .replace(/<script[^>]*src=["']app\.js["'][^>]*><\/script>/i, `<script>${js}<\/script>`);
    }
  }

  function renderBizTabs() {
    const el = $("bizTabs");
    if (!el) return;
    el.innerHTML = "";
    BIZ_TEMPLATES.forEach((b) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `biz-btn ${b.id === state.bizId ? "active" : ""}`;
      btn.textContent = b.name;
      btn.addEventListener("click", () => {
        state.bizId = b.id;
        state.title = b.defaultTitle;
        state.city = b.defaultCity;
        state.photos = [...b.photos];
        if ($("bizTitleInput")) $("bizTitleInput").value = state.title;
        if ($("bizCityInput")) $("bizCityInput").value = state.city;
        renderBizTabs();
        compileProject();
        setStatus(`Избран бизнес: ${b.name}`);
      });
      el.appendChild(btn);
    });
  }

  function switchView(mode) {
    state.mode = mode === "software" ? "software" : "studio";
    const isSw = state.mode === "software";
    if ($("studioView")) $("studioView").style.display = isSw ? "none" : "block";
    if ($("softwareView")) $("softwareView").style.display = isSw ? "block" : "none";
    $("navStudio")?.classList.toggle("active", !isSw);
    $("navSoftware")?.classList.toggle("active", isSw);
    if (isSw) {
      renderSoftwareList();
      playClip(state.selectedSoftware);
    }
  }

  function playClip(sw) {
    if (!sw) return;
    state.selectedSoftware = sw;
    if (clipTimer) {
      clearInterval(clipTimer);
      clipTimer = null;
    }
    if ($("swPlayerTitle")) $("swPlayerTitle").textContent = `${sw.id} • ${sw.name}`;
    if ($("swPlayerPrice")) $("swPlayerPrice").textContent = `${sw.price} • FREE TEST`;
    if ($("swPlayerDesc")) $("swPlayerDesc").textContent = sw.summary;

    const bars = Array.from({ length: 12 }, (_, i) => {
      const h = 25 + ((i * 19) % 70);
      return `<span style="display:inline-block;width:12px;height:${h}%;background:var(--accent);border-radius:3px 3px 0 0;margin-right:4px;"></span>`;
    }).join("");

    if ($("swClipVisual")) {
      $("swClipVisual").innerHTML = `
        <div style="font-size:0.82rem;font-weight:800;margin-bottom:6px;">${esc(sw.name)} (${esc(sw.category)})</div>
        <div style="height:56px;display:flex;align-items:flex-end;background:rgba(255,255,255,0.03);padding:6px 8px;border-radius:6px;">${bars}</div>
      `;
    }

    const steps = [
      `[1/3] Стартиране на ${sw.id} (${sw.category})...`,
      `[2/3] Активен поток на визуализация и тестови данни...`,
      `[3/3] Безплатният тест е активен — можеш да го вкараш в STUDIO.`
    ];
    let i = 0;
    if ($("swClipLog")) $("swClipLog").textContent = steps[0];
    clipTimer = setInterval(() => {
      i += 1;
      if ($("swClipLog")) $("swClipLog").textContent = steps[i % steps.length];
      if (i >= 6) {
        clearInterval(clipTimer);
        clipTimer = null;
      }
    }, 700);
  }

  function renderSoftwareList() {
    const grid = $("swListGrid");
    if (!grid) return;
    const q = ($("swSearch")?.value || "").trim().toLowerCase();
    const cat = $("swCategory")?.value || "ALL";
    const list = SOFTWARE_200.filter((item) => {
      const okCat = cat === "ALL" || item.category === cat;
      const okQ = !q || item.name.toLowerCase().includes(q) || item.id.toLowerCase().includes(q);
      return okCat && okQ;
    });
    grid.innerHTML = "";
    list.forEach((item) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = `sw-card ${state.selectedSoftware?.id === item.id ? "active" : ""}`;
      card.innerHTML = `
        <div class="sw-card-top"><span>${esc(item.id)} • ${esc(item.category)}</span><span class="sw-price">${esc(item.price)}</span></div>
        <strong>${esc(item.name)}</strong>
      `;
      card.addEventListener("click", () => {
        renderSoftwareList();
        playClip(item);
      });
      grid.appendChild(card);
    });
  }

  function getStandaloneHtml() {
    return (state.files["index.html"] || "")
      .replace(/<link[^>]*href=["']style\.css["'][^>]*>/i, `<style>${state.files["style.css"] || ""}</style>`)
      .replace(/<script[^>]*src=["']app\.js["'][^>]*><\/script>/i, `<script>${state.files["app.js"] || ""}<\/script>`);
  }

  $("navStudio")?.addEventListener("click", () => switchView("studio"));
  $("navSoftware")?.addEventListener("click", () => switchView("software"));

  $("btnBoostVisual")?.addEventListener("click", () => {
    const next = (paletteKeys.indexOf(state.paletteKey) + 1) % paletteKeys.length;
    state.paletteKey = paletteKeys[next];
    if ($("paletteSelect")) $("paletteSelect").value = state.paletteKey;
    state.variantNum += 1;
    compileProject();
    setStatus(`Нова HD визия #${state.variantNum} (${state.paletteKey}).`);
  });

  $("btnOneClickReady")?.addEventListener("click", () => {
    compileProject();
    setStatus("ONE-CLICK READY — готовият проект е обновен.");
  });

  $("btnDownloadAll")?.addEventListener("click", () => {
    compileProject();
    const blob = new Blob([getStandaloneHtml()], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${state.bizId}-project.html`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus(`Свален файл: ${state.bizId}-project.html`);
  });

  $("btnOpenLive")?.addEventListener("click", async () => {
    compileProject();
    setStatus("Записване на сървъра...");
    try {
      const res = await fetch("/api/generate-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: state.title, files: state.files })
      });
      const data = await res.json();
      if (!res.ok || !data.ok || !data.previewUrl) throw new Error(data.error || "Грешка при запис.");
      state.lastPreviewUrl = data.previewUrl;
      setStatus(`Отворено: ${data.previewUrl}`);
      window.open(data.previewUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      setStatus(err.message || "Грешка при връзка със сървъра.");
    }
  });

  $("btnAddPhoto")?.addEventListener("click", () => {
    const u = ($("customPhotoUrl")?.value || "").trim();
    if (!u) return;
    state.photos.unshift(u);
    if ($("customPhotoUrl")) $("customPhotoUrl").value = "";
    compileProject();
    setStatus("Добавена е снимка.");
  });

  $("customPhotoFile")?.addEventListener("change", () => {
    const f = $("customPhotoFile")?.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      if (typeof r.result === "string") {
        state.photos.unshift(r.result);
        compileProject();
        setStatus(`Качена снимка: ${f.name}`);
      }
    };
    r.readAsDataURL(f);
  });

  $("bizTitleInput")?.addEventListener("input", compileProject);
  $("bizCityInput")?.addEventListener("input", compileProject);
  $("promptBox")?.addEventListener("input", compileProject);
  $("paletteSelect")?.addEventListener("change", compileProject);

  document.querySelectorAll(".ftab").forEach((t) => {
    t.addEventListener("click", () => {
      state.files[state.activeFile] = $("codeBox")?.value || "";
      state.activeFile = t.getAttribute("data-f") || "index.html";
      document.querySelectorAll(".ftab").forEach((x) => x.classList.toggle("active", x === t));
      if ($("codeBox")) $("codeBox").value = state.files[state.activeFile] || "";
    });
  });

  $("btnApplyCode")?.addEventListener("click", () => {
    state.files[state.activeFile] = $("codeBox")?.value || "";
    if ($("liveFrame")) $("liveFrame").srcdoc = getStandaloneHtml();
    setStatus(`Приложен код от ${state.activeFile}.`);
  });

  $("btnDownloadFile")?.addEventListener("click", () => {
    state.files[state.activeFile] = $("codeBox")?.value || "";
    const blob = new Blob([state.files[state.activeFile] || ""], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = state.activeFile;
    a.click();
    URL.revokeObjectURL(url);
    setStatus(`Свален файл: ${state.activeFile}`);
  });

  $("swSearch")?.addEventListener("input", renderSoftwareList);
  $("swCategory")?.addEventListener("change", renderSoftwareList);
  $("btnReplayClip")?.addEventListener("click", () => playClip(state.selectedSoftware));

  $("btnLoadIntoStudio")?.addEventListener("click", () => {
    if (!state.selectedSoftware) return;
    state.title = `${state.selectedSoftware.name} (${state.selectedSoftware.price})`;
    state.note = state.selectedSoftware.summary;
    if ($("bizTitleInput")) $("bizTitleInput").value = state.title;
    if ($("promptBox")) $("promptBox").value = state.note;
    switchView("studio");
    compileProject();
    setStatus(`Заредено в STUDIO: ${state.selectedSoftware.id}`);
  });

  $("contactForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const st = $("cStatus");
    const name = ($("cName")?.value || "").trim();
    const email = ($("cEmail")?.value || "").trim();
    const message = ($("cMsg")?.value || "").trim();
    if (!name || !email || !message) return;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject: state.title, message })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Грешка");
      if (st) st.textContent = "Изпратено успешно.";
      e.target.reset();
    } catch (err) {
      if (st) st.textContent = err.message;
    }
  });

  if ($("bizTitleInput")) $("bizTitleInput").value = state.title;
  if ($("bizCityInput")) $("bizCityInput").value = state.city;
  if ($("promptBox")) $("promptBox").value = state.note;

  renderBizTabs();
  compileProject();
})();
