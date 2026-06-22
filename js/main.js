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
