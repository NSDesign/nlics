# NLICS — Non-Linear Image Compositing System

**Selena** — a browser-based non-linear compositing application built with React and HTML5 Canvas. Zero CSS filters — all pixel operations are pure canvas math. Supports two distinct processing contexts: **pixel** (canvas-based compositing) and **point** (geometry-driven procedural workflows).

---

## §1 · Creators

Pure generators — produce pixel or point data from parameters alone. No inputs required.

### Pixel Creators
- **Solid** — flat colour fill
- **Shape** — ellipse, rectangle, rounded-rect, polygon, star, ring; smooth/faceted/points render modes, per-vertex jitter, fill opacity
- **Gradient** — linear, radial, conic; multi-stop with per-stop alpha
- **Noise** — perlin, fbm, turbulence, worley, crystal, simplex, marble, wood, value, phasor, white; configurable octaves, lacunarity, gain, scale, seed
- **Pattern** — checkerboard, stripes, dots, diamond
- **Image** — load from device; contain/cover/fill fit modes
- **Tile** — stamps a referenced source node across a grid; per-cell randomised rotation, scale, opacity, XY nudge, flip; repeat/mirror/clamp wrap; stagger and gap modes

### Geometry Creators *(produce `_points` arrays for Point Comp)*
- **Grid** — rows × cols with stagger, offset, scale
- **Spiral** — configurable turns, start/end radius
- **Polar Grid** — rings × sectors (points per ring)
- **Phyllotaxis** — golden-angle divergence, configurable spread
- **Scatter** — seeded random distribution within bounds

---

## §2 · Compositors

### Pixel Context

**Blender** — two-input pixel compositor.
- Per-slot: source reference, Effect Stack, Mask Stack, fill opacity
- Blend: 19 modes, amount, A↔B switch, per-channel RGBA lock, Blend If (tonal gating on this layer and underlying layer luminosity)
- Output section: Effect Stack, Mask Stack, fill opacity, output opacity

**Layer Comp** — ordered pixel layer stack.
- Per-layer (Source | Fx | Mask | Layer tabs): source reference, Effect Stack, Mask Stack, blend mode, opacity, fill opacity, Blend If
- Layer context can be pixel or point
- Matte accumulation via maskMode (add/multiply/screen/subtract/normal)
- Output section: Effect Stack (pixel only), Mask Stack, opacity

**Effect Stack** *(named, reusable)* — a shareable stack of effects referenced via stack-ref items in any effect stack.

**Mask Stack** *(named, reusable)* — a shareable stack of masks referenced via stack-ref items in any mask stack.

**Promoted Tap** — captures any intermediate pipeline state (after a specific effect or mask) as a named §2 node. Created by tapping ↗ on any effect or mask card. Referenced like any compositor output; enables branching, sharing intermediate results, or building parallel processing chains.

---

### Point Context

**Point Comp ◉** — a two-stage point modifier pipeline with a full isolate mask system.

#### Architecture
```
Source (geometry creator)
  └── Source Isolate Stack       ← spatial filter on source points
        ↓
  Source Modifier Chain          ← ordered point transforms
  (each modifier has its own Isolate Stack)
        ↓
  Output Modifier Chain          ← second-pass point transforms (also with Isolate Stacks)
        ↓
  Render to canvas
        ↓
  Output Mask Stack              ← compositing mask on rendered output
```

#### Source Card (Source | Modifiers | Isolate tabs)
- **Source tab** — select any geometry creator or upstream node with `_points`
- **Modifiers tab** — ordered chain of point-context modifiers; each has Primary and Isolate tabs; enable/disable-all toggle
- **Isolate tab** — source-level isolate mask stack; `attr` name field; restricts which incoming points enter the modifier chain

#### Output Card (Modifiers | Mask tabs)
- **Modifiers tab** — second point-context chain applied before rendering; same modifier types, same Isolate functionality; enable/disable-all toggle
- **Mask tab** — mask stack applied to the rendered canvas output for compositing

