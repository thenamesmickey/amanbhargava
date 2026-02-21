'use strict';

// ─── Partial Loader ──────────────────────────────────────────────────────────

/**
 * Fetches an HTML partial and injects it into the target container element.
 * @param {string} url   - path to the partial file
 * @param {string} id    - id of the container element to populate
 */
async function loadPartial(url, id) {
  const container = document.getElementById(id);
  if (!container) return;
  const response = await fetch(url);
  container.innerHTML = await response.text();
}

// ─── Initialise after all partials are loaded ─────────────────────────────────

async function init() {
  // Load all sections in parallel
  await Promise.all([
    loadPartial('./components/sidebar.html', 'sidebar-container'),
    loadPartial('./components/navbar.html', 'navbar-container'),
    loadPartial('./components/about.html', 'about-container'),
    loadPartial('./components/resume.html', 'resume-container'),
    loadPartial('./components/portfolio.html', 'portfolio-container'),
    loadPartial('./components/contact.html', 'contact-container'),
  ]);

  // ── element toggle helper ─────────────────────────────────────────────────
  const elementToggleFunc = function (elem) { elem.classList.toggle('active'); };

  // ── sidebar ───────────────────────────────────────────────────────────────
  const sidebar = document.querySelector('[data-sidebar]');
  const sidebarBtn = document.querySelector('[data-sidebar-btn]');

  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener('click', function () { elementToggleFunc(sidebar); });
  }

  // ── page navigation ───────────────────────────────────────────────────────
  const navigationLinks = document.querySelectorAll('[data-nav-link]');
  const pages = document.querySelectorAll('[data-page]');

  /**
   * Updates UI state (active classes) based on the provided page name.
   * @param {string} pageName - The name of the page to navigate to.
   */
  function navigateTo(pageName) {
    let found = false;
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].dataset.page === pageName) {
        pages[i].classList.add('active');
        navigationLinks[i].classList.add('active');
        found = true;
      } else {
        pages[i].classList.remove('active');
        navigationLinks[i].classList.remove('active');
      }
    }
    if (found) window.scrollTo(0, 0);
  }

  // Initial load: handle hash in URL
  const initialHash = window.location.hash.replace('#', '').toLowerCase();
  if (initialHash) {
    navigateTo(initialHash);
  } else {
    // Default to the first page if no hash
    navigateTo('about');
  }

  // Handle hash changes (back/forward buttons or direct navigation)
  window.addEventListener('hashchange', () => {
    const pageName = window.location.hash.replace('#', '').toLowerCase();
    if (pageName) navigateTo(pageName);
  });

  // Attach click listeners to update the hash
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function () {
      const pageName = this.innerHTML.toLowerCase().trim();
      // Skip specialized buttons like "Download CV" if they exist
      if (pageName !== 'download cv') {
        window.location.hash = pageName;
      }
    });
  }

  // ── contact form ──────────────────────────────────────────────────────────

  function isMobileDevice() {
    return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
  }

  function sendWhatsAppMessage(senderName, message) {
    const phoneNumber = '+918769018313';
    window.open(
      `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent('Hello i am ' + senderName + ', and i have a query regarding :- ' + message)}`,
      '_blank'
    );
    setTimeout(function () {
      if (!document.hidden) { sendWhatsWebMessage(senderName, message); }
    }, 2000);
  }

  function sendWhatsWebMessage(senderName, message) {
    const phoneNumber = '+918769018313';
    window.open(
      `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent('Hello i am ' + senderName + ', and i have a query regarding :- ' + message)}`,
      '_blank'
    );
  }

  function sendEmail(senderEmail, senderName, message) {
    const receiverEmail = 'amanbhargava1998@gmail.com';
    const subject = `Message from ${senderName}`;
    const body = `Sender's Email: ${senderEmail}\n\nMessage: ${message}`;
    const mailtoUrl = `mailto:${receiverEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const newWindow = window.open(mailtoUrl, 'EmailWindow');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      alert('Error: Unable to send email. Please try again later.');
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const senderName = document.getElementById('senderName').value;
    const senderEmail = document.getElementById('senderEmail').value;
    const message = document.getElementById('message').value;

    if (isMobileDevice()) {
      sendWhatsAppMessage(senderName, message);
    } else {
      if (confirm('Would you like to open WhatsApp Web?')) {
        sendWhatsWebMessage(senderName, message);
      } else {
        sendEmail(senderEmail, senderName, message);
      }
    }
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', handleSubmit);
  }
}

// Kick everything off once the base DOM is ready
document.addEventListener('DOMContentLoaded', init);
