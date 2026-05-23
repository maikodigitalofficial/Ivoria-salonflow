// ============================================
// IVORIA — LUXURY BEAUTY SALON JAVASCRIPT
// Premium Hair, Beauty & Nail Experience
// Nairobi, Kenya
// ============================================

// ============================================
// SCROLL REVEAL
// ============================================

class ScrollReveal {
    constructor(options = {}) {
        this.options = {
            threshold: options.threshold || 0.1,
            rootMargin: options.rootMargin || '0px 0px -60px 0px',
            once: options.once !== false
        };

        this.observer = new IntersectionObserver(
            this.handleIntersect.bind(this),
            {
                threshold: this.options.threshold,
                rootMargin: this.options.rootMargin
            }
        );

        this.init();
    }

    init() {
        const revealElements = document.querySelectorAll('.reveal');
        revealElements.forEach(el => {
            if (!el.dataset.originalTransition) {
                el.dataset.originalTransition = el.style.transition || '';
            }
            this.observer.observe(el);
        });
    }

    handleIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                if (this.options.once) {
                    this.observer.unobserve(entry.target);
                }
            } else if (!this.options.once) {
                entry.target.classList.remove('revealed');
            }
        });
    }

    refresh() {
        this.init();
    }

    destroy() {
        this.observer.disconnect();
    }
}

// ============================================
// MOBILE MENU
// ============================================

class MobileMenu {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('navMenu');
        this.overlay = document.getElementById('mobileOverlay');
        this.navLinks = this.navMenu?.querySelectorAll('a');

        this.init();
    }

    init() {
        if (!this.hamburger || !this.navMenu) return;

        this.hamburger.addEventListener('click', () => this.toggle());
        this.overlay?.addEventListener('click', () => this.close());

        this.navLinks?.forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    }

    toggle() {
        const isOpen = this.navMenu.classList.contains('active');
        isOpen ? this.close() : this.open();
    }

    open() {
        this.hamburger.classList.add('active');
        this.navMenu.classList.add('active');
        this.overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.overlay?.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

class NavbarScroll {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.lastScroll = 0;

        this.init();
    }

    init() {
        if (!this.navbar) return;

        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }

        this.lastScroll = currentScroll;
    }
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================

class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;

                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 90;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================

class ActiveNavLink {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-menu a');

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const scrollPosition = window.pageYOffset + 180;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ============================================
// CONTACT FORM
// ============================================

class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');

        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        const phoneInput = document.getElementById('phone');
        phoneInput?.addEventListener('input', (e) => this.formatPhone(e));
    }

    formatPhone(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.startsWith('0')) {
            value = '254' + value.slice(1);
        }
        if (value.startsWith('7') && value.length === 9) {
            value = '254' + value;
        }
        e.target.value = value;
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.submitBtn) return;

        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;

        try {
            await this.simulateSubmit();

            this.submitBtn.classList.remove('loading');
            this.submitBtn.classList.add('success');

            this.form.reset();

            setTimeout(() => {
                this.submitBtn.classList.remove('success');
                this.submitBtn.disabled = false;
            }, 3500);

        } catch (error) {
            console.error('Form submission error:', error);
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
            alert('Something went wrong. Please try again or WhatsApp us directly.');
        }
    }

    simulateSubmit() {
        return new Promise(resolve => setTimeout(resolve, 1800));
    }
}

// ============================================
// SHOW MORE PRODUCTS
// ============================================

class ShopShowMore {
    constructor() {
        this.btn = document.getElementById('showMoreBtn');
        this.hiddenProducts = document.getElementById('hiddenProducts');

        this.init();
    }

    init() {
        if (!this.btn || !this.hiddenProducts) return;

        this.btn.addEventListener('click', () => this.toggle());
    }

    toggle() {
        const isShowing = this.hiddenProducts.classList.contains('show');

        if (isShowing) {
            this.hiddenProducts.classList.remove('show');
            this.btn.classList.remove('active');
            this.btn.querySelector('.show-more-text').textContent = 'Show More Products';

            document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            this.hiddenProducts.classList.add('show');
            this.btn.classList.add('active');
            this.btn.querySelector('.show-more-text').textContent = 'Show Less';

            setTimeout(() => {
                const newCards = this.hiddenProducts.querySelectorAll('.product-card');
                newCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }, 50);
        }
    }
}

// ============================================
// PARALLAX EFFECT
// ============================================

class ParallaxEffect {
    constructor() {
        this.heroImage = document.querySelector('.hero-image img');
        this.heroBg = document.querySelector('.hero-bg-pattern');

        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        const scrolled = window.pageYOffset;

        if (this.heroImage && scrolled < 800) {
            this.heroImage.style.transform = `translateY(${scrolled * 0.12}px) scale(1.05)`;
        }

        if (this.heroBg && scrolled < 800) {
            this.heroBg.style.transform = `translateY(${scrolled * 0.06}px)`;
        }
    }
}

// ============================================
// BACK TO TOP
// ============================================

class BackToTop {
    constructor() {
        this.button = document.querySelector('.back-to-top');

        this.init();
    }

    init() {
        if (!this.button) return;

        this.button.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}

// ============================================
// LAZY LOADING
// ============================================

class LazyLoader {
    constructor() {
        this.images = document.querySelectorAll('img[loading="lazy"]');

        this.init();
    }

    init() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            this.images.forEach(img => imageObserver.observe(img));
        }
    }
}

// ============================================
// FORM INPUT ANIMATIONS
// ============================================

class FormAnimations {
    constructor() {
        this.inputs = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
        this.init();
    }

    init() {
        this.inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

// ============================================
// GALLERY LIGHTBOX
// ============================================

class GalleryLightbox {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.init();
    }

    init() {
        this.galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    this.openLightbox(img.src, img.alt);
                }
            });
        });
    }

    openLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <img src="${src}" alt="${alt}">
                <button class="lightbox-close"><i class="fas fa-times"></i></button>
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            lightbox.remove();
            document.body.style.overflow = '';
        });

        lightbox.querySelector('.lightbox-overlay').addEventListener('click', () => {
            lightbox.remove();
            document.body.style.overflow = '';
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    window.scrollReveal = new ScrollReveal({
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px',
        once: true
    });

    new MobileMenu();
    new NavbarScroll();
    new SmoothScroll();
    new ActiveNavLink();
    new ContactForm();
    new ShopShowMore();
    new ParallaxEffect();
    new BackToTop();
    new LazyLoader();
    new FormAnimations();
    new GalleryLightbox();

    document.body.classList.add('loaded');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
