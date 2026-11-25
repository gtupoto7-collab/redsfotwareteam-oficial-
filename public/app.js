const form = document.getElementById("contactForm");
const button = document.getElementById("sendBtn");
const statusEl = document.getElementById("formStatus");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const quickPrompt = document.getElementById("quickPrompt");
const stackSelect = document.getElementById("stackSelect");
const applyBuilderBtn = document.getElementById("applyBuilderBtn");
const consolePreview = document.getElementById("consolePreview");
const apiState = document.getElementById("apiState");

if (apiState) {
  fetch("/api/health")
    .then((r) => r.json())
    .then((d) => {
      if (d && d.ok) apiState.textContent = "ONLINE";
    })
    .catch(() => {
      apiState.textContent = "LOCAL";
    });
}

function logLine(text) {
  if (!consolePreview) return;
  const line = document.createElement("div");
  line.textContent = text;
  consolePreview.appendChild(line);
  while (consolePreview.children.length > 4) {
    consolePreview.removeChild(consolePreview.firstChild);
  }
}

document.querySelectorAll("[data-plan]").forEach((el) => {
  el.addEventListener("click", (e) => {
    const plan = el.getAttribute("data-plan");
    if (plan && subjectInput) {
      subjectInput.value = plan;
      logLine(`[MODULE] Selected: ${plan}`);
    }
    if (el.tagName === "BUTTON") {
      e.preventDefault();
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  });
});

if (applyBuilderBtn) {
  applyBuilderBtn.addEventListener("click", () => {
    const p = quickPrompt?.value.trim() || "Custom module";
    const s = stackSelect?.value || "Node.js + Express";
    if (subjectInput) subjectInput.value = `${p} [${s}]`;
    if (messageInput && !messageInput.value.trim()) {
      messageInput.value = `Modul: ${p}\nStack: ${s}`;
    }
    logLine(`[LOADED] ${p} -> ${s}`);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  });
}

if (form && button) {
  const btnText = button.querySelector(".btn-text");
  const originalLabel = btnText ? btnText.textContent : "TRANSMIT REQUEST";
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function setButtonLabel(text) {
    if (btnText) btnText.textContent = text;
    else button.textContent = text;
  }

  function setStatus(text, isError = false) {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.style.color = isError ? "#ff5277" : "#00ff88";
  }

  function resetButton(delayMs) {
    setTimeout(() => {
      button.classList.remove("loading", "success", "error");
      button.disabled = false;
      setButtonLabel(originalLabel);
    }, delayMs);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const payload = {
      name: document.getElementById("name")?.value.trim() || "",
      email: document.getElementById("email")?.value.trim() || "",
      subject: subjectInput?.value.trim() || "",
      message: messageInput?.value.trim() || ""
    };

    if (!payload.name || !payload.email || !payload.message) {
      button.classList.add("error");
      setButtonLabel("MISSING DATA");
      setStatus("Popalni ime, imeil i opisanie.", true);
      resetButton(2000);
      return;
    }

    button.disabled = true;
    button.classList.remove("success", "error");
    button.classList.add("loading");
    setStatus("");

    setButtonLabel("INITIALIZING...");
    await sleep(500);
    setButtonLabel("TRANSMITTING...");
    await sleep(600);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || (!data.ok && !data.success)) {
        throw new Error(data.error || "Greshka pri izprashtane.");
      }

      button.classList.remove("loading");
      button.classList.add("success");
      setButtonLabel("SENT SUCCESSFULLY");
      setStatus("Zaqtvaneto e prieto.");
      logLine("[API] Request transmitted to /api/contact.");
      form.reset();
      resetButton(3000);
    } catch (err) {
      button.classList.remove("loading");
      button.classList.add("error");
      setButtonLabel("TRANSMIT FAILED");
      setStatus(err.message || "Greshka pri vruzka.", true);
      resetButton(2500);
    }
  });
}
