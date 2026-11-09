# Bicol Peaks — ReactJS

This project uses React and Vite to render the Bicol Peaks site from one HTML entry point.

## Requirements
- Node.js 18 or newer
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the local URL shown by Vite (usually http://localhost:5173).

## Production build
```bash
npm run build
npm run preview
```

## React app structure
- `index.html` — the only HTML entry point; Vite mounts the React app here.
- `src/App.jsx` — page routing, theme state, and shared layout.
- `src/components/Header.jsx` — responsive navigation and theme control.
- `src/components/HeroCarousel.jsx` — homepage image carousel.
- `src/components/DestinationCard.jsx` — featured destination card.
- `src/components/Pages.jsx` — React views for Peaks, Provinces, About, and destination details.
- `src/components/Footer.jsx` — shared footer.
- `src/data/destinations.js` — province and destination data.

All navigation is handled in React using hash routes (`#/`, `#/peaks`, `#/provinces`, and `#/about`), so separate HTML files are not needed.

## Interactive features
1. Mobile navigation menu open/close, including the Escape key.
2. Light/dark theme toggle with the preference saved in localStorage.
3. Homepage image carousel with previous/next controls and automatic slide changes.
4. Destination search, type filters, province browsing, and destination detail dialogs.
5. About page FAQ accordion and contact form validation.

## Documentation screenshots
Open the site locally and insert your own screenshots into `documentation.pdf` where indicated. The screenshot spaces are placeholders.
