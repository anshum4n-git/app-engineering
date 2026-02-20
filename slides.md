# Application Engineering — Slide Deck

---

## Slide 1 — Title

**Layout:** Full-bleed dark background. Large centered text. Subtle animated grid or circuit-line texture in the background.

**Headline:** `Application Engineering`
**Subheadline:** `Building software that humans actually love`

**Illustration:** A simple line drawing of a browser window with a heart inside it, radiating outward like a pulse signal.

---

## Slide 2 — Section Break: "Who Are Your Users?"

**Layout:** Section divider. Bold number `01` faint in background. Title centered.

**Text:**
> "You are not the user."

**Illustration:** A single question mark morphing into a crowd of silhouettes.

---

## Slide 3 — Building for Users (1/2): The Spectrum

**Layout:** Split into a horizontal row of 5 character cards, each with a small line-drawn avatar, a name, and 2-word descriptor.

**Headline:** `Your users are everyone.`

**Character Cards:**
- **Grandma Rose**, 72 — First smartphone
- **Jake**, 8 — Tap-happy gamer
- **Priya**, 34 — Power user, three monitors
- **Carlos**, 19 — 2G connection in rural Mexico
- **Sam**, 45 — Screen reader, low vision

**No bullet points.** Let the illustrations do the talking.

**Illustration:** Each character as a minimalist line portrait (no detail, just gesture and posture). Small icon beneath each showing their device/context: old phone, tablet, widescreen, feature phone, assistive device.

---

## Slide 4 — Building for Users (2/2): Same App, Wildly Different Worlds

**Layout:** 3 side-by-side phone/screen mockups, each showing the same app in a different context.

**Headline:** `Same code. Different reality.`

**Mockup 1 — Grandma Rose:** Zoomed-in text, thick finger press, misses the button.
**Mockup 2 — Jake:** Rapid taps, swipes, impatient spinner.
**Mockup 3 — Carlos:** Half-loaded image, skeleton screens, slow network banner.

**Illustration:** Simple wireframe screens with annotations (arrows + tiny labels). No real screenshots needed — line drawings convey the chaos.

---

## Slide 5 — Section Break: "Beauty is in the Eye for Detail"

**Layout:** Section divider. Bold number `02` faint in background.

**Text:**
> "Users can't name what's wrong. They just know something is."

**Illustration:** A magnifying glass hovering over a pixel grid, finding a single misaligned element.

---

## Slide 6 — Beauty is in the Eye for Detail (1/2): Anyone Can Judge

**Layout:** Two-column. Left: a "good" UI detail. Right: a "bad" UI detail. Both as simple line mockups.

**Headline:** `You don't need to be a designer to spot this.`

**Left (Good):**
- Button padding is even
- Icon and label perfectly aligned
- Hover state responds instantly

**Right (Bad):**
- Button text clips on mobile
- Spinner keeps spinning after load finishes
- Page jumps when image loads (layout shift)

**Illustration:** Side-by-side wireframe mockups with a ✓ and ✗ callout. Red wobbly arrows on the bad side.

---

## Slide 7 — Beauty is in the Eye for Detail (2/2): Performance IS the Experience

**Layout:** Full-width timeline bar showing user experience over time. Annotated with moments of friction.

**Headline:** `Slow is a bug.`

**Timeline annotations:**
- 0–100ms → Feels instant
- 100–300ms → Slight delay, user notices
- 300–1000ms → "Is this broken?"
- 1000ms+ → User leaves

**Below timeline:** Two tiny line-drawn faces: one delighted (fast load), one frustrated (spinner).

**Illustration:** Horizontal race-track line with a runner and a snail. The snail has a spinner for a head.

---

## Slide 8 — Section Break: "The Web is Unpredictable"

**Layout:** Section divider. Bold number `03` faint in background.

**Text:**
> "Complexity hides where users live."

**Illustration:** A calm-looking "Hello World" app on the left, and on the right a chaotic explosion of devices, network towers, hands, and clocks — all connected to the same app.

---

## Slide 9 — Unpredictability: Screen Sizes

**Layout:** Center illustration, minimal text below.

**Headline:** `Every screen is different.`

**Body:** `320px to 5120px. Portrait, landscape, foldable.`

**Illustration:** A line of screens from tiny smartwatch → phone → tablet → laptop → ultrawide monitor. Each shows the same layout adapting (or breaking). One screen is folded in half.

---

## Slide 10 — Unpredictability: Touch Gestures

**Layout:** Center illustration with gesture annotations.

**Headline:** `Tap ≠ Click.`

**Body:** `Fat fingers, swipe directions, long press, pinch zoom — all with zero hover state.`

