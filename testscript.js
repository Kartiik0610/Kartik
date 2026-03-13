const bg = document.getElementById('bg');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    bg.style.transform = `translate(${mouseX * 25}px, ${mouseY * 25}px)`;
});