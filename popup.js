const themes = [
  {id:"aurora", name:"Aurora", bg:"linear-gradient(135deg,#1f005c,#5b0060,#870160,#ac255e,#ca485c)", accent:"#ffb6c1", text:"#ffffff"},
  {id:"cyber", name:"Cyber", bg:"linear-gradient(135deg,#000428,#004e92)", accent:"#00f0ff", text:"#e0f7ff"},
  {id:"ocean", name:"Ocean", bg:"linear-gradient(135deg,#0f2027,#203a43,#2c5364)", accent:"#58c9ff", text:"#eaf6ff"},
  {id:"beige", name:"Beige Luxe", bg:"linear-gradient(135deg,#e7dac7,#d0b8a8,#a67b5b)", accent:"#a67b5b", text:"#3e2723"},
  {id:"space", name:"Space Nebula", bg:"linear-gradient(135deg,#0f0c29,#302b63,#24243e)", accent:"#9d4edd", text:"#f1e9ff"},
  {id:"crystal", name:"Crystal", bg:"linear-gradient(135deg,#a1c4fd,#c2e9fb)", accent:"#003366", text:"#001"},
  {id:"velvet", name:"Velvet Noir", bg:"linear-gradient(135deg,#232526,#414345)", accent:"#d4af37", text:"#f5f5f5"},
  {id:"mint", name:"Serene Mint", bg:"linear-gradient(135deg,#a8edea,#fed6e3)", accent:"#00897b", text:"#004d40"},
  {id:"amethyst", name:"Royal Amethyst", bg:"linear-gradient(135deg,#41295a,#2f0743)", accent:"#b388eb", text:"#ede7f6"},
  {id:"dreamspace", name:"Dreamspace", bg:"linear-gradient(135deg,#141E30,#243B55)", accent:"#6DD5FA", text:"#E0F7FA"}
];

const themesContainer = document.getElementById('themes');
const resetBtn = document.getElementById('resetBtn');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');

function render(selectedId) {
  themesContainer.innerHTML = '';
  themes.forEach(t => {
    const sw = document.createElement('div');
    sw.className = 'theme-swatch';
    sw.title = t.name;
    sw.style.background = t.bg;
    sw.addEventListener('click', async () => {
      await chrome.storage.sync.set({ theme: t });
      // apply immediately in active tab if possible
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tabs[0]) {
        try {
          await chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => { /* no-op: content script listens to storage changes */ }
          });
        } catch (e) { /* ignore */ }
      }
    });
    themesContainer.appendChild(sw);
  });
}

resetBtn?.addEventListener('click', () => {
  chrome.storage.sync.remove('theme', () => {
    chrome.storage.sync.remove('customThemes', () => {
      render(null);
      window.close();
    });
  });
});

exportBtn?.addEventListener('click', async () => {
  const data = await new Promise(res => chrome.storage.sync.get(null, res));
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'itzpremium-themes.json'; document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
});

importBtn?.addEventListener('click', () => importFile.click());
importFile?.addEventListener('change', (e) => {
  const f = e.target.files[0];
  if (!f) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      // write everything safely
      chrome.storage.sync.set(parsed, () => {
        alert('Imported settings and themes.');
      });
    } catch (err) {
      alert('Invalid file.');
    }
  };
  reader.readAsText(f);
});

chrome.storage.sync.get('theme', (res) => {
  render(res?.theme?.id || null);
});
