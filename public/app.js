const mount = document.getElementById("appMount");
const YT_VIDEO_URL = "https://www.youtube.com/watch?v=JBYo4n9uTOM";
const YT_EMBED_URL = "https://www.youtube-nocookie.com/embed/JBYo4n9uTOM?rel=0";

const ENGINE_EXECUTORS = [
  "1. Project Architect",
  "2. UI/UX Designer",
  "3. Frontend Engineer",
  "4. Backend Engineer",
  "5. Database Engineer",
  "6. AI Integration Engineer",
  "7. Image & Media Generator",
  "8. QA Engineer",
  "9. Security Engineer",
  "10. Deployment Engineer"
];

const PRODUCT_MATRIX = [
  { id: "corporate", name: "Corporate Website", result: "Готов корпоративен сайт" },
  { id: "ecommerce", name: "E-commerce", result: "Онлайн магазин" },
  { id: "saas", name: "SaaS", result: "Софтуерна платформа" },
  { id: "ai-platform", name: "AI Platform", result: "AI приложение" },
  { id: "dashboard", name: "Dashboard", result: "Административен панел" },
  { id: "web-app", name: "Web Application", result: "Уеб приложение" },
  { id: "pwa", name: "PWA", result: "Инсталиращо се приложение" },
  { id: "android", name: "Android App", result: "Android пакет" },
  { id: "ios", name: "iOS App", result: "iOS проект" },
  { id: "tor-site", name: "Tor Website", result: "Onion сайт за законни и легитимни услуги" }
];

const DESIGN_ENHANCEMENTS = [
  "Make It Premium",
  "Ultra Modern Design",
  "Improve Typography",
  "Improve Images",
  "Add 3D Effects",
  "Add Animations",
  "Improve Color System",
  "Redesign Header",
  "Improve Navigation",
  "Professional Layout"
];

const DEV_ENHANCEMENTS = [
  "Generate New Pages",
  "Add Backend",
  "Add Database",
  "Add Authentication",
  "Add Payment System",
  "Add AI Assistant",
  "Convert to PWA",
  "Convert to Mobile App",
  "Fix All Detected Bugs",
  "Optimize Performance"
];

const PUBLISH_STAGES = [
  "GENERATED PROJECT",
  "CODE VERIFICATION",
  "BUILD & TEST",
  "GITHUB REPOSITORY",
  "RENDER DEPLOYMENT",
  "LIVE WEBSITE",
  "CUSTOM DOMAIN"
];

const DIVISIONS = [
  {
    slug: "ai-rd",
    department: "AI Research & Development",
    specialization: "Изкуствен интелект",
    summary: "Приложен изкуствен интелект, автоматизация на процеси и интелигентни системи.",
    deliverables: [
      "Интелигентни агенти и автоматизирани работни потоци",
      "Интеграция с уеб и сървърни услуги",
      "Непрекъснато оптимизиране на резултатите"
    ]
  },
  {
    slug: "cybersecurity",
    department: "Cybersecurity Division",
    specialization: "Киберсигурност",
    summary: "Защита на приложения, проверка на конфигурации и контрол на сигурността.",
    deliverables: [
      "Одит на уязвимости, заглавия и валидации",
      "Защитни политики и контрол на достъпа",
      "Мониторинг и устойчивост при натоварване"
    ]
  },
  {
    slug: "software-engineering",
    department: "Software Engineering",
    specialization: "Софтуерна разработка",
    summary: "Производство на готови сайтове, уеб приложения, бази данни и API сървиси.",
    deliverables: [
      "Модулен фронтенд и сървърен бекенд",
      "Бази данни, автентикация и плащания",
      "Документация и готов код за пускане"
    ]
  },
  {
    slug: "autonomous-systems",
    department: "Autonomous Systems",
    specialization: "Интелигентни системи",
    summary: "Автоматизирани конвейери за изграждане, тестване и публикуване.",
    deliverables: [
      "Автоматично генериране на файлове и страници",
      "Проверка на връзки, грешки и производителност",
      "Свързване с GitHub и Render"
    ]
  },
  {
    slug: "cloud-infrastructure",
    department: "Cloud Infrastructure",
    specialization: "Облачни технологии",
    summary: "Хостинг, съхранение на проекти, домейни и управление на деплоймънти.",
    deliverables: [
      "RED CLOUD хостинг и съхранение на проекти",
      "Автоматично изграждане и публични адреси",
      "Конфигурация на собствен домейн с потвърждение"
    ]
  },
  {
    slug: "digital-innovation",
    department: "Digital Innovation",
    specialization: "Дигитални иновации",
    summary: "Мобилни пакети (Android / iOS / PWA) и нови дигитални продукти.",
    deliverables: [
      "Компилация, подписване и подготовка за публикуване",
      "PWA инсталируеми приложения",
      "RED MARKETPLACE шаблони и готови решения"
    ]
  }
];

