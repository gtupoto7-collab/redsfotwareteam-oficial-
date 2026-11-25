const mount = document.getElementById("appMount");
const YT_VIDEO_URL = "https://www.youtube.com/watch?v=JBYo4n9uTOM";
const YT_EMBED_URL = "https://www.youtube-nocookie.com/embed/JBYo4n9uTOM?rel=0";

const DIVISIONS = [
  {
    slug: "ai-rd",
    department: "AI Research & Development",
    specialization: "Изкуствен интелект",
    summary: "Приложен изкуствен интелект, автоматизация на процеси, класификация, търсене и интеграция с фирмени системи.",
    deliverables: [
      "Интелигентни асистенти и вътрешни инструменти",
      "Автоматизирана обработка на заявки и документи",
      "API интеграции към съществуващи уеб и сървърни услуги"
    ]
  },
  {
    slug: "cybersecurity",
    department: "Cybersecurity Division",
    specialization: "Киберсигурност",
    summary: "Защита на уеб приложения, проверка на конфигурации, контрол на достъпа и устойчивост на инфраструктурата.",
    deliverables: [
      "Преглед на HTTP заглавия, валидации и автентикация",
      "Одит на уязвимости в конфигурации и зависимости",
      "Препоръки и внедряване на защитни политики"
    ]
  },
  {
    slug: "software-engineering",
    department: "Software Engineering",
    specialization: "Софтуерна разработка",
    summary: "Изграждане на уеб платформи, REST API услуги, административни панели и клиентски приложения.",
    deliverables: [
      "Модулни уеб приложения и сървърни API сървиси",
      "Надеждно съхранение и обмен на данни",
      "Поддръжка, рефакторинг и разширяване на функционалности"
    ]
  },
  {
    slug: "autonomous-systems",
    department: "Autonomous Systems",
    specialization: "Интелигентни системи",
    summary: "Автоматизирани работни потоци, фонови задачи, наблюдение на събития и координирани скриптове.",
    deliverables: [
      "Сценарии за непрекъсната автоматизация",
      "Сигнализация и реакция при промени в състоянието",
      "Ясна оперативна логика без ръчна намеса"
    ]
  },
  {
    slug: "cloud-infrastructure",
    department: "Cloud Infrastructure",
    specialization: "Облачни технологии",
    summary: "Подготовка, деплой и поддръжка на приложения в облачна среда с фокус върху достъпност и предвидимост.",
    deliverables: [
      "Конфигурация на среди и променливи за изпълнение",
      "Непрекъснато пускане на обновления от Git репозитори",
      "Диагностика на достъпност и логове"
    ]
  },
  {
    slug: "digital-innovation",
    department: "Digital Innovation",
    specialization: "Дигитални иновации",
    summary: "Създаване на съвременни дигитални продукти, интерактивни интерфейси и нови бизнес формати.",
    deliverables: [
      "Проектиране на потребителски потоци и интерфейси",
      "Бързо прототипиране до работещо решение",
      "Свързване на уеб, мобилни и автоматизирани канали"
    ]
  }
];

const MARAUDER_TABS = [
  {
    id: "architecture",
    label: "AI Architecture",
    title: "AI Architecture — Модулна структура на MARAUDER-AI",
    desc: "Слоеста архитектура, разделяща входящите заявки, логиката за обработка, инструментите и връзката с външни услуги.",
    points: [
      "Ясно разделение между интерфейс, оркестрация и изпълнение",
      "Стандартизирани формати на данни и предвидими отговори",
      "Готовност за разширяване с нови модули без пренаписване на ядрото"
    ]
  },
  {
    id: "agents",
    label: "Agent Ecosystem",
    title: "Agent Ecosystem — Специализирани агенти",
    desc: "Координация на задачи между отделни модули за анализ, структуриране на информация и автоматизация.",
    points: [
      "Разбиване на сложни задачи на ясни стъпки",
      "Повторно използваеми задачи за регулярни операции",
      "Проследимост на всяка стъпка и резултат"
    ]
  },
  {
    id: "defense",
    label: "Cyber Defense",
    title: "Cyber Defense — Защитни механизми",
    desc: "Фокус върху валидация на входни данни, ограничаване на грешки и защитена комуникация.",
    points: [
      "Контрол и проверка на данните преди обработка",
      "Безопасна работа с конфигурации и достъпи",
      "Намаляване на рисковете при външни заявки"
    ]
  },
  {
    id: "intelligence",
    label: "Security Intelligence",
    title: "Security Intelligence — Анализ и сигнали",
    desc: "Събиране и подреждане на техническа информация за по-бързо откриване на аномалии и проблеми.",
    points: [
      "Структурирани записи за събития и грешки",
      "Съпоставяне на състоянието на услугите във времето",
      "Ясна основа за инженерни решения"
    ]
  },
  {
    id: "mission-control",
    label: "Mission Control",
    title: "Mission Control — Оперативно управление",
    desc: "Централен преглед върху активните модули, статуса на системата и насочване към конкретни действия.",
    points: [
      "Бърз достъп до ключовите компоненти на платформата",
      "Проверка на здравето на сървърните маршрути",
      "Директна връзка с екипа при нужда от намеса"
    ]
  },
  {
    id: "overview",
    label: "Technology Overview",
    title: "Technology Overview — Практическо приложение",
    desc: "MARAUDER-AI обединява инженерни практики за софтуерна разработка, автоматизация и защита в единна рамка.",
    points: [
      "Съвместимост с уеб интерфейси и Node.js бекенд услуги",
      "Адаптация към реални бизнес и технически изисквания",
      "Постепенно развитие на база реална употреба"
    ]
  }
];

