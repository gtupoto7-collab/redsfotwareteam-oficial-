const mount = document.getElementById("pageMount");
const apiState = document.getElementById("apiState");
const routeLabel = document.getElementById("currentRouteLabel");

const YT_VIDEO_URL = "https://www.youtube.com/watch?v=JBYo4n9uTOM";
const YT_EMBED_URL = "https://www.youtube-nocookie.com/embed/JBYo4n9uTOM?rel=0";

const state = {
  packageName: "150€ Пакет — Пълен комплект сайт + App приложение на сайта + Free hosting + SEO и Meta FULL",
  basePrice: 150,
  adBotType: "Bot реклама на вид пот",
  permanentAdAddon: true,
  customNote: "",
  lastOutput: ""
};

let vizAnimId = null;

function computePrice() {
  return state.basePrice + (state.permanentAdAddon ? 30 : 0);
}

function summaryText() {
  const total = computePrice();
  const perm = state.permanentAdAddon
    ? "+30€ за безплатна постоянна реклама (ВКЛЮЧЕНО)"
    : "Без +30€ постоянна реклама";
  return `${state.packageName} | ${state.adBotType} | ${perm} | Общо: ${total}€`;
}

function videoBlockHtml() {
  return `
    <div class="video-card">
      <div class="page-head" style="margin-bottom:8px;padding:12px 14px;">
        <div>
          <h2 style="font-size:1.05rem;color:var(--cyan);">RED-SOFTWARE-TEAM // OFFICIAL VIDEO</h2>
          <p style="margin:2px 0 0;">Вградено видео директно в платформата.</p>
        </div>
        <a href="${YT_VIDEO_URL}" target="_blank" rel="noopener noreferrer" class="btn-neon-cyan">ОТВОРИ В YOUTUBE</a>
      </div>
      <div class="video-frame-wrap">
        <iframe
          src="${YT_EMBED_URL}"
          title="RED-SOFTWARE-TEAM"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  `;
}

if (apiState) {
  fetch("/api/health")
    .then((r) => r.json())
    .then((d) => {
      apiState.textContent = d && d.ok ? "ONLINE" : "READY";
    })
    .catch(() => {
      apiState.textContent = "LOCAL";
    });
}

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  const clean = pathname.replace(/\/+$/, "");
  const allowed = [
    "/",
    "/canvas",
    "/cyber-ai",
    "/web-systems",
    "/security-audit",
    "/bots-auto",
    "/diagnostics",
    "/reports",
    "/contact"
  ];
  return allowed.includes(clean) ? clean : "/";
}

function navigate(path) {
  const target = normalizePath(path);
  if (window.location.pathname !== target) {
    window.history.pushState({ route: target }, "", target);
  }
  renderRoute(target);
}

window.addEventListener("popstate", () => {
  renderRoute(normalizePath(window.location.pathname));
});

document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-route]");
  if (!link) return;
  const href = link.getAttribute("data-route");
  if (href) {
    e.preventDefault();
    navigate(href);
  }
});

function updateNavActive(activePath) {
  if (routeLabel) routeLabel.textContent = activePath;
  document.querySelectorAll(".nav-tab").forEach((el) => {
    const r = el.getAttribute("data-route");
    el.classList.toggle("active", r === activePath);
  });
}

function stopViz() {
  if (vizAnimId) {
    cancelAnimationFrame(vizAnimId);
    vizAnimId = null;
  }
}

