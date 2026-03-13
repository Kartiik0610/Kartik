function initNavbar() {
  const segmented = document.getElementById("segmented");
  if (!segmented) return;

  const segments = segmented.querySelectorAll(".segment");
  const indicator = segmented.querySelector(".indicator");

  function moveIndicator(index) {
    if (indicator) {
      indicator.style.transform = `translateX(${index * 100}%)`;
    }
  }

  // Handle click events
  segments.forEach((seg, index) => {
    seg.addEventListener("click", () => {
      const link = seg.getAttribute("data-link");
      
      // Visually move the indicator immediately
      moveIndicator(index);
      
      // Add active class immediately for text color pop
      segments.forEach(s => s.classList.remove("active"));
      seg.classList.add("active");

      // Wait 150ms to allow the sliding animation to start before navigating
      setTimeout(() => {
        // TRIGGER SPA ANIMATION INSTEAD OF HARD REFRESH
        if (typeof window.switchPage === 'function' && typeof pages !== 'undefined' && typeof currentIndex !== 'undefined') {
          const targetIndex = pages.indexOf(link);
          const direction = targetIndex > currentIndex ? 'next' : 'prev';
          // Only animate if they clicked a different page
          if (targetIndex !== currentIndex && targetIndex !== -1) {
            window.switchPage(targetIndex, direction);
          }
        } else {
          window.location.href = link;
        }
      }, 150);
    });
  });

  // Highlight active tab based on current URL
  let currentPage = window.location.pathname.split("/").pop().toLowerCase();
  
  // If the user is on the root domain (e.g. www.site.com/), default to index.html
  if (!currentPage || currentPage === "") {
    currentPage = "index.html";
  }

  segments.forEach((seg, index) => {
    if (seg.getAttribute("data-link").toLowerCase() === currentPage) {
      seg.classList.add("active");
      moveIndicator(index);
    } else {
      seg.classList.remove("active");
    }
  });
}

function loadNavbar() {
  const container = document.getElementById('navbar-container');
  if (!container) return;
  
  if (container.innerHTML.trim() === '') {
    fetch('components/navbar.html')
      .then(res => res.text())
      .then(data => {
        container.innerHTML = data;
        initNavbar();
      })
      .catch(err => console.error("Error loading navbar:", err));
  } else {
    initNavbar();
  }
}

// Make sure it runs on load or if script is deferred
document.addEventListener("DOMContentLoaded", loadNavbar);
// Call it immediately just in case DOMContentLoaded already fired
if (document.readyState === "complete" || document.readyState === "interactive") {
  loadNavbar();
}