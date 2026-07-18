/* assets/js/main.js */
/* reading progress bar and theme toggle helper */

window.addEventListener('scroll', () => {
  const winH = window.innerHeight;
  const docH = document.documentElement.scrollHeight;
  const scrolled = window.scrollY;
  const pct = (scrolled / (docH - winH)) * 100;
  const p = Math.max(0, Math.min(100, pct));
  const bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = `${p}%`;
});

/* Optional: simple theme toggle stored in localStorage */
(function() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = localStorage.getItem('site-theme');
  if (!stored) {
    if (prefersDark) document.documentElement.setAttribute('data-theme','dark');
  } else {
    document.documentElement.setAttribute('data-theme', stored);
  }
  window.toggleTheme = function() {
    const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('site-theme', next);
  };
})();