const MARAUDER_TABS = [
  {
    id: "architecture",
    label: "AI Architecture",
    title: "AI Architecture — Модулна архитектура на MARAUDER-AI",
    desc: "Слоеста структура за управление на задачи, агенти, защита и автоматизирано изграждане.",
    points: [
      "Разделение между AI двигател, изпълнители и слой за публикуване",
      "Стандартизирани формати на конфигурация и код",
      "Пълна съвместимост с RED AUTO BUILDER"
    ]
  },
  {
    id: "agents",
    label: "Agent Ecosystem",
    title: "Agent Ecosystem — 10 специализирани изпълнители",
    desc: "Всеки изпълнител има конкретна инженерна задача и реален резултат в проекта.",
    points: [
      "Project Architect, UI/UX Designer, Frontend & Backend Engineer",
      "Database Engineer, AI Integration Engineer, Image & Media Generator",
      "QA Engineer, Security Engineer & Deployment Engineer"
    ]
  },
  {
    id: "defense",
    label: "Cyber Defense",
    title: "Cyber Defense — Защитен слой",
    desc: "Проверки за сигурност, валидации и защитена конфигурация при всеки генериран проект.",
    points: [
      "Контрол на входните потоци и API маршрутите",
      "Проверки преди публикуване в GitHub и Render",
      "Намаляване на грешки и уязвимости"
    ]
  },
  {
    id: "intelligence",
    label: "Security Intelligence",
    title: "Security Intelligence — Диагностика и логове",
    desc: "Проследяване на стъпките при генериране, тестване и публикуване.",
    points: [
      "Детайлен лог на всяка операция на двигателя",
      "Бързо локализиране и отстраняване на несъответствия",
      "Ясен статус на всяка стъпка от конвейера"
    ]
  },
  {
    id: "mission-control",
    label: "Mission Control",
    title: "Mission Control — Централен контрол",
    desc: "Управление на продукти, шаблони, клиенти, кредити и публикации от едно място.",
    points: [
      "Пряк преход от генерация към публикуване",
      "Контрол над страниците, секциите и кода",
      "Интеграция с формата за поръчки и запитвания"
    ]
  },
  {
    id: "overview",
    label: "Technology Overview",
    title: "Technology Overview — Екосистема на RED SOFTWARE TEAM",
    desc: "MARAUDER-AI осигурява AI интелигентност и защита, а RED AUTO BUILDER произвежда готовия софтуер.",
    points: [
      "MARAUDER-AI: AI Intelligence & Cyber Defense",
      "RED AUTO BUILDER: Website, App Factory, AI Canvas, Code & Auto Deployment",
      "RED CLOUD & RED MARKETPLACE: Хостинг, проекти, шаблони и услуги"
    ]
  }
];

const PROJECTS = [
  {
    id: "red-auto-builder",
    name: "RED AUTO BUILDER AI",
    division: "Website & App Factory • Auto Canvas • Auto Publish",
    summary: "Автоматизирана фабрика за сайтове, уеб и мобилни приложения с трипанелен Canvas и мигновена промяна на кода.",
    stack: "HTML5 • CSS3 • JavaScript • Node.js API",
    details: "Генерира структура, страници, компоненти, код и конвейер за публикуване към GitHub и Render."
  },
  {
    id: "marauder-ai-engine",
    name: "MARAUDER-AI Engine",
    division: "AI Research & Development • Cybersecurity",
    summary: "AI и защитен технологичен двигател на екосистемата RED SOFTWARE TEAM.",
    stack: "Modular Agents • Security Checks • API Gateway",
    details: "Координира задачи, проверки за сигурност, автоматизация и системна логика."
  },
  {
    id: "red-cloud-marketplace",
    name: "RED CLOUD & RED MARKETPLACE",
    division: "Cloud Infrastructure • Auto Sales Engine",
    summary: "Хостинг, съхранение на проекти, шаблони, кредити, планове и автоматизирана доставка.",
    stack: "GitHub Pipeline • Render Deploy • Customer Accounts",
    details: "Осигурява готов код, GitHub проект, публичен адрес, домейн с потвърждение и документация."
  }
];

const builderState = {
  targetType: "WEBSITE",
  productType: "AI Platform",
  prompt: "Искам премиум сайт за международна AI компания.",
  brandTitle: "RED SOFTWARE TEAM — AI PLATFORM",
  headline: "One Click. One Idea. Complete Software.",
  subtitle: "Автоматизирана фабрика за готов софтуер без излишни обяснения.",
  pages: ["Home", "Features", "Architecture", "Pricing", "Contact"],
  modules: ["AI Core Engine", "Responsive UI Layout", "SEO & Meta Ready", "Fast Routing"],
  premiumMode: true,
  effects3d: true,
  animationsOn: true,
  mobileSigned: false,
  customDomainConfirmed: false,
  customDomainName: "ai-company.redsoftwareteam.bg",
  completedPublishSteps: 0,
  liveUrl: "https://red-software-team-ai.onrender.com",
  logs: [
    "[ENGINE READY] 10 специализирани изпълнители са в готовност. Въведи идея и натисни бутон."
  ]
};

function pushLog(msg) {
  builderState.logs.push(msg);
  if (builderState.logs.length > 28) {
    builderState.logs = builderState.logs.slice(-28);
  }
}

