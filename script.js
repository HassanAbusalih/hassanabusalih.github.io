// Project slider

const slider = document.querySelector('.project-slider');
let slides = document.querySelectorAll('.slide-container');
const firstSlideClone = slides[0].cloneNode(true);
const lastSlideClone = slides[slides.length - 1].cloneNode(true);
document.querySelector('.project-slider').appendChild(firstSlideClone);
document.querySelector('.project-slider').insertBefore(lastSlideClone, slider.childNodes[0]);
slides = document.querySelectorAll('.project-slide');

const prevBtn = document.querySelector('.left-arrow');
const nextBtn = document.querySelector('.right-arrow');

let currentSlide = 1;

function updateSliderPosition() {
    const offset = -currentSlide * 100;
    slider.style.transform = `translateX(${offset}%)`;
}

function loopSlide(targetIndex){
    slides[currentSlide].classList.remove('visible-slide');
        
    currentSlide = targetIndex;
    
    slider.style.transition = 'none';
    updateSliderPosition();
    slider.offsetHeight;
    slider.style.transition = 'all 0.3s';

    slides[currentSlide].style.transition = 'none';
    slides[currentSlide].classList.add('visible-slide');
    slides[currentSlide].offsetHeight;
    slides[currentSlide].style.transition = 'all 0.5s';
}

nextBtn.addEventListener('click', () => {
    if (currentSlide == slides.length - 1){
        loopSlide(1);
    }

    slides[currentSlide].classList.remove('visible-slide');
    currentSlide++;
    slides[currentSlide].classList.add('visible-slide');
    updateSliderPosition();
});

prevBtn.addEventListener('click', () => {
    if (currentSlide == 0){
        loopSlide(slides.length - 2);
    }

    slides[currentSlide].classList.remove('visible-slide');
    currentSlide--;
    slides[currentSlide].classList.add('visible-slide');
    updateSliderPosition();
});

updateSliderPosition();

// Hidden/visible functionality

const hiddenElements = document.querySelectorAll('.hidden, .project-slide');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('project-slide')) {
                slides[currentSlide].classList.add('visible-slide');
            } else {
                entry.target.classList.add('visible');
            }
        } /* else {
            if (entry.target.classList.contains('project-slide')) {
                slides[currentSlide].classList.remove('visible-slide');
            } else {
                entry.target.classList.remove('visible');
            }
        }*/
    });
});

hiddenElements.forEach((el) => observer.observe(el));

// Swipe detection

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
        nextBtn.click();
    } else if (endX - startX > threshold) {
        prevBtn.click();
    }
}

slider.addEventListener('touchstart', handleTouchStart);
slider.addEventListener('touchmove', handleTouchMove);
slider.addEventListener('touchend', handleTouchEnd);

// Scroll up/down

function scrollToSection(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}