**Illustration:** A large hand outline with gesture icons radiating from the fingertip: tap, swipe left/right, pinch, long-press. One finger accidentally hitting the wrong target (classic fat-finger diagram).

---

## Slide 11 — Unpredictability: Network

**Layout:** Split. Left: "Ideal" (fiber). Right: "Reality" (3G on a train).

**Headline:** `The network is not your LAN.`

**Left box text:** 10Mbps, 10ms latency — everything loads instantly
**Right box text:** 1.5Mbps, 300ms latency + packet loss — everything breaks

**Illustration:** Left: a straight highway. Right: a bumpy dirt road with potholes labeled "packet loss", "latency spike", "timeout".

---

## Slide 12 — Unpredictability: Device Performance

**Layout:** Horizontal spectrum bar.

**Headline:** `Your MacBook Pro is not their phone.`

**Spectrum bar from left to right:**
`$50 Android` → `Mid-range phone` → `iPhone 15` → `Dev Laptop`

Annotation above each: CPU cores, RAM, GPU tier.

**Illustration:** A thermometer-style bar with a fire emoji at the dev-laptop end and an ice cube at the cheap Android end. A tiny CPU character sweating at the low-end.

---

## Slide 13 — Unpredictability: Caching & Data Variability

**Layout:** Two mini-slides side-by-side within one slide.

**Left — Caching:**
**Headline:** `What the user sees ≠ what you deployed.`
**Illustration:** A user looking at an old cached version of a page while a shiny new version floats ignored above them.

**Right — Data Variability:**
**Headline:** `Your test data is lying to you.`
**Illustration:** A neat list of 3 items in dev → a production list with 0 items, 500 items, a name in Arabic, and an emoji in the title field.

---

## Slide 14 — Unpredictability: Accessibility

**Layout:** Centered, warm tone.

**Headline:** `1 in 4 adults has a disability.`

**Body:** `Screen readers. Keyboard-only navigation. High contrast. Motor impairments.`

**Illustration:** Four simple line icons in a 2x2 grid:
- Eye with a line through it (visual)
- Ear with a line through it (auditory)
- Hand trembling (motor)
- Brain with a small spark (cognitive)

Below: Same button, shown three ways — default, high contrast, with screen reader label bubble.

---

## Slide 15 — Section Break: "How Browsers Work"

**Layout:** Section divider. Bold number `04` faint in background.

**Text:**
> "Every framework is just this, dressed up."

**Illustration:** A matryoshka (nesting doll) — the outermost is "React / Vue / Angular", inner dolls reveal HTML, CSS, JS, and finally the browser engine at the core.

---

## Slide 16 — Browser Basics: Download & Parse

**Layout:** Left-to-right flow diagram.

**Headline:** `Step 1: Get the code.`

**Flow:**
`URL entered` → `DNS lookup` → `TCP handshake` → `HTTP request` → `HTML received` → `CSS + JS fetched`

**Annotation callout:** "Cookies & headers travel with every request"

**Illustration:** A simple pipe with data packets flowing through it. A cookie icon rides on the packet. A gate labeled "Cache?" with a yes/no fork.

---

## Slide 17 — Browser Basics: The Sandbox

**Layout:** A box labeled "Browser Sandbox" containing icons for CORS, CSRF, XSS protection.

**Headline:** `The browser is a bouncer.`

**Body:** `It runs untrusted code from strangers on the internet — so it locks everything down.`

**Three labeled shields:**
- CORS — "Can this origin talk to that server?"
- CSRF — "Did YOU actually send this request?"
- XSS — "Is this script trying to steal your data?"

**Illustration:** A muscular line-drawn bouncer at a velvet rope. Three sketchy figures (labeled CORS violation, CSRF, XSS) being turned away.

---

## Slide 18 — Browser Basics: The DOM Tree

**Layout:** Center — a tree diagram. Minimal surrounding text.

**Headline:** `HTML becomes a living tree.`

**Body:** `The browser parses HTML into a tree of objects. JavaScript can reach in and change any branch.`

**Illustration:** A classic tree diagram:
```
document
└── html
    ├── head
    │   └── title
    └── body
        ├── header
        │   └── nav → [links]
        └── main
            └── article
```
A small JS hand reaches in and changes a leaf node, which glows/changes color.

---

## Slide 19 — Browser Basics: Single-Threaded JavaScript

**Layout:** One lane of traffic vs. multi-lane. Simple analogy.

**Headline:** `JavaScript has one lane.`

**Body:** `All DOM work — event handling, layout, your code — shares a single thread. Block it, and everything freezes.`

**Illustration:** A single-lane road with cars queued up: `click handler`, `animation`, `fetch callback`, `your loop`. One oversized car (labeled "while(true){}") is stuck and blocking all others. Traffic jam.

---

## Slide 20 — Browser Basics: Fetch & Layout

