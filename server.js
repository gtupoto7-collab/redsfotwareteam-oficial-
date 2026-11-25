const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

const ROOT_DIR = __dirname;
const PUBLIC_DIR = path.join(ROOT_DIR, "public");
const WORKSPACE_DIR = path.join(ROOT_DIR, "generated_projects");
const LEADS_FILE = path.join(ROOT_DIR, "leads.json");

fs.mkdirSync(PUBLIC_DIR, { recursive: true });
fs.mkdirSync(WORKSPACE_DIR, { recursive: true });

app.use(express.json({ limit: "10mb" }));
app.use(express.static(PUBLIC_DIR));

function safeId(raw) {
  return String(raw || "")
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "")
    .slice(0, 40);
}

function projectDir(id) {
  const clean = safeId(id);
  if (!clean) return null;
  const full = path.resolve(WORKSPACE_DIR, clean);
  if (!full.startsWith(path.resolve(WORKSPACE_DIR))) return null;
  return full;
}

function readAllFiles(dir) {
  const result = {};
  function walk(current, prefix = "") {
    if (!fs.existsSync(current)) return;
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      const abs = path.join(current, entry.name);
      if (entry.isDirectory()) walk(abs, rel);
      else result[rel] = fs.readFileSync(abs, "utf8");
    }
  }
  walk(dir);
  return result;
}

function writeFiles(dir, filesMap) {
  for (const [relPath, content] of Object.entries(filesMap || {})) {
    const normalized = path.normalize(relPath).replace(/^(\.\.[/\\])+/, "");
    const target = path.join(dir, normalized);
    if (!target.startsWith(dir)) continue;
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, String(content ?? ""), "utf8");
  }
}