const PROJECTS = [
  {
    id: "marauder-ai-core",
    name: "MARAUDER-AI Platform",
    division: "AI Research & Development • Cybersecurity",
    summary: "Инженерна рамка за интелигентни агенти, автоматизация на работни потоци и структуриран анализ.",
    stack: "Web UI • Modular Services • API Integration",
    details: "Обединява модули за обработка на заявки, автоматизация на задачи и наблюдение на състоянието на системата."
  },
  {
    id: "enterprise-web-suite",
    name: "Enterprise Web & API Suite",
    division: "Software Engineering • Cloud Infrastructure",
    summary: "Многостранични уеб платформи и сървърни API услуги за прием на запитвания и управление на съдържание.",
    stack: "HTML5 • CSS3 • JavaScript • Node.js",
    details: "Изграден с фокус върху бързо зареждане, ясна навигация, стабилни маршрути и директна връзка с бекенд ендпойнти."
  },
  {
    id: "workflow-automation-engine",
    name: "Workflow Automation Engine",
    division: "Autonomous Systems • Digital Innovation",
    summary: "Автоматизирани сценарии за комуникация, структуриране на данни и синхронизация между процеси.",
    stack: "Event Flows • Webhooks • Structured Data",
    details: "Намалява ръчната работа при повторяеми операции и осигурява последователност на резултатите."
  }
];

let animId = null;

function stopCanvas() {
  if (animId) {
    cancelAnimationFrame(animId);
    animId = null;
  }
}

