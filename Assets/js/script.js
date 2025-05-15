// FOR THE HAMBURHER MENU
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  function closeNav() {
    navLinks.classList.remove("active");
    hamburger.innerHTML = "&#9776;";
  }

  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    if (navLinks.classList.contains("active")) {
      hamburger.innerHTML = "&#10006;"; // Change to "X"
    } else {
      closeNav();
    }
  });

  document.addEventListener("click", function (event) {
    if (!navLinks.contains(event.target) && !hamburger.contains(event.target)) {
      closeNav();
    }
  });
});

// TO KEEP THE ACTIVE NAV-LINK
const currentPage = window.location.pathname;
const navLinks = document.querySelectorAll(".nav-links ul li a");

navLinks.forEach(link => {
  if (link.getAttribute("href") === currentPage.substring(currentPage.lastIndexOf("/") + 1)) {
    link.classList.add("active");
  }
});


// IMAGE SLIDER FOR THE HERO SECTION 
const trackElement = document.querySelector('.media-track');
const slideItems = document.querySelectorAll('.media-item');
const prevButton = document.querySelector('.img-button.left');
const nextButton = document.querySelector('.img-button.right');

// Unique slide index and total slides count
let slideIndex = 0;
const totalSlideCount = slideItems.length;

// Function to move to the correct slide
function moveToSlide(newIndex) {
  trackElement.style.transform = `translateX(-${newIndex * 100}%)`; // Move to the correct slide
}

// Function to move to the next slide
function goToNextSlide() {
  slideIndex = (slideIndex + 1) % totalSlideCount; // Loop to the first slide
  moveToSlide(slideIndex);
}

// Function to move to the previous slide
function goToPrevSlide() {
  slideIndex = (slideIndex - 1 + totalSlideCount) % totalSlideCount; // Loop to the last slide
  moveToSlide(slideIndex);
}

// Set up auto-slide every 5 seconds
let autoSlideTimer = setInterval(goToNextSlide, 5000);

// Stop the auto-slide when manually clicked and restart
prevButton.addEventListener('click', () => {
  clearInterval(autoSlideTimer);
  goToPrevSlide();
  autoSlideTimer = setInterval(goToNextSlide, 5000); // Restart auto-slide
});

nextButton.addEventListener('click', () => {
  clearInterval(autoSlideTimer);
  goToNextSlide();
  autoSlideTimer = setInterval(goToNextSlide, 5000); // Restart auto-slide
});

// Initialize the slider by moving to the first slide
moveToSlide(slideIndex);


// CARD SLIDER FOR THE SERVICES SECTION
const serviceSliderTrack = document.querySelector('.slider-track');
const serviceCards = document.querySelectorAll('.card');
const servicePrevBtn = document.getElementById('prevBtn');
const serviceNextBtn = document.getElementById('nextBtn');
const serviceSliderSection = document.querySelector('.card-slider-section');

let serviceIndex = 0;
let serviceTimer = null;
let serviceStarted = false;

// Get number of cards visible based on screen size
function getServiceCardsPerView() {
  return window.innerWidth <= 768 ? 1 : 2;
}

// Move slider to correct position
function updateServiceSlider() {
  const cardWidth = serviceCards[0].offsetWidth;
  const cardsPerView = getServiceCardsPerView();
  const maxIndex = serviceCards.length - cardsPerView;

  if (serviceIndex > maxIndex) serviceIndex = 0;
  if (serviceIndex < 0) serviceIndex = maxIndex;

  const offset = -(serviceIndex * cardWidth);
  serviceSliderTrack.style.transform = `translateX(${offset}px)`;
}

// Next/Previous slide functions
function nextServiceCard() {
  serviceIndex++;
  updateServiceSlider();
}

function prevServiceCard() {
  serviceIndex--;
  updateServiceSlider();
}

// Start auto-slide
function startServiceAutoSlide() {
  if (!serviceStarted) {
    serviceTimer = setInterval(nextServiceCard, 5000);
    serviceStarted = true;
  }
}

// Restart auto-slide when user clicks
function restartServiceAutoSlide() {
  clearInterval(serviceTimer);
  serviceTimer = setInterval(nextServiceCard, 5000);
}

// Button listeners
serviceNextBtn.addEventListener('click', () => {
  nextServiceCard();
  restartServiceAutoSlide();
});

servicePrevBtn.addEventListener('click', () => {
  prevServiceCard();
  restartServiceAutoSlide();
});

// Update slider on load and resize
window.addEventListener('resize', updateServiceSlider);
window.addEventListener('load', updateServiceSlider);

// Detect visibility and start auto-slide when section is in view
window.addEventListener('scroll', () => {
  const rect = serviceSliderSection.getBoundingClientRect();
  const isInView = rect.top < window.innerHeight && rect.bottom > 0;

  if (isInView && !serviceStarted) {
    startServiceAutoSlide();
  }
});


// OUR MISSION SECTION
const accordionDetails = document.querySelectorAll('.accordion-item details');

accordionDetails.forEach((detailsEl) => {
  detailsEl.addEventListener('toggle', function () {
    // If this details is opening, close all others
    if (this.open) {
      accordionDetails.forEach((otherEl) => {
        if (otherEl !== this) {
          otherEl.open = false;
        }
      });
    }
  });
});


// FAQ SECTION
document.querySelector('.faq').addEventListener('click', (e) => {
  const clickedQuestion = e.target.closest('.faq-question');
  if (!clickedQuestion) return;

  const clickedItem = clickedQuestion.parentElement;
  const clickedAnswer = clickedItem.querySelector('.faq-answer');

  // Close any currently open item
  document.querySelectorAll('.faq-item').forEach(item => {
    const answer = item.querySelector('.faq-answer');
    if (item !== clickedItem) {
      item.classList.remove('active');
      answer.style.maxHeight = null;
      answer.style.padding = '0 1rem';
    }
  });

  // Toggle clicked item
  const isActive = clickedItem.classList.contains('active');
  clickedItem.classList.toggle('active');
  clickedAnswer.style.maxHeight = isActive ? null : clickedAnswer.scrollHeight + 'px';
  // clickedAnswer.style.padding = isActive ? '0 1rem' : '20px 10px';
});



// FOR THE SCROLL TO TOP BUTTON
var scrollToTopBtn = document.querySelector('.scroll-to-top');

window.onscroll = function () {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    scrollToTopBtn.style.display = 'block';
  } else {
    scrollToTopBtn.style.display = 'none';
  }
};

scrollToTopBtn.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});