function buildStarterFiles({ prompt, targetType, stylePreset, brandName }) {
  const title = (brandName || prompt || "RED AUTO BUILDER PROJECT").trim().slice(0, 80);
  const desc = (prompt || "Модерен уеб проект, генериран от RED AUTO BUILDER.").trim();
  const mode = targetType || "Website";
  const style = stylePreset || "Modern Dark";

  const accentMap = {
    "Modern Dark": { primary: "#ef233c", bg: "#090c12", card: "#121826", text: "#f8fafc" },
    "Clean Light": { primary: "#dc2626", bg: "#f8fafc", card: "#ffffff", text: "#0f172a" },
    "Corporate Slate": { primary: "#2563eb", bg: "#0b1120", card: "#131c31", text: "#f1f5f9" }
  };
  const pal = accentMap[style] || accentMap["Modern Dark"];

  return {
    "package.json": JSON.stringify(
      {
        name: title.toLowerCase().replace(/[^a-z0-9-]/g, "-").replace(/^-+|-+$/g, "") || "red-builder-app",
        version: "1.0.0",
        private: true,
        scripts: {
          start: "node -e \"console.log('Project ready');\""
        },
        metadata: {
          targetType: mode,
          stylePreset: style
        }
      },
      null,
      2
    ),
    "README.md": `# ${title}\n\n- **Тип:** ${mode}\n- **Стил:** ${style}\n- **Описание:** ${desc}\n`,
    "index.html": `<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${desc.replace(/"/g, "&quot;")}">
  <title>${title.replace(/</g, "&lt;")}</title>
  <link rel="stylesheet" href="src/styles/main.css">
</head>
<body>
  <header class="site-header">
    <div class="container nav-row">
      <div class="brand">${title.replace(/</g, "&lt;")}</div>
      <nav class="nav-links" aria-label="Навигация">
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </header>

  <main id="home" class="container">
    <section class="hero">
      <span class="badge">${mode.toUpperCase()} • ${style.toUpperCase()}</span>
      <h1>${title.replace(/</g, "&lt;")}</h1>
      <p>${desc.replace(/</g, "&lt;")}</p>
      <div class="actions">
        <a href="#contact" class="btn primary">Заяви проект</a>
        <a href="#services" class="btn ghost">Услуги</a>
      </div>
    </section>

    <section id="services" class="section">
      <h2>Services</h2>
      <div class="grid-3">
        <article class="card">
          <h3>Уеб и софтуерна разработка</h3>
          <p>Изграждане на бързи и поддържаеми решения със структуриран код.</p>
        </article>
        <article class="card">
          <h3>Автоматизация и интеграции</h3>
          <p>Свързване на форми, процеси и външни услуги без излишна сложност.</p>
        </article>
        <article class="card">
          <h3>Мащабиране към App</h3>
          <p>Готовност за разширяване към уеб приложение, PWA и мобилна обвивка.</p>
        </article>
      </div>
    </section>

    <section id="about" class="section card">
      <h2>About</h2>
      <p>Проектът е създаден с RED AUTO BUILDER с фокус върху реална файлова структура, ясна архитектура и бърза публикация.</p>
    </section>

    <section id="contact" class="section card">
      <h2>Contact</h2>
      <form id="leadForm" class="lead-form">
        <input type="text" name="name" placeholder="Вашето име" required>
        <input type="email" name="email" placeholder="Вашият имейл" required>
        <textarea name="message" placeholder="Какво искате да изградим?" required></textarea>
        <button type="submit" class="btn primary">Изпрати запитване</button>
        <div id="leadResult" class="lead-result"></div>
      </form>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">© ${new Date().getFullYear()} ${title.replace(/</g, "&lt;")}</div>
  </footer>

  <script src="src/app/main.js"></script>
</body>
</html>`,
    "src/styles/main.css": `:root {
  --bg: ${pal.bg};
  --card: ${pal.card};
  --text: ${pal.text};
  --accent: ${pal.primary};
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif;
  line-height: 1.6;
}

.container { max-width: 1120px; margin: 0 auto; padding: 0 20px; }

.site-header {
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
  padding: 16px 0;
}

.nav-row { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
.brand { font-weight: 800; font-size: 1.05rem; }
.nav-links { display: flex; gap: 18px; }
.nav-links a { color: inherit; text-decoration: none; font-size: 0.92rem; opacity: 0.88; }
.nav-links a:hover { color: var(--accent); opacity: 1; }

.hero { padding: 56px 0 32px; }
.badge {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--accent);
  color: var(--accent);
  margin-bottom: 14px;
}
.hero h1 { font-size: clamp(2rem, 4vw, 3rem); line-height: 1.15; margin-bottom: 14px; }
.hero p { max-width: 680px; opacity: 0.86; margin-bottom: 22px; }

.actions { display: flex; gap: 12px; flex-wrap: wrap; }
.btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 10px 18px; border-radius: 8px; font-weight: 700; font-size: 0.9rem;
  text-decoration: none; border: 1px solid transparent; cursor: pointer;
}
.btn.primary { background: var(--accent); color: #ffffff; }
.btn.ghost { border-color: rgba(148, 163, 184, 0.35); color: inherit; }

.section { margin-top: 32px; }
.section h2 { font-size: 1.45rem; margin-bottom: 16px; }

.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.card {
  background: var(--card);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 12px;
  padding: 20px;
}
.card h3 { margin-bottom: 8px; font-size: 1.05rem; }
.card p { opacity: 0.84; font-size: 0.92rem; }

.lead-form { display: grid; gap: 12px; max-width: 560px; }
.lead-form input, .lead-form textarea {
  width: 100%; padding: 10px 12px; border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  background: rgba(15, 23, 42, 0.35); color: inherit; font: inherit;
}
.lead-form textarea { min-height: 96px; }
.lead-result { font-size: 0.9rem; font-weight: 600; }

.site-footer { margin-top: 48px; padding: 24px 0; border-top: 1px solid rgba(148, 163, 184, 0.18); opacity: 0.75; font-size: 0.85rem; }

@media (max-width: 820px) {
  .grid-3 { grid-template-columns: 1fr; }
}
`,
    "src/app/main.js": `document.getElementById("leadForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const out = document.getElementById("leadResult");
  const payload = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    message: form.message.value.trim()
  };
  if (out) out.textContent = "Изпращане...";
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error || "Грешка при изпращане.");
    if (out) out.textContent = "Запитването е получено.";
    form.reset();
  } catch (err) {
    if (out) out.textContent = err.message || "Възникна грешка.";
  }
});
`
  };
}

