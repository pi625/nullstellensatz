// js/main.js
window.addEventListener('scroll', () => {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    const scrolled = window.scrollY;
    
    const progress = (scrolled / (docHeight - winHeight)) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
});
