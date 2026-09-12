document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector('.experience-scroll');
  
  if (scrollContainer && scrollContainer.firstElementChild && typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
      wrapper: scrollContainer,
      content: scrollContainer.firstElementChild,
      lerp: 0.07, // Creates a very smooth, buttery scroll
      smoothWheel: true,
      wheelMultiplier: 1.2 // slightly faster scroll
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
  }
});
