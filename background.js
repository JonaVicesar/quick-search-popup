const ENGINES = {
  google: (q) =>
    `https://www.google.com/search?q=${encodeURIComponent(q)}&igu=1`,
  duckduckgo: (q) => `https://duckduckgo.com/?q=${encodeURIComponent(q)}`,
};

/**
 * Handles the search-selection keyboard shortcut.x
 * Grabs the selected text from the active tab and opens
 * a popup window with the search results.
 * @param {string} command
 */
async function handleCommand(command) {
  if (command !== "search-selection") return;

  const [tab] = await browser.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;

  const [result] = await browser.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => window.getSelection().toString(),
  });

  const selectedText = result?.result?.trim();
  if (!selectedText) return;

  const { engine } = await browser.storage.local.get("engine");
  const url = ENGINES[engine || "google"](selectedText);

  browser.windows.create({
    url: url + "#_qsp",
    type: "popup",
    width: 900,
    height: 700,
  });
}

browser.commands.onCommand.addListener(handleCommand);

addEventListener("keydown", (e) => {
  if (e.key == "Escape") window.close();
});