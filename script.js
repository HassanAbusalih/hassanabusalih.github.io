const slider = document.querySelector('.project-slider');
const slides = document.querySelectorAll('.project-slide');

const prevBtn = document.querySelector('.left-arrow');
const nextBtn = document.querySelector('.right-arrow');

const hiddenElements = document.querySelectorAll('.hidden, .project-slide');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('project-slide')) {
                slides[currentSlide].classList.add('show-slide');
            } else {
                entry.target.classList.add('show');
            }
        } /* else {
            if (entry.target.classList.contains('project-slide')) {
                slides[currentSlide].classList.remove('show-slide');
            } else {
                entry.target.classList.remove('show');
            }
        }*/
    });
});

hiddenElements.forEach((el) => observer.observe(el));

let currentSlide = 0;

function updateSliderPosition() {
    const offset = -currentSlide * 100;
    slider.style.transform = `translateX(${offset}%)`;

    prevBtn.disabled = currentSlide === 0;
    prevBtn.style.cursor = currentSlide === 0 ? 'default' : 'pointer';
    
    nextBtn.disabled = currentSlide === slides.length - 1;
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
        slides[currentSlide].classList.remove('show-slide');
        currentSlide++;
        slides[currentSlide].classList.add('show-slide');
        updateSliderPosition();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        slides[currentSlide].classList.remove('show-slide');
        currentSlide--;
        slides[currentSlide].classList.add('show-slide');
        updateSliderPosition();
    }
});

updateSliderPosition();

let startX = 0;
let endX = 0;

function handleTouchStart(e) {
    startX = e.touches[0].clientX;
}

function handleTouchMove(e) {
    endX = e.touches[0].clientX;
}

function handleTouchEnd() {
    const threshold = 50;
    if (startX - endX > threshold) {
        if (currentSlide < slides.length - 1) {
            nextBtn.click();
        }
    } else if (endX - startX > threshold) {
        if (currentSlide > 0) {
            prevBtn.click();
        }
    }
}

slider.addEventListener('touchstart', handleTouchStart);
slider.addEventListener('touchmove', handleTouchMove);
slider.addEventListener('touchend', handleTouchEnd);