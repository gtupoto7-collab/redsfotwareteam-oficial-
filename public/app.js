(() => {
  const state = {
    projectId: null,
    files: {},
    activeFile: "index.html",
    activePage: "home"
  };

  const $ = (id) => document.getElementById(id);

  function setStatus(msg, err = false) {
    const el = $("statusLine");
    if (!el) return;
    el.textContent = msg;
    el.style.color = err ? "#fca5a5" : "#86efac";
  }

  function renderPreview() {
    const frame = $("previewFrame");
    if (!frame) return;
    const html = state.files["index.html"] || "";
    const css = state.files["src/styles/main.css"] || "";
    const js = state.files["src/app/main.js"] || "";

    if (!html.trim()) {
      frame.srcdoc = `<!DOCTYPE html><html lang="bg"><body style="background:#090c12;color:#94a3b8;font-family:sans-serif;padding:24px;">Натисни <b>GENERATE</b>, за да видиш сайта на живо.</body></html>`;
      return;
    }

    const pageScrollJs = `
      const targetId = ${JSON.stringify(state.activePage)};
      const targetEl = document.getElementById(targetId);
      if (targetEl) targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    `;

    let doc = html
      .replace(/<link[^>]*href=["']src\/styles\/main\.css["'][^>]*>/i, `<style>${css}</style>`)
      .replace(/<script[^>]*src=["']src\/app\/main\.js["'][^>]*><\/script>/i, `<script>${js.replace(/<\/script>/gi, "<\\/script>")}\n${pageScrollJs}<\/script>`);

    frame.srcdoc = doc;
  }

  function renderCodeSelect() {
    const sel = $("fileSelect");
    if (!sel) return;
    const names = Object.keys(state.files || {});
    sel.innerHTML = "";
    if (!names.length) return;
    if (!state.files[state.activeFile]) state.activeFile = names[0];
    names.forEach((n) => {
      const opt = document.createElement("option");
      opt.value = n;
      opt.textContent = n;
      opt.selected = n === state.activeFile;
      sel.appendChild(opt);
    });
    if ($("codeEditor")) $("codeEditor").value = state.files[state.activeFile] ?? "";
  }

  async function onGenerate() {
    const prompt = ($("promptInput")?.value || "").trim() || "Професионален сайт за AI компания";
    setStatus("Генериране на проект...");
    try {
      const res = await fetch("/api/projects/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, targetType: "Website", stylePreset: "Modern Dark" })
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Грешка при генериране.");
      state.projectId = data.projectId;
      state.files = data.files || {};
      if ($("projTag")) $("projTag").textContent = `Проект: ${state.projectId}`;
      renderCodeSelect();
      renderPreview();
      setStatus("Готово. Проектът е зареден в LIVE PREVIEW.");
    } catch (e) {
      setStatus(e.message, true);
    }
  }

  async function onImprove(payload) {
    if (!state.projectId) return setStatus("Първо натисни GENERATE.", true);
    setStatus("Прилагане на промяната...");
    try {
      const res = await fetch(`/api/projects/${encodeURIComponent(state.projectId)}/improve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Грешка при редакция.");
      state.files = data.files || state.files;
      renderCodeSelect();
      renderPreview();
      setStatus("Обновено.");
    } catch (e) {
      setStatus(e.message, true);
    }
  }

  async function onPublish() {
    if (!state.projectId) return setStatus("Първо натисни GENERATE.", true);
    setStatus("Проверка и публикуване...");
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
      if ($("publishOut")) {
        $("publishOut").innerHTML = `Live: <a href="${data.liveUrl}" target="_blank" rel="noopener noreferrer" style="color:#93c5fd;">${data.liveUrl}</a>`;
      }
      setStatus("Публикувано.");
    } catch (e) {
      setStatus(e.message, true);
    }
  }

  $("btnGenerate")?.addEventListener("click", onGenerate);
  $("btnAiCmd")?.addEventListener("click", () => {
    const instruction = ($("aiCmdInput")?.value || "").trim();
    if (!instruction) return setStatus("Напиши какво да се промени.", true);
    onImprove({ instruction });
  });

  document.querySelectorAll("[data-act]").forEach((btn) => {
    btn.addEventListener("click", () => onImprove({ action: btn.getAttribute("data-act") }));
  });

  $("btnPublish")?.addEventListener("click", onPublish);

  document.querySelectorAll(".page-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.activePage = btn.getAttribute("data-page") || "home";
      document.querySelectorAll(".page-btn").forEach((b) => b.classList.toggle("active", b === btn));
      renderPreview();
    });
  });

  $("tabPreview")?.addEventListener("click", () => {
    $("tabPreview")?.classList.add("active");
    $("tabCode")?.classList.remove("active");
    if ($("codeDrawer")) $("codeDrawer").style.display = "none";
  });

  $("tabCode")?.addEventListener("click", () => {
    $("tabCode")?.classList.add("active");
    $("tabPreview")?.classList.remove("active");
    if ($("codeDrawer")) $("codeDrawer").style.display = "flex";
    renderCodeSelect();
  });

  $("fileSelect")?.addEventListener("change", (e) => {
    state.files[state.activeFile] = $("codeEditor")?.value ?? "";
    state.activeFile = e.target.value;
    if ($("codeEditor")) $("codeEditor").value = state.files[state.activeFile] ?? "";
  });

  $("btnSaveFile")?.addEventListener("click", async () => {
    if (!state.projectId) return setStatus("Няма активен проект.", true);
    state.files[state.activeFile] = $("codeEditor")?.value ?? "";
    await fetch(`/api/projects/${encodeURIComponent(state.projectId)}/files`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ files: { [state.activeFile]: state.files[state.activeFile] } })
    });
    renderPreview();
    setStatus(`Запазен файл ${state.activeFile}.`);
  });

  if ($("promptInput") && !$("promptInput").value.trim()) {
    $("promptInput").value = "Искам професионален сайт за AI компания";
  }
  renderPreview();
})();
