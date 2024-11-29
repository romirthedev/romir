document.addEventListener("DOMContentLoaded", () => {
  const dropContainer = document.querySelector(".animated-drops");
  const funFacts = [
    "I am a Computer Science major at ASU.",
    "I am working on a motion capture system.",
    "I’ve raised nearly $500,000 for web app deployment.",
    "I’m a software-centered researcher at MIT.",
    "I love exploring new AI techniques."
  ];

  // Create animated drops (no changes)
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

  // Fun fact slots feature
  const slotButton = document.createElement('button');
  slotButton.classList.add('slot-button');
  slotButton.innerHTML = '🎰';  // Gambling slots icon
  document.body.appendChild(slotButton);

  slotButton.addEventListener('click', () => {
    const wheel = document.createElement('div');
    wheel.classList.add('slots-wheel');
    document.body.appendChild(wheel);
    
    const xButton = document.createElement('button');
    xButton.classList.add('close-button');
    xButton.innerHTML = 'X';
    wheel.appendChild(xButton);

    xButton.addEventListener('click', () => {
      wheel.remove();
    });

    // Spin the slots and show a random fact
    setTimeout(() => {
      const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
      const factDisplay = document.createElement('p');
      factDisplay.textContent = randomFact;
      wheel.appendChild(factDisplay);
      setTimeout(() => wheel.remove(), 3000);  // Remove after showing the fact
    }, 1500);
  });

  // Position slot button at top corner
  slotButton.style.position = 'fixed';
  slotButton.style.top = '20px';
  slotButton.style.right = '20px';
  slotButton.style.fontSize = '30px';

  // Styling for the slot wheel and close button
  const style = document.createElement('style');
  style.innerHTML = `
    .slots-wheel {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      border-radius: 10px;
      text-align: center;
    }
    .close-button {
      position: absolute;
      top: 5px;
      right: 5px;
      background: red;
      color: white;
      border: none;
      font-size: 16px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);
});
