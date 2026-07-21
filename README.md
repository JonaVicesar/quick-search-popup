# Quick Search Popup

A Firefox extension for quick searches without tab clutter. Instead of opening a new tab every time you look something up, this extension opens a compact popup where you can search, browse results, and follow links all in just one small window that closes when you're done. No more hundred tabs eating your memory.

## How It Works

1. Press `Ctrl+Shift+Space` (or click the extension icon in the toolbar)
2. Type your query, pick a search engine, press Enter
3. Results open in a compact popup window — no address bar, no tabs
4. Click any link — it navigates the same window, not a new tab

When you're done reading, just close the popup. The search form is there again next time you need it.

## Install

Actually this extension is not yet on the Firefox Add-ons page. So to install it temporarily:

1. Download or clone this repository
2. Open `about:debugging#/runtime/this-firefox` in Firefox
3. Click **Load Temporary Add-on...**
4. Navigate to the downloaded folder and select `manifest.json` (it must be this file)

The extension will appear in your toolbar. (IMPORTANT: It will be removed when Firefox restarts.)

## Supported Engines

- Google
- DuckDuckGo

The extension remembers your last-used engine between sessions.

## Project Structure

```
manifest.json   — Extension config (MV3, permissions, content scripts)
popup.html      — Search interface (HTML)
popup.css       — Styles for the search interface
popup.js        — Search logic (engines, form handling, window creation)
content.js      — Link interception (keeps clicks inside the popup window)
```
