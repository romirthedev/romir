// Custom cursor script
const cursor = document.querySelector('.cursor');

// Variables to store mouse position
let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;
const speed = 0.2; // Speed of the cursor trailing effect

// Function to move the cursor
document.addEventListener('mousemove', (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

// Add and remove class for click effect
document.addEventListener('mousedown', () => {
    cursor.classList.add('active');
});

document.addEventListener('mouseup', () => {
    cursor.classList.remove('active');
});

// Smooth trailing effect for cursor
function animateCursor() {
    posX += (mouseX - posX) * speed;
    posY += (mouseY - posY) * speed;
    cursor.style.transform = `translate(${posX - cursor.offsetWidth / 2}px, ${posY - cursor.offsetHeight / 2}px)`;
    requestAnimationFrame(animateCursor);
}

animateCursor();
