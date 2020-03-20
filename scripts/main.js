// Sliding navigation menu animation
const navToggle = () => {
  const menu = document.querySelector(".nav-menu");
  const navBar = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  const body = document.querySelector("body");

  // Add transform to menu after page load to prevent initial menu transform
  navBar.classList.add("nav-transform");

  menu.addEventListener("click", () => {
    // Toggle navigation menu
    navMenuToggle();
  });

  navLinks.forEach(link =>
    link.addEventListener("click", () => {
      if (window.innerWidth <= 700) {
        // Close navigation menu if link clicked in mobile view
        navMenuToggle();
      }
    })
  );

  function navMenuToggle() {
    if (navBar.classList.contains("nav-active")) {
      navBar.classList.remove("nav-active");
      body.classList.remove("fixedPosition");
    } else {
      navBar.classList.add("nav-active");
      body.classList.add("fixedPosition");
    }

    // Animate links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.4s ease forwards ${index / 7}s`;
      }
    });

    // Navigation menu animation
    menu.classList.toggle("toggle");
  }
};

navToggle();
