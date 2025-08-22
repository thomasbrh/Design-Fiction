
document.addEventListener('DOMContentLoaded', () => {
const orbit = document.querySelector('.orbit');
if (!orbit) return;

const DURATION = 50000;
let direction = 1;
let t0 = null;
let rafId = null;

function tick(ts) {
    if (!t0) t0 = ts;
    const p = ((ts - t0) % DURATION) / DURATION;
    const spin = direction * (p * 360);
    orbit.style.setProperty('--spin', `${spin}deg`);
    rafId = requestAnimationFrame(tick);
}

requestAnimationFrame(tick);

// changer de sens au clic
/* orbit.addEventListener('click', () => {
    direction *= -1;
}); */

// pause au hover
orbit.addEventListener('mouseenter', () => {
    orbit.classList.add('pause');
});
orbit.addEventListener('mouseleave', () => {
    orbit.classList.remove('pause');
}); 


document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
    cancelAnimationFrame(rafId);
    t0 = null;
    requestAnimationFrame(tick);
    }
});

window.addEventListener('pagehide', () => {
    cancelAnimationFrame(rafId);
});

console.log('Orbit loaded');
});
