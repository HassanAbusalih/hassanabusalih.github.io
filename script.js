const slider = document.querySelector('.project-slider');
const slides = document.querySelectorAll('.project-slide');

const prevBtn = document.querySelector('.left-arrow');
const nextBtn = document.querySelector('.right-arrow');

const hiddenElements = document.querySelectorAll('.hidden');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

hiddenElements.forEach((el) => observer.observe(el));

let currentSlide = 0;

function updateSliderPosition() {
    const offset = -currentSlide * 100;
    slider.style.transform = `translateX(${offset}%)`;

    prevBtn.style.opacity = currentSlide === 0 ? '0' : '1';
    prevBtn.style.cursor = currentSlide === 0 ? 'default' : 'pointer';

    nextBtn.style.opacity = currentSlide === slides.length - 1 ? '0' : '1';
    nextBtn.style.cursor = currentSlide === slides.length - 1 ? 'default' : 'pointer';
}

function scrollToSection(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

nextBtn.addEventListener('click', () => {
    if (currentSlide < slides.length - 1) {
        currentSlide++;
        updateSliderPosition();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateSliderPosition();
    }
});

updateSliderPosition();