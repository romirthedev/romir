document.addEventListener("DOMContentLoaded", () => {
  const dropContainer = document.querySelector(".animated-drops");

  // Create drops
  for (let i = 0; i < 50; i++) {
    const drop = document.createElement("div");
    drop.className = "drop";
    drop.style.width = `${Math.random() * 15 + 5}px`;
    drop.style.height = drop.style.width;
    drop.style.left = `${Math.random() * 100}vw`;
    drop.style.top = `${Math.random() * 100}vh`;
    drop.style.animationDuration = `${Math.random() * 4 + 3}s`;
    drop.style.animationDelay = `${Math.random() * 3}s`;
    dropContainer.appendChild(drop);
  }

  // Change drop colors on scroll
  window.addEventListener("scroll", () => {
    const drops = document.querySelectorAll(".drop");
    drops.forEach((drop) => {
      drop.style.backgroundColor =
        window.scrollY > 200 ? "#87ceeb" : "#ffde59";
    });
  });
});
