// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
    alpha: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Create multiple particle systems with different behaviors
class ParticleSystem {
    constructor(count, color, size, speed, behavior) {
        this.geometry = new THREE.BufferGeometry();
        this.positions = new Float32Array(count * 3);
        this.velocities = new Float32Array(count * 3);
        this.speed = speed;
        this.behavior = behavior;

        for(let i = 0; i < count * 3; i += 3) {
            this.positions[i] = (Math.random() - 0.5) * 100;
            this.positions[i + 1] = (Math.random() - 0.5) * 100;
            this.positions[i + 2] = (Math.random() - 0.5) * 100;

            this.velocities[i] = (Math.random() - 0.5) * speed;
            this.velocities[i + 1] = (Math.random() - 0.5) * speed;
            this.velocities[i + 2] = (Math.random() - 0.5) * speed;
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));
        
        this.material = new THREE.PointsMaterial({
            size,
            color,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.points = new THREE.Points(this.geometry, this.material);
        scene.add(this.points);
    }

    update(time) {
        const positions = this.geometry.attributes.position.array;

        for(let i = 0; i < positions.length; i += 3) {
            switch(this.behavior) {
                case 'spiral':
                    positions[i] += Math.sin(time * 0.001 + i) * this.speed * 0.1;
                    positions[i + 1] += Math.cos(time * 0.001 + i) * this.speed * 0.1;
                    positions[i + 2] += this.velocities[i + 2];
                    break;
                case 'wave':
                    positions[i] += this.velocities[i];
                    positions[i + 1] += Math.sin(time * 0.001 + positions[i] * 0.1) * this.speed * 0.1;
                    positions[i + 2] += this.velocities[i + 2];
                    break;
                case 'vortex':
                    const angle = Math.atan2(positions[i], positions[i + 2]);
                    const radius = Math.sqrt(positions[i] ** 2 + positions[i + 2] ** 2);
                    positions[i] = Math.cos(angle + time * 0.001) * radius;
                    positions[i + 2] = Math.sin(angle + time * 0.001) * radius;
                    positions[i + 1] += this.velocities[i + 1];
                    break;
            }

            // Reset particles that go out of bounds
            if(Math.abs(positions[i]) > 50) positions[i] *= -0.9;
            if(Math.abs(positions[i + 1]) > 50) positions[i + 1] *= -0.9;
            if(Math.abs(positions[i + 2]) > 50) positions[i + 2] *= -0.9;
        }

        this.geometry.attributes.position.needsUpdate = true;
    }
}

// Create different particle systems
const particleSystems = [
    new ParticleSystem(1000, 0x6C63FF, 0.05, 0.1, 'spiral'),
    new ParticleSystem(800, 0x4CAF50, 0.03, 0.15, 'wave'),
    new ParticleSystem(600, 0xFF6B6B, 0.04, 0.12, 'vortex')
];

// Create floating 3D objects
const createFloatingObject = (geometry, material, position) => {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(...position);
    scene.add(mesh);
    return mesh;
};

const objects = [
    createFloatingObject(
        new THREE.TorusGeometry(3, 1, 16, 100),
        new THREE.MeshStandardMaterial({ color: 0x6C63FF, wireframe: true }),
        [10, 5, -5]
    ),
    createFloatingObject(
        new THREE.IcosahedronGeometry(2),
        new THREE.MeshStandardMaterial({ color: 0x4CAF50, wireframe: true }),
        [-8, -4, -10]
    ),
    createFloatingObject(
        new THREE.OctahedronGeometry(2),
        new THREE.MeshStandardMaterial({ color: 0xFF6B6B, wireframe: true }),
        [6, -8, -15]
    )
];

// Add ambient and point lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLights = [
    new THREE.PointLight(0x6C63FF, 1),
    new THREE.PointLight(0x4CAF50, 1),
    new THREE.PointLight(0xFF6B6B, 1)
];

pointLights[0].position.set(5, 5, 5);
pointLights[1].position.set(-5, -5, 5);
pointLights[2].position.set(0, 0, -5);

pointLights.forEach(light => scene.add(light));

// Custom cursor with trail effect
const cursor = document.getElementById('cursor');
const cursorBlur = document.getElementById('cursor-blur');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Scroll-based scene changes
let currentSection = '';
const updateBackground = () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if(rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
            if(currentSection !== section.id) {
                currentSection = section.id;
                updateSceneForSection(currentSection);
            }
        }
    });
};

const updateSceneForSection = (sectionId) => {
    const transitions = {
        hero: () => {
            camera.position.z = 30;
            scene.background = new THREE.Color(0x1a1a1a);
        },
        about: () => {
            camera.position.z = 25;
            scene.background = new THREE.Color(0x2a1a4a);
        },
        experience: () => {
            camera.position.z = 20;
            scene.background = new THREE.Color(0x1a2a4a);
        },
        unique: () => {
            camera.position.z = 15;
            scene.background = new THREE.Color(0x4a1a2a);
        },
        contact: () => {
            camera.position.z = 10;
            scene.background = new THREE.Color(0x2a4a1a);
        }
    };

    if(transitions[sectionId]) {
        gsap.to(camera.position, {
            ...transitions[sectionId](),
            duration: 1.5,
            ease: 'power2.inOut'
        });
    }
};

// Animation loop
const animate = (time) => {
    requestAnimationFrame(animate);

    // Update particle systems
    particleSystems.forEach(system => system.update(time));

    // Animate floating objects
    objects.forEach((obj, i) => {
        obj.rotation.x += 0.001 + i * 0.001;
        obj.rotation.y += 0.002 + i * 0.001;
        obj.position.y += Math.sin(time * 0.001 + i) * 0.02;
    });

    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
    cursorBlur.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;

    // Update lights
    pointLights.forEach((light, i) => {
        light.position.x = Math.sin(time * 0.001 + i * Math.PI * 2 / 3) * 10;
        light.position.y = Math.cos(time * 0.001 + i * Math.PI * 2 / 3) * 10;
    });

    renderer.render(scene, camera);
};

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Handle scroll events
window.addEventListener('scroll', updateBackground);

// Initialize animations
gsap.registerPlugin(ScrollTrigger);

// Animate sections on scroll
gsap.utils.toArray('section').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: 'top center+=200',
            once: true
        }
    });
});

// Start animation loop
animate(0);
