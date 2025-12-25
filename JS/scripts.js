
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
const newsSection = document.querySelector('.news-section');
const prev = newsSection.querySelector('.slider-btn.prev');
const next = newsSection.querySelector('.slider-btn.next');
const wrap = document.getElementById('news-slider'); 
const slides = document.querySelectorAll('.news-item');

let idx = 0;

function showSlide() {
  const slideStyle = getComputedStyle(slides[0]);
  const gap = parseInt(slideStyle.marginRight) || 0;
 const slideWidth =
  slides[0].offsetWidth +
  parseInt(getComputedStyle(wrap).gap || 0);


  const visibleSlides = Math.floor(
    wrap.parentElement.offsetWidth / slideWidth
  );
  const maxIdx = slides.length - visibleSlides;

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
}, 3000);

function changeSlide(n) {
  idx += n;
  showSlide();
}


window.addEventListener('resize', showSlide);
showSlide();

});

/* ======================
   Progres Bar for Alumni Slider
   adapted from: https://www.w3schools.com/howto/howto_js_slideshow.asp
   and https://www.w3schools.com/howto/howto_js_progressbar.asp
====================== */

let alumniIndex = 1;
let progressTimer = null;
let autoSlide = null; // auto-slide interval

function plusSlides(n) {
  showSlides(alumniIndex += n);
}

function moveProgress(current, total) {
  const elem = document.getElementById("alumniProgress");
  if (!elem) return;

  let width = ((current - 1) / total) * 100;
  clearInterval(progressTimer);

  progressTimer = setInterval(frame, 20);

  function frame() {
    if (width >= (current / total) * 100) {
      clearInterval(progressTimer);
    } else {
      width++;
      elem.style.width = width + "%";
    }
  }
}

function showSlides(n) {
  const slides = document.getElementsByClassName("alumni-slide");
  if (!slides.length) return;

  if (n > slides.length) alumniIndex = 1;
  if (n < 1) alumniIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slides[alumniIndex - 1].style.display = "block";
  moveProgress(alumniIndex, slides.length);
}

// W3Schools-style auto-slide
function startAutoSlide() {
  autoSlide = setInterval(() => plusSlides(1), 4000); 
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

// Initialize and add pause-on-hover
document.addEventListener("DOMContentLoaded", () => {
  showSlides(alumniIndex);
  startAutoSlide();

  const slider = document.querySelector(".alumni-card-container");
  if (slider) {
    slider.addEventListener("mouseenter", stopAutoSlide); 
    slider.addEventListener("mouseleave", startAutoSlide); 
  }
});

// Back to Top Button Functionality adapted from: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 300) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  