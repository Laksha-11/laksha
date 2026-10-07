// ===================================================================
// LAKSHA GOWDA PORTFOLIO - FUTURISTIC NEURAL & AI INTERACTIVITY
// Features: Neural Network Canvas, 3D Card Tilt, AI Command Terminal,
// Subtitle Typist, Persona Switcher & Autonomous Mascot Copilot
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {

  // -----------------------------------------------------------------
  // 1. Interactive Neural Network & Particle Canvas
  // -----------------------------------------------------------------
  const canvas = document.getElementById('neural-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let impulses = [];
    const particleCount = 55;
    const maxDistance = 140;

    const mouse = {
      x: null,
      y: null,
      radius: 170
    };

    function resizeCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 2 + 1.2;
        // Cyan, Teal, and Gold subtle neural node colors
        const colors = ['rgba(0, 242, 254, ', 'rgba(45, 212, 191, ', 'rgba(251, 191, 36, '];
        this.baseColor = colors[Math.floor(Math.random() * colors.length)];
        this.alpha = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce from walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse interaction: soft attraction & excitation
        if (mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            this.x += dx * force * 0.02;
            this.y += dy * force * 0.02;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.baseColor + this.alpha + ')';
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset
      }
    }

    // Synaptic Impulses (signals traveling along neural axons)
    class SynapticImpulse {
      constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
        this.progress = 0;
        this.speed = Math.random() * 0.02 + 0.015;
      }

      update() {
        this.progress += this.speed;
        return this.progress < 1;
      }

      draw() {
        const currentX = this.p1.x + (this.p2.x - this.p1.x) * this.progress;
        const currentY = this.p1.y + (this.p2.y - this.p1.y) * this.progress;

        ctx.beginPath();
        ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    function animateNeuralNetwork() {
      ctx.clearRect(0, 0, width, height);

      // Connect particles with synapses
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Random chance to fire a synaptic impulse
            if (Math.random() < 0.0006 && impulses.length < 15) {
              impulses.push(new SynapticImpulse(particles[i], particles[j]));
            }
          }
        }

        // Connect particles to mouse cursor if nearby
        if (mouse.x !== null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const lineAlpha = (1 - dist / mouse.radius) * 0.55;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(45, 212, 191, ${lineAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      // Update and draw synaptic impulses
      impulses = impulses.filter((imp) => {
        const isAlive = imp.update();
        if (isAlive) imp.draw();
        return isAlive;
      });

      requestAnimationFrame(animateNeuralNetwork);
    }

    animateNeuralNetwork();
  }

  // -----------------------------------------------------------------
  // 2. 3D Card Tilt with Specular Glare Tracking
  // -----------------------------------------------------------------
  const tiltCards = document.querySelectorAll('.tilt-card, .hologram-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation angles (-10deg to 10deg)
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });

  // -----------------------------------------------------------------
  // 3. Dynamic Subtitle Typing Effect
  // -----------------------------------------------------------------
  const typedTarget = document.getElementById('hero-typed-text');
  if (typedTarget) {
    const roles = [
      'Neural Architect & Full-Stack Engineer',
      'AI-Native Software Systems & Pipelines',
      'Distributed Services & High-Throughput APIs',
      'Building Latent Space & Modern Web Experiences'
    ];

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeDelay = 80;

    function typeLoop() {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        typedTarget.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
        typeDelay = 40;
      } else {
        typedTarget.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
        typeDelay = 90;
      }

      if (!isDeleting && charIdx === currentRole.length) {
        // Pause at full word
        typeDelay = 2200;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        typeDelay = 400;
      }

      setTimeout(typeLoop, typeDelay);
    }

    typeLoop();
  }

  // -----------------------------------------------------------------
  // 4. Interactive Persona Switcher (IRL Photo <-> Anime Cyber Avatar)
  // -----------------------------------------------------------------
  const avatarImg = document.getElementById('hero-profile-image');
  const personaToggleBtn = document.getElementById('persona-toggle-btn');
  const personaBadge = document.getElementById('persona-mode-tag');
  const hologramTag = document.getElementById('hologram-model-id');

  const personas = {
    anime: {
      src: 'anime-dev.jpg',
      alt: 'Laksha Gowda - Cyber Anime Persona',
      badge: 'MODE: CYBER ANIME ⚡',
      modelId: 'NEURAL_AVATAR // v4.2',
      btnText: 'Switch to IRL Portrait 📷'
    },
    irl: {
      src: 'pic.jpeg',
      alt: 'Laksha Gowda - Software Engineer Portrait (Real World)',
      badge: 'MODE: IRL REAL WORLD 📷',
      modelId: 'HUMAN_OPERATOR // v1.0',
      btnText: 'Switch to Anime Mode ⚡'
    }
  };

  let currentPersona = 'anime';

  function switchPersona(mode) {
    if (!avatarImg) return;

    avatarImg.style.opacity = '0';
    avatarImg.style.transform = 'scale(0.92) rotate(-4deg)';

    setTimeout(() => {
      avatarImg.src = personas[mode].src;
      avatarImg.alt = personas[mode].alt;
      if (personaToggleBtn) personaToggleBtn.textContent = personas[mode].btnText;
      if (personaBadge) personaBadge.textContent = personas[mode].badge;
      if (hologramTag) hologramTag.textContent = personas[mode].modelId;

      avatarImg.style.opacity = '1';
      avatarImg.style.transform = 'scale(1) rotate(0deg)';
    }, 220);
  }

  // Initialize
  switchPersona(currentPersona);

  if (personaToggleBtn) {
    personaToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentPersona = currentPersona === 'anime' ? 'irl' : 'anime';
      switchPersona(currentPersona);
    });
  }

  const hologramCard = document.querySelector('.hologram-card');
  if (hologramCard) {
    hologramCard.addEventListener('click', () => {
      currentPersona = currentPersona === 'anime' ? 'irl' : 'anime';
      switchPersona(currentPersona);
    });
  }

  // -----------------------------------------------------------------
  // 5. Hidden AI Command Terminal (HUD Easter Egg)
  // -----------------------------------------------------------------
  const terminalOverlay = document.getElementById('ai-terminal-overlay');
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');
  const terminalTriggerBtn = document.getElementById('btn-terminal-trigger');
  const terminalCloseBtn = document.getElementById('terminal-close-btn');

  function openTerminal() {
    if (terminalOverlay) {
      terminalOverlay.classList.add('is-active');
      setTimeout(() => terminalInput && terminalInput.focus(), 150);
    }
  }

  function closeTerminal() {
    if (terminalOverlay) {
      terminalOverlay.classList.remove('is-active');
    }
  }

  if (terminalTriggerBtn) terminalTriggerBtn.addEventListener('click', openTerminal);
  if (terminalCloseBtn) terminalCloseBtn.addEventListener('click', closeTerminal);

  // Keyboard shortcut: Press ` (backtick / tilde) or Esc
  window.addEventListener('keydown', (e) => {
    if (e.key === '`' || e.key === '~') {
      if (terminalOverlay && terminalOverlay.classList.contains('is-active')) {
        closeTerminal();
      } else {
        e.preventDefault();
        openTerminal();
      }
    } else if (e.key === 'Escape') {
      closeTerminal();
    }
  });

  // Terminal commands interpreter
  const commands = {
    help: `Available commands:
  <span class="accent-cyan">help</span>        : Displays this instruction manual
  <span class="accent-cyan">skills</span>      : Query active neural capabilities and toolchains
  <span class="accent-cyan">status</span>      : Inspect neural cluster health & metrics
  <span class="accent-cyan">weights</span>     : View model checkpoint telemetry & loss
  <span class="accent-cyan">attention</span>   : Render multi-head self-attention matrix
  <span class="accent-cyan">contact</span>     : Transmit quantum uplink coordinates
  <span class="accent-cyan">clear</span>       : Wipe terminal output buffer
  <span class="accent-cyan">exit</span>        : Close neural console window`,
    
    skills: `[QUERY: NEURAL WEIGHTS]
  ├─ <span class="accent-cyan">Languages</span>: JavaScript (ES6+), TypeScript, Python, HTML5, CSS3, SQL
  ├─ <span class="accent-gold">Frameworks</span>: React, Next.js, Node.js, Express, Tailwind CSS
  ├─ <span class="accent-violet">Databases</span>: PostgreSQL, MongoDB, Redis
  └─ <span class="accent-cyan">Engineering</span>: Docker, Git, CI/CD, REST APIs, Microservices, System Architecture`,

    status: `[SYSTEM DIAGNOSTICS]
  ● NEURAL CORE      : OPTIMAL (100% ONLINE)
  ● MEMORY BANDWIDTH : 1.2 TB/s HBM3
  ● ACTIVE SESSIONS  : 1 (YOU)
  ● LATENT DIM       : 4096-D
  ● TEMPERATURE      : 0.7 (BALANCED CREATIVE LOGIC)`,

    weights: `[GRADIENT DECENT LOGS]
  Epoch 01/10 | Loss: 0.0421 | Accuracy: 98.4%
  Epoch 02/10 | Loss: 0.0210 | Accuracy: 99.1%
  Epoch 03/10 | Loss: 0.0078 | Accuracy: 99.8% -> Converged.`,

    attention: `[MULTI-HEAD ATTENTION HEATMAP]
  Head 0: [ 0.92  0.03  0.01  0.04 ] (Focus: Full-Stack)
  Head 1: [ 0.05  0.88  0.04  0.03 ] (Focus: Problem Solving)
  Head 2: [ 0.02  0.01  0.95  0.02 ] (Focus: Creative Design)
  Head 3: [ 0.01  0.02  0.03  0.94 ] (Focus: Speed & Clean Code)`,

    contact: `[QUANTUM UPLINK DESTINATIONS]
  GitHub   : <a href="https://github.com/Laksha-11-github" target="_blank" class="accent-cyan">github.com/Laksha-11-github</a>
  LinkedIn : <a href="https://www.linkedin.com/in/laksha-gowda-2b711b440" target="_blank" class="accent-cyan">linkedin.com/in/laksha-gowda-2b711b440</a>`,

    matrix: `Initializing neural decoding stream...
  01001100 01100001 01101011 01110011 01101000 01100001 = "LAKSHA"
  Wake up, engineer. The matrix has you.`
  };

  if (terminalInput && terminalOutput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const inputVal = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        if (!inputVal) return;

        // Print input line
        const cmdLog = document.createElement('div');
        cmdLog.className = 'prompt-line';
        cmdLog.innerHTML = `guest@laksha-neural-core:~$ ${inputVal}`;
        terminalOutput.appendChild(cmdLog);

        if (inputVal === 'clear') {
          terminalOutput.innerHTML = '';
          return;
        }

        if (inputVal === 'exit' || inputVal === 'quit') {
          closeTerminal();
          return;
        }

        const responseDiv = document.createElement('div');
        responseDiv.className = 'sys-response';

        if (commands[inputVal]) {
          responseDiv.innerHTML = commands[inputVal];
        } else {
          responseDiv.innerHTML = `command not recognized: '${inputVal}'. Type <span class="accent-cyan">help</span> for assistance.`;
        }

        terminalOutput.appendChild(responseDiv);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
      }
    });
  }

  // -----------------------------------------------------------------
  // 6. Interactive Autonomous AI Mascot Copilot
  // -----------------------------------------------------------------
  const copilotWidget = document.getElementById('chibi-copilot-widget');
  const copilotText = document.getElementById('copilot-bubble-text');

  const copilotQuotes = [
    "Neural cluster synced. Ready to build something remarkable! 🌌",
    "Softmax confidence: 0.999 hireable! ✨",
    "Attention heads focused on: Scalable Clean Architecture 🧠",
    "Zero bugs found in current latent space. All green! ✅",
    "Adjusting temperature parameter... Creative mode engaged! 🎨",
    "Tip: Press `~` to trigger the hidden Neural Console! 💻",
    "Fueled by caffeine & optimized algorithms! ☕⚡",
    "Git commit -m 'Transcending reality into production' 🚀"
  ];

  let quoteIdx = 0;

  if (copilotWidget && copilotText) {
    copilotWidget.addEventListener('click', () => {
      quoteIdx = (quoteIdx + 1) % copilotQuotes.length;
      copilotText.style.opacity = '0';
      copilotText.style.transform = 'translateY(4px)';

      setTimeout(() => {
        copilotText.textContent = copilotQuotes[quoteIdx];
        copilotText.style.opacity = '1';
        copilotText.style.transform = 'translateY(0)';
      }, 150);
    });

    setInterval(() => {
      quoteIdx = (quoteIdx + 1) % copilotQuotes.length;
      copilotText.textContent = copilotQuotes[quoteIdx];
    }, 9000);
  }

});