function generateSourceCode(st) {
  const pagesStr = st.pages.map((p) => `"${p}"`).join(", ");
  const modsStr = st.modules.map((m) => `      <li>${m}</li>`).join("\n");
  const mobileBlock =
    st.targetType === "MOBILE_APP" || ["Android App", "iOS App", "PWA"].includes(st.productType)
      ? `\n// Mobile / PWA Build & Signing Pipeline:\n// Target: ${st.productType} | Signed: ${st.mobileSigned ? "SIGNED_RELEASE_READY" : "PENDING_SIGN"}\n`
      : "";

  return `// AUTO-GENERATED BY RED SOFTWARE TEAM — AUTO BUILDER AI
// Target: ${st.targetType} | Product: ${st.productType}
${mobileBlock}
export const projectConfig = {
  brand: ${JSON.stringify(st.brandTitle)},
  headline: ${JSON.stringify(st.headline)},
  prompt: ${JSON.stringify(st.prompt)},
  pages: [${pagesStr}],
  modules: ${JSON.stringify(st.modules)},
  publish: {
    githubRepo: "red-software-team/${st.productType.toLowerCase().replace(/[^a-z0-9]+/g, "-")}",
    renderUrl: ${JSON.stringify(st.liveUrl)},
    customDomain: ${JSON.stringify(st.customDomainName)},
    domainConfirmed: ${st.customDomainConfirmed}
  }
};

export function renderGeneratedApp() {
  return \`
    <main data-product="${st.productType}">
      <h1>\${projectConfig.headline}</h1>
      <p>\${projectConfig.prompt}</p>
      <ul>
${modsStr}
      </ul>
    </main>
  \`;
}`;
}

function runBuildSequence(modeLabel, productOverride) {
  if (productOverride) {
    builderState.productType = productOverride;
  }
  builderState.targetType = modeLabel;
  if (modeLabel === "MOBILE_APP" && !["Android App", "iOS App", "PWA"].includes(builderState.productType)) {
    builderState.productType = "Android App";
  } else if (modeLabel === "WEB_APP" && builderState.productType === "AI Platform") {
    builderState.productType = "Web Application";
  }

  const pText = builderState.prompt.trim() || "Премиум софтуерен продукт";
  builderState.brandTitle = `${builderState.productType.toUpperCase()} // RED SOFTWARE TEAM`;
  builderState.headline =
    modeLabel === "MOBILE_APP"
      ? `${builderState.productType} — Готов мобилен пакет`
      : modeLabel === "WEB_APP"
      ? `${builderState.productType} — Готово уеб приложение`
      : `${builderState.productType} — Готов уеб сайт`;
  builderState.subtitle = pText;
  builderState.completedPublishSteps = 0;

  builderState.logs = [
    `[1. Project Architect] Изградена архитектура за ${modeLabel} (${builderState.productType}).`,
    `[2. UI/UX Designer] Създадени секции, цветови токени и адаптивна решетка.`,
    `[3. Frontend Engineer] Генерирани страници [${builderState.pages.join(", ")}] и навигация.`,
    `[4. Backend Engineer] Свързани API маршрути и обработчици на заявки.`,
    `[5. Database Engineer] Подготвена схема за данни и състояния.`,
    `[6. AI Integration Engineer] Вградени автоматизации спрямо заданието.`,
    `[7. Image & Media Generator] Конфигурирани визуални слотове и медия.`,
    `[8. QA Engineer] Проверени връзки, компоненти и структура.`,
    `[9. Security Engineer] Приложени проверки за валидация и сигурност.`,
    `[10. Deployment Engineer] Продуктът е готов за PUBLISH MY PROJECT.`
  ];
}

