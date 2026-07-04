const GOOGLE_BOOKING_URL = "https://calendar.app.google/1MwnvHGy3efWZzt79";

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const bookingLinks = document.querySelectorAll(".js-booking-link");
const currentYear = document.querySelector("#current-year");
const installTip = document.querySelector(".install-tip");
const installButton = document.querySelector(".install-button");
const installTipClose = document.querySelector(".install-tip-close");
const installTipMessage = document.querySelector(".install-tip-message");

let deferredInstallPrompt;

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

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;

  if (installTip && shouldShowInstallTip()) {
    installTip.classList.add("is-visible");
  }
});

function isRunningStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function shouldShowInstallTip() {
  const hasDismissedInstallTip = localStorage.getItem("dismissedInstallTip") === "true";
  const isSmallScreen = window.matchMedia("(max-width: 719px)").matches;

  return !hasDismissedInstallTip && isSmallScreen && !isRunningStandalone();
}

if (installTip && installButton && installTipClose) {
  if (shouldShowInstallTip()) {
    installTip.classList.add("is-visible");
  }

  installButton.addEventListener("click", async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = undefined;
      installTip.classList.remove("is-visible");
      localStorage.setItem("dismissedInstallTip", "true");
      return;
    }

    if (installTipMessage) {
      installTipMessage.textContent =
        "iPhone: tap Share, then Add to Home Screen. Android: use the browser menu, then Add to Home screen.";
    }
  });

  installTipClose.addEventListener("click", () => {
    installTip.classList.remove("is-visible");
    localStorage.setItem("dismissedInstallTip", "true");
  });
}
