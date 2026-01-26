document.addEventListener('DOMContentLoaded', () => {
    // Mobile Nav Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Modal logic
    const modal = document.getElementById('download-modal');
    const btnConocenos = document.getElementById('btn-conocenos');
    const closeModal = document.querySelector('.close-modal');

    btnConocenos.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                mainNav.classList.remove('active');
            }
        });
    });

    // Simple Form Submission (Frontend only)
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Gracias por tu mensaje. Nos pondremos en contacto pronto.');
            contactForm.reset();
        });
    }
});