**Layout:** Two mini-diagrams side by side.

**Left — XMLHttpRequest / Fetch:**
**Headline:** `Talk to servers without reloading.`
**Illustration:** A phone handset (browser) with a line to a server tower. Data packet travels along the line. No full page reload — just the data box updates.

**Right — Layout & Paint:**
**Headline:** `The browser renders in layers.`
**Flow:** `Style calc` → `Layout (reflow)` → `Paint` → `Composite`
**Illustration:** Four stacked transparent layers being assembled into a final screen. Each layer labeled with its step.

**Bottom callout:** "Forcing a reflow inside a loop = jank. Don't."

---

## Slide 21 — Browser Basics: Event Bubbling

**Layout:** Nested boxes (like layers of an onion), center illustration.

**Headline:** `Events travel up.`

**Body:** `A click on a button bubbles through every parent — div, section, body, document — unless you stop it.`

**Illustration:** Concentric squares: innermost = `<button>`, then `<div>`, then `<section>`, then `<body>`. A dot (click event) starts at center and arrows show it bouncing outward through each layer. One layer has a stop sign labeled `.stopPropagation()`.

---

## Slide 22 — Bridge Slide: Frameworks Are Abstractions

**Layout:** Full-width. Dramatic single statement.

**Headline:**
> "React, Vue, Angular, Svelte — they all compile down to these primitives."

**Illustration:** Four logos (or simple labeled boxes) at the top, all with arrows pointing down to one box at the bottom: `DOM + Events + Fetch + Layout`. The bottom box glows.

---

## Slide 23 — Section Break: "Browser Superpowers"

**Layout:** Section divider. Bold number `05` faint in background.

**Text:**
> "The browser is more powerful than most engineers realize."

**Illustration:** A browser window wearing a superhero cape. Small icons floating around it: database, camera, video, 3D cube, microchip.

---

## Slide 24 — Browser Advanced: Storage

**Layout:** Two columns.

**Headline:** `Data that lives on the device.`

**Left — localStorage:**
- Simple key-value store
- Persists across sessions
- ~5MB limit
- Synchronous (blocks the thread)

**Right — IndexedDB:**
- Full database in the browser
- Async, large storage
- Good for offline-first apps

**Illustration:** Two drawers. Left: a tiny filing cabinet with 5 folders. Right: a full filing room with hundreds of folders and an async loader icon.

---

## Slide 25 — Browser Advanced: Service Workers & PWA

**Layout:** Center diagram showing the SW sitting between browser and network.

**Headline:** `Your app can work offline.`

**Body:** `A Service Worker is a script that intercepts network requests — caching, background sync, push notifications.`

**PWA callout:** "Install to home screen. Works offline. Feels native."

**Illustration:** Three-layer diagram:
- Top: Browser tab (user)
- Middle: Service Worker (the interceptor, drawn like a traffic cop)
- Bottom: Network / Server

Arrows show requests going through the SW. Some arrows bounce back from a cache icon labeled "Offline mode".

---

## Slide 26 — Browser Advanced: WebRTC, Video/Audio, WASM, WebGL

**Layout:** 2×2 grid of feature cards. Each has a small icon, a name, and one punchy sentence.

**Headline:** `The browser is a platform.`

**Cards:**

| | |
|---|---|
| **WebRTC** — Peer-to-peer video/audio in the browser. No server in the middle. (Think Google Meet.) | **Video & Audio** — Native media playback, recording, streams. Full media pipeline. |
| **WASM** — Run C, Rust, Go at near-native speed. Figma, AutoCAD, entire game engines. | **WebGL / WebGPU** — GPU-accelerated graphics. 3D scenes, shaders, real-time rendering. |

**Illustration:** Four tiny line icons: webcam with two-way arrows, a play button with sound waves, a microchip with speed lines, a 3D cube with a gradient.

---

## Slide 27 — Section Break: "AI & UI"

**Layout:** Section divider. Bold number `06` faint in background.

**Text:**
> "AI writes code fast. Fast inconsistency is still inconsistency."

**Illustration:** A robot at a keyboard, typing furiously, with five slightly-different-looking buttons popping out of the screen — same label, five different styles.

---

## Slide 28 — AI & UI (1/3): AI Is Great at Code, Bad at Consistency

**Layout:** Side-by-side comparison. Clean vs. messy output.

**Headline:** `AI sees. AI generates. AI diverges.`

**Body:** `Ask AI to build a button five times. You get five buttons. Great code, inconsistent system.`

**Illustration:** Five button outlines in a row. Each is slightly different: different border-radius, different padding, different font weight. Labeled "Attempt 1" through "Attempt 5". Red circle-and-arrow pointing to the differences.

---

## Slide 29 — AI & UI (2/3): Build the System, Then Use AI

