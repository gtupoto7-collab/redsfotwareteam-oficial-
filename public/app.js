const BIZ_TEMPLATES = [
  {
    id: "roadside",
    name: "Пътна помощ / Автопомощ",
    defaultTitle: "ПЪТНА МОЩ 24/7 — БЪЛГАРИЯ",
    defaultCity: "Перник • София • Магистрали",
    services: [
      { title: "Репатрак и транспорт", desc: "Бързо и безопасно натоварване на леки автомобили, джипове и ванове." },
      { title: "Подаване на ток и гуми", desc: "Стартов ток при паднал акумулатор, смяна на гума и доставка на гориво." },
      { title: "Изваждане при тежки условия", desc: "Професионална намеса при канавки, кал, сняг и аварирали превозни средства." }
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
      { title: "Груб строеж и покриви", desc: "Стабилни конструкции, зидария, кофраж и надеждни покривни системи." },
      { title: "Вътрешни ремонти и замазки", desc: "Гипсокартон, шпакловки, машинни замазки и прецизни довършителни работи." },
      { title: "Топлоизолация и фасади", desc: "Енергийна ефективност и дълготрайни фасадни покрития." }
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
      { title: "Диагностика и ходова част", desc: "Компютърна диагностика, спирачни системи, окачване и реглаж." },
      { title: "Полиране и керамика", desc: "Многоетапно полиране, защитни покрития и интериорен детайлинг." },
      { title: "Обслужване и масла", desc: "Смяна на масла, филтри и пълна техническа профилактика." }
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
    defaultCity: "Доставка в цяла България",
    services: [
      { title: "Подбран каталог", desc: "Ясни категории, актуални наличности и прозрачни цени." },
      { title: "Експресна доставка", desc: "Бърза куриерска доставка с опция за преглед и тест." },
      { title: "Пакетни оферти", desc: "Изгодни комплекти и специални условия за редовни клиенти." }
    ],
    photos: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1000&q=85"
    ]
  },
  {
    id: "hospitality",
    name: "Ресторант и заведения",
    defaultTitle: "LA TABLE & LOUNGE",
    defaultCity: "София • Пловдив • Варна",
    services: [
      { title: "Авторско меню", desc: "Подбрани ястия, свежи съставки и балансирани вкусове." },
      { title: "Резервации и събития", desc: "Организация на частни вечери, фирмени срещи и специални поводи." },
      { title: "Доставка до врата", desc: "Бързо и грижливо опаковане за пълно запазване на качеството." }
    ],
    photos: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85"
    ]
  },
  {
    id: "ai-tech",
    name: "AI и софтуерна компания",
    defaultTitle: "RED SOFTWARE TEAM",
    defaultCity: "България • Международни проекти",
    services: [
      { title: "Уеб системи и приложения", desc: "Модерни уеб платформи, интерфейси и сървърни API услуги." },
      { title: "AI автоматизация", desc: "Интелигентни потоци, асистенти и автоматизация на процеси." },
      { title: "Сигурност и хостинг", desc: "Надеждна инфраструктура, проверки и устойчива работа." }
    ],
    photos: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1000&q=85"
    ]
  }
];

const PALETTES = {
  "crimson-hd": {
    primary: "#ef233c",
    glow: "rgba(239, 35, 60, 0.28)",
    bg: "#07090e",
    surface: "#101624",
    border: "rgba(239, 35, 60, 0.45)"
  },
  "cobalt-hd": {
    primary: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.26)",
    bg: "#060a12",
    surface: "#0e1729",
    border: "rgba(56, 189, 248, 0.45)"
  },
  "emerald-hd": {
    primary: "#10b981",
    glow: "rgba(16, 185, 129, 0.26)",
    bg: "#050c09",
    surface: "#0c1d17",
    border: "rgba(16, 185, 129, 0.45)"
  },
  "amber-hd": {
    primary: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.26)",
    bg: "#0c0905",
    surface: "#1b1409",
    border: "rgba(245, 158, 11, 0.45)"
  }
};

const paletteKeys = Object.keys(PALETTES);

const state = {
  bizId: "roadside",
  title: "ПЪТНА МОЩ 24/7 — БЪЛГАРИЯ",
  city: "Перник • София • Магистрали",
  paletteKey: "crimson-hd",
  variantNum: 1,
  note: "Денонощна реакция, професионално обслужване и ясни условия за клиенти.",
  photos: [...BIZ_TEMPLATES[0].photos],
  files: {},
  activeFile: "index.html",
  lastPreviewUrl: ""
};

const bizTabsEl = document.getElementById("bizTabs");
const titleInp = document.getElementById("bizTitleInput");
const cityInp = document.getElementById("bizCityInput");
const paletteSel = document.getElementById("paletteSelect");
const promptBox = document.getElementById("promptBox");
const photoUrlInp = document.getElementById("customPhotoUrl");
const photoFileInp = document.getElementById("customPhotoFile");
const codeBox = document.getElementById("codeBox");
const liveFrame = document.getElementById("liveFrame");
const statusMsg = document.getElementById("statusMsg");
const variantLabel = document.getElementById("variantLabel");

