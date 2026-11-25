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
