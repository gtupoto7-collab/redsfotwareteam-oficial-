(() => {
  const state = {
    projectId: null,
    files: {},
    activeFile: "index.html",
    mobile: false,
    codeOpen: false
  };

  const $ = (id) => document.getElementById(id);

  const STEPS = [
    "АНАЛИЗИРА ИДЕЯТА",
    "ИЗБИРА АРХИТЕКТУРА",
    "СЪЗДАВА ДИЗАЙНА",
    "СЪЗДАВА СТРАНИЦИТЕ",
    "ПИШЕ КОДА",
    "ПУСКА LIVE PREVIEW",
    "ПРОВЕРЯВА"
  ];

  function renderPreview() {
    const frame = $("siteFrame");
    if (!frame) return;
    const html = state.files["index.html"] || "";
    const css = state.files["src/styles/main.css"] || "";
    const js = state.files["src/app/main.js"] || "";

    let doc = html;
    if (/<link[^>]*href=["']src\/styles\/main\.css["'][^>]*>/i.test(doc)) {
      doc = doc.replace(/<link[^>]*href=["']src\/styles\/main\.css["'][^>]*>/i, `<style>${css}</style>`);
    } else if (doc.includes("</head>")) {
      doc = doc.replace("</head>", `<style>${css}</style>\n</head>`);
    }

    const safeJs = js.replace(/<\/script>/gi, "<\\/script>");
    if (/<script[^>]*src=["']src\/app\/main\.js["'][^>]*><\/script>/i.test(doc)) {
      doc = doc.replace(/<script[^>]*src=["']src\/app\/main\.js["'][^>]*><\/script>/i, `<script>${safeJs}<\/script>`);
    } else if (doc.includes("</body>")) {
      doc = doc.replace("</body>", `<script>${safeJs}<\/script>\n</body>`);
    }

    frame.srcdoc = doc;
  }

  function renderCodeEditor() {
    const sel = $("codeFileSel");
    const area = $("codeArea");
    const names = Object.keys(state.files || {});
    if (!sel || !area || !names.length) return;
    if (!state.files[state.activeFile]) state.activeFile = names[0];

    sel.innerHTML = "";
    names.forEach((n) => {
      const opt = document.createElement("option");
      opt.value = n;
      opt.textContent = n;
      opt.selected = n === state.activeFile;
      sel.appendChild(opt);
    });
    area.value = state.files[state.activeFile] ?? "";
  }

  async function runFlowSteps() {
    const el = $("flowStatus");
    for (const s of STEPS) {
      if (el) el.textContent = s;
      await new Promise((r) => setTimeout(r, 140));
    }
  }

  async function generateWebsite() {
    const prompt = ($("promptBox")?.value || "").trim() ||
      "Искам модерен сайт за строителна компания с Home, Services, Projects и Contact. Черно-златен стил, премиум визия.";

    if ($("btnGenerateSite")) $("btnGenerateSite").disabled = true;
    await runFlowSteps();

    try {
      const res = await fetch("/api/projects/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, targetType: "Website" })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Грешка при създаване.");

      state.projectId = data.projectId;
      state.files = data.files || {};

      if ($("startScreen")) $("startScreen").style.display = "none";
      if ($("workScreen")) $("workScreen").style.display = "flex";
      if ($("projectInfo")) $("projectInfo").textContent = `Проект: ${state.projectId}`;
      if ($("workMsg")) $("workMsg").textContent = "Сайтът е готов в прегледа на живо.";

      renderPreview();
      renderCodeEditor();
    } catch (err) {
      if ($("flowStatus")) $("flowStatus").textContent = err.message;
    } finally {
      if ($("btnGenerateSite")) $("btnGenerateSite").disabled = false;
    }
  }

  async function applyChange(payload) {
    if (!state.projectId) return;
    if ($("workMsg")) $("workMsg").textContent = "Прилагане на промяната...";
    try {
      const res = await fetch(`/api/projects/${encodeURIComponent(state.projectId)}/improve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Грешка.");
      state.files = data.files || state.files;
      renderPreview();
      renderCodeEditor();
      if ($("workMsg")) $("workMsg").textContent = "Промяната е приложена.";
    } catch (err) {
      if ($("workMsg")) $("workMsg").textContent = err.message;
    }
  }

  async function publishWebsite() {
    if (!state.projectId) return;
    if ($("workMsg")) $("workMsg").textContent = "Проверка и публикуване...";
    try {
      await fetch(`/api/projects/${encodeURIComponent(state.projectId)}/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ autoFix: true })
      });
      const res = await fetch(`/api/projects/${encodeURIComponent(state.projectId)}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Грешка при публикуване.");
      if ($("publishResult")) {
        $("publishResult").innerHTML = `Публикувано: <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" style="color:#93c5fd;">${data.liveUrl}</a>`;
      }
      if ($("workMsg")) $("workMsg").textContent = "Готово за споделяне.";
    } catch (err) {
      if ($("workMsg")) $("workMsg").textContent = err.message;
    }
  }

  $("btnGenerateSite")?.addEventListener("click", generateWebsite);

  $("btnNewPrompt")?.addEventListener("click", () => {
    if ($("workScreen")) $("workScreen").style.display = "none";
    if ($("startScreen")) $("startScreen").style.display = "flex";
    if ($("flowStatus")) $("flowStatus").textContent = "";
    if ($("publishResult")) $("publishResult").textContent = "";
  });

  document.querySelectorAll("[data-act]").forEach((btn) => {
    btn.addEventListener("click", () => applyChange({ action: btn.getAttribute("data-act") }));
  });

  $("btnAskAi")?.addEventListener("click", () => {
    const row = $("askRow");
    if (!row) return;
    row.style.display = row.style.display === "none" ? "grid" : "none";
    $("askInput")?.focus();
  });

  $("btnSendAsk")?.addEventListener("click", () => {
    const instruction = ($("askInput")?.value || "").trim();
    if (!instruction) return;
    applyChange({ instruction });
    if ($("askInput")) $("askInput").value = "";
  });

  $("btnMobileToggle")?.addEventListener("click", () => {
    state.mobile = !state.mobile;
    $("siteFrame")?.classList.toggle("mobile-view", state.mobile);
    $("btnMobileToggle")?.classList.toggle("active", state.mobile);
  });

  $("btnCodeToggle")?.addEventListener("click", () => {
    state.codeOpen = !state.codeOpen;
    if ($("codeBox")) $("codeBox").style.display = state.codeOpen ? "flex" : "none";
    $("btnCodeToggle")?.classList.toggle("active", state.codeOpen);
    renderCodeEditor();
  });

  $("codeFileSel")?.addEventListener("change", (e) => {
    state.files[state.activeFile] = $("codeArea")?.value ?? "";
    state.activeFile = e.target.value;
    if ($("codeArea")) $("codeArea").value = state.files[state.activeFile] ?? "";
  });

  $("btnSaveCode")?.addEventListener("click", async () => {
    if (!state.projectId) return;
    state.files[state.activeFile] = $("codeArea")?.value ?? "";
    await fetch(`/api/projects/${encodeURIComponent(state.projectId)}/files`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ files: { [state.activeFile]: state.files[state.activeFile] } })
    });
    renderPreview();
    if ($("workMsg")) $("workMsg").textContent = `Запазен файл ${state.activeFile}.`;
  });

  $("btnPublishSite")?.addEventListener("click", publishWebsite);
})();

