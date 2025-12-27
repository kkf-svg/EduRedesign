document.addEventListener("DOMContentLoaded", () => {
  // ===================== NAVBAR & DROPDOWNS =====================
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  navToggle?.addEventListener("click", () => {
    navbar.classList.toggle("menu-open");
    dropdownToggles.forEach(t => t.parentElement.classList.remove("open"));
  });

  function closeAllDropdowns(exceptParent) {
    dropdownToggles.forEach(toggle => {
      const parent = toggle.parentElement;
      if (parent !== exceptParent) parent.classList.remove("open");
    });
  }

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();
      const parent = toggle.parentElement;
      const isOpen = parent.classList.contains("open");
      closeAllDropdowns();
      if (!isOpen) parent.classList.add("open");
    });
  });

  document.addEventListener("click", e => {
    if (!navbar.contains(e.target)) {
      navbar.classList.remove("menu-open");
      closeAllDropdowns();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      navbar.classList.remove("menu-open");
      closeAllDropdowns();
    }
  });

  // ===================== NEWS SLIDER ====================
  const newsSection = document.querySelector(".news-section");
  if (newsSection) {
    const prev = newsSection.querySelector(".slider-btn.prev");
    const next = newsSection.querySelector(".slider-btn.next");
    const wrap = document.getElementById("news-slider");
    const slides = wrap ? wrap.querySelectorAll(".news-item") : [];
    let idx = 0;

    function showSlide() {
      if (!wrap || slides.length === 0) return;
      const slideWidth =
        slides[0].offsetWidth + parseInt(getComputedStyle(wrap).gap || 0);
      const visibleSlides = Math.floor(wrap.parentElement.offsetWidth / slideWidth);
      const maxIdx = slides.length - visibleSlides;
      if (idx > maxIdx) idx = 0;
      if (idx < 0) idx = maxIdx;
      wrap.style.transform = `translateX(-${idx * slideWidth}px)`;
    }

    next?.addEventListener("click", () => { idx++; showSlide(); });
    prev?.addEventListener("click", () => { idx--; showSlide(); });

    setInterval(() => { idx++; showSlide(); }, 3000);
    window.addEventListener("resize", showSlide);
    showSlide();
  }

  // ===================== BACK TO TOP ===================== adapted from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.style.display = document.documentElement.scrollTop > 300 ? "block" : "none";
    });
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ===================== MEGA MENU AS MODAL ===================== adapted from  https://www.w3schools.com/howto/howto_css_modals.asp

const megaModalOverlay = document.querySelector(".mega-modal-overlay");
const megaMenuTrigger  = document.querySelector(".admission-mega-menu-trigger");
const megaCloseBtn     = document.querySelector(".mega-close");

// Modal function
function showModal() {
  megaModalOverlay.style.display = "flex";
}

// Modal function  
function hideModal() {
  megaModalOverlay.style.display = "none";
}

// When the user clicks on the button, open the modal
megaMenuTrigger?.addEventListener("click", function(event) {
  event.stopPropagation();
  showModal();
  megaMenuTrigger.setAttribute("aria-expanded", "true");
});

// When the user clicks on <span> (x), close the modal
megaCloseBtn?.addEventListener("click", function(event) {
  event.stopPropagation();
  hideModal();
  megaMenuTrigger.setAttribute("aria-expanded", "false");
  megaMenuTrigger.focus();
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
  if (event.target === megaModalOverlay) {
    hideModal();
    megaMenuTrigger.setAttribute("aria-expanded", "false");
    megaMenuTrigger.focus();
  }
});

// Close modal on Escape key
document.addEventListener("keydown", function(event) {
  if (event.key === "Escape" && megaModalOverlay.style.display === "flex") {
    hideModal();
    megaMenuTrigger.setAttribute("aria-expanded", "false");
    megaMenuTrigger.focus();
  }
});


  // ===================== ALUMNI SLIDER =====================
  const alumniSlides = document.querySelectorAll(".alumni-slide");
  const progressBar = document.getElementById("alumniProgress");
  const prevBtn = document.querySelector(".alumni-btn.prev");
  const nextBtn = document.querySelector(".alumni-btn.next");
  const sliderContainer = document.querySelector(".alumni-card-container");

  let currentIndex = 0;
  let autoSlideInterval = null;
  let progressInterval = null;

  function showAlumniSlide(index) {
    alumniSlides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
    updateProgress(index);
  }

  function nextAlumni() {
    currentIndex = (currentIndex + 1) % alumniSlides.length;
    showAlumniSlide(currentIndex);
  }

  function prevAlumni() {
    currentIndex = (currentIndex - 1 + alumniSlides.length) % alumniSlides.length;
    showAlumniSlide(currentIndex);
  }

  function startAlumniAutoSlide() {
    stopAlumniAutoSlide();
    autoSlideInterval = setInterval(nextAlumni, 4000);
  }

  function stopAlumniAutoSlide() {
    clearInterval(autoSlideInterval);
  }

   //update progress bar adapted from https://www.w3schools.com/howto/howto_js_progressbar.asp
  function updateProgress(index) {
    if (!progressBar) return;
    clearInterval(progressInterval);
    let width = (index / alumniSlides.length) * 100;
    let target = ((index + 1) / alumniSlides.length) * 100;
    progressBar.style.width = width + "%";
    progressInterval = setInterval(() => {
      if (width >= target) clearInterval(progressInterval);
      else progressBar.style.width = (width += 1) + "%";
    }, 20);
  }

  // Event listeners adapted from https://www.w3schools.com/howto/howto_js_slideshow.asp and https://www.w3schools.com/JSREF/event_onmouseleave.asp
  nextBtn?.addEventListener("click", nextAlumni);
  prevBtn?.addEventListener("click", prevAlumni);
  sliderContainer?.addEventListener("mouseenter", stopAlumniAutoSlide);
  sliderContainer?.addEventListener("mouseleave", startAlumniAutoSlide);


  showAlumniSlide(currentIndex);
  startAlumniAutoSlide();

  interval = setInterval(() => {
    nextAlumni();
  }, 5000);
});

// Accordian JS Adapted from https://www.w3schools.com/howto/howto_js_accordion.asp
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

//slideshow logic for testimonials adapted from: https://www.w3schools.com/howto/howto_js_quotes_slideshow.asp
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}


