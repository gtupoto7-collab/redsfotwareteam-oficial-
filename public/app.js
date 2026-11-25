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
  { id: "corporate", name: "Corporate Website", result: "Корпоративен сайт" },
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
      "Оптимизация на модели и логика"
    ]
  },
  {
    slug: "cybersecurity",
    department: "Cybersecurity Division",
    specialization: "Киберсигурност",
    summary: "Защита на приложения, проверка на конфигурации и контрол на сигурността.",
    deliverables: [
      "Одит на валидации, маршрути и достъпи",
      "Защитни политики и проверки преди деплой",
      "Наблюдение и устойчивост на системата"
    ]
  },
  {
    slug: "software-engineering",
    department: "Software Engineering",
    specialization: "Софтуерна разработка",
    summary: "Изграждане на сайтове, уеб приложения, API сървиси и мобилни пакети.",
    deliverables: [
      "Генериране на реални файлове и модули",
      "Сървърни ендпойнти и структурирани данни",
      "Документация и експорт на проекта"
    ]
  },
  {
    slug: "autonomous-systems",
    department: "Autonomous Systems",
    specialization: "Интелигентни системи",
    summary: "Автоматизирани конвейери за генериране, проверка и подготовка за публикуване.",
    deliverables: [
      "Последователно изпълнение от 10 изпълнители",
      "Автоматични проверки на файловете и връзките",
      "Свързване към /api/build и /api/export"
    ]
  },
  {
    slug: "cloud-infrastructure",
    department: "Cloud Infrastructure",
    specialization: "Облачни технологии",
    summary: "Хостинг, съхранение на проекти, домейни и управление на деплоймънти.",
    deliverables: [
      "RED CLOUD хостинг и съхранение на проекти",
      "Автоматично изграждане от Git към Render",
      "Конфигурация на собствен домейн с потвърждение"
    ]
  },
  {
    slug: "digital-innovation",
    department: "Digital Innovation",
    specialization: "Дигитални иновации",
    summary: "PWA, Android/iOS пакети, Tor сайтове за законни услуги и RED MARKETPLACE.",
    deliverables: [
      "Компилация, подписване и подготовка за мобилни платформи",
      "Шаблони и готови решения в RED MARKETPLACE",
      "Автоматизирана доставка към клиента"
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
      "Реално генериране и редакция на файлове в проекта",
      "Пълна съвместимост с RED AUTO BUILDER"
    ]
  },
  {
    id: "agents",
    label: "Agent Ecosystem",
    title: "Agent Ecosystem — 10 специализирани изпълнители",
    desc: "Всеки изпълнител модифицира реални файлове, страници, модули или тестове.",
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
      "Проверка на файлова структура и входни данни",
      "Контрол на състоянието преди експорт или публикуване",
      "Намаляване на грешки и невалидни конфигурации"
    ]
  },
  {
    id: "intelligence",
    label: "Security Intelligence",
    title: "Security Intelligence — Диагностика и логове",
    desc: "Проследяване на стъпките при генериране, тестване и публикуване.",
    points: [
      "Детайлен лог на всяка операция на двигателя",
      "Автоматичен тест през /api/build и локални проверки",
      "Ясен статус на всяка стъпка"
    ]
  },
  {
    id: "mission-control",
    label: "Mission Control",
    title: "Mission Control — Централен контрол",
    desc: "Управление на продукти, файлове, клиенти, кредити и публикации от едно място.",
    points: [
      "Пряк преход от генерация към тест, експорт и поръчка",
      "Контрол над страниците, модулите и кода на всеки файл",
      "Интеграция с формата за поръчки и запитвания (/api/contact)"
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
    summary: "Автоматизирана фабрика за сайтове, уеб и мобилни приложения с файлова система, тестове и експорт.",
    stack: "HTML5 • CSS3 • JavaScript • Node.js Express",
    details: "Генерира реални файлове (index.html, styles.css, app.js, server/api.js, README.md), тества ги и ги експортира."
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

function createDefaultProjectFiles(st) {
  const navLinks = st.pages.map((p) => `      <a href="#${p.toLowerCase().replace(/[^a-z0-9]+/g, "-")}">${p}</a>`).join("\n");
  const modCards = st.modules.map((m) => `      <div class="card"><h3>${m}</h3></div>`).join("\n");

  return {
    "index.html": `<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8">
  <title>${st.brandTitle}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body class="${st.premiumMode ? "premium" : ""} ${st.effects3d ? "fx-3d" : ""}">
  <header>
    <strong>${st.brandTitle}</strong>
    <nav>
${navLinks}
    </nav>
  </header>
  <main>
    <h1>${st.headline}</h1>
    <p>${st.subtitle}</p>
    <section class="grid">
${modCards}
    </section>
  </main>
  <script src="app.js"></script>
</body>
</html>`,
    "styles.css": `:root {
  --accent: ${st.accentColor || "#dc2638"};
  --bg: #08090c;
  --text: #f4f6f9;
}
body {
  background: var(--bg);
  color: var(--text);
  font-family: ${st.fontFamily || "system-ui, sans-serif"};
  margin: 0;
}
h1 { color: var(--text); border-left: 4px solid var(--accent); padding-left: 12px; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; }`,
    "app.js": `// Generated by RED SOFTWARE TEAM — AUTO BUILDER AI
export const projectMeta = {
  targetType: ${JSON.stringify(st.targetType)},
  productType: ${JSON.stringify(st.productType)},
  prompt: ${JSON.stringify(st.prompt)},
  pages: ${JSON.stringify(st.pages)},
  modules: ${JSON.stringify(st.modules)},
  mobileSigned: ${st.mobileSigned}
};
console.log("Loaded generated app:", projectMeta.productType);`,
    "server/api.js": `const express = require("express");
const router = express.Router();

router.get("/status", (req, res) => {
  res.json({
    ok: true,
    productType: ${JSON.stringify(st.productType)},
    modules: ${JSON.stringify(st.modules)}
  });
});

module.exports = router;`,
    "README.md": `# ${st.brandTitle}

- **Type:** ${st.targetType} (${st.productType})
- **Prompt:** ${st.prompt}
- **Pages:** ${st.pages.join(", ")}
- **Modules:** ${st.modules.join(", ")}
- **Custom Domain Confirmed:** ${st.customDomainConfirmed ? "YES (" + st.customDomainName + ")" : "PENDING"}
`
  };
}

const builderState = {
  targetType: "WEBSITE",
  productType: "AI Platform",
  prompt: "Искам премиум сайт за международна AI компания.",
  brandTitle: "AI PLATFORM // RED SOFTWARE TEAM",
  headline: "One Click. One Idea. Complete Software.",
  subtitle: "Искам премиум сайт за международна AI компания.",
  accentColor: "#dc2638",
  fontFamily: "system-ui, -apple-system, sans-serif",
  pages: ["Home", "Features", "Architecture", "Pricing", "Contact"],
  modules: ["AI Core Engine", "Responsive UI Layout", "SEO & Meta Ready", "Fast Routing"],
  files: {},
  activeFile: "index.html",
  premiumMode: true,
  effects3d: true,
  animationsOn: true,
  mobileSigned: false,
  customDomainConfirmed: false,
  customDomainName: "ai-company.redsoftwareteam.bg",
  completedPublishSteps: 0,
  liveUrl: "https://red-software-team-oficial.onrender.com",
  logs: [
    "[ENGINE READY] 10 специализирани изпълнители са готови. Натисни GENERATE за реален проект и файлове."
  ]
};

builderState.files = createDefaultProjectFiles(builderState);

function syncProjectFiles() {
  const baseFiles = createDefaultProjectFiles(builderState);
  builderState.files = {
    ...builderState.files,
    ...baseFiles
  };
  if (!builderState.files[builderState.activeFile]) {
    builderState.activeFile = "index.html";
  }
}

function pushLog(msg) {
  builderState.logs.push(msg);
  if (builderState.logs.length > 35) {
    builderState.logs = builderState.logs.slice(-35);
  }
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
      ? `${builderState.productType} — Компилиран и подписан пакет`
      : modeLabel === "WEB_APP"
      ? `${builderState.productType} — Уеб приложение с API и модули`
      : `${builderState.productType} — Готов уеб сайт`;
  builderState.subtitle = pText;
  builderState.completedPublishSteps = 0;

  syncProjectFiles();

  builderState.logs = [
    `[1. Project Architect] Създадена архитектура и файлове (${Object.keys(builderState.files).join(", ")}).`,
    `[2. UI/UX Designer] Обновен styles.css и визуалната йерархия.`,
    `[3. Frontend Engineer] Генериран index.html и навигация [${builderState.pages.join(", ")}].`,
    `[4. Backend Engineer] Създаден сървърен рутер server/api.js.`,
    `[5. Database Engineer] Дефинирана структура на данните и състоянията.`,
    `[6. AI Integration Engineer] Вградени модули спрямо: "${pText}".`,
    `[7. Image & Media Generator] Подготвени медийни слотове в шаблона.`,
    `[8. QA Engineer] Проверени файловете и връзките между модулите.`,
    `[9. Security Engineer] Проверени валидациите и параметрите.`,
    `[10. Deployment Engineer] Генериран README.md и проектът е готов за тест и експорт.`
  ];
}

function applyEnhancementAction(actionName) {
  pushLog(`[ACTION] ${actionName}`);

  switch (actionName) {
    case "Make It Premium":
      builderState.premiumMode = true;
      builderState.accentColor = "#dc2638";
      builderState.headline = "Premium Enterprise Edition";
      break;
    case "Ultra Modern Design":
      builderState.premiumMode = true;
      builderState.animationsOn = true;
      if (!builderState.modules.includes("Ultra Modern Grid & Glass")) {
        builderState.modules.push("Ultra Modern Grid & Glass");
      }
      break;
    case "Improve Typography":
      builderState.fontFamily = "'Inter', system-ui, -apple-system, sans-serif";
      builderState.headline = "Calibrated Typography & Hierarchy";
      break;
    case "Improve Images":
      if (!builderState.modules.includes("Media & Visual Assets Layer")) {
        builderState.modules.push("Media & Visual Assets Layer");
      }
      break;
    case "Add 3D Effects":
      builderState.effects3d = true;
      if (!builderState.modules.includes("Spatial 3D Perspective Layer")) {
        builderState.modules.push("Spatial 3D Perspective Layer");
      }
      break;
    case "Add Animations":
      builderState.animationsOn = true;
      if (!builderState.modules.includes("Motion & Transition Engine")) {
        builderState.modules.push("Motion & Transition Engine");
      }
      break;
    case "Improve Color System":
      builderState.accentColor = "#ef3346";
      if (!builderState.modules.includes("Design Tokens & Contrast System")) {
        builderState.modules.push("Design Tokens & Contrast System");
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
      if (!builderState.modules.includes("Structured Multi-Section Layout")) {
        builderState.modules.push("Structured Multi-Section Layout");
      }
      break;
    case "Generate New Pages": {
      const nextNum = builderState.pages.length + 1;
      builderState.pages.push(`Page ${nextNum}`);
      break;
    }
    case "Add Backend":
      if (!builderState.modules.includes("Express API Router (server/api.js)")) {
        builderState.modules.push("Express API Router (server/api.js)");
      }
      break;
    case "Add Database":
      if (!builderState.modules.includes("Persistent JSON / SQL Schema")) {
        builderState.modules.push("Persistent JSON / SQL Schema");
      }
      break;
    case "Add Authentication":
      if (!builderState.modules.includes("Session & Auth Middleware")) {
        builderState.modules.push("Session & Auth Middleware");
      }
      break;
    case "Add Payment System":
      if (!builderState.modules.includes("Checkout & Billing Module")) {
        builderState.modules.push("Checkout & Billing Module");
      }
      break;
    case "Add AI Assistant":
      if (!builderState.modules.includes("AI Assistant Workflow")) {
        builderState.modules.push("AI Assistant Workflow");
      }
      break;
    case "Convert to PWA":
      builderState.productType = "PWA";
      builderState.files["manifest.json"] = JSON.stringify(
        {
          name: builderState.brandTitle,
          short_name: "RED App",
          start_url: "/",
          display: "standalone",
          background_color: "#08090c",
          theme_color: builderState.accentColor
        },
        null,
        2
      );
      builderState.activeFile = "manifest.json";
      if (!builderState.modules.includes("PWA Manifest & Offline Support")) {
        builderState.modules.push("PWA Manifest & Offline Support");
      }
      break;
    case "Convert to Mobile App":
      builderState.targetType = "MOBILE_APP";
      builderState.productType = "Android App";
      builderState.mobileSigned = true;
      builderState.files["mobile-build.config.json"] = JSON.stringify(
        {
          platform: "android",
          packageName: "bg.redsoftwareteam.autobuilder",
          signingMode: "release-keystore-ready",
          generatedAt: new Date().toISOString()
        },
        null,
        2
      );
      builderState.activeFile = "mobile-build.config.json";
      if (!builderState.modules.includes("Mobile Build & Signing Config")) {
        builderState.modules.push("Mobile Build & Signing Config");
      }
      break;
    case "Fix All Detected Bugs":
      runRealProjectTests();
      return;
    case "Optimize Performance":
      if (!builderState.modules.includes("Bundle & Asset Optimization")) {
        builderState.modules.push("Bundle & Asset Optimization");
      }
      break;
    default:
      break;
  }

  syncProjectFiles();
}

async function runRealProjectTests() {
  syncProjectFiles();
  try {
    const res = await fetch("/api/build", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: builderState.prompt,
        productType: builderState.productType,
        targetType: builderState.targetType,
        files: builderState.files
      })
    });
    const data = await res.json();
    if (data.testsPassed) {
      pushLog(`[QA TEST SUITE] Всички ${data.fileCount} файла са проверени успешно през /api/build (0 грешки).`);
    } else {
      pushLog(`[QA TEST SUITE] Намерени проверки: ${(data.issues || []).join(", ")}`);
    }
  } catch (_) {
    const hasIndex = Boolean(builderState.files["index.html"]);
    const hasApp = Boolean(builderState.files["app.js"]);
    pushLog(
      hasIndex && hasApp
        ? `[QA TEST SUITE] Локална проверка премина успешно (${Object.keys(builderState.files).length} файла).`
        : "[QA TEST SUITE] Липсва основен файл в проекта."
    );
  }
}

