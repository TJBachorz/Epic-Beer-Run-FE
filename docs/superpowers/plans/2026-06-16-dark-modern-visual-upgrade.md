# Dark & Modern Visual Upgrade — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle Epic Beer Run from a rustic/vintage white aesthetic to a dark modern look with a deep navy background, dark-blue card panels, and amber/gold accents.

**Architecture:** All changes are CSS and JSX only — no new components, no new dependencies. Styled-components are removed from DestinationCard and DestinationCardContainer in favour of plain CSS classes in App.css. Map components (USMap, NEMap, AlaskaMap, HawaiiMap, MapContainer) are NOT touched.

**Tech Stack:** React, CSS (App.css / index.css), react-beautiful-dnd (existing)

**Dev server:** `NODE_OPTIONS=--openssl-legacy-provider REACT_APP_BASE_URL=https://epic-beer-run-be-1.onrender.com npm start` — requires `source ~/.nvm/nvm.sh` first in WSL. Verify changes at http://localhost:3000.

---

## File Map

| File | Change |
|---|---|
| `src/index.css` | Dark body background |
| `src/App.css` | Major restyle — header, footer, cards, road trip, global tokens |
| `src/components/BreweryCard.js` | Replace `<img>` in pin button with text |
| `src/components/RoadTrip.js` | Remove octopus image, add dark panel wrapper + section header |
| `src/components/DestinationCardContainer.js` | Remove styled-components, plain div + arrows |
| `src/components/DestinationCard.js` | Remove styled-components, plain div + stop number + drag handle |

**DO NOT TOUCH:** `USMap.js`, `NEMap.js`, `AlaskaMap.js`, `HawaiiMap.js`, `MapContainer.js`

---

## Task 1: Dark global foundation

**Files:**
- Modify: `src/index.css`
- Modify: `src/App.css` (top-level rules only — link defaults, top-button, loading)

- [ ] **Step 1: Set dark body background in index.css**

Replace the entire contents of `src/index.css` with:

```css
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #0f1923;
  color: #ffffff;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
```

- [ ] **Step 2: Update global link defaults and top-button in App.css**

In `src/App.css`, replace the `a, a:visited` rule (near the bottom):

```css
a, a:visited {
  text-decoration: none;
  color: #ffffff;
}
```

Replace the `.top-button` rule:

```css
.top-button {
  font-family: 'Roboto Slab', serif;
  position: fixed;
  color: #0f1923;
  height: 40px;
  width: 44px;
  line-height: 45px;
  left: 92.5%;
  top: 87.5%;
  background-color: #f5a623;
  font-size: 30px;
  z-index: 3;
  border-radius: 2px;
  border: none;
  outline: 0;
  font-size: 45px;
}
```

Replace the `.breweries-card-container` rule to update its border color:

```css
.breweries-card-container {
  display: grid;
  grid-template-columns: repeat(4, 300px);
  grid-auto-rows: auto;
  grid-row-gap: 1em;
  grid-column-gap: 2em;
  border-top: 2px solid #2a3d52;
  padding-top: 20px;
}
```

- [ ] **Step 3: Verify in browser**

Open http://localhost:3000. The page background should now be dark navy (`#0f1923`). The map area and cards will look broken temporarily — that's expected and fixed in later tasks.

- [ ] **Step 4: Commit**

```bash
git add src/index.css src/App.css
git commit -m "style: dark global foundation — navy background, amber top-button"
```

---

## Task 2: Header restyle

**Files:**
- Modify: `src/App.css` (header rules only)

- [ ] **Step 1: Replace the `header` and related rules in App.css**

Replace the `header` rule:

```css
header {
  background: linear-gradient(135deg, #0f1923 0%, #1e2d3d 100%);
  background-repeat: unset;
  background-size: unset;
  background-position: unset;
  height: 140px;
  font-family: 'Syncopate', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  margin-bottom: 70px;
  width: 100%;
  border-bottom: 4px solid #f5a623;
}
```

