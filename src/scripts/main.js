// Sliding navigation menu animation
const navToggle = () => {
  const menu = document.querySelector(".hamburger-menu");
  const navBar = document.querySelector("nav ul");
  const navLinks = document.querySelectorAll("nav li");
  const body = document.querySelector("body");

  menu.addEventListener("click", () => {
    // Toggle navigation menu
    navMenuToggle();
  });

  navLinks.forEach((link) =>
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        // Close navigation menu if link clicked in mobile view
        navMenuToggle();
      }
    })
  );

  function navMenuToggle() {
    if (navBar.classList.contains("menu--active")) {
      navBar.classList.remove("menu--active");
      body.classList.remove("lock-scroll");
    } else {
      navBar.classList.add("menu--transform", "menu--active");
      // Hide body overflow to prevent scrolling when menu is open
      body.classList.add("lock-scroll");
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
