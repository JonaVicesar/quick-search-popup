const POPUP_HASH = "#_qsp"; //we use this constant as a signal that a page/url was open in the popup

/**
 * verifies if the current page is inside the extension by looking
 * for the _qsp hash marker in the url
 */
function isInThePopup() {
  return window.location.hash === POPUP_HASH;
}

/**
 * removes the _qsp hash marker from the url
 */
function cleanUrl() {
  if (isInThePopup()) {
    history.replaceState(
      null,
      "",
      window.location.pathname + window.location.search,
    );
  }
}

/**
 * intercepts all links clicks and navigates the current popup and avoid opening a new tab
 */
function interceptLinkClick(event) {
  const link = event.target.closest("a");
  if (!link) return;
  if (link.origin !== window.location.origin) return;

  event.preventDefault();
  window.location.href = link.href;
}

function init() {
  if (!isInThePopup()) return;

  cleanUrl();
  document.addEventListener("click", interceptLinkClick, true);
}

init();