function applyImprovementAction(files, action) {
  const next = { ...files };
  let html = next["index.html"] || "";
  let css = next["src/styles/main.css"] || "";
  let js = next["src/app/main.js"] || "";

  switch (action) {
    case "MAKE PREMIUM":
    case "REDESIGN":
      css = `${css}\n.hero { background: linear-gradient(135deg, rgba(239,35,60,0.14), rgba(59,130,246,0.08)); border-radius: 18px; padding-left: 28px; padding-right: 28px; }\n.card { transition: transform 0.2s ease, border-color 0.2s ease; }\n.card:hover { transform: translateY(-4px); border-color: var(--accent); }\n`;
      html = html.replace("<h1>", `<h1 data-improved="${action.toLowerCase().replace(/\s+/g, "-")}">`);
      break;

    case "IMPROVE UI":
      css = `${css}\n.btn { transition: transform 0.15s ease, opacity 0.15s ease; }\n.btn:hover { transform: translateY(-1px); opacity: 0.95; }\n.card h3 { letter-spacing: -0.01em; }\n`;
      break;

    case "IMPROVE MOBILE":
      if (!html.includes("viewport")) {
        html = html.replace("<head>", '<head>\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">');
      }
      css = `${css}\n@media (max-width: 600px) {\n  .nav-links { gap: 10px; font-size: 0.84rem; }\n  .btn { width: 100%; }\n}\n`;
      break;

    case "ADD PAGE": {
      const pageFile = "src/pages/pricing.html";
      if (!next[pageFile]) {
        next[pageFile] = `<!DOCTYPE html>\n<html lang="bg">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Pricing</title>\n  <link rel="stylesheet" href="../styles/main.css">\n</head>\n<body>\n  <main class="container section">\n    <h1>Pricing</h1>\n    <div class="grid-3">\n      <div class="card"><h3>Starter</h3><p>Базова версия и публикация.</p></div>\n      <div class="card"><h3>Pro</h3><p>Разширени секции и автоматизации.</p></div>\n      <div class="card"><h3>Custom</h3><p>Индивидуална система и поддръжка.</p></div>\n    </div>\n  </main>\n</body>\n</html>\n`;
      }
      if (!html.includes('href="src/pages/pricing.html"')) {
        html = html.replace(
          "</nav>",
          '  <a href="src/pages/pricing.html">Pricing</a>\n      </nav>'
        );
      }
      break;
    }

    case "ADD FEATURE":
      if (!html.includes('id="quickEstimator"')) {
        html = html.replace(
          '<section id="contact"',
          `<section id="quickEstimator" class="section card">\n      <h2>Бърза оценка на обхват</h2>\n      <select id="scopeSelect" style="padding:8px 10px;border-radius:8px;margin-right:8px;">\n        <option value="Basic Website">Basic Website</option>\n        <option value="Web App + API">Web App + API</option>\n        <option value="PWA + Mobile Ready">PWA + Mobile Ready</option>\n      </select>\n      <button type="button" id="scopeCalcBtn" class="btn primary">Изчисли</button>\n      <div id="scopeOut" style="margin-top:10px;font-weight:600;"></div>\n    </section>\n\n    <section id="contact"`
        );
      }
      if (!js.includes("scopeCalcBtn")) {
        js = `${js}\ndocument.getElementById("scopeCalcBtn")?.addEventListener("click", () => {\n  const val = document.getElementById("scopeSelect")?.value || "Basic Website";\n  const out = document.getElementById("scopeOut");\n  if (out) out.textContent = "Избран профил: " + val;\n});\n`;
      }
      break;

    case "OPTIMIZE":
    case "MAKE FASTER":
      css = `${css.replace(/\n{3,}/g, "\n\n")}\n/* optimized layout rules */\n`;
      js = `${js.trim()}\n`;
      break;

    case "SEO OPTIMIZE":
      if (!html.includes('name="robots"')) {
        html = html.replace(
          "<head>",
          '<head>\n  <meta name="robots" content="index, follow">\n  <meta property="og:type" content="website">'
        );
      }
      break;

    case "FIX BUGS":
      if (!html.includes('href="src/styles/main.css"')) {
        html = html.replace("</head>", '  <link rel="stylesheet" href="src/styles/main.css">\n</head>');
      }
      if (!html.includes('src="src/app/main.js"')) {
        html = html.replace("</body>", '  <script src="src/app/main.js"></script>\n</body>');
      }
      break;

    default:
      break;
  }

  next["index.html"] = html;
  next["src/styles/main.css"] = css;
  next["src/app/main.js"] = js;
  return next;
}

