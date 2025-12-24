// DataMaglia Website JavaScript

// ============= NAVIGATION =============
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ============= SMOOTH SCROLLING =============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ============= NAVBAR SCROLL EFFECT =============
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ============= CONTACT FORM HANDLING =============
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = {};

            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                if (data[key]) {
                    // Handle multiple values (like checkboxes)
                    if (Array.isArray(data[key])) {
                        data[key].push(value);
                    } else {
                        data[key] = [data[key], value];
                    }
                } else {
                    data[key] = value;
                }
            }

            // Validate required fields
            const requiredFields = ['name', 'email', 'message'];
            const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '');

            if (missingFields.length > 0) {
                alert('Please fill in all required fields: ' + missingFields.join(', '));
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                // Reset form
                contactForm.reset();

                // Show success message
                alert('Thank you for your message! We\'ll get back to you within 24 hours.');

                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;

                // In a real implementation, you would send the data to your backend
                console.log('Form data:', data);
            }, 2000);
        });
    }

    // ============= INTERSECTION OBSERVER FOR ANIMATIONS =============
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.value-item, .service-card, .industry-item, .team-member, .faq-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ============= STATS COUNTER ANIMATION =============
    function animateCounter(element, target, duration = 2000) {
        let current = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    }

    // Animate stats when they come into view
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statElement = entry.target.querySelector('h3');
                if (statElement && !statElement.dataset.animated) {
                    const text = statElement.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (number) {
                        statElement.dataset.animated = 'true';
                        statElement.textContent = '0';
                        animateCounter(statElement, number);
                    }
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat, .stat-highlight, .stat-item').forEach(stat => {
        statsObserver.observe(stat);
    });

    // ============= MOBILE MENU STYLES =============
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                left: -100%;
                top: 70px;
                flex-direction: column;
                background-color: rgba(255, 255, 255, 0.98);
                width: 100%;
                text-align: center;
                transition: 0.3s;
                box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
                backdrop-filter: blur(10px);
                padding: 2rem 0;
                gap: 1rem;
            }

            .nav-menu.active {
                left: 0;
            }

            .hamburger.active .bar:nth-child(2) {
                opacity: 0;
            }

            .hamburger.active .bar:nth-child(1) {
                transform: translateY(8px) rotate(45deg);
            }

            .hamburger.active .bar:nth-child(3) {
                transform: translateY(-8px) rotate(-45deg);
            }
        }

        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);

    // ============= FORM ENHANCEMENT =============
    // Add floating label effect
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
        if (input.value) {
            input.parentElement.classList.add('filled');
        }

        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            if (input.value) {
                input.parentElement.classList.add('filled');
            } else {
                input.parentElement.classList.remove('filled');
            }
        });

        input.addEventListener('input', () => {
            if (input.value) {
                input.parentElement.classList.add('filled');
            } else {
                input.parentElement.classList.remove('filled');
            }
        });
    });

    // ============= SCROLL TO TOP BUTTON =============
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollToTopBtn);

    const scrollToTopStyle = document.createElement('style');
    scrollToTopStyle.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }

        .scroll-to-top:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }
    `;
    document.head.appendChild(scrollToTopStyle);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ============= LAZY LOADING FOR IMAGES =============
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============= ACCESSIBILITY ENHANCEMENTS =============
    // Skip link functionality
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);

    const skipLinkStyle = document.createElement('style');
    skipLinkStyle.textContent = `
        .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 10000;
            border-radius: 4px;
            transition: top 0.2s;
        }

        .skip-link:focus {
            top: 6px;
        }
    `;
    document.head.appendChild(skipLinkStyle);

    // Add main content ID
    const mainContent = document.querySelector('main') || document.querySelector('.hero');
    if (mainContent) {
        mainContent.id = 'main-content';
    }

    // ============= PERFORMANCE OPTIMIZATION =============
    // Debounce scroll events
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    // Optimize scroll events
    window.addEventListener('scroll', debounce(() => {
        // Scroll-dependent operations here
    }, 10));

    // ============= ERROR HANDLING =============
    window.addEventListener('error', (e) => {
        console.error('JavaScript error occurred:', e.error);
        // In production, you might want to send this to an error tracking service
    });

    // ============= ANALYTICS INTEGRATION PLACEHOLDER =============
    function trackEvent(eventName, properties = {}) {
        // Placeholder for analytics tracking
        console.log('Event tracked:', eventName, properties);

        // Example Google Analytics 4 tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, properties);
        }
    }

    // Track form submissions
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            trackEvent('form_submission', {
                form_name: 'contact_form'
            });
        });
    }

    // Track CTA clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            trackEvent('cta_click', {
                button_text: e.target.textContent.trim(),
                button_url: e.target.href || 'no-url'
            });
        });
    });

    console.log('DataMaglia website initialized successfully!');
});