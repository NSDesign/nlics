# NLICS Development Skills

Recurring implementation patterns and their correct solutions.

---

## Skill 1: Controlled Numeric Input with Stable Focus

### Problem
A numeric `<input>` that is "controlled" (value driven by React state) loses focus on every keystroke because:
- `onChange` fires → calls `props.onChange(v)` → parent state updates → component re-renders → input loses focus or resets

This is most common in settings panels where inputs are nested inside components that re-render on every value change.

### Solution Pattern

Use a local string state to hold the display value. Commit to the parent **only on blur or Enter**. Use an `editing` ref to prevent external value sync from overwriting mid-edit state.

```jsx
function NumInput(props) {
  var raw = useState(String(props.value != null ? props.value : 0))
  var str = raw[0], setStr = raw[1]
  var editing = useRef(false)
  var prev = useRef(props.value)

  // Sync from parent only when not actively editing
  if (!editing.current && props.value !== prev.current) {
    prev.current = props.value
    setStr(String(props.value != null ? props.value : 0))
  }

  function commit(s) {
    var v = parseFloat(s)
    if (!isNaN(v) && isFinite(v)) { prev.current = v; props.onChange(v) }
  }

  return (
    <input
      type="text"
      inputMode="decimal"
      value={str}
      style={props.style}
      onChange={function(e) { setStr(e.target.value) }}
      onFocus={function(e) { editing.current = true; e.target.select() }}
      onBlur={function() {
        editing.current = false
        commit(str)
        setStr(String(prev.current))
      }}
      onKeyDown={function(e) {
        if (e.key === 'Enter')  { commit(str); e.target.blur() }
        if (e.key === 'Escape') { editing.current = false; setStr(String(prev.current)); e.target.blur() }
      }}
    />
  )
}
```

### Key Rules
- **Never call `props.onChange` inside `onChange`** for text-based number inputs
- Use `type="text"` with `inputMode="decimal"` — allows `-`, `.`, partial values
- `editing` ref (not state) prevents sync loops without triggering re-renders
- Slider inputs (`type="range"`) are fine to commit on every `onChange` — they never produce partial/invalid states

### Variants
- **Integer only:** replace `parseFloat` with `parseInt` and add `inputMode="numeric"`
- **Clamped:** apply `Math.max(min, Math.min(max, v))` inside `commit`
- **Formatted display:** show formatted string in blur state, raw number string in focus state

---

## Skill 2: Slider + Numeric Input Paired Control

### Problem
Settings panels in NLICS use sliders (`Sl` / `input[type=range]`) as the primary interaction pattern. When implementing new settings panels (sheets, dialogs, secondary panels), using only a numeric input breaks that convention and loses the affordance of continuous visual scrubbing. Conversely, using only a slider loses precision for exact values.

### Solution Pattern

Pair a range slider and a NumInput side-by-side in a single row. Slider commits immediately on drag (fast scrubbing); NumInput commits on blur/Enter (exact entry). Both stay in sync via the same `value` prop.

```jsx
// Module-level component — never define inside another component (see Skill 1)
function SliderNumRow(props) {
  // props: label, desc, value, onChange, slMin, slMax, slStep
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
        <span style={{ flex: 1, fontSize: 10.5, color: 'var(--mu)' }}>{props.label}</span>
        {props.desc && (
          <span style={{ fontSize: 9, color: 'var(--mu)', marginRight: 6 }}>{props.desc}</span>
        )}
        <NumInput
          value={props.value}
          onChange={props.onChange}
          style={{
            width: 58, background: 'var(--el)', border: '1px solid var(--bd)',
            borderRadius: 6, color: 'var(--ac)', fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 11, textAlign: 'right', padding: '4px 8px', outline: 'none'
          }}
        />
      </div>
      <input
        type="range"
        min={props.slMin} max={props.slMax} step={props.slStep || 0.01}
        value={props.value}
        onChange={function(e) { props.onChange(parseFloat(e.target.value)) }}
        style={{ width: '100%' }}
      />
    </div>
  )
}
```

### Key Rules
- **Always define at module level** — never inside a render function or component body. Inner component definitions get new function references on every render, causing React to unmount/remount and destroying focus/scroll state.
- Slider range (`slMin`/`slMax`) should reflect the practical range for that param, not the theoretical maximum. Examples used in NLICS:
  - `amount` → 0–5
  - `offset` → −2–2
  - `scale` → 0–3
  - `rotation` → −180–180 or 0–360
  - `opacity` → 0–1
  - `seed` → 1–9999
- For unbounded params (arbitrary min/max), use NumInput only — a slider with no meaningful range is misleading
- Toggle values (domain, seed type) use button-group rows, not sliders

### Context in NLICS
The existing `Sl` primitive in App.jsx wraps `input[type=range]` + value display for the main properties panel. For secondary panels (sheets, popovers), use the `SliderNumRow` pattern above directly rather than wrapping `Sl`, since `Sl` assumes the `.prow`/`.plbl` layout of the main panel.

