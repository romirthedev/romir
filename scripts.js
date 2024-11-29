// Custom cursor script
const cursor = document.querySelector('.cursor');

// Function to move the cursor
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});

// Add and remove class for click effect
document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

// Smooth trailing effect for cursor
let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;
const speed = 0.1; // Speed of the cursor trailing effect

function animateCursor() {
    posX += (mouseX - posX) * speed;
    posY += (mouseY - posY) * speed;
    cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
    requestAnimationFrame(animateCursor);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

animateCursor();

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);

        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer to animate section headers
const sections = document.querySelectorAll('section');
const options = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Form validation for contact page
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = contactForm.querySelector('input[name="name"]');
            const email = contactForm.querySelector('input[name="email"]');
            const message = contactForm.querySelector('textarea[name="message"]');

            let valid = true;

            if (name.value.trim() === '') {
                name.classList.add('invalid');
                valid = false;
            } else {
                name.classList.remove('invalid');
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                email.classList.add('invalid');
                valid = false;
            } else {
                email.classList.remove('invalid');
            }

            if (message.value.trim() === '') {
                message.classList.add('invalid');
                valid = false;
            } else {
                message.classList.remove('invalid');
            }

            if (valid) {
                contactForm.submit();
            }
        });
    }
});
