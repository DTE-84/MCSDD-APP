// ─────────────────────────────────────────────
//  PCSP Assistant Pro | Marion County DMH
//  app.js — All application logic
// ─────────────────────────────────────────────

// ── Goal Templates by Domain ──
const data = {
  Safety: [
    "demonstrate 2 ways to exit the home during a drill",
    "identify 'safe strangers' in the Hannibal community",
    "exit the home and meet staff at the designated 'Safety Spot'",
    "demonstrate the ability to call 911 and provide their home address",
    "utilize a 'Safety Tool' (e.g., cell phone) to reach support",
    "independently identify 2 exits in any community building",
  ],
  Daily: [
    "identify 3 local businesses of interest for future employment",
    "participate in their annual PCSP meeting and express 1 choice",
    "review their monthly ledger with staff assistance",
    "practice 3 interview questions with staff",
    "lead at least one section of their PCSP meeting",
  ],
  Community: [
    "initiate 1 conversation with a peer during a community outing",
    "navigate to 2 locations in Hannibal (e.g., Library, Admiral Coontz Center)",
    "use OATS transit to attend a local social event",
    "participate in 1 volunteer activity at a Marion County park",
  ],
  Health: [
    "choose a healthy snack option with 1 verbal prompt",
    "participate in 20 minutes of physical activity (e.g., Riverview Park)",
    "identify the name and purpose of their morning medications",
    "assist in the preparation of one healthy meal per week",
  ],
};

// ── Local Resources ──
const resources = [
  {
    name: "Mark Twain Behavioral Health",
    info: "Crisis: (800) 356-5395",
    contact: "Hannibal Office",
  },
  {
    name: "Douglass Community Services",
    info: "Food/Utility Assistance",
    contact: "573-221-3892",
  },
  {
    name: "OATS Transit",
    info: "Transportation Marion Co.",
    contact: "800-269-6287",
  },
  {
    name: "NECAC Marion County",
    info: "Housing & Support",
    contact: "573-221-7166",
  },
];

// ── All form field IDs (used for save/restore) ──
const FORM_FIELDS = [
  "clientName",
  "clientDOB",
  "dmhID",
  "ispDate",
  "moediDate",
  "cimorDate",
  "lastAssessment",
  "lastLOC",
  "rasSisScore",
  "coordinator",
  "insurance",
  "aspirations",
  "prevGoals",
  "strengths",
  "techHelpers",
  "relationships",
  "communityResources",
  "medSupport",
  "riskLevel",
  "supervisionLevel",
  "behavioralStatus",
  "oshaPrecaution",
  "evacPlan",
  "legalStatus",
  "rightsBrochure",
  "consents",
  "serviceSatisfaction",
  "conflictInfo",
  "contributors",
  "participation",
  "scFrequency",
  "payeeInfo",
  "burialInfo",
  "domain",
  "verb",
  "frequency",
  "goalTemplate",
];

// ── Initialise App ──
function init() {
  renderResources();
  renderHistory();
  loadTemplates();
}

// ── Sidebar Toggle ──
function toggleSidebar() {
  const container = document.getElementById("appContainer");
  if (window.innerWidth <= 1024) {
    document.body.classList.toggle("sidebar-active");
  } else {
    container.classList.toggle("sidebar-collapsed");
  }
}

// ── Render Resource Cards ──
function renderResources() {
  document.getElementById("resourceList").innerHTML = resources
    .map(
      (res) => `
      <div class="resource-card" onclick="injectResource('${res.name}')">
        <span class="resource-name">${res.name}</span>
        <span class="resource-info">${res.info} | ${res.contact}</span>
      </div>
    `,
    )
    .join("");
}

// ── Load Goal Templates ──
function loadTemplates() {
  const d = document.getElementById("domain").value;
  const selector = document.getElementById("goalTemplate");
  selector.innerHTML = d
    ? data[d].map((item) => `<option value="${item}">${item}</option>`).join("")
    : "<option>-- Select Domain First --</option>";
  updateUI();
}

