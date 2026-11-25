const form = document.getElementById("contactForm");
const button = document.getElementById("sendBtn");
const statusEl = document.getElementById("formStatus");
const subjectInput = document.getElementById("subject");

function selectPlanAndScroll(planText) {
  if (subjectInput && planText) {
    subjectInput.value = planText;
  }
  const contactSec = document.getElementById("contact");
  if (contactSec) {
    contactSec.scrollIntoView({ behavior: "smooth" });
  }
}

document.querySelectorAll(".niche-card").forEach((card) => {
  card.addEventListener("click", () => {
    selectPlanAndScroll(card.getAttribute("data-plan"));
  });
});

document.querySelectorAll("[data-plan]").forEach((el) => {
  if (el.classList.contains("niche-card")) return;
  el.addEventListener("click", () => {
    const p = el.getAttribute("data-plan");
    if (subjectInput && p) subjectInput.value = p;
  });
});

if (form && button) {
  const btnText = button.querySelector(".btn-text");
  const originalLabel = btnText ? btnText.textContent : "🚀 ИЗПРАТИ ЗАЯВКА";
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
      setButtonLabel("❌ ЛИПСВАТ ДАННИ");
      setStatus("Попълни име, имейл и описание на проекта.", true);
      resetButton(2000);
      return;
    }

    button.disabled = true;
    button.classList.remove("success", "error");
    button.classList.add("loading");
    setStatus("");

    setButtonLabel("INITIALIZING...");
    await sleep(600);
    setButtonLabel("ENCRYPTING MESSAGE...");
    await sleep(600);
    setButtonLabel("TRANSMITTING...");
    await sleep(750);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || (!data.ok && !data.success)) {
        throw new Error(data.error || "Грешка при изпращане.");
      }

      button.classList.remove("loading");
      button.classList.add("success");
      setButtonLabel("✅ CONNECTION ESTABLISHED");
      setStatus("Запитването е прието успешно.");
      form.reset();
      resetButton(3000);
    } catch (err) {
      button.classList.remove("loading");
      button.classList.add("error");
      setButtonLabel("❌ CONNECTION FAILED");
      setStatus(err.message || "Грешка при връзка със сървъра.", true);
      resetButton(2500);
    }
  });
}