function runProjectTests(files) {
  const checks = [];
  const html = files["index.html"] || "";
  const css = files["src/styles/main.css"] || "";
  const js = files["src/app/main.js"] || "";

  // 1. BUILD check
  const hasPkg = Boolean(files["package.json"]);
  const hasEntry = Boolean(html.trim()) && Boolean(css.trim());
  checks.push({
    step: "BUILD",
    passed: hasPkg && hasEntry,
    detail: hasPkg && hasEntry ? "package.json и входните файлове са налични." : "Липсва package.json или входен HTML/CSS."
  });

  // 2. TYPE / SYNTAX check
  const openBraces = (css.match(/\{/g) || []).length;
  const closeBraces = (css.match(/\}/g) || []).length;
  let jsValid = true;
  let jsErr = "";
  try {
    // Проверка на синтаксиса на клиентския JS без изпълнение на браузърни API-та
    new Function(js);
  } catch (err) {
    jsValid = false;
    jsErr = err.message;
  }
  const syntaxOk = openBraces === closeBraces && jsValid;
  checks.push({
    step: "TYPE CHECK",
    passed: syntaxOk,
    detail: syntaxOk ? "CSS скобите и JS синтаксисът са валидни." : `Проблем: CSS {${openBraces}/${closeBraces}}, JS: ${jsErr || "OK"}`
  });

  // 3. LINK CHECK
  const localHrefs = [...html.matchAll(/href=["']([^"'#]+)["']/g)].map((m) => m[1]);
  const missingLinks = localHrefs.filter((href) => {
    if (/^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
    const clean = href.replace(/^\//, "");
    return !Object.prototype.hasOwnProperty.call(files, clean);
  });
  checks.push({
    step: "LINK CHECK",
    passed: missingLinks.length === 0,
    detail: missingLinks.length === 0 ? "Всички вътрешни линкове съществуват." : `Липсващи линкове: ${missingLinks.join(", ")}`
  });

  // 4. ASSET CHECK
  const imgSrcs = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map((m) => m[1]);
  const badAssets = imgSrcs.filter((src) => !src.trim() || src.includes("undefined"));
  checks.push({
    step: "ASSET CHECK",
    passed: badAssets.length === 0,
    detail: badAssets.length === 0 ? "Няма невалидни асети." : `Невалидни асети: ${badAssets.join(", ")}`
  });

  // 5. RESPONSIVE CHECK
  const hasViewport = /name=["']viewport["']/i.test(html);
  const hasMediaQuery = /@media/i.test(css);
  checks.push({
    step: "RESPONSIVE CHECK",
    passed: hasViewport && hasMediaQuery,
    detail: hasViewport && hasMediaQuery ? "Налични viewport и @media правила." : "Липсва viewport или @media правило."
  });

  // 6. SECURITY CHECK
  const hasDangerousEval = /\beval\s*\(|document\.write\s*\(/i.test(js);
  checks.push({
    step: "SECURITY CHECK",
    passed: !hasDangerousEval,
    detail: !hasDangerousEval ? "Не са открити eval() или document.write()." : "Открит е потенциален риск (eval / document.write)."
  });

  const ready = checks.every((c) => c.passed);
  return { ready, checks };
}

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "RED AUTO BUILDER", ts: new Date().toISOString() });
});

app.post("/api/projects/create", (req, res) => {
  try {
    const id = `${Date.now().toString(36)}-${crypto.randomBytes(3).toString("hex")}`;
    const dir = projectDir(id);
    const files = buildStarterFiles(req.body || {});
    writeFiles(dir, files);
    res.json({ ok: true, projectId: id, files: readAllFiles(dir) });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get("/api/projects/:id", (req, res) => {
  const dir = projectDir(req.params.id);
  if (!dir || !fs.existsSync(dir)) {
    return res.status(404).json({ ok: false, error: "Проектът не е намерен." });
  }
  res.json({ ok: true, projectId: safeId(req.params.id), files: readAllFiles(dir) });
});

app.put("/api/projects/:id/files", (req, res) => {
  const dir = projectDir(req.params.id);
  if (!dir || !fs.existsSync(dir)) {
    return res.status(404).json({ ok: false, error: "Проектът не е намерен." });
  }
  writeFiles(dir, req.body?.files || {});
  res.json({ ok: true, projectId: safeId(req.params.id), files: readAllFiles(dir) });
});

app.post("/api/projects/:id/improve", (req, res) => {
  const dir = projectDir(req.params.id);
  if (!dir || !fs.existsSync(dir)) {
    return res.status(404).json({ ok: false, error: "Проектът не е намерен." });
  }
  const action = String(req.body?.action || "MAKE PREMIUM").trim();
  const current = readAllFiles(dir);
  const updated = applyImprovementAction(current, action);
  writeFiles(dir, updated);
  res.json({ ok: true, action, projectId: safeId(req.params.id), files: readAllFiles(dir) });
});

app.post("/api/projects/:id/test", (req, res) => {
  const dir = projectDir(req.params.id);
  if (!dir || !fs.existsSync(dir)) {
    return res.status(404).json({ ok: false, error: "Проектът не е намерен." });
  }
  let files = readAllFiles(dir);
  let report = runProjectTests(files);

  if (!report.ready && req.body?.autoFix !== false) {
    files = applyImprovementAction(files, "FIX BUGS");
    writeFiles(dir, files);
    files = readAllFiles(dir);
    report = runProjectTests(files);
  }

  res.json({ ok: true, ...report, files });
});

app.post("/api/projects/:id/publish", async (req, res) => {
  const dir = projectDir(req.params.id);
  if (!dir || !fs.existsSync(dir)) {
    return res.status(404).json({ ok: false, error: "Проектът не е намерен." });
  }
  const files = readAllFiles(dir);
  const testResult = runProjectTests(files);
  if (!testResult.ready) {
    return res.status(400).json({
      ok: false,
      error: "Проектът не е преминал всички проверки преди публикация.",
      testResult
    });
  }

  const deployHookUrl = process.env.RENDER_DEPLOY_HOOK_URL || req.body?.deployHookUrl || "";
  let hookTriggered = false;
  let hookStatus = "not_configured";

  if (deployHookUrl) {
    try {
      const hookRes = await fetch(deployHookUrl, { method: "POST" });
      hookTriggered = hookRes.ok;
      hookStatus = hookRes.ok ? "triggered" : `http_${hookRes.status}`;
    } catch (err) {
      hookStatus = `error_${err.message}`;
    }
  }

  const slug = safeId(req.params.id);
  const liveUrl = process.env.PUBLISHED_BASE_URL
    ? `${process.env.PUBLISHED_BASE_URL.replace(/\/+$/, "")}/${slug}/`
    : `https://${slug}.onrender.com`;

  res.json({
    ok: true,
    projectId: slug,
    liveUrl,
    hookTriggered,
    hookStatus,
    repoUrl: process.env.GITHUB_REPO_URL || ""
  });
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Попълнете име, имейл и съобщение." });
  }
  let existing = [];
  if (fs.existsSync(LEADS_FILE)) {
    try {
      existing = JSON.parse(fs.readFileSync(LEADS_FILE, "utf8")) || [];
    } catch (_) {
      existing = [];
    }
  }
  existing.push({
    id: crypto.randomUUID(),
    name: String(name).trim(),
    email: String(email).trim(),
    message: String(message).trim(),
    createdAt: new Date().toISOString()
  });
  fs.writeFileSync(LEADS_FILE, JSON.stringify(existing, null, 2), "utf8");
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`RED AUTO BUILDER listening on port ${PORT}`);
});