function startCenterCanvas() {
  stopCanvas();
  const canvas = document.getElementById("archCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let t = 0;

  function draw() {
    t += 0.012;
    const w = (canvas.width = canvas.clientWidth || 520);
    const h = (canvas.height = canvas.clientHeight || 310);

    ctx.fillStyle = "#0b0d11";
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    const step = 32;
    for (let x = 0; x <= w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const cx = w * 0.5;
    const cy = h * 0.54;
    const bw = Math.min(w * 0.56, 260);
    const bd = 54;
    const bh = 92;
    const tiltX = Math.sin(t) * 14;
    const tiltY = Math.cos(t * 0.8) * 6;

    const topCenter = { x: cx + tiltX * 0.4, y: cy - bh + tiltY * 0.4 };
    const botCenter = { x: cx, y: cy + 16 };

    const cornersTop = [
      { x: topCenter.x - bw * 0.5, y: topCenter.y },
      { x: topCenter.x + bw * 0.5, y: topCenter.y },
      { x: topCenter.x + bw * 0.35, y: topCenter.y - bd * 0.6 },
      { x: topCenter.x - bw * 0.35, y: topCenter.y - bd * 0.6 }
    ];
    const cornersBot = [
      { x: botCenter.x - bw * 0.5, y: botCenter.y },
      { x: botCenter.x + bw * 0.5, y: botCenter.y },
      { x: botCenter.x + bw * 0.35, y: botCenter.y - bd * 0.6 },
      { x: botCenter.x - bw * 0.35, y: botCenter.y - bd * 0.6 }
    ];

    ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.28)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    cornersTop.forEach((p, idx) => (idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    for (let i = 0; i < 4; i++) {
      ctx.strokeStyle = i === 1 ? "rgba(217, 43, 58, 0.65)" : "rgba(255, 255, 255, 0.16)";
      ctx.beginPath();
      ctx.moveTo(cornersTop[i].x, cornersTop[i].y);
      ctx.lineTo(cornersBot[i].x, cornersBot[i].y);
      ctx.stroke();
    }

    ctx.strokeStyle = "rgba(255, 255, 255, 0.18)";
    ctx.beginPath();
    cornersBot.forEach((p, idx) => (idx === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
    ctx.closePath();
    ctx.stroke();

    const pulseY = botCenter.y - ((t * 36) % (bh + 10));
    ctx.strokeStyle = "rgba(217, 43, 58, 0.55)";
    ctx.beginPath();
    ctx.moveTo(cx - bw * 0.42, pulseY);
    ctx.lineTo(cx + bw * 0.42, pulseY);
    ctx.stroke();

    ctx.fillStyle = "#d92b3a";
    ctx.beginPath();
    ctx.arc(topCenter.x, topCenter.y - bd * 0.3, 4.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#a4acb9";
    ctx.font = "600 11px system-ui, sans-serif";
    ctx.fillText("RED CENTER // SPATIAL ARCHITECTURE", 14, 22);

    animId = requestAnimationFrame(draw);
  }

  draw();
}

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  const clean = pathname.replace(/\/+$/, "");
  const allowed = [
    "/",
    "/divisions",
    "/marauder-ai",
    "/projects",
    "/company",
    "/contact"
  ];
  return allowed.includes(clean) ? clean : "/";
}

function navigate(path, extraState = {}) {
  const target = normalizePath(path);
  if (extraState.subject) {
    sessionStorage.setItem("rst_subject", extraState.subject);
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
    navigate(route, { subject });
  }
});

function setActiveNav(path) {
  document.querySelectorAll(".nav-link").forEach((el) => {
    el.classList.toggle("active", el.getAttribute("data-route") === path);
  });
}

function renderRoute(path) {
  stopCanvas();
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
    renderHomePage();
  }
}

function renderHomePage() {
  const rowsHtml = DIVISIONS.map(
    (d) => `
      <tr>
        <td><strong>${d.department}</strong></td>
        <td>${d.specialization}</td>
        <td style="text-align:right;">
          <a href="/divisions" class="btn btn-ghost" data-route="/divisions" data-subject="${d.department}">Отвори отдел</a>
        </td>
      </tr>
    `
  ).join("");

  const projectsHtml = PROJECTS.map(
    (p) => `
      <article class="card">
        <div>
          <h3>${p.name}</h3>
          <p>${p.summary}</p>
        </div>
        <div>
          <div class="card-meta">${p.division}</div>
          <div class="hero-actions" style="margin-top:14px;">
            <a href="/projects" class="btn btn-secondary" data-route="/projects" data-subject="${p.name}">Отвори проект</a>
          </div>
        </div>
      </article>
    `
  ).join("");

  mount.innerHTML = `
    <section class="hero">
      <div>
        <div class="hero-kicker">Enterprise Software &amp; AI Organization</div>
        <h1>RED SOFTWARE TEAM</h1>
        <p class="hero-tagline">Engineering Intelligence. Building Tomorrow.</p>
        <p class="hero-pillars">Artificial Intelligence. Software Engineering. Cybersecurity. Advanced Digital Systems.</p>

        <div class="hero-actions">
          <a href="/divisions" class="btn btn-primary" data-route="/divisions">Explore Our Technology</a>
          <a href="/projects" class="btn btn-secondary" data-route="/projects">Our Solutions</a>
          <a href="/contact" class="btn btn-ghost" data-route="/contact">Contact Our Team</a>
        </div>
      </div>

      <aside class="center-stage" aria-label="Архитектурна 3D визуализация на технологичен център">
        <div class="stage-top">
          <strong>Technology Center Model</strong>
          <span>Architecture View</span>
        </div>
        <canvas id="archCanvas"></canvas>
        <div class="stage-caption">
          <span>Модулна структура на R&amp;D, софтуер и защита</span>
          <span>RED SOFTWARE TEAM</span>
        </div>
      </aside>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h2>Technology Divisions</h2>
          <p>Организационна структура на инженерните отдели в RED SOFTWARE TEAM.</p>
        </div>
        <a href="/divisions" class="btn btn-secondary" data-route="/divisions">Всички отдели</a>
      </div>

      <div class="divisions-table-wrap">
        <table class="divisions-table">
          <thead>
            <tr>
              <th>Отдел</th>
              <th>Специализация</th>
              <th style="text-align:right;">Страница</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    </section>

    <section class="section">
      <div class="flagship-box">
        <div>
          <span class="flagship-label">Flagship Technology</span>
          <h2>MARAUDER-AI</h2>
          <p>Advanced Artificial Intelligence &amp; Cyber Defense Platform.</p>
          <div class="hero-actions">
            <a href="/marauder-ai" class="btn btn-primary" data-route="/marauder-ai">Отвори MARAUDER-AI</a>
            <a href="/contact" class="btn btn-secondary" data-route="/contact" data-subject="MARAUDER-AI Platform">Запитване за MARAUDER-AI</a>
          </div>
        </div>

        <div class="pillar-list">
          <div class="pillar-item">AI Architecture</div>
          <div class="pillar-item">Agent Ecosystem</div>
          <div class="pillar-item">Cyber Defense</div>
          <div class="pillar-item">Security Intelligence</div>
          <div class="pillar-item">Mission Control</div>
          <div class="pillar-item">Technology Overview</div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <h2>Нашите проекти</h2>
          <p>Решения с реални функционалности и техническа насоченост.</p>
        </div>
        <a href="/projects" class="btn btn-secondary" data-route="/projects">Всички проекти</a>
      </div>

      <div class="cards-3">
        ${projectsHtml}
      </div>
    </section>

    <section class="section">
      <div class="video-panel">
        <div class="section-header" style="margin-bottom:0;">
          <div>
            <h2>Видео представяне</h2>
            <p>Официално видео на RED SOFTWARE TEAM.</p>
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
      </div>
    </section>
  `;

  startCenterCanvas();
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
        <p>Изберете отдел, за да разгледате неговата специализация и основни инженерни направления.</p>
      </div>

      <div class="tabs-bar">${tabsHtml}</div>

      <div class="detail-panel">
        <h2>${current.department} — ${current.specialization}</h2>
        <p>${current.summary}</p>
        <ul class="spec-list">${pointsHtml}</ul>
        <div class="hero-actions">
          <a href="/contact" class="btn btn-primary" data-route="/contact" data-subject="${current.department}">Свържи се с отдела</a>
          <a href="/" class="btn btn-secondary" data-route="/">Начало</a>
        </div>
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
        <span class="flagship-label">Flagship Technology</span>
        <h1>MARAUDER-AI</h1>
        <p>Advanced Artificial Intelligence &amp; Cyber Defense Platform.</p>
      </div>

      <div class="tabs-bar">${tabsHtml}</div>

      <div class="detail-panel">
        <h2>${current.title}</h2>
        <p>${current.desc}</p>
        <ul class="spec-list">${pointsHtml}</ul>
        <div class="hero-actions">
          <a href="/contact" class="btn btn-primary" data-route="/contact" data-subject="MARAUDER-AI — ${current.label}">Запитване за MARAUDER-AI</a>
          <a href="/projects" class="btn btn-secondary" data-route="/projects">Нашите проекти</a>
        </div>
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
  let selectedId = PROJECTS[0].id;

  function drawProjects() {
    const activeProj = PROJECTS.find((p) => p.id === selectedId) || PROJECTS[0];
    const cardsHtml = PROJECTS.map(
      (p) => `
        <article class="card">
          <div>
            <h3>${p.name}</h3>
            <p>${p.summary}</p>
          </div>
          <div>
            <div class="card-meta">${p.stack}</div>
            <div class="hero-actions" style="margin-top:14px;">
              <button type="button" class="btn btn-secondary" data-proj="${p.id}">Технически преглед</button>
              <a href="/contact" class="btn btn-ghost" data-route="/contact" data-subject="${p.name}">Запитване</a>
            </div>
          </div>
        </article>
      `
    ).join("");

    mount.innerHTML = `
      <div class="subpage-hero">
        <h1>Нашите проекти</h1>
        <p>Технически профил на ключовите системи и платформи на RED SOFTWARE TEAM.</p>
      </div>

      <div class="cards-3" style="margin-bottom:24px;">${cardsHtml}</div>

      <div class="detail-panel">
        <h2>${activeProj.name}</h2>
        <p>${activeProj.details}</p>
        <ul class="spec-list">
          <li><strong>Направления:</strong> ${activeProj.division}</li>
          <li><strong>Технологичен стек:</strong> ${activeProj.stack}</li>
        </ul>
        <a href="/contact" class="btn btn-primary" data-route="/contact" data-subject="${activeProj.name}">Обсъди подобен проект</a>
      </div>
    `;

    mount.querySelectorAll("[data-proj]").forEach((btn) => {
      btn.addEventListener("click", () => {
        selectedId = btn.getAttribute("data-proj");
        drawProjects();
      });
    });
  }

  drawProjects();
}

function renderCompanyPage() {
  const sections = [
    {
      id: "about",
      label: "About RED SOFTWARE TEAM",
      title: "About RED SOFTWARE TEAM",
      desc: "Технологична организация, фокусирана върху софтуерно инженерство, приложен изкуствен интелект, киберсигурност и дигитални системи.",
      points: [
        "Ясна инженерна отговорност и практичен подход към всеки продукт",
        "Съчетаване на уеб технологии, автоматизация и защита",
        "Директна комуникация и прозрачност при реализацията"
      ]
    },
    {
      id: "philosophy",
      label: "Engineering Philosophy",
      title: "Engineering Philosophy",
      desc: "Пишем чист, поддържаем код и изграждаме системи с ясна архитектура вместо временни кръпки.",
      points: [
        "Стабилност, предвидимост и лесна поддръжка във времето",
        "Измерване и проверка на реалното поведение на системата",
        "Приоритет на сигурността и качеството на данните"
      ]
    },
    {
      id: "rd",
      label: "Research & Development",
      title: "Research & Development",
      desc: "Изследваме и внедряваме нови подходи в автоматизацията, интелигентните агенти и уеб архитектурата.",
      points: [
        "Тестване на нови модели на работа и интеграции",
        "Превръщане на експериментални идеи в работещи модули",
        "Непрекъснато подобряване на производителността"
      ]
    },
    {
      id: "careers",
      label: "Careers",
      title: "Careers",
      desc: "Работим с инженери, разработчици и специалисти с практичен опит и желание за реални продукти.",
      points: [
        "Фокус върху реални резултати и технически умения",
        "Гъвкава инженерна среда и директна работа по задачи",
        "Отворени сме към сътрудничество по конкретни проекти"
      ]
    }
  ];

  let activeId = sections[0].id;

  function drawCompany() {
    const current = sections.find((s) => s.id === activeId) || sections[0];
    const tabsHtml = sections
      .map(
        (s) =>
          `<button type="button" class="tab-btn ${s.id === current.id ? "active" : ""}" data-csec="${s.id}">${s.label}</button>`
      )
      .join("");
    const pointsHtml = current.points.map((p) => `<li>${p}</li>`).join("");

    mount.innerHTML = `
      <div class="subpage-hero">
        <h1>За компанията</h1>
        <p>About RED SOFTWARE TEAM, Engineering Philosophy, Research &amp; Development и Careers.</p>
      </div>

      <div class="tabs-bar">${tabsHtml}</div>

      <div class="detail-panel">
        <h2>${current.title}</h2>
        <p>${current.desc}</p>
        <ul class="spec-list">${pointsHtml}</ul>
        <a href="/contact" class="btn btn-primary" data-route="/contact" data-subject="${current.label}">Свържи се с екипа</a>
      </div>
    `;

    mount.querySelectorAll("[data-csec]").forEach((btn) => {
      btn.addEventListener("click", () => {
        activeId = btn.getAttribute("data-csec");
        drawCompany();
      });
    });
  }

  drawCompany();
}

function renderContactPage() {
  const prefilledSubject = sessionStorage.getItem("rst_subject") || "";
  sessionStorage.removeItem("rst_subject");

  mount.innerHTML = `
    <div class="subpage-hero">
      <h1>Contact Our Team</h1>
      <p>Свържете се с RED SOFTWARE TEAM за нови системи, MARAUDER-AI, инженерни консултации или сътрудничество.</p>
    </div>

    <div class="contact-grid">
      <div class="info-box">
        <h2>Директен контакт</h2>
        <p>Заявките през формата се изпращат към сървърния ендпойнт <code>/api/contact</code>.</p>
        <div class="info-row">
          <span>Телефон</span>
          <a href="tel:0879813928">0879 813 928</a>
        </div>
        <div class="info-row">
          <span>Направления</span>
          <strong>AI • Software Engineering • Cybersecurity</strong>
        </div>
      </div>

      <div class="form-box">
        <h2>Изпрати запитване</h2>
        <p>Попълнете полетата по-долу и ще се свържем с вас.</p>

        <form id="contactForm" novalidate>
          <div class="row-2">
            <input id="name" name="name" type="text" placeholder="Вашето име или организация" required>
            <input id="email" name="email" type="email" placeholder="name@company.com" required>
          </div>
          <input id="subject" name="subject" type="text" placeholder="Тема / отдел / проект" value="${prefilledSubject.replace(/"/g, "&quot;")}" required>
          <textarea id="message" name="message" placeholder="Опишете накратко задачата, целите и техническите изисквания..." required></textarea>
          <button type="submit" id="submitBtn" class="btn btn-primary">Изпрати запитване</button>
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
        status.textContent = "Моля, попълнете име, имейл и съобщение.";
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
