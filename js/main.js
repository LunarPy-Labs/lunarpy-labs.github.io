/**
 * LunarPy-Labs — Core Interactive Logic
 * Pure Vanilla JavaScript (No Frameworks, No External Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollReveal();
  initHeaderScrollEffect();
  initSmoothScroll();
});

/**
 * Mobile Navigation Drawer Toggle & Accessibility
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const menuNav = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !menuNav) return;

  let isOpen = false;

  function toggleMenu(show) {
    isOpen = typeof show === 'boolean' ? show : !isOpen;

    if (isOpen) {
      menuNav.classList.remove('menu-hidden');
      menuNav.classList.add('menu-visible');
      menuNav.setAttribute('aria-hidden', 'false');
      menuBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      
      if (menuIconOpen) menuIconOpen.classList.add('hidden');
      if (menuIconClose) menuIconClose.classList.remove('hidden');
    } else {
      menuNav.classList.remove('menu-visible');
      menuNav.classList.add('menu-hidden');
      menuNav.setAttribute('aria-hidden', 'true');
      menuBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');

      if (menuIconOpen) menuIconOpen.classList.remove('hidden');
      if (menuIconClose) menuIconClose.classList.add('hidden');
    }
  }

  menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close on mobile link click
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // Close menu on pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      toggleMenu(false);
    }
  });

  // Close on window resize to desktop breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && isOpen) {
      toggleMenu(false);
    }
  });
}

/**
 * Scroll Reveal Effects using IntersectionObserver
 */
function initScrollReveal() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealItems = document.querySelectorAll('.reveal-item');

  if (isReducedMotion) {
    revealItems.forEach(item => item.classList.add('revealed'));
    return;
  }

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.add('revealed'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealItems.forEach(item => observer.observe(item));
}

/**
 * Header Styling on Scroll
 */
function initHeaderScrollEffect() {
  const header = document.getElementById('site-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('bg-opacity-90', 'backdrop-blur-md', 'border-b', 'border-slate-800/80');
      header.classList.remove('bg-opacity-0');
    } else {
      header.classList.remove('bg-opacity-90', 'border-b', 'border-slate-800/80');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * Smooth Anchor Navigation with Offset
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
