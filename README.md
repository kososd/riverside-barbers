# Riverside Barber's Booking Website

A simple static MVP for a local barber appointment booking service. It is built with only HTML, CSS, and JavaScript, so it can be hosted for free on GitHub Pages.

There is no backend, database, payment system, Firebase, Supabase, Stripe, or paid API. Booking buttons send customers to a Google Calendar Appointment Schedule link.

## Files

- `index.html` - page content, services, prices, opening hours, and contact details.
- `styles.css` - responsive design and visual styling.
- `script.js` - mobile menu and the Google booking link placeholder.
- `assets/barber-hero.png` - hero image used on the homepage.

## Edit Services And Prices

Open `index.html` and find the `service-card` blocks in the `Services and prices` section.

Example:

```html
<article class="service-card">
  <h3>Gents haircut</h3>
  <p>Classic scissor or clipper cut, finished and styled.</p>
  <strong>&euro;25</strong>
</article>
```

Change the service name inside `<h3>`, the description inside `<p>`, and the price inside `<strong>`.

## Replace The Google Booking Link

Open `script.js` and replace this line:

```js
const GOOGLE_BOOKING_URL = "GOOGLE_BOOKING_URL";
```

with your real Google Calendar Appointment Schedule URL:

```js
const GOOGLE_BOOKING_URL = "https://calendar.google.com/calendar/appointments/your-link-here";
```

All buttons with the `js-booking-link` class will then open that booking page.

## Edit Business Details

Open `index.html` and update:

- Business name: `Riverside Barber's`
- Phone: `+353 83 204 2922`
- Email: `bookings@example.com`
- Address: `Main Street, Limerick, Ireland`

For WhatsApp, use the international phone number without spaces or the plus symbol:

```html
https://wa.me/353832042922
```

## Change The Site Icon

The browser favicon and mobile home screen icon use these files:

- `assets/favicon-32.png`
- `assets/apple-touch-icon.png`
- `assets/icon-192.png`
- `assets/icon-512.png`
- `manifest.json`

If you replace the logo later, keep the same filenames and square PNG sizes so the links in `index.html` and `manifest.json` continue to work.

The site also shows a small mobile-only reminder telling customers how to add Riverside Barber's to their phone home screen. The text is near the bottom of `index.html` in the `install-tip` block.

## Deploy For Free With GitHub Pages

1. Create a new GitHub repository.
2. Add these project files to the repository.
3. Commit and push the files to GitHub.
4. In GitHub, open the repository settings.
5. Go to **Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch**.
7. Choose the `main` branch and the `/root` folder.
8. Save.

GitHub will publish the site at a free URL like:

```text
https://your-username.github.io/your-repository-name/
```

## Connect A Custom Domain Later

1. Buy a domain from any domain registrar.
2. In your GitHub repository, go to **Settings** then **Pages**.
3. Add your domain in the **Custom domain** box.
4. In your domain registrar DNS settings, add the DNS records GitHub asks for.
5. When GitHub confirms the domain works, enable **Enforce HTTPS**.

GitHub's custom domain guide is here:

```text
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
```

## Local Preview

Because this is a static site, you can open `index.html` directly in a browser.

For a more realistic preview, run a simple local server:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```
