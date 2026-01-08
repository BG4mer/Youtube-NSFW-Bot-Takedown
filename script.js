const historyList = document.getElementById("history");

function generateEmail() {
    const link = document.getElementById("channelLink").value.trim();
    const location = document.getElementById("location").value;
    const output = document.getElementById("output");

    if (!link) {
        output.value = "Please enter a channel link.";
        return;
    }

    const email =
`Hello YouTube Trust & Safety Team,

I am reporting a channel that appears to be a bot account promoting adult content through its subscriptions and profile presentation.

Channel link:
${link}

Where encountered:
${location}

This content appears publicly visible and may be accessible to minors. Please review this channel for possible violations of YouTube’s Community Guidelines.

Thank you for your time.

A concerned user`;

    output.value = email;
    saveHistory(link);
}

function openGmail() {
    const text = encodeURIComponent(document.getElementById("output").value);
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=trustandsafety@youtube.com&su=NSFW Bot Channel Report&body=${text}`;
    window.open(url, "_blank");
}

function copyEmail() {
    const output = document.getElementById("output");
    output.select();
    document.execCommand("copy");
}

function saveHistory(link) {
    let history = JSON.parse(localStorage.getItem("reports")) || [];
    history.unshift({ link, date: new Date().toLocaleString() });
    history = history.slice(0, 10);
    localStorage.setItem("reports", JSON.stringify(history));
    renderHistory();
}

function renderHistory() {
    historyList.innerHTML = "";
    const history = JSON.parse(localStorage.getItem("reports")) || [];

    history.forEach(r => {
        const li = document.createElement("li");
        li.textContent = `${r.link} — ${r.date}`;
        historyList.appendChild(li);
    });
}

renderHistory();