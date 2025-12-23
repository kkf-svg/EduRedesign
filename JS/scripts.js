let currentSlide = 0;
let slides;
let totalSlides;
let slider;

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  navToggle.addEventListener("click", () => {
    navbar.classList.toggle("menu-open");
    if (navbar.classList.contains("menu-open")) {
      dropdownToggles.forEach(t => t.parentElement.classList.remove("open"));
    }
  });

  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) {
      navbar.classList.remove("menu-open");
      dropdownToggles.forEach(t => t.parentElement.classList.remove("open"));
    }
  });

  function closeAllDropdowns(exceptParent) {
    dropdownToggles.forEach(toggle => {
      const parent = toggle.parentElement;
      if (parent !== exceptParent) parent.classList.remove("open");
    });
  }

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = toggle.parentElement;
      const isOpen = parent.classList.contains("open");
      closeAllDropdowns();
      if (!isOpen) parent.classList.add("open");
    });
  });

  // News Slider Functionality adapted from  : https://www.geeksforgeeks.org/html/building-a-carousel-with-vanilla-javascript/
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const wrap = document.getElementById('news-slider'); 
const slides = document.querySelectorAll('.news-item');

let idx = 0;

function showSlide() {
    const slideWidth = slides[0].offsetWidth + 32; 
    const maxIdx = slides.length - Math.floor(wrap.parentElement.offsetWidth / slideWidth);
    
    if (idx > maxIdx) idx = 0;
    if (idx < 0) idx = maxIdx;

    wrap.style.transform = `translateX(-${idx * slideWidth}px)`;  
}

next.addEventListener('click', () => {
    idx++;
    showSlide();
});

prev.addEventListener('click', () => {
    idx--;
    showSlide();
});

setInterval(() => {
    idx++;
    showSlide();
}, 7000);

showSlide();
});
