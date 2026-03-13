// Define the order of your pages
const pages = ['index.html', 'experiences.html', 'project.html', 'contact.html'];

// Find out which page we are currently on
let currentPath = window.location.pathname.split("/").pop().toLowerCase();
if (!currentPath || currentPath === "") currentPath = "index.html"; 
let currentIndex = pages.indexOf(currentPath);

let isNavigating = false; 

// --- EXIT ANIMATION LOGIC ---
window.switchPage = function(newIndex, direction) {
  if (newIndex >= 0 && newIndex < pages.length && !isNavigating) {
    isNavigating = true;
    
    // Save direction for the next page to read
    sessionStorage.setItem('pageTransition', direction);

    // Apply the throw-away animation
    const mainCard = document.querySelector('.main-card');
    if (mainCard) {
      if (direction === 'next') {
        mainCard.classList.add('card-slide-up-out'); // Throws card UP
      } else {
        mainCard.classList.add('card-slide-down-out'); // Throws card DOWN
      }
    }
    
    // Wait for the animation to finish, then change the URL
    // The CSS 'out' animation takes 0.6s (600ms).
    // We navigate slightly before it completely ends so the next page starts fading in instantly. 
    setTimeout(() => {
      window.location.href = pages[newIndex];
    }, 550); 
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector('.experience-scroll');
  const mainCard = document.querySelector('.main-card');
  if (!scrollContainer || !mainCard) return;

  // --- ENTRANCE ANIMATION LOGIC ---
  // Check if we just arrived from another page via scrolling
  const transitionDirection = sessionStorage.getItem('pageTransition');
  
  if (transitionDirection === 'next') {
    mainCard.classList.add('card-slide-up-in');
  } else if (transitionDirection === 'prev') {
    mainCard.classList.add('card-slide-down-in');
  }
  
  // Clear it so normal refreshing doesn't trigger the animation
  sessionStorage.removeItem('pageTransition');

  // Remove the entrance class after it finishes so it doesn't block hover effects
  setTimeout(() => {
    mainCard.classList.remove('card-slide-up-in', 'card-slide-down-in');
  }, 850);

  // --- DESKTOP LOGIC (Mouse Wheel / Trackpad) ---
  window.addEventListener('wheel', (e) => {
    if (isNavigating) return;

    const isScrollingDown = e.deltaY > 0;
    const isScrollingUp = e.deltaY < 0;

    const atTop = scrollContainer.scrollTop <= 0;
    const atBottom = Math.ceil(scrollContainer.scrollTop + scrollContainer.clientHeight) >= scrollContainer.scrollHeight - 2;

    if (isScrollingDown && atBottom) {
      window.switchPage(currentIndex + 1, 'next');
    } else if (isScrollingUp && atTop) {
      window.switchPage(currentIndex - 1, 'prev');
    }
  }, { passive: true });

  // --- MOBILE LOGIC (Touch Swipes) ---
  let touchStartY = 0;

  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (isNavigating) return;
    
    let touchEndY = e.changedTouches[0].clientY;
    let deltaY = touchStartY - touchEndY;

    const atTop = scrollContainer.scrollTop <= 0;
    const atBottom = Math.ceil(scrollContainer.scrollTop + scrollContainer.clientHeight) >= scrollContainer.scrollHeight - 2;

    // Swipe threshold of 50px
    if (deltaY > 50 && atBottom) { 
      window.switchPage(currentIndex + 1, 'next'); 
    } else if (deltaY < -50 && atTop) { 
      window.switchPage(currentIndex - 1, 'prev'); 
    }
  }, { passive: true });
});