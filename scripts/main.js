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
const navSlide = () => {
  let menu = document.querySelector(".nav-menu");
  let navBar = document.querySelector(".nav-links");
  let navLinks = document.querySelectorAll(".nav-links li");
  let body = document.querySelector("body");
  

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

navSlide();