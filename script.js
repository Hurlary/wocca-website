const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Highlight the current page in the nav
(() => {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;
    const linkPage = href.split("#")[0] || "index.html";
    if (linkPage === current || (linkPage === "" && current === "index.html")) {
      link.classList.add("active");
    }
  });
})();

// Floating back-to-top button
const fab = document.getElementById("backToTopFab");
if (fab) {
  window.addEventListener("scroll", () => {
    fab.classList.toggle("visible", window.scrollY > 500);
  });
  fab.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Legacy in-hero back-to-top link (index page)
document.getElementById("backToTop")?.addEventListener("click", (event) => {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Form handling: lightweight client-side only (no backend wired up)
function wireForm(formId, statusId, message) {
  const form = document.getElementById(formId);
  if (!form) return;
  const status = document.getElementById(statusId);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    form.querySelectorAll("input, select, textarea").forEach(field => field.value = "");
    if (status) {
      status.textContent = message;
      status.classList.add("visible");
    }
  });
}

/* =====================================================
   WOCCA UNDERSTANDING CAROUSEL
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const carousel = document.querySelector(".wocca-carousel");

  if (!carousel) return;

  const slides = carousel.querySelectorAll(".wocca-slide");
  const dots = carousel.querySelectorAll(".carousel-dot");

  const nextButton = carousel.querySelector(".carousel-next");
  const prevButton = carousel.querySelector(".carousel-prev");

  let currentSlide = 0;
  let autoPlay;

  function showSlide(index) {

    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = index;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    if (currentSlide < 0) {
      currentSlide = slides.length - 1;
    }

    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function previousSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoPlay() {

    autoPlay = setInterval(() => {
      nextSlide();
    }, 7000);

  }

  function resetAutoPlay() {

    clearInterval(autoPlay);
    startAutoPlay();

  }

  nextButton.addEventListener("click", () => {
    nextSlide();
    resetAutoPlay();
  });

  prevButton.addEventListener("click", () => {
    previousSlide();
    resetAutoPlay();
  });

  dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

      showSlide(index);
      resetAutoPlay();

    });

  });

  carousel.addEventListener("mouseenter", () => {
    clearInterval(autoPlay);
  });

  carousel.addEventListener("mouseleave", () => {
    startAutoPlay();
  });

  startAutoPlay();

});

wireForm("contactForm", "formStatus", "Thanks — your message has been noted. WOCCA will follow up by email shortly.");
wireForm("newsletterForm", "newsletterStatus", "You're on the list — thanks for staying informed.");
