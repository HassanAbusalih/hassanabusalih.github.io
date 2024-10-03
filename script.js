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

// Background

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function createShape(startOpacity) {
    const scale = 1 + Math.random() * 2;
    const shapes = [
        new THREE.BoxGeometry(scale, scale, scale),
        new THREE.SphereGeometry(scale / 2, 16, 16),
        new THREE.CylinderGeometry(scale / 2, scale / 2, scale, 16),
        new THREE.ConeGeometry(scale / 2, scale, 16),
        new THREE.TorusGeometry(scale / 2, scale / 4, 16, 100)
    ];

    const geometry = shapes[Math.floor(Math.random() * shapes.length)];
    const material = new THREE.MeshBasicMaterial({
        color: Math.random() * 0xffffff,
        transparent: true,
        opacity: startOpacity
    });

    const minDistance = 5;

    let posX = (Math.random() - 0.5) * 100;
    while (Math.abs(camera.position.x - posX) < minDistance) posX = (Math.random() - 0.5) * 100;
    let posY = (Math.random() - 0.5) * 100;
    while (Math.abs(camera.position.y - posY) < minDistance) posY = (Math.random() - 0.5) * 100;

    const shape = new THREE.Mesh(geometry, material);
    shape.position.set(posX, posY, -50 - Math.random() * 100);
    shape.moveSpeed = 0.2 + Math.random() * 0.3;
    scene.add(shape);

    shape.moveSpeed = 0.2 + Math.random() * 0.3;
    scene.add(shape);
}

for (let i = 0; i < 50; i++) {
    createShape(0.1);
}

camera.position.z = 5;

window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

let previousTime = performance.now();

function animate() {
    const currentTime = performance.now();
    const deltaTime = (currentTime - previousTime) / 1000;
    previousTime = currentTime;

    scene.children.forEach(shape => {
        shape.position.z += shape.moveSpeed * deltaTime * 60;
        shape.rotation.x += 0.01 * deltaTime * 60;
        shape.rotation.y += 0.01 * deltaTime * 60;

        if (shape.material.opacity < 0.5) {
            shape.material.opacity += 0.002 * deltaTime * 60;
        }

        if (shape.position.z >= camera.position.z) {
            scene.remove(shape);
            createShape(0);
        }
    });

    camera.rotation.z += 0.002 * deltaTime * 60;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();