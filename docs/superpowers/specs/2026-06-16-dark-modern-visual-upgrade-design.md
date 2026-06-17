# Dark & Modern Visual Upgrade — Design Spec

**Date:** 2026-06-16  
**Branch:** `visual-update`

## Overview

Full visual restyle of Epic Beer Run from a rustic/vintage white-background aesthetic to a dark, modern premium look. Direction chosen: deep navy page background, dark blue-grey card panels, amber/gold accent color, clean sans-serif header font.

The topoJSON map components (`USMap`, `NEMap`, `AlaskaMap`, `HawaiiMap`, `MapContainer`) are **explicitly out of scope** — do not modify them.

---

## Color Palette

| Role | Old | New |
|---|---|---|
| Page background | `#ffffff` | `#0f1923` |
| Card / panel background | postcard image / white | `#1e2d3d` |
| Primary accent | `#104547` (teal) | `#f5a623` (amber) |
| Primary text | `black` | `#ffffff` |
| Secondary text | — | `#888888` |
| Subtle border / divider | `gray` / `gainsboro` | `#2a3d52` |

---

## Typography

- **Header title:** Switch from `Rye` (cursive) to `Syncopate` (already imported, has a modern tech feel)
- **Body / cards:** Keep `Roboto Slab`
- **Card detail text:** Drop `Special Elite`; use plain `Roboto Slab` or system sans-serif
- Remove `Rye` and `Special Elite` from active use (keep in the import in case reverting is needed)

---

## Component Changes

### 1. Global Styles — `src/index.css` + `src/App.css`

- `body`: add `background: #0f1923; color: #fff;`
- Replace every `#104547` teal reference in `App.css` with `#f5a623`
- Remove external `background-image` URLs from `header` and `footer` rules
- Update `.destination-name`, `.destination-location` text-shadow to use dark background-appropriate values

### 2. Header — `src/components/Header.js` + `App.css`

**Markup:** No structural changes needed.

**CSS changes to `header` rule:**
- Remove `background-image` (beer bar photo URL)
- Set `background: linear-gradient(135deg, #0f1923 0%, #1e2d3d 100%)`
- Change `border-bottom` color from `#104547` to `#f5a623`
- Change `header > h1` font-family from `Rye` to `Syncopate`
- Keep `color: wheat` on h1 (reads as warm white against dark background — acceptable) or update to `#ffffff`
- Slogan: change color to `#f5a623`, increase letter-spacing to `2px`

### 3. Brewery Cards — `src/components/BreweryCard.js` + `App.css`

**Markup changes:**
- Add a `Visit` link anchor wrapping brewery name (currently the `<a>` is inside `<h5>` — surface it as a separate styled link below the pin button)

**CSS changes to `.card` rule:**
- Remove `background-image: url("./post-card.jpeg")`
- Set `background: #1e2d3d; border-radius: 10px; border-left: 3px solid #f5a623; box-shadow: 0 4px 16px rgba(0,0,0,0.4)`
- Remove `box-shadow: 5px 5px #888888`

**CSS changes to `.card-info`:**
- Remove hardcoded margins (`margin-right: 141px`, `margin-top: 52px`) — these were offsets for the postcard image
- Set `margin: 0; padding: 16px; width: 100%`
- Font-family: `Roboto Slab` (drop `Special Elite`)

**CSS changes to `.marker-button`:**
- Style as amber pill: `background: #f5a623; color: #0f1923; border-radius: 20px; padding: 4px 12px; font-size: 11px; font-weight: 700; width: auto; height: auto`

**`.card-info > p`:** color `#888`, font-size `11px`

**`.card-info > h5 > a`:** color `#fff`, font-weight `600`

### 4. Footer — `src/components/Footer.js` + `App.css`

**Markup:** No structural changes.

**CSS changes to `footer` rule:**
- Remove `background-image` (bar photo URL)
- Set `background: #0f1923`
- Change `border-top` color from `#104547` to `#f5a623`
- Remove `background-color: white`

**CSS changes to `footer > h3 > a`:**
- Change color from `wheat` to `#f5a623`
- Remove `text-shadow`
- Add `letter-spacing: 1px`

### 5. Road Trip Section — `src/components/RoadTrip.js`, `DestinationCardContainer.js`, `DestinationCard.js`

#### `RoadTrip.js`
- Remove octopus image and `.road-trip-header` — replace with an inline dark panel header:
  - Left: "Your Road Trip" title + "Drag to reorder your stops" subtitle
  - Right: "Get Directions ↗" amber button (links to Google Maps directions with coordinates, or just a placeholder `href="#"` for now)
- Wrap the whole section in a `div` with `className="roadtrip-panel"` (new dark container)

#### `DestinationCardContainer.js`
- Replace the `styled-components` `DestinationList` with a plain `div` + CSS class `destination-list`
- New CSS in `App.css` for `.destination-list`: `display: flex; flex-direction: row; gap: 12px; overflow-x: auto; padding: 4px 4px 16px; align-items: center`
- Add amber `→` arrow dividers between cards (rendered in the map inside `DestinationCardContainer`)

#### `DestinationCard.js`
- Replace `styled-components` `DestinationInfo` with a plain `div` + CSS class `destination-stop`
- Remove `background-image` (beer mug photo)
- New CSS in `App.css` for `.destination-stop`:
  ```
  background: #1e2d3d;
  border-radius: 10px;
  padding: 16px;
  border: 1px solid #2a3d52;
  min-width: 160px;
  cursor: grab;
  position: relative;
  ```
- Add numbered stop label using `index + 1` (e.g. "Stop 1")
- Add drag handle icon (`⠿`) in top-right corner
- Style destination name in white, city/state in `#888`
- Active/dragging state: `border-color: #f5a623; box-shadow: 0 8px 24px rgba(245,166,35,0.2)`

**New CSS rules to add to `App.css`:**
```css
.roadtrip-panel { background: #0f1923; border-radius: 12px; padding: 32px; margin: 32px auto; max-width: 1100px; border: 1px solid #2a3d52; }
.roadtrip-panel-header { display: flex; align-items: center; justify-content: space-between; padding-bottom: 20px; border-bottom: 1px solid #1e2d3d; margin-bottom: 24px; }
.directions-button { background: #f5a623; border: none; color: #0f1923; padding: 8px 18px; border-radius: 20px; font-size: 12px; font-weight: 700; cursor: pointer; }
.stop-number { color: #f5a623; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
.stop-drag-handle { position: absolute; top: 10px; right: 10px; color: #555; font-size: 14px; }
.stop-arrow { color: #2a3d52; font-size: 20px; flex-shrink: 0; align-self: center; }
```

---

## What NOT to Touch

| File | Reason |
|---|---|
| `src/components/USMap.js` | topoJSON — touchy, no visual changes needed |
| `src/components/NEMap.js` | topoJSON — same |
| `src/components/AlaskaMap.js` | topoJSON — same |
| `src/components/HawaiiMap.js` | topoJSON — same |
| `src/components/MapContainer.js` | orchestrates maps — leave grid layout alone |

The only map-adjacent change allowed: if the `.map-container` grid background is visibly white against the dark page, add `background: transparent` — nothing else.

---

## Files Modified

1. `src/index.css`
2. `src/App.css`
3. `src/components/Header.js` (minor)
4. `src/components/Footer.js` (none — CSS only)
5. `src/components/BreweryCard.js` (minor markup)
6. `src/components/RoadTrip.js` (replace header section, add panel wrapper)
7. `src/components/DestinationCardContainer.js` (remove styled-components, add arrows)
8. `src/components/DestinationCard.js` (remove styled-components, add stop number + handle)
