// script.js
// Version: 1.2.0

const VERSION = 'v1.1.0';

document.addEventListener('DOMContentLoaded', () => {
  // DOM refs
  const generateBtn = document.getElementById('generateBtn');
  const openGmailBtn = document.getElementById('openGmailBtn');
  const copyBtn = document.getElementById('copyBtn');
  const output = document.getElementById('output');
  const channelInput = document.getElementById('channelLink');
  const locationInput = document.getElementById('location');
  const historyEl = document.getElementById('history');
  const warningModal = document.getElementById('warningModal');
  const modalClose = document.getElementById('modalClose');
  const modalOk = document.getElementById('modalOk');
  const dontShow = document.getElementById('dontShow');
  const warningToggle = document.getElementById('warningToggle');
  const versionLabel = document.getElementById('versionLabel');

  // set version label
  versionLabel.textContent = VERSION;

  // load history
  renderHistory();

  // show warning modal unless user opted out
  const showWarning = localStorage.getItem('showWarning');
  if (showWarning !== 'false') {
    openModal();
  }

  // event listeners
  generateBtn.addEventListener('click', generateReport);
  openGmailBtn.addEventListener('click', openGmail);
  copyBtn.addEventListener('click', copyToClipboard);
  modalClose.addEventListener('click', closeModal);
  modalOk.addEventListener('click', confirmModal);
  warningToggle.addEventListener('click', openModal);

  // functions
  function sanitizeLink(link) {
    // basic trim; more validation may be added later
    return link.trim();
  }

  function generateReport() {
    const link = sanitizeLink(channelInput.value);
    const where = locationInput.value;

    if (!link) {
      output.value = 'Please enter a valid YouTube channel link.';
      return;
    }

    const now = new Date().toLocaleString();

    const message =
`Hello YouTube Trust & Safety Team,

I am writing to report a YouTube channel that appears to be an automated or bot account whose subscriptions and profile imagery promote adult content that may be visible to general audiences, including minors.

Channel link:
${link}

Observed location:
${where}

This behavior appears to contravene YouTube’s Community Guidelines, in particular provisions related to sexually explicit content, child safety, and deceptive or spammy behavior. I respectfully request that Trust & Safety review this account and take appropriate action if a violation is confirmed.

Thank you for your attention.

Sincerely,
A concerned user
Reported on: ${now}`;

    output.value = message;
    saveHistory({ link, where, date: now });
    renderHistory();
  }

  function openGmail() {
    if (!output.value) {
      alert('Generate a report message first.');
      return;
    }
    const to = 'trustandsafety@youtube.com';
    const subject = encodeURIComponent('Report: channel potentially promoting adult content');
    const body = encodeURIComponent(output.value);
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${subject}&body=${body}`;
    window.open(url, '_blank');
  }

  function copyToClipboard() {
    if (!output.value) return;
    navigator.clipboard.writeText(output.value).then(() => {
      // subtle UI feedback
      copyBtn.textContent = 'Copied';
      setTimeout(() => (copyBtn.textContent = 'Copy text'), 1400);
    }).catch(() => {
      // fallback
      output.select();
      document.execCommand('copy');
      copyBtn.textContent = 'Copied';
      setTimeout(() => (copyBtn.textContent = 'Copy text'), 1400);
    });
  }

  function saveHistory(entry) {
    const existing = JSON.parse(localStorage.getItem('reports') || '[]');
    existing.unshift(entry);
    // keep last 25 reports
    localStorage.setItem('reports', JSON.stringify(existing.slice(0, 25)));
  }

  function renderHistory() {
    const existing = JSON.parse(localStorage.getItem('reports') || '[]');
    historyEl.innerHTML = '';
    if (!existing.length) {
      const li = document.createElement('li');
      li.textContent = 'No reports yet';
      li.style.color = 'var(--muted)';
      historyEl.appendChild(li);
      return;
    }
    existing.forEach((r) => {
      const li = document.createElement('li');
      const left = document.createElement('div');
      left.style.display = 'flex';
      left.style.flexDirection = 'column';
      left.innerHTML = `<strong style="color:#fff;font-size:13px">${r.link}</strong><span style="font-size:12px;color:var(--muted)">${r.where}</span>`;
      const right = document.createElement('div');
      right.style.fontSize = '12px';
      right.style.color = 'var(--muted)';
      right.textContent = r.date;
      li.appendChild(left);
      li.appendChild(right);
      historyEl.appendChild(li);
    });
  }

  // modal controls
  function openModal() {
    warningModal.hidden = false;
    warningModal.style.display = 'flex';
  }
  function closeModal() {
    warningModal.hidden = true;
    warningModal.style.display = 'none';
  }
  function confirmModal() {
    if (dontShow.checked) {
      localStorage.setItem('showWarning', 'false');
    } else {
      localStorage.removeItem('showWarning');
    }
    closeModal();
  }
});