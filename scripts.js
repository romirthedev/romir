document.addEventListener("DOMContentLoaded", () => {
  const dropContainer = document.querySelector(".animated-drops");

  function createDrops() {
    for (let i = 0; i < 100; i++) {
      const drop = document.createElement("div");
      drop.classList.add("drop");
      drop.style.width = `${Math.random() * 20 + 5}px`; // Random width
      drop.style.height = `${Math.random() * 40 + 10}px`; // Random height
      drop.style.left = `${Math.random() * 100}vw`; // Random horizontal position
      drop.style.animationDuration = `${Math.random() * 5 + 2}s`; // Random fall duration
      drop.style.animationDelay = `${Math.random() * 3}s`; // Random staggered delay
      dropContainer.appendChild(drop);
    }
  }

  createDrops();

  // Function to update drop colors as the user scrolls
  window.addEventListener("scroll", () => {
    const drops = document.querySelectorAll(".drop");
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = window.scrollY / maxScroll; // Scroll progress (0 to 1)

    // Calculate interpolated color between light blue (#87CEEB) and yellow (#FFDE59)
    const interpolateColor = (start, end, factor) => {
      return Math.round(start + (end - start) * factor);
    };

    const startColor = { r: 135, g: 206, b: 235 }; // Light Blue
    const endColor = { r: 255, g: 222, b: 89 }; // Yellow

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
