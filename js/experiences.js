/* Certificate Modal Logic */
const modal = document.getElementById("certModal");
const certFrame = document.getElementById("certFrame");
const certImage = document.getElementById("certImage");
const closeModalBtn = document.getElementById("closeModal");
const certButtons = document.querySelectorAll(".cert-btn");

// Open Modal
certButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const certSrc = btn.getAttribute("data-cert");
    
    // Check if the certificate is an image format
    const isImage = /\.(jpeg|jpg|png|gif|webp)$/i.test(certSrc);
    
    if (isImage) {
      if (certFrame) certFrame.style.display = "none";
      if (certImage) {
        certImage.style.display = "block";
        certImage.src = certSrc;
      }
    } else {
      if (certImage) certImage.style.display = "none";
      if (certFrame) {
        certFrame.style.display = "block";
        certFrame.src = certSrc;
      }
    }
    
    modal.classList.add("active");
  });
});

// Function to close modal
function closeModal() {
  modal.classList.remove("active");
  // Give the fade-out animation time before removing the source
  setTimeout(() => {
    if (certFrame) certFrame.src = "";
    if (certImage) certImage.src = "";
  }, 300); 
}

// Close via Button
if (closeModalBtn) {
  closeModalBtn.addEventListener("click", closeModal);
}

// Close via clicking outside the modal content (on the blurred background)
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Close via Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("active")) {
    closeModal();
  }
});