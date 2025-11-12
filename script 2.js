// ===========================
// HERO SLIDER FUNCTIONALITY
// ===========================
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.querySelector('.slider-btn.prev');
        this.nextBtn = document.querySelector('.slider-btn.next');
        this.dotsContainer = document.querySelector('.slider-dots');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }
    
    init() {
        // Create dots
        this.createDots();
        
        // Event listeners
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Auto-play
        this.startAutoPlay();
        
        // Pause on hover
        const sliderContainer = document.querySelector('.slider-container');
        sliderContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
        sliderContainer.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Mouse parallax effect (desktop only)
        if (window.innerWidth > 768) {
            this.initParallax();
        }
    }
    
    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    }
    
    updateDots() {
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.currentSlide = index;
        this.slides[this.currentSlide].classList.add('active');
        this.updateDots();
    }
    
    nextSlide() {
        const next = (this.currentSlide + 1) % this.slides.length;
        this.goToSlide(next);
    }
    
    prevSlide() {
        const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prev);
    }
    
    startAutoPlay() {
        this.slideInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
    
    initParallax() {
        const heroSection = document.querySelector('.hero-slider');
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { offsetWidth, offsetHeight } = heroSection;
            
            const xPercent = (clientX / offsetWidth - 0.5) * 2;
            const yPercent = (clientY / offsetHeight - 0.5) * 2;
            
            const activeSlide = document.querySelector('.slide.active');
            if (activeSlide) {
                const rotateX = yPercent * -5;
                const rotateY = xPercent * 5;
                activeSlide.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1)`;
            }
        });
        
        heroSection.addEventListener('mouseleave', () => {
            const activeSlide = document.querySelector('.slide.active');
            if (activeSlide) {
                activeSlide.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            }
        });
    }
}

// ===========================
// CATEGORY FILTER FUNCTIONALITY
// ===========================
class CategoryFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-pill');
        this.newsCards = document.querySelectorAll('.news-card');
        
        this.init();
    }
    
    init() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => this.filterCards(button));
        });
    }
    
    filterCards(button) {
        // Update active state
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const category = button.dataset.category;
        
        // Filter cards with animation
        this.newsCards.forEach((card, index) => {
            const cardCategory = card.dataset.category;
            
            setTimeout(() => {
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out both';
                } else {
                    card.style.display = 'none';
                }
            }, index * 50);
        });
    }
}

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
class NavbarScroll {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// ===========================
// SMOOTH SCROLL FOR NAVIGATION
// ===========================
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offset = 80; // Navbar height
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===========================
// NEWSLETTER FORM FUNCTIONALITY
// ===========================
class NewsletterForm {
    constructor() {
        this.form = document.querySelector('.newsletter-form');
        this.successMessage = document.querySelector('.newsletter-success');
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const email = this.form.querySelector('input[type="email"]').value;
        
        // Simulate form submission
        if (this.validateEmail(email)) {
            this.form.style.display = 'none';
            this.successMessage.style.display = 'flex';
            
            // Reset after 5 seconds
            setTimeout(() => {
                this.form.style.display = 'flex';
                this.successMessage.style.display = 'none';
                this.form.reset();
            }, 5000);
        }
    }
    
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// ===========================
// MOBILE MENU TOGGLE
// ===========================
class MobileMenu {
    constructor() {
        this.menuBtn = document.querySelector('.mobile-menu-btn');
        this.navLinks = document.querySelector('.nav-links');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', () => this.toggleMenu());
        }
    }
    
    toggleMenu() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.navLinks.style.display = 'flex';
            this.navLinks.style.flexDirection = 'column';
            this.navLinks.style.position = 'absolute';
            this.navLinks.style.top = '100%';
            this.navLinks.style.left = '0';
            this.navLinks.style.right = '0';
            this.navLinks.style.background = 'rgba(17, 17, 17, 0.98)';
            this.navLinks.style.padding = '20px';
            this.navLinks.style.gap = '16px';
            this.menuBtn.classList.add('active');
        } else {
            this.navLinks.style.display = '';
            this.menuBtn.classList.remove('active');
        }
    }
}

// ===========================
// ANIMATED ELEMENTS ON SCROLL
// ===========================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('.news-card, .trending-card, .upcoming-card');
        this.init();
    }
    
    init() {
        // Create Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Set initial state and observe
        this.elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            observer.observe(element);
        });
    }
}

// ===========================
// 3D CARD TILT EFFECT
// ===========================
class CardTiltEffect {
    constructor() {
        this.cards = document.querySelectorAll('.news-card, .trending-card');
        this.init();
    }
    
    init() {
        // Only apply on desktop
        if (window.innerWidth > 768) {
            this.cards.forEach(card => {
                card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
                card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
            });
        }
    }
    
    handleMouseMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    }
    
    handleMouseLeave(card) {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    }
}

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================
class PerformanceOptimizer {
    constructor() {
        this.init();
    }
    
    init() {
        // Lazy load images
        this.lazyLoadImages();
        
        // Reduce animations on low-end devices
        this.checkPerformance();
    }
    
    lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    checkPerformance() {
        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            document.body.classList.add('reduced-motion');
        }
    }
}

// ===========================
// TRENDING CARDS ANIMATION
// ===========================
class TrendingAnimation {
    constructor() {
        this.trendingCards = document.querySelectorAll('.trending-card');
        this.init();
    }
    
    init() {
        this.trendingCards.forEach((card, index) => {
            // Add staggered entrance animation
            card.style.animationDelay = `${index * 0.15}s`;
            
            // Add floating animation
            if (window.innerWidth > 768) {
                setInterval(() => {
                    if (!card.matches(':hover')) {
                        card.style.animation = 'float 3s ease-in-out infinite';
                    }
                }, 100);
            }
        });
    }
}

// ===========================
// INITIALIZE ALL COMPONENTS
// ===========================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new HeroSlider();
    new CategoryFilter();
    new NavbarScroll();
    new SmoothScroll();
    new NewsletterForm();
    new MobileMenu();
    new ScrollAnimations();
    new CardTiltEffect();
    new PerformanceOptimizer();
    new TrendingAnimation();
    
    // Add loading complete class
    document.body.classList.add('loaded');
    
    console.log('🎌 AnimeVerse initialized successfully!');
});

// ===========================
// WINDOW RESIZE HANDLER
// ===========================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize components that need resize handling
        if (window.innerWidth > 768) {
            new CardTiltEffect();
        }
    }, 250);
});

// ===========================
// KEYBOARD NAVIGATION
// ===========================
document.addEventListener('keydown', (e) => {
    const slider = document.querySelector('.hero-slider');
    if (slider && document.activeElement.closest('.hero-slider')) {
        if (e.key === 'ArrowLeft') {
            document.querySelector('.slider-btn.prev').click();
        } else if (e.key === 'ArrowRight') {
            document.querySelector('.slider-btn.next').click();
        }
    }
});

// ===========================
// EASTER EGG: KONAMI CODE
// ===========================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 10000);
    
    console.log('🎮 Konami Code Activated! Easter Egg Unlocked!');
}
