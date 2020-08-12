/* Nav menu animation */
const menuBtn = document.querySelector(".menu");
const navBar = document.querySelector("nav ul");
const navLinks = document.querySelectorAll("nav li");
const body = document.querySelector("body");

menuBtn.addEventListener("click", () => {
  navMenuToggle();
});

navLinks.forEach((link) =>
  link.addEventListener("click", () => {
    // When menu is open, close menu when link is clicked
    if (navBar.classList.contains("menu--active")) {
      navMenuToggle();
    }
  })
);

function navMenuToggle() {
  navBar.classList.toggle("menu--active");
  body.classList.toggle("lock-scroll");
  menuBtn.classList.toggle("menu--transform");

  // Animate links
  navLinks.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.4s ease forwards ${index / 7}s`;
    }
  });
}
