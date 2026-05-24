// ============================================
// IVORIA — LUXURY BEAUTY SALON JAVASCRIPT
// Premium Hair, Beauty & Nail Experience
// Nairobi, Kenya
// ============================================

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
        document.body.style.touchAction = 'pan-y';
    }

    close() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        this.overlay?.classList.remove('active');
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
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

        window.addEventListener('scroll', () => this.updateNavbar(), { passive: true });
    }

    updateNavbar() {
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
// STICKY MOBILE BAR
// ============================================

class StickyMobileBar {
    constructor() {
        this.bar = document.getElementById('stickyMobileBar');
        this.hero = document.querySelector('.hero');
        this.isVisible = false;

        this.init();
    }

    init() {
        if (!this.bar || !this.hero) return;

        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    }

    handleScroll() {
        const heroBottom = this.hero.getBoundingClientRect().bottom;
        const shouldShow = heroBottom < 0;

        if (shouldShow && !this.isVisible) {
            this.bar.classList.add('active');
            this.isVisible = true;
        } else if (!shouldShow && this.isVisible) {
            this.bar.classList.remove('active');
            this.isVisible = false;
        }
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
        window.addEventListener('scroll', () => this.updateActiveLink(), { passive: true });
    }

    updateActiveLink() {
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
// NEWSLETTER FORM
// ============================================

class NewsletterForm {
    constructor() {
        this.form = document.querySelector('.newsletter-form');
        this.init();
    }

    init() {
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = this.form.querySelector('input');
            if (input.value) {
                input.value = '';
                alert('Thank you for subscribing! You\'ll hear from us soon.');
            }
        });
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    new MobileMenu();
    new NavbarScroll();
    new StickyMobileBar();
    new SmoothScroll();
    new ActiveNavLink();
    new ContactForm();
    new FormAnimations();
    new NewsletterForm();

    document.body.classList.add('loaded');
});
