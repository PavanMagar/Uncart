let slideIndex = 0;
const slides = document.querySelector('.slides');
const dots = document.querySelectorAll('.dot');
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
const slider = document.getElementById('slider');

// Show the slide based on index
function showSlide(index) {
  if (index >= dots.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = dots.length - 1;
  } else {
    slideIndex = index;
  }

  slides.style.transform = `translateX(-${slideIndex * 100}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[slideIndex].classList.add('active');
}

// Automatically go to the next slide
function nextSlide() {
  showSlide(slideIndex + 1);
}

// Function to go to a specific slide (called by dots)
function currentSlide(index) {
  showSlide(index);
}

// Add swipe functionality for touch devices
slider.addEventListener('touchstart', touchStart);
slider.addEventListener('touchend', touchEnd);
slider.addEventListener('touchmove', touchMove);

// Add mouse drag functionality for desktops
slider.addEventListener('mousedown', dragStart);
slider.addEventListener('mouseup', dragEnd);
slider.addEventListener('mousemove', dragMove);
slider.addEventListener('mouseleave', dragEnd);

// Disable auto-slide on interaction and re-enable on no interaction
slider.addEventListener('mouseover', () => clearInterval(slideInterval));
slider.addEventListener('mouseleave', () => slideInterval = setInterval(nextSlide, 5000));

function touchStart(event) {
  startPos = getPositionX(event);
  isDragging = true;
  animationID = requestAnimationFrame(animation);
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);
  setSlideByDrag();
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function dragStart(event) {
  event.preventDefault();
  startPos = getPositionX(event);
  isDragging = true;
  animationID = requestAnimationFrame(animation);
}

function dragEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);
  setSlideByDrag();
}

function dragMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function animation() {
  slides.style.transform = `translateX(${currentTranslate}px)`;
  if (isDragging) requestAnimationFrame(animation);
}

function setSlideByDrag() {
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100) {
    nextSlide();
  } else if (movedBy > 100) {
    showSlide(slideIndex - 1);
  } else {
    showSlide(slideIndex);
  }

  prevTranslate = -slideIndex * slider.offsetWidth;
}

// Automatically change slides every 5 seconds
let slideInterval = setInterval(nextSlide, 2000);
