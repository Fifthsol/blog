// === NAV SCROLL BEHAVIOR ===
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
}

// === MOBILE MENU ===
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// === NEWSLETTER FORM ===
const form = document.querySelector('.newsletter-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button');
    if (!input.value) return;
    btn.textContent = 'Subscribed ✓';
    btn.style.background = '#4A7C59';
    input.value = '';
    input.placeholder = 'You\'re on the list!';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
      input.placeholder = 'Your email address';
    }, 4000);
  });
}

// === READING PROGRESS BAR ===
const progressBar = document.querySelector('.reading-progress');
if (progressBar) {
  const updateProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.transform = `scaleX(${Math.min(scrollTop / docHeight, 1)})`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
}

// === PARTICLES ===
const canvas = document.getElementById('particles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let dots = [];
  let mouse = { x: -999, y: -999 };
  const REPEL_RADIUS = 80;
  const REPEL_STRENGTH = 3;

  window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  const resize = () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };
  window.addEventListener('resize', resize);
  resize();

  const makeDot = () => {
    const dx = (Math.random() - 0.5) * 1.2;
    const dy = (Math.random() - 0.5) * 1.2;
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 4 + 1,
      dx, dy,
      baseDx: dx, baseDy: dy,
      angle: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      opacity: 0.7 + Math.random() * 0.3,
      flickerSpeed: 0.02 + Math.random() * 0.05,
    };
  };

  for (let i = 0; i < 180; i++) {
    dots.push(makeDot());
  }

  const respawnBtn = document.getElementById('respawn-btn');
  if (respawnBtn) {
    respawnBtn.addEventListener('click', () => {
      dots = [];
      for (let i = 0; i < 180; i++) dots.push(makeDot());
    });
  }

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(d => {
      ctx.save();
      ctx.translate(d.x, d.y);
      ctx.rotate(d.angle);
      d.angle += d.rotSpeed;
      d.opacity += (Math.random() - 0.5) * d.flickerSpeed;
      d.opacity = Math.max(0.2, Math.min(1, d.opacity));
      ctx.strokeStyle = `rgba(196, 135, 42, ${d.opacity})`;
      ctx.fillStyle = `rgba(255, 230, 0, ${d.opacity})`;
      ctx.lineWidth = 0.8;

      ctx.beginPath();
      ctx.arc(0, 0, d.r, 0, Math.PI * 2);
      ctx.fill();
      
      const rays = 5;
      for (let i = 0; i < rays; i++) {
        const angle = (i / rays) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(Math.cos(angle) * (d.r + 1.5), Math.sin(angle) * (d.r + 1.5));
        ctx.lineTo(Math.cos(angle) * (d.r + 5), Math.sin(angle) * (d.r + 5));
        ctx.stroke();
      }
      const mx = mouse.x - d.x;
      const my = mouse.y - d.y;
      const dist = Math.sqrt(mx * mx + my * my);
      if (dist < REPEL_RADIUS && dist > 0) {
        const force = (REPEL_RADIUS - dist) / REPEL_RADIUS * REPEL_STRENGTH;
        d.dx -= (mx / dist) * force;
        d.dy -= (my / dist) * force;
      }
      d.dx += (d.baseDx - d.dx) * 0.05;
      d.dy += (d.baseDy - d.dy) * 0.05;
      d.x += d.dx;
      d.y += d.dy;
      if (d.x < 0 || d.x > canvas.width) d.dx *= -1;
      if (d.y < 0 || d.y > canvas.height) d.dy *= -1;
      ctx.restore();
    });
    requestAnimationFrame(draw);
  };
  draw();
}

// === FADE-IN ON SCROLL ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
