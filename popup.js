const ENGINES = {
  google: (searchingText) =>
    `https://www.google.com/search?q=${encodeURIComponent(searchingText)}&igu=1`,
  duckduckgo: (searchingText) =>
    `https://duckduckgo.com/?q=${encodeURIComponent(searchingText)}`,
};

const input = document.getElementById("searchingText");
const engineSelect = document.getElementById("engine");
const form = document.getElementById("searchForm");

// remember the last engine used
browser.storage.local.get("engine").then((res) => {
  if (res.engine) engineSelect.value = res.engine;
});

input.focus();

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") window.close();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  const engine = engineSelect.value;
  browser.storage.local.set({ engine });

  const url = ENGINES[engine](query);

  // Popup window, without any bar o tab
  browser.windows.create({
    url,
    type: "popup",
    width: 900,
    height: 700,
  });

  window.close();
});
