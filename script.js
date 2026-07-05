const GOOGLE_BOOKING_URL = "https://calendar.app.google/NvG3mrkW7zHY8rYk7";
const SERVICES_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRwgUfsdrEiZh0EFepgGLQHVsfWXazqckz9cy5EJV-gG1eIqFnasCQVxL2R-GHzgGD27v3cXGx6Uw6r/pub?gid=0&single=true&output=csv";

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const bookingLinks = document.querySelectorAll(".js-booking-link");
const recommendWhatsAppLink = document.querySelector(".js-recommend-whatsapp");
const recommendEmailLink = document.querySelector(".js-recommend-email");
const currentYear = document.querySelector("#current-year");
const servicesGrid = document.querySelector("#services-grid");
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

function setRecommendationLinks() {
  const pageUrl = `${window.location.origin}${window.location.pathname}`;
  const shareText = `I thought you might like Riverside Barbers in Limerick: ${pageUrl}`;
  const emailSubject = "Riverside Barbers recommendation";
  const emailBody = `Hi,\n\nI thought you might like Riverside Barbers in Limerick. You can view their services, hours, and booking page here:\n\n${pageUrl}`;

  if (recommendWhatsAppLink) {
    recommendWhatsAppLink.href = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    recommendWhatsAppLink.target = "_blank";
    recommendWhatsAppLink.rel = "noopener";
  }

  if (recommendEmailLink) {
    recommendEmailLink.href = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  }
}

setRecommendationLinks();

function parseCsv(csvText) {
  const rows = [];
  let row = [];
  let value = "";
  let isInsideQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const character = csvText[index];
    const nextCharacter = csvText[index + 1];

    if (character === '"' && isInsideQuotes && nextCharacter === '"') {
      value += '"';
      index += 1;
      continue;
    }

    if (character === '"') {
      isInsideQuotes = !isInsideQuotes;
      continue;
    }

    if (character === "," && !isInsideQuotes) {
      row.push(value.trim());
      value = "";
      continue;
    }

    if ((character === "\n" || character === "\r") && !isInsideQuotes) {
      if (character === "\r" && nextCharacter === "\n") {
        index += 1;
      }

      row.push(value.trim());
      value = "";

      if (row.some(Boolean)) {
        rows.push(row);
      }

      row = [];
      continue;
    }

    value += character;
  }

  row.push(value.trim());

  if (row.some(Boolean)) {
    rows.push(row);
  }

  return rows;
}

function normalizeHeader(header) {
  return header.trim().replace(/^\uFEFF/, "").toLowerCase().replace(/\s+/g, "_");
}

function isActiveService(value) {
  if (!value) {
    return true;
  }

  return ["1", "true", "yes", "y", "active"].includes(value.trim().toLowerCase());
}

function parseServices(csvText) {
  const rows = parseCsv(csvText);

  if (rows.length < 2) {
    return [];
  }

  const headers = rows[0].map(normalizeHeader);

  return rows
    .slice(1)
    .map((row, rowIndex) => {
      const service = {};

      headers.forEach((header, index) => {
        service[header] = row[index] || "";
      });

      const name = service.name || "";
      const description = service.description || "";
      const price = service.price || "";
      const active = service.active || "";
      const sortOrder = service.sort_order || "";

      return {
        name: name.trim(),
        description: description.trim(),
        price: price.trim(),
        active: isActiveService(active),
        sortOrder: Number.parseFloat(sortOrder) || rowIndex + 1,
      };
    })
    .filter((service) => service.active && service.name && service.price)
    .sort((firstService, secondService) => firstService.sortOrder - secondService.sortOrder);
}

function createServiceCard(service) {
  const card = document.createElement("article");
  const title = document.createElement("h3");
  const description = document.createElement("p");
  const price = document.createElement("strong");

  card.className = "service-card";
  title.textContent = service.name;
  description.textContent = service.description;
  price.textContent = service.price;

  card.append(title, description, price);

  return card;
}

async function loadServicesFromSheet() {
  if (!servicesGrid || SERVICES_CSV_URL === "GOOGLE_SHEET_CSV_URL") {
    return;
  }

  try {
    const response = await fetch(SERVICES_CSV_URL, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Services sheet returned ${response.status}`);
    }

    const services = parseServices(await response.text());

    if (!services.length) {
      throw new Error("Services sheet did not include any active services");
    }

    servicesGrid.replaceChildren(...services.map(createServiceCard));
  } catch (error) {
    console.warn("Using fallback services because the Google Sheet could not be loaded.", error);
  }
}

loadServicesFromSheet();

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
