const contactForm = document.getElementById("contactForm");
const submitBtn = document.querySelector(".submit-btn");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault(); // Prevent page reload

    // Check if form is valid
    if (!contactForm.checkValidity()) {
      contactForm.classList.add("form-submitted");
      return;
    }

    // Prepare Web3Forms submission
    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData);
    const json = JSON.stringify(formObject);

    // If valid, submit the form via fetch
    const originalText = submitBtn.innerText;
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: json
      });

      const result = await response.json();

      if (response.status === 200) {
        // UI Update to Success State
        submitBtn.innerText = "Message Sent! ✓";
        submitBtn.classList.add("success");

        // Remove the error class just in case they had errors previously
        contactForm.classList.remove("form-submitted");

        // Optional: Clear the form fields
        contactForm.reset();
      } else {
        console.error("Web3Forms error:", result);
        submitBtn.innerText = "Failed to Send";
        submitBtn.classList.remove("success");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      submitBtn.innerText = "Failed to Send";
      submitBtn.classList.remove("success");
    } finally {
      // Revert the button back to normal after 3 seconds
      setTimeout(() => {
        submitBtn.innerText = originalText;
        submitBtn.classList.remove("success");
        submitBtn.disabled = false;
      }, 3000);
    }
  });
}