#### Modifier Isolate Masks
Every modifier in the source or output chain has its own **Isolate** tab containing:
- **attr** — attribute name written to each point with its mask sample value (e.g. `isolate_1`). Used downstream as a custom attribute.
- **Mask stack** — any number of masks; each references a pixel source node, extracts a channel (luminosity / R / G / B / A), and controls which points are affected by that modifier
- Channel extraction uses raw RGB values for luminosity/R/G/B; only the alpha matte is used when channel = A

#### Isolate Mask Live Preview
- Main **◈** button on a Point Comp node shows the active isolate mask in the live preview — walks source isolate → chain item isolates → output chain isolates → outMask in priority order
- Effects in a mask's effectStack (blur, invert, levels etc.) are applied to the greyscale channel extraction before the mask is evaluated

---

## Effect Categories

Effects are organised by context. Pixel effects appear in Layer Comp, Blender, and Effect Stacks. Point effects appear only in Point Comp modifier chains. Distort and Transform effects apply in both contexts.

### Tonal *(pixel)*
`brightness` `contrast` `exposure` `levels` `curves` `posterize`

### Colour *(pixel)*
`hue-shift` `saturation` `vibrance` `colour-map` `colour` `duotone`

### Pixel *(pixel)*
`blur` `dir-blur` `sharpen` `invert` `threshold` `pixelate` `vignette` `chromatic-ab` `glow` `emboss` `edge-detect` `solarise`

### Distort *(pixel and point)*
`wave` `twirl` `bulge` `uv-distort` `polar-to-cart` `cart-to-polar`

### Transform *(pixel and point)*
`transform` `match`

- **transform** — translate, rotate, scale (uniform/X/Y). Local (pivot = shape centroid) or global (pivot = canvas centre) space.
- **match** — copies transform values from any other transform effect in the graph. Axis-selective: position X/Y, scale, rotation. Per-axis offset overrides applied after match.

### Points *(point context only)*
`show-points` `source-at-points` `point-map` `attributes` `filter` `delete` `separate` `combine`

**show-points** — renders markers (circle/dot/square/crosshair) at point positions.
- **Primary tab**: style, colour, size, opacity
- **Attributes tab**: global label positioning (X offset, Y offset, line spacing) + a list of per-label entries; each entry independently selects an attribute, colour, and font size; multiple labels stack vertically offset from each point; show/hide toggle per label

**source-at-points** — stamps source node(s) at each point position, sized by `scale`, rotated by `rotation`, weighted/sequence/attribute distribution.

**point-map** — maps any point attribute through a curve to drive scale, rotation, opacity, x, y, sourceIndex, or a custom attribute.

**attributes** — adds, sets, removes, or renames arbitrary point attributes.

**filter** — keeps only points where `attr op value` is true. Ops: `>` `>=` `<` `<=` `==` `!=`.

**delete** — removes points matching a threshold condition.

**separate** — tags points with `_setGroup` A/B by threshold on a named attribute.

**combine** — union or intersection of two named point sets.

---

## Masking System

### Pixel Masks
Every effect can carry a **Mask Stack**; every mask can carry an **Effect Stack**. Nesting is unlimited:

```
Effect Stack
  └── Effect (e.g. blur)
        └── Mask Stack
              └── Mask (references any node)
                    └── Effect Stack (e.g. threshold to sharpen mask edge)
```

**Mask controls:** source reference, channel extraction (luminosity / R / G / B / A), fill opacity, invert, blend mode (multiply/screen/add/subtract/normal), opacity, Blend If.

Channel extraction: for luminosity/R/G/B, raw pixel values are used directly without alpha multiplication. The alpha matte is only used when channel = A. This ensures pixel sources (noise, gradients, images) produce meaningful spatial masks from their colour content regardless of transparency.

### Isolate Masks *(Point Comp)*
The point-context equivalent of Mask Stacks. Each modifier (source chain and output chain) has its own isolate mask stack that spatially restricts which points the modifier affects. Custom attribute names are written per-point for downstream use.

