const appRoot = document.getElementById("app");

const instagramIntent = "intent://instagram.com/#Intent;scheme=https;package=com.instagram.android;S.browser_fallback_url=https%3A%2F%2Fwww.instagram.com%2F;end";

function renderLauncher(query = "") {
  const q = query.trim().toLowerCase();
  const showInstagram = !q || "instagram".includes(q);
  appRoot.innerHTML = `
    <main class="launcher">
      <header class="launcher-header">
        <div class="brand"><span class="logo"></span><div><b>InstaStudio</b><small>App launcher</small></div></div>
        <span class="launcher-label">MY APPS</span>
      </header>
      <section class="launcher-content">
        <h1>Find your app</h1>
        <p>Search for an app and open it on your device.</p>
        <label class="search-wrap">
          <span aria-hidden="true">⌕</span>
          <input id="app-search" type="search" placeholder="Search apps" value="${escapeHtml(query)}" autocomplete="off">
        </label>
        <div class="app-list" id="app-list">
          ${showInstagram ? `
            <button class="app-item" id="open-instagram" type="button">
              <span class="instagram-icon" aria-hidden="true"><span></span></span>
              <span class="app-copy"><b>Instagram</b><small>Instagram · Social</small></span>
              <span class="open-label">Open</span>
            </button>
          ` : '<p class="empty-state">No apps found.</p>'}
        </div>
        <p class="launcher-note">Instagram opens in the official Instagram app when it is installed. Otherwise, it opens Instagram in your browser.</p>
      </section>
      <footer>InstaStudio</footer>
    </main>`;
  const input = document.getElementById("app-search");
  input.addEventListener("input", () => {
    const position = input.selectionStart;
    renderLauncher(input.value);
    const next = document.getElementById("app-search");
    next.focus();
    next.setSelectionRange(position, position);
  });
  const open = document.getElementById("open-instagram");
  if (open) open.addEventListener("click", launchInstagram);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

function launchInstagram() {
  // Android Chrome resolves this intent to the official Instagram package.
  // The browser fallback opens Instagram's official website if the app is absent.
  window.location.href = instagramIntent;
}

renderLauncher();