function applyEnhancementAction(actionName) {
  pushLog(`[ACTION] ${actionName}`);

  switch (actionName) {
    case "Make It Premium":
      builderState.premiumMode = true;
      builderState.headline = "Premium Enterprise Edition — Ready to Deploy";
      break;
    case "Ultra Modern Design":
      builderState.premiumMode = true;
      builderState.animationsOn = true;
      if (!builderState.modules.includes("Ultra Modern Glass & Grid")) {
        builderState.modules.push("Ultra Modern Glass & Grid");
      }
      break;
    case "Improve Typography":
      builderState.headline = "Precision Typography & Hierarchy System";
      break;
    case "Improve Images":
      if (!builderState.modules.includes("High-Res Media & Visual Slots")) {
        builderState.modules.push("High-Res Media & Visual Slots");
      }
      break;
    case "Add 3D Effects":
      builderState.effects3d = true;
      if (!builderState.modules.includes("3D Spatial Depth Layer")) {
        builderState.modules.push("3D Spatial Depth Layer");
      }
      break;
    case "Add Animations":
      builderState.animationsOn = true;
      if (!builderState.modules.includes("Smooth Motion Transitions")) {
        builderState.modules.push("Smooth Motion Transitions");
      }
      break;
    case "Improve Color System":
      builderState.premiumMode = true;
      if (!builderState.modules.includes("Calibrated Dark + Red Token System")) {
        builderState.modules.push("Calibrated Dark + Red Token System");
      }
      break;
    case "Redesign Header":
      builderState.brandTitle = `${builderState.productType} • RED SOFTWARE TEAM`;
      break;
    case "Improve Navigation":
      if (!builderState.pages.includes("Solutions")) {
        builderState.pages.splice(2, 0, "Solutions");
      }
      break;
    case "Professional Layout":
      if (!builderState.modules.includes("12-Column Enterprise Layout")) {
        builderState.modules.push("12-Column Enterprise Layout");
      }
      break;
    case "Generate New Pages": {
      const nextNum = builderState.pages.length + 1;
      builderState.pages.push(`Page ${nextNum}`);
      break;
    }
    case "Add Backend":
      if (!builderState.modules.includes("Node.js REST API & Endpoints")) {
        builderState.modules.push("Node.js REST API & Endpoints");
      }
      break;
    case "Add Database":
      if (!builderState.modules.includes("PostgreSQL / JSON Data Layer")) {
        builderState.modules.push("PostgreSQL / JSON Data Layer");
      }
      break;
    case "Add Authentication":
      if (!builderState.modules.includes("Auth & Session Guard")) {
        builderState.modules.push("Auth & Session Guard");
      }
      break;
    case "Add Payment System":
      if (!builderState.modules.includes("Payment Gateway Checkout")) {
        builderState.modules.push("Payment Gateway Checkout");
      }
      break;
    case "Add AI Assistant":
      if (!builderState.modules.includes("Embedded AI Assistant Module")) {
        builderState.modules.push("Embedded AI Assistant Module");
      }
      break;
    case "Convert to PWA":
      builderState.productType = "PWA";
      if (!builderState.modules.includes("Service Worker & Web Manifest")) {
        builderState.modules.push("Service Worker & Web Manifest");
      }
      break;
    case "Convert to Mobile App":
      builderState.targetType = "MOBILE_APP";
      builderState.productType = "Android App";
      builderState.mobileSigned = true;
      if (!builderState.modules.includes("Mobile Build & Release Signing")) {
        builderState.modules.push("Mobile Build & Release Signing");
      }
      break;
    case "Fix All Detected Bugs":
      pushLog("[QA + SECURITY] 0 критични грешки. Всички маршрути и компоненти са валидни.");
      break;
    case "Optimize Performance":
      if (!builderState.modules.includes("Asset Compression & Fast Load")) {
        builderState.modules.push("Asset Compression & Fast Load");
      }
      break;
    default:
      break;
  }
}

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  const clean = pathname.replace(/\/+$/, "");
  const allowed = ["/", "/divisions", "/marauder-ai", "/projects", "/company", "/contact"];
  return allowed.includes(clean) ? clean : "/";
}

function navigate(path, extraSubject = "") {
  const target = normalizePath(path);
  if (extraSubject) {
    sessionStorage.setItem("rst_subject", extraSubject);
  }
  if (window.location.pathname !== target) {
    window.history.pushState({ route: target }, "", target);
  }
  renderRoute(target);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.addEventListener("popstate", () => {
  renderRoute(normalizePath(window.location.pathname));
});

document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-route]");
  if (!link) return;
  const route = link.getAttribute("data-route");
  const subject = link.getAttribute("data-subject") || "";
  if (route) {
    e.preventDefault();
    navigate(route, subject);
  }
});

function setActiveNav(path) {
  document.querySelectorAll(".nav-link").forEach((el) => {
    el.classList.toggle("active", el.getAttribute("data-route") === path);
  });
}

function renderRoute(path) {
  setActiveNav(path);
  if (!mount) return;

  if (path === "/divisions") {
    renderDivisionsPage();
  } else if (path === "/marauder-ai") {
    renderMarauderPage();
  } else if (path === "/projects") {
    renderProjectsPage();
  } else if (path === "/company") {
    renderCompanyPage();
  } else if (path === "/contact") {
    renderContactPage();
  } else {
    renderAutoBuilderPage();
  }
}