// ── Update Individual Header & Narrative Preview ──
function updateUI() {
  const isPrivacyOn = document.getElementById("privacyToggle").checked;
  const getVal = (id) => document.getElementById(id).value;

  const name = getVal("clientName") || "";
  const dob = getVal("clientDOB") || "";
  const dmhID = getVal("dmhID") || "";

  // Update sticky header
  document.getElementById("headerName").textContent =
    name || "No Individual Selected";
  document.getElementById("headerDOB").textContent = dob
    ? new Date(dob + "T00:00:00").toLocaleDateString()
    : "—";
  document.getElementById("headerDMH").textContent = dmhID || "—";

  // Privacy masking for the preview
  const displayName = isPrivacyOn ? "[INDIVIDUAL]" : name || "[NAME]";
  const displayDOB = isPrivacyOn
    ? "[MM/DD/YYYY]"
    : dob
      ? new Date(dob + "T00:00:00").toLocaleDateString()
      : "N/A";
  const displayDMH = isPrivacyOn ? "[XXXXXXX]" : dmhID || "N/A";

  // Build narrative text
  let text = `MISSOURI PERSON CENTERED SERVICE PLAN (PCSP) SUMMARY\n`;
  text += `=====================================================\n\n`;

  text += `1. DEMOGRAPHICS & SYSTEM INTEGRATION\n`;
  text += `Name: ${displayName} | DOB: ${displayDOB} | DMH ID: ${displayDMH}\n`;
  text += `Implementation Date: ${getVal("ispDate") || "N/A"} | Coordinator: ${getVal("coordinator") || "N/A"}\n`;
  text += `System Updates: MOEDIWEB (${getVal("moediDate") || "N/A"}), CIMOR (${getVal("cimorDate") || "N/A"})\n`;
  text += `Assessments: Last Eval (${getVal("lastAssessment") || "N/A"}), Last LOC (${getVal("lastLOC") || "N/A"}), RAS/SIS Score (${getVal("rasSisScore") || "N/A"})\n`;
  text += `Primary Resource: ${getVal("insurance")}\n\n`;

  text += `2. VISION FOR A GOOD LIFE\n`;
  text += `Personal Aspirations: ${getVal("aspirations") || "See personal vision statement."}\n`;
  text += `Previous Goals Progress: ${getVal("prevGoals") || "N/A"}\n`;
  text += `Strengths/Assets: ${getVal("strengths") || "N/A"}\n`;
  text += `Technology/Support: Tech (${getVal("techHelpers") || "None"}), Relationships (${getVal("relationships") || "None"})\n`;
  text += `Community Resources: ${getVal("communityResources") || "N/A"}\n\n`;

  text += `3. HEALTH, SAFETY & RISK\n`;
  text += `Medication/Diet/Mobility: ${getVal("medSupport") || "Standard per profile."}\n`;
  text += `Supervision: ${getVal("supervisionLevel")} | Risk Level: ${getVal("riskLevel")}\n`;
  text += `Behavioral Status: ${getVal("behavioralStatus")} | OSHA Precaution: ${getVal("oshaPrecaution")}\n`;
  text += `Evacuation/911 Plan: ${getVal("evacPlan") || "N/A"}\n\n`;

  text += `4. LEGAL, RIGHTS & SATISFACTION\n`;
  text += `Status: ${getVal("legalStatus")} | Rights Brochure: ${getVal("rightsBrochure")} | Consents: ${getVal("consents")}\n`;
  text += `Service Satisfaction: ${getVal("serviceSatisfaction") || "N/A"}\n`;
  text += `Conflict of Interest Info: ${getVal("conflictInfo")}\n`;
  text += `Note: To file an anonymous complaint, contact the Office of Constituent Services at 1-800-364-9687.\n\n`;

  text += `5. CONTRIBUTORS & ADMINISTRATION\n`;
  text += `Contributors: ${getVal("contributors") || "N/A"}\n`;
  text += `Participation: ${getVal("participation") || "N/A"}\n`;
  text += `SC Monitoring: ${getVal("scFrequency") || "N/A"}\n`;
  text += `Payee/Spending: ${getVal("payeeInfo") || "N/A"} | Burial: ${getVal("burialInfo") || "N/A"}\n\n`;

  text += `6. MEASURABLE OUTCOMES\n`;
  if (getVal("domain")) {
    text += `The individual will receive ${getVal("verb")} ${getVal("goalTemplate")}.\n`;
    text += `Frequency: ${getVal("frequency") || "[FREQUENCY]"} | Monitoring: SC Quarterly & Provider Monthly.`;
  } else {
    text += `(Outcome narrative pending domain selection)`;
  }

  document.getElementById("narrativeDisplay").innerText = text;
}