function esc(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getCurrentBiz() {
  return BIZ_TEMPLATES.find((b) => b.id === state.bizId) || BIZ_TEMPLATES[0];
}

function applyRootPalette(key) {
  const pal = PALETTES[key] || PALETTES["crimson-hd"];
  document.documentElement.style.setProperty("--accent", pal.primary);
  document.documentElement.style.setProperty("--accent-glow", pal.glow);
}

function compileProject() {
  const biz = getCurrentBiz();
  const pal = PALETTES[state.paletteKey] || PALETTES["crimson-hd"];
  applyRootPalette(state.paletteKey);

  const css = `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: ${pal.bg};
  color: #f8fafc;
  font-family: Inter, system-ui, -apple-system, sans-serif;
  padding: 24px;
  background-image: radial-gradient(circle at 18% 0%, ${pal.glow}, transparent 42%);
}
.wrap { max-width: 1120px; margin: 0 auto; }
.hero {
  background: linear-gradient(145deg, ${pal.surface}, rgba(10, 14, 24, 0.96));
  border: 1px solid ${pal.border};
  box-shadow: 0 18px 42px ${pal.glow};
  border-radius: 18px;
  padding: 28px;
  margin-bottom: 18px;
}
.kicker {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${pal.primary};
  margin-bottom: 8px;
}
h1 { font-size: clamp(1.7rem, 3.2vw, 2.4rem); font-weight: 800; letter-spacing: -0.02em; margin-bottom: 10px; }
.sub { color: #cbd5e1; font-size: 0.96rem; max-width: 720px; margin-bottom: 18px; }
.cta {
  background: ${pal.primary}; color: #ffffff; border: 0; border-radius: 10px;
  padding: 11px 20px; font-size: 0.86rem; font-weight: 800; cursor: pointer;
}
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 18px; }
.card {
  background: ${pal.surface}; border: 1px solid rgba(255,255,255,0.12);
  border-radius: 14px; padding: 18px;
}
.card h3 { color: ${pal.primary}; font-size: 1rem; margin-bottom: 6px; }
.card p { color: #cbd5e1; font-size: 0.88rem; }
.media-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; }
.media-grid img {
  width: 100%; height: 190px; object-fit: cover; border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.14);
}
@media (max-width: 820px) { .cards { grid-template-columns: 1fr; } }`;

  const cardsHtml = biz.services
    .map((s) => `<div class="card"><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p></div>`)
    .join("\n    ");

  const imgsHtml = state.photos
    .map((src, i) => `<img src="${esc(src)}" alt="${esc(state.title)} — кадър ${i + 1}">`)
    .join("\n    ");

  const html = `<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(state.title)}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="wrap">
    <section class="hero">
      <div class="kicker">${esc(biz.name)} • ${esc(state.city)} • HD V${state.variantNum}</div>
      <h1>${esc(state.title)}</h1>
      <p class="sub">${esc(state.note)}</p>
      <button id="ctaBtn" class="cta" type="button">СВЪРЖИ СЕ С НАС</button>
      <div id="ctaOut" style="margin-top:12px;font-size:0.88rem;color:#e2e8f0;"></div>
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
  const out = document.getElementById("ctaOut");
  if (out) out.textContent = "Активна връзка за ${esc(state.title)} (${esc(state.city)}) — тел. 0879 813 928.";
});`;

  state.files = {
    "index.html": html,
    "style.css": css,
    "app.js": js
  };
  state.lastPreviewUrl = "";
  variantLabel.textContent = `Вариант #${state.variantNum} • ${state.paletteKey}`;
  codeBox.value = state.files[state.activeFile] || "";

  liveFrame.srcdoc = html
    .replace(/<link[^>]*href=["']style\.css["'][^>]*>/i, `<style>${css}</style>`)
    .replace(/<script[^>]*src=["']app\.js["'][^>]*><\/script>/i, `<script>${js}<\/script>`);
}

function renderBizTabs() {
  bizTabsEl.innerHTML = "";
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
      titleInp.value = state.title;
      cityInp.value = state.city;
      renderBizTabs();
      compileProject();
      statusMsg.textContent = `Зареден шаблон: ${b.name}`;
    });
    bizTabsEl.appendChild(btn);
  });
}

function syncInputs() {
  if (titleInp.value.trim()) state.title = titleInp.value.trim();
  if (cityInp.value.trim()) state.city = cityInp.value.trim();
  if (promptBox.value.trim()) state.note = promptBox.value.trim();
  state.paletteKey = paletteSel.value;
}

titleInp.addEventListener("input", () => { syncInputs(); compileProject(); });
cityInp.addEventListener("input", () => { syncInputs(); compileProject(); });
promptBox.addEventListener("input", () => { syncInputs(); compileProject(); });
paletteSel.addEventListener("change", () => { syncInputs(); compileProject(); });

document.getElementById("btnBoostVisual")?.addEventListener("click", () => {
  syncInputs();
  const next = (paletteKeys.indexOf(state.paletteKey) + 1) % paletteKeys.length;
  state.paletteKey = paletteKeys[next];
  paletteSel.value = state.paletteKey;
  state.variantNum += 1;
  compileProject();
  statusMsg.textContent = `Нова HD визия #${state.variantNum} (${state.paletteKey}).`;
});

document.getElementById("btnOneClickReady")?.addEventListener("click", () => {
  syncInputs();
  compileProject();
  statusMsg.textContent = "ONE-CLICK READY — проектът е готов за преглед и сваляне.";
});

document.getElementById("btnAddPhoto")?.addEventListener("click", () => {
  const url = photoUrlInp.value.trim();
  if (url) {
    state.photos.unshift(url);
    photoUrlInp.value = "";
    compileProject();
    statusMsg.textContent = "Добавена е снимка към проекта.";
  }
});

photoFileInp.addEventListener("change", () => {
  const file = photoFileInp.files && photoFileInp.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    if (typeof reader.result === "string") {
      state.photos.unshift(reader.result);
      compileProject();
      statusMsg.textContent = `Качена снимка: ${file.name}`;
    }
  };
  reader.readAsDataURL(file);
});

