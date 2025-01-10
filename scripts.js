// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Star field setup using Three.js
const initStarField = () => {
    const canvas = document.querySelector('.stars');
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    // Create stars
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.1,
        transparent: true
    });

    const starVertices = [];
    for(let i = 0; i < 15000; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = -Math.random() * 2000;
        starVertices.push(x, y, z);
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 1;

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        stars.rotation.z += 0.0002;
        renderer.render(scene, camera);
    };

    // Handle window resize
    const handleResize = () => {
        const { innerWidth, innerHeight } = window;
        renderer.setSize(innerWidth, innerHeight);
        camera.aspect = innerWidth / innerHeight;
        camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();
};

// Scroll animations
const initScrollAnimations = () => {
    // Hero section animation
    gsap.to('.hero-content', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 0.5,
        ease: 'power3.out'
    });

    // Sections fade in
    gsap.utils.toArray('.section').forEach(section => {
        gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top center+=100',
                toggleActions: 'play none none reverse'
            }
        });
    });
};

// Navigation handling
const initNavigation = () => {
    const nav = document.querySelector('.nav');
    let lastScroll = 0;

    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hide/show navbar on scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            nav.style.transform = 'translateY(0)';
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        lastScroll = currentScroll;
    });
};

// Project cards interaction
const initProjectCards = () => {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.background = `radial-gradient(circle at ${x}px ${y}px, 
                rgba(255,255,255,0.1), rgba(255,255,255,0.05))`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.background = 'rgba(255,255,255,0.05)';
        });
    });
};

// Form handling
const initContactForm = () => {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            console.log('Form submitted');
        });
    }
};

// Planet parallax effect
const initParallaxEffects = () => {
    const planet = document.querySelector('.planet');
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        gsap.to(planet, {
            x: 50 - (x * 100),
            y: -50 + (y * 100),
            duration: 1,
            ease: 'power2.out'
        });
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initStarField();
    initScrollAnimations();
    initNavigation();
    initProjectCards();
    initContactForm();
    initParallaxEffects();
});
