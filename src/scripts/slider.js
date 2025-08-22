document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.slider-wrapper');
    const track   = document.querySelector('.slider');
    const slides  = Array.from(document.querySelectorAll('.slide'));

    if (!wrapper || !track || slides.length === 0) {
    console.error('Slider init failed: missing elements');
    return;
    }


    const AUTOPLAY_MS = 2000; /* temps pour changer de slide */
    const SWIPE_THRESHOLD = 50; // px
    const BREAKPOINTS = [
    { min: 1024, show: 3 },  // >= 1024px → 3 slides
    ];
    // Fallback par défaut
    let slidesToShow = 1;


    let currentIndex = 0;
    let autoTimer = null;
    let startX = null;
    let resizeDebounce = null;


    function computeSlidesToShow() {
    // du plus grand au plus petit
    const bp = BREAKPOINTS.find(b => window.innerWidth >= b.min);
    slidesToShow = bp ? bp.show : 1;
    }

    function getGapPx() {
    const cs = getComputedStyle(track);
    // en flex-row c'est "column-gap", mais certains navigateurs exposent "gap"
    const gap = parseFloat(cs.columnGap || cs.gap || '0');
    return isNaN(gap) ? 0 : gap;
    }

    function clampIndex(i) {
    const maxStart = Math.max(0, slides.length - slidesToShow);
    return Math.min(Math.max(i, 0), maxStart);
    }

    function setSlideWidths() {
    const gap = getGapPx();
    const w = wrapper.clientWidth;
    const slideW = (w - gap * (slidesToShow - 1)) / slidesToShow;

    slides.forEach(s => {
        s.style.width = `${slideW}px`;
        // sécurité au cas où un ancien code posait des marges
        s.style.marginRight = '';
    });

    // assure que les img remplissent bien (utile si règle globale img {height:auto})
    slides.forEach(s => {
        const img = s.querySelector('img');
        if (img) {
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = img.style.objectFit || 'cover';
        img.style.objectPosition = img.style.objectPosition || 'center';
        img.style.display = 'block';
        }
    });
    }


    function goTo(index) {
    currentIndex = clampIndex(index);

    const gap = getGapPx();
    const slideW = slides[0].clientWidth; // après setSlideWidths()
    const offset = currentIndex * (slideW + gap);

    track.style.transform = `translateX(-${offset}px)`;

    // état actif/inactif si besoin d’effets
    slides.forEach((slide, i) => {
        const active = i >= currentIndex && i < currentIndex + slidesToShow;
        slide.classList.toggle('active', active);
    });
    }

    function next() {
    // avance, sinon wrap au début
    const maxStart = Math.max(0, slides.length - slidesToShow);
    if (currentIndex >= maxStart) {
        goTo(0); // retour au début
    } else {
        goTo(currentIndex + 1);
    }
    }

    
    function prev() {
    // recule, sinon wrap à la fin
    const maxStart = Math.max(0, slides.length - slidesToShow);
    if (currentIndex <= 0) {
        goTo(maxStart); // retour à la fin
    } else {
        goTo(currentIndex - 1);
    }
    }


    function startAutoplay() {
    stopAutoplay();
    autoTimer = setInterval(next, AUTOPLAY_MS);
    }
    function stopAutoplay() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = null;
    }


    // Pause au survol // cette partie à été faite par moi-même
    wrapper.addEventListener('mouseenter', stopAutoplay);
    wrapper.addEventListener('mouseleave', startAutoplay);

    // Swipe touch
    wrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    stopAutoplay();
    }, { passive: true });

    wrapper.addEventListener('touchend', (e) => {
    if (startX == null) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) (diff > 0 ? next() : prev());
    startX = null;
    startAutoplay();
    }, { passive: true });

    // Clavier // cette partie à été faite par moi-même
    wrapper.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft')  prev();
    });

    // Resize (fenêtre) + ResizeObserver (conteneur)
    function onResize() {
    computeSlidesToShow();
    setSlideWidths();
    goTo(currentIndex); // recalcule l’offset avec les nouvelles largeurs
    }

    window.addEventListener('resize', () => {
    clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(onResize, 100);
    });

    if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(() => {
        clearTimeout(resizeDebounce);
        resizeDebounce = setTimeout(onResize, 50);
    });
    ro.observe(wrapper);
    }

    
    computeSlidesToShow();
    setSlideWidths();
    goTo(0);
    startAutoplay();
});

console.log('Slider loaded');