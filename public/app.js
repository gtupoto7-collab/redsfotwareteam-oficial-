const promptBox = document.getElementById("promptBox");
const kindSelect = document.getElementById("kindSelect");
const accentSelect = document.getElementById("accentSelect");
const codeBox = document.getElementById("codeBox");
const liveFrame = document.getElementById("liveFrame");
const statusMsg = document.getElementById("statusMsg");
const badgeInfo = document.getElementById("badgeInfo");
const watchAssembleToggle = document.getElementById("watchAssembleToggle");
const assembleFeed = document.getElementById("assembleFeed");

let activeFile = "index.html";
let generatedFiles = {};
let lastPreviewUrl = "";
let assembleTimer = null;

function detectKind(text, selectedKind) {
  if (selectedKind && selectedKind !== "auto") return selectedKind;
  const t = String(text || "").toLowerCase();
  if (/магазин|shop|продукт|количка|поръч|цена|store|cart/.test(t)) return "shop";
  if (/задачи|task|todo|калкулатор|calc|инструмент|app|табло|dashboard/.test(t)) return "app";
  if (/портфолио|portfolio|услуги|майстор|строител|дизайн/.test(t)) return "portfolio";
  return "saas";
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildProject(rawPrompt, kindChoice, accent) {
  const prompt = String(rawPrompt || "").trim() || "Готов софтуерен продукт — RED SOFTWARE TEAM";
  const kind = detectKind(prompt, kindChoice);
  const title = prompt.length > 60 ? prompt.slice(0, 60) + "..." : prompt;

  const css = `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #090b0f;
  color: #f3f4f6;
  font-family: system-ui, -apple-system, sans-serif;
  padding: 24px;
}
.card {
  max-width: 780px; margin: 0 auto;
  background: #121620; border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px; padding: 24px;
}
h1 { font-size: 1.6rem; border-left: 4px solid ${accent}; padding-left: 12px; margin-bottom: 10px; }
p.desc { color: #9ca3af; margin-bottom: 18px; }
.box { background: #090b0f; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 14px; margin-top: 12px; }
button {
  background: ${accent}; color: #fff; border: 0; border-radius: 7px;
  padding: 9px 14px; font-weight: 700; cursor: pointer; margin-top: 8px;
}
input {
  background: #121620; color: #fff; border: 1px solid rgba(255,255,255,0.18);
  border-radius: 7px; padding: 8px 10px; margin-right: 6px;
}
ul { margin-top: 10px; padding-left: 18px; }
li { margin: 5px 0; }`;

  let featureHtml = "";
  let featureJs = "";

  if (kind === "shop") {
    featureHtml = `<div class="box">
      <h3>Бърза количка</h3>
      <p>Продукт: <strong>Pro License</strong> — <span id="price">49</span> лв.</p>
      <button id="addCartBtn" type="button">Добави в количката</button>
      <div id="cartOut" style="margin-top:8px;color:#4ade80;">Брой артикули: 0 | Общо: 0 лв.</div>
    </div>`;
    featureJs = `let count = 0;
document.getElementById("addCartBtn")?.addEventListener("click", () => {
  count += 1;
  document.getElementById("cartOut").textContent = "Брой артикули: " + count + " | Общо: " + (count * 49) + " лв.";
});`;
  } else if (kind === "app") {
    featureHtml = `<div class="box">
      <h3>Работен списък със задачи</h3>
      <input id="taskInp" type="text" placeholder="Нова задача...">
      <button id="addTaskBtn" type="button">Добави</button>
      <ul id="taskList"><li>Готов работен списък</li></ul>
    </div>`;
    featureJs = `document.getElementById("addTaskBtn")?.addEventListener("click", () => {
  const inp = document.getElementById("taskInp");
  const val = (inp?.value || "").trim();
  if (!val) return;
  const li = document.createElement("li");
  li.textContent = val;
  document.getElementById("taskList")?.appendChild(li);
  inp.value = "";
});`;
  } else {
    featureHtml = `<div class="box">
      <h3>Бърз тест</h3>
      <p id="pingText">Готов продукт.</p>
      <button id="runPingBtn" type="button">Тествай</button>
    </div>`;
    featureJs = `document.getElementById("runPingBtn")?.addEventListener("click", () => {
  document.getElementById("pingText").textContent = "Работи (" + new Date().toLocaleTimeString() + ")";
});`;
  }

  const html = `<!DOCTYPE html>
<html lang="bg">
<head>
  <meta charset="UTF-8">
  <title>${escapeHtml(title)}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="card">
    <h1>${escapeHtml(title)}</h1>
    <p class="desc">${escapeHtml(prompt)}</p>
    ${featureHtml}
  </div>
  <script src="app.js"></script>
</body>
</html>`;

  return {
    kind,
    files: {
      "index.html": html,
      "style.css": css,
      "app.js": featureJs
    }
  };
}

function getStandaloneHtml() {
  const html = generatedFiles["index.html"] || "";
  const css = generatedFiles["style.css"] || "";
  const js = generatedFiles["app.js"] || "";

  return html
    .replace(/<link[^>]*href=["']style\.css["'][^>]*>/i, `<style>${css}</style>`)
    .replace(/<script[^>]*src=["']app\.js["'][^>]*><\/script>/i, `<script>${js}<\/script>`);
}

function renderPreview() {
  liveFrame.srcdoc = getStandaloneHtml();
  codeBox.value = generatedFiles[activeFile] || "";
}

function setStatus(msg, isErr = false) {
  statusMsg.textContent = msg;
  statusMsg.className = isErr ? "status err" : "status";
}

async function saveToServerAndGetUrl(openAfter = false) {
  generatedFiles[activeFile] = codeBox.value;
  try {
    const res = await fetch("/api/generate-save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: promptBox.value.slice(0, 32) || "ready-product",
        files: generatedFiles
      })
    });
    const data = await res.json();
    if (!res.ok || !data.ok || !data.previewUrl) {
      throw new Error(data.error || "Грешка при запис.");
    }
    lastPreviewUrl = data.previewUrl;
    if (openAfter) {
      window.open(lastPreviewUrl, "_blank", "noopener,noreferrer");
    }
    return lastPreviewUrl;
  } catch (err) {
    setStatus(err.message || "Няма връзка със сървъра за запис.", true);
    return "";
  }
}

function finishBuild(built) {
  generatedFiles = built.files;
  lastPreviewUrl = "";
  badgeInfo.textContent = `Готово • ${built.kind.toUpperCase()}`;
  renderPreview();
  setStatus("Готовият продукт е създаден. Натисни ОТВОРИ НА ЖИВО или СВАЛИ ПРОЕКТА.");
}

function runOneClickReady() {
  if (assembleTimer) {
    clearInterval(assembleTimer);
    assembleTimer = null;
  }

  const built = buildProject(promptBox.value, kindSelect.value, accentSelect.value);
  const watchMode = Boolean(watchAssembleToggle?.checked);

  if (!watchMode) {
    assembleFeed.style.display = "none";
    finishBuild(built);
    return;
  }

  const steps = [
    "[1/3] Сглобявам index.html...",
    "[2/3] Сглобявам style.css...",
    "[3/3] Сглобявам app.js — готово."
  ];
  let idx = 0;
  assembleFeed.style.display = "block";
  assembleFeed.innerHTML = "";

  assembleTimer = setInterval(() => {
    const d = document.createElement("div");
    d.textContent = steps[idx];
    assembleFeed.appendChild(d);
    assembleFeed.scrollTop = assembleFeed.scrollHeight;
    idx += 1;
    if (idx >= steps.length) {
      clearInterval(assembleTimer);
      assembleTimer = null;
      finishBuild(built);
    }
  }, 140);
}

function downloadWholeProject() {
  generatedFiles[activeFile] = codeBox.value;
  if (!generatedFiles["index.html"]) {
    runOneClickReady();
  }
  const standalone = getStandaloneHtml();
  const blob = new Blob([standalone], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ready-product.html";
  a.click();
  URL.revokeObjectURL(url);
  setStatus("Свален готов продукт: ready-product.html");
}

document.getElementById("btnOneClickReady")?.addEventListener("click", runOneClickReady);

document.getElementById("btnOpenLive")?.addEventListener("click", async () => {
  if (!generatedFiles["index.html"]) {
    runOneClickReady();
  }
  const url = lastPreviewUrl || (await saveToServerAndGetUrl(false));
  if (url) {
    setStatus(`Отворено на живо: ${url}`);
    window.open(url, "_blank", "noopener,noreferrer");
  }
});

document.getElementById("btnDownloadAll")?.addEventListener("click", downloadWholeProject);

document.querySelectorAll(".tab").forEach((t) => {
  t.addEventListener("click", () => {
    generatedFiles[activeFile] = codeBox.value;
    activeFile = t.getAttribute("data-f");
    document.querySelectorAll(".tab").forEach((x) => x.classList.toggle("active", x === t));
    codeBox.value = generatedFiles[activeFile] || "";
  });
});

document.getElementById("btnApplyCode")?.addEventListener("click", () => {
  generatedFiles[activeFile] = codeBox.value;
  lastPreviewUrl = "";
  renderPreview();
  setStatus(`Обновено от ${activeFile}.`);
});

document.getElementById("btnDownloadFile")?.addEventListener("click", () => {
  generatedFiles[activeFile] = codeBox.value;
  const blob = new Blob([generatedFiles[activeFile] || ""], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = activeFile;
  a.click();
  URL.revokeObjectURL(url);
  setStatus(`Свален файл: ${activeFile}`);
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
      body: JSON.stringify({ name, email, subject: "ONE-CLICK READY", message })
    });
    const data = await res.json();
    if (!res.ok || !data.ok) throw new Error(data.error || "Грешка");
    cStatus.textContent = "Изпратено.";
    cStatus.className = "status";
    e.target.reset();
  } catch (err) {
    cStatus.textContent = err.message;
    cStatus.className = "status err";
  }
});

promptBox.value = "Тъмен сайт за AI софтуер с червени акценти и списък със задачи";
runOneClickReady();
