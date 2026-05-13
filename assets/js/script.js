// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Follower
const cursor = document.querySelector('.cursor-dot');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
    });
});

// Cursor Hover Effects on Links
const interactiveElements = document.querySelectorAll('a, button, .project-card');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            scale: 3,
            backgroundColor: 'transparent',
            border: '1px solid var(--text-primary)',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            scale: 1,
            backgroundColor: 'var(--text-primary)',
            border: 'none',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Typographic Parallax Effect
const parallaxElements = document.querySelectorAll('[data-speed]');

parallaxElements.forEach(el => {
    const speed = parseFloat(el.getAttribute('data-speed'));
    const yValue = (1 - speed) * 200; // Calculate translation based on speed diff from 1
    
    gsap.to(el, {
        y: yValue,
        ease: 'none',
        scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
});

// Hero Reveal Animation on Load
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    
    // Initial state for subtitles and words
    gsap.set('.subtitle-2, .subtitle-3, .word-2, .word-3', { autoAlpha: 0 });
    
    tl.from('.hero-title:not(.word-2):not(.word-3)', {
        yPercent: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.2
    })
    .from('.subtitle-1', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=1')
    .from('.hero-meta', {
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.5')
    .from('.global-nav', {
        y: -20,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    }, '-=1');

    // Hero Pinning and Word Morphing
    tl.add(() => {
        const heroPinTl = gsap.timeline({
            scrollTrigger: {
                trigger: "#hero-pin",
                start: "top top",
                end: "+=2000",
                pin: true,
                scrub: 1,
            }
        });

        // Phase 1: Manager -> Thinker
        heroPinTl.to(".scroller-inner", { yPercent: -100, duration: 1, ease: "power2.inOut" }, 0.1)
                 .to(".word-1", { autoAlpha: 0, duration: 0.5 }, 0.1)
                 .to(".word-2", { autoAlpha: 1, duration: 0.5 }, 0.1) // Ensure it's visible
                 .to(".subtitle-1", { autoAlpha: 0, duration: 0.5 }, 0.1)
                 .to(".subtitle-2", { autoAlpha: 1, duration: 0.5 }, 0.6);

        // Phase 2: Thinker -> Builder
        heroPinTl.to(".scroller-inner", { yPercent: -200, duration: 1, ease: "power2.inOut" }, 1.1)
                 .to(".word-2", { autoAlpha: 0, duration: 0.5 }, 1.1)
                 .to(".word-3", { autoAlpha: 1, duration: 0.5 }, 1.1)
                 .to(".subtitle-2", { autoAlpha: 0, duration: 0.5 }, 1.1)
                 .to(".subtitle-3", { autoAlpha: 1, duration: 0.5 }, 1.6);
    });
});

// Case Study TOC Toggle
document.addEventListener('DOMContentLoaded', () => {
    const tocToggle = document.getElementById('cs-toc-toggle');
    const sideNav = document.getElementById('cs-sidenav');
    if (tocToggle && sideNav) {
        tocToggle.addEventListener('click', () => {
            sideNav.classList.toggle('open');
        });
        
        // Close TOC when a link is clicked (on mobile)
        const tocLinks = document.querySelectorAll('.cs-toc-link');
        tocLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 1250) {
                    sideNav.classList.remove('open');
                }
            });
        });
    }
});
