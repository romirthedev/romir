// Performance monitoring and WebGL setup
class PerformanceMonitor {
    constructor() {
        this.fps = 0;
        this.frames = 0;
        this.lastTime = performance.now();
        this.stats = document.getElementById('perf-stats');
        this.memoryHistory = new Array(60).fill(0);
        this.fpsHistory = new Array(60).fill(0);
        
        // Performance metrics tracking
        this.observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'layout-shift') {
                    this.recordCLS(entry.value);
                }
            }
        });
        
        this.observer.observe({ entryTypes: ['layout-shift', 'largest-contentful-paint', 'first-input'] });
    }

    update() {
        const now = performance.now();
        this.frames++;

        if (now >= this.lastTime + 1000) {
            this.fps = (this.frames * 1000) / (now - this.lastTime);
            this.fpsHistory.push(this.fps);
            this.fpsHistory.shift();

            if (performance.memory) {
                this.memoryHistory.push(performance.memory.usedJSHeapSize / 1048576);
                this.memoryHistory.shift();
            }

            this.lastTime = now;
            this.frames = 0;
            this.updateDisplay();
        }
    }

    updateDisplay() {
        const avgFps = Math.round(this.fpsHistory.reduce((a, b) => a + b, 0) / this.fpsHistory.length);
        const memory = performance.memory ? 
            `${Math.round(this.memoryHistory[this.memoryHistory.length - 1])}MB` : 'N/A';
        
        this.stats.innerHTML = `
            <span>FPS: ${avgFps}</span>
            <span>Memory: ${memory}</span>
        `;
    }

    recordCLS(value) {
        console.log(`CLS: ${value}`);
    }
}

// WebGL Background Handler
class WebGLBackground {
    constructor() {
        this.canvas = document.getElementById('webgl-background');
        this.gl = this.canvas.getContext('webgl2');
        this.time = 0;
        this.resolution = new Float32Array(2);
        
        this.initialize();
    }

    initialize() {
        // Vertex shader program
        const vsSource = `#version 300 es
            in vec4 a_position;
            void main() {
                gl_Position = a_position;
            }
        `;

        // Fragment shader program
        const fsSource = `#version 300 es
            precision highp float;
            uniform vec2 u_resolution;
            uniform float u_time;
            out vec4 fragColor;

            vec3 palette(float t) {
                vec3 a = vec3(0.5, 0.5, 0.5);
                vec3 b = vec3(0.5, 0.5, 0.5);
                vec3 c = vec3(1.0, 1.0, 1.0);
                vec3 d = vec3(0.263, 0.416, 0.557);
                return a + b * cos(6.28318 * (c * t + d));
            }

            void main() {
                vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution) / min(u_resolution.x, u_resolution.y);
                vec2 uv0 = uv;
                vec3 finalColor = vec3(0.0);
                
                for(float i = 0.0; i < 4.0; i++) {
                    uv = fract(uv * 1.5) - 0.5;
                    float d = length(uv) * exp(-length(uv0));
                    vec3 col = palette(length(uv0) + i * 0.4 + u_time * 0.4);
                    d = sin(d * 8.0 + u_time) / 8.0;
                    d = abs(d);
                    d = pow(0.01 / d, 1.2);
                    finalColor += col * d;
                }
                
                fragColor = vec4(finalColor, 1.0);
            }
        `;

        // Initialize shaders
        const vertexShader = this.createShader(this.gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.createShader(this.gl.FRAGMENT_SHADER, fsSource);
        this.program = this.createProgram(vertexShader, fragmentShader);

        // Look up uniforms
        this.resolutionUniformLocation = this.gl.getUniformLocation(this.program, 'u_resolution');
        this.timeUniformLocation = this.gl.getUniformLocation(this.program, 'u_time');

        // Create buffer
        const positions = new Float32Array([
            -1, -1,
             1, -1,
            -1,  1,
            -1,  1,
             1, -1,
             1,  1,
        ]);

        const positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, positions, this.gl.STATIC_DRAW);

        // Create VAO
        const vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(vao);

        const positionAttributeLocation = this.gl.getAttribLocation(this.program, 'a_position');
        this.gl.enableVertexAttribArray(positionAttributeLocation);
        this.gl.vertexAttribPointer(positionAttributeLocation, 2, this.gl.FLOAT, false, 0, 0);

        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    createShader(type, source) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);
        return shader;
    }

    createProgram(vertexShader, fragmentShader) {
        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);
        return program;
    }

    resize() {
        const displayWidth = this.canvas.clientWidth * window.devicePixelRatio;
        const displayHeight = this.canvas.clientHeight * window.devicePixelRatio;

        if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
            this.canvas.width = displayWidth;
            this.canvas.height = displayHeight;
            this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        }

        this.resolution[0] = this.canvas.width;
        this.resolution[1] = this.canvas.height;
    }

    render(deltaTime) {
        this.time += deltaTime * 0.001;
        this.gl.useProgram(this.program);
        this.gl.uniform2fv(this.resolutionUniformLocation, this.resolution);
        this.gl.uniform1f(this.timeUniformLocation, this.time);
        this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
    }
}

// Smooth Scroll Handler
class SmoothScroll {
    constructor() {
        this.current = window.scrollY;
        this.target = window.scrollY;
        this.ease = 0.075;
        
        this.init();
    }

    init() {
        document.body.style.height = `${document.documentElement.scrollHeight}px`;
        
        requestAnimationFrame(() => this.animate());
        window.addEventListener('scroll', () => this.onScroll());
        window.addEventListener('resize', () => this.onResize());
    }

    onScroll() {
        this.target = window.scrollY;
    }

    onResize() {
        document.body.style.height = `${document.documentElement.scrollHeight}px`;
    }

    animate() {
        this.current = lerp(this.current, this.target, this.ease);
        this.current = Math.floor(this.current * 100) / 100;

        const transform = `translate3d(0, ${-this.current}px, 0)`;
        document.documentElement.style.transform = transform;

        requestAnimationFrame(() => this.animate());
    }
}

// Main Application
class App {
    constructor() {
        this.perfMonitor = new PerformanceMonitor();
        this.webglBackground = new WebGLBackground();
        this.smoothScroll = new SmoothScroll();
        
        this.init();
    }

    init() {
        this.initializeGlitchEffect();
        this.setupIntersectionObserver();
        this.setupEventListeners();
        
        requestAnimationFrame(() => this.animate());
    }

    initializeGlitchEffect() {
        const glitchText = document.querySelector('.glitch-text');
        if (!glitchText) return;

        let originalText = glitchText.textContent;
        glitchText.setAttribute('data-text', originalText);

        setInterval(() => {
            if (Math.random() > 0.95) {
                glitchText.style.setProperty('--glitch-offset', `${Math.random() * 10 - 5}px`);
                setTimeout(() => {
                    glitchText.style.setProperty('--glitch-offset', '0px');
                }, 50);
            }
        }, 100);
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    setupEventListeners() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    animate() {
        const now = performance.now();
        const deltaTime = now - (this.lastTime || now);
        this.lastTime = now;

        this.perfMonitor.update();
        this.webglBackground.render(deltaTime);

        requestAnimationFrame(() => this.animate());
    }
}

// Linear interpolation function
function lerp(start, end, amount) {
    return start + (end - start) * amount;
}

// Initialize the app when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