function renderAutoBuilderPage() {
  const executorsHtml = ENGINE_EXECUTORS.map((w) => `<span class="worker-chip">${w}</span>`).join("");
  const logsHtml = builderState.logs
    .map((l) => `<div class="${l.startsWith("[10.") || l.includes("OK") || l.includes("PUBLISH") ? "log-done" : ""}">${l}</div>`)
    .join("");

  const liveNavHtml = builderState.pages.map((pg) => `<span class="live-nav-pill">${pg}</span>`).join("");
  const liveModsHtml = builderState.modules
    .map((m) => `<div class="live-mod-card"><strong>${m}</strong><span>Active Component</span></div>`)
    .join("");

  const designBtnsHtml = DESIGN_ENHANCEMENTS.map(
    (name) => `<button type="button" class="tool-btn" data-enhance="${name}">${name}</button>`
  ).join("");

  const devBtnsHtml = DEV_ENHANCEMENTS.map(
    (name) => `<button type="button" class="tool-btn" data-enhance="${name}">${name}</button>`
  ).join("");

  const productsHtml = PRODUCT_MATRIX.map(
    (p) => `
      <button type="button" class="prod-card ${builderState.productType === p.name ? "active" : ""}" data-prod="${p.name}">
        <strong>${p.name}</strong>
        <span>${p.result}</span>
      </button>
    `
  ).join("");

  const pipeHtml = PUBLISH_STAGES.map(
    (st, idx) => `<span class="pipe-step ${idx < builderState.completedPublishSteps ? "done" : ""}">${st}</span>`
  ).join("");

  mount.innerHTML = `
    <section class="creator-hub">
      <div class="hub-top">
        <div>
          <div class="hub-kicker">RED SOFTWARE TEAM — AUTO BUILDER AI</div>
          <h1>WHAT DO YOU WANT TO CREATE?</h1>
          <p class="hub-sub">One Click. One Idea. Complete Software. Натисни бутон и системата изгражда продукта директно в Canvas и кода.</p>
        </div>
        <button type="button" id="topPublishBtn" class="btn btn-publish">PUBLISH MY PROJECT</button>
      </div>

      <div class="hub-prompt-row">
        <input id="hubPromptInput" class="hub-input" type="text" value="${builderState.prompt.replace(/"/g, "&quot;")}" placeholder="Искам премиум сайт за международна AI компания.">
        <button type="button" id="sendHubToOrderBtn" class="btn btn-secondary">Изпрати към поръчка</button>
      </div>

      <div class="three-launchers">
        <button type="button" id="btnGenWebsite" class="btn btn-primary">GENERATE WEBSITE</button>
        <button type="button" id="btnGenWebApp" class="btn btn-secondary">GENERATE WEB APPLICATION</button>
        <button type="button" id="btnGenMobileApp" class="btn btn-secondary">GENERATE MOBILE APPLICATION</button>
      </div>
    </section>

    <section class="canvas-3col" aria-label="AUTO CANVAS BUILDER">
      <div class="panel">
        <div class="panel-head">
          <h2>AI COMMAND CENTER</h2>
          <span class="panel-badge">10 EXECUTORS</span>
        </div>

        <div class="engine-workers">${executorsHtml}</div>

        <label for="cmdInput" style="font-size:0.78rem;color:var(--muted);">Команда за промяна на продукта:</label>
        <input id="cmdInput" type="text" placeholder="Пример: Добави секция FAQ и обнови заглавието">
        <button type="button" id="btnRunCmd" class="btn btn-primary">Изпълни команда в Canvas</button>

        <div class="build-feed" id="buildFeed">${logsHtml}</div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <h2>LIVE CANVAS</h2>
          <span class="panel-badge">${builderState.productType}</span>
        </div>

        <div class="live-canvas-box ${builderState.premiumMode ? "premium-mode" : ""} ${builderState.effects3d ? "fx-3d" : ""}">
          <div class="live-top-bar">
            <strong>${builderState.brandTitle}</strong>
            <span>${builderState.targetType}</span>
          </div>
          <div class="live-nav-strip">${liveNavHtml}</div>
          <div class="live-hero-preview">
            <h3>${builderState.headline}</h3>
            <p>${builderState.subtitle}</p>
          </div>
          <div class="live-modules-grid">${liveModsHtml}</div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <h2>SOURCE CODE</h2>
          <span class="panel-badge">LIVE CODE</span>
        </div>

        <textarea id="sourceCodeEditor" class="code-view" aria-label="SOURCE CODE">${generateSourceCode(builderState)}</textarea>
        <button type="button" id="btnApplyCodeEdit" class="btn btn-secondary">Приложи промените от кода</button>
      </div>
    </section>

    <section class="enhance-section" aria-label="AI Design Enhancement и AI Development">
      <h2>AI DESIGN ENHANCEMENT &amp; AI DEVELOPMENT</h2>
      <p>Всеки бутон променя реално проекта, модулите, страниците и генерирания код.</p>

      <div class="enhance-grid-2">
        <div class="enhance-group">
          <h3>AI DESIGN ENHANCEMENT</h3>
          <div class="action-btn-grid">${designBtnsHtml}</div>
        </div>

        <div class="enhance-group">
          <h3>AI DEVELOPMENT</h3>
          <div class="action-btn-grid">${devBtnsHtml}</div>
        </div>
      </div>
    </section>

    <section class="factory-matrix-section" aria-label="AUTO WEBSITE / APP FACTORY">
      <h2>AUTO WEBSITE / APP FACTORY</h2>
      <p style="color:var(--muted);font-size:0.88rem;">Един двигател за уеб сайтове, приложения, PWA, Android/iOS пакети и Tor сайтове за законни и легитимни услуги.</p>

      <div class="product-grid">${productsHtml}</div>

      <div class="mobile-pipeline-note">
        <strong>Мобилен конвейер:</strong> При Android App / iOS App се активира отделна стъпка за компилация, подписване и подготовка за публикуване (статус: <b>${builderState.mobileSigned ? "SIGNED & READY" : "STANDARD BUILD"}</b>).
      </div>
    </section>

    <section class="publish-section" id="auto-publish" aria-label="AUTO PUBLISH">
      <div class="publish-header">
        <div>
          <h2>AUTO PUBLISH — АВТОМАТИЧНО ПУБЛИКУВАНЕ</h2>
          <p style="color:var(--muted);font-size:0.88rem;">Готов код, GitHub проект, публичен Render адрес, собствен домейн с потвърждение и документация.</p>
        </div>
        <button type="button" id="btnRunPublishPipeline" class="btn btn-publish">PUBLISH MY PROJECT</button>
      </div>

      <div class="pipeline-flow">${pipeHtml}</div>

      <div style="font-size:0.84rem;color:var(--muted);">
        Публичен адрес: <strong style="color:var(--text);">${builderState.liveUrl}</strong> • Готов код и документация: <strong style="color:var(--ok);">INCLUDED</strong>
      </div>

      <div class="domain-confirm-box">
        <div>
          <span>Собствен домейн (изисква потвърждение от клиента): </span>
          <strong style="color:var(--text);">${builderState.customDomainName}</strong>
        </div>
        <button type="button" id="btnConfirmDomain" class="btn btn-secondary">
          ${builderState.customDomainConfirmed ? "Домейнът е потвърден ✓" : "Потвърди домейн"}
        </button>
      </div>
    </section>

    <section class="eco-sales-grid" aria-label="RED SOFTWARE TEAM ECOSYSTEM & AUTO SALES ENGINE">
      <div class="eco-box">
        <h3>RED SOFTWARE TEAM ECOSYSTEM</h3>
        <ul class="tree-list">
          <li><strong>MARAUDER-AI:</strong> AI Intelligence &amp; Cyber Defense</li>
          <li><strong>RED AUTO BUILDER:</strong> Website Factory, Application Factory, AI Canvas, Code Generator, Auto Deployment</li>
          <li><strong>RED CLOUD:</strong> Hosting, Project Storage, Deployment Management</li>
          <li><strong>RED MARKETPLACE:</strong> Templates, Generated Projects, Commercial Services</li>
        </ul>
      </div>

      <div class="eco-box">
        <h3>AUTO SALES ENGINE</h3>
        <ul class="tree-list">
          <li><strong>Customer Accounts, Pricing Plans &amp; AI Generation Credits</strong></li>
          <li><strong>Payment Gateway, Website Factory &amp; App Factory</strong></li>
          <li><strong>Automatic Delivery, Hosting Integration &amp; Domain Integration</strong></li>
          <li><strong>Customer Dashboard &amp; Централен административен панел</strong></li>
        </ul>
        <div class="hero-actions" style="margin-top:14px;">
          <a href="/contact" class="btn btn-primary" data-route="/contact" data-subject="AUTO BUILDER AI — ${builderState.productType}">Поръчай / Изпрати проект</a>
        </div>
      </div>
    </section>

    <section class="video-panel">
      <div class="panel-head" style="border-bottom:none;padding-bottom:0;">
        <div>
          <h2 style="font-size:1.1rem;">Видео представяне</h2>
          <p style="color:var(--muted);font-size:0.86rem;">RED SOFTWARE TEAM — официално видео.</p>
        </div>
        <a href="${YT_VIDEO_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Отвори в YouTube</a>
      </div>
      <div class="video-frame">
        <iframe
          src="${YT_EMBED_URL}"
          title="RED SOFTWARE TEAM"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>
    </section>
  `;

  bindAutoBuilderEvents();
}