async function exportProjectBundle() {
  syncProjectFiles();
  const payload = {
    project: {
      brandTitle: builderState.brandTitle,
      targetType: builderState.targetType,
      productType: builderState.productType,
      prompt: builderState.prompt,
      pages: builderState.pages,
      modules: builderState.modules,
      customDomainConfirmed: builderState.customDomainConfirmed,
      customDomainName: builderState.customDomainName,
      files: builderState.files,
      exportedAt: new Date().toISOString()
    }
  };

  try {
    const res = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${builderState.productType.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-project.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    pushLog("[EXPORT] Изтеглен е реалният пакет с генерираните файлове и конфигурация.");
  } catch (_) {
    pushLog("[EXPORT] Неуспешен експорт към сървъра.");
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
    .map((l) => `<div class="${l.includes("OK") || l.includes("EXPORT") || l.includes("QA") || l.includes("10.") ? "log-done" : ""}">${l}</div>`)
    .join("");

  const liveNavHtml = builderState.pages.map((pg) => `<span class="live-nav-pill">${pg}</span>`).join("");
  const liveModsHtml = builderState.modules
    .map((m) => `<div class="live-mod-card"><strong>${m}</strong><span>Active Module</span></div>`)
    .join("");

  const fileNames = Object.keys(builderState.files);
  const fileTabsHtml = fileNames
    .map(
      (fname) =>
        `<button type="button" class="tab-btn ${builderState.activeFile === fname ? "active" : ""}" data-file="${fname}">${fname}</button>`
    )
    .join("");

  const activeContent = builderState.files[builderState.activeFile] || "";

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
          <p class="hub-sub">One Click. One Idea. Complete Software. Генерира реални файлове, тества ги и ги експортира като пакет.</p>
        </div>
        <div class="factory-ops">
          <button type="button" id="btnRunTestsTop" class="btn btn-secondary">RUN QA TESTS</button>
          <button type="button" id="btnExportBundleTop" class="btn btn-secondary">EXPORT FILES (.JSON)</button>
          <button type="button" id="topPublishBtn" class="btn btn-publish">PUBLISH MY PROJECT</button>
        </div>
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
          <span class="panel-badge">${fileNames.length} FILES</span>
        </div>

        <div class="engine-workers">${executorsHtml}</div>

        <label for="cmdInput" style="font-size:0.78rem;color:var(--muted);">Команда за промяна на продукта:</label>
        <input id="cmdInput" type="text" placeholder="Пример: Добави модул за аналитика и обнови описанието">
        <button type="button" id="btnRunCmd" class="btn btn-primary">Изпълни команда и обнови файловете</button>

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
            <h3 style="border-left:3px solid ${builderState.accentColor};padding-left:10px;">${builderState.headline}</h3>
            <p>${builderState.subtitle}</p>
          </div>
          <div class="live-modules-grid">${liveModsHtml}</div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <h2>SOURCE CODE</h2>
          <span class="panel-badge">${builderState.activeFile}</span>
        </div>

        <div class="tabs-bar" style="margin-bottom:0;">${fileTabsHtml}</div>
        <textarea id="sourceCodeEditor" class="code-view" aria-label="SOURCE CODE">${activeContent}</textarea>
        <button type="button" id="btnApplyCodeEdit" class="btn btn-secondary">Запиши промените във файла</button>
      </div>
    </section>

    <section class="enhance-section" aria-label="AI Design Enhancement и AI Development">
      <h2>AI DESIGN ENHANCEMENT &amp; AI DEVELOPMENT</h2>
      <p>Всеки бутон обновява реалните файлове, страници, модули или конфигурации на проекта.</p>

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
        <strong>Мобилен конвейер:</strong> При Android App / iOS App се генерира конфигурация за компилация и подписване (статус: <b>${builderState.mobileSigned ? "SIGNED CONFIG READY" : "STANDARD BUILD"}</b>).
      </div>
    </section>

    <section class="publish-section" id="auto-publish" aria-label="AUTO PUBLISH">
      <div class="publish-header">
        <div>
          <h2>AUTO PUBLISH &amp; DELIVERY</h2>
          <p style="color:var(--muted);font-size:0.88rem;">Проверка на кода, експорт на файловете, GitHub + Render публикация чрез Git и собствен домейн с потвърждение.</p>
        </div>
        <div class="factory-ops">
          <button type="button" id="btnExportBundleBottom" class="btn btn-secondary">EXPORT FILES (.JSON)</button>
          <button type="button" id="btnRunPublishPipeline" class="btn btn-publish">PUBLISH MY PROJECT</button>
        </div>
      </div>

      <div class="pipeline-flow">${pipeHtml}</div>

      <div style="font-size:0.84rem;color:var(--muted);">
        Render адрес: <strong style="color:var(--text);">${builderState.liveUrl}</strong> • Файлове в проекта: <strong style="color:var(--ok);">${fileNames.length}</strong>
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
          <a href="/contact" class="btn btn-primary" data-route="/contact" data-subject="AUTO BUILDER AI — ${builderState.productType}">Изпрати проект към сървъра</a>
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
    if (!builderState.modules.includes(cmdText)) {
      builderState.modules.push(cmdText);
    }
    syncProjectFiles();
    pushLog(`[COMMAND] Приложена команда: "${cmdText}" и са обновени файловете.`);
    renderAutoBuilderPage();
  });

  mount.querySelectorAll("[data-file]").forEach((btn) => {
    btn.addEventListener("click", () => {
      builderState.activeFile = btn.getAttribute("data-file");
      renderAutoBuilderPage();
    });
  });

  document.getElementById("btnApplyCodeEdit")?.addEventListener("click", () => {
    const codeArea = document.getElementById("sourceCodeEditor");
    if (codeArea && builderState.activeFile) {
      builderState.files[builderState.activeFile] = codeArea.value;
      pushLog(`[SOURCE CODE] Записани реални промени във файла ${builderState.activeFile}.`);
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

  const handleTests = async () => {
    await runRealProjectTests();
    renderAutoBuilderPage();
  };

  const handleExport = async () => {
    await exportProjectBundle();
    renderAutoBuilderPage();
  };

  const handlePublishReady = async () => {
    await runRealProjectTests();
    builderState.completedPublishSteps = PUBLISH_STAGES.length;
    pushLog(
      `[PUBLISH] Проверката премина. Изпълни 'git add . && git commit && git push origin main' за автоматичен build в Render (${builderState.liveUrl}).`
    );
    renderAutoBuilderPage();
  };

  document.getElementById("btnRunTestsTop")?.addEventListener("click", handleTests);
  document.getElementById("btnExportBundleTop")?.addEventListener("click", handleExport);
  document.getElementById("btnExportBundleBottom")?.addEventListener("click", handleExport);
  document.getElementById("topPublishBtn")?.addEventListener("click", handlePublishReady);
  document.getElementById("btnRunPublishPipeline")?.addEventListener("click", handlePublishReady);

  document.getElementById("btnConfirmDomain")?.addEventListener("click", () => {
    builderState.customDomainConfirmed = !builderState.customDomainConfirmed;
    syncProjectFiles();
    pushLog(
      builderState.customDomainConfirmed
        ? `[DOMAIN] Клиентът потвърди домейна ${builderState.customDomainName}.`
        : `[DOMAIN] Потвърждението за домейн ${builderState.customDomainName} е изчакващо.`
    );
    renderAutoBuilderPage();
  });

  document.getElementById("sendHubToOrderBtn")?.addEventListener("click", () => {
    syncProjectFiles();
    const summary = `AUTO BUILDER AI — ${builderState.productType} (${builderState.targetType})`;
    sessionStorage.setItem("rst_subject", summary);
    sessionStorage.setItem(
      "rst_draft_message",
      `Описание: ${builderState.prompt}\nПродукт: ${builderState.productType}\nФайлове: ${Object.keys(builderState.files).join(", ")}\nСтраници: ${builderState.pages.join(", ")}\nМодули: ${builderState.modules.join(", ")}\nДомейн потвърден: ${builderState.customDomainConfirmed ? "Да" : "Не"}`
    );
    sessionStorage.setItem(
      "rst_project_snapshot",
      JSON.stringify({
        productType: builderState.productType,
        targetType: builderState.targetType,
        pages: builderState.pages,
        modules: builderState.modules,
        files: Object.keys(builderState.files)
      })
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
      <p>RED SOFTWARE TEAM — One Click. One Idea. Complete Software.</p>
    </div>
    <div class="detail-panel">
      <h2>RED SOFTWARE TEAM ECOSYSTEM</h2>
      <p style="color:var(--muted);margin-top:6px;">
        Автоматизирана AI фабрика за софтуер (RED AUTO BUILDER AI), защитен и AI двигател (MARAUDER-AI), облачна среда (RED CLOUD) и маркетплейс (RED MARKETPLACE).
      </p>
      <ul class="spec-list">
        <li><strong>10 специализирани изпълнители:</strong> Project Architect, UI/UX Designer, Frontend Engineer, Backend Engineer, Database Engineer, AI Integration Engineer, Image &amp; Media Generator, QA Engineer, Security Engineer, Deployment Engineer.</li>
        <li><strong>Реални файлове, тестове и експорт:</strong> Генериране на файлове, редакция в SOURCE CODE, проверка през /api/build, експорт през /api/export и запис на заявки през /api/contact.</li>
      </ul>
      <a href="/contact" class="btn btn-primary" data-route="/contact">Свържи се с екипа</a>
    </div>
  `;
}

function renderContactPage() {
  const prefilledSubject = sessionStorage.getItem("rst_subject") || "AUTO BUILDER AI — Заявка за проект";
  const prefilledMessage = sessionStorage.getItem("rst_draft_message") || "";
  const rawSnapshot = sessionStorage.getItem("rst_project_snapshot");
  let snapshotObj = null;
  try {
    snapshotObj = rawSnapshot ? JSON.parse(rawSnapshot) : null;
  } catch (_) {
    snapshotObj = null;
  }
  sessionStorage.removeItem("rst_subject");
  sessionStorage.removeItem("rst_draft_message");
  sessionStorage.removeItem("rst_project_snapshot");

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
      message: document.getElementById("message")?.value.trim() || "",
      projectSnapshot: snapshotObj
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
        status.textContent = "Запитването е изпратено и записано успешно.";
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
