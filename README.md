
# 🌀 ItzPremium_v8 — Unified YouTube + Instagram Dark Theme Extension  
<img src="https://cdn.jsdelivr.net/gh/itzbandhan/universalextension/icons/image_first.png" alt="Screenshot" width="500" height="300" />
<img src="https://cdn.jsdelivr.net/gh/itzbandhan/universalextension/icons/image_second.png" alt="Screenshot" width="500" height="300" />


## 💫 Overview  
**ItzPremium_v8** is a lightweight, performance-optimized Chrome extension that applies a **custom theme overlay** to YouTube and Instagram.  
It enhances the user experience with a smooth, glassy dark aesthetic and disables distracting visual effects (like YouTube’s cinematic backlight).  

Built with ❤️ by **Bandhan**, this version is finely tuned for **speed, polish, and seamless integration**.  

---

## ✨ Features  
- 🌙 **Unified dark-glass theme** for both **YouTube** and **Instagram**  
- 💨 **Lag-free** rendering (optimized overlay + no heavy blur layers)  
- 🎥 **Disables YouTube cinematic/ambient lighting** for cleaner visuals  
- 💬 **Rounded DM bubbles** and blended panels on Instagram  
- ⚡ **Instant theme switching** (syncs via Chrome storage)  
- 🔒 No data collection — 100% local styling only  

---



## 🧩 Installation (Load Unpacked in Chrome)
Follow these simple steps to install the extension manually:

1. **Download or Clone this Repository**
   ```bash
   git clone https://github.com/itzbandhan/universalextension.git


Or download it as a `.zip` and extract it.

2. **Open Chrome Extensions Page**

   * Go to: `chrome://extensions/`

3. **Enable Developer Mode**

   * Toggle the **Developer mode** switch in the top-right corner.

4. **Load Unpacked**

   * Click **“Load unpacked”** and select the `ItzPremium_v8` folder you extracted.

5. ✅ The extension will appear in your toolbar (you may pin it manually).

---

## 🎨 Usage

1. Click the **ItzPremium icon** in your Chrome toolbar.
2. Choose your **preferred theme colors** (background, accent, text).
3. The theme will automatically apply to:

   * **YouTube (`youtube.com`)**
   * **Instagram (`instagram.com`)**

Changes are saved instantly and sync across Chrome if you’re signed in.

---

## ⚙️ Technical Details

* **Manifest v3** compliant.
* CSS is dynamically injected via `content.js`.
* Uses **Chrome Sync Storage** to persist theme preferences.
* No DOM observers or performance-heavy effects.

---

## 🧠 Troubleshooting

If styles don’t appear:

1. Refresh YouTube or Instagram.
2. If still not applied, click the popup icon → reselect your theme.
3. You can also run manually in console:

   ```js
   window.__ItzPremiumRefresh();
   ```

---

## 🪶 Credits

* Designed & coded by **Bandhan** (Itzbandhan)
* Optimized and documented by **ChatGPT (OpenAI)**
* Uses no third-party libraries — pure JavaScript & CSS.

---

## 📜 License

This project is licensed under the **MIT License** — you’re free to modify and share with attribution.

---

## 🧩 Example Themes (JSON presets)

You can save these inside your popup or Chrome Storage to test:

```json
{
  "theme": {
    "bg": "#0b0c10",
    "accent": "#8b5cf6",
    "text": "#f5f5f5"
  }
}
```


