const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, "public");
const DATA_DIR = path.join(__dirname, "data");
const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.json");

app.use(express.json({ limit: "2mb" }));
app.use(express.static(PUBLIC_DIR));

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(SUBMISSIONS_FILE)) {
    fs.writeFileSync(SUBMISSIONS_FILE, "[]", "utf8");
  }
}

function appendSubmission(record) {
  ensureDataDir();
  let list = [];
  try {
    list = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, "utf8"));
    if (!Array.isArray(list)) list = [];
  } catch (_) {
    list = [];
  }
  list.push(record);
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(list, null, 2), "utf8");
}

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "RED SOFTWARE TEAM — AUTO BUILDER AI",
    timestamp: new Date().toISOString()
  });
});

app.post("/api/contact", (req, res) => {
  const name = String(req.body?.name || "").trim();
  const email = String(req.body?.email || "").trim();
  const subject = String(req.body?.subject || "AUTO BUILDER AI").trim();
  const message = String(req.body?.message || "").trim();

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      success: false,
      error: "Моля, попълнете име, имейл и съобщение."
    });
  }

  const record = {
    id: `sub_${Date.now()}`,
    createdAt: new Date().toISOString(),
    name,
    email,
    subject,
    message,
    projectSnapshot: req.body?.projectSnapshot || null
  };

  try {
    appendSubmission(record);
  } catch (err) {
    return res.status(500).json({
      ok: false,
      success: false,
      error: "Грешка при запис на заявката на сървъра."
    });
  }

  return res.status(200).json({
    ok: true,
    success: true,
    id: record.id,
    message: "Запитването е получено и записано."
  });
});

app.post("/api/build", (req, res) => {
  const { prompt = "", productType = "AI Platform", targetType = "WEBSITE", files = {} } = req.body || {};
  const fileNames = Object.keys(files);
  const issues = [];

  if (!fileNames.includes("index.html")) issues.push("Липсва index.html");
  if (!fileNames.includes("app.js")) issues.push("Липсва app.js");
  if (!String(prompt).trim()) issues.push("Липсва входно описание на проекта");

  res.json({
    ok: true,
    productType,
    targetType,
    fileCount: fileNames.length,
    files: fileNames,
    testsPassed: issues.length === 0,
    issues,
    verifiedAt: new Date().toISOString()
  });
});

app.post("/api/export", (req, res) => {
  const project = req.body?.project || {};
  const safeName = String(project.productType || "project")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "red-software-project";

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Content-Disposition", `attachment; filename="${safeName}-bundle.json"`);
  res.send(JSON.stringify(project, null, 2));
});

app.get("*", (req, res) => {
  const indexPath = path.join(PUBLIC_DIR, "index.html");
  if (fs.existsSync(indexPath)) {
    return res.sendFile(indexPath);
  }
  return res.status(404).send("Not found");
});

app.listen(PORT, () => {
  console.log(`RED SOFTWARE TEAM server listening on port ${PORT}`);
});