document.querySelectorAll(".ftab").forEach((t) => {
  t.addEventListener("click", () => {
    state.files[state.activeFile] = codeBox.value;
    state.activeFile = t.getAttribute("data-f");
    document.querySelectorAll(".ftab").forEach((x) => x.classList.toggle("active", x === t));
    codeBox.value = state.files[state.activeFile] || "";
  });
});

document.getElementById("btnApplyCode")?.addEventListener("click", () => {
  state.files[state.activeFile] = codeBox.value;
  const html = state.files["index.html"] || "";
  const css = state.files["style.css"] || "";
  const js = state.files["app.js"] || "";
  liveFrame.srcdoc = html
    .replace(/<link[^>]*href=["']style\.css["'][^>]*>/i, `<style>${css}</style>`)
    .replace(/<script[^>]*src=["']app\.js["'][^>]*><\/script>/i, `<script>${js}<\/script>`);
  statusMsg.textContent = `Приложени промени от ${state.activeFile}.`;
});

document.getElementById("btnDownloadFile")?.addEventListener("click", () => {
  state.files[state.activeFile] = codeBox.value;
  const blob = new Blob([state.files[state.activeFile] || ""], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = state.activeFile;
  a.click();
  URL.revokeObjectURL(url);
  statusMsg.textContent = `Свален файл: ${state.activeFile}`;
});

document.getElementById("btnDownloadAll")?.addEventListener("click", () => {
  compileProject();
  const standalone = (state.files["index.html"] || "")
    .replace(/<link[^>]*href=["']style\.css["'][^>]*>/i, `<style>${state.files["style.css"] || ""}</style>`)
    .replace(/<script[^>]*src=["']app\.js["'][^>]*><\/script>/i, `<script>${state.files["app.js"] || ""}<\/script>`);
  const blob = new Blob([standalone], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${state.bizId}-hd.html`;
  a.click();
  URL.revokeObjectURL(url);
  statusMsg.textContent = `Свален проект: ${state.bizId}-hd.html`;
});

document.getElementById("btnOpenLive")?.addEventListener("click", async () => {
  compileProject();
  statusMsg.textContent = "Записване и отваряне на живо...";
  try {
    const res = await fetch("/api/generate-save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: state.title, files: state.files })
    });
    const data = await res.json();
    if (!res.ok || !data.ok || !data.previewUrl) throw new Error(data.error || "Грешка");
    state.lastPreviewUrl = data.previewUrl;
    statusMsg.textContent = `Отворено: ${data.previewUrl}`;
    window.open(data.previewUrl, "_blank", "noopener,noreferrer");
  } catch (e) {
    statusMsg.textContent = e.message || "Няма връзка със сървъра.";
  }
});

document.getElementById("contactForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const cStatus = document.getElementById("cStatus");
  const name = document.getElementById("cName").value.trim();
  const email = document.getElementById("cEmail").value.trim();
  const message = document.getElementById("cMsg").value.trim();
  if (!name || !email || !message) return;

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        subject: `${state.title} (${state.bizId})`,
        message
      })
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error || "Грешка");
    cStatus.textContent = "Запитването е изпратено.";
    e.target.reset();
  } catch (err) {
    cStatus.textContent = err.message;
  }
});

titleInp.value = state.title;
cityInp.value = state.city;
promptBox.value = state.note;
renderBizTabs();
compileProject();
