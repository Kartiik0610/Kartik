const roles = [
  "Front End Developer",
  "UI/UX Designer",
  "Mechanical Engineer",
  "Problem Solver",
  "Tech Enthusiast"
];

let roleIndex = 0, charIndex = 0;

function typeRole() {
  const roleText = document.getElementById("role-text");
  if (!roleText) return;
  
  if (charIndex < roles[roleIndex].length) {
    roleText.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeRole, 60);
  } else {
    setTimeout(eraseRole, 1500);
  }
}

function eraseRole() {
  const roleText = document.getElementById("role-text");
  if (!roleText) return;

  if (charIndex > 0) {
    roleText.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseRole, 40);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeRole, 300);
  }
}

document.addEventListener("DOMContentLoaded", typeRole);