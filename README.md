# Riverside Barber's Booking Website

A simple static MVP for a local barber appointment booking service.. It is built with only HTML, CSS, and JavaScript, so it can be hosted for free on GitHub Pages.

There is no backend, database, payment system, Firebase, Supabase, Stripe, or paid API. Booking buttons send customers to a Google Calendar Appointment Schedule link.

## Files

- `index.html` - page content, fallback services, opening hours, and contact details.
- `styles.css` - responsive design and visual styling.
- `script.js` - mobile menu, Google Sheet services loader, and Google Sheet site settings loader.
- `assets/barber-hero.png` - hero image used on the homepage.

## Edit Services And Prices

Services and prices can be loaded from a published Google Sheet. Create a sheet with these column names in the first row:

```text
name,description,price,active,sort_order
```

Example rows:

```csv
name,description,price,active,sort_order
Gents haircut,"Classic scissor or clipper cut, finished and styled.",€20,yes,1
Skin fade,"Clean fade with detail work and a sharp finish.",€30,yes,2
Beard trim,"Shape, tidy, and line-up for a neat beard finish.",€15,no,3
```

In Google Sheets, choose **File**, **Share**, **Publish to web**. Select the services sheet, choose **Comma-separated values (.csv)**, then publish and copy the CSV link.

Open `script.js` and replace this line:

```js
const SERVICES_CSV_URL = "GOOGLE_SHEET_CSV_URL";
```

with your published CSV link:

```js
const SERVICES_CSV_URL = "https://docs.google.com/spreadsheets/d/e/your-published-sheet/pub?output=csv";
```

Rows are shown when `active` is `yes`, `true`, `1`, `y`, or `active`. Leave `active` blank to show the row. Set it to `no` to hide a service. `sort_order` controls the display order.

If the Google Sheet cannot be loaded, the site keeps showing the fallback service cards already in `index.html`.

## Edit Site Settings

The booking link and contact details can be loaded from a second published sheet in the same spreadsheet. Create a sheet named `site_settings` with these column names in the first row:

```text
key,value,notes
```

Example rows:

```csv
key,value,notes
booking_url,https://calendar.app.google/NvG3mrkW7zHY8rYk7,Google Calendar booking link
contact_phone_display,+353 83 204 2922,Text shown to customers
contact_phone_tel,+353832042922,Phone link value
contact_whatsapp_number,353832042922,"WhatsApp number, no plus/spaces"
contact_email,bookings@example.com,Email link value
```

In Google Sheets, choose **File**, **Share**, **Publish to web**. Select the `site_settings` sheet, choose **Comma-separated values (.csv)**, then publish and copy the CSV link.

Open `script.js` and set `SETTINGS_CSV_URL` to the published CSV link for the settings sheet.

The site uses these keys:

- `booking_url` - Google Calendar Appointment Schedule URL used by all Book Now buttons.
- `contact_phone_display` - phone number text shown to customers.
- `contact_phone_tel` - phone link value used for `tel:`.
- `contact_whatsapp_number` - WhatsApp number used for `https://wa.me/`.
- `contact_email` - email address used for `mailto:`.

For WhatsApp, use the international phone number without spaces or the plus symbol:

```text
353832042922
```

If the settings sheet cannot be loaded, the site keeps using the fallback booking and contact details in `script.js` and `index.html`.

## Change The Site Icon

The browser favicon and mobile home screen icon use these files:

- `assets/favicon-32.png`
- `assets/apple-touch-icon.png`
- `assets/icon-192.png`
- `assets/icon-512.png`
- `manifest.json`

If you replace the logo later, keep the same filenames and square PNG sizes so the links in `index.html` and `manifest.json` continue to work.

The site also shows a small mobile-only `Add app` button. On supported Android browsers it can open the browser install prompt. On iPhone, Safari does not allow websites to launch Add to Home Screen directly, so the button shows the short manual instruction instead.

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
