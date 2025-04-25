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

// CARD SLIDDER FOR THE SERVIECC SECTION
const track = document.querySelector('.slider-track');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const cards = document.querySelectorAll('.card');

let currentIndex = 0;

function getCardsPerView() {
  return window.innerWidth <= 768 ? 1 : 2;
}

function updateSlider() {
  const cardWidth = cards[0].offsetWidth;
  const cardsPerView = getCardsPerView();
  const maxIndex = cards.length - cardsPerView;

  if (currentIndex < 0) currentIndex = 0;
  if (currentIndex > maxIndex) currentIndex = maxIndex;

  track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  currentIndex++;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  currentIndex--;
  updateSlider();
});

// Adjust on window resize for the service section
window.addEventListener('resize', updateSlider);
window.addEventListener('load', updateSlider);


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
  clickedAnswer.style.padding = isActive ? '0 1rem' : '20px 10px';
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