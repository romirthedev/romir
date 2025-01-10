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
const createParticles = () => {
    const particleCount = 30;
    const container = document.querySelector('.hero');
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(particle);
    }
};

const createOrbitalElements = () => {
    const orbitalCount = 8;
    const container = document.querySelector('.hero');
    
    for (let i = 0; i < orbitalCount; i++) {
        const orbital = document.createElement('div');
        orbital.className = 'orbital-element';
        orbital.style.left = '50%';
        orbital.style.top = '50%';
        orbital.style.animationDelay = `${(i / orbitalCount) * 8}s`;
        container.appendChild(orbital);
    }
};

const createInteractiveBackground = () => {
    const bg = document.createElement('div');
    bg.className = 'interactive-bg';
    document.body.appendChild(bg);

    const glowCount = 3;
    for (let i = 0; i < glowCount; i++) {
        const glow = document.createElement('div');
        glow.className = 'glow';
        bg.appendChild(glow);
    }

    document.addEventListener('mousemove', (e) => {
        const glows = document.querySelectorAll('.glow');
        glows.forEach((glow, index) => {
            const delay = index * 100;
            setTimeout(() => {
                glow.style.left = `${e.clientX - 75}px`;
                glow.style.top = `${e.clientY - 75}px`;
            }, delay);
        });
    });
};

// Scroll animations
const initScrollAnimations = () => {
    // Hero section animation
    gsap.to('.hero-content', {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });

    // Animated section entries
    gsap.utils.toArray('.section').forEach(section => {
        gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top bottom-=100',
                end: 'bottom center',
                scrub: 1,
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Animate skill tags
    gsap.utils.toArray('.skill-tag').forEach((tag, i) => {
        gsap.from(tag, {
            scale: 0,
            opacity: 0,
            duration: 0.5,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: '.skills',
                start: 'top center+=100'
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
const createParticles = () => {
    const particleCount = 30;
    const container = document.querySelector('.hero');
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(particle);
    }
};

const createOrbitalElements = () => {
    const orbitalCount = 8;
    const container = document.querySelector('.hero');
    
    for (let i = 0; i < orbitalCount; i++) {
        const orbital = document.createElement('div');
        orbital.className = 'orbital-element';
        orbital.style.left = '50%';
        orbital.style.top = '50%';
        orbital.style.animationDelay = `${(i / orbitalCount) * 8}s`;
        container.appendChild(orbital);
    }
};

const createInteractiveBackground = () => {
    const bg = document.createElement('div');
    bg.className = 'interactive-bg';
    document.body.appendChild(bg);

    const glowCount = 3;
    for (let i = 0; i < glowCount; i++) {
        const glow = document.createElement('div');
        glow.className = 'glow';
        bg.appendChild(glow);
    }

    document.addEventListener('mousemove', (e) => {
        const glows = document.querySelectorAll('.glow');
        glows.forEach((glow, index) => {
            const delay = index * 100;
            setTimeout(() => {
                glow.style.left = `${e.clientX - 75}px`;
                glow.style.top = `${e.clientY - 75}px`;
            }, delay);
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
const addCursorTrailer = () => {
    const trailer = document.createElement('div');
    trailer.className = 'cursor-trailer';
    document.body.appendChild(trailer);

    window.addEventListener('mousemove', (e) => {
        gsap.to(trailer, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
};
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    createOrbitalElements();
    createInteractiveBackground();
    initStarField();
    initScrollAnimations();
    initNavigation();
    initProjectCards();
    initContactForm();
    initParallaxEffects();
});
