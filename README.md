# NLICS — Non-Linear Image Compositing System

A sophisticated browser-based image compositing application built with React.

## Architecture

### §1 · Pixel Creators
Pure pixel data generators — no effects, no masks:
- **Solid** — flat colour fill
- **Shape** — ellipse, rectangle, triangle, polygon, star, ring
- **Gradient** — linear, radial, conic
- **Noise** — perlin, turbulent, worley, random
- **Pattern** — checkerboard, stripes, dots (anti-aliased)
- **Image** — load from device, camera, or URL

### §2 · Compositors
**Blender** operator with full recursive stack system:
- **Input A / Input B** — each slot references a creator or another blender, with its own Effect Stack and Mask Stack
- **Blend operation** — 19 blend modes, amount, A↔B switch
- **Output** — Effect Stack and Mask Stack applied to the final composite

### Recursive Stack System
Every effect can have a Mask Stack. Every mask can have an Effect Stack. Stacks nest indefinitely:

```
Blender Input
  └── Effect Stack
        └── Effect (e.g. blur)
              └── Mask Stack
                    └── Mask (references a creator)
                          └── Effect Stack
                                └── Effect (e.g. threshold)
```

### Effects
- **Tonal:** brightness, contrast, exposure, levels (gamma), curves (in/out points + S-curve), posterize
- **Colour:** hue-shift, saturation
- **Pixel:** blur (premultiplied alpha, open boundary), invert, threshold
- **Transform:** translate X/Y, scale uniform, scale X/Y, rotation, skew X/Y (canvas 2D affine rasterisation)

### Masking
- Source: any creator or compositor output
- Channel extraction: luminosity, R, G, B, A
- Per-mask: strength, opacity, blend mode (multiply/screen/add/subtract/normal), invert
- Effect masks weight RGB application only — alpha is blended proportionally by mask weight

## Rendering Pipeline
All effects use pure canvas pixel math — **zero CSS filters**. Blur uses premultiplied alpha blending with open boundary sampling to correctly feather transparent shape edges.

## UI Layout
- Horizontal (desktop): left panel (§1 + §2) / draggable divider / right preview
- Vertical (mobile, <700px): top panel / divider / bottom preview, with flip toggle
- Both panels independently fullscreen-able
- Undo ring (Ctrl/Cmd+Z), 30 states, tracks add/delete/rename
- Two-step delete on node items (arm → confirm)

## Tech Stack
- React 18 (functional components, hooks)
- HTML5 Canvas 2D (all pixel operations)
- IBM Plex Mono + Syne (Google Fonts)
- No external image processing libraries
