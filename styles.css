/* Reset and basic styling */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #ffafbd, #ffc3a0);
    color: #333;
    overflow-x: hidden;
    scroll-behavior: smooth;
}

/* Cursor styling */
.cursor {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    background: rgba(0, 0, 0, 0.8);
    pointer-events: none;
    transition: transform 0.1s ease;
    z-index: 1000;
}

.cursor.active {
    transform: scale(2);
    background: rgba(0, 0, 0, 0.5);
}

/* Trailing effect for cursor */
.cursor::before {
    content: '';
    width: 40px;
    height: 40px;
    position: absolute;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    transform: translate(-50%, -50%);
    transition: transform 0.2s ease;
}

body:hover .cursor::before {
    transform: scale(1.5);
}

/* Header styling */
header {
    text-align: center;
    padding: 50px 0;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #ddd;
}

header h1 {
    font-size: 3em;
    margin-bottom: 10px;
}

nav a {
    margin: 0 15px;
    text-decoration: none;
    color: #333;
    font-size: 1.2em;
    transition: color 0.3s;
}

nav a:hover {
    color: #ff6f61;
}

/* Section styling */
section {
    padding: 100px 20px;
    text-align: center;
}

section h2 {
    font-size: 2.5em;
    margin-bottom: 20px;
}

section p {
    font-size: 1.2em;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
}

.drip {
    background: url('https://i.ibb.co/F5jQvWd/drip.png') no-repeat center center;
    background-size: cover;
    height: 50px;
    margin-top: 30px;
}

/* Footer styling */
footer {
    text-align: center;
    padding: 20px 0;
    background: #ff6f61;
    color: #fff;
    position: relative;
    z-index: 1;
    border-top: 1px solid #444;
}

/* Animation for smooth transitions and shapes */
section {
    animation: fadeInUp 1s ease forwards;
    transform: translateY(20px);
    opacity: 0;
}

@keyframes fadeInUp {
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Specific styling for alternating section backgrounds */
section:nth-of-type(even) {
    background: rgba(255, 255, 255, 0.6);
}

section:nth-of-type(odd) {
    background: rgba(255, 255, 255, 0.8);
}

/* Drippy effect */
section::after {
    content: '';
    display: block;
    width: 100%;
    height: 50px;
    background: url('https://i.ibb.co/F5jQvWd/drip.png') repeat-x;
    background-size: contain;
}