document.querySelectorAll("[data-preset]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const box = document.getElementById("promptBox");
    if (box) {
      box.value = btn.getAttribute("data-preset") || "";
      box.focus();
    }
  });
});

document.getElementById("btnDownloadHtml")?.addEventListener("click", () => {
  const frame = document.getElementById("siteFrame");
  const content = frame && frame.srcdoc ? frame.srcdoc : "";
  if (!content) return;
  const blob = new Blob([content], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "website.html";
  a.click();
  URL.revokeObjectURL(url);
  const msg = document.getElementById("workMsg");
  if (msg) msg.textContent = "Файлът website.html е свален.";
});

(() => {
  const fileInput = document.getElementById("refPhotoInput");
  const promptBox = document.getElementById("promptBox");
  const wrap = document.getElementById("refPhotoPreviewWrap");
  const img = document.getElementById("refPhotoPreview");
  const meta = document.getElementById("refPhotoMeta");

  if (!fileInput) return;

  fileInput.addEventListener("change", () => {
    const file = fileInput.files && fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") return;
      if (img) img.src = reader.result;
      if (wrap) wrap.style.display = "flex";
      if (meta) meta.textContent = `Избрана снимка: ${file.name} (${Math.round(file.size / 1024)} KB)`;

      if (promptBox && !promptBox.value.trim()) {
        const cleanName = file.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
        promptBox.value = `Искам модерен сайт вдъхновен от снимката (${cleanName || "AL стил"}) с Home, Services, About и Contact, ясна структура и силна визия.`;
      }
    };
    reader.readAsDataURL(file);
  });
})();