Replace the `header > h1` rule:

```css
header > h1 {
  font-size: 56px;
  padding: 0;
  margin: 0;
  color: #ffffff;
  text-shadow: none;
  letter-spacing: 4px;
  font-weight: 700;
}
```

Replace the `.slogan` rule:

```css
.slogan {
  margin-top: 6px;
  font-size: 12px;
  color: #f5a623;
  letter-spacing: 3px;
  text-transform: uppercase;
  text-shadow: none;
}
```

- [ ] **Step 2: Verify in browser**

The header should show a dark gradient background, "EPIC BEER RUN" in white Syncopate font with wide letter-spacing, an amber tagline, and an amber bottom border. No beer-bar photo.

- [ ] **Step 3: Commit**

```bash
git add src/App.css
git commit -m "style: dark gradient header with Syncopate font and amber accent"
```

---

## Task 3: Footer restyle

**Files:**
- Modify: `src/App.css` (footer rules only)

- [ ] **Step 1: Replace the `footer` and related rules in App.css**

Replace the `footer` rule:

```css
footer {
  background: #0f1923;
  background-image: none;
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 70px;
  width: 100vw;
  border-top: 2px solid #f5a623;
}
```

Replace the `footer > h3 > a, footer > h3 > a:visited` rule:

```css
footer > h3 > a, footer > h3 > a:visited {
  color: #f5a623;
  text-shadow: none;
  font-size: 16px;
  font-family: 'Roboto Slab', serif;
  letter-spacing: 1px;
}
```

- [ ] **Step 2: Verify in browser**

Scroll to the bottom. The footer should show a plain dark background with an amber top border and amber GitHub/LinkedIn/Email links. No bar photo.

- [ ] **Step 3: Commit**

```bash
git add src/App.css
git commit -m "style: dark footer with amber border and links"
```

---

## Task 4: Brewery card restyle

**Files:**
- Modify: `src/App.css` (`.card`, `.card-info`, `.marker-button`, `h5 > a` rules)
- Modify: `src/components/BreweryCard.js` (replace img in button with text)

- [ ] **Step 1: Update BreweryCard.js — replace image button with text**

Replace the entire contents of `src/components/BreweryCard.js`:

```jsx
import React from 'react';

export default function BreweryCard({ brewery, logCoordinates }) {

    const handleClick = () => {
        logCoordinates(brewery)
    }

    return (
        <section className={`card ${brewery.name}`}>
            <div className="card-info">
                <h5>
                    <a href={brewery.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {brewery.name}
                    </a>
                </h5>
                <p>{`${brewery.city}, ${brewery.state}`}</p>
                <button className="marker-button" onClick={handleClick}>
                    📍 Pin
                </button>
            </div>
        </section>
    )
}
```

- [ ] **Step 2: Update card CSS rules in App.css**

Replace the `.card` rule:

```css
.card {
  background: #1e2d3d;
  background-image: none;
  border-radius: 10px;
  border-left: 3px solid #f5a623;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}
```

Replace the `.card-info` rule:

```css
.card-info {
  z-index: 2;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
  margin: 0;
  font-family: 'Roboto Slab', serif;
  box-sizing: border-box;
}
```

Replace the `.card-info > p` rule:

```css
.card-info > p {
  font-size: 11px;
  color: #888888;
  margin: 0 0 10px 0;
  text-align: left;
  width: auto;
}
```

Replace the `.card-info > h5` rule:

```css
.card-info > h5 {
  text-align: left;
  margin: 0 0 6px 0;
  color: #ffffff;
}
```

Replace the `h5 > a, a:visited` rule:

```css
h5 > a, h5 > a:visited {
  text-decoration: none;
  color: #ffffff;
  font-weight: 600;
}
```

Replace the `button > img` rules (there are two — replace both with a single rule that hides the image since the button now uses text):