### Custom Attributes in Selectors
Attribute selectors (filter, delete, separate, show-points label, point-map input) automatically include:
- Built-in geometry attributes (`x`, `y`, `pointIndex`, `row`, `col`, `spiralT`, etc. — type-specific)
- Source-level isolate attribute
- Per-modifier isolate attributes from the chain
- Named attributes created by `attributes` modifier ops
- System attributes: `_modIdx`, `_setGroup`

### Stack Enable/Disable All
Every stack (Effect Stack, Mask Stack, modifier chain) has a `●/○` bypass toggle in the footer. Clicking it enables all items when any are disabled, or disables all items when all are enabled. Useful for A/B comparison.

---

## Effect & Modifier Cards

### Type Badge + Swap Picker
Both **pixel effects** (EfxCard) and **point modifiers** (PointChainItemCard) display their type as a split badge with a `⇄` swap button:
- Modifier badge: teal, consistent with the point context colour
- Effect badge: neutral, consistent with the pixel context styling
- Clicking `⇄` opens a picker to replace the current effect/modifier type; non-type settings (name, enabled state, isolate, masks) are preserved across the swap

### Tab Layout
Both card types use a tab layout to separate settings:
- **Pixel effects**: Primary (params) | Layer (opacity/blend/Blend If) | Mask (mask stack)
- **Point modifiers**: Primary (params) | Isolate (isolate mask stack) — render utilities (show-points, source-at-points) have only Primary
- **show-points**: Primary (marker settings) | Attributes (multi-label list + global offset/spacing)
- Tab state is preserved when switching between sections — cards are kept mounted with `display:none` rather than unmounted

---

## Live Preview

### Preview Controls
- **Size** — output resolution: 256 / 400 / 512 / 768 / 1024 px (square)
- **Zoom** — 25% to 400%; 1:1 button
- **Format** — PNG / JPEG / WebP
- **↓** — download canvas at selected format
- **⊡/⊠** — floating bars toggle (top-right, always visible): hides/shows both the top control bar and bottom status bar; the canvas expands to fill the freed space

### Display Modes
- **Normal** — composite pixel output of the selected node
- **◈ Matte** — node's effective matte/alpha channel. For pixel nodes: outMask → input mattes → intrinsic alpha. For Point Comp: source isolate → chain item isolates → output chain isolates → outMask
- **Slot display** — clicking display buttons on individual slots or isolate tabs shows that specific channel greyscale in the main preview

---

## Rendering Pipeline

- All pixel effects: pure `ImageData` manipulation — zero CSS filters
- Blur: premultiplied alpha box blur, open-boundary sampling (no edge bleed at canvas edges)
- Transform: oversized 3× offscreen buffer prevents clipping
- BlendIf: per-pixel tonal gating on both `thisLayer` and `underlyingLayer` luminosity
- Matte system: `source_alpha × maskStack` computed independently from pixel blend; matte accumulation in Layer Comp is a separate pass
- Point Comp rendering: source points → source isolate filter → source chain → output chain → render to canvas → output mask → output opacity

---

## UI & Settings

### Layout
- **Split layout** (default): resizable panels — left (node list), right (preview), bottom (properties)
- **Unified scroll**: preview pinned or scrollable; sticky/flowing section headers
- **Panel style**: inline expansion or bottom sheet
- All layout settings persisted to `localStorage`

### Project Management
- **Save** (↓): downloads `.nlics` JSON file including all nodes, settings, and active display node
- **Load** (↑): opens project from file or recent list
- **Recent projects**: maintained automatically; set any entry as the startup default
- **Default project**: loads on app start; captures the live display node at the moment of setting
- **Auto-save**: on configurable interval and on page unload; includes display node state

### Keyboard & Interaction
- Undo: Ctrl/Cmd+Z — 30-state ring
- Double-tap node name to rename inline
- Drag dividers to resize panels

---

## Tech Stack

React 18 · HTML5 Canvas 2D · IBM Plex Mono + Syne (Google Fonts) · Vite 6 · No external image processing libraries
