# Loading Screen Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the broken GIF loading overlay with a full-screen branded loading screen featuring an animated SVG beer glass fill, dismissed when the brewery API fetch completes.

**Architecture:** A new `LoadingScreen` component renders as a fixed full-viewport overlay in `App.js`, controlled by an `isLoading` boolean state that flips false in both the `.then()` and `.catch()` of the brewery fetch. `MapContainer.js` has its `setTimeout` DOM-manipulation hack removed entirely. The animation is pure CSS keyframes — no image assets or libraries.

**Tech Stack:** React 16.14.0, @testing-library/react 9.5.0, @testing-library/jest-dom 4.2.4, CSS keyframe animations, inline SVG.

## Global Constraints

- React 16 — no hooks unavailable in that version (all used hooks: `useState`, `useEffect` are fine)
- @testing-library/react v9 — use `render` destructuring, NOT `screen.*`; use `waitForElement` not `waitFor`
- @testing-library/jest-dom v4 — imported via `@testing-library/jest-dom/extend-expect` (already in `setupTests.js`)
- Colors: background `#0f1923`, amber accent `#f5a623`, white `#ffffff`
- Fonts: title uses `'Syncopate'` (already loaded via Google Fonts in App.css), subtitle uses `'Roboto Slab'`
- No new npm packages

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/LoadingScreen.js` | **Create** | Overlay component: SVG beer mug, CSS animation, fade-out on unmount |
| `src/App.js` | **Modify** | Add `isLoading` state, tie to fetch, render `<LoadingScreen>` |
| `src/components/MapContainer.js` | **Modify** | Remove `useEffect` setTimeout hack and `<img className="loading">` |
| `src/App.css` | **Modify** | Remove `.loading` rule, add all loading screen styles |
| `src/App.test.js` | **Modify** | Replace broken default test with App loading-state tests |
| `src/components/LoadingScreen.test.js` | **Create** | Unit tests for LoadingScreen show/hide behaviour |

---

## Task 1: Create LoadingScreen component (TDD)

**Files:**
- Create: `src/components/LoadingScreen.test.js`
- Create: `src/components/LoadingScreen.js`
- Modify: `src/App.css` (loading screen styles only — `.loading` rule removal is Task 3)

**Interfaces:**
- Produces: `LoadingScreen({ isLoading: boolean })` — default export from `src/components/LoadingScreen.js`
  - When `isLoading={true}`: renders a `<div role="status">` overlay in the DOM
  - When `isLoading` transitions `true → false`: overlay gets class `loading-overlay--fade`, unmounts after 400ms

- [ ] **Step 1: Write the failing tests**

Create `src/components/LoadingScreen.test.js`:

```javascript
import React from 'react';
import { render, act } from '@testing-library/react';
import LoadingScreen from './LoadingScreen';

