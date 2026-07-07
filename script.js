(function () {
  'use strict';

  const header = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const contactForm = document.getElementById('contactForm');

  /* Header scroll effect */
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* Mobile navigation toggle */
  navToggle.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* Close mobile nav on link click */
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', '메뉴 열기');
      document.body.style.overflow = '';
    });
  });

  /* Active nav link on scroll */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

  /* Contact form validation */
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(inputId, errorId, message) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(errorId);
    input.classList.add('error');
    error.textContent = message;
  }

  function clearError(inputId, errorId) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(errorId);
    input.classList.remove('error');
    error.textContent = '';
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var message = document.getElementById('message').value.trim();
    var isValid = true;

    clearError('name', 'nameError');
    clearError('email', 'emailError');
    clearError('message', 'messageError');

    if (!name) {
      showError('name', 'nameError', '이름을 입력해 주세요.');
      isValid = false;
    }

    if (!email) {
      showError('email', 'emailError', '이메일을 입력해 주세요.');
      isValid = false;
    } else if (!validateEmail(email)) {
      showError('email', 'emailError', '올바른 이메일 형식이 아닙니다.');
      isValid = false;
    }

    if (!message) {
      showError('message', 'messageError', '메시지를 입력해 주세요.');
      isValid = false;
    }

    if (!isValid) return;

    var successEl = document.getElementById('formSuccess');
    successEl.hidden = false;
    contactForm.reset();

    setTimeout(function () {
      successEl.hidden = true;
    }, 4000);
  });

  /* Clear errors on input */
  ['name', 'email', 'message'].forEach(function (id) {
    document.getElementById(id).addEventListener('input', function () {
      clearError(id, id + 'Error');
    });
  });

  /* Scroll reveal for project cards */
  var cards = document.querySelectorAll('.project-card');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    cards.forEach(function (card, index) {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease ' + (index * 0.1) + 's, transform 0.6s ease ' + (index * 0.1) + 's';
      observer.observe(card);
    });
  }
})();
