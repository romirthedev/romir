document.addEventListener("DOMContentLoaded", () => {
  const dropContainer = document.querySelector(".animated-drops");
  const sections = document.querySelectorAll("section");

  // Function to create drops
  function createDrops() {
    for (let i = 0; i < 50; i++) {
      const drop = document.createElement("div");
      drop.classList.add("drop");
      drop.style.width = `${Math.random() * 20 + 5}px`;
      drop.style.height = drop.style.width;
      drop.style.left = `${Math.random() * 100}vw`;
      drop.style.top = `${Math.random() * 100}vh`;
      drop.style.animationDuration = `${Math.random() * 5 + 3}s`;
      drop.style.animationDelay = `${Math.random() * 5}s`;
      dropContainer.appendChild(drop);
    }
  }

  // Create drops on load
  createDrops();

  // Function to check section visibility
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => observer.observe(section));

  // Change drop color on scroll
  window.addEventListener("scroll", () => {
    const drops = document.querySelectorAll(".drop");
    const color = window.scrollY > 200 ? "#87ceeb" : "#ffde59";
    drops.forEach((drop) => {
      drop.style.backgroundColor = color;
    });
  });
});
