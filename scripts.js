// Cursor glow effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('cursor-glow');
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Typing effect for About section
const aboutText = "I am a passionate leader and innovator with experience spanning technology, research, and business strategy. My work at MIT focused on breakthrough technologies that are shaping our future, while my role as CEO allows me to drive meaningful change in the industry.";
let typeIdx = 0;

function typeWriter() {
    if (typeIdx < aboutText.length) {
        document.getElementById("typing-text").innerHTML += aboutText.charAt(typeIdx);
        typeIdx++;
        setTimeout(typeWriter, 50);
    }
}

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.id === 'about') {
                typeWriter();
            }
            entry.target.classList.add('fade-in');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Timeline interactions
document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('click', () => {
        const details = item.querySelector('.details');
        const wasExpanded = item.classList.contains('expanded');
        
        // Reset all items
        document.querySelectorAll('.timeline-item').forEach(i => {
            i.classList.remove('expanded');
            i.querySelector('.details').style.display = 'none';
        });

        // Toggle clicked item
        if (!wasExpanded) {
            item.classList.add('expanded');
            details.style.display = 'block';
        }
    });
});

// Particle.js configurations
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#a855f7' },
        shape: { type: 'circle' },
        opacity: {
            value: 0.5,
            random: true
        },
        size: {
            value: 3,
            random: true
        },
        move: {
            enable: true,
            speed: 2
        },
        line_linked: {
            enable: true,
            color: '#a855f7',
            opacity: 0.2
        }
    }
});

particlesJS('particles-js-2', {
    // Similar configuration with different values
    particles: {
        number: { value: 40 },
        color: { value: '#d8b4fe' },
        shape: { type: 'circle' },
        opacity: {
            value: 0.3,
            random: true
        },
        size: {
            value: 4,
            random: true
        },
        move: {
            enable: true,
            speed: 1.5
        },
        line_linked: {
            enable: false
        }
    }
});

particlesJS('particles-js-3', {
    particles: {
        number: { value: 100 },
        color: { value: '#a855f7' },
        shape: { type: 'circle' },
        opacity: {
            value: 0.4,
            random: true
        },
        size: {
            value: 2,
            random: true
        },
        move: {
            enable: true,
            speed: 1
        },
        line_linked: {
            enable: true,
            color: '#d8b4fe',
            opacity: 0.3,
            width: 1
        }
    }
});

// Möbius strip using Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('mobius-container').appendChild(renderer.domElement);

// Create two Möbius strips
function createMobiusStrip(radius, tubeRadius, color) {
    const geometry = new THREE.ParametricGeometry((u, v, target) => {
        u *= Math.PI * 2;
        v *= 2;
        
        const x = (radius + tubeRadius * Math.cos(v)) * Math.cos(u);
        const y = (radius + tubeRadius * Math.cos(v)) * Math.sin(u);
        const z = tubeRadius * Math.sin(v);
        
        target.set(x, y, z);
    }, 100, 20);

    const material = new THREE.MeshPhongMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
    });

    return new THREE.Mesh(geometry, material);
}

const mobius1 = createMobiusStrip(3, 0.5, 0xa855f7);
const mobius2 = createMobiusStrip(2.5, 0.3, 0xd8b4fe);

scene.add(mobius1);
scene.add(mobius2);

// Add lights
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

camera.position.z = 10;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    mobius1.rotation.x += 0.01;
    mobius1.rotation.y += 0.01;
    
    mobius2.rotation.x -= 0.01;
    mobius2.rotation.y -= 0.01;
    
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
