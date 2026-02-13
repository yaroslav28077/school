/* --- assets/js/script.js --- */

document.addEventListener('DOMContentLoaded', () => {
    // --- HERO SLIDESHOW ---
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        const slideInterval = 5000;

        // Create dots container
        const hero = document.querySelector('.hero');
        if (hero) {
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'hero-dots';
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `Слайд ${i + 1}`);
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            });
            hero.appendChild(dotsContainer);
        }

        const dots = document.querySelectorAll('.hero-dot');

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            if (dots[currentSlide]) dots[currentSlide].classList.remove('active');
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        }

        function nextSlide() {
            goToSlide((currentSlide + 1) % slides.length);
        }

        setInterval(nextSlide, slideInterval);
    }
});