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

  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function () {
      for (let j = 0; j < pages.length; j++) {
        if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
          pages[j].classList.add('active');
          navigationLinks[j].classList.add('active');
          window.scrollTo(0, 0);
        } else {
          pages[j].classList.remove('active');
          navigationLinks[j].classList.remove('active');
        }
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