describe('LoadingScreen', () => {
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  test('renders overlay when isLoading is true', () => {
    const { getByRole } = render(<LoadingScreen isLoading={true} />);
    expect(getByRole('status')).toBeInTheDocument();
  });

  test('removes overlay 400ms after isLoading becomes false', () => {
    const { rerender, queryByRole } = render(<LoadingScreen isLoading={true} />);
    rerender(<LoadingScreen isLoading={false} />);
    act(() => { jest.advanceTimersByTime(400); });
    expect(queryByRole('status')).not.toBeInTheDocument();
  });

  test('overlay has fade class when isLoading becomes false before timer fires', () => {
    const { rerender, getByRole } = render(<LoadingScreen isLoading={true} />);
    rerender(<LoadingScreen isLoading={false} />);
    // Before 400ms fires — element still visible but fading
    expect(getByRole('status')).toHaveClass('loading-overlay--fade');
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- --watchAll=false --testPathPattern=LoadingScreen
```

Expected: 3 failures — `Cannot find module './LoadingScreen'`

- [ ] **Step 3: Add loading screen CSS to App.css**

Open `src/App.css` and append these rules at the bottom (do NOT remove the `.loading` rule yet — that's Task 3):

```css
/* Loading Screen Overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #0f1923;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-overlay--fade {
  animation: overlay-fadeout 0.4s ease-out forwards;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.loading-title {
  font-family: 'Syncopate', sans-serif;
  font-size: 38px;
  color: #ffffff;
  letter-spacing: 4px;
  font-weight: 700;
  margin: 0;
}

.beer-liquid {
  transform-origin: bottom;
  transform-box: fill-box;
  animation: beer-fill 1.8s ease-in-out infinite alternate;
}

.beer-foam {
  animation: foam-appear 1.8s ease-in-out infinite alternate;
}

.loading-text {
  font-family: 'Roboto Slab', serif;
  color: #f5a623;
  font-size: 13px;
  letter-spacing: 2px;
  margin: 0;
  animation: text-pulse 2s ease-in-out infinite;
}

@keyframes beer-fill {
  0%   { transform: scaleY(0.05); }
  100% { transform: scaleY(0.78); }
}

@keyframes foam-appear {
  0%, 55% { opacity: 0; }
  80%, 100% { opacity: 1; }
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

- [ ] **Step 4: Create LoadingScreen.js**

Create `src/components/LoadingScreen.js`:

```javascript
import React, { useState, useEffect } from 'react';

export default function LoadingScreen({ isLoading }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setFading(true);
      const timer = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div
      className={`loading-overlay${fading ? ' loading-overlay--fade' : ''}`}
      role="status"
      aria-label="Loading Epic Beer Run"
    >
      <div className="loading-content">
        <h2 className="loading-title">EPIC BEER RUN</h2>
        <svg
          viewBox="0 0 100 145"
          width="110"
          height="145"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <clipPath id="mug-interior">
            <rect x="12" y="23" width="58" height="99" />
          </clipPath>
          <rect
            x="10" y="20" width="62" height="105"
            rx="5" fill="none"
            stroke="#e0e0e0" strokeWidth="3"
          />
          <path
            d="M72 45 Q92 45 92 72 Q92 99 72 99"
            fill="none" stroke="#e0e0e0" strokeWidth="3"
          />
          <rect
            className="beer-liquid"
            x="12" y="23" width="58" height="99"
            fill="#f5a623"
            clipPath="url(#mug-interior)"
          />
          <g className="beer-foam" clipPath="url(#mug-interior)">
            <ellipse cx="24" cy="27" rx="9" ry="7" fill="rgba(255,255,255,0.92)" />
            <ellipse cx="41" cy="24" rx="11" ry="8" fill="rgba(255,255,255,0.92)" />
            <ellipse cx="58" cy="27" rx="9" ry="7" fill="rgba(255,255,255,0.92)" />
          </g>
        </svg>
        <p className="loading-text">Loading breweries...</p>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test -- --watchAll=false --testPathPattern=LoadingScreen
```

Expected: 3 tests pass

- [ ] **Step 6: Commit**

```bash
git add src/components/LoadingScreen.js src/components/LoadingScreen.test.js src/App.css
git commit -m "feat: add LoadingScreen component with animated beer mug SVG"
```

---

## Task 2: Wire LoadingScreen into App.js (TDD)

**Files:**
- Modify: `src/App.test.js`
- Modify: `src/App.js`

**Interfaces:**
- Consumes: `LoadingScreen({ isLoading: boolean })` from Task 1
- Produces: `App` renders `<LoadingScreen isLoading={isLoading}>` where `isLoading` starts `true` and becomes `false` after `fetch('/breweries')` resolves or rejects

- [ ] **Step 1: Rewrite App.test.js with loading-state tests**

Replace the entire contents of `src/App.test.js`:

```javascript
import React from 'react';
import { render, act } from '@testing-library/react';
import App from './App';

describe('App loading state', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([])
    });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test('shows loading screen on initial render', () => {
    const { getByRole } = render(<App />);
    expect(getByRole('status')).toBeInTheDocument();
  });

  test('hides loading screen after breweries fetch resolves', async () => {
    const { queryByRole } = render(<App />);
    await act(async () => {
      await Promise.resolve(); // flush fetch mock
      await Promise.resolve(); // flush .then()
    });
    act(() => { jest.advanceTimersByTime(400); });
    expect(queryByRole('status')).not.toBeInTheDocument();
  });

  test('hides loading screen even when fetch fails', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));
    const { queryByRole } = render(<App />);
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });
    act(() => { jest.advanceTimersByTime(400); });
    expect(queryByRole('status')).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm test -- --watchAll=false --testPathPattern=App.test
```

Expected: "shows loading screen" fails (App doesn't render LoadingScreen yet); the other two may also fail.

- [ ] **Step 3: Update App.js**

Replace the contents of `src/App.js` with:

```javascript
import React, { useState, useEffect } from 'react';

import Header from './components/Header';
import MapContainer from './components/MapContainer';
import BreweryListing from './components/BreweryListing';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';

import './App.css';

function App() {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const [selectedState, setSelectedState] = useState("");
  const [breweryDB, setBreweryDB] = useState([]);
  const [coordinates, setCoordinates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDataAndSetState();
  }, []);

  const fetchDataAndSetState = () => {
    document.title = "Epic Beer Run - Map Out Your Next Great Brewery Road Trip";
    fetch(`${baseURL}/breweries`)
      .then(response => response.json())
      .then(data => {
        setBreweryDB(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  const filterOutCoordinates = (longitude, latitude) => {
    return coordinates.filter(coordinate =>
      coordinate[0] !== longitude && coordinate[1] !== latitude
    );
  };

  const findBreweryCoordinates = (longitude, latitude) => {
    return coordinates.find(coordinate =>
      coordinate[0] === longitude && coordinate[1] === latitude
    );
  };

  const logCoordinates = (brewery) => {
    const { longitude, latitude } = brewery;
    if (!findBreweryCoordinates(longitude, latitude)) {
      setCoordinates([...coordinates, [longitude, latitude, brewery]]);
    } else {
      setCoordinates(filterOutCoordinates(longitude, latitude));
    }
  };

  return (
    <div className="App">
      <LoadingScreen isLoading={isLoading} />
      <Header />
      <MapContainer
        setSelectedState={setSelectedState}
        coordinates={coordinates}
      />
      <BreweryListing
        breweries={breweryDB}
        selectedState={selectedState}
        logCoordinates={logCoordinates}
        coordinates={coordinates}
        setCoordinates={setCoordinates}
      />
      <Footer />
    </div>
  );
}

export default App;
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test -- --watchAll=false --testPathPattern=App.test
```

Expected: 3 tests pass

- [ ] **Step 5: Commit**

```bash
git add src/App.js src/App.test.js
git commit -m "feat: wire LoadingScreen into App, tie to brewery API fetch"
```

---

## Task 3: Remove old loading mechanism from MapContainer

**Files:**
- Modify: `src/components/MapContainer.js`
- Modify: `src/App.css`

**Interfaces:**
- Consumes: nothing new
- Produces: `MapContainer` no longer touches `.loading` DOM node; `.loading` CSS rule gone

- [ ] **Step 1: Remove the setTimeout and img from MapContainer.js**

Open `src/components/MapContainer.js`. Remove the entire `useEffect` block (lines 14–19) and the `<img className="loading" .../>` line (line 29).

The file should look like this after the edit:

```javascript
import React, { useState } from 'react';

import AlaskaMap from './AlaskaMap';
import HawaiiMap from './HawaiiMap';
import USMap from './USMap';
import NEMap from './NEMap';

import ReactTooltip from "react-tooltip";

export default function MapContainer({ setSelectedState, coordinates }) {

    const [toolTipContent, setToolTipContent] = useState("")

    return (
        <div className="map-container">
            <AlaskaMap 
                className="alaska" 
                setSelectedState={setSelectedState}
                coordinates={coordinates}
            />
            <ReactTooltip>{toolTipContent}</ReactTooltip>
            <USMap 
                className="us-map" 
                setSelectedState={setSelectedState}
                coordinates={coordinates}
                toolTip={setToolTipContent}
                toolTipContent={toolTipContent}
            />
            <ReactTooltip>{toolTipContent}</ReactTooltip>
            <NEMap 
                className="ne-map" 
                setSelectedState={setSelectedState}
                coordinates={coordinates}
            />
            <HawaiiMap 
                className="hawaii-map" 
                setSelectedState={setSelectedState}
            />
        </div>
    )
}
```

- [ ] **Step 2: Remove the `.loading` rule from App.css**

Open `src/App.css`. Delete the `.loading` block (lines 48–54):

```css
.loading {
    position: absolute;
    height: 400px;
    left: 30%;
    top: 20%;
    z-index: -1;
}
```

- [ ] **Step 3: Run the full test suite to confirm nothing broke**

```bash
npm test -- --watchAll=false
```

Expected: all tests pass (LoadingScreen: 3, App: 3)

- [ ] **Step 4: Commit**

```bash
git add src/components/MapContainer.js src/App.css
git commit -m "chore: remove old GIF-based loading mechanism from MapContainer"
```

---

## Manual Smoke Test

After all tasks are committed:

```bash
npm start
```

Open `http://localhost:3000` and verify:
1. Dark navy full-screen overlay appears immediately on load
2. "EPIC BEER RUN" title visible in Syncopate font
3. Beer glass SVG animates — amber liquid fills from bottom, foam appears at top, repeats
4. "Loading breweries..." text pulses in amber
5. Once the API responds, overlay fades out smoothly over ~400ms
6. Map and brewery listing are visible underneath after fade completes
