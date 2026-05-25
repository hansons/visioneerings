document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation Toggle ---
  const toggle = document.querySelector('.nav-toggle');
  const body = document.body;

  if (toggle) {
    toggle.addEventListener('click', () => {
      const open = body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && body.classList.contains('nav-open')) {
        body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });

    // Close when a mobile nav link is clicked
    document.querySelectorAll('.mobile-nav a').forEach(link => {
      link.addEventListener('click', () => {
        body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Active Navigation Link ---
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (path.endsWith(href) || (href !== 'index.html' && path.includes(href.replace('.html', ''))))) {
      link.classList.add('active');
    }
    // Home page special case
    if ((href === 'index.html' || href === './') && (path.endsWith('/') || path.endsWith('index.html'))) {
      link.classList.add('active');
    }
  });

  // --- Scroll-triggered Fade-in ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fadeEls = document.querySelectorAll('.fade-in, .fade-in-stagger');

  if (prefersReducedMotion) {
    fadeEls.forEach(el => el.classList.add('visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0 });

    fadeEls.forEach(el => observer.observe(el));

    // Safety net: force-reveal anything still hidden after 2 seconds
    setTimeout(() => {
      fadeEls.forEach(el => el.classList.add('visible'));
    }, 2000);
  }

  // --- Lazy SoundCloud Embed Loading ---
  function loadSoundCloudEmbed(placeholder) {
    const iframe = document.createElement('iframe');
    iframe.src = placeholder.dataset.src;
    iframe.width = '100%';
    iframe.height = placeholder.dataset.height || '450';
    iframe.scrolling = 'no';
    iframe.frameBorder = 'no';
    iframe.setAttribute('allow', 'autoplay');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('title', placeholder.dataset.title || 'SoundCloud Player');

    const wrapper = document.createElement('div');
    wrapper.className = 'sc-embed';
    wrapper.appendChild(iframe);

    placeholder.replaceWith(wrapper);
  }

  document.querySelectorAll('.sc-placeholder').forEach(placeholder => {
    placeholder.addEventListener('click', () => loadSoundCloudEmbed(placeholder));
    placeholder.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        loadSoundCloudEmbed(placeholder);
      }
    });
  });

});
