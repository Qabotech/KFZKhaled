document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Only proceed if both elements exist
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu on link click
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    } else {
        console.warn('Navigation toggle or menu not found. Check your HTML.');
    }

    // --- Smooth scrolling (safe) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Header background on scroll ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (header) {
            header.style.background = window.scrollY > 100
                ? 'rgba(26, 26, 26, 0.98)'
                : 'rgba(26, 26, 26, 0.95)';
        }
    });

    // --- Intersection Observer for animations ---
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card, .review-card, .stat-item').forEach(el => {
        observer.observe(el);
    });

    // --- Counter animation ---
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            if (target >= 1000) {
                element.textContent = Math.floor(current / 1000) + 'K+';
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 20);
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    if (text.includes('10K+')) {
                        animateCounter(stat, 10000);
                    } else if (text.includes('15+')) {
                        animateCounter(stat, 15);
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) statsObserver.observe(statsSection);

    // --- Parallax ---
    const heroBackground = document.querySelector('.hero-bg');
    window.addEventListener('scroll', () => {
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${window.pageYOffset * 0.5}px)`;
        }
    });

    // --- Lazy loading for images ---
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s';
                const newImg = new Image();
                newImg.onload = () => { img.style.opacity = '1'; };
                newImg.src = img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    document.querySelectorAll('img').forEach(img => imageObserver.observe(img));

    // --- Button loading states (safe) ---
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => this.classList.remove('loading'), 2000);
            }
        });
    });

    // --- WhatsApp buttons (already safe, but ensure elements exist) ---
    document.querySelectorAll('.Termin-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            window.open('https://api.whatsapp.com/send/?phone=4917623393002&text=Hallo%2C+ich+w%C3%BCrde+gerne+einen+Termin+f%C3%BCr+mein+Auto+bei+euch+buchen.+K%C3%B6nnt+ihr+mir+bitte+die+verf%C3%BCgbaren+Zeiten+mitteilen%3F+Vielen+Dank%21&type=phone_number&app_absent=0', '_blank');
        });
    });
    // ... repeat for .more-btn, .default-btn

    // --- Keyboard navigation (ESC) ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (navToggle) {
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });

    // --- Init: year in footer ---
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if (yearElement) {
        yearElement.textContent = yearElement.textContent.replace('2024', currentYear);
    }

    // --- Initial hero animation ---
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) heroContent.classList.add('fade-in-up');
    }, 500);
});