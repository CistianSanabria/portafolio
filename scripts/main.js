/* =============================================================
   main.js — Hito 2 Homepage
   ============================================================= */

// ─── Cached DOM references ────────────────────────────────────
const navPill    = document.getElementById('nav-pill');
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('nav-links');

// ─── Scroll: add shadow to pill nav ──────────────────────────
let prevScrolled = false;

window.addEventListener('scroll', () => {
  const shouldScroll = window.scrollY > 10;
  if (shouldScroll === prevScrolled) return;
  prevScrolled = shouldScroll;
  navPill.classList.toggle('scrolled', shouldScroll);
}, { passive: true });

// ─── Mobile hamburger toggle ──────────────────────────────────
hamburger?.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// ─── Close mobile menu on nav link click ─────────────────────
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ─── Dynamic copyright year ───────────────────────────────────
// (year is hardcoded 2026 in markup; this keeps it automatic)
const yearEl = document.querySelector('.footer-copy');
if (yearEl) {
  yearEl.textContent = `© ${new Date().getFullYear()} Cristian Sanabria`;
}
