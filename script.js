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

wireForm("contactForm", "formStatus", "Thanks — your message has been noted. WOCCA will follow up by email shortly.");
wireForm("newsletterForm", "newsletterStatus", "You're on the list — thanks for staying informed.");
