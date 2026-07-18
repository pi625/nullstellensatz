// assets/js/widgets/widget2.js
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('widget-2');
  if (!el) return;
  const notice = document.createElement('div');
  notice.className = 'data-readout';
  notice.textContent = 'Widget placeholder: polynomial encoder (assets/js/widgets/widget2.js)';
  el.appendChild(notice);
});