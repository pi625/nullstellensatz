// assets/js/widgets/widget1.js
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('widget-1');
  if (!el) return;
  const notice = document.createElement('div');
  notice.className = 'data-readout';
  notice.textContent = 'Widget placeholder: implement interactivity in assets/js/widgets/widget1.js';
  el.appendChild(notice);
});