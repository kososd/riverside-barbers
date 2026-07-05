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
const userAgent = window.navigator.userAgent || "";
const isAndroid = /Android/i.test(userAgent);
const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

function readStoredFlag(key) {
  try {
    return localStorage.getItem(key) === "true";
  } catch {
    return false;
  }
}

function writeStoredFlag(key) {
  try {
    localStorage.setItem(key, "true");
  } catch {
    // Storage can be unavailable in some private browsing modes.
  }
}

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

  if (installTip && shouldShowInstallTip(true)) {
    setInstallMessage();
    installTip.classList.add("is-visible");
  }
});

function isRunningStandalone() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function shouldShowInstallTip(hasNativePrompt = Boolean(deferredInstallPrompt)) {
  const hasDismissedInstallTip = readStoredFlag("dismissedInstallTip");
  const isSmallScreen = window.matchMedia("(max-width: 719px)").matches;

  if (hasDismissedInstallTip || !isSmallScreen || isRunningStandalone()) {
    return false;
  }

  return isIOS || isAndroid || hasNativePrompt;
}

function setInstallMessage() {
  if (!installTipMessage || !installButton) {
    return;
  }

  if (deferredInstallPrompt) {
    installTipMessage.textContent = "Install the site on this phone for faster booking.";
    installButton.textContent = "Add app";
    return;
  }

  if (isAndroid) {
    installTipMessage.textContent = "Tap Add app for the Android home screen steps.";
    installButton.textContent = "Show steps";
    return;
  }

  if (isIOS) {
    installTipMessage.textContent = "Tap Add app for the iPhone home screen steps.";
    installButton.textContent = "Show steps";
  }
}

function hideInstallTip() {
  if (installTip) {
    installTip.classList.remove("is-visible");
  }

  writeStoredFlag("dismissedInstallTip");
}

if (installTip && installButton && installTipClose) {
  if (shouldShowInstallTip()) {
    setInstallMessage();
    installTip.classList.add("is-visible");
  }

  installButton.addEventListener("click", async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt = undefined;
      hideInstallTip();
      return;
    }

    if (installTipMessage && isAndroid) {
      installTipMessage.textContent = "Android: open the browser menu, then tap Add to Home screen.";
      return;
    }

    if (installTipMessage && isIOS) {
      installTipMessage.textContent = "iPhone: tap Share, then Add to Home Screen.";
    }
  });

  installTip.addEventListener("click", (event) => {
    if (event.target.closest(".install-tip-close")) {
      hideInstallTip();
    }
  });
}
