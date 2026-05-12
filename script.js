/* =========================================================
   Bridge Page — Minimal JS
   - Smooth scroll for anchor links
   - CTA click tracking hook (for pixel integration)
   ========================================================= */

(function () {
  'use strict';

  // -------------------------
  // CTA click tracking hook
  // -------------------------
  var ctaButtons = document.querySelectorAll('.cta-button');

  ctaButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Hook: fire analytics event here
      // Example:
      // if (window.gtag) gtag('event', 'cta_click', { location: btn.id || 'unknown' });
      // if (window.fbq) fbq('track', 'Lead');
    });
  });

})();
