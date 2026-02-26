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
    navToggle.classList.toggle("active");
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

  // Form Submission to PHP backend
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = "Enviando...";
      btn.disabled = true;

      const data = {
        nombre: contactForm.querySelector('[name="nombre"]').value,
        email: contactForm.querySelector('[name="email"]').value,
        telefono: contactForm.querySelector('[name="telefono"]').value,
        mensaje: contactForm.querySelector('[name="mensaje"]').value,
      };

      try {
        const res = await fetch("contaco.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (result.success) {
          btn.textContent = "¡Enviado!";
          btn.style.backgroundColor = "#28a745";
          contactForm.reset();
          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.backgroundColor = "";
            btn.disabled = false;
          }, 3000);
        } else {
          throw new Error(result.message);
        }
      } catch (err) {
        alert(err.message || "Error al enviar el mensaje. Intentá de nuevo.");
        btn.textContent = originalText;
        btn.disabled = false;
      }
    });
  }
});