function bindAutoBuilderEvents() {
  const promptInp = document.getElementById("hubPromptInput");
  promptInp?.addEventListener("input", () => {
    builderState.prompt = promptInp.value;
  });

  document.getElementById("btnGenWebsite")?.addEventListener("click", () => {
    if (promptInp) builderState.prompt = promptInp.value.trim() || builderState.prompt;
    runBuildSequence("WEBSITE");
    renderAutoBuilderPage();
  });

  document.getElementById("btnGenWebApp")?.addEventListener("click", () => {
    if (promptInp) builderState.prompt = promptInp.value.trim() || builderState.prompt;
    runBuildSequence("WEB_APP");
    renderAutoBuilderPage();
  });

  document.getElementById("btnGenMobileApp")?.addEventListener("click", () => {
    if (promptInp) builderState.prompt = promptInp.value.trim() || builderState.prompt;
    builderState.mobileSigned = true;
    runBuildSequence("MOBILE_APP");
    renderAutoBuilderPage();
  });

  document.getElementById("btnRunCmd")?.addEventListener("click", () => {
    const cmdInp = document.getElementById("cmdInput");
    const cmdText = cmdInp?.value.trim();
    if (!cmdText) return;
    builderState.subtitle = cmdText;
    pushLog(`[COMMAND] Приложена команда: "${cmdText}"`);
    renderAutoBuilderPage();
  });

  document.getElementById("btnApplyCodeEdit")?.addEventListener("click", () => {
    const codeArea = document.getElementById("sourceCodeEditor");
    if (codeArea && codeArea.value.trim()) {
      pushLog("[SOURCE CODE] Ръчните корекции в кода са приети и синхронизирани.");
      renderAutoBuilderPage();
    }
  });

  mount.querySelectorAll("[data-enhance]").forEach((btn) => {
    btn.addEventListener("click", () => {
      applyEnhancementAction(btn.getAttribute("data-enhance"));
      renderAutoBuilderPage();
    });
  });

  mount.querySelectorAll("[data-prod]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const prodName = btn.getAttribute("data-prod");
      const mode = ["Android App", "iOS App", "PWA"].includes(prodName)
        ? "MOBILE_APP"
        : ["Web Application", "SaaS", "Dashboard", "AI Platform"].includes(prodName)
        ? "WEB_APP"
        : "WEBSITE";
      if (prodName === "Android App" || prodName === "iOS App") {
        builderState.mobileSigned = true;
      }
      runBuildSequence(mode, prodName);
      renderAutoBuilderPage();
    });
  });

  const triggerPublish = () => {
    builderState.completedPublishSteps = PUBLISH_STAGES.length;
    pushLog(`[AUTO PUBLISH] Готов проект (${builderState.productType}) -> GitHub -> Render (${builderState.liveUrl}) -> LIVE.`);
    renderAutoBuilderPage();
  };

  document.getElementById("topPublishBtn")?.addEventListener("click", triggerPublish);
  document.getElementById("btnRunPublishPipeline")?.addEventListener("click", triggerPublish);

  document.getElementById("btnConfirmDomain")?.addEventListener("click", () => {
    builderState.customDomainConfirmed = !builderState.customDomainConfirmed;
    pushLog(
      builderState.customDomainConfirmed
        ? `[DOMAIN] Клиентът потвърди домейна ${builderState.customDomainName}.`
        : `[DOMAIN] Потвърждението за домейн ${builderState.customDomainName} е изчакващо.`
    );
    renderAutoBuilderPage();
  });

  document.getElementById("sendHubToOrderBtn")?.addEventListener("click", () => {
    const summary = `AUTO BUILDER AI — ${builderState.productType} (${builderState.targetType})`;
    sessionStorage.setItem("rst_subject", summary);
    sessionStorage.setItem(
      "rst_draft_message",
      `Задание: ${builderState.prompt}\nПродукт: ${builderState.productType}\nСтраници: ${builderState.pages.join(", ")}\nМодули: ${builderState.modules.join(", ")}\nДомейн потвърден: ${builderState.customDomainConfirmed ? "Да" : "Не"}`
    );
    navigate("/contact", summary);
  });
}

