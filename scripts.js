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

  // Fade-in effect for sections
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => {
    observer.observe(section);
  });

  document.addEventListener("mousemove", (e) => {
    const bubble = document.createElement("div");
    bubble.classList.add("particle");
    document.body.appendChild(bubble);
    bubble.style.left = `${e.pageX}px`;
    bubble.style.top = `${e.pageY}px`;
    bubble.style.animation = `particle-animation 1s ease-out`;

    setTimeout(() => bubble.remove(), 1000);
  });

  let loading = false;

  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !loading) {
      loading = true;
      loadMoreContent();
    }
  });

  function loadMoreContent() {
    const loader = document.createElement('div');
    loader.classList.add('loader');
    loader.innerHTML = `<p>Loading more content...</p>`;
    document.querySelector('main').appendChild(loader);

    // Simulate loading time
    setTimeout(() => {
      loader.remove();
      const newContent = document.createElement('div');
      newContent.classList.add('content-block');
      newContent.innerHTML = `<p>New content loaded.</p>`;
      document.querySelector('main').appendChild(newContent);

      loading = false;
    }, 2000);
  }

  // Example: Typing effect on header
  const header = document.querySelector('h1');
  header.classList.add('typing');
});