(() => {
  const fileInput = document.getElementById("refPhotoInput");
  const wrap = document.getElementById("refPhotoPreviewWrap");
  const img = document.getElementById("refPhotoPreview");
  const meta = document.getElementById("refPhotoMeta");
  const promptBox = document.getElementById("promptBox");

  if (!fileInput || !img) return;

  window.extractedPhotoPalette = null;

  function rgbToHex(r, g, b) {
    const toHex = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }

  function colorDist(a, b) {
    return Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b);
  }

  function extractColorsFromImage(imageEl) {
    const canvas = document.createElement("canvas");
    const size = 64;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(imageEl, 0, 0, size, size);
    const data = ctx.getImageData(0, 0, size, size).data;
    const buckets = new Map();

    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha < 128) continue;
      const r = Math.min(255, Math.floor(data[i] / 24) * 24 + 12);
      const g = Math.min(255, Math.floor(data[i + 1] / 24) * 24 + 12);
      const b = Math.min(255, Math.floor(data[i + 2] / 24) * 24 + 12);
      const key = `${r},${g},${b}`;
      const prev = buckets.get(key) || { r, g, b, count: 0 };
      prev.count += 1;
      buckets.set(key, prev);
    }

    const sorted = [...buckets.values()].sort((a, b) => b.count - a.count);
    const picked = [];
    for (const c of sorted) {
      if (picked.every((p) => colorDist(p, c) > 42)) {
        picked.push(c);
      }
      if (picked.length >= 5) break;
    }

    if (!picked.length) return null;

    const primary = picked[0];
    const accent =
      picked.find((c) => colorDist(c, primary) > 65) ||
      picked[1] ||
      primary;
    const secondary = picked[2] || accent;
    const lum = (0.299 * primary.r + 0.587 * primary.g + 0.114 * primary.b) / 255;

    return {
      isDark: lum < 0.45,
      bg: lum < 0.45 ? rgbToHex(primary.r * 0.35, primary.g * 0.35, primary.b * 0.35) : "#0B0F17",
      card: lum < 0.45 ? rgbToHex(primary.r * 0.65 + 14, primary.g * 0.65 + 14, primary.b * 0.65 + 18) : "#131A29",
      text: lum < 0.45 ? "#F8FAFC" : "#F8FAFC",
      accent: rgbToHex(accent.r, accent.g, accent.b),
      secondary: rgbToHex(secondary.r, secondary.g, secondary.b),
      swatches: picked.map((c) => rgbToHex(c.r, c.g, c.b))
    };
  }

  function renderSwatches(palette) {
    if (!wrap || !palette) return;
    let bar = document.getElementById("photoPaletteBar");
    if (!bar) {
      bar = document.createElement("div");
      bar.id = "photoPaletteBar";
      bar.className = "palette-swatches";
      wrap.appendChild(bar);
    }
    bar.innerHTML = palette.swatches
      .map(
        (hex) =>
          `<span class="swatch-pill"><span class="swatch-dot" style="background:${hex};"></span>${hex}</span>`
      )
      .join("");
  }

  function applyExtractedPaletteToFrame() {
    const pal = window.extractedPhotoPalette;
    const frame = document.getElementById("siteFrame");
    if (!pal || !frame || !frame.srcdoc) return;

    const liveCssOverride = `
<style id="extractedPhotoColors">
  :root {
    --bg: ${pal.bg} !important;
    --card: ${pal.card} !important;
    --text: ${pal.text} !important;
    --accent: ${pal.accent} !important;
  }
  body {
    background: ${pal.bg} !important;
    color: ${pal.text} !important;
  }
  .card, .hero {
    background: ${pal.card} !important;
    border-color: ${pal.accent} !important;
  }
  .btn.primary, .cta, button {
    background: ${pal.accent} !important;
    border-color: ${pal.secondary} !important;
  }
  a, h1, h2, h3, .badge {
    color: ${pal.accent} !important;
  }
</style>`;

    if (frame.srcdoc.includes('id="extractedPhotoColors"')) {
      frame.srcdoc = frame.srcdoc.replace(/<style id="extractedPhotoColors">[\s\S]*?<\/style>/i, liveCssOverride);
    } else if (frame.srcdoc.includes("</head>")) {
      frame.srcdoc = frame.srcdoc.replace("</head>", `${liveCssOverride}\n</head>`);
    }
  }

  img.addEventListener("load", () => {
    const pal = extractColorsFromImage(img);
    if (!pal) return;
    window.extractedPhotoPalette = pal;
    renderSwatches(pal);
    document.documentElement.style.setProperty("--accent", pal.accent);

    if (meta) {
      const baseText = meta.textContent.split(" | Цветове:")[0];
      meta.textContent = `${baseText} | Цветове: ${pal.swatches.join(", ")}`;
    }

    if (promptBox && (!promptBox.value.trim() || promptBox.value.includes("вдъхновен от снимката"))) {
      promptBox.value = `Създай модерен сайт с цветовете от снимката (${pal.swatches.join(", ")}) и основен акцент ${pal.accent}, с Home, Services, About и Contact.`;
    }

    applyExtractedPaletteToFrame();
  });

  const frame = document.getElementById("siteFrame");
  if (frame) {
    const observer = new MutationObserver(() => applyExtractedPaletteToFrame());
    observer.observe(frame, { attributes: true, attributeFilter: ["srcdoc"] });
  }
})();

