// jQuery dropdown animations
$("nav li").hover(
  function() {
    $("ul", this)
      .stop()
      .slideDown(200);
  },
  function() {
    $("ul", this)
      .stop()
      .slideUp(200);
  }
);

// Sliding navigation menu animation
const navToggle = () => {
  const menu = document.querySelector(".nav-menu");
  const navBar = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");
  const body = document.querySelector("body");
  const navLink = document.querySelectorAll(".nav-link");

  // Add transform to menu after page load to prevent initial menu transform
  navBar.classList.add("nav-transform");

  menu.addEventListener("click", () => {
    // Toggle navigation menu
    navMenuToggle();
  });

  navLink.forEach(link =>
    link.addEventListener("click", () => {
      if ($(window).width() <= 600) {
        // Toggle navigation menu if link clicked in mobile view
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

  // Select all links with hashes
  // Remove links that don't actually link to anything
  $(
    'a[href*="#"]:not([href="#"]):not([href="#0"]):not([href="#carouselExampleIndicators"])'
  ).click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top
          },
          1000,
          function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) {
              // Checking if the target was focused
              return false;
            } else {
              $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          }
        );
      }
    }
  });
};

navToggle();
