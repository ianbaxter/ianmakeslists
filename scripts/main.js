// We listen to the resize event
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

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
  

  menu.addEventListener("click", () => {
    // Toggle navigation menu
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
  })
}

navToggle();