const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
    const open = navLinks.classList.toggle('active');
    menuIcon.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});

navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('active'));
});

const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (event) => {
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('is-invalid');
        }
    });
}

function setupCarousel(root) {
    const track = root.querySelector('.carousel-track');
    const slides = [...root.querySelectorAll('.carousel-slide')];
    const prev = root.querySelector('[data-carousel-prev]');
    const next = root.querySelector('[data-carousel-next]');
    const dotsRoot = root.querySelector('[data-carousel-dots]');
    if (!track || slides.length === 0) return;

    let index = 0;
    let timer;

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to project ${i + 1}`);
        dot.addEventListener('click', () => goTo(i, true));
        dotsRoot.appendChild(dot);
    });

    const dots = [...dotsRoot.querySelectorAll('button')];

    function goTo(nextIndex, user) {
        index = (nextIndex + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
        slides.forEach((slide, i) => slide.classList.toggle('is-active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
        if (user) restart();
    }

    function start() {
        stop();
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        timer = window.setInterval(() => goTo(index + 1), 5000);
    }

    function stop() {
        window.clearInterval(timer);
    }

    function restart() {
        stop();
        start();
    }

    prev?.addEventListener('click', () => goTo(index - 1, true));
    next?.addEventListener('click', () => goTo(index + 1, true));
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);

    let startX = 0;
    track.addEventListener('pointerdown', (event) => {
        startX = event.clientX;
    });
    track.addEventListener('pointerup', (event) => {
        const delta = event.clientX - startX;
        if (Math.abs(delta) < 40) return;
        goTo(delta < 0 ? index + 1 : index - 1, true);
    });

    goTo(0);
    start();
}

document.querySelectorAll('[data-carousel]').forEach(setupCarousel);

// Keep the destination in one place so the intro can be reused without touching its markup.
const NEW_PORTFOLIO_URL = 'https://paavan-randhawa.vercel.app';
const ozIntro = document.querySelector('#oz-intro');

if (ozIntro) {
    const ozLink = ozIntro.querySelector('.oz-link');
    ozLink?.addEventListener('click', () => {
        ozIntro.classList.add('is-revealing');
    });
}
