const GOOGLE_BOOKING_URL = "https://calendar.app.google/1MwnvHGy3efWZzt79";

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const bookingLinks = document.querySelectorAll(".js-booking-link");
const currentYear = document.querySelector("#current-year");
const installTip = document.querySelector(".install-tip");
const installTipClose = document.querySelector(".install-tip-close");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

bookingLinks.forEach((link) => {
  link.href = GOOGLE_BOOKING_URL;
  link.target = "_blank";
  link.rel = "noopener";

  link.addEventListener("click", (event) => {
    if (GOOGLE_BOOKING_URL === "GOOGLE_BOOKING_URL") {
      event.preventDefault();
      alert("Replace GOOGLE_BOOKING_URL in script.js with your Google Calendar Appointment Schedule link.");
    }
  });
});

if (installTip && installTipClose) {
  const hasDismissedInstallTip = localStorage.getItem("dismissedInstallTip") === "true";
  const isSmallScreen = window.matchMedia("(max-width: 719px)").matches;

  if (!hasDismissedInstallTip && isSmallScreen) {
    installTip.classList.add("is-visible");
  }

  installTipClose.addEventListener("click", () => {
    installTip.classList.remove("is-visible");
    localStorage.setItem("dismissedInstallTip", "true");
  });
}
