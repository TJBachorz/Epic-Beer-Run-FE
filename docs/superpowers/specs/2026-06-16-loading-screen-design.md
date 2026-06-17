# Loading Screen Redesign

**Date:** 2026-06-16  
**Branch:** visual-update

## Problem

The existing loading experience uses a GIF (`./loading.gif`) rendered at `z-index: -1`, placing it behind all map SVG content where it is largely invisible. It is dismissed via a hard-coded 6-second `setTimeout` in `MapContainer.js` with no connection to actual data load state. The GIF's visual style does not match the app's dark navy / amber theme.

## Goal

Replace the GIF with a full-screen branded overlay featuring an animated CSS beer glass fill. The overlay dismisses when the brewery API fetch completes (or fails), not on a fixed timer.

## Design

### Component

A new `LoadingScreen` component at `src/components/LoadingScreen.js`.

- Renders a `position: fixed`, full-viewport overlay (`z-index: 9999`) over all app content
- Accepts a single `isLoading` boolean prop
- When `isLoading` flips `false`, applies a 400ms CSS fade-out via a transitioning class, then unmounts (using a short `useEffect` delay to let the transition finish before removing from DOM)

### Visual Layout

Centered on `#0f1923` background:

1. **"EPIC BEER RUN"** — Syncopate font, white, ~40px, letter-spacing 4px
2. **Beer mug SVG** — inline SVG, ~160px tall
   - Mug outline and handle in white/light grey
   - Amber liquid fill (`#f5a623`) animates from 0% → 75% mug height over 1.8s, loops via `@keyframes`
   - Gentle wave on the liquid surface: subtle `border-radius` variation on the fill rect
   - Foam layer (white, slightly transparent) fades in as the liquid nears the top
3. **"Loading breweries..."** — Roboto Slab, `#f5a623`, 13px, slow opacity pulse (0.4 → 1 → 0.4, ~2s loop)

### Data Flow

`App.js` manages a new `isLoading` state (initial value `true`).

```
App.js
  isLoading: true  →  fetchDataAndSetState()
                         .then(data => {
                           setBreweryDB(data)
                           setIsLoading(false)   // ← triggers overlay fade-out
                         })
                         .catch(() => setIsLoading(false))  // ← also dismisses on error

  <LoadingScreen isLoading={isLoading} />  ← rendered above all other children
```

`MapContainer.js` — remove the `useEffect` `setTimeout` block and the `<img className="loading" .../>` element entirely.

`App.css` — remove the `.loading` rule.

### Animation Spec

```css
@keyframes beer-fill {
  0%   { height: 0%; }
  100% { height: 75%; }
}

@keyframes foam-appear {
  0%, 60% { opacity: 0; }
  100%     { opacity: 1; }
}

@keyframes text-pulse {
  0%, 100% { opacity: 0.4; }
  50%       { opacity: 1; }
}

@keyframes overlay-fadeout {
  from { opacity: 1; }
  to   { opacity: 0; }
}
```

### Error Handling

If the brewery fetch fails, `setIsLoading(false)` is called in the `.catch()` block. The overlay dismisses and the app renders in its empty state — users are never stuck on the loading screen.

## Files Changed

| File | Change |
|------|--------|
| `src/components/LoadingScreen.js` | New component |
| `src/App.js` | Add `isLoading` state, tie to fetch, render `<LoadingScreen>` |
| `src/components/MapContainer.js` | Remove `setTimeout` effect and `<img className="loading">` |
| `src/App.css` | Remove `.loading` rule, add loading screen styles |
