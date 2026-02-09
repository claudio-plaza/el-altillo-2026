document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  // Mobile Nav Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  navToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
  });

  // Navigation logic (previously Modal logic was here, now handled by Bootstrap)

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
        // Close mobile menu if open
        mainNav.classList.remove("active");
      }
    });
  });

  // Simple Form Submission (Frontend only)
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Gracias por tu mensaje. Nos pondremos en contacto pronto.");
      contactForm.reset();
    });
  }
});
