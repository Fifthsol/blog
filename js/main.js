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
  let blackHoleMode = false;
  const REPEL_RADIUS = 80;
  const REPEL_STRENGTH = 3;
  const ATTRACT_RADIUS = 260;
  const ATTRACT_STRENGTH = 12;
  const MAX_DOTS = 180;

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

  for (let i = 0; i < MAX_DOTS; i++) {
    dots.push(makeDot());
  }

  setInterval(() => {
    if (dots.length < MAX_DOTS) {
      const count = Math.min(3, MAX_DOTS - dots.length);
      for (let i = 0; i < count; i++) dots.push(makeDot());
    }
  }, 800);

  const bgDots = [];
  for (let i = 0; i < 280; i++) {
    bgDots.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.2,
      dx: (Math.random() - 0.5) * 0.18,
      dy: (Math.random() - 0.5) * 0.18,
      opacity: 0.15 + Math.random() * 0.65,
      shimmerSpeed: 0.005 + Math.random() * 0.018,
      shimmerDir: Math.random() > 0.5 ? 1 : -1,
    });
  }

  const respawnBtn = document.getElementById('respawn-btn');
  if (respawnBtn) {
    respawnBtn.addEventListener('click', e => {
      e.stopPropagation();
      dots = [];
      for (let i = 0; i < 180; i++) dots.push(makeDot());
    });
  }

  const supernovaHint = document.getElementById('supernova-hint');

  const blackholeBtn = document.getElementById('blackhole-btn');
  if (blackholeBtn) {
    blackholeBtn.addEventListener('click', e => {
      e.stopPropagation();
      blackHoleMode = !blackHoleMode;
      blackholeBtn.classList.toggle('active', blackHoleMode);
      document.body.classList.toggle('blackhole-cursor', blackHoleMode);
      if (supernovaHint) supernovaHint.classList.toggle('visible', blackHoleMode);
    });
  }


  const hero = canvas.closest('.hero');

  if (hero) {
    hero.addEventListener('mouseleave', () => {
      if (!blackHoleMode) return;
      blackHoleMode = false;
      if (blackholeBtn) { blackholeBtn.classList.remove('active'); }
      if (supernovaHint) supernovaHint.classList.remove('visible');
      document.body.classList.remove('blackhole-cursor');
    });
  }

  (hero || canvas).addEventListener('click', e => {
    if (!blackHoleMode) return;
    const rect = canvas.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const SUPERNOVA_RADIUS = 300;
    const SUPERNOVA_FORCE = 18;
    dots.forEach(d => {
      const mx = d.x - cx;
      const my = d.y - cy;
      const dist = Math.sqrt(mx * mx + my * my);
      if (dist < SUPERNOVA_RADIUS && dist > 0) {
        const force = (SUPERNOVA_RADIUS - dist) / SUPERNOVA_RADIUS * SUPERNOVA_FORCE;
        d.dx += (mx / dist) * force;
        d.dy += (my / dist) * force;
      }
    });
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, 60, 0, Math.PI * 2);
    const flash = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60);
    flash.addColorStop(0, 'rgba(255, 220, 100, 0.9)');
    flash.addColorStop(0.4, 'rgba(180, 60, 255, 0.5)');
    flash.addColorStop(1, 'rgba(180, 60, 255, 0)');
    ctx.fillStyle = flash;
    ctx.fill();
    ctx.restore();

    blackHoleMode = false;
    if (blackholeBtn) blackholeBtn.classList.remove('active');
    if (supernovaHint) supernovaHint.classList.remove('visible');
    document.body.classList.remove('blackhole-cursor');
  });

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (blackHoleMode && mouse.x > 0) {
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, ATTRACT_RADIUS);
      grad.addColorStop(0,   'rgba(0, 0, 0, 0.6)');
      grad.addColorStop(0.2, 'rgba(60, 0, 120, 0.3)');
      grad.addColorStop(1,   'rgba(60, 0, 120, 0)');
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, ATTRACT_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 12, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(160, 60, 255, 0.8)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    bgDots.forEach(b => {
      b.opacity += b.shimmerDir * b.shimmerSpeed;
      if (b.opacity >= 0.8 || b.opacity <= 0.05) b.shimmerDir *= -1;
      b.x += b.dx;
      b.y += b.dy;
      if (b.x < 0 || b.x > canvas.width) b.dx *= -1;
      if (b.y < 0 || b.y > canvas.height) b.dy *= -1;
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity})`;
      ctx.fill();
    });

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
      if (blackHoleMode) {
        if (dist < ATTRACT_RADIUS && dist > 0) {
          const force = (ATTRACT_RADIUS - dist) / ATTRACT_RADIUS * ATTRACT_STRENGTH;
          d.dx += (mx / dist) * force * 0.08;
          d.dy += (my / dist) * force * 0.08;
        }
      } else {
        if (dist < REPEL_RADIUS && dist > 0) {
          const force = (REPEL_RADIUS - dist) / REPEL_RADIUS * REPEL_STRENGTH;
          d.dx -= (mx / dist) * force;
          d.dy -= (my / dist) * force;
        }
      }
      d.dx += (d.baseDx - d.dx) * (blackHoleMode ? 0.005 : 0.05);
      d.dy += (d.baseDy - d.dy) * (blackHoleMode ? 0.005 : 0.05);
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

// === COMMIT LOG ===
const commitList = document.getElementById('commit-list');
if (commitList) {
  fetch('https://api.github.com/repos/Fifthsol/blog/commits?per_page=6')
    .then(r => r.json())
    .then(commits => {
      commitList.innerHTML = commits.map(c => {
        const msg = c.commit.message.split('\n')[0];
        const date = new Date(c.commit.author.date);
        const rel = Math.floor((Date.now() - date) / 86400000);
        const dateStr = rel === 0 ? 'today' : rel === 1 ? '1d ago' : `${rel}d ago`;
        return `<li>
          <span class="commit-msg">${msg}</span>
          <span class="commit-date">${dateStr}</span>
        </li>`;
      }).join('');
    })
    .catch(() => { commitList.innerHTML = '<li><span class="commit-msg">no commits yet</span></li>'; });
}