// ── Inject Resource into Preview ──
function injectResource(res) {
  const display = document.getElementById("narrativeDisplay");
  display.innerText += `\n\n[RESOURCE INJECTION]: Collaboration with ${res} integrated.`;
  if (window.innerWidth <= 1024) toggleSidebar();
}

// ── Reset / New Plan ──
function resetForm() {
  if (confirm("Start a new plan? This clears the current workspace.")) {
    location.reload();
  }
}

// ── Toast Notification ──
function showToast(message, type = "info", duration = 3500) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

// ── Copy to Clipboard ──
function copyToClipboard() {
  navigator.clipboard
    .writeText(document.getElementById("narrativeDisplay").innerText)
    .then(() => showToast("✅ Full PCSP Summary copied to clipboard!", "success"))
    .catch(() => showToast("❌ Copy failed. Try again.", "error"));
}

// ── Print / Save PDF ──
function printPlan() {
  // Ensure privacy mode is OFF so real data prints (with confirmation)
  const privacyOn = document.getElementById("privacyToggle").checked;
  if (privacyOn) {
    if (!confirm("⚠️ HIPAA Privacy Mode is ON — the printed document will show masked placeholder values.\n\nTurn off Privacy Mode before printing if you want real data to appear.\n\nContinue printing anyway?")) {
      return;
    }
  }
  window.print();
}

// ─────────────────────────────────────────────
//  FILE EXPORT — Save .pcsp file to disk
// ─────────────────────────────────────────────
function exportPCSP() {
  const formData = captureFormData();
  const name = document.getElementById("clientName").value || "Draft";
  const exportObj = {
    app: "PCSP Assistant Pro",
    version: "1.0",
    exportedAt: new Date().toISOString(),
    clientName: name,
    formData: formData,
    narrative: document.getElementById("narrativeDisplay").innerText,
  };

  const blob = new Blob([JSON.stringify(exportObj, null, 2)], {
    type: "application/json",
  });

  // Build a safe filename: "PCSP_JohnDoe_2025-06-01.pcsp"
  const safeDate = new Date().toISOString().slice(0, 10);
  const safeName = name.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 30);
  const fileName = `PCSP_${safeName}_${safeDate}.pcsp`;

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);

  showToast(`✅ Exported "${fileName}" — share or store this file securely.`, "success", 5000);
}