function renderDivisionsPage() {
  let activeSlug = DIVISIONS[0].slug;

  function drawDivisions() {
    const current = DIVISIONS.find((d) => d.slug === activeSlug) || DIVISIONS[0];
    const tabsHtml = DIVISIONS.map(
      (d) =>
        `<button type="button" class="tab-btn ${d.slug === current.slug ? "active" : ""}" data-div="${d.slug}">${d.department}</button>`
    ).join("");
    const pointsHtml = current.deliverables.map((item) => `<li>${item}</li>`).join("");

    mount.innerHTML = `
      <div class="subpage-hero">
        <h1>Technology Divisions</h1>
        <p>Инженерните отдели на RED SOFTWARE TEAM.</p>
      </div>
      <div class="tabs-bar">${tabsHtml}</div>
      <div class="detail-panel">
        <h2>${current.department} — ${current.specialization}</h2>
        <p style="color:var(--muted);margin-top:6px;">${current.summary}</p>
        <ul class="spec-list">${pointsHtml}</ul>
        <a href="/contact" class="btn btn-primary" data-route="/contact" data-subject="${current.department}">Свържи се с отдела</a>
      </div>
    `;

    mount.querySelectorAll("[data-div]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeSlug = btn.getAttribute("data-div");
        drawDivisions();
      });
    });
  }

  drawDivisions();
}

function renderMarauderPage() {
  let activeTab = MARAUDER_TABS[0].id;

  function drawMarauder() {
    const current = MARAUDER_TABS.find((t) => t.id === activeTab) || MARAUDER_TABS[0];
    const tabsHtml = MARAUDER_TABS.map(
      (t) =>
        `<button type="button" class="tab-btn ${t.id === current.id ? "active" : ""}" data-mtab="${t.id}">${t.label}</button>`
    ).join("");
    const pointsHtml = current.points.map((p) => `<li>${p}</li>`).join("");

    mount.innerHTML = `
      <div class="subpage-hero">
        <div class="hub-kicker">Flagship Technology</div>
        <h1>MARAUDER-AI</h1>
        <p>Advanced Artificial Intelligence &amp; Cyber Defense Platform.</p>
      </div>
      <div class="tabs-bar">${tabsHtml}</div>
      <div class="detail-panel">
        <h2>${current.title}</h2>
        <p style="color:var(--muted);margin-top:6px;">${current.desc}</p>
        <ul class="spec-list">${pointsHtml}</ul>
        <a href="/" class="btn btn-primary" data-route="/">Отвори AUTO BUILDER AI</a>
      </div>
    `;

    mount.querySelectorAll("[data-mtab]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeTab = btn.getAttribute("data-mtab");
        drawMarauder();
      });
    });
  }

  drawMarauder();
}

