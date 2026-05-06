# NLICS — Non-Linear Image Compositing System

A browser-based non-linear compositing application built with React and HTML5 Canvas. Zero CSS filters — all pixel operations are pure canvas math.

## §1 · Creators

### Creators
Pure generators — produce pixel or point data from parameters alone:
- **Solid** — flat colour fill
- **Shape** — ellipse, rectangle, rounded-rect, polygon, star, ring; smooth/faceted/points render modes, per-vertex jitter
- **Gradient** — linear, radial, conic; multi-stop with per-stop alpha
- **Noise** — perlin, fbm, turbulence, worley, crystal, simplex, marble, wood, value, phasor, white
- **Pattern** — checkerboard, stripes, dots, diamond
- **Image** — load from device; contain/cover/fill fit modes

**Geometry creators** (produce `_points` arrays consumed by Point Comp):
- **Grid** — rows × cols with stagger, offset, scale
- **Spiral** — configurable turns, start/end radius
- **Polar Grid** — rings × points-per-ring
- **Phyllotaxis** — golden-angle divergence, configurable spread
- **Scatter** — seeded random distribution within bounds

### Advanced
- **Tile** — stamps a referenced source node across a grid; per-cell randomised rotation, scale, opacity, XY nudge, flip; repeat/mirror/clamp wrap; stagger and gap modes

---

## §2 · Compositors

### Pixel Context
- **Blender** — two-input pixel compositor. Per-slot: source reference, Effect Stack, Mask Stack, fill opacity. Blend: 19 modes, amount, A↔B switch, per-channel RGBA, Blend If (tonal gating). Output: Effect Stack, Mask Stack, fill/output opacity.
- **Layer Comp** — ordered pixel layer stack. Per-layer: source, Effect Stack, Mask Stack, blend mode, opacity, fill opacity, Blend If. Matte accumulation via maskMode (add/multiply/screen/subtract/normal). Output: Effect Stack, Mask Stack, opacity.
- **Effect Stack** *(named reusable)* — a shareable stack of effects. Referenced via stack-ref items in any effect stack.
- **Mask Stack** *(named reusable)* — a shareable stack of masks. Referenced via stack-ref items in any mask stack.
- **Promoted tap** — a named reference to any intermediate pipeline state (after a specific effect or mask in any stack). Created by tapping ↗ on any effect or mask card.

### Point Context
- **Point Comp ◉** — ordered point modifier stack. Per-modifier: source geometry reference (any node with `_points`), effect stack (point-domain only), isolate stack (spatial filter via mask), opacity. Output: Effect Stack (point-domain), Mask Stack, output opacity. Renders accumulated points as dots; use show-points or source-at-points in the output stack for custom visualisation.

---

## Effect Categories

### Tonal *(pixel)*
`brightness` `contrast` `exposure` `levels` `curves` `posterize`

### Colour *(pixel)*
`hue-shift` `saturation` `vibrance` `colour-map` `colour` `duotone`

- **colour** — fills all pixels with a flat RGBA colour, respecting source alpha. Params: colour, opacity.
- **colour-map** — maps luminosity through a multi-stop colour gradient with per-stop alpha.
- **duotone** — maps shadows to one colour, highlights to another.

### Pixel *(pixel)*
`blur` `dir-blur` `sharpen` `invert` `threshold` `pixelate` `vignette` `chromatic-ab` `glow` `emboss` `edge-detect` `solarise`

### Distort *(pixel and point)*
`wave` `twirl` `bulge` `uv-distort` `polar-to-cart` `cart-to-polar`

### Transform *(pixel and point)*
`match` `transform`

- **transform** — translate, rotate, scale (uniform/X/Y), skew. Local (pivot = shape centroid) or global (pivot = canvas centre) space.
- **match** — copies transform values from any other transform effect in the graph. Axis-selective: position X/Y, scale, rotation. Offset overrides applied after match.

### Points *(point context only)*
`show-points` `point-map` `source-at-points` `attributes` `combine` `separate` `filter` `delete`

- **show-points** — renders markers (circle/square/crosshair) at point positions with optional attribute labels.
- **point-map** — maps any point attribute through a curve to drive scale, rotation, opacity, x, y, sourceIndex, or a custom attribute.
- **source-at-points** — stamps source node(s) at each point position, sized by `scale`, rotated by `rotation`, weighted distribution.
- **attributes** — adds, sets, removes, or renames arbitrary point attributes.
- **filter** — keeps only points where `attr op value` is true. Ops: `>` `>=` `<` `<=` `==` `!=`.
- **delete** — removes points where `attr op value` is true.
- **separate** — tags points with `_setGroup` A or B by threshold on a named attribute.
- **combine** — declares a union or intersection intent for two named point sets (resolved at Point Comp level).

---

## Masking / Isolate

Every effect can carry a **Mask Stack**; every mask can carry an **Effect Stack**. Nesting is unlimited:

```
Effect Stack
  └── Effect (e.g. blur)
        └── Mask Stack
              └── Mask (references any node)
                    └── Effect Stack (e.g. threshold to sharpen mask edge)
```

**Mask controls:** source reference, channel extraction (luminosity / R / G / B / A), fill opacity, invert, blend mode (multiply/screen/add/subtract/normal), opacity, Blend If.

In Point Comp, the equivalent is the **Isolate** stack per modifier — same structure, operates spatially on points rather than pixels.

---

## Promoted Taps

Any intermediate pipeline state can be **promoted** to a named node. Tap ↗ on any effect or mask card to capture the pipeline state at that exact point. The promoted node appears in §2 and can be referenced like any compositor output. Use this to branch a pipeline, share intermediate results between compositors, or build parallel processing chains.

---

## Rendering Pipeline

- All pixel effects: pure `ImageData` manipulation — zero CSS filters
- Blur: premultiplied alpha, open-boundary sampling (no edge bleed)
- Transform: oversized 3× offscreen buffer prevents clipping
- BlendIf: per-pixel tonal gating on both `thisLayer` and `underlyingLayer` luminosity
- Matte system: `source_alpha × maskStack` computed independently from pixel blend; matte accumulation in Layer Comp is a separate pass

---

## UI

- **Split layout** (default): resizable panels, independently fullscreenable
- **Unified scroll**: preview pinned or scrollable; sticky/flowing section headers
- **Panel style**: inline expansion or bottom sheet
- **Blender layout**: accordion (default) or multi-tab columns
- All settings persisted to `localStorage`
- Undo ring: 30 states, Ctrl/Cmd+Z
- Auto-save on interval and page unload
- Project save/load: `.nlics` JSON format

---

## Tech Stack
React 18 · HTML5 Canvas 2D · IBM Plex Mono + Syne (Google Fonts) · Vite · No external image processing libraries