// ─────────────────────────────────────────────
//  FILE IMPORT — Open a .pcsp file & auto-fill
// ─────────────────────────────────────────────
function importPCSP(event) {
  const file = event.target.files[0];
  if (!file) return;

  // Validate extension
  if (!file.name.endsWith(".pcsp") && !file.name.endsWith(".json")) {
    showToast("❌ Invalid file type. Please select a .pcsp file.", "error");
    event.target.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);

      // Basic integrity check
      if (!data.app || data.app !== "PCSP Assistant Pro") {
        showToast("❌ This file was not created by PCSP Assistant Pro.", "error");
        return;
      }
      if (!data.formData) {
        showToast("❌ File is missing form data. Cannot restore.", "error");
        return;
      }

      const clientLabel = data.clientName || "this individual";
      const exportedDate = data.exportedAt
        ? new Date(data.exportedAt).toLocaleString()
        : "unknown date";

      if (
        confirm(
          `📂 Open plan for "${clientLabel}"?\n\nExported: ${exportedDate}\n\nThis will replace your current workspace. Continue?`
        )
      ) {
        restoreFormData(data.formData);
        showToast(`✅ Plan for "${clientLabel}" loaded successfully.`, "success", 5000);
      }
    } catch (err) {
      showToast("❌ Failed to read file. It may be corrupt or not a valid .pcsp file.", "error", 5000);
      console.error("PCSP import error:", err);
    }
    // Reset file input so the same file can be re-opened if needed
    event.target.value = "";
  };
  reader.onerror = function () {
    showToast("❌ Could not read file. Please try again.", "error");
    event.target.value = "";
  };
  reader.readAsText(file);
}

// ── Capture All Form Field Values ──
function captureFormData() {
  const formData = {};
  FORM_FIELDS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) formData[id] = el.value;
  });
  return formData;
}

// ── Restore All Form Field Values from Saved Data ──
function restoreFormData(formData) {
  FORM_FIELDS.forEach((id) => {
    const el = document.getElementById(id);
    if (el && formData[id] !== undefined) {
      el.value = formData[id];
    }
  });
  loadTemplates();
  updateUI();
}

// ── Save Draft to localStorage ──
function saveToHistory() {
  const history = JSON.parse(localStorage.getItem("pcsp_drafts") || "[]");
  const name = document.getElementById("clientName").value || "Unnamed Draft";
  history.unshift({
    id: Date.now(),
    date: new Date().toLocaleDateString(),
    title: name,
    formData: captureFormData(),
    text: document.getElementById("narrativeDisplay").innerText,
  });
  localStorage.setItem("pcsp_drafts", JSON.stringify(history.slice(0, 10)));
  renderHistory();
  showToast(`✅ Draft saved for "${name}". Reload anytime from Saved Drafts.`, "success", 4000);
}

// ── Render Saved Drafts List ──
function renderHistory() {
  const history = JSON.parse(localStorage.getItem("pcsp_drafts") || "[]");
  document.getElementById("historyList").innerHTML = history.length
    ? history
        .map(
          (item) => `
        <div class="history-item" style="display:flex; justify-content:space-between; align-items:center;">
          <div onclick="viewDraft(${item.id})" style="cursor:pointer; flex-grow:1;">
            <span class="history-title">${item.title}</span>
            <span class="history-date">${item.date}</span>
          </div>
          <button onclick="deleteDraft(${item.id})"
            style="background:transparent; border:none; color:var(--danger); cursor:pointer; padding:5px; font-size:16px;"
            title="Delete Draft">✕</button>
        </div>
      `,
        )
        .join("")
    : `<p style="font-size:12px; color:#999; padding:10px;">No saved drafts yet. Fill out the form and click 💾 Save Draft.</p>`;
}

// ── Load a Saved Draft ──
function viewDraft(id) {
  const history = JSON.parse(localStorage.getItem("pcsp_drafts") || "[]");
  const draft = history.find((d) => d.id === id);
  if (draft) {
    if (
      confirm(
        `Load draft for "${draft.title}"?\n\nThis will restore all form fields. Your current work will be overwritten.`,
      )
    ) {
      if (draft.formData) {
        restoreFormData(draft.formData);
      } else {
        document.getElementById("narrativeDisplay").innerText = draft.text;
      }
    }
  }
}

// ── Delete a Saved Draft ──
function deleteDraft(id) {
  if (confirm("Permanently delete this draft?")) {
    let history = JSON.parse(localStorage.getItem("pcsp_drafts") || "[]");
    history = history.filter((item) => item.id !== id);
    localStorage.setItem("pcsp_drafts", JSON.stringify(history));
    renderHistory();
  }
}

// ── Boot ──
init();