```css
button > img {
  display: none;
}
```

Replace the `.marker-button` rule:

```css
.marker-button {
  background: #f5a623;
  color: #0f1923;
  border-radius: 20px;
  padding: 5px 14px;
  font-size: 11px;
  font-weight: 700;
  width: auto;
  height: auto;
  border: none;
  cursor: pointer;
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  line-height: 1.4;
  position: static;
}
```

- [ ] **Step 3: Verify in browser**

Select a state on the map. Brewery cards should appear as dark navy panels with an amber left border, white brewery name, grey city/state text, and an amber "📍 Pin" pill button. No postcard background image.

- [ ] **Step 4: Commit**

```bash
git add src/App.css src/components/BreweryCard.js
git commit -m "style: dark brewery cards with amber accent border and pin button"
```

---

## Task 5: Road trip drag-and-drop section restyle

**Files:**
- Modify: `src/components/RoadTrip.js`
- Modify: `src/components/DestinationCardContainer.js`
- Modify: `src/components/DestinationCard.js`
- Modify: `src/App.css` (add new road trip rules, update existing destination rules)

- [ ] **Step 1: Restyle RoadTrip.js**

Replace the entire contents of `src/components/RoadTrip.js`:

```jsx
import React from 'react';

import DestinationCardContainer from './DestinationCardContainer';

import { DragDropContext } from 'react-beautiful-dnd';

export default function RoadTrip({ coordinates, setCoordinates }) {

    const findCoordinatesByID = (draggableId) => {
        return coordinates.find(
            coordinate => coordinate[2].id === +draggableId
        )
    }

    const updateCoordinates = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const migratingCoordinates = findCoordinatesByID(draggableId);
        const newCoordinates = Array.from(coordinates);
        newCoordinates.splice(source.index, 1);
        newCoordinates.splice(destination.index, 0, migratingCoordinates);
        setCoordinates(newCoordinates);
    }

    return (
        <div className="roadtrip-panel">
            <div className="roadtrip-panel-header">
                <div>
                    <h2 className="roadtrip-title">Your Road Trip</h2>
                    <p className="roadtrip-subtitle">Drag to reorder your stops</p>
                </div>
                <button className="directions-button">Get Directions ↗</button>
            </div>
            <DragDropContext onDragEnd={updateCoordinates}>
                <DestinationCardContainer
                    coordinates={coordinates}
                />
            </DragDropContext>
        </div>
    )
}
```

- [ ] **Step 2: Restyle DestinationCardContainer.js**

Replace the entire contents of `src/components/DestinationCardContainer.js`:

```jsx
import React from 'react';

import { Droppable } from 'react-beautiful-dnd';

import DestinationCard from './DestinationCard';

export default function DestinationCardContainer({ coordinates }) {

    return (
        <Droppable droppableId={"droppable-1"} direction={"horizontal"}>
            {provided => (
                <div
                    className="destination-list"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {coordinates.map((coordinate, index) => (
                        <React.Fragment key={coordinate[2].id}>
                            {index > 0 && <span className="stop-arrow">→</span>}
                            <DestinationCard
                                coordinate={coordinate}
                                index={index}
                            />
                        </React.Fragment>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}
```

- [ ] **Step 3: Restyle DestinationCard.js**

Replace the entire contents of `src/components/DestinationCard.js`:

```jsx
import React from 'react';

import { Draggable } from 'react-beautiful-dnd';


export default function DestinationCard({ coordinate, index }) {

    const idToString = () => {
        if (typeof coordinate[2].id === String && coordinate[2].id !== undefined) {
            return coordinate[2].id
        } else {
            return coordinate[2].id.toString()
        }
    }

    return (
        <Draggable key={coordinate[2].id} draggableId={idToString()} index={index}>
            {provided => (
                <div
                    className="destination-stop"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <span className="stop-drag-handle">⠿</span>
                    <div className="stop-number">Stop {index + 1}</div>
                    <div className="marker-info">
                        <p className="destination-name">
                            <a href={coordinate[2].website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {coordinate[2].name}
                            </a>
                        </p>
                        <p className="destination-location">
                            {`${coordinate[2].city}, ${coordinate[2].state}`}
                        </p>
                    </div>
                </div>
            )}
        </Draggable>
    )
}
```

