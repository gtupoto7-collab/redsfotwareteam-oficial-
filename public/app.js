const form = document.getElementById("contactForm");
const button = document.getElementById("sendBtn");
const statusEl = document.getElementById("formStatus");
const subjectInput = document.getElementById("subject");
const healthBadge = document.getElementById("healthBadge");

if (healthBadge) {
  fetch("/api/health")
    .then((r) => r.json())
    .then((d) => {
      healthBadge.textContent = d && d.ok ? "ONLINE" : "READY";
    })
    .catch(() => {
      healthBadge.textContent = "LOCAL";
    });
}

document.querySelectorAll("[data-plan]").forEach((el) => {
  el.addEventListener("click", (e) => {
    const plan = el.getAttribute("data-plan");
    if (plan && subjectInput) {
      subjectInput.value = plan;
    }
    if (el.tagName === "BUTTON") {
      e.preventDefault();
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  });
});

if (form && button) {
  const btnText = button.querySelector(".btn-text");
  const originalLabel = btnText ? btnText.textContent : "Izprati zaqvka";
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function setButtonLabel(text) {
    if (btnText) btnText.textContent = text;
    else button.textContent = text;
  }

  function setStatus(text, isError = false) {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.style.color = isError ? "#ff5277" : "#00e676";
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
      message: document.getElementById("message")?.value.trim() || ""
    };

    if (!payload.name || !payload.email || !payload.message) {
      button.classList.add("error");
      setButtonLabel("Lipsvat danni");
      setStatus("Popalni ime, imeil i opisanie na proekta.", true);
      resetButton(2000);
      return;
    }

    button.disabled = true;
    button.classList.remove("success", "error");
    button.classList.add("loading");
    setStatus("");

    setButtonLabel("Initializing...");
    await sleep(550);
    setButtonLabel("Sending...");
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
      setButtonLabel("Izprateno uspeshno");
      setStatus("Zaqtvaneto e prieto.");
      form.reset();
      resetButton(3000);
    } catch (err) {
      button.classList.remove("loading");
      button.classList.add("error");
      setButtonLabel("Greshka pri vruzka");
      setStatus(err.message || "Vuznikna greshka.", true);
      resetButton(2500);
    }
  });
}