(() => {
  const extraState = {
    productType: "AL — Автоматизация и решения",
    paymentMethod: "telegram-keeper",
    siteOptions: {
      mixCam: true,
      call: true,
      dashboard: true,
      register: true,
      admin: true
    }
  };

  const PAY_MESSAGES = {
    "telegram-keeper": {
      cls: "pay-ok",
      text: "Единствената опция без верификация: плащане през Telegram бот и изтегляне в Keeper след 22 дни — надежден начин за получаване на реални средства."
    },
    "card-bank": {
      cls: "pay-warn",
      text: "Карта / Банка: изисква верификация с официална банка или финансова институция. За поток без такава верификация се ползва Telegram бот → Keeper след 22 дни."
    },
    "crypto": {
      cls: "pay-warn",
      text: "Crypto: изисква верификация с официална банка или финансова институция при превод/обмен. Единствената опция без такава верификация е през Telegram бот и изтегляне в Keeper след 22 дни."
    },
    "telegram": {
      cls: "pay-ok",
      text: "Telegram: чрез Telegram бот средствата могат да се получават и след 22 дни да се вадят в Keeper без официална банкова/финансова верификация."
    },
    "paypal": {
      cls: "pay-warn",
      text: "PayPal: изисква верификация с официална банка или финансова институция. Без такава верификация надеждният път е Telegram бот → Keeper след 22 дни."
    },
    "revolut": {
      cls: "pay-warn",
      text: "Revolut: изисква верификация с официална банка или финансова институция. Без такава верификация единствената опция е през Telegram бот и вадене в Keeper след 22 дни."
    },
    "easypay": {
      cls: "pay-warn",
      text: "EasyPay: изисква верификация с официална банка или финансова институция. Без такава верификация единствената опция е през Telegram бот и вадене в Keeper след 22 дни."
    }
  };

  function updatePayNotice() {
    const notice = document.getElementById("payNotice");
    if (!notice) return;
    const info = PAY_MESSAGES[extraState.paymentMethod] || PAY_MESSAGES["telegram-keeper"];
    notice.className = `pay-notice ${info.cls}`;
    notice.textContent = info.text;
  }

  function syncMixCamState() {
    const chk = document.getElementById("optMixCam");
    if (!chk) return;
    const isAl = extraState.productType.startsWith("AL");
    chk.disabled = !isAl;
    if (!isAl) chk.checked = false;
    extraState.siteOptions.mixCam = chk.checked;
  }

  document.querySelectorAll("[data-ptype]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-ptype]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      extraState.productType = btn.getAttribute("data-ptype") || "AL — Автоматизация и решения";
      syncMixCamState();
    });
  });

  document.querySelectorAll("[data-pay]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-pay]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      extraState.paymentMethod = btn.getAttribute("data-pay") || "telegram-keeper";
      updatePayNotice();
    });
  });

  document.getElementById("btnToggleUpMenu")?.addEventListener("click", () => {
    const menu = document.getElementById("upwardMenu");
    if (!menu) return;
    syncMixCamState();
    menu.style.display = menu.style.display === "none" ? "flex" : "none";
  });

  function readUpOptions() {
    syncMixCamState();
    extraState.siteOptions = {
      mixCam: Boolean(document.getElementById("optMixCam")?.checked),
      call: Boolean(document.getElementById("optCall")?.checked),
      dashboard: Boolean(document.getElementById("optDashboard")?.checked),
      register: Boolean(document.getElementById("optRegister")?.checked),
      admin: Boolean(document.getElementById("optAdmin")?.checked)
    };
  }

  function injectModulesIntoFrame() {
    const frame = document.getElementById("siteFrame");
    if (!frame || !frame.srcdoc || frame.srcdoc.includes('id="redModulesDock"')) return;
    readUpOptions();
    const o = extraState.siteOptions;
    const payInfo = PAY_MESSAGES[extraState.paymentMethod] || PAY_MESSAGES["telegram-keeper"];

    const blockHtml = `
<section id="redModulesDock" style="max-width:1120px;margin:24px auto;padding:18px;border-radius:14px;background:rgba(15,23,42,0.88);border:1px solid rgba(255,255,255,0.16);color:#f8fafc;font-family:system-ui,sans-serif;">
  <div style="font-size:12px;font-weight:800;letter-spacing:0.08em;opacity:0.8;margin-bottom:8px;">МОДУЛИ (${extraState.productType}) • СТРОИТЕЛСТВО &amp; ПЪТНА ПОМОЩ</div>
  <div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
    ${o.mixCam ? `<div style="padding:8px 12px;border-radius:8px;background:rgba(239,35,60,0.18);border:1px solid #ef233c;font-weight:700;">MIX CAM (AL Live Feed)</div>` : ""}
    ${o.call ? `<a href="tel:0879813928" style="padding:8px 14px;border-radius:8px;background:#ef233c;color:#fff;text-decoration:none;font-weight:700;">ЗВЪНЕНЕ</a>` : ""}
    ${o.dashboard ? `<div style="padding:8px 12px;border-radius:8px;background:rgba(255,255,255,0.08);font-weight:700;">DASHBOARD</div>` : ""}
    ${o.register ? `<div style="padding:8px 12px;border-radius:8px;background:rgba(255,255,255,0.08);font-weight:700;">РЕГИСТРАЦИЯ</div>` : ""}
    ${o.admin ? `<div style="padding:8px 12px;border-radius:8px;background:rgba(255,255,255,0.08);font-weight:700;">ADMIN PASS / ADMIN ACC</div>` : ""}
  </div>
  <div style="padding:10px 12px;border-radius:10px;background:rgba(255,255,255,0.05);font-size:13px;">
    <strong>Плащания:</strong> ${payInfo.text}
  </div>
</section>`;

    if (frame.srcdoc.includes("</body>")) {
      frame.srcdoc = frame.srcdoc.replace("</body>", `${blockHtml}\n</body>`);
    }
  }

  document.getElementById("btnApplyUpMenu")?.addEventListener("click", () => {
    readUpOptions();
    const frame = document.getElementById("siteFrame");
    if (frame && frame.srcdoc) {
      frame.srcdoc = frame.srcdoc.replace(/<section id="redModulesDock"[\s\S]*?<\/section>/i, "");
      injectModulesIntoFrame();
    }
    const menu = document.getElementById("upwardMenu");
    if (menu) menu.style.display = "none";
    const msg = document.getElementById("workMsg");
    if (msg) msg.textContent = "Опциите от менюто нагоре са приложени в сайта.";
  });

  document.getElementById("btnGenerateSite")?.addEventListener("click", () => {
    readUpOptions();
    setTimeout(injectModulesIntoFrame, 900);
  });

  syncMixCamState();
  updatePayNotice();
})();

