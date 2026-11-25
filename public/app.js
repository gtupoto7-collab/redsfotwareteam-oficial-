const BIZ_TEMPLATES = [
  {
    id: "roadside",
    name: "Putna mosht / Avtopomosh",
    defaultTitle: "PUTNA MOSHT 24/7 — BULGARIA",
    defaultCity: "Pernik • Sofiq • Magistrali",
    services: [
      { title: "Repatrak & Transport", desc: "Buzro natovarvane na leki koli, dzipove i busove." },
      { title: "Podavane na tok & Gumi", desc: "Start na akumulator, smqna na guma i dostavka na gorivo." },
      { title: "Izvazhdane ot kanavki", desc: "Tezhka tehnika i vadenie pri tezhki putni usloviq." }
    ],
    photos: [
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "construction",
    name: "Stroitelstvo & Remonti",
    defaultTitle: "STROITELEN CENTUR — BG",
    defaultCity: "Pernik & Sofiq Oblast",
    services: [
      { title: "Grub stroezh & Pokrivi", desc: "Stabilni konstrukcii, zidariq i pokrivni sistemi." },
      { title: "Vutreshni remonti & Zamazki", desc: "Gipsokarton, zamazki, shpaklovki i podovi naglasi." },
      { title: "Toplolizolaciq & Fasadi", desc: "Energiina efektivnost i izdruzlivi fasadni resheniq." }
    ],
    photos: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "autoservice",
    name: "Avtoserviz & Detailing",
    defaultTitle: "PRO AUTO LAB BULGARIA",
    defaultCity: "Sofiq • Pernik",
    services: [
      { title: "Diagnostika & Hodova chast", desc: "Kompyuturna diagnostika, spirachki i okachvane." },
      { title: "Polirane & Keramika", desc: "Zashitni pokritiq, glanc i vutreshen detailing." },
      { title: "Masla, filtri & Obzluzhvane", desc: "Pulen redoven servis za avtomobila." }
    ],
    photos: [
      "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "shop",
    name: "Onlain Magazin BG",
    defaultTitle: "BG MARKET PRO",
    defaultCity: "Dostavka v cqlata strana",
    services: [
      { title: "Katalog s nalichnosti", desc: "Burzo tursene, filtrirane i poruchka." },
      { title: "Kurierrska dostavka", desc: "Ekspresna dostavka s pregled i test." },
      { title: "Promocii & Paketi", desc: "Komplekti i specialni oferti za klienti." }
    ],
    photos: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: "ai-tech",
    name: "AI & IT Kompaniq",
    defaultTitle: "RED SOFTWARE TEAM — AI",
    defaultCity: "Bulgaria • Global",
    services: [
      { title: "Ueb & Prilojeniq", desc: "Saitove, platformi i avtomatizirani sistemi." },
      { title: "AI Avtomatizacii", desc: "Botove, asistenti i obrabotka na danni." },
      { title: "Kibersigurnost & Hosting", desc: "Zashtita, stabilnost i upravlenie na proekti." }
    ],
    photos: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=80"
    ]
  }
];

const PALETTES = {
  "cyber-red": { primary: "#ff1e42", glow: "rgba(255, 30, 66, 0.35)", bg: "#05070d", card: "#0d1220" },
  "electric-cyan": { primary: "#00e5ff", glow: "rgba(0, 229, 255, 0.32)", bg: "#040914", card: "#0a1628" },
  "toxic-emerald": { primary: "#10b981", glow: "rgba(16, 185, 129, 0.32)", bg: "#040d0a", card: "#0a1d17" },
  "royal-gold": { primary: "#f59e0b", glow: "rgba(245, 158, 11, 0.32)", bg: "#0c0905", card: "#1c150a" }
};

const paletteOrder = Object.keys(PALETTES);

const state = {
  bizId: "roadside",
  title: "PUTNA MOSHT 24/7 — BULGARIA",
  city: "Pernik • Sofiq • Magistrali",
  paletteKey: "cyber-red",
  variantNum: 1,
  note: "24/7 reakciq, burz priem na obazhdaniq i zayavki.",
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

function compileProject() {
  const biz = getCurrentBiz();
  const pal = PALETTES[state.paletteKey] || PALETTES["cyber-red"];

  const css = `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: ${pal.bg};
  color: #f8fafc;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  padding: 20px;
  background-image: radial-gradient(circle at 20% 0%, ${pal.glow}, transparent 45%);
}
.shell { max-width: 1120px; margin: 0 auto; }
.hero {
  background: ${pal.card};
  border: 1px solid ${pal.primary};
  box-shadow: 0 0 28px ${pal.glow};
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 18px;
}
.tag { color: ${pal.primary}; font-size: 0.78rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; }
h1 { font-size: 2rem; margin: 6px 0 8px; }
.sub { color: #cbd5e1; font-size: 0.96rem; margin-bottom: 14px; }
.cta-btn {
  background: ${pal.primary}; color: #05070c; border: 0; border-radius: 8px;
  padding: 10px 18px; font-weight: 900; cursor: pointer; font-size: 0.88rem;
}
.grid3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 18px; }
.card {
  background: ${pal.card}; border: 1px solid rgba(255,255,255,0.14);
  border-radius: 12px; padding: 16px;
}
.card h3 { color: ${pal.primary}; font-size: 1.02rem; margin-bottom: 6px; }
.card p { color: #cbd5e1; font-size: 0.86rem; }
.gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 10px; }
.gallery img {
  width: 100%; height: 170px; object-fit: cover; border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.16);
}
@media (max-width: 820px) { .grid3 { grid-template-columns: 1fr; } }`;

  const cardsHtml = biz.services
    .map((s) => `<div class="card"><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p></div>`)
    .join("\n      ");

  const galleryHtml = state.photos
    .map((src, i) => `<img src="${esc(src)}" alt="Snimka ${i + 1} za ${esc(state.title)}">`)
    .join("\n      ");

  const html = `<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(state.title)}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="shell">
    <section class="hero">
      <div class="tag">${esc(biz.name)} • ${esc(state.city)} • V${state.variantNum}</div>
      <h1>${esc(state.title)}</h1>
      <p class="sub">${esc(state.note)}</p>
      <button id="actionPing" class="cta-btn" type="button">ZAQVI USLUGA / KONTAKT</button>
      <div id="pingOut" style="margin-top:10px;font-size:0.86rem;color:#e2e8f0;"></div>
    </section>

    <section class="grid3">
      ${cardsHtml}
    </section>

    <section class="gallery">
      ${galleryHtml}
    </section>
  </div>
  <script src="app.js"></script>
</body>
</html>`;

  const js = `document.getElementById("actionPing")?.addEventListener("click", () => {
  const el = document.getElementById("pingOut");
  if (el) el.textContent = "Aktivna zayavka za ${esc(state.title)} (${esc(state.city)}) — tel. 0879 813 928.";
});`;

  state.files = {
    "index.html": html,
    "style.css": css,
    "app.js": js
  };
  state.lastPreviewUrl = "";
  variantLabel.textContent = `Variant #${state.variantNum} (${state.paletteKey})`;
  codeBox.value = state.files[state.activeFile] || "";

  const standalone = html
    .replace(/<link[^>]*href=["']style\.css["'][^>]*>/i, `<style>${css}</style>`)
    .replace(/<script[^>]*src=["']app\.js["'][^>]*><\/script>/i, `<script>${js}<\/script>`);

  liveFrame.srcdoc = standalone;
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
      statusMsg.textContent = `Zareden shablon: ${b.name}`;
    });
    bizTabsEl.appendChild(btn);
  });
}

function syncInputsToState() {
  if (titleInp.value.trim()) state.title = titleInp.value.trim();
  if (cityInp.value.trim()) state.city = cityInp.value.trim();
  if (promptBox.value.trim()) state.note = promptBox.value.trim();
  state.paletteKey = paletteSel.value;
}

titleInp.addEventListener("input", () => { syncInputsToState(); compileProject(); });
cityInp.addEventListener("input", () => { syncInputsToState(); compileProject(); });
promptBox.addEventListener("input", () => { syncInputsToState(); compileProject(); });
paletteSel.addEventListener("change", () => { syncInputsToState(); compileProject(); });

document.getElementById("btnBoostVisual")?.addEventListener("click", () => {
  syncInputsToState();
  const nextIdx = (paletteOrder.indexOf(state.paletteKey) + 1) % paletteOrder.length;
  state.paletteKey = paletteOrder[nextIdx];
  paletteSel.value = state.paletteKey;
  state.variantNum += 1;
  compileProject();
  statusMsg.textContent = `Nova viziq #${state.variantNum} s cvetova shema ${state.paletteKey}.`;
});

document.getElementById("btnOneClickReady")?.addEventListener("click", () => {
  syncInputsToState();
  compileProject();
  statusMsg.textContent = "ONE-CLICK READY — produktut e gotov na jivo i za svalqne.";
});

document.getElementById("btnAddPhoto")?.addEventListener("click", () => {
  const url = photoUrlInp.value.trim();
  if (url) {
    state.photos.unshift(url);
    photoUrlInp.value = "";
    compileProject();
    statusMsg.textContent = "Dobavena e nova snimka kum vizijata.";
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
      statusMsg.textContent = `Kachena snimka: ${file.name}`;
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
  statusMsg.textContent = `Prilojeni promeni ot ${state.activeFile}.`;
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
  statusMsg.textContent = `Svalen fail: ${state.activeFile}`;
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
  a.download = `${state.bizId}-fullhd.html`;
  a.click();
  URL.revokeObjectURL(url);
  statusMsg.textContent = `Svalen gotov sait: ${state.bizId}-fullhd.html`;
});

document.getElementById("btnOpenLive")?.addEventListener("click", async () => {
  compileProject();
  statusMsg.textContent = "Zapazvane i otvarqne na jivo...";
  try {
    const res = await fetch("/api/generate-save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: state.title, files: state.files })
    });
    const data = await res.json();
    if (!res.ok || !data.ok || !data.previewUrl) throw new Error(data.error || "Greshka");
    state.lastPreviewUrl = data.previewUrl;
    statusMsg.textContent = `Otvoreno: ${data.previewUrl}`;
    window.open(data.previewUrl, "_blank", "noopener,noreferrer");
  } catch (e) {
    statusMsg.textContent = e.message || "Nema vruzka sus survura.";
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
    if (!res.ok || !data.ok) throw new Error(data.error || "Greshka");
    cStatus.textContent = "Zapitvaneto e izprateno.";
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
