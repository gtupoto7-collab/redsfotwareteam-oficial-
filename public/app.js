(() => {
  const state = {
    projectId: null,
    files: {},
    activeFile: "index.html",
    testsPassed: false,
    published: null
  };

  const $ = (id) => document.getElementById(id);

  function setStatus(msg, isError = false) {
    const el = $("statusBar");
    if (!el) return;
    el.textContent = msg;
    el.style.color = isError ? "#fca5a5" : "#86efac";
  }

  function setStepState(activeKey) {
    document.querySelectorAll("#pipelineBar .p-step").forEach((el) => {
      const k = el.getAttribute("data-step");
      el.classList.toggle("active", k === activeKey);
      if (k === "create" && state.projectId) el.classList.add("done");
      if (k === "test" && state.testsPassed) el.classList.add("done");
      if (k === "publish" && state.published) el.classList.add("done");
    });
  }

  function renderFileTree() {
    const tree = $("fileTree");
    if (!tree) return;
    const names = Object.keys(state.files || {}).sort();
    tree.innerHTML = "";

    if (!names.length) {
      tree.innerHTML = `<div style="font-size:0.75rem;color:#94a3b8;">Няма файлове.</div>`;
      return;
    }

    if (!state.files[state.activeFile]) {
      state.activeFile = names.includes("index.html") ? "index.html" : names[0];
    }

    names.forEach((name) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `file-item-btn ${name === state.activeFile ? "active" : ""}`;
      btn.textContent = name;
      btn.addEventListener("click", () => {
        state.files[state.activeFile] = $("fileEditor")?.value ?? "";
        state.activeFile = name;
        renderFileTree();
        if ($("fileEditor")) $("fileEditor").value = state.files[name] ?? "";
        if ($("activeFileName")) $("activeFileName").textContent = name;
      });
      tree.appendChild(btn);
    });

    if ($("fileEditor")) $("fileEditor").value = state.files[state.activeFile] ?? "";
    if ($("activeFileName")) $("activeFileName").textContent = state.activeFile;
  }

  function renderLiveCanvas() {
    const frame = $("canvasFrame");
    if (!frame) return;

    let html = state.files["index.html"] || "";
    const css = state.files["src/styles/main.css"] || "";
    const js = state.files["src/app/main.js"] || "";

    if (!html) {
      frame.srcdoc = `<!DOCTYPE html><html lang="bg"><body style="background:#090c12;color:#94a3b8;font-family:sans-serif;padding:24px;">Генерирай проект от GENERATE, за да видиш Live Canvas.</body></html>`;
      return;
    }

    html = html
      .replace(
        /<link[^>]*href=["']src\/styles\/main\.css["'][^>]*>/i,
        `<style>${css}</style>`
      )
      .replace(
        /<script[^>]*src=["']src\/app\/main\.js["'][^>]*><\/script>/i,
        `<script>${js}<\/script>`
      );

    frame.srcdoc = html;
  }

  function renderTestReport(checks, ready) {
    const box = $("testChecklist");
    const tag = $("testStatusTag");
    state.testsPassed = Boolean(ready);

    if (tag) {
      tag.textContent = ready ? "READY" : "NEEDS FIX";
      tag.style.color = ready ? "#86efac" : "#fca5a5";
    }

    if (!box) return;
    box.innerHTML = "";
    (checks || []).forEach((c) => {
      const row = document.createElement("div");
      row.className = `test-item ${c.passed ? "pass" : "fail"}`;
      row.innerHTML = `<strong>${c.step}</strong><span>${c.passed ? "OK" : "FAIL"} — ${c.detail}</span>`;
      box.appendChild(row);
    });
  }

  function renderDelivery(pub) {
    const box = $("publishDeliveryBox");
    if (!box) return;
    if (!pub) {
      box.style.display = "none";
      box.innerHTML = "";
      return;
    }
    state.published = pub;
    box.style.display = "block";
    box.innerHTML = `
      <div style="font-weight:800;color:#86efac;margin-bottom:6px;">YOUR PROJECT IS LIVE</div>
      <div><strong>Website:</strong> <a href="${pub.liveUrl}" target="_blank" rel="noopener noreferrer" style="color:#93c5fd;">${pub.liveUrl}</a></div>
      <div><strong>Project ID:</strong> ${pub.projectId}</div>
      <div><strong>Deploy Hook:</strong> ${pub.hookStatus}</div>
      ${pub.repoUrl ? `<div><strong>GitHub:</strong> <a href="${pub.repoUrl}" target="_blank" rel="noopener noreferrer" style="color:#93c5fd;">${pub.repoUrl}</a></div>` : ""}
    `;
  }

  async function createProject() {
    const payload = {
      brandName: ($("brandNameInp")?.value || "").trim(),
      targetType: $("targetTypeSel")?.value || "Website",
      stylePreset: $("stylePresetSel")?.value || "Modern Dark",
      prompt: ($("promptInp")?.value || "").trim()
    };

    setStatus("Генериране на проект на сървъра...");
    setStepState("create");

    try {
      const res = await fetch("/api/projects/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Грешка при генериране.");

      state.projectId = data.projectId;
      state.files = data.files || {};
      state.activeFile = "index.html";
      state.testsPassed = false;
      state.published = null;
      renderDelivery(null);

      if ($("projectBadge")) $("projectBadge").textContent = `Проект: ${state.projectId}`;
      renderFileTree();
      renderLiveCanvas();
      setStepState("improve");
      setStatus(`Проектът ${state.projectId} е създаден и зареден в Live Canvas.`);
    } catch (err) {
      setStatus(err.message, true);
    }
  }

  async function improveProject(action) {
    if (!state.projectId) {
      return setStatus("Първо натисни GENERATE, за да създадеш проект.", true);
    }
    setStatus(`Изпълнявам ${action}...`);
    setStepState("improve");

    try {
      const res = await fetch(`/api/projects/${encodeURIComponent(state.projectId)}/improve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Грешка при подобрение.");

      state.files = data.files || state.files;
      state.testsPassed = false;
      renderFileTree();
      renderLiveCanvas();
      setStatus(`Приложено ${action} върху проекта ${state.projectId}.`);
    } catch (err) {
      setStatus(err.message, true);
    }
  }

  async function saveCurrentFile() {
    if (!state.projectId) {
      return setStatus("Няма активен проект за запис.", true);
    }
    state.files[state.activeFile] = $("fileEditor")?.value ?? "";
    setStatus(`Запазване на ${state.activeFile}...`);

    try {
      const res = await fetch(`/api/projects/${encodeURIComponent(state.projectId)}/files`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ files: { [state.activeFile]: state.files[state.activeFile] } })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Грешка при запис.");

      state.files = data.files || state.files;
      renderFileTree();
      renderLiveCanvas();
      setStatus(`Запазен файл: ${state.activeFile}`);
    } catch (err) {
      setStatus(err.message, true);
    }
  }

  async function runTests() {
    if (!state.projectId) {
      return setStatus("Първо генерирай проект.", true);
    }
    setStatus("Изпълнявам BUILD → TYPE → LINK → ASSET → RESPONSIVE → SECURITY проверки...");
    setStepState("test");

    try {
      const res = await fetch(`/api/projects/${encodeURIComponent(state.projectId)}/test`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ autoFix: true })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Грешка при тестовете.");

      state.files = data.files || state.files;
      renderFileTree();
      renderLiveCanvas();
      renderTestReport(data.checks, data.ready);
      setStatus(data.ready ? "Всички проверки минаха — READY за PUBLISH." : "Има неуспешни проверки.");
    } catch (err) {
      setStatus(err.message, true);
    }
  }

  async function publishProject() {
    if (!state.projectId) {
      return setStatus("Първо генерирай проект.", true);
    }
    setStatus("Публикуване на проекта...");
    setStepState("publish");

    try {
      const res = await fetch(`/api/projects/${encodeURIComponent(state.projectId)}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({})
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (data.testResult) renderTestReport(data.testResult.checks, data.testResult.ready);
        throw new Error(data.error || "Грешка при публикация.");
      }

      renderDelivery(data);
      setStepState("publish");
      setStatus(`Публикувано: ${data.liveUrl}`);
    } catch (err) {
      setStatus(err.message, true);
    }
  }

  function downloadSourceBundle() {
    const names = Object.keys(state.files || {});
    if (!names.length) {
      return setStatus("Няма генерирани файлове за сваляне.", true);
    }

    const bundleText = names
      .map((name) => `===== FILE: ${name} =====\n${state.files[name] ?? ""}\n`)
      .join("\n");

    const blob = new Blob([bundleText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${state.projectId || "red-auto-builder"}-source-bundle.txt`;
    a.click();
    URL.revokeObjectURL(url);
    setStatus("Свален пакет с изходния код на проекта.");
  }

  $("btnGenerate")?.addEventListener("click", createProject);
  $("btnSaveFile")?.addEventListener("click", saveCurrentFile);
  $("btnRunTest")?.addEventListener("click", runTests);
  $("btnPublish")?.addEventListener("click", publishProject);
  $("btnDownloadSource")?.addEventListener("click", downloadSourceBundle);

  document.querySelectorAll("#improveBtns [data-act]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const act = btn.getAttribute("data-act");
      if (act) improveProject(act);
    });
  });

  document.querySelectorAll(".vp-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const w = btn.getAttribute("data-vp") || "100%";
      document.querySelectorAll(".vp-btn").forEach((x) => x.classList.toggle("active", x === btn));
      const frame = $("canvasFrame");
      if (frame) frame.style.width = w;
    });
  });

  if ($("promptInp") && !$("promptInp").value.trim()) {
    $("promptInp").value = "Искам модерен сайт за софтуерна компания с Home, Services, About, Contact.";
  }

  renderFileTree();
  renderLiveCanvas();
})();