function startCanvasViz() {
  stopViz();
  const canvas = document.getElementById("vizCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const nodes = Array.from({ length: 34 }, (_, i) => ({
    x: ((i * 73) % 520) + 40,
    y: ((i * 47) % 260) + 40,
    vx: (((i % 5) - 2) * 0.45) || 0.35,
    vy: (((i % 3) - 1) * 0.4) || -0.3,
    color: i % 2 === 0 ? "#ff004c" : "#00f0ff"
  }));

  function frame() {
    const w = (canvas.width = canvas.clientWidth || 640);
    const h = (canvas.height = canvas.clientHeight || 340);

    ctx.fillStyle = "#040208";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(0, 240, 255, 0.08)";
    for (let x = 0; x < w; x += 36) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 36) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      a.x += a.vx;
      a.y += a.vy;
      if (a.x < 12 || a.x > w - 12) a.vx *= -1;
      if (a.y < 12 || a.y > h - 12) a.vy *= -1;

      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 95) {
          ctx.strokeStyle = `rgba(176, 38, 255, ${(1 - dist / 95) * 0.45})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = a.color;
      ctx.beginPath();
      ctx.arc(a.x, a.y, 3.2, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px monospace";
    ctx.fillText("RED SOFTWARE TEAM // LIVE VISUAL CANVAS", 14, 24);
    ctx.fillStyle = "#00ff88";
    ctx.fillText(`TOTAL: ${computePrice()}€ | ${state.permanentAdAddon ? "+30€ PERM AD ACTIVE" : "BASE ONLY"}`, 14, h - 14);

    vizAnimId = requestAnimationFrame(frame);
  }

  frame();
}

function renderRoute(path) {
  stopViz();
  updateNavActive(path);
  if (!mount) return;

  if (path === "/canvas") {
    renderCanvasPage();
  } else if (path === "/cyber-ai") {
    renderCyberAiPage();
  } else if (path === "/web-systems") {
    renderWebSystemsPage();
  } else if (path === "/security-audit") {
    renderSecurityAuditPage();
  } else if (path === "/bots-auto") {
    renderBotsAutoPage();
  } else if (path === "/diagnostics") {
    renderDiagnosticsPage();
  } else if (path === "/reports") {
    renderReportsPage();
  } else if (path === "/contact") {
    renderContactPage();
  } else {
    renderHomePage();
  }
}

function renderHomePage() {
  mount.innerHTML = `
    <div class="page-head">
      <div>
        <h1>RED-SOFTWARE-TEAM-BULGARIA // MULTI-PAGE COMMAND</h1>
        <p>Всеки бутон отваря отделна страница със собствен код, функция и автоматизация. Горе вдясно е CANVAS менюто с цени и оферти.</p>
      </div>
      <div class="action-row">
        <a href="/canvas" class="btn-neon-purple" data-route="/canvas">ОТВОРИ CANVAS &amp; МЕНЮ ЦЕНИ</a>
        <a href="/contact" class="btn-neon-red" data-route="/contact">КЪМ ФОРМАТА</a>
      </div>
    </div>

    <div class="grid-3">
      <button type="button" class="route-card" data-route="/cyber-ai">
        <strong>CYBER AI</strong>
        <span>AI агент, генератор на код, промптове и автоматизации.</span>
        <code>/cyber-ai</code>
      </button>
      <button type="button" class="route-card" data-route="/web-systems">
        <strong>WEB SYSTEMS</strong>
        <span>Пълен комплект сайт + App приложение на сайта + Free hosting + SEO &amp; Meta FULL.</span>
        <code>/web-systems</code>
      </button>
      <button type="button" class="route-card" data-route="/security-audit">
        <strong>SECURITY AUDIT</strong>
        <span>Проверка на URL/headers, списък защити и генератор на audit скрипт.</span>
        <code>/security-audit</code>
      </button>
      <button type="button" class="route-card" data-route="/bots-auto">
        <strong>BOTS &amp; AUTO</strong>
        <span>150€ пакет • Bot реклама на вид пот • +30€ за безплатна постоянна реклама.</span>
        <code>/bots-auto</code>
      </button>
      <button type="button" class="route-card" data-route="/diagnostics">
        <strong>DIAGNOSTICS</strong>
        <span>Тест на /api/health, скорост на отговор и системни данни.</span>
        <code>/diagnostics</code>
      </button>
      <button type="button" class="route-card" data-route="/reports">
        <strong>REPORTS</strong>
        <span>Генериране, копиране и изтегляне на JSON/TXT отчет за проекта.</span>
        <code>/reports</code>
      </button>
    </div>

    ${videoBlockHtml()}
  `;
}

function renderCanvasPage() {
  mount.innerHTML = `
    <div class="page-head">
      <div>
        <h1>NEW PROJECT // CANVAS, ВИЗУАЛИЗАЦИЯ &amp; ПЪЛНО МЕНЮ НА УСЛУГИТЕ</h1>
        <p>Пълен комплект сайт, App приложение на сайта, Free hosting, SEO &amp; Meta FULL, 150€ пакет, Bot реклама на вид пот и +30€ за безплатна постоянна реклама.</p>
      </div>
      <a href="/contact" class="btn-neon-red" data-route="/contact">ПРОДЪЛЖИ КЪМ КОНТАКТ</a>
    </div>

    <div class="canvas-wrap">
      <div class="box purple-box">
        <h2>CANVAS ВИЗУАЛИЗАЦИЯ &amp; КОД</h2>
        <canvas id="vizCanvas"></canvas>
        <div class="code-block" id="canvasCodeOut">// RED SOFTWARE TEAM — CANVAS CONFIG
const config = {
  package: ${JSON.stringify(state.packageName)},
  adBot: ${JSON.stringify(state.adBotType)},
  permanentAdAddonEuro: ${state.permanentAdAddon ? 30 : 0},
  totalEuro: ${computePrice()}
};</div>
      </div>

      <div class="box red-box">
        <h2>ПЪЛНО МЕНЮ НА УСЛУГИТЕ И ЦЕНИТЕ (RED SOFTWARE TEAM)</h2>

        <div class="price-item">
          <span>Пълен комплект сайт + App приложение на сайта + Free hosting + SEO &amp; Meta FULL</span>
          <strong>ВКЛЮЧЕНО</strong>
        </div>

        <div class="price-item">
          <span>Основен пакет система / бот / уеб конфигурация</span>
          <strong>150€</strong>
        </div>

        <label class="check-row">
          <input type="checkbox" id="permAdCheck" ${state.permanentAdAddon ? "checked" : ""}>
          <span>+30€ се доплаща за безплатна постоянна реклама</span>
        </label>

        <label for="botKindSelect">Bot реклама на вид пот:</label>
        <select id="botKindSelect">
          <option value="Bot реклама на вид пот — Telegram промо пот" ${state.adBotType.includes("Telegram") ? "selected" : ""}>Bot реклама на вид пот — Telegram промо пот</option>
          <option value="Bot реклама на вид пот — Discord / общности пот" ${state.adBotType.includes("Discord") ? "selected" : ""}>Bot реклама на вид пот — Discord / общности пот</option>
          <option value="Bot реклама на вид пот — Автоматизиран lead / catalog пот" ${state.adBotType.includes("lead") ? "selected" : ""}>Bot реклама на вид пот — Автоматизиран lead / catalog пот</option>
        </select>

        <div class="total-banner">
          <span>КРАЙНА СУМА:</span>
          <b id="canvasTotalPrice">${computePrice()}€</b>
        </div>

        <div class="action-row">
          <button type="button" id="saveCanvasToContact" class="btn-neon-red">ЗАПАЗИ В КОНТАКТ</button>
          <button type="button" id="goBotsPage" class="btn-neon-cyan">СТРАНИЦА BOTS &amp; AUTO</button>
        </div>
      </div>
    </div>

    ${videoBlockHtml()}
  `;

  startCanvasViz();

  const permCheck = document.getElementById("permAdCheck");
  const botSelect = document.getElementById("botKindSelect");
  const totalEl = document.getElementById("canvasTotalPrice");
  const codeOut = document.getElementById("canvasCodeOut");

  function refreshCanvasState() {
    if (permCheck) state.permanentAdAddon = permCheck.checked;
    if (botSelect) state.adBotType = botSelect.value;
    if (totalEl) totalEl.textContent = `${computePrice()}€`;
    if (codeOut) {
      codeOut.textContent = `// RED SOFTWARE TEAM — CANVAS CONFIG
const config = {
  package: ${JSON.stringify(state.packageName)},
  adBot: ${JSON.stringify(state.adBotType)},
  permanentAdAddonEuro: ${state.permanentAdAddon ? 30 : 0},
  totalEuro: ${computePrice()}
};`;
    }
  }

  permCheck?.addEventListener("change", refreshCanvasState);
  botSelect?.addEventListener("change", refreshCanvasState);

  document.getElementById("saveCanvasToContact")?.addEventListener("click", () => {
    refreshCanvasState();
    state.lastOutput = summaryText();
    navigate("/contact");
  });

  document.getElementById("goBotsPage")?.addEventListener("click", () => {
    refreshCanvasState();
    navigate("/bots-auto");
  });
}

function renderCyberAiPage() {
  mount.innerHTML = `
    <div class="page-head">
      <div>
        <h1>CYBER AI // АВТОМАТИЗАЦИЯ И ГЕНЕРАТОР НА КОД</h1>
        <p>Отделна страница за AI логика, сценарии и автоматизации на RED-SOFTWARE-TEAM-BULGARIA.</p>
      </div>
      <a href="/contact" class="btn-neon-red" data-route="/contact">ПРАТИ КЪМ КОНТАКТ</a>
    </div>

    <div class="grid-2">
      <div class="box">
        <h2>AI AUTOMATION RUNNER</h2>
        <input id="aiGoalInput" type="text" placeholder="Пример: AI асистент за запитвания + автоотговор">
        <select id="aiModeSelect">
          <option value="Node.js Express + AI Endpoint">Node.js Express + AI Endpoint</option>
          <option value="Automated Lead & Bot Pipeline">Automated Lead &amp; Bot Pipeline</option>
          <option value="SEO & Content Automation">SEO &amp; Content Automation</option>
        </select>
        <div class="action-row">
          <button type="button" id="genAiCodeBtn" class="btn-neon-purple">ГЕНЕРИРАЙ КОД И АВТОМАТИЗАЦИЯ</button>
        </div>
      </div>

      <div class="box purple-box">
        <h2>ГЕНЕРИРАН КОД &amp; ЛОГИКА</h2>
        <div class="code-block" id="aiCodeBox">// Click "ГЕНЕРИРАЙ КОД И АВТОМАТИЗАЦИЯ" to build automation code.</div>
      </div>
    </div>
  `;

  document.getElementById("genAiCodeBtn")?.addEventListener("click", () => {
    const goal = document.getElementById("aiGoalInput")?.value.trim() || "AI automation workflow";
    const mode = document.getElementById("aiModeSelect")?.value || "Node.js Express + AI Endpoint";
    const code = `export async function runCyberAutomation(inputPayload) {
  const workflow = {
    team: "RED-SOFTWARE-TEAM-BULGARIA",
    mode: ${JSON.stringify(mode)},
    goal: ${JSON.stringify(goal)},
    timestamp: new Date().toISOString()
  };
  return { ok: true, workflow, received: inputPayload };
}`;
    const box = document.getElementById("aiCodeBox");
    if (box) box.textContent = code;
    state.lastOutput = `[CYBER AI] ${goal} (${mode})`;
  });
}

function renderWebSystemsPage() {
  mount.innerHTML = `
    <div class="page-head">
      <div>
        <h1>WEB SYSTEMS // ПЪЛЕН КОМПЛЕКТ САЙТ + APP + FREE HOSTING + SEO &amp; META FULL</h1>
        <p>Конфигуратор на уеб система, уеб App приложение, безплатен хостинг и пълни SEO / Meta тагове.</p>
      </div>
      <a href="/contact" class="btn-neon-red" data-route="/contact">ЗАЯВИ СИСТЕМАТА</a>
    </div>

    <div class="grid-2">
      <div class="box">
        <h2>МОДУЛИ НА КОМПЛЕКТА</h2>
        <div class="price-item"><span>Пълен комплект сайт</span><strong>INCLUDED</strong></div>
        <div class="price-item"><span>App приложение на сайта</span><strong>INCLUDED</strong></div>
        <div class="price-item"><span>Free hosting</span><strong>INCLUDED</strong></div>
        <div class="price-item"><span>SEO и Meta FULL</span><strong>INCLUDED</strong></div>
        <input id="siteDomainInput" type="text" placeholder="Домейн / име на бранда (напр. red-software-team.bg)">
        <button type="button" id="genWebMetaBtn" class="btn-neon-cyan">ГЕНЕРИРАЙ SEO / META &amp; APP КОД</button>
      </div>

      <div class="box red-box">
        <h2>SEO, META FULL &amp; APP КОД</h2>
        <div class="code-block" id="webCodeBox">&lt;meta name="robots" content="index, follow"&gt;
&lt;meta property="og:site_name" content="RED-SOFTWARE-TEAM-BULGARIA"&gt;
&lt;link rel="manifest" href="/manifest.webmanifest"&gt;</div>
      </div>
    </div>
  `;

  document.getElementById("genWebMetaBtn")?.addEventListener("click", () => {
    const brand = document.getElementById("siteDomainInput")?.value.trim() || "RED-SOFTWARE-TEAM-BULGARIA";
    const out = `<!-- SEO & META FULL + WEB APP MANIFEST -->
<title>${brand} | Web + App + Free Hosting</title>
<meta name="description" content="Пълен комплект сайт, App приложение на сайта, Free hosting и SEO & Meta FULL от RED-SOFTWARE-TEAM-BULGARIA.">
<meta property="og:title" content="${brand}">
<meta property="og:type" content="website">
<link rel="manifest" href="/manifest.webmanifest">`;
    const box = document.getElementById("webCodeBox");
    if (box) box.textContent = out;
    state.lastOutput = `[WEB SYSTEMS] Full Suite + App + Free Hosting + SEO/Meta FULL for ${brand}`;
  });
}

function renderSecurityAuditPage() {
  mount.innerHTML = `
    <div class="page-head">
      <div>
        <h1>SECURITY AUDIT // ПРОВЕРКА НА СИГУРНОСТ И ЗАГЛАВИЯ</h1>
        <p>Отделна страница за проверка на URL/headers и генериране на одитен код.</p>
      </div>
      <a href="/contact" class="btn-neon-red" data-route="/contact">ЗАЯВИ ОДИТ</a>
    </div>

    <div class="grid-2">
      <div class="box">
        <h2>TARGET CHECK</h2>
        <input id="auditUrlInput" type="text" value="https://redsoftwareteam-oficial.onrender.com">
        <button type="button" id="runAuditBtn" class="btn-neon-red">ИЗПЪЛНИ AUDIT ПРОВЕРКА</button>
      </div>
      <div class="box">
        <h2>AUDIT OUTPUT &amp; SCRIPT</h2>
        <div class="code-block" id="auditOutBox">// Ready to run audit check.</div>
      </div>
    </div>
  `;

  document.getElementById("runAuditBtn")?.addEventListener("click", async () => {
    const target = document.getElementById("auditUrlInput")?.value.trim() || window.location.origin;
    const outBox = document.getElementById("auditOutBox");
    let healthStatus = "unknown";
    try {
      const r = await fetch("/api/health");
      const j = await r.json().catch(() => ({}));
      healthStatus = j && j.ok ? "200 OK (/api/health)" : String(r.status);
    } catch {
      healthStatus = "unreachable";
    }
    const text = `Target: ${target}
Protocol: ${window.location.protocol}
API Health: ${healthStatus}
Check: TLS, CSP, X-Frame-Options, Rate Limit, Input Validation -> READY`;
    if (outBox) outBox.textContent = text;
    state.lastOutput = `[SECURITY AUDIT] ${target} (${healthStatus})`;
  });
}

function renderBotsAutoPage() {
  mount.innerHTML = `
    <div class="page-head">
      <div>
        <h1>BOTS &amp; AUTO // 150€ ПАКЕТ • BOT РЕКЛАМА НА ВИД ПОТ • +30€ ПОСТОЯННА РЕКЛАМА</h1>
        <p>Конфигуратор за ботове, автоматизация и реклама с опция за +30€ безплатна постоянна реклама.</p>
      </div>
      <a href="/contact" class="btn-neon-red" data-route="/contact">ПРАТИ ЗАЯВКА</a>
    </div>

    <div class="grid-2">
      <div class="box purple-box">
        <h2>ПАКЕТ &amp; РЕКЛАМНА КОНФИГУРАЦИЯ</h2>
        <div class="price-item"><span>150€ пакет</span><strong>150€</strong></div>
        <label class="check-row">
          <input type="checkbox" id="botPermCheck" ${state.permanentAdAddon ? "checked" : ""}>
          <span>+30€ се доплаща за безплатна постоянна реклама</span>
        </label>
        <input id="botPotInput" type="text" value="${state.adBotType}" placeholder="Bot реклама на вид пот...">
        <button type="button" id="buildBotCodeBtn" class="btn-neon-green">ГЕНЕРИРАЙ BOT &amp; AD КОД</button>
      </div>

      <div class="box">
        <h2>BOT &amp; AUTOMATION CODE</h2>
        <div class="code-block" id="botCodeOut">Total: ${computePrice()}€ | ${state.adBotType}</div>
      </div>
    </div>
  `;

  document.getElementById("buildBotCodeBtn")?.addEventListener("click", () => {
    const chk = document.getElementById("botPermCheck");
    const pot = document.getElementById("botPotInput");
    if (chk) state.permanentAdAddon = chk.checked;
    if (pot && pot.value.trim()) state.adBotType = pot.value.trim();

    const total = computePrice();
    const out = `const adCampaign = {
  packageEuro: 150,
  botType: ${JSON.stringify(state.adBotType)},
  permanentFreeAdAddon: ${state.permanentAdAddon ? "+30€ (безплатна постоянна реклама)" : "none"},
  totalEuro: ${total}
};
console.log("RED SOFTWARE TEAM BOT READY:", adCampaign);`;
    const el = document.getElementById("botCodeOut");
    if (el) el.textContent = out;
    state.lastOutput = summaryText();
  });
}

function renderDiagnosticsPage() {
  mount.innerHTML = `
    <div class="page-head">
      <div>
        <h1>DIAGNOSTICS // СИСТЕМЕН ТЕСТ И API СТАТУС</h1>
        <p>Отделна страница за диагностика на връзката със сървъра и браузърната среда.</p>
      </div>
      <button type="button" id="runDiagBtn" class="btn-neon-cyan">ПУСНИ ДИАГНОСТИКА</button>
    </div>

    <div class="box">
      <h2>DIAGNOSTIC OUTPUT</h2>
      <div class="code-block" id="diagBox">Loading diagnostics...</div>
    </div>
  `;

  async function runDiag() {
    const start = performance.now();
    let apiInfo = "No response";
    try {
      const res = await fetch("/api/health");
      const ms = Math.round(performance.now() - start);
      const data = await res.json().catch(() => ({}));
      apiInfo = `HTTP ${res.status} in ${ms}ms -> ${JSON.stringify(data)}`;
    } catch (e) {
      apiInfo = `Error: ${e.message}`;
    }

    const box = document.getElementById("diagBox");
    if (box) {
      box.textContent = `Route: ${window.location.pathname}
API Health: ${apiInfo}
Viewport: ${window.innerWidth}x${window.innerHeight}
Platform: ${navigator.platform}`;
    }
  }

  runDiag();
  document.getElementById("runDiagBtn")?.addEventListener("click", runDiag);
}

function renderReportsPage() {
  const reportObj = {
    brand: "RED-SOFTWARE-TEAM-BULGARIA",
    includes: [
      "Пълен комплект сайт",
      "App приложение на сайта",
      "Free hosting",
      "SEO и Meta FULL"
    ],
    basePackageEuro: state.basePrice,
    adBotType: state.adBotType,
    permanentAdAddonEuro: state.permanentAdAddon ? 30 : 0,
    totalEuro: computePrice(),
    lastAction: state.lastOutput || summaryText(),
    contactPhone: "0879 813 928"
  };

  const jsonStr = JSON.stringify(reportObj, null, 2);

  mount.innerHTML = `
    <div class="page-head">
      <div>
        <h1>REPORTS // ОТЧЕТ ЗА КОНФИГУРАЦИЯТА И ЦЕНИТЕ</h1>
        <p>Отделна страница за преглед, копиране и изтегляне на JSON отчет.</p>
      </div>
      <div class="action-row">
        <button type="button" id="copyReportBtn" class="btn-neon-cyan">КОПИРАЙ JSON</button>
        <button type="button" id="dlReportBtn" class="btn-neon-green">СВАЛИ .JSON</button>
      </div>
    </div>

    <div class="box">
      <h2>JSON REPORT</h2>
      <div class="code-block" id="reportJsonBox">${jsonStr}</div>
    </div>
  `;

  document.getElementById("copyReportBtn")?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(jsonStr);
    } catch {
      // ignore clipboard errors
    }
  });

  document.getElementById("dlReportBtn")?.addEventListener("click", () => {
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "red-software-team-report.json";
    a.click();
    URL.revokeObjectURL(url);
  });
}

function renderContactPage() {
  const defaultSubject = summaryText();
  const defaultMessage = [
    "Пакет: Пълен комплект сайт + App приложение на сайта + Free hosting + SEO и Meta FULL",
    "Базов пакет: 150€",
    `Вид бот реклама: ${state.adBotType}`,
    `Безплатна постоянна реклама (+30€): ${state.permanentAdAddon ? "ДА (+30€)" : "НЕ"}`,
    `Обща сума: ${computePrice()}€`,
    state.lastOutput ? `Последен модул/код: ${state.lastOutput}` : ""
  ]
    .filter(Boolean)
    .join("\n");

  mount.innerHTML = `
    <div class="page-head">
      <div>
        <h1>CONTACT // ИЗПРАЩАНЕ НА ЗАЯВКА КЪМ /api/contact</h1>
        <p>Директен контакт: <b>0879 813 928</b> • Записва заявката през сървъра.</p>
      </div>
      <a href="/canvas" class="btn-neon-purple" data-route="/canvas">ПРОМЕНИ В CANVAS</a>
    </div>

    <div class="box red-box">
      <form id="contactForm" novalidate>
        <div class="grid-2">
          <input id="name" name="name" type="text" placeholder="Твоето име" required>
          <input id="email" name="email" type="email" placeholder="imeil@primer.com" required>
        </div>
        <input id="subject" name="subject" type="text" value="${defaultSubject.replace(/"/g, "&quot;")}" required>
        <textarea id="message" name="message" required>${defaultMessage}</textarea>
        <button id="sendBtn" class="send-btn" type="submit">ИЗПРАТИ ЗАЯВКА</button>
        <p id="formStatus" class="form-status" role="status" aria-live="polite"></p>
      </form>
    </div>
  `;

  const form = document.getElementById("contactForm");
  const sendBtn = document.getElementById("sendBtn");
  const statusEl = document.getElementById("formStatus");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById("name")?.value.trim() || "",
      email: document.getElementById("email")?.value.trim() || "",
      subject: document.getElementById("subject")?.value.trim() || "",
      message: document.getElementById("message")?.value.trim() || ""
    };

    if (!payload.name || !payload.email || !payload.message) {
      if (statusEl) statusEl.textContent = "Попълни име, имейл и съобщение.";
      return;
    }

    if (sendBtn) sendBtn.disabled = true;
    if (statusEl) statusEl.textContent = "Изпращане към /api/contact...";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || (!data.ok && !data.success)) {
        throw new Error(data.error || "Грешка при изпращане.");
      }
      if (statusEl) statusEl.textContent = "Запитването е изпратено успешно.";
      form.reset();
    } catch (err) {
      if (statusEl) statusEl.textContent = err.message || "Грешка при връзка.";
    } finally {
      if (sendBtn) sendBtn.disabled = false;
    }
  });
}

renderRoute(normalizePath(window.location.pathname));
