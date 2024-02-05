const navIcon = document.querySelector('.nav-icon');
const linksWrapper = document.querySelector('.navigation-mobile');
const mainWrapper = document.querySelector('.main-wrapper');
const titles = document.querySelectorAll('.title');
const hiddenElements = document.querySelectorAll('.hidden');

//Navigation
navIcon.addEventListener('click', () => {
    let hidden = linksWrapper.getAttribute('aria-hidden');

    if(hidden === 'true') {
        linksWrapper.setAttribute('aria-hidden', false);
        navIcon.innerHTML = '<svg class="cross-icon" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 16 16"><path fill="none" stroke="#e72144" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"/></svg>';
        mainWrapper.classList.add('blur');
    } else {
        linksWrapper.setAttribute('aria-hidden', true);
        navIcon.innerHTML = '<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="-5 -7 24 24"><path fill="#e72144" d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2m7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2M1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2"/></svg>';
        mainWrapper.classList.remove('blur');
    }
});

//Cursor Effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    cursor.style.inset = `${e.clientY}px ${e.clientX}px`;
});

//Animation titles rotating
function rotateAnimation() {
    titles.forEach(title => {
        if (!title.classList.contains('run-rotate-listener')) {
            title.classList.add('run-rotate-listener');
            title.addEventListener('animationend', () => {
                title.classList.remove('run-rotate');
            });
        }

        title.classList.add('run-rotate');
    });
    setTimeout(rotateAnimation, 18000);
}

rotateAnimation();

//Scene loading effect
document.addEventListener('DOMContentLoaded', () => {
    const Scene = document.querySelector('.intro-scene');
    const Logo = document.querySelector('.intro-logo');
    document.body.classList.add('not-scrollable');
    window.scrollTo(0, 0);
    Logo.addEventListener('animationend', () => {
        Scene.remove();
        hiddenElements.forEach(el => Observer.observe(el));
        document.body.classList.remove('not-scrollable');
    });
});

const Observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

//Smooth scroll
$('.link').on('click', (e) => {
    const target = e.target.getAttribute('href');
    $('html, body').animate({ scrollTop: $(target).offset().top }, 1700)
    e.preventDefault();
    $('.navigation-mobile').attr('aria-hidden', true);
    $('.main-wrapper').removeClass('blur');
    navIcon.innerHTML = '<svg class="menu-icon" xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="-5 -7 24 24"><path fill="#e72144" d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2m7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2M1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2"/></svg>';
});