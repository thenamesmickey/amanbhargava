class GlobalNavbar extends HTMLElement {
    connectedCallback() {
        const bp = this.getAttribute('base-path') || './';
        const homeHref = bp === './' ? '#' : bp;

        this.innerHTML = `
            <nav class="global-nav">
                <a href="${homeHref}" class="nav-brand">Aman Bhargava.</a>
                <button class="mobile-toggle" aria-label="Toggle menu">
                    <ion-icon name="menu-outline"></ion-icon>
                </button>
                <div class="nav-links">
                    <a href="${bp}#about">About</a>
                    <a href="${bp}#experience">Experience</a>
                    <a href="${bp}#Case-studies">Case-studies</a>
                    <a href="https://www.linkedin.com/in/amanbhargava/" target="_blank" class="nav-social-link">LinkedIn</a>
                    <a href="${bp}assets/Aman_Bhargava_PM_Remote.pdf" download class="resume-btn">
                        Download Resume <ion-icon name="download-outline" style="margin-left: 4px; font-size: 1.2em;"></ion-icon>
                    </a>
                </div>
            </nav>
        `;

        const toggleBtn = this.querySelector('.mobile-toggle');
        const navLinks = this.querySelector('.nav-links');
        const icon = toggleBtn.querySelector('ion-icon');

        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('name', 'close-outline');
            } else {
                icon.setAttribute('name', 'menu-outline');
            }
        });

        // Close menu when clicking a link
        const links = this.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                icon.setAttribute('name', 'menu-outline');
            });
        });
    }
}
customElements.define('global-navbar', GlobalNavbar);

class GlobalContact extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <section id="contact" class="contact-section">
                <div class="container">
                    <span class="uppercase text-muted text-sm tracking-tight" style="display: block; margin-bottom: 2rem;">Have a project in mind?</span>
                    <div class="contact-wrapper">
                        <span class="contact-link" data-speed="1.1">Let's Talk.</span>
                        <div class="contact-options">
                            <a href="mailto:theamanbhargava@gmail.com" class="contact-btn">
                                <ion-icon name="mail-outline"></ion-icon> Email
                            </a>
                            <a href="https://wa.me/918769018313" target="_blank" class="contact-btn">
                                <ion-icon name="logo-whatsapp"></ion-icon> WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
}
customElements.define('global-contact', GlobalContact);

class GlobalFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="footer">
                <span>© 2026 Aman Bhargava</span>
                <span>Built with intent.</span>
            </footer>
        `;
    }
}
customElements.define('global-footer', GlobalFooter);