**Layout:** Flow diagram.

**Headline:** `Design systems + AI = leverage.`

**Flow:**
`Design tokens` → `Component library` → `AI writes features using the library` → `Consistent output`

**Contrast below:**

❌ `AI writes everything from scratch → inconsistency`
✅ `AI works within your system → coherence`

**Illustration:** Two paths. Top path: a builder constructing from a blueprint (system) with AI as assistant. Bottom path: AI free-styling with random blocks everywhere.

---

## Slide 30 — AI & UI (3/3): Give AI Eyes + Run in Loops

**Layout:** Center process loop diagram.

**Headline:** `Test it. Show it. Fix it. Repeat.`

**Two ideas on this slide:**

**Give AI eyes:**
`Screenshot` → `AI reviews` → `Flags visual regressions` → `Fix`
Caption: "Visual testing with AI as the reviewer"

**Agentic dev loops:**
`Write test` → `AI generates code` → `Tests run` → `AI sees failure` → `AI fixes` → `Tests pass`
Caption: "Tests are the spec. AI iterates to green."

**Illustration:** A circular loop with arrows. Each node is a small icon: camera, robot, red X, robot again, green checkmark.

---

## Slide 31 — Section Break: "Takeaways"

**Layout:** Section divider. Bold number `07` faint in background.

**Text:**
> "Great apps aren't accidents."

**Illustration:** A mountain with three paths up — user empathy, browser mastery, AI leverage — all meeting at the summit.

---

## Slide 32 — Takeaway 1: Quality Is Judged Instantly

**Layout:** Single statement slide. Warm, impactful.

**Headline:** `Poor quality is felt in milliseconds.`

**Body:** `Users don't file bug reports. They just leave.`

**Illustration:** A door with a revolving arrow — user walks in, sees a glitchy UI, walks right back out. The door spins.

---

## Slide 33 — Takeaway 2: Know Your Primitives

**Layout:** Single statement slide.

**Headline:** `Understand the browser, master any framework.`

**Body:** `Every abstraction leaks. When it does, you need to know what's underneath.`

**Illustration:** An iceberg. Above water: "React", "Vue", "Next.js". Below the waterline: DOM, fetch, layout, events, paint — the real machinery.

---

## Slide 34 — Takeaway 3: Engineer for AI Collaboration

**Layout:** Single statement slide.

**Headline:** `Upfront engineering makes AI powerful, not chaotic.`

**Body:** `Design systems. Tests. Constraints. Give AI a track to run on.`

**Illustration:** A race car (AI) on a proper track (your system) vs. the same car in an open field going nowhere. The track version crosses a finish line.

---

## Slide 35 — Closing Slide

**Layout:** Full-bleed. Warm gradient or texture. Centered.

**Large text:**
> "Build things people love."

**Smaller text below:**
`Application engineering is the craft of turning code into experience.`

**Illustration:** A simple line drawing of two hands — one holding a laptop, one holding a phone — with a small glowing heart between them. Clean. Warm. Human.

**Bottom:** Speaker name / handle / QR code area (placeholder)

---

## Slide Count Summary

| # | Slide Title |
|---|---|
| 1 | Title |
| 2 | Section: Who Are Your Users? |
| 3 | Users — The Spectrum |
| 4 | Users — Same App, Different Reality |
| 5 | Section: Beauty is in the Eye for Detail |
| 6 | Anyone Can Judge |
| 7 | Slow is a Bug |
| 8 | Section: The Web is Unpredictable |
| 9 | Screen Sizes |
| 10 | Touch Gestures |
| 11 | Network |
| 12 | Device Performance |
| 13 | Caching & Data Variability |
| 14 | Accessibility |
| 15 | Section: How Browsers Work |
| 16 | Download & Parse |
| 17 | The Sandbox (CORS, CSRF, XSS) |
| 18 | The DOM Tree |
| 19 | Single-Threaded JavaScript |
| 20 | Fetch & Layout/Paint |
| 21 | Event Bubbling |
| 22 | Bridge: Frameworks Are Abstractions |
| 23 | Section: Browser Superpowers |
| 24 | Storage (localStorage + IndexedDB) |
| 25 | Service Workers & PWA |
| 26 | WebRTC, Video/Audio, WASM, WebGL |
| 27 | Section: AI & UI |
| 28 | AI Is Great at Code, Bad at Consistency |
| 29 | Build the System, Then Use AI |
| 30 | Give AI Eyes + Run in Loops |
| 31 | Section: Takeaways |
| 32 | Takeaway 1: Quality Is Judged Instantly |
| 33 | Takeaway 2: Know Your Primitives |
| 34 | Takeaway 3: Engineer for AI Collaboration |
| 35 | Closing |