- [ ] **Step 4: Add road trip CSS rules to App.css**

Add the following new rules at the end of `src/App.css` (after the last existing rule):

```css
.roadtrip-panel {
  background: #0f1923;
  border: 1px solid #2a3d52;
  border-radius: 12px;
  padding: 32px;
  margin: 0 auto 32px;
  max-width: 1100px;
}

.roadtrip-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 1px solid #1e2d3d;
  margin-bottom: 24px;
}

.roadtrip-title {
  color: #ffffff;
  font-family: 'Roboto Slab', serif;
  font-size: 22px;
  margin: 0 0 4px 0;
}

.roadtrip-subtitle {
  color: #888888;
  font-size: 12px;
  margin: 0;
}

.directions-button {
  background: #f5a623;
  border: none;
  color: #0f1923;
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  font-family: 'Roboto Slab', serif;
}

.destination-list {
  display: flex;
  flex-direction: row;
  gap: 4px;
  overflow-x: auto;
  padding-bottom: 12px;
  align-items: center;
}

.destination-stop {
  background: #1e2d3d;
  border-radius: 10px;
  padding: 16px;
  border: 1px solid #2a3d52;
  min-width: 160px;
  cursor: grab;
  position: relative;
  flex-shrink: 0;
}

.destination-stop:active {
  cursor: grabbing;
}

.stop-number {
  color: #f5a623;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.stop-drag-handle {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #555555;
  font-size: 14px;
}

.stop-arrow {
  color: #2a3d52;
  font-size: 20px;
  flex-shrink: 0;
  align-self: center;
  padding: 0 4px;
}
```

Also update the existing `.destination-name` and `.destination-location` rules in App.css:

```css
.destination-name, .destination-location {
  white-space: normal;
  font-family: 'Roboto Slab', serif;
  margin: 5px 0;
  text-align: center;
  font-weight: 600;
  text-shadow: none;
}

.destination-name a, .destination-name a:visited {
  color: #ffffff;
  font-size: 13px;
}

.destination-location {
  color: #888888;
  font-size: 11px;
  font-weight: 400;
}
```

- [ ] **Step 5: Verify in browser**

Select a state, pin several breweries. The road trip section should appear as a dark panel with:
- "Your Road Trip" heading + "Drag to reorder" subtitle on the left
- Amber "Get Directions ↗" button on the right
- Dark `#1e2d3d` stop cards with amber "Stop 1", "Stop 2" labels, drag handle (⠿), and `→` arrows between stops
- Drag reordering should still work

- [ ] **Step 6: Commit**

```bash
git add src/App.css src/components/RoadTrip.js src/components/DestinationCardContainer.js src/components/DestinationCard.js
git commit -m "style: dark road trip panel with numbered stops and drag handles"
```

---

## Task 6: Final build, deploy, and push

- [ ] **Step 1: Run production build**

```bash
NODE_OPTIONS=--openssl-legacy-provider REACT_APP_BASE_URL=https://epic-beer-run-be-1.onrender.com npm run build
```

Expected: `The build folder is ready to be deployed.` — warnings about hooks/deps are OK, errors are not.

- [ ] **Step 2: Deploy to Firebase**

```bash
npx firebase-tools deploy --only hosting
```

Expected output ends with: `✔  Deploy complete!` and a Hosting URL.

- [ ] **Step 3: Push branch and open PR**

```bash
git push -u origin visual-update
```

Then open a PR on GitHub from `visual-update` → `master`.
