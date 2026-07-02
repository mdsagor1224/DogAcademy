/* ============================================================
   DOG ACADEMY — LANDING PAGE SCRIPTS
============================================================ */

// ---------- Preloader ----------
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  setTimeout(() => { pre.classList.add('fade-out'); }, 900);
  setTimeout(() => { pre.style.display = 'none'; }, 1600);
});

// ---------- AOS init ----------
AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic' });

// ---------- Mobile menu ----------
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  mobileMenu.classList.toggle('hidden');
  menuBtn.setAttribute('aria-expanded', String(!isOpen));
  menuBtn.querySelector('i').className = isOpen ? 'fa-solid fa-bars text-slate-700' : 'fa-solid fa-xmark text-slate-700';
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    menuBtn.querySelector('i').className = 'fa-solid fa-bars text-slate-700';
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Navbar shrink on scroll ----------
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.querySelector('nav').classList.add('soft-shadow-lg');
  } else {
    navbar.querySelector('nav').classList.remove('soft-shadow-lg');
  }
});

// ---------- Ripple effect on buttons ----------
document.querySelectorAll('.ripple').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const span = document.createElement('span');
    const size = Math.max(rect.width, rect.height);
    span.className = 'wave';
    span.style.width = span.style.height = size + 'px';
    span.style.left = (e.clientX - rect.left - size / 2) + 'px';
    span.style.top = (e.clientY - rect.top - size / 2) + 'px';
    this.appendChild(span);
    setTimeout(() => span.remove(), 650);
  });
});

// ---------- Animated counters ----------
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      const decimal = parseInt(el.dataset.decimal || '0', 10);
      let current = 0;
      const duration = 1600;
      const steps = 60;
      const increment = target / steps;
      const stepTime = duration / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { current = target; clearInterval(timer); }
        el.textContent = current.toFixed(decimal) + suffix;
      }, stepTime);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ---------- Accordion ----------
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('i');
    const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';

    document.querySelectorAll('.accordion-content').forEach(c => { c.style.maxHeight = null; });
    document.querySelectorAll('.accordion-btn i').forEach(i => i.classList.remove('rotate-180'));

    if (!isOpen) {
      content.style.maxHeight = content.scrollHeight + 'px';
      icon.classList.add('rotate-180');
    }
  });
});
