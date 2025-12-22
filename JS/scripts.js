document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  // Toggle mobile menu
  navToggle.addEventListener("click", () => {
    navbar.classList.toggle("menu-open");

    // Optional: when opening the menu, ensure all dropdowns start closed
    if (navbar.classList.contains("menu-open")) {
      dropdownToggles.forEach(t => t.parentElement.classList.remove("open"));
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) {
      navbar.classList.remove("menu-open");
      dropdownToggles.forEach(toggle =>
        toggle.parentElement.classList.remove("open")
      );
    }
  });

  // Helper to close all dropdowns except one (or all if none passed)
  function closeAllDropdowns(exceptParent) {
    dropdownToggles.forEach(toggle => {
      const parent = toggle.parentElement;
      if (parent !== exceptParent) {
        parent.classList.remove("open");
      }
    });
  }

  // Toggle dropdowns on mobile
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      const parent = toggle.parentElement;
      const isOpen = parent.classList.contains("open");

      // close all first
      closeAllDropdowns();

      // then (re)open only the clicked one if it was not already open
      if (!isOpen) {
        parent.classList.add("open");
      }
    });
  });
});
