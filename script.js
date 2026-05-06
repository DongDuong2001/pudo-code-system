document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add a little random rotation to brutal cards on entrance
                if (entry.target.classList.contains('brutal-card')) {
                    const rot = (Math.random() - 0.5) * 4;
                    entry.target.style.transform = `rotate(${rot}deg)`;
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth Scroll for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dynamic Header Refinement
    const headerMain = document.querySelector('.header-main');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            headerMain.style.padding = '0.5rem 0';
            headerMain.style.boxShadow = '0 4px 0 var(--black)';
        } else {
            headerMain.style.padding = '1rem 0';
            headerMain.style.boxShadow = '0 6px 0 var(--black)';
        }
    });
});
