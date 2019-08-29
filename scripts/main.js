// jQuery dropdown animations
$('nav li').hover(
    function() {
        $('ul', this).stop().slideDown(200);
    },
    function() {
        $('ul', this).stop().slideUp(200);
    }
);

// Sliding navigation menu animation
const navToggle = () => {
  const menu = document.querySelector(".nav-menu");
  const navBar = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  const body = document.querySelector("body");
  const navLink = document.querySelectorAll(".nav-link");
  

  menu.addEventListener("click", () => {
    // Toggle navigation menu
    navMenuToggle();
  })

  navLink.forEach((link) => link.addEventListener("click", () => {
    if ($(window).width() <= 600) {
      // Toggle navigation menu if link clicked in mobile view
      navMenuToggle();
    }
  }))

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
  };
}

navToggle();