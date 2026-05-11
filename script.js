/* =========================================================
   The Wellness Ledger — Advertorial Scripts
   - Scroll progress bar
   - Sticky mobile CTA (appears after user scrolls)
   - Reveal-on-scroll
   - FAQ accordion (single-open behavior, optional)
   ========================================================= */

(function () {
  'use strict';

  // -------------------------
  // Scroll progress bar
  // -------------------------
  const progressBar = document.getElementById('progressBar');
  const stickyCta = document.getElementById('stickyCta');

  function onScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight =
      (document.documentElement.scrollHeight || document.body.scrollHeight) -
      window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = pct + '%';
    }

    // Show sticky CTA after scrolling 25% down
    if (stickyCta) {
      if (pct > 25 && pct < 95) {
        stickyCta.classList.add('visible');
        stickyCta.setAttribute('aria-hidden', 'false');
      } else {
        stickyCta.classList.remove('visible');
        stickyCta.setAttribute('aria-hidden', 'true');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  // -------------------------
  // Reveal on scroll
  // -------------------------
  const revealTargets = document.querySelectorAll(
    '.article-body h2, .pillar, .testimonial, .cta-main, .cta-inline, .symptom-list, .pullquote'
  );
  revealTargets.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealTargets.forEach((el) => io.observe(el));
  } else {
    // Fallback: show everything
    revealTargets.forEach((el) => el.classList.add('visible'));
  }

  // -------------------------
  // FAQ — single-open accordion behavior (optional nicety)
  // -------------------------
  const faq = document.getElementById('faq');
  if (faq) {
    const items = faq.querySelectorAll('details.faq-item');
    items.forEach((item) => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          items.forEach((other) => {
            if (other !== item && other.open) {
              other.open = false;
            }
          });
        }
      });
    });
  }

  // -------------------------
  // CTA click tracking hook (for GA/FB pixel integration later)
  // -------------------------
  const ctaButtons = document.querySelectorAll('a.btn-primary, a.btn-secondary');
  ctaButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Hook point: fire your analytics event here.
      // Example:
      // if (window.gtag) gtag('event', 'cta_click', { location: btn.id || 'unknown' });
      // if (window.fbq) fbq('track', 'Lead');
    });
  });
})();