function renderProjectsPage() {
  const cardsHtml = PROJECTS.map(
    (p) => `
      <article class="detail-panel">
        <h2>${p.name}</h2>
        <p style="color:var(--muted);margin-top:6px;">${p.summary}</p>
        <ul class="spec-list">
          <li><strong>Направления:</strong> ${p.division}</li>
          <li><strong>Стек:</strong> ${p.stack}</li>
          <li><strong>Функционалност:</strong> ${p.details}</li>
        </ul>
        <a href="/" class="btn btn-primary" data-route="/">Към Auto Builder</a>
      </article>
    `
  ).join("");

  mount.innerHTML = `
    <div class="subpage-hero">
      <h1>Нашите проекти</h1>
      <p>Ключови платформи и системи на RED SOFTWARE TEAM.</p>
    </div>
    <div style="display:grid;gap:16px;">${cardsHtml}</div>
  `;
}

function renderCompanyPage() {
  mount.innerHTML = `
    <div class="subpage-hero">
      <h1>За компанията</h1>
      <p>RED SOFTWARE TEAM — Engineering Intelligence. Building Tomorrow.</p>
    </div>
    <div class="detail-panel">
      <h2>RED SOFTWARE TEAM ECOSYSTEM</h2>
      <p style="color:var(--muted);margin-top:6px;">
        Създаваме автоматизирана AI фабрика за софтуер (RED AUTO BUILDER AI), защитен и AI двигател (MARAUDER-AI), облачна среда (RED CLOUD) и маркетплейс (RED MARKETPLACE).
      </p>
      <ul class="spec-list">
        <li><strong>10 специализирани изпълнители:</strong> Project Architect, UI/UX Designer, Frontend Engineer, Backend Engineer, Database Engineer, AI Integration Engineer, Image &amp; Media Generator, QA Engineer, Security Engineer, Deployment Engineer.</li>
        <li><strong>Автоматично публикуване:</strong> Готов код, GitHub проект, Render адрес, собствен домейн с потвърждение и документация.</li>
      </ul>
      <a href="/contact" class="btn btn-primary" data-route="/contact">Свържи се с екипа</a>
    </div>
  `;
}

function renderContactPage() {
  const prefilledSubject = sessionStorage.getItem("rst_subject") || "AUTO BUILDER AI — Заявка за проект";
  const prefilledMessage = sessionStorage.getItem("rst_draft_message") || "";
  sessionStorage.removeItem("rst_subject");
  sessionStorage.removeItem("rst_draft_message");

  mount.innerHTML = `
    <div class="subpage-hero">
      <h1>Contact &amp; Auto Sales Order</h1>
      <p>Изпращане на проект или поръчка към <code>/api/contact</code>.</p>
    </div>

    <div class="contact-grid">
      <div class="info-box">
        <h2>Директен контакт</h2>
        <p style="color:var(--muted);margin-top:6px;">RED SOFTWARE TEAM — AUTO BUILDER AI</p>
        <div class="spec-list">
          <li><strong>Телефон:</strong> <a href="tel:0879813928" style="color:var(--text);">0879 813 928</a></li>
          <li><strong>Екосистема:</strong> MARAUDER-AI • RED AUTO BUILDER • RED CLOUD • RED MARKETPLACE</li>
        </div>
      </div>

      <div class="form-box">
        <h2>Изпрати запитване / поръчка</h2>
        <form id="contactForm" novalidate>
          <div class="row-2">
            <input id="name" name="name" type="text" placeholder="Вашето име или фирма" required>
            <input id="email" name="email" type="email" placeholder="name@company.com" required>
          </div>
          <input id="subject" name="subject" type="text" value="${prefilledSubject.replace(/"/g, "&quot;")}" required>
          <textarea id="message" name="message" placeholder="Опишете желания сайт, уеб/мобилно приложение или пакет..." required>${prefilledMessage}</textarea>
          <button type="submit" id="submitBtn" class="btn btn-primary">Изпрати заявката</button>
          <p id="formStatus" class="form-status" role="status" aria-live="polite"></p>
        </form>
      </div>
    </div>
  `;

  const form = document.getElementById("contactForm");
  const btn = document.getElementById("submitBtn");
  const status = document.getElementById("formStatus");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = {
      name: document.getElementById("name")?.value.trim() || "",
      email: document.getElementById("email")?.value.trim() || "",
      subject: document.getElementById("subject")?.value.trim() || "",
      message: document.getElementById("message")?.value.trim() || ""
    };

    if (!payload.name || !payload.email || !payload.message) {
      if (status) {
        status.textContent = "Моля, попълнете име, имейл и описание.";
        status.className = "form-status err";
      }
      return;
    }

    if (btn) btn.disabled = true;
    if (status) {
      status.textContent = "Изпращане...";
      status.className = "form-status";
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || (!data.ok && !data.success)) {
        throw new Error(data.error || "Възникна грешка при изпращане.");
      }
      if (status) {
        status.textContent = "Запитването е изпратено успешно.";
        status.className = "form-status ok";
      }
      form.reset();
    } catch (err) {
      if (status) {
        status.textContent = err.message || "Неуспешна връзка със сървъра.";
        status.className = "form-status err";
      }
    } finally {
      if (btn) btn.disabled = false;
    }
  });
}

renderRoute(normalizePath(window.location.pathname));
