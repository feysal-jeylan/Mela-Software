// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initHeaderScroll();
    initMobileMenu();
    initSmoothScroll();
    initAnimations();
    initCounters();
    initForm();
    initBackToTop();
    initTiltEffect();
    initParticles();
    initImageGallery();
});

// Loader
function initLoader() {
    const loader = document.querySelector('.loader-wrapper');
    
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 1500);
}

// Custom Cursor
function initCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.querySelector('.custom-cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .gallery-item, .info-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('active');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('active');
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('header');
    const progressBar = document.querySelector('.progress-bar');
    
    window.addEventListener('scroll', () => {
        // Header background change
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Progress bar
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
        
        // Active nav link
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// GSAP Animations
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Fade up animations
    gsap.utils.toArray('.animate-text').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });
    
    // Service cards stagger
    gsap.from('.service-card', {
        scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });
    
    // Gallery items
    gsap.from('.gallery-item', {
        scrollTrigger: {
            trigger: '.image-gallery',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'elastic.out(1, 0.5)'
    });
    
    // Contact info cards
    gsap.from('.info-card', {
        scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Floating animation for cards
    gsap.to('.floating-card', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.2
    });
}

// Counter Animation
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 200;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target;
            }
        };
        
        // Start counter when in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Form Handling
function initForm() {
    const contactForm = document.querySelector('.contact-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    const formInputs = document.querySelectorAll('.form-input');
    
    // Create alert container
    const alertContainer = document.createElement('div');
    alertContainer.className = 'form-alert';
    document.body.appendChild(alertContainer);
    
    // Show alert function
    const showAlert = (message, type = 'success') => {
        alertContainer.textContent = message;
        alertContainer.className = `form-alert ${type}-alert`;
        
        setTimeout(() => {
            alertContainer.className = 'form-alert';
        }, 5000);
    };
    
    // Email validation
    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };
    
    // Handle contact form submit
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: contactForm.querySelector('input[type="text"]').value.trim(),
                email: contactForm.querySelector('input[type="email"]').value.trim(),
                subject: contactForm.querySelectorAll('input[type="text"]')[1]?.value.trim() || '',
                message: contactForm.querySelector('textarea').value.trim()
            };
            
            // Validation
            if (!formData.name) {
                showAlert('Please enter your name', 'error');
                return;
            }
            
            if (!formData.email || !isValidEmail(formData.email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            if (formData.message.length < 10) {
                showAlert('Message must be at least 10 characters long', 'error');
                return;
            }
            
            // Simulate form submission
            try {
                showAlert('Sending message...', 'success');
                
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Reset form
                contactForm.reset();
                showAlert('Message sent successfully! We\'ll respond within 24 hours.', 'success');
                
                // Confetti effect
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                
            } catch (error) {
                showAlert('Failed to send message. Please try again later.', 'error');
            }
        });
    }
    
    // Handle newsletter form
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value.trim();
            
            if (!email || !isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            try {
                showAlert('Subscribing...', 'success');
                
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                newsletterForm.reset();
                showAlert('Successfully subscribed to newsletter!', 'success');
                
            } catch (error) {
                showAlert('Subscription failed. Please try again.', 'error');
            }
        });
    }
    
    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                input.classList.remove('invalid');
            } else {
                input.classList.add('invalid');
            }
        });
        
        input.addEventListener('blur', () => {
            if (!input.checkValidity()) {
                input.classList.add('invalid');
            }
        });
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Tilt Effect for Cards
function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Particles Effect
function initParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(255,107,0,${Math.random() * 0.5})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Image Gallery Modal
function initImageGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const src = img.getAttribute('src');
            
            // Create modal
            const modal = document.createElement('div');
            modal.className = 'gallery-modal';
            modal.style.position = 'fixed';
            modal.style.top = '0';
            modal.style.left = '0';
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.background = 'rgba(0,0,0,0.9)';
            modal.style.display = 'flex';
            modal.style.justifyContent = 'center';
            modal.style.alignItems = 'center';
            modal.style.zIndex = '10000';
            modal.style.cursor = 'pointer';
            
            const modalImg = document.createElement('img');
            modalImg.src = src;
            modalImg.style.maxWidth = '90%';
            modalImg.style.maxHeight = '90%';
            modalImg.style.objectFit = 'contain';
            modalImg.style.borderRadius = '10px';
            modalImg.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4)';
            
            modal.appendChild(modalImg);
            document.body.appendChild(modal);
            
            modal.addEventListener('click', () => {
                modal.remove();
            });
            
            // Close on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    modal.remove();
                }
            });
        });
    });
}

// Add confetti library if not present
if (typeof confetti === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1';
    document.head.appendChild(script);
}

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        
        if (navLinks && hamburger) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
});

// Prevent scroll when menu is open
document.body.addEventListener('menu-open', () => {
    document.body.style.overflow = 'hidden';
});

document.body.addEventListener('menu-close', () => {
    document.body.style.overflow = '';
});

// Add smooth scrolling for all browsers
if ('scrollBehavior' in document.documentElement.style === false) {
    import('smoothscroll-polyfill').then(module => {
        module.polyfill();
    });
}