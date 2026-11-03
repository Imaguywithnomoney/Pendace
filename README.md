# Pendace Website System

Pendace is a responsive front-end prototype for a pen-spinning shop. It includes product browsing, filters, a Pen Mod Builder, authentication for prototype accounts, cart and checkout flows, order tracking, favorites, saved builds, account settings, and an admin dashboard.

## Run the project

This project uses plain HTML, CSS, and JavaScript—no build step or package installation is required.

1. Open `index.html` in a modern browser.
2. Use the navigation to browse the shop, build a custom mod, or sign in.
3. Use a local web server if your browser restricts local-file features.

For example, with Node.js installed:

```bash
npx serve .
```

## Prototype credentials

Credentials are intentionally kept out of the login screen. See [CREDENTIALS.md](CREDENTIALS.md) for the user and administrator test accounts.

## Features

- Responsive home, shop, product filtering, cart, checkout, about, and account pages
- Unified login for user and administrator roles
- Temporary browser-session registration for new prototype users
- Favorites, saved custom mods, order history, and account settings
- Light and dark mode, with contrast-aware colors
- Pen Mod Builder with body, grip, tip, cap, and pre-built mod selections
- Checkout validation before an order can be placed
- Admin dashboard and order-management views

## Project structure

```text
Pendace Website System/
├── index.html               Main HTML shell, navigation, footer, and asset links
├── app.js                   Application state, page rendering, and interactions
├── styles.css               Core design system and base component styles
├── overrides.css            Shared visual refinements
├── responsive-fixes.css     Responsive and zoom-safe layout adjustments
├── builder-*.css            Pen Mod Builder image and layout refinements
├── cart-fixes.css           Cart and checkout presentation refinements
├── catalog-fixes.css        Shop catalog and empty-state refinements
├── interaction-fixes.css    Hover, focus, and account-form interactions
├── feature-upgrades.css     Filters, account settings, dark mode, and new features
├── accessibility.css         Contrast, text-size, and screen-reader refinements
├── images/                  Local product and brand images
├── CREDENTIALS.md           Prototype-only sign-in credentials
└── references/              Original design reference images
```

## Code conventions

- HTML, CSS, and JavaScript are formatted with Prettier for readable indentation and consistent wrapping.
- CSS is organized by purpose: base styles first, then focused enhancement files loaded afterward.
- UI rendering and events live in `app.js`; persistent prototype data uses `sessionStorage` only.
- Prices are displayed in Philippine pesos (₱).

## Prototype limitations

This is a client-side prototype. Accounts, orders, carts, favorites, and saved mods are stored only in the browser session or memory. A production version should use a backend, secure password hashing, server-side role checks, a database, and a real payment provider.
