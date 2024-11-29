document.addEventListener("DOMContentLoaded", () => {
  const dropContainer = document.querySelector(".animated-drops");
  
  // Create animated drops
  function createDrops() {
    for (let i = 0; i < 100; i++) {
      const drop = document.createElement("div");
      drop.classList.add("drop");
      drop.style.width = `${Math.random() * 20 + 5}px`;
      drop.style.height = `${Math.random() * 40 + 10}px`;
      drop.style.left = `${Math.random() * 100}vw`;
      drop.style.animationDuration = `${Math.random() * 5 + 2}s`;
      drop.style.animationDelay = `${Math.random() * 3}s`;
      dropContainer.appendChild(drop);
    }
  }

  createDrops();

  // Fade-in sections on scroll
  const sections = document.querySelectorAll("section");
  
  function checkVisibility() {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.8) {
        section.classList.add("visible");
      }
    });
  }

  // Check visibility on scroll and initial load
  window.addEventListener("scroll", checkVisibility);
  checkVisibility();

  // Change drop colors on scroll
  window.addEventListener("scroll", () => {
    const drops = document.querySelectorAll(".drop");
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = window.scrollY / maxScroll;

    const interpolateColor = (start, end, factor) => {
      return Math.round(start + (end - start) * factor);
    };

    const startColor = { r: 135, g: 206, b: 235 };
    const endColor = { r: 255, g: 222, b: 89 };

    const newColor = {
      r: interpolateColor(startColor.r, endColor.r, scrollPercent),
      g: interpolateColor(startColor.g, endColor.g, scrollPercent),
      b: interpolateColor(startColor.b, endColor.b, scrollPercent),
    };

    const colorString = `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;

    drops.forEach((drop) => {
      drop.style.backgroundColor = colorString;
    });
  });
});