(() => {
  const startScreen = document.getElementById("startScreen");
  const genBtn = document.getElementById("btnGenerateSite");
  if (!startScreen || !genBtn) return;

  const TOR_HOSTS = [
    {
      id: "host-1",
      name: "1. Onion VPS / Dedicated Hidden Host",
      meta: "Пълен контрол над Tor daemon и Nginx/Apache, подходящо за постоянен .onion сайт и по-голям трафик."
    },
    {
      id: "host-2",
      name: "2. Managed Onion Web Hosting",
      meta: "По-бърз старт с готов уеб стек — по-лесно за качване на готови файлове без ръчна настройка на сървъра."
    },
    {
      id: "host-3",
      name: "3. Self-Hosted Tor Bridge / Node",
      meta: "Максимална автономност върху собствен сървър или изолирана машина с локален HiddenServicePort."
    }
  ];

  const torState = {
    enabled: false,
    selectedHost: TOR_HOSTS[0],
    uploader: "client" // "client" | "team"
  };

  const torBox = document.createElement("div");
  torBox.className = "tor-box";
  torBox.innerHTML = `
    <div class="tor-header">
      <label class="up-opt" style="margin:0;">
        <input type="checkbox" id="chkTorBuild">
        <span>BUILD ЗА TOR / DARKNET (.ONION) — плащане на хостинга от клиента</span>
      </label>
      <span class="tor-badge">TOR .ONION MODE</span>
    </div>

    <div id="torConfigBody" style="display:none;flex-direction:column;gap:10px;">
      <div class="tor-hosts-grid" id="torHostsGrid"></div>

      <div class="tor-uploader-row">
        <span style="font-size:0.8rem;font-weight:800;color:#e2e8f0;">Кой качва сайта:</span>
        <button type="button" class="pay-chip active" data-uploader="client">Най-лесно: Клиентът го качва</button>
        <button type="button" class="pay-chip" data-uploader="team">Ние го качваме (услуга)</button>
        <button type="button" class="preset-chip" id="btnExportTorPack">Свали Tor пакет + инструкция</button>
      </div>

      <div id="torGuidanceNote" class="tor-note"></div>
    </div>
  `;

  genBtn.parentNode.insertBefore(torBox, genBtn);

  function renderTorGuidance() {
    const note = document.getElementById("torGuidanceNote");
    if (!note) return;
    const hostName = torState.selectedHost ? torState.selectedHost.name : "избрания хостинг";
    if (torState.uploader === "client") {
      note.textContent = `Избрано: ${hostName}. Най-лесно за клиента е да свали готовия Tor пакет (HTML/CSS/JS + примерен torrc) и да качи файловете в уеб директорията на избрания хостинг, след което да презареди услугата.`;
    } else {
      note.textContent = `Избрано: ${hostName}. Вие (екипът) го качвате и настройвате HiddenServiceDir / HiddenServicePort на сървъра на клиента, след което му предавате готовия .onion адрес.`;
    }
  }

  function renderTorHosts() {
    const grid = document.getElementById("torHostsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    TOR_HOSTS.forEach((h) => {
      const card = document.createElement("div");
      card.className = `tor-host-card ${torState.selectedHost?.id === h.id ? "active" : ""}`;
      card.innerHTML = `<div class="tor-host-name">${h.name}</div><div class="tor-host-meta">${h.meta}</div>`;
      card.addEventListener("click", () => {
        torState.selectedHost = h;
        renderTorHosts();
        renderTorGuidance();
      });
      grid.appendChild(card);
    });
  }

  document.getElementById("chkTorBuild")?.addEventListener("change", (e) => {
    torState.enabled = Boolean(e.target.checked);
    const body = document.getElementById("torConfigBody");
    if (body) body.style.display = torState.enabled ? "flex" : "none";
    renderTorHosts();
    renderTorGuidance();
  });

  torBox.querySelectorAll("[data-uploader]").forEach((btn) => {
    btn.addEventListener("click", () => {
      torBox.querySelectorAll("[data-uploader]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      torState.uploader = btn.getAttribute("data-uploader") || "client";
      renderTorGuidance();
    });
  });

  document.getElementById("btnExportTorPack")?.addEventListener("click", () => {
    const frame = document.getElementById("siteFrame");
    const html = frame && frame.srcdoc ? frame.srcdoc : "<!DOCTYPE html><html><body><h1>TOR BUILD</h1></body></html>";
    const guide = [
      "=== RED AUTO BUILDER — TOR (.ONION) DEPLOYMENT PACKAGE ===",
      `Selected Hosting Option: ${torState.selectedHost?.name || "Option 1"}`,
      `Upload Mode: ${torState.uploader === "client" ? "Client uploads files (easiest)" : "Team uploads & configures hidden service"}`,
      "",
      "1. Upload the generated website files (index.html / assets) to your web root (e.g. /var/www/onion-site).",
      "2. Ensure Tor service is running and configure HiddenService in /etc/tor/torrc:",
      "   HiddenServiceDir /var/lib/tor/red_auto_builder_site/",
      "   HiddenServicePort 80 127.0.0.1:8080",
      "3. Reload Tor and read your .onion address from /var/lib/tor/red_auto_builder_site/hostname.",
      "",
      "===== index.html =====",
      html
    ].join("\n");

    const blob = new Blob([guide], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tor-onion-deploy-package.txt";
    a.click();
    URL.revokeObjectURL(url);
  });

  renderTorHosts();
  renderTorGuidance();
})();
