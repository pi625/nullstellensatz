// js/main.js
window.addEventListener('scroll', () => {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrolled = window.scrollY;
    
    const progress = (scrolled / (docHeight - winHeight)) * 100;
    const bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = `${Math.max(0, Math.min(100, progress))}%`;
});
