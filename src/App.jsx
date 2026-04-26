import { useState, useEffect, useRef, Component } from "react"
import { createPortal } from "react-dom"


/* ─── CSS ─────────────────────────────────────────────────── */
const CSS_MOBILE = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=IBM+Plex+Mono:wght@300;400&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:#040412;--pn:#09091e;--sf:#0d0d22;--el:#131328;
  --sl:#1a1a38;--bd:#252550;--tx:#b8c8e8;--mu:#606898;
  --di:#8090c0;--ac:#24cca8;--lv:#b060f0;
  --gn:#28d878;--co:#d04898;--dng:#e03060;
  --tap:44px;--tap-sm:36px;--card-r:10px;--card-gap:8px;--pad:12px;
}
::-webkit-scrollbar{width:3px;height:3px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:var(--bd);border-radius:2px;}
input[type=range]{-webkit-appearance:none;width:100%;height:3px;background:var(--bd);border-radius:2px;outline:none;cursor:pointer;}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:var(--ac);cursor:pointer;box-shadow:0 2px 8px rgba(36,204,168,.35);}
select,input[type=text]{background:var(--el);border:1px solid var(--bd);color:var(--tx);padding:8px 10px;border-radius:6px;font-family:'IBM Plex Mono',monospace;font-size:12px;outline:none;width:100%;min-height:var(--tap-sm);}
select:focus,input[type=text]:focus{border-color:var(--ac);}
select{cursor:pointer;}
input[type=color]{width:36px;height:34px;border:1px solid var(--bd);border-radius:6px;padding:2px;background:var(--el);cursor:pointer;flex-shrink:0;}
button{background:var(--el);border:1px solid var(--bd);color:var(--di);padding:0 12px;border-radius:6px;font-family:'IBM Plex Mono',monospace;font-size:11px;cursor:pointer;transition:all .1s;white-space:nowrap;min-height:var(--tap-sm);display:inline-flex;align-items:center;justify-content:center;}
button:hover,button:active{background:var(--sl);border-color:var(--ac);color:var(--ac);}
button.ac{border-color:var(--ac);color:var(--ac);background:rgba(36,204,168,.1);}
button.lv{border-color:var(--lv);color:var(--lv);background:rgba(176,96,240,.08);}
button.danger{border-color:var(--dng);color:var(--dng);background:rgba(224,48,96,.08);}
button.ghost{background:none;border:none;color:var(--mu);padding:0 8px;}
button.ghost:hover{background:none;border:none;color:var(--tx);}
button.icon-btn{background:none;border:none;color:var(--mu);width:var(--tap);height:var(--tap);padding:0;font-size:18px;display:inline-flex;align-items:center;justify-content:center;border-radius:8px;flex-shrink:0;}
button.icon-btn:hover,button.icon-btn:active{background:rgba(255,255,255,.06);color:var(--tx);}
button.icon-btn.sm{width:var(--tap-sm);height:var(--tap-sm);font-size:14px;}
.nrow{display:flex;align-items:center;gap:6px;padding:10px 12px;cursor:pointer;user-select:none;border-bottom:1px solid rgba(37,37,80,.8);transition:background .08s;position:relative;min-height:var(--tap);}
.nrow:hover,.nrow:active{background:var(--sf);}
.nrow.sel{background:var(--sl);}
.nrow.off{opacity:.35;}
.nrow.dsp::after{content:'';position:absolute;right:0;top:0;bottom:0;width:3px;background:var(--lv);border-radius:2px 0 0 2px;}
.card{background:var(--el);border:1px solid var(--bd);border-radius:var(--card-r);overflow:hidden;margin-bottom:var(--card-gap);}
.card-hdr{display:flex;align-items:center;gap:4px;padding:0 8px 0 10px;min-height:var(--tap);background:var(--sf);border-bottom:1px solid var(--bd);}
.bp-chevron{display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border:none;background:none;color:var(--mu);cursor:pointer;font-size:12px;transition:transform .15s ease,color .15s ease;}
.bp-chevron:hover{color:var(--tx);}
.bp-chevron.open{transform:rotate(90deg);color:var(--tx);}
.bp-toolbar{display:flex;align-items:center;gap:4px;padding:6px 10px 10px;justify-content:flex-end;}
.bp-toggle{display:inline-flex;border:1px solid var(--bd);border-radius:8px;overflow:hidden;height:40px;}
.bp-toggle button{background:none;border:none;color:var(--mu);padding:0 14px;cursor:pointer;height:100%;display:inline-flex;align-items:center;justify-content:center;}
.bp-toggle button svg{display:block;}
.bp-toggle button:hover,.bp-toggle button:active,.bp-toggle button:focus{background:none;border-color:var(--bd);color:var(--mu);}
.bp-toggle button.active,.bp-toggle button.active:hover,.bp-toggle button.active:active{background:var(--sl);color:var(--ac);}
.bp-toggle button+button{border-left:1px solid var(--bd);}
.bp-tabs{display:flex;gap:4px;padding:6px 10px 4px;flex-wrap:wrap;}
.bp-tab{flex:1 1 0;min-width:0;background:var(--sf);border:1px solid var(--bd);color:var(--mu);padding:8px 6px;font-size:10px;font-family:'IBM Plex Mono',monospace;border-radius:6px;cursor:pointer;letter-spacing:.04em;text-transform:uppercase;min-height:36px;transition:background .1s,border-color .1s,color .1s;}
/* Override global button:hover/:active which would otherwise paint all buttons
   green (var(--ac)) on tap and leave mobile tabs stuck in hover state. */
button.bp-tab:hover,button.bp-tab:active,button.bp-tab:focus{background:var(--sf);border-color:var(--bd);color:var(--mu);}
.bp-tab.on,button.bp-tab.on:hover,button.bp-tab.on:active,button.bp-tab.on:focus{background:var(--sl);color:var(--tx);border-color:var(--ac);}
.bp-tab.on.ac,button.bp-tab.on.ac:hover,button.bp-tab.on.ac:active{border-color:var(--ac);color:var(--ac);}
.bp-tab.on.lv,button.bp-tab.on.lv:hover,button.bp-tab.on.lv:active{border-color:var(--lv);color:var(--lv);}
.bp-tab.on.co,button.bp-tab.on.co:hover,button.bp-tab.on.co:active{border-color:var(--co);color:var(--co);}
.bp-tab.on.di,button.bp-tab.on.di:hover,button.bp-tab.on.di:active{border-color:var(--di);color:var(--di);}

.card-body{padding:10px 12px;}
.tabs{display:flex;gap:2px;padding:6px 8px;background:var(--bg);border-bottom:1px solid var(--bd);}
.tab{flex:1;height:32px;border-radius:6px;font-size:10.5px;font-family:'IBM Plex Mono',monospace;background:none;border:none;color:var(--mu);cursor:pointer;transition:all .12s;}
.tab:hover{color:var(--di);background:var(--sf);}
.tab.on{background:var(--sl);color:var(--tx);border:1px solid var(--bd);}
.tab.on.ac{background:rgba(36,204,168,.12);color:var(--ac);border-color:rgba(36,204,168,.3);}
.tab.on.lv{background:rgba(176,96,240,.12);color:var(--lv);border-color:rgba(176,96,240,.3);}
.prow{display:flex;align-items:center;gap:8px;min-height:38px;margin-bottom:6px;}
.prow:last-child{margin-bottom:0;}
.plbl{color:var(--mu);font-size:10.5px;min-width:72px;text-align:right;flex-shrink:0;line-height:1.3;}
.pval{color:var(--ac);font-size:10.5px;min-width:38px;text-align:right;font-family:'IBM Plex Mono',monospace;flex-shrink:0;}
.breadcrumb{display:flex;align-items:center;gap:6px;padding:8px 12px;background:var(--bg);border-bottom:1px solid var(--bd);flex-shrink:0;overflow-x:auto;white-space:nowrap;}
.bc-item{font-size:10px;color:var(--di);font-family:'IBM Plex Mono',monospace;cursor:pointer;text-decoration:underline;text-underline-offset:3px;white-space:nowrap;flex-shrink:0;}
.blend-if-slider .noUi-target{background:var(--bg);border:1px solid var(--bd);border-radius:3px;box-shadow:none;height:8px;}
.blend-if-slider .noUi-connect:nth-child(1){background:var(--sl);}
.blend-if-slider .noUi-connect:nth-child(3){background:var(--sl);}
.blend-if-slider .noUi-handle:hover{background:var(--sl);border-color:var(--tx);}
.blend-if-slider .noUi-handle:focus{outline:none;border-color:var(--lv);background:var(--sl);}
.blend-if-slider .noUi-handle:nth-child(3):hover,.blend-if-slider .noUi-handle:nth-child(4):hover{opacity:1;}
.bc-item.cur{color:var(--tx);}
.mask-card{display:flex;align-items:flex-start;gap:8px;padding:10px;background:var(--bg);border:1px solid rgba(176,96,240,.22);border-radius:8px;margin-bottom:8px;}
.shdr{display:flex;align-items:center;gap:6px;padding:10px 12px;background:var(--pn);border-bottom:1px solid var(--bd);user-select:none;flex-shrink:0;min-height:var(--tap);}
.slbl{font-family:'Syne',sans-serif;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;}
.divh{width:8px;background:var(--bd);cursor:col-resize;flex-shrink:0;transition:background .12s;z-index:10;display:flex;align-items:center;justify-content:center;touch-action:none;}
.divh::after{content:'⋮';color:var(--bd);font-size:12px;pointer-events:none;}
.divh:hover,.divh.drag{background:var(--ac);}
.divh:hover::after,.divh.drag::after{color:var(--bg);}
.divv{height:8px;background:var(--bd);cursor:row-resize;flex-shrink:0;transition:background .12s;z-index:10;display:flex;align-items:center;justify-content:center;touch-action:none;}
.divv::after{content:'···';color:var(--bd);font-size:12px;pointer-events:none;}
.divv:hover,.divv.drag{background:var(--ac);}
.divv:hover::after,.divv.drag::after{color:var(--bg);}
.checker{background-image:linear-gradient(45deg,#0b0b1e 25%,transparent 25%),linear-gradient(-45deg,#0b0b1e 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#0b0b1e 75%),linear-gradient(-45deg,transparent 75%,#0b0b1e 75%);background-size:14px 14px;background-position:0 0,0 7px,7px -7px,-7px 0;background-color:#060618;}
.ftag{font-size:9px;padding:2px 6px;border-radius:4px;text-transform:uppercase;letter-spacing:.06em;font-weight:600;flex-shrink:0;}
.tgn{background:rgba(40,216,120,.13);color:#38e07c;border:1px solid rgba(40,216,120,.26);}
.tco{background:rgba(208,72,152,.13);color:#e060b0;border:1px solid rgba(208,72,152,.26);}
.drop-menu{position:fixed;z-index:9000;background:#111128;border:1px solid var(--bd);border-radius:8px;min-width:180px;box-shadow:0 10px 32px rgba(0,0,0,.8);overflow:hidden;max-height:60vh;overflow-y:auto;}
.drop-item{padding:12px 16px;cursor:pointer;font-size:12px;color:var(--tx);border-bottom:1px solid #161630;transition:background .08s;font-family:'IBM Plex Mono',monospace;}
.drop-item:last-child{border-bottom:none;}
.drop-item:hover,.drop-item:active{background:var(--sl);color:var(--ac);}
.drop-grp{padding:8px 16px 4px;font-size:9px;color:var(--mu);text-transform:uppercase;letter-spacing:.1em;pointer-events:none;}
.eff-menu{position:fixed;z-index:9000;background:#111128;border:1px solid var(--bd);border-radius:8px;box-shadow:0 -8px 28px rgba(0,0,0,.75);overflow:hidden;max-height:60vh;overflow-y:auto;}
.ninput{background:none;border:none;border-bottom:2px solid var(--ac);color:var(--tx);font-family:'IBM Plex Mono',monospace;font-size:13px;outline:none;width:100%;padding:2px 0;}
.empty{padding:14px;color:var(--mu);font-size:11px;text-align:center;font-family:'IBM Plex Mono',monospace;}
.undo-toast{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);background:#1a1a3a;border:1px solid var(--ac);color:var(--ac);padding:8px 18px;border-radius:6px;font-size:10px;font-family:'IBM Plex Mono',monospace;pointer-events:none;z-index:500;opacity:0;transition:opacity .2s;white-space:nowrap;}
.undo-toast.show{opacity:1;}
.hico{background:none;border:none;cursor:pointer;font-size:18px;color:#7ab8e8;min-height:var(--tap);min-width:var(--tap);padding:0 6px;border-radius:6px;display:inline-flex;align-items:center;justify-content:center;transition:all .12s;}
.hico:hover,.hico:active{color:#aaddff;background:rgba(122,184,232,.12);}
.hico.exit{color:var(--ac);border:1px solid rgba(36,204,168,.3);background:rgba(36,204,168,.07);}
.stack-lbl{font-size:9px;color:var(--mu);text-transform:uppercase;letter-spacing:.1em;padding:4px 0 8px;display:flex;align-items:center;gap:8px;}
.stack-lbl::after{content:'';flex:1;height:1px;background:var(--bd);}
/* Stack/Promoted type colours */
.tstack{background:rgba(36,164,204,.13);color:#40c8e8;border:1px solid rgba(36,164,204,.26);}
.tprom{background:rgba(220,180,40,.13);color:#e8c840;border:1px solid rgba(220,180,40,.26);}
/* Stack input item */
.stack-input{background:var(--bg);border:1px solid var(--bd);border-radius:8px;margin-bottom:8px;overflow:hidden;}
.stack-input-hdr{display:flex;align-items:center;gap:4px;padding:0 8px 0 10px;min-height:44px;background:var(--sf);border-bottom:1px solid var(--bd);}
/* Promote button */
.promote-btn{background:rgba(220,180,40,.1);border:1px solid rgba(220,180,40,.3);color:#e8c840;font-size:9px;padding:2px 8px;border-radius:4px;cursor:pointer;font-family:'IBM Plex Mono',monospace;min-height:28px;}
.promote-btn:hover{background:rgba(220,180,40,.22);color:#fff;}
.promote-btn.tapped{background:rgba(36,204,168,.12);border:1px solid rgba(36,204,168,.4);color:var(--ac);}
.promote-btn.tapped:hover{background:rgba(36,204,168,.22);}
/* Promoted group in node list */
.prom-group-hdr{display:flex;align-items:center;gap:6px;padding:6px 12px;background:rgba(220,180,40,.06);border-top:1px solid rgba(220,180,40,.18);border-bottom:1px solid rgba(220,180,40,.18);}
/* ── Settings sheet ── */
.sheet-scrim{position:fixed;inset:0;z-index:700;display:flex;flex-direction:column;justify-content:flex-end;pointer-events:none;}
.sheet-scrim.top{justify-content:flex-start;}
.sheet-body{background:var(--pn);border-radius:18px 18px 0 0;max-height:92vh;display:flex;flex-direction:column;overflow:hidden;pointer-events:auto;}
.sheet-grip{width:40px;height:4px;background:var(--bd);border-radius:2px;margin:10px auto 6px;flex-shrink:0;}
.sheet-hdr{display:flex;align-items:center;padding:4px 16px 12px;flex-shrink:0;}
.sheet-title{font-family:'Syne',sans-serif;font-size:14px;font-weight:700;color:var(--tx);flex:1;}
.sheet-scroll{flex:1;overflow-y:auto;padding:0 16px 32px;}
.setting-grp{margin-bottom:24px;}
.setting-grp-lbl{font-size:9px;color:var(--mu);text-transform:uppercase;letter-spacing:.12em;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid var(--bd);}
.setting-row{display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid rgba(37,37,80,.5);}
.setting-row:last-child{border-bottom:none;}
.setting-lbl{flex:1;font-size:13px;color:var(--tx);font-family:'IBM Plex Mono',monospace;}
.setting-desc{font-size:10px;color:var(--mu);margin-top:2px;}
.seg-ctrl{display:flex;background:var(--bg);border-radius:8px;padding:3px;gap:2px;border:1px solid var(--bd);}
.seg-btn{flex:1;height:34px;border-radius:6px;font-size:11px;font-family:'IBM Plex Mono',monospace;background:none;border:none;color:var(--mu);cursor:pointer;transition:all .12s;}
.seg-btn.on{background:var(--sl);color:var(--tx);box-shadow:0 1px 4px rgba(0,0,0,.4);}
.seg-btn.on.ac{background:rgba(36,204,168,.18);color:var(--ac);}
/* ── Unified scroll layout ── */
.unified-wrap{height:100vh;display:flex;flex-direction:column;overflow:hidden;}
.unified-preview{flex-shrink:0;position:relative;overflow:hidden;}
.unified-preview.pinned{position:sticky;top:0;z-index:50;}
.unified-resize-handle{height:10px;background:var(--bd);cursor:row-resize;display:flex;align-items:center;justify-content:center;touch-action:none;transition:background .12s;flex-shrink:0;}
.unified-resize-handle::after{content:'···';color:var(--bd);font-size:12px;pointer-events:none;}
.unified-resize-handle:hover,.unified-resize-handle.drag{background:var(--ac);}
.unified-resize-handle:hover::after,.unified-resize-handle.drag::after{color:var(--bg);}
.unified-lists{flex:1;overflow-y:auto;}
/* sticky section headers in unified mode */
.shdr.sticky{position:sticky;top:0;z-index:20;}
/* ── Node detail sheet (panel style = sheet) ── */
.node-sheet{position:fixed;bottom:0;left:0;right:0;z-index:800;background:var(--pn);border-radius:18px 18px 0 0;max-height:82vh;display:flex;flex-direction:column;box-shadow:0 -8px 40px rgba(0,0,0,.6);pointer-events:auto;}
.node-sheet-hdr{display:flex;align-items:center;padding:12px 16px 8px;flex-shrink:0;border-bottom:1px solid var(--bd);}
.node-sheet-scroll{flex:1;overflow-y:auto;}
`


function StyleInjector() {
  useEffect(function() {
    var s = document.createElement("style")
    s.textContent = CSS_MOBILE
    document.head.appendChild(s)
    return function() { s.remove() }
  }, [])
  return null
}

/* ─── CONSTANTS ─────────────────────────────────────────── */
var BMODES = ["normal","add","subtract","multiply","screen","overlay","soft-light","hard-light","difference","exclusion","darken","lighten","color-burn","color-dodge","divide"]
var MASK_BMODES = ["add","normal","multiply","subtract","screen"]  // matte blend modes

// Blend If per-pixel multiplier: luminosity 0-255, stops 0-255
function blendIfMult(lum, s0, s1, h1, h0) {
  if(s1 <= s0) s1 = s0
  if(h0 <= h1) h0 = h1
  var sMult = lum <= s0 ? 0 : lum >= s1 ? 1 : (lum - s0) / (s1 - s0)
  var hMult = lum >= h0 ? 0 : lum <= h1 ? 1 : (h0 - lum) / (h0 - h1)
  return Math.min(sMult, hMult)
}
// Returns true only when the stops actually restrict any pixels.
// Default state (s0=s1=0, h1=h0=255) = no restriction = skip blendIf entirely.
function blendIfActive(stops) {
  return stops && (stops.s1 > 0 || stops.s0 > 0 || stops.h1 < 255 || stops.h0 < 255)
}
// Returns true if the blendIf object has any active restriction on either side
function blendIfHasEffect(bi) {
  return bi && (blendIfActive(bi.thisLayer) || blendIfActive(bi.underlyingLayer))
}

// BlendIfSlider — custom track with per-handle pointer events.
// Outer handles (s0, h0) only exist/are interactive when soft mode is active.
// This avoids the noUiSlider z-index bug where coincident handles overlap unpredictably.
var FEATHER_DEFAULT = 20
function BlendIfSlider(props) {
  if(props.hidden) return null
  var disabled = props.disabled || false
  var trackRef = useRef(null)
  var dragging = useRef(null)  // {handle:'s0'|'s1'|'h1'|'h0', startX, startVal}
  var v = props.values
  var shadowSoft = v.s1 > v.s0
  var highlightSoft = v.h0 > v.h1

  function pct(val) { return (val/255)*100 + "%" }

  function toggleShadow() {
    // ON: pink appears coincident with green (no feather yet — drag green leftward to push pair, then back to open feather)
    // OFF: pink collapses back to green position
    props.onChange(shadowSoft
      ? {s0:v.s1, s1:v.s1, h1:v.h1, h0:v.h0}
      : {s0:v.s1, s1:v.s1, h1:v.h1, h0:v.h0})  // both cases: s0=s1 (same start — ON reveals pink)
  }
  function toggleHighlight() {
    props.onChange(highlightSoft
      ? {s0:v.s0, s1:v.s1, h1:v.h1, h0:v.h1}
      : {s0:v.s0, s1:v.s1, h1:v.h1, h0:v.h1})  // both cases: h0=h1 — ON reveals pink
  }

  function startDrag(handle, e) {
    e.preventDefault(); e.stopPropagation()
    var rect = trackRef.current.getBoundingClientRect()
    dragging.current = {handle:handle, rect:rect, vals:Object.assign({},v)}
    function onMove(ev) {
      var cx2 = ev.touches ? ev.touches[0].clientX : ev.clientX
      var pct2 = Math.max(0, Math.min(1, (cx2 - dragging.current.rect.left) / dragging.current.rect.width))
      var val = Math.round(pct2 * 255)
      var nv = Object.assign({}, dragging.current.vals)
      if(handle==="s0") {
        // Pink shadow: can only move left of green
        nv.s0 = Math.min(nv.s1, val)
      }
      if(handle==="s1") {
        // Green shadow: if pushed left past pink, push pink too (pair moves together)
        // If pulled right, pink stays creating feather zone
        var clamped = Math.min(nv.h1, val)
        if(clamped < nv.s0) { nv.s0 = clamped }  // push pink ahead
        nv.s1 = Math.max(nv.s0, clamped)
      }
      if(handle==="h1") {
        // Green highlight: if pushed right past pink, push pink too
        var clamped2 = Math.max(nv.s1, val)
        if(clamped2 > nv.h0) { nv.h0 = clamped2 }  // push pink ahead
        nv.h1 = Math.min(nv.h0, clamped2)
      }
      if(handle==="h0") {
        // Pink highlight: can only move right of green
        nv.h0 = Math.max(nv.h1, val)
      }
      props.onChange(nv)
    }
    function onUp() {
      dragging.current = null
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("touchmove", onMove)
      window.removeEventListener("touchend", onUp)
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseup", onUp)
    window.addEventListener("touchmove", onMove, {passive:false})
    window.addEventListener("touchend", onUp)
  }

  var handleBase = {position:"absolute",top:"50%",transform:"translate(-50%,-50%)",
    width:22,height:22,borderRadius:"50%",cursor:"ew-resize",touchAction:"none",
    zIndex:10,display:"flex",alignItems:"center",justifyContent:"center"}
  var innerHandle = Object.assign({},handleBase,{background:"var(--ac)",
    boxShadow:"0 2px 8px rgba(36,204,168,.35)",zIndex:12})
  var outerHandle = Object.assign({},handleBase,{background:"var(--lv)",
    boxShadow:"0 2px 6px rgba(176,96,240,.4)",width:18,height:18,zIndex:11})

  var btnSq = {width:32,height:32,borderRadius:4,border:"1px solid var(--bd)",
    background:"var(--el)",cursor:"pointer",display:"flex",alignItems:"center",
    justifyContent:"center",fontSize:11,color:"var(--mu)",flexShrink:0,padding:0}
  var btnActive = Object.assign({},btnSq,{borderColor:"var(--lv)",color:"var(--lv)",background:"rgba(176,96,240,.1)"})

  return (
    <div style={{marginBottom:14,opacity:disabled?0.35:1,pointerEvents:disabled?"none":"auto"}}>
      {/* Label + split buttons row */}
      <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
        <button onMouseDown={function(e){e.preventDefault()}} onClick={toggleShadow}
          title={shadowSoft?"Collapse shadow feather":"Split shadow to soft edge"}
          style={shadowSoft?btnActive:btnSq}>
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
            <line x1="1" y1="1" x2="1" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <polyline points="4,3 9,6 4,9" fill="currentColor" stroke="none"/>
          </svg>
        </button>
        <span style={{flex:1,fontSize:9,color:"var(--mu)",textTransform:"uppercase",
          letterSpacing:".08em",fontFamily:"'IBM Plex Mono',monospace",textAlign:"center"}}>
          {props.label}
        </span>
        <button onMouseDown={function(e){e.preventDefault()}} onClick={toggleHighlight}
          title={highlightSoft?"Collapse highlight feather":"Split highlight to soft edge"}
          style={highlightSoft?btnActive:btnSq}>
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
            <line x1="13" y1="1" x2="13" y2="11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <polyline points="10,3 5,6 10,9" fill="currentColor" stroke="none"/>
          </svg>
        </button>
      </div>
      {/* Track — three segments matching regular slider style */}
      <div ref={trackRef} style={{position:"relative",height:3,borderRadius:2,margin:"18px 11px 18px",
        background:"var(--bg)"}}>
        {/* Left dark zone: 0 → s0 (or s1 if hard) */}
        <div style={{position:"absolute",top:0,bottom:0,left:0,
          width:pct(shadowSoft?v.s0:v.s1),background:"var(--bd)",borderRadius:"2px 0 0 2px"}}/>
        {/* Pass zone: s1 → h1 — same grey as regular slider track */}
        <div style={{position:"absolute",top:0,bottom:0,left:pct(v.s1),
          width:"calc("+pct(v.h1)+" - "+pct(v.s1)+")",background:"var(--bd)"}}/>
        {/* Right dark zone: h0 (or h1 if hard) → 255 */}
        <div style={{position:"absolute",top:0,bottom:0,right:0,
          width:"calc(100% - "+pct(highlightSoft?v.h0:v.h1)+")",background:"var(--bd)",borderRadius:"0 2px 2px 0"}}/>
        {/* Pink outer handles — rendered BEHIND green (lower zIndex) so green captures touch when coincident */}
        {shadowSoft&&<div style={Object.assign({},outerHandle,{left:pct(v.s0),zIndex:9})}
          onMouseDown={function(e){startDrag("s0",e)}}
          onTouchStart={function(e){startDrag("s0",e)}}/>}
        {highlightSoft&&<div style={Object.assign({},outerHandle,{left:pct(v.h0),zIndex:9})}
          onMouseDown={function(e){startDrag("h0",e)}}
          onTouchStart={function(e){startDrag("h0",e)}}/>}
        {/* Green inner handles — always, on top (zIndex:12) */}
        <div style={Object.assign({},innerHandle,{left:pct(v.s1),zIndex:12})}
          onMouseDown={function(e){startDrag("s1",e)}}
          onTouchStart={function(e){startDrag("s1",e)}}/>
        <div style={Object.assign({},innerHandle,{left:pct(v.h1),zIndex:12})}
          onMouseDown={function(e){startDrag("h1",e)}}
          onTouchStart={function(e){startDrag("h1",e)}}/>
      </div>
      {/* Value readout */}
      <div style={{display:"flex",justifyContent:"space-between",fontSize:8,
        fontFamily:"'IBM Plex Mono',monospace",padding:"0 0"}}>
        <span style={{color:shadowSoft?"var(--lv)":"var(--mu)"}}>
          {shadowSoft?v.s0+"–"+v.s1:v.s1}
        </span>
        <span style={{color:highlightSoft?"var(--lv)":"var(--mu)"}}>
          {highlightSoft?v.h1+"–"+v.h0:v.h1}
        </span>
      </div>
    </div>
  )
}
var COMMUTATIVE_MODES = {add:1,multiply:1,screen:1,difference:1,exclusion:1,darken:1,lighten:1}

// ── Points-domain effect routing ─────────────────────────────────────────────
// Effects that can operate on _points[] spatial data.
// Each function receives pts (array of point objects) and returns modified pts.
var POINTS_DOMAIN_EFFECTS = {
  "transform":true,"wave":true,"twirl":true,"bulge":true,
  "polar-to-cart":true,"cart-to-polar":true,"point-map":true
}

function applyEfxPoints(pts, efx, w, h) {
  if(!pts||!pts.length||!efx.enabled) return pts
  var p=efx.params||{}, t=efx.type
  // Clone array — don't mutate in place
  var out=pts.map(function(pt){return Object.assign({},pt)})

  if(t==="transform"){
    var tx=(p.tx||0)*w, ty=(p.ty||0)*h
    var rot=(p.rot||0)*Math.PI/180
    var su=p.su!=null?p.su:1, sx=(p.sx||1)*su, sy=(p.sy||1)*su
    var cx2=w/2, cy2=h/2
    out=out.map(function(pt){
      var dx=pt.x-cx2, dy=pt.y-cy2
      return Object.assign({},pt,{
        x:cx2+(dx*Math.cos(rot)-dy*Math.sin(rot))*sx+tx,
        y:cy2+(dx*Math.sin(rot)+dy*Math.cos(rot))*sy+ty,
        rotation:(pt.rotation||0)+rot,
        scale:(pt.scale||1)*su
      })
    })
  }
  else if(t==="wave"){
    var wAmp=(p.amplitude||0.05)*Math.max(w,h)
    var wFx=p.freqX||3,wFy=p.freqY||3,wPx=p.phaseX||0,wPy=p.phaseY||0
    out=out.map(function(pt){
      return Object.assign({},pt,{
        x:pt.x+Math.sin(pt.y/h*wFy*Math.PI*2+wPy)*wAmp,
        y:pt.y+Math.sin(pt.x/w*wFx*Math.PI*2+wPx)*wAmp
      })
    })
  }
  else if(t==="twirl"){
    var tAngle=(p.angle||180)*Math.PI/180, tRad=(p.radius||0.5)*Math.min(w,h)*0.5
    var tcx=(p.cx!=null?p.cx:0.5)*w, tcy=(p.cy!=null?p.cy:0.5)*h
    out=out.map(function(pt){
      var dx=pt.x-tcx, dy=pt.y-tcy
      var d=Math.sqrt(dx*dx+dy*dy)
      if(d<tRad){
        var a=tAngle*(1-d/tRad)
        return Object.assign({},pt,{
          x:tcx+dx*Math.cos(a)-dy*Math.sin(a),
          y:tcy+dx*Math.sin(a)+dy*Math.cos(a),
          rotation:(pt.rotation||0)+a
        })
      }
      return pt
    })
  }
  else if(t==="bulge"){
    var bStr=p.strength||0.5, bRad=(p.radius||0.7)*Math.min(w,h)*0.5
    var bcx=(p.cx!=null?p.cx:0.5)*w, bcy=(p.cy!=null?p.cy:0.5)*h
    out=out.map(function(pt){
      var dx=pt.x-bcx, dy=pt.y-bcy
      var d=Math.sqrt(dx*dx+dy*dy)
      if(d<bRad&&d>0){
        var norm=d/bRad, newR=Math.pow(norm,1/(1+bStr))*bRad
        return Object.assign({},pt,{x:bcx+dx*(newR/d),y:bcy+dy*(newR/d)})
      }
      return pt
    })
  }
  else if(t==="cart-to-polar"){
    var pCx=w/2, pCy=h/2, pR=Math.min(w,h)/2
    out=out.map(function(pt){
      var ang=(Math.atan2(pt.y-pCy,pt.x-pCx)+Math.PI*2)%(Math.PI*2)
      var dist=Math.sqrt((pt.x-pCx)*(pt.x-pCx)+(pt.y-pCy)*(pt.y-pCy))/pR
      return Object.assign({},pt,{x:(ang/(Math.PI*2))*w, y:Math.min(dist,1)*h})
    })
  }
  else if(t==="polar-to-cart"){
    var pCx2=w/2, pCy2=h/2, pR2=Math.min(w,h)/2
    out=out.map(function(pt){
      var u=pt.x/w, v=pt.y/h
      return Object.assign({},pt,{
        x:pCx2+Math.cos(u*Math.PI*2)*v*pR2,
        y:pCy2+Math.sin(u*Math.PI*2)*v*pR2
      })
    })
  }
  else if(t==="point-map"){
    // Map input info attribute → output mutable attribute via linear/invert mapping
    var mappings=p.mappings||[]
    out=out.map(function(pt){
      var npt=Object.assign({},pt)
      mappings.forEach(function(m){
        var inVal=npt[m.inputAttr]
        if(inVal==null)return
        var v=Math.max(0,Math.min(1,inVal))  // normalise 0-1
        if(m.mapping==="invert") v=1-v
        var mapped=(m.min||0)+(v*(((m.max!=null?m.max:1)-(m.min||0))))
        npt[m.outputAttr]=mapped
      })
      return npt
    })
  }

  // Clamp x/y to canvas after all transforms
  out=out.map(function(pt){
    return Object.assign({},pt,{
      x:Math.max(0,Math.min(w,pt.x)),
      y:Math.max(0,Math.min(h,pt.y))
    })
  })
  return out
}

// RandRow: wraps a slider with optional randomise controls
// props: enabled, onToggle, rangeBipolar, onRangeBipolar, scale, onScale, offset, onOffset, amount, onAmount, seed, onSeed
function RandRow(props) {
  var en = props.enabled||false
  return (
    <div>
      {props.children}
      <div style={{display:"flex",alignItems:"center",gap:6,padding:"0 84px 2px",marginTop:-2}}>
        <button onClick={props.onToggle}
          style={{fontSize:8,padding:"1px 6px",borderRadius:3,cursor:"pointer",fontFamily:"'IBM Plex Mono',monospace",
            border:"1px solid "+(en?"var(--lv)":"var(--bd)"),
            background:en?"rgba(176,96,240,.1)":"none",
            color:en?"var(--lv)":"var(--mu)"}}>
          {en?"[×] rand":"[+] rand"}
        </button>
      </div>
      {en&&(
        <div style={{paddingLeft:84,paddingBottom:6,display:"flex",flexDirection:"column",gap:2}}>
          <div style={{display:"flex",gap:4,alignItems:"center",marginBottom:2}}>
            <span style={{fontSize:8,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",minWidth:40}}>range</span>
            {["0,1","-1,1"].map(function(opt){
              var isBi=opt==="-1,1"
              var active=(props.rangeBipolar||false)===isBi
              return <button key={opt} onClick={function(){props.onRangeBipolar(isBi)}}
                style={{fontSize:8,padding:"1px 6px",borderRadius:3,cursor:"pointer",
                  fontFamily:"'IBM Plex Mono',monospace",
                  border:"1px solid "+(active?"var(--lv)":"var(--bd)"),
                  background:active?"rgba(176,96,240,.1)":"none",
                  color:active?"var(--lv)":"var(--mu)"}}>{opt}</button>
            })}
          </div>
          <Sl l="scale" v={props.scale==null?.5:props.scale} mn={0} mx={20} st={.1}
            fmt={function(v){return v.toFixed(1)}} fn={props.onScale}/>
          <Sl l="offset" v={props.offset==null?0:props.offset} mn={-10} mx={10} st={.05}
            fmt={function(v){return v.toFixed(2)}} fn={props.onOffset||function(){}}/>
          <Sl l="amount" v={props.amount==null?1:props.amount} mn={0} mx={2} st={.01}
            fmt={function(v){return v.toFixed(2)}} fn={props.onAmount}/>
          <Sl l="seed" v={props.seed==null?1:props.seed} mn={0} mx={9999} st={1}
            fmt={function(v){return Math.round(v)}} fn={props.onSeed}/>
        </div>
      )}
    </div>
  )
}

// BlendIfAccordion — collapsible section wrapping BlendIf sliders
function BlendIfAccordion(props) {
  var openSt=useState(false); var open=openSt[0], setOpen=openSt[1]
  return (
    <div style={{marginTop:10,borderTop:"1px solid var(--bd)"}}>
      <button onClick={function(){setOpen(!open)}}
        style={{width:"100%",display:"flex",alignItems:"center",gap:6,
          padding:"8px 0",background:"none",border:"none",cursor:"pointer"}}>
        <span className={"bp-chevron"+(open?" open":"")} style={{fontSize:14,color:"var(--lv)"}}>›</span>
        <span style={{fontSize:9,textTransform:"uppercase",letterSpacing:".1em",
          fontFamily:"'IBM Plex Mono',monospace",color:"var(--di)"}}>Tonal Blending</span>
      </button>
      {open&&<div style={{paddingBottom:4}}>{props.children}</div>}
    </div>
  )
}
var EBMS   = ["normal","multiply","screen","overlay","add","subtract","darken","lighten"]
var MBMS   = ["multiply","screen","add","subtract","normal"]
var MCH    = ["luminosity","R","G","B","A"]
var SHAPES = ["ellipse","rectangle","rounded-rect","polygon","star","ring"]
var GTYPES = ["linear","radial","conic"]
var NTYPES = ["perlin","fbm","turbulence","worley","simplex","marble","wood","value"]
var PTYPES = ["checkerboard","stripes","dots","diamond"]
var ECFG   = {
  brightness: ["value",0,300,1,150],
  contrast:   ["value",0,300,1,150],
  blur:       ["radius",0,30,.5,5],
  invert:     ["amount",0,100,1,100],
  threshold:  ["value",0,255,1,128],
  "hue-shift":["angle",0,360,1,45],
  saturation: ["amount",0,300,1,150],
  vibrance:   ["amount",-100,100,1,0],
  exposure:   ["stops",-3,3,.1,1],
  levels:     ["gamma",0.1,4,.05,1],
  posterize:  ["levels",2,16,1,4]
}
// Colour map uses an array of stops, handled specially (not via ECFG)
// Directional blur uses angle+distance+mode, handled specially
// Curves effect has no single inline-slider param (uses in/out point pairs), handled separately
var ECFG_CURVES_ONLY = ["curves"]
var ETYPES = Object.keys(ECFG)
var CPROPS = {
  solid:    { color:"#2244cc", alpha:1 },
  shape:    { shapeType:"ellipse", x:.5, y:.5, sz:.6, rot:0, fill:"#ffffff", stroke:"#000000", strokeW:0, pts:5, innerR:.45, sides:5, ringR:.62, alpha:1 },
  gradient: { gType:"radial", stops:[{pos:0,color:"#ff2277",alpha:1},{pos:1,color:"#000022",alpha:1}], angle:90, cx:.5, cy:.5, r:.7, sa:0, alpha:1 },
  noise:    { nType:"perlin", c1:"#ffffff", c2:"#000000", scale:.04, oct:4, seed:1, alpha:1 },
  pattern:  { pType:"checkerboard", c1:"#ffffff", a1:1, c2:"#000000", a2:1, scale:.1, sw:.1, angle:0, dr:.03, ds:.1, alpha:1 },
  image:    { url:"", fit:"contain", alpha:1 }
}
// Creator defaults override via localStorage.
// Saved defaults take precedence over built-in CPROPS when creating new nodes.
// Image URLs are deliberately stripped when saving — URLs are per-instance.
var CDEF_KEY = "nlics:creator-defaults:v1"
function getCreatorDefaults(type) {
  try {
    var raw = localStorage.getItem(CDEF_KEY)
    if(raw){
      var saved = JSON.parse(raw)
      if(saved && saved[type]) return Object.assign({}, CPROPS[type]||{}, saved[type])
    }
  } catch(e) {}
  return Object.assign({}, CPROPS[type]||{})
}
function saveCreatorDefault(type, props) {
  try {
    var raw = localStorage.getItem(CDEF_KEY)
    var all = raw ? JSON.parse(raw) : {}
    // Strip volatile per-instance fields
    var toSave = Object.assign({}, props)
    if(type==="image") delete toSave.url
    all[type] = toSave
    localStorage.setItem(CDEF_KEY, JSON.stringify(all))
    return true
  } catch(e) { return false }
}
function resetCreatorDefault(type) {
  try {
    var raw = localStorage.getItem(CDEF_KEY)
    if(!raw) return true
    var all = JSON.parse(raw)
    delete all[type]
    localStorage.setItem(CDEF_KEY, JSON.stringify(all))
    return true
  } catch(e) { return false }
}
function hasCreatorDefault(type) {
  try {
    var raw = localStorage.getItem(CDEF_KEY)
    if(!raw) return false
    var all = JSON.parse(raw)
    return !!(all && all[type])
  } catch(e) { return false }
}

var _uid = 100
function uid() { return "n" + (_uid++) }
function mkEfx(t) {
  var cfg=ECFG[t]
  var params=cfg ? { [cfg[0]]:cfg[4] } : {}
  if(t==="curves")    params={inBlack:0,inWhite:255,outBlack:0,outWhite:255,sCurve:0}
  if(t==="transform")    params={tx:0,ty:0,rot:0,su:1,sx:1,sy:1,skX:0,skY:0}
  if(t==="wave")          params={amplitude:.05,freqX:3,freqY:3,phaseX:0,phaseY:0}
  if(t==="twirl")         params={angle:180,radius:.5,cx:.5,cy:.5}
  if(t==="bulge")         params={strength:.5,radius:.7,cx:.5,cy:.5}
  if(t==="solarise")      params={threshold:.5}
  if(t==="uv-distort")    params={uvRefId:null,mode:"displacement",amtX:.1,amtY:.1,chX:"R",chY:"G"}
  if(t==="polar-to-cart")     params={amount:1}
  if(t==="cart-to-polar")     params={amount:1}
  if(t==="show-points")       params={style:"circle",color:"#00ccff",size:6,opacity:.8,showLabels:false,useAppDefaults:true}
  if(t==="point-map")         params={mappings:[]}
  if(t==="source-at-points")  params={sources:[],distributionMode:"weighted",wrap:"clamp"}
  if(t==="colour-map") params={
    stops:[{pos:0,color:"#000000",alpha:100},{pos:1,color:"#ffffff",alpha:100}],
    reverse:false
  }
  if(t==="dir-blur")     params={angle:0, distance:20, spread:"both"}
  if(t==="sharpen")      params={amount:100}
  if(t==="vignette")     params={strength:80, radius:.65, softness:.45, color:"#000000"}
  if(t==="chromatic-ab") params={distance:6, angle:45, mode:"rgb"}
  if(t==="glow")         params={radius:12, strength:60, threshold:120}
  if(t==="emboss")       params={angle:135, strength:100, flat:128}
  if(t==="edge-detect")  params={strength:100, invert:false}
  if(t==="pixelate")     params={size:8}
  if(t==="duotone")      params={shadow:"#0a0a2a", highlight:"#f5e642"}
  return { id:uid(), type:t, name:"", enabled:true, params:params, opacity:100, blendMode:"normal", maskStack:[], blendChannels:{R:true,G:true,B:true,A:true}, blendIf:{thisLayer:{s0:0,s1:0,h1:255,h0:255},underlyingLayer:{s0:0,s1:0,h1:255,h0:255}}, domain:"pixels" }
}
function mkMask() { return { id:uid(), name:"", refId:null, channel:"luminosity", invert:false, fillOpacity:100, opacity:100, blendMode:"multiply", effectStack:[], enabled:true, blendIf:{thisLayer:{s0:0,s1:0,h1:255,h0:255},underlyingLayer:{s0:0,s1:0,h1:255,h0:255}} } }
function mkSlot() { return { refId:null, effectStack:[], maskStack:[], fillOpacity:100 } }
function mkBlender() { return { id:uid(), name:"Blender "+(_uid-100), type:"blender", section:2, enabled:true, inputA:mkSlot(), inputB:mkSlot(), mode:"normal", amount:100, switched:false, maskMode:"add", maskAmount:100, blendChannels:{R:true,G:true,B:true,A:true}, blendIf:{thisLayer:{s0:0,s1:0,h1:255,h0:255},underlyingLayer:{s0:0,s1:0,h1:255,h0:255}}, outFillOpacity:100, outOpacity:100, outEfx:[], outMask:[] } }
function mkLayer(refId) { return { id:uid(), refId:refId||null, name:"", enabled:true,
  effectStack:[], maskStack:[], blendMode:"normal", opacity:100, maskMode:"add", maskAmount:100,
  fillOpacity:100, blendChannels:{R:true,G:true,B:true,A:true},
  blendIf:{thisLayer:{s0:0,s1:0,h1:255,h0:255},underlyingLayer:{s0:0,s1:0,h1:255,h0:255}} } }
function mkLayerComp() { return { id:uid(), name:"Layer Comp "+(_uid-100), type:"layers", section:2, enabled:true, layers:[mkLayer(),mkLayer()], outFillOpacity:100, outOpacity:100, outEfx:[], outMask:[] } }
function mkNode(t) { return { id:uid(), name:t+" "+(_uid-100), type:t, section:1, enabled:true, props:getCreatorDefaults(t) } }

// Stack node — named reusable container for an effect or mask stack.
// Not a compositor; has no source or inputs of its own.
function mkStack(stackType) {
  var stype = stackType||"effect"
  if(stype==="mask")
    return { id:uid(), name:"Mask Stack "+(_uid-100), type:"stack", stackType:"mask", section:2, enabled:true, maskStack:[], previewRefId:null }
  return { id:uid(), name:"Effect Stack "+(_uid-100), type:"stack", stackType:"effect", section:2, enabled:true, effectStack:[], previewRefId:null }
}
// Stack reference item — sits in an effect or mask stack array as a first-class item
function mkEfxStackRef(stackRefId) {
  return { id:uid(), type:"__stackref__", name:"", stackRefId:stackRefId, enabled:true, opacity:100, blendMode:"normal" }
}
function mkMaskStackRef(stackRefId) {
  return { id:uid(), type:"__stackref__", name:"", stackRefId:stackRefId, enabled:true, opacity:100, blendMode:"multiply" }
}

// Promoted node — a named tap point on an intermediate chain state
// tapPath describes exactly where in which chain the tap lives
function mkPromoted(name, tapPath) {
  return { id:uid(), name:name||"Tap "+(_uid-100), type:"promoted", section:2, enabled:true,
    tapPath:tapPath }  // tapPath:{nodeId,slot,stackType,afterId,withSub}
}

/* ─── COLOUR / NOISE MATH ────────────────────────────────── */
function rhs(r,g,b) {
  r/=255; g/=255; b/=255
  var mx=Math.max(r,g,b), mn=Math.min(r,g,b), h=0, s=0, l=(mx+mn)/2
  if (mx!==mn) {
    var d=mx-mn
    s = l>.5 ? d/(2-mx-mn) : d/(mx+mn)
    if (mx===r) h=((g-b)/d+(g<b?6:0))/6
    else if (mx===g) h=((b-r)/d+2)/6
    else h=((r-g)/d+4)/6
  }
  return [h*360, s, l]
}
function hq(p,q,t) {
  if (t<0) t+=1; if (t>1) t-=1
  if (t<1/6) return p+(q-p)*6*t
  if (t<.5) return q
  if (t<2/3) return p+(q-p)*(2/3-t)*6
  return p
}
function shr(h,s,l) {
  h/=360
  if (!s) { var v=Math.round(l*255); return [v,v,v] }
  var q=l<.5?l*(1+s):l+s-l*s, p=2*l-q
  return [Math.round(hq(p,q,h+1/3)*255), Math.round(hq(p,q,h)*255), Math.round(hq(p,q,h-1/3)*255)]
}
function h2r(hex) {
  var s=(hex||"#808080").replace("#","")
  return { r:parseInt(s.slice(0,2),16)||0, g:parseInt(s.slice(2,4),16)||0, b:parseInt(s.slice(4,6),16)||0 }
}
function lrC(a,b,t) { return { r:Math.round(a.r+(b.r-a.r)*t), g:Math.round(a.g+(b.g-a.g)*t), b:Math.round(a.b+(b.b-a.b)*t) } }
function vh(x,y,s) { var n=Math.sin(x*127.1+y*311.7+(s||0)*74.3)*43758.5453; return n-Math.floor(n) }
function sm(t) { return t*t*(3-2*t) }
function vn(x,y,s) {
  var ix=Math.floor(x), iy=Math.floor(y), fx=x-ix, fy=y-iy
  return vh(ix,iy,s)+(vh(ix+1,iy,s)-vh(ix,iy,s))*sm(fx)+(vh(ix,iy+1,s)-vh(ix,iy,s))*sm(fy)+(vh(ix,iy,s)-vh(ix+1,iy,s)-vh(ix,iy+1,s)+vh(ix+1,iy+1,s))*sm(fx)*sm(fy)
}
function octN(x,y,o,s) { var v=0,a=1,f=1,m=0; for(var i=0;i<o;i++){v+=vn(x*f,y*f,s+i)*a;m+=a;a*=.5;f*=2.08} return v/m }

// ── Fractal Brownian Motion (fBm) — like octN but lacunarity/gain control ────
function fbm(x,y,oct,lacunarity,gain,s) {
  var v=0,a=.5,f=1
  for(var i=0;i<oct;i++){v+=vn(x*f,y*f,s+i)*a;a*=gain;f*=lacunarity}
  return Math.max(0,Math.min(1,v+.5))
}
// ── Turbulence — absolute value of octave noise (ridged look) ─────────────────
function turbulence(x,y,oct,s) {
  var v=0,a=1,f=1,m=0
  for(var i=0;i<oct;i++){v+=Math.abs(vn(x*f,y*f,s+i)*2-1)*a;m+=a;a*=.5;f*=2.08}
  return 1-v/m
}
// ── Worley / Cellular noise (F1 — distance to nearest point) ──────────────────
function worley(x,y,s,jitter) {
  jitter=jitter==null?1:jitter
  var ix=Math.floor(x), iy=Math.floor(y), minD=1e9
  for(var dy=-1;dy<=1;dy++) for(var dx=-1;dx<=1;dx++){
    var cx=ix+dx, cy=iy+dy
    var px=cx+vh(cx,cy,s)*jitter, py=cy+vh(cx+31.4,cy+27.8,s)*jitter
    var d=(x-px)*(x-px)+(y-py)*(y-py)
    if(d<minD)minD=d
  }
  return Math.max(0,Math.min(1,Math.sqrt(minD)))
}
// ── Simplex-style noise (gradient noise, fewer artefacts than value noise) ────
function simplex2(x,y,s) {
  var F2=.5*(Math.sqrt(3)-1), G2=(3-Math.sqrt(3))/6
  var s2=(x+y)*F2, i=Math.floor(x+s2), j=Math.floor(y+s2)
  var t=(i+j)*G2, X0=i-t, Y0=j-t, x0=x-X0, y0=y-Y0
  var i1=x0>y0?1:0, j1=x0>y0?0:1
  var x1=x0-i1+G2, y1=y0-j1+G2, x2=x0-1+2*G2, y2=y0-1+2*G2
  function gi(ii,jj){return vh(ii,jj,s)*2-1}
  function n(xi,yi,gx,gy){var t2=.5-(gx*gx+gy*gy);return t2<0?0:t2*t2*t2*t2*(gi(xi,jj=(j+(jj=0,0)),0)*gx+gi(ii=(i+(ii=0,0)),yi,0)*gy)}
  // Simple gradient noise as simplex approximation
  var d0=Math.max(0,.5-(x0*x0+y0*y0)),d1=Math.max(0,.5-(x1*x1+y1*y1)),d2=Math.max(0,.5-(x2*x2+y2*y2))
  var g0=vh(i,j,s)*2-1, g1=vh(i+i1,j+j1,s+1)*2-1, g2=vh(i+1,j+1,s+2)*2-1
  var v=70*(d0*d0*d0*d0*(g0*x0+vh(i,j,s+3)*y0)+d1*d1*d1*d1*(g1*x1+vh(i+i1,j+j1,s+4)*y1)+d2*d2*d2*d2*(g2*x2+vh(i+1,j+1,s+5)*y2))
  return Math.max(0,Math.min(1,(v+1)*.5))
}
// ── Marble — sinusoidal bands + turbulence ────────────────────────────────────
function marble(x,y,oct,s,freq,turb) {
  var t=turbulence(x,y,oct,s)
  return Math.max(0,Math.min(1,(Math.sin((x*freq+t*turb)*Math.PI)+1)*.5))
}
// ── Wood rings ────────────────────────────────────────────────────────────────
function wood(x,y,oct,s,freq,turb) {
  var t=turbulence(x,y,oct,s)
  var g=Math.sqrt(x*x+y*y)*freq+t*turb
  return Math.max(0,Math.min(1,(Math.sin(g*Math.PI*2)+1)*.5))
}

/* ─── PIXEL EFFECTS ── pure pixel math, zero CSS ─────────── */
function pxFn(d,w,h,t,p) {
  var i, f, hsl, rgb
  if (t==="brightness") {
    f=p.value/100; for(i=0;i<d.length;i+=4){d[i]=Math.min(255,d[i]*f);d[i+1]=Math.min(255,d[i+1]*f);d[i+2]=Math.min(255,d[i+2]*f)}
  } else if (t==="contrast") {
    f=p.value/100; for(i=0;i<d.length;i+=4){d[i]=Math.min(255,Math.max(0,(d[i]-128)*f+128));d[i+1]=Math.min(255,Math.max(0,(d[i+1]-128)*f+128));d[i+2]=Math.min(255,Math.max(0,(d[i+2]-128)*f+128))}
  } else if (t==="blur") {
    // Premultiplied alpha box blur with open boundary (out-of-bounds = transparent zero).
    // Premultiply: avoids colour bleeding from transparent pixels into opaque edges.
    // Open boundary: out-of-bounds samples are skipped entirely, so edge pixels use a
    // smaller kernel — prevents the hard bright band that clamping would create.
    var r=Math.max(1,Math.round(p.radius||0))
    var x, y, nx, ny, dx, dy, rs, gs, bs, as, wa, n
    // Premultiply d in-place
    for(i=0;i<d.length;i+=4){var a255=d[i+3]/255;d[i]=Math.round(d[i]*a255);d[i+1]=Math.round(d[i+1]*a255);d[i+2]=Math.round(d[i+2]*a255)}
    var tmp=new Uint8ClampedArray(d.length)
    // Horizontal pass — open boundary: skip out-of-bounds
    for(y=0;y<h;y++) for(x=0;x<w;x++){
      rs=gs=bs=as=n=0
      for(dx=-r;dx<=r;dx++){nx=x+dx;if(nx<0||nx>=w)continue;i=(y*w+nx)*4;rs+=d[i];gs+=d[i+1];bs+=d[i+2];as+=d[i+3];n++}
      if(n===0)n=1
      i=(y*w+x)*4;tmp[i]=rs/n;tmp[i+1]=gs/n;tmp[i+2]=bs/n;tmp[i+3]=as/n
    }
    // Vertical pass — open boundary
    for(y=0;y<h;y++) for(x=0;x<w;x++){
      rs=gs=bs=as=n=0
      for(dy=-r;dy<=r;dy++){ny=y+dy;if(ny<0||ny>=h)continue;i=(ny*w+x)*4;rs+=tmp[i];gs+=tmp[i+1];bs+=tmp[i+2];as+=tmp[i+3];n++}
      if(n===0)n=1
      i=(y*w+x)*4;d[i]=rs/n;d[i+1]=gs/n;d[i+2]=bs/n;d[i+3]=as/n
    }
    // Unpremultiply
    for(i=0;i<d.length;i+=4){var a2=d[i+3];if(a2>0){d[i]=Math.min(255,Math.round(d[i]*255/a2));d[i+1]=Math.min(255,Math.round(d[i+1]*255/a2));d[i+2]=Math.min(255,Math.round(d[i+2]*255/a2))}}
  } else if (t==="invert") {
    f=p.amount/100; for(i=0;i<d.length;i+=4){d[i]=d[i]*(1-f)+(255-d[i])*f;d[i+1]=d[i+1]*(1-f)+(255-d[i+1])*f;d[i+2]=d[i+2]*(1-f)+(255-d[i+2])*f}
  } else if (t==="threshold") {
    for(i=0;i<d.length;i+=4){var l=.299*d[i]+.587*d[i+1]+.114*d[i+2],c=l>=p.value?255:0;d[i]=d[i+1]=d[i+2]=c}
  } else if (t==="hue-shift") {
    for(i=0;i<d.length;i+=4){hsl=rhs(d[i],d[i+1],d[i+2]);rgb=shr((hsl[0]+p.angle+360)%360,hsl[1],hsl[2]);d[i]=rgb[0];d[i+1]=rgb[1];d[i+2]=rgb[2]}
  } else if (t==="saturation") {
    f=p.amount/100; for(i=0;i<d.length;i+=4){hsl=rhs(d[i],d[i+1],d[i+2]);rgb=shr(hsl[0],Math.min(1,Math.max(0,hsl[1]*f)),hsl[2]);d[i]=rgb[0];d[i+1]=rgb[1];d[i+2]=rgb[2]}
  } else if (t==="vibrance") {
    // amount -100..100, 0 = no change. Boost lifts low-saturation more than high.
    var vAmt=(p.amount||0)/100
    for(i=0;i<d.length;i+=4){
      hsl=rhs(d[i],d[i+1],d[i+2])
      var sat=hsl[1], ns
      if(vAmt>=0){ns=sat+(1-sat)*sat*vAmt*2}
      else       {ns=sat*(1+vAmt)}
      ns=Math.max(0,Math.min(1,ns))
      rgb=shr(hsl[0],ns,hsl[2]);d[i]=rgb[0];d[i+1]=rgb[1];d[i+2]=rgb[2]
    }
  } else if (t==="exposure") {
    f=Math.pow(2,p.stops); for(i=0;i<d.length;i+=4){d[i]=Math.min(255,d[i]*f);d[i+1]=Math.min(255,d[i+1]*f);d[i+2]=Math.min(255,d[i+2]*f)}
  } else if (t==="levels") {
    // Gamma correction: reshape tonal curve. gamma<1 lifts shadows, gamma>1 crushes them.
    var g=Math.max(0.01,p.gamma||1),ig=1/g
    var lut=new Uint8Array(256); for(i=0;i<256;i++)lut[i]=Math.round(Math.pow(i/255,ig)*255)
    for(i=0;i<d.length;i+=4){d[i]=lut[d[i]];d[i+1]=lut[d[i+1]];d[i+2]=lut[d[i+2]]}
  } else if (t==="posterize") {
    var lv=Math.max(2,Math.round(p.levels||4)),st=255/(lv-1)
    for(i=0;i<d.length;i+=4){d[i]=Math.round(Math.round(d[i]/st)*st);d[i+1]=Math.round(Math.round(d[i+1]/st)*st);d[i+2]=Math.round(Math.round(d[i+2]/st)*st)}
  } else if (t==="curves") {
    var inB=p.inBlack||0, inW=p.inWhite==null?255:p.inWhite
    var outB=p.outBlack||0, outW=p.outWhite==null?255:p.outWhite
    var clut=new Uint8Array(256)
    for(var li=0;li<256;li++){
      var norm=(li-inB)/Math.max(1,inW-inB)
      norm=Math.max(0,Math.min(1,norm))
      var sc=p.sCurve||0
      if(sc!==0){var sv=norm*norm*(3-2*norm);norm=norm*(1-Math.abs(sc)/100)+sv*(Math.abs(sc)/100);if(sc<0)norm=1-norm}
      clut[li]=Math.round(outB+(outW-outB)*Math.max(0,Math.min(1,norm)))
    }
    for(i=0;i<d.length;i+=4){d[i]=clut[d[i]];d[i+1]=clut[d[i+1]];d[i+2]=clut[d[i+2]]}
  } else if (t==="colour-map") {
    // Map luminosity [0..255] through a sorted list of colour+alpha stops,
    // producing 256-entry R/G/B/A lookup tables. Each pixel's luminosity
    // indexes the LUTs. The mapped alpha scales the source pixel's alpha,
    // letting parts of the gradient be "see-through" to the original.
    // Layer opacity (on the Layer tab) handles the whole-effect mix.
    var stops=(p.stops||[]).slice().sort(function(a,b){return a.pos-b.pos})
    if(stops.length<2){stops=[{pos:0,color:"#000000",alpha:100},{pos:1,color:"#ffffff",alpha:100}]}
    if(p.reverse){stops=stops.slice().reverse().map(function(s){return Object.assign({},s,{pos:1-s.pos})})}
    function parseHex(h){
      var s=(h||"#000000").replace("#","")
      if(s.length===3)s=s.split("").map(function(c){return c+c}).join("")
      return [parseInt(s.slice(0,2),16)||0,parseInt(s.slice(2,4),16)||0,parseInt(s.slice(4,6),16)||0]
    }
    var rgbs=stops.map(function(s){return parseHex(s.color)})
    var alphas=stops.map(function(s){return s.alpha==null?100:s.alpha})
    var lutR=new Uint8Array(256), lutG=new Uint8Array(256), lutB=new Uint8Array(256), lutA=new Uint8Array(256)
    for(var cli=0;cli<256;cli++){
      var t01=cli/255, si=0
      while(si<stops.length-1 && t01>stops[si+1].pos) si++
      var s0=stops[si], s1=stops[Math.min(si+1,stops.length-1)]
      var range=s1.pos-s0.pos
      var local=range>0?(t01-s0.pos)/range:0
      local=Math.max(0,Math.min(1,local))
      var c0=rgbs[si], c1=rgbs[Math.min(si+1,stops.length-1)]
      var a0=alphas[si], a1=alphas[Math.min(si+1,stops.length-1)]
      lutR[cli]=Math.round(c0[0]+(c1[0]-c0[0])*local)
      lutG[cli]=Math.round(c0[1]+(c1[1]-c0[1])*local)
      lutB[cli]=Math.round(c0[2]+(c1[2]-c0[2])*local)
      lutA[cli]=Math.round(a0+(a1-a0)*local)
    }
    for(i=0;i<d.length;i+=4){
      var lum=Math.round(0.299*d[i]+0.587*d[i+1]+0.114*d[i+2])
      d[i]  =lutR[lum]
      d[i+1]=lutG[lum]
      d[i+2]=lutB[lum]
      d[i+3]=Math.round(d[i+3]*lutA[lum]/100)
    }
  } else if (t==="dir-blur") {
    // Directional (motion) blur — samples pixels along an angle.
    // angle: 0-360 degrees, distance: pixel length of blur, spread: "forward"|"backward"|"both"
    var ang = ((p.angle||0) * Math.PI / 180)
    var dist = Math.max(1, Math.round(p.distance||20))
    var spread = p.spread || "both"
    var cos = Math.cos(ang), sin = Math.sin(ang)
    // Build sample offsets along the direction vector
    var offsets = []
    for(var si=1; si<=dist; si++){
      if(spread==="forward" || spread==="both") offsets.push(si)
      if(spread==="backward" || spread==="both") offsets.push(-si)
    }
    if(offsets.length===0) offsets=[0]
    var n = offsets.length + 1  // include center pixel
    var orig = new Uint8ClampedArray(d)  // copy before mutating
    for(i=0;i<d.length;i+=4){
      var px = ((i/4) % w), py = Math.floor((i/4) / w)
      var rs=orig[i], gs=orig[i+1], bs=orig[i+2], as=orig[i+3], cnt=1
      for(var oi=0;oi<offsets.length;oi++){
        var nx=Math.round(px + cos*offsets[oi]), ny=Math.round(py + sin*offsets[oi])
        if(nx<0||nx>=w||ny<0||ny>=h)continue
        var ni=(ny*w+nx)*4
        rs+=orig[ni]; gs+=orig[ni+1]; bs+=orig[ni+2]; as+=orig[ni+3]; cnt++
      }
      d[i]=rs/cnt; d[i+1]=gs/cnt; d[i+2]=bs/cnt; d[i+3]=as/cnt
    }
  } else if (t==="sharpen") {
    // Unsharp mask: sharpen = original + amount*(original - blurred)
    var shAmt=(p.amount==null?100:p.amount)/100
    var shR=2, shTmp=new Uint8ClampedArray(d)
    // box blur on shTmp
    var shLine=new Uint8ClampedArray(d.length)
    var shX,shY,shDx,shDy,shNx,shNy,shRs,shGs,shBs,shN
    for(shY=0;shY<h;shY++) for(shX=0;shX<w;shX++){
      shRs=shGs=shBs=shN=0
      for(shDx=-shR;shDx<=shR;shDx++){shNx=shX+shDx;if(shNx<0||shNx>=w)continue;var shI=(shY*w+shNx)*4;shRs+=shTmp[shI];shGs+=shTmp[shI+1];shBs+=shTmp[shI+2];shN++}
      var shO=(shY*w+shX)*4;shLine[shO]=shRs/shN;shLine[shO+1]=shGs/shN;shLine[shO+2]=shBs/shN;shLine[shO+3]=shTmp[shO+3]
    }
    var shLine2=new Uint8ClampedArray(d.length)
    for(shY=0;shY<h;shY++) for(shX=0;shX<w;shX++){
      shRs=shGs=shBs=shN=0
      for(shDy=-shR;shDy<=shR;shDy++){shNy=shY+shDy;if(shNy<0||shNy>=h)continue;var shI=(shNy*w+shX)*4;shRs+=shLine[shI];shGs+=shLine[shI+1];shBs+=shLine[shI+2];shN++}
      var shO=(shY*w+shX)*4;shLine2[shO]=shRs/shN;shLine2[shO+1]=shGs/shN;shLine2[shO+2]=shBs/shN;shLine2[shO+3]=shLine[shO+3]
    }
    for(i=0;i<d.length;i+=4){
      d[i]  =Math.min(255,Math.max(0,Math.round(shTmp[i]  +shAmt*(shTmp[i]  -shLine2[i]))))
      d[i+1]=Math.min(255,Math.max(0,Math.round(shTmp[i+1]+shAmt*(shTmp[i+1]-shLine2[i+1]))))
      d[i+2]=Math.min(255,Math.max(0,Math.round(shTmp[i+2]+shAmt*(shTmp[i+2]-shLine2[i+2]))))
    }
  } else if (t==="vignette") {
    var vStr=(p.strength==null?80:p.strength)/100
    var vRad=p.radius==null?.65:p.radius
    var vSoft=p.softness==null?.45:p.softness
    var vCol=p.color||"#000000"
    var vHex=vCol.replace("#","")
    if(vHex.length===3)vHex=vHex.split("").map(function(cc){return cc+cc}).join("")
    var vR=parseInt(vHex.slice(0,2),16)/255,vG=parseInt(vHex.slice(2,4),16)/255,vB=parseInt(vHex.slice(4,6),16)/255
    var cx=w/2,cy=h/2,maxD=Math.sqrt(cx*cx+cy*cy)
    for(i=0;i<d.length;i+=4){
      var vPx=(i/4)%w, vPy=Math.floor((i/4)/w)
      var vDist=Math.sqrt((vPx-cx)*(vPx-cx)+(vPy-cy)*(vPy-cy))/(maxD*vRad)
      var vM=Math.max(0,Math.min(1,(vDist-1+vSoft)/vSoft))*vStr
      d[i]  =Math.round(d[i]  *(1-vM)+vR*255*vM)
      d[i+1]=Math.round(d[i+1]*(1-vM)+vG*255*vM)
      d[i+2]=Math.round(d[i+2]*(1-vM)+vB*255*vM)
    }
  } else if (t==="chromatic-ab") {
    // Split RGB channels and offset them by distance along angle
    var caD=p.distance==null?6:p.distance
    var caAng=((p.angle||45)*Math.PI/180)
    var caDx=Math.round(Math.cos(caAng)*caD), caDy=Math.round(Math.sin(caAng)*caD)
    var caOrig=new Uint8ClampedArray(d)
    function caSample(px,py,ch){
      if(px<0||px>=w||py<0||py>=h)return 0
      return caOrig[(py*w+px)*4+ch]
    }
    for(i=0;i<d.length;i+=4){
      var caPx=(i/4)%w, caPy=Math.floor((i/4)/w)
      d[i]  =caSample(caPx+caDx, caPy+caDy, 0)  // R shifted forward
      // G stays in place
      d[i+2]=caSample(caPx-caDx, caPy-caDy, 2)  // B shifted backward
    }
  } else if (t==="glow") {
    // Bloom: extract pixels above threshold, blur heavily, screen over original
    var glR=Math.max(1,Math.round(p.radius||12))
    var glStr=(p.strength==null?60:p.strength)/100
    var glThr=p.threshold==null?120:p.threshold
    var glOrig=new Uint8ClampedArray(d)
    // Extract bright areas
    var glBright=new Uint8ClampedArray(d.length)
    for(i=0;i<d.length;i+=4){
      var glLum=.299*d[i]+.587*d[i+1]+.114*d[i+2]
      var glM=Math.max(0,(glLum-glThr)/(255-glThr))
      glBright[i]=d[i]*glM; glBright[i+1]=d[i+1]*glM; glBright[i+2]=d[i+2]*glM; glBright[i+3]=255
    }
    // Box blur bright layer (2 passes for speed)
    function glBlur(src,r){
      var tmp=new Uint8ClampedArray(src.length)
      var gx,gy,gd,gn,gs,pi
      for(gy=0;gy<h;gy++) for(gx=0;gx<w;gx++){
        var rs=0,gs2=0,bs=0,n=0
        for(gd=-r;gd<=r;gd++){var nx=gx+gd;if(nx<0||nx>=w)continue;pi=(gy*w+nx)*4;rs+=src[pi];gs2+=src[pi+1];bs+=src[pi+2];n++}
        pi=(gy*w+gx)*4;tmp[pi]=rs/n;tmp[pi+1]=gs2/n;tmp[pi+2]=bs/n;tmp[pi+3]=255
      }
      var out=new Uint8ClampedArray(tmp.length)
      for(gy=0;gy<h;gy++) for(gx=0;gx<w;gx++){
        var rs=0,gs2=0,bs=0,n=0
        for(gd=-r;gd<=r;gd++){var ny=gy+gd;if(ny<0||ny>=h)continue;pi=(ny*w+gx)*4;rs+=tmp[pi];gs2+=tmp[pi+1];bs+=tmp[pi+2];n++}
        pi=(gy*w+gx)*4;out[pi]=rs/n;out[pi+1]=gs2/n;out[pi+2]=bs/n;out[pi+3]=255
      }
      return out
    }
    var glBlurred=glBlur(glBright,glR)
    // Screen blend at strength
    for(i=0;i<d.length;i+=4){
      var glB=glBlurred[i]*glStr, glG=glBlurred[i+1]*glStr, glBl=glBlurred[i+2]*glStr
      d[i]  =Math.min(255,Math.round(255-(255-d[i])*(255-glB)/255))
      d[i+1]=Math.min(255,Math.round(255-(255-d[i+1])*(255-glG)/255))
      d[i+2]=Math.min(255,Math.round(255-(255-d[i+2])*(255-glBl)/255))
    }
  } else if (t==="emboss") {
    var emAng=((p.angle==null?135:p.angle)*Math.PI/180)
    var emStr=(p.strength==null?100:p.strength)/100
    var emFlat=p.flat==null?128:p.flat
    var emKx=Math.cos(emAng), emKy=Math.sin(emAng)
    var emOrig=new Uint8ClampedArray(d)
    function emLum(px,py){
      if(px<0||px>=w||py<0||py>=h){var ii2=(Math.max(0,Math.min(h-1,py))*w+Math.max(0,Math.min(w-1,px)))*4;return(.299*emOrig[ii2]+.587*emOrig[ii2+1]+.114*emOrig[ii2+2])/255}
      var ii2=(py*w+px)*4;return(.299*emOrig[ii2]+.587*emOrig[ii2+1]+.114*emOrig[ii2+2])/255
    }
    for(i=0;i<d.length;i+=4){
      var emPx=(i/4)%w, emPy=Math.floor((i/4)/w)
      var emGx=emLum(emPx+1,emPy)-emLum(emPx-1,emPy)
      var emGy=emLum(emPx,emPy+1)-emLum(emPx,emPy-1)
      var emV=Math.round(emFlat+(emGx*emKx+emGy*emKy)*128*emStr)
      emV=Math.min(255,Math.max(0,emV))
      d[i]=emV; d[i+1]=emV; d[i+2]=emV
    }
  } else if (t==="edge-detect") {
    var edStr=(p.strength==null?100:p.strength)/100
    var edInv=!!p.invert
    var edOrig=new Uint8ClampedArray(d)
    function edLum2(px,py){
      if(px<0||px>=w||py<0||py>=h)return 0
      var ii2=(py*w+px)*4;return(.299*edOrig[ii2]+.587*edOrig[ii2+1]+.114*edOrig[ii2+2])/255
    }
    for(i=0;i<d.length;i+=4){
      var edPx=(i/4)%w, edPy=Math.floor((i/4)/w)
      var edGx=-edLum2(edPx-1,edPy-1)-2*edLum2(edPx-1,edPy)-edLum2(edPx-1,edPy+1)
                +edLum2(edPx+1,edPy-1)+2*edLum2(edPx+1,edPy)+edLum2(edPx+1,edPy+1)
      var edGy=-edLum2(edPx-1,edPy-1)-2*edLum2(edPx,edPy-1)-edLum2(edPx+1,edPy-1)
                +edLum2(edPx-1,edPy+1)+2*edLum2(edPx,edPy+1)+edLum2(edPx+1,edPy+1)
      var edM=Math.min(1,Math.sqrt(edGx*edGx+edGy*edGy)*edStr)
      var edV=Math.round((edInv?1-edM:edM)*255)
      d[i]=edV; d[i+1]=edV; d[i+2]=edV
    }
  } else if (t==="pixelate") {
    var pxSz=Math.max(2,Math.round(p.size||8))
    var pxOrig=new Uint8ClampedArray(d)
    for(i=0;i<d.length;i+=4){
      var pxX=(i/4)%w, pxY=Math.floor((i/4)/w)
      var pxBx=Math.floor(pxX/pxSz)*pxSz, pxBy=Math.floor(pxY/pxSz)*pxSz
      // sample centre of block
      var pxCx=Math.min(w-1,pxBx+Math.floor(pxSz/2)), pxCy=Math.min(h-1,pxBy+Math.floor(pxSz/2))
      var pxSrc=(pxCy*w+pxCx)*4
      d[i]=pxOrig[pxSrc]; d[i+1]=pxOrig[pxSrc+1]; d[i+2]=pxOrig[pxSrc+2]
    }
  } else if (t==="duotone") {
    // Map shadows → p.shadow colour, highlights → p.highlight colour via luminosity
    var dtSh=p.shadow||"#000000", dtHi=p.highlight||"#ffffff"
    function dtHex(h2){var s2=h2.replace("#","");if(s2.length===3)s2=s2.split("").map(function(c){return c+c}).join("");return[parseInt(s2.slice(0,2),16)||0,parseInt(s2.slice(2,4),16)||0,parseInt(s2.slice(4,6),16)||0]}
    var shC=dtHex(dtSh), hiC=dtHex(dtHi)
    for(i=0;i<d.length;i+=4){
      var dtL=(.299*d[i]+.587*d[i+1]+.114*d[i+2])/255
      d[i]  =Math.round(shC[0]+(hiC[0]-shC[0])*dtL)
      d[i+1]=Math.round(shC[1]+(hiC[1]-shC[1])*dtL)
      d[i+2]=Math.round(shC[2]+(hiC[2]-shC[2])*dtL)
    }
  } else if (t==="wave") {
    // Sinusoidal pixel displacement with optional per-param randomisation
    var wRnd=seededRand(p.rSeed||1)
    function wRv(v,en,sc,bi,amt,off){if(!en)return v;var r=wRnd();if(bi!==false)r=r*2-1;return v+(r+(off||0))*(sc||.5)*(amt==null?1:amt)}
    var wAmp=wRv(p.amplitude||0.05,p.rAmpEn,p.rAmpSc,p.rAmpBi,p.rAmpAmt,p.rAmpOff)*Math.max(w,h)
    var wFreqX=wRv(p.freqX||3,p.rFxEn,p.rFxSc,p.rFxBi,p.rFxAmt,p.rFxOff)
    var wFreqY=wRv(p.freqY||3,p.rFyEn,p.rFySc,p.rFyBi,p.rFyAmt,p.rFyOff)
    var wPhaseX=p.phaseX||0, wPhaseY=p.phaseY||0
    var orig=new Uint8ClampedArray(d)
    for(i=0;i<w*h;i++){
      var wx=i%w,wy=Math.floor(i/w)
      var sx=Math.round(wx+Math.sin(wy/h*wFreqX*Math.PI*2+wPhaseX)*wAmp)
      var sy=Math.round(wy+Math.sin(wx/w*wFreqY*Math.PI*2+wPhaseY)*wAmp)
      sx=Math.max(0,Math.min(w-1,sx)); sy=Math.max(0,Math.min(h-1,sy))
      var si=(sy*w+sx)*4, di=i*4
      d[di]=orig[si];d[di+1]=orig[si+1];d[di+2]=orig[si+2];d[di+3]=orig[si+3]
    }
  } else if (t==="twirl") {
    // Rotate pixels around centre with angle decreasing with distance
    var tAngle=(p.angle||180)*Math.PI/180, tRadius=(p.radius||0.5)*Math.min(w,h)*0.5
    var tcx=p.cx!=null?p.cx*w:w/2, tcy=p.cy!=null?p.cy*h:h/2
    var orig2=new Uint8ClampedArray(d)
    for(i=0;i<w*h;i++){
      var tx=i%w-tcx, ty=Math.floor(i/w)-tcy
      var dist2=Math.sqrt(tx*tx+ty*ty)
      if(dist2<tRadius){
        var a=tAngle*(1-dist2/tRadius)
        var ca=Math.cos(a),sa=Math.sin(a)
        var sx2=Math.round(tcx+tx*ca-ty*sa), sy2=Math.round(tcy+tx*sa+ty*ca)
        sx2=Math.max(0,Math.min(w-1,sx2)); sy2=Math.max(0,Math.min(h-1,sy2))
        var si2=(sy2*w+sx2)*4, di2=i*4
        d[di2]=orig2[si2];d[di2+1]=orig2[si2+1];d[di2+2]=orig2[si2+2];d[di2+3]=orig2[si2+3]
      }
    }
  } else if (t==="bulge") {
    // Radial bulge/pinch from centre
    var bStrength=p.strength||0.5, bRadius=(p.radius||0.7)*Math.min(w,h)*0.5
    var bcx=p.cx!=null?p.cx*w:w/2, bcy=p.cy!=null?p.cy*h:h/2
    var orig3=new Uint8ClampedArray(d)
    for(i=0;i<w*h;i++){
      var bx=i%w-bcx, by=Math.floor(i/w)-bcy
      var bd=Math.sqrt(bx*bx+by*by)
      if(bd<bRadius&&bd>0){
        var norm=bd/bRadius
        var newR=norm>0?Math.pow(norm,1/(1+bStrength))*bRadius:0
        var scale=newR/bd
        var sx3=Math.round(bcx+bx*scale), sy3=Math.round(bcy+by*scale)
        sx3=Math.max(0,Math.min(w-1,sx3)); sy3=Math.max(0,Math.min(h-1,sy3))
        var si3=(sy3*w+sx3)*4, di3=i*4
        d[di3]=orig3[si3];d[di3+1]=orig3[si3+1];d[di3+2]=orig3[si3+2];d[di3+3]=orig3[si3+3]
      }
    }
  } else if (t==="solarise") {
    // Invert pixels above threshold — classic solarisation/sabattier effect
    var solT=(p.threshold||0.5)*255
    for(i=0;i<d.length;i+=4){
      var lum=.299*d[i]+.587*d[i+1]+.114*d[i+2]
      if(lum>solT){d[i]=255-d[i];d[i+1]=255-d[i+1];d[i+2]=255-d[i+2]}
    }
  }
  // NOTE: "transform", "uv-distort", "polar-to-cart", "cart-to-polar"
  // are handled specially in applyEfxStk (need full canvas context)
}
// Pixel-based affine transform — rasterises through a 2D canvas matrix.
// Operates on the full canvas context, not ImageData, because it requires
// a resampled draw-call rather than a pixel-by-pixel loop.
// Matrix order: translate-to-centre → skew → rotate → scale → translate-back → user-offset
function applyTransform(ctx, p, w, h) {
  var tx   = (p.tx   || 0) * w         // translate x in pixels
  var ty   = (p.ty   || 0) * h         // translate y in pixels
  var rot  = (p.rot  || 0) * Math.PI / 180
  var su   = p.su != null ? p.su : 1   // uniform scale
  var sx   = (p.sx   != null ? p.sx : 1) * su
  var sy   = (p.sy   != null ? p.sy : 1) * su
  var skX  = (p.skX  || 0) * Math.PI / 180  // skew X radians
  var skY  = (p.skY  || 0) * Math.PI / 180  // skew Y radians
  var cx = w / 2, cy = h / 2

  // Snap current pixels to a scratch canvas
  var snap = document.createElement("canvas"); snap.width=w; snap.height=h
  snap.getContext("2d").drawImage(ctx.canvas, 0, 0)

  ctx.clearRect(0, 0, w, h)
  ctx.save()

  // Build composed matrix around image centre:
  // 1) shift origin to centre of image
  // 2) apply user translate offset
  // 3) apply skew (shear)
  // 4) rotate
  // 5) scale
  // 6) shift origin back
  ctx.translate(cx + tx, cy + ty)
  if (skX !== 0 || skY !== 0) {
    ctx.transform(1, Math.tan(skY), Math.tan(skX), 1, 0, 0)
  }
  ctx.rotate(rot)
  ctx.scale(sx, sy)
  ctx.translate(-cx, -cy)

  ctx.drawImage(snap, 0, 0)
  ctx.restore()
}

/* ─── GENERATORS ─────────────────────────────────────────── */
function gSolid(ctx,p,w,h) { ctx.save();ctx.globalAlpha=p.alpha==null?1:p.alpha;ctx.fillStyle=p.color||"#000";ctx.fillRect(0,0,w,h);ctx.restore() }
function gShape(ctx,p,w,h) {
  var s=p.shapeType||"ellipse",x=p.x||.5,y=p.y||.5,sz=p.sz||.6,rot=p.rot||0
  var fill=p.fill||"#fff",stroke=p.stroke||"#000",strokeW=p.strokeW||0
  var strokeOpacity=p.strokeOpacity==null?1:p.strokeOpacity
  var pts=Math.round(p.pts||5),innerR=p.innerR||.45,sides=Math.round(p.sides||5),ringR=p.ringR||.62
  var opacity=p.opacity==null?(p.alpha==null?1:p.alpha):p.opacity
  var rx=p.rx==null?1:p.rx, ry=p.ry==null?1:p.ry
  var cornerR=p.cornerR||0.2  // for rounded-rect: corner radius fraction
  var jitter=p.jitter||0, jitterSeed=p.jitterSeed||1
  var renderMode=p.renderMode||"smooth"  // "smooth" = arcs, "faceted" = line segments
  var segs=Math.max(3,Math.round(p.segments||32))  // faceted segment count
  var rnd=seededRand(jitterSeed)
  var sc=2, sw2=w*sc, sh2=h*sc
  var tc=document.createElement("canvas"); tc.width=sw2; tc.height=sh2
  var tc2=tc.getContext("2d")
  var r=sz*Math.min(sw2,sh2)/2
  tc2.translate(x*sw2,y*sh2); tc2.rotate(rot*Math.PI/180)

  // Helper: jittered vertex
  function jv(vx,vy) {
    if(!jitter) return [vx,vy]
    return [vx+(rnd()-0.5)*2*jitter*r, vy+(rnd()-0.5)*2*jitter*r]
  }
  // Helper: sample ellipse at angle a with rx/ry
  function ev(a) { return jv(Math.cos(a)*r*rx, Math.sin(a)*r*ry) }
  // Helper: draw closed point list
  function drawPts(pts2) {
    tc2.beginPath()
    tc2.moveTo(pts2[0][0],pts2[0][1])
    for(var k=1;k<pts2.length;k++) tc2.lineTo(pts2[k][0],pts2[k][1])
    tc2.closePath()
  }

  tc2.beginPath()
  // Smooth closed curve through jittered points (midpoint bezier method)
  // Used when smooth mode + jitter>0, giving organic warped smooth shapes
  function drawSmooth(pts2) {
    if(pts2.length<3){drawPts(pts2);return}
    tc2.beginPath()
    var n=pts2.length
    for(var si=0;si<n;si++){
      var p0=pts2[(si-1+n)%n], p1=pts2[si], p2=pts2[(si+1)%n]
      var mx1=(p0[0]+p1[0])/2, my1=(p0[1]+p1[1])/2
      var mx2=(p1[0]+p2[0])/2, my2=(p1[1]+p2[1])/2
      if(si===0) tc2.moveTo(mx1,my1)
      tc2.quadraticCurveTo(p1[0],p1[1],mx2,my2)
    }
    tc2.closePath()
  }

  if(s==="ellipse") {
    if(renderMode==="faceted") {
      var epts=[]; for(var ei=0;ei<segs;ei++) epts.push(ev(ei*Math.PI*2/segs))
      drawPts(epts)
    } else if(jitter>0) {
      // Smooth jitter: sample ellipse as points, draw smooth curve through them
      var ejpts=[]; for(var eji=0;eji<segs;eji++) ejpts.push(ev(eji*Math.PI*2/segs))
      drawSmooth(ejpts)
    } else { tc2.ellipse(0,0,r*rx,r*ry,0,0,Math.PI*2) }
  }
  else if(s==="rectangle") {
    if(renderMode==="faceted") {
      var rw2=r*rx, rh2=r*ry
      var edgeSegs=Math.max(1,Math.round(segs/4))
      var rpts=[]
      for(var ri=0;ri<edgeSegs;ri++) rpts.push(jv(-rw2+ri*2*rw2/edgeSegs,-rh2))
      for(var ri2=0;ri2<edgeSegs;ri2++) rpts.push(jv(rw2,-rh2+ri2*2*rh2/edgeSegs))
      for(var ri3=0;ri3<edgeSegs;ri3++) rpts.push(jv(rw2-ri3*2*rw2/edgeSegs,rh2))
      for(var ri4=0;ri4<edgeSegs;ri4++) rpts.push(jv(-rw2,rh2-ri4*2*rh2/edgeSegs))
      drawPts(rpts)
    } else if(jitter>0) {
      var rw3=r*rx, rh3=r*ry
      var rjSegs=Math.max(1,Math.round(segs/4))
      var rjpts=[]
      for(var rj=0;rj<rjSegs;rj++) rjpts.push(jv(-rw3+rj*2*rw3/rjSegs,-rh3))
      for(var rj2=0;rj2<rjSegs;rj2++) rjpts.push(jv(rw3,-rh3+rj2*2*rh3/rjSegs))
      for(var rj3=0;rj3<rjSegs;rj3++) rjpts.push(jv(rw3-rj3*2*rw3/rjSegs,rh3))
      for(var rj4=0;rj4<rjSegs;rj4++) rjpts.push(jv(-rw3,rh3-rj4*2*rh3/rjSegs))
      drawSmooth(rjpts)
    } else { tc2.rect(-r*rx,-r*ry,r*rx*2,r*ry*2) }
  }
  else if(s==="rounded-rect") {
    var rrW=r*rx, rrH=r*ry, cr=Math.min(rrW,rrH)*Math.max(0,Math.min(1,cornerR))
    if(renderMode==="faceted"||jitter>0) {
      var cornerSegs=Math.max(2,Math.round(segs/8))
      var rrpts=[]
      var corners=[[-rrW+cr,-rrH+cr,Math.PI,3*Math.PI/2],[rrW-cr,-rrH+cr,3*Math.PI/2,2*Math.PI],[rrW-cr,rrH-cr,0,Math.PI/2],[-rrW+cr,rrH-cr,Math.PI/2,Math.PI]]
      for(var ci=0;ci<corners.length;ci++){
        var co=corners[ci]
        for(var cs2=0;cs2<=cornerSegs;cs2++){
          var ca=co[2]+(co[3]-co[2])*cs2/cornerSegs
          rrpts.push(jv(co[0]+Math.cos(ca)*cr, co[1]+Math.sin(ca)*cr))
        }
      }
      if(renderMode==="faceted") drawPts(rrpts)
      else drawSmooth(rrpts)  // smooth jitter on rounded-rect
    } else {
      tc2.roundRect(-rrW,-rrH,rrW*2,rrH*2,cr)
    }
  }
  else if(s==="polygon"){
    var polyPts=[]
    for(var i=0;i<sides;i++){
      var a=(i*2*Math.PI/sides)-Math.PI/2
      polyPts.push(jv(Math.cos(a)*r, Math.sin(a)*r))
    }
    if(renderMode==="smooth"&&jitter>0) drawSmooth(polyPts)
    else drawPts(polyPts)
  }
  else if(s==="star"){
    var ir=r*innerR, starPts=[]
    for(var j=0;j<pts*2;j++){
      var a2=(j*Math.PI/pts)-Math.PI/2, rr=j%2===0?r:ir
      var v=j%2===0?jv(Math.cos(a2)*rr,Math.sin(a2)*rr):[Math.cos(a2)*rr,Math.sin(a2)*rr]
      starPts.push(v)
    }
    // Stars keep straight lines between points even in smooth mode — otherwise tips disappear
    drawPts(starPts)
  }
  else if(s==="ring"){
    if(renderMode==="faceted") {
      var outerPts=[]; for(var oi=0;oi<segs;oi++) outerPts.push(jv(Math.cos(oi*Math.PI*2/segs)*r,Math.sin(oi*Math.PI*2/segs)*r))
      drawPts(outerPts)
      var innerPts=[]; for(var ii=0;ii<segs;ii++) innerPts.push(jv(Math.cos(ii*Math.PI*2/segs)*r*ringR,Math.sin(ii*Math.PI*2/segs)*r*ringR))
      tc2.moveTo(innerPts[0][0],innerPts[0][1])
      for(var ik=1;ik<innerPts.length;ik++) tc2.lineTo(innerPts[ik][0],innerPts[ik][1])
      tc2.closePath()
    } else if(jitter>0) {
      // Smooth jitter on ring — both outer and inner drawn as smooth curves
      var rOutPts=[]; for(var ro=0;ro<segs;ro++) rOutPts.push(jv(Math.cos(ro*Math.PI*2/segs)*r,Math.sin(ro*Math.PI*2/segs)*r))
      drawSmooth(rOutPts)
      // Inner ring as separate smooth path (evenodd cuts hole)
      var rInPts=[]; var rndInner=seededRand(jitterSeed+9999)
      function jvI(vx,vy){if(!jitter)return[vx,vy];return[vx+(rndInner()-0.5)*2*jitter*r*ringR,vy+(rndInner()-0.5)*2*jitter*r*ringR]}
      for(var ri5=0;ri5<segs;ri5++) rInPts.push(jvI(Math.cos(ri5*Math.PI*2/segs)*r*ringR,Math.sin(ri5*Math.PI*2/segs)*r*ringR))
      drawSmooth(rInPts)
    } else {
      tc2.arc(0,0,r,0,Math.PI*2); tc2.moveTo(r*ringR,0); tc2.arc(0,0,r*ringR,0,Math.PI*2,true)
    }
  }

  if(fill&&fill!=="none"){
    tc2.globalAlpha=p.fillOpacity==null?1:p.fillOpacity
    tc2.fillStyle=fill;tc2.fill("evenodd")
    tc2.globalAlpha=1
  }
  if(strokeW>0){
    tc2.globalAlpha=strokeOpacity
    tc2.strokeStyle=stroke;tc2.lineWidth=strokeW*sc;tc2.stroke()
    tc2.globalAlpha=1
  }
  ctx.save();ctx.globalAlpha=opacity;ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality="high"
  ctx.drawImage(tc,0,0,w,h);ctx.restore()
}
function gradStops(p) {
  // Migrate old c1/s1/c2/s2 format to stops array, or return existing stops.
  // stops: [{pos:0-1, color:"#rrggbb", alpha:0-1}]
  if(p.stops&&p.stops.length>=2) return p.stops
  var c1=p.c1||"#f03",c2=p.c2||"#00f"
  return [{pos:p.s1||0,color:c1,alpha:p.a1==null?1:p.a1},{pos:p.s2||1,color:c2,alpha:p.a2==null?1:p.a2}]
}
function gradRgba(color,alpha) {
  var s=(color||"#000000").replace("#","")
  if(s.length===3)s=s.split("").map(function(c){return c+c}).join("")
  var r=parseInt(s.slice(0,2),16)||0,g=parseInt(s.slice(2,4),16)||0,b=parseInt(s.slice(4,6),16)||0
  return "rgba("+r+","+g+","+b+","+(alpha==null?1:alpha)+")"
}
function gGrad(ctx,p,w,h) {
  var gType=p.gType||"radial"
  var angle=p.angle||90,cx=p.cx||.5,cy=p.cy||.5,r=p.r||.7,sa=p.sa||0,alpha=p.alpha==null?1:p.alpha
  var stops=gradStops(p).slice().sort(function(a,b){return a.pos-b.pos})
  ctx.save();ctx.globalAlpha=alpha;var g
  try {
    if(gType==="linear"){var rd=angle*Math.PI/180,d=Math.max(w,h)/2;g=ctx.createLinearGradient(w/2-Math.cos(rd)*d,h/2-Math.sin(rd)*d,w/2+Math.cos(rd)*d,h/2+Math.sin(rd)*d)}
    else if(gType==="radial")g=ctx.createRadialGradient(cx*w,cy*h,0,cx*w,cy*h,r*Math.max(w,h))
    else g=ctx.createConicGradient(sa*Math.PI/180,cx*w,cy*h)
    stops.forEach(function(st){g.addColorStop(Math.max(0,Math.min(1,st.pos)),gradRgba(st.color,st.alpha))})
    ctx.fillStyle=g
  } catch(e){ctx.fillStyle=stops[0]?stops[0].color:"#f03"}
  ctx.fillRect(0,0,w,h);ctx.restore()
}
function gNoise(ctx,p,w,h) {
  var nType=p.nType||"perlin",c1=p.c1||"#fff",c2=p.c2||"#000"
  var scale=p.scale||.04,oct=p.oct||4,seed=p.seed||1,alpha=p.alpha==null?1:p.alpha
  var lac=p.lac||2.0,gain=p.gain||.5  // fBm params
  var wJitter=p.wJitter==null?1:p.wJitter  // worley jitter
  var mFreq=p.mFreq||4,mTurb=p.mTurb||2   // marble/wood freq+turb
  var CA=h2r(c1),CB=h2r(c2)
  var ds=2,dw=Math.ceil(w/ds),dh=Math.ceil(h/ds)
  var img=ctx.createImageData(dw,dh),d=img.data
  for(var py=0;py<dh;py++) for(var px=0;px<dw;px++){
    var sx=px*scale, sy=py*scale, v
    switch(nType){
      case "perlin":     v=octN(sx,sy,oct,seed); break
      case "fbm":        v=fbm(sx,sy,oct,lac,gain,seed); break
      case "turbulence": v=turbulence(sx,sy,oct,seed); break
      case "worley":     v=worley(sx,sy,seed,wJitter); break
      case "simplex":    v=simplex2(sx,sy,seed); break
      case "marble":     v=marble(sx,sy,oct,seed,mFreq,mTurb); break
      case "wood":       v=wood(sx,sy,oct,seed,mFreq,mTurb); break
      case "value":      v=vn(sx,sy,seed); break
      default:           v=vh(px,py,seed)
    }
    v=Math.max(0,Math.min(1,v))
    var c=lrC(CB,CA,v),idx=(py*dw+px)*4
    d[idx]=c.r;d[idx+1]=c.g;d[idx+2]=c.b;d[idx+3]=255
  }
  var tc=document.createElement("canvas");tc.width=dw;tc.height=dh
  tc.getContext("2d").putImageData(img,0,0)
  ctx.save();ctx.globalAlpha=alpha;ctx.imageSmoothingEnabled=true;ctx.drawImage(tc,0,0,w,h);ctx.restore()
}
function gPat(ctx,p,w,h) {
  var pType=p.pType||"checkerboard",c1=p.c1||"#fff",c2=p.c2||"#000"
  var scale=p.scale||.1,sw=p.sw||.1,angle=p.angle||0,dr=p.dr||.03,ds=p.ds||.1
  var alpha=p.alpha==null?1:p.alpha
  var a1=p.a1==null?1:p.a1, a2=p.a2==null?1:p.a2
  var CA=h2r(c1),CB=h2r(c2)
  var img=ctx.createImageData(w,h),d=img.data
  var cs   = Math.max(2, scale * Math.max(w,h))
  var sW   = Math.max(1, sw * Math.max(w,h))
  var dR   = Math.max(1, dr * Math.max(w,h))
  var dS   = Math.max(2, ds * Math.max(w,h))
  var rad  = angle * Math.PI / 180
  var cx2  = w/2, cy2 = h/2

  for(var py=0;py<h;py++) for(var px=0;px<w;px++){
    var ii=(py*w+px)*4, r, g, b

    if(pType==="checkerboard"){
      // Rotation: rotate pixel around canvas centre before grid lookup
      var rpx=px-cx2, rpy=py-cy2
      var rx2=rpx*Math.cos(rad)-rpy*Math.sin(rad)+cx2
      var ry2=rpx*Math.sin(rad)+rpy*Math.cos(rad)+cy2
      var t=(Math.floor(rx2/cs)+Math.floor(ry2/cs))%2
      if(t<0)t+=2
      r=t===0?CA.r:CB.r; g=t===0?CA.g:CB.g; b=t===0?CA.b:CB.b
      d[ii]=r;d[ii+1]=g;d[ii+2]=b;d[ii+3]=Math.round((t===0?a1:a2)*255)

    } else if(pType==="stripes"){
      var pj=px*Math.cos(rad)+py*Math.sin(rad)
      var t2=((pj%(sW*2))+sW*2)%(sW*2)<sW?0:1
      r=t2===0?CA.r:CB.r; g=t2===0?CA.g:CB.g; b=t2===0?CA.b:CB.b
      d[ii]=r;d[ii+1]=g;d[ii+2]=b;d[ii+3]=Math.round((t2===0?a1:a2)*255)

    } else if(pType==="dots"){
      // Rotation: rotate pixel around centre for dot grid
      var dpx=px-cx2, dpy=py-cy2
      var drx=dpx*Math.cos(rad)-dpy*Math.sin(rad)
      var dry=dpx*Math.sin(rad)+dpy*Math.cos(rad)
      var gx=((drx%dS)+dS)%dS-dS/2
      var gy=((dry%dS)+dS)%dS-dS/2
      var dist=Math.sqrt(gx*gx+gy*gy)
      var blend=Math.max(0,Math.min(1,dist-dR+0.5))
      r=Math.round(CA.r*(1-blend)+CB.r*blend)
      g=Math.round(CA.g*(1-blend)+CB.g*blend)
      b=Math.round(CA.b*(1-blend)+CB.b*blend)
      d[ii]=r;d[ii+1]=g;d[ii+2]=b;d[ii+3]=Math.round((a1*(1-blend)+a2*blend)*255)
    } else if(pType==="diamond"){
      // Rotate pixel around centre
      var ddpx=px-cx2, ddpy=py-cy2
      var ddrx=ddpx*Math.cos(rad)-ddpy*Math.sin(rad)
      var ddry=ddpx*Math.sin(rad)+ddpy*Math.cos(rad)
      // Diamond grid: |x/cs| + |y/cs| creates diamond/rhombus tiling
      var dcs=Math.max(2,scale*Math.max(w,h))
      var dgx=((ddrx%dcs)+dcs)%dcs-dcs/2
      var dgy=((ddry%dcs)+dcs)%dcs-dcs/2
      // Diamond check: |x|+|y| < half_cell
      var inside=Math.abs(dgx)+Math.abs(dgy)<dcs/2
      r=inside?CA.r:CB.r; g=inside?CA.g:CB.g; b=inside?CA.b:CB.b
      d[ii]=r;d[ii+1]=g;d[ii+2]=b;d[ii+3]=Math.round((inside?a1:a2)*255)
    }
  }
  ctx.save();ctx.globalAlpha=alpha;ctx.putImageData(img,0,0);ctx.restore()
}
// ── Tile pattern engine ──────────────────────────────────────────────────────
// Renders a source node and stamps it in a grid with per-cell randomisation.
// Takes cmap/cache/iC/vis for source resolution — dispatched specially from compAny.
function gTile(ctx,p,cmap,cache,iC,w,h,vis) {
  var refId=p.refId
  var cols=Math.max(1,Math.round(p.cols||4))
  var rows=Math.max(1,Math.round(p.rows||4))
  var gapFX=Math.max(0,p.gapX||0)
  var gapFY=Math.max(0,p.gapY||0)
  var gapMode=p.gapMode||"spacing"  // "spacing"=spread: tiles stay full size, grid expands | "inset"=shrink: tile reduces, cell spacing fixed
  var tileW=w/cols, tileH=h/rows    // base cell size

  var stampW, stampH, cellSpacingW, cellSpacingH
  if(gapMode==="inset"){
    // Inset: gap reduces stamp size, cell spacing unchanged
    // Tile shrinks, cell centres stay on the original grid
    stampW=Math.max(1,tileW*(1-Math.min(.98,gapFX)))
    stampH=Math.max(1,tileH*(1-Math.min(.98,gapFY)))
    cellSpacingW=tileW; cellSpacingH=tileH
  } else {
    // Spacing: gap adds space between tiles, stamp stays full cell size
    // Cell spacing grows, grid expands beyond canvas — wrap/clamp handles edges
    stampW=tileW; stampH=tileH
    cellSpacingW=tileW*(1+gapFX)
    cellSpacingH=tileH*(1+gapFY)
  }
  var stagger=p.stagger||0
  var staggerAxis=p.staggerAxis||"row"
  var offX=(p.offX||0)*tileW, offY=(p.offY||0)*tileH
  var baseRot=(p.rotation||0)*Math.PI/180
  var baseScale=p.scale==null?1:p.scale
  var baseOpacity=p.opacity==null?1:p.opacity
  var masterSeed=p.seed||1
  var bgC=h2r(p.bgColor||"#000000")
  var bgA=p.bgOpacity==null?0:p.bgOpacity
  var wrap=p.wrap||"clamp"
  var flipXP=p.flipXProb||0, flipYP=p.flipYProb||0

  // Per-cell deterministic RNG — unique seed per cell per property
  // propertySeed allows each randomised param to have its own independent seed
  function cellRnd(col,row,ch,propertySeed){
    var ps=propertySeed||0
    return seededRand(masterSeed*13+ps*997+col*1009+row*100003+ch*7)
  }
  // negateUni: for params like opacity where base=1 and unipolar should REDUCE not increase
  function rv2(rnd2,en,base,sc,bi,amt,off,negateUni){
    if(!en)return base
    var r=rnd2()
    if(bi!==false) r=r*2-1          // bipolar: -1 to 1
    else if(negateUni) r=-r         // unipolar reduce: 0 to -1 (reduces from base)
    // else unipolar: 0 to 1 (default, adds to base)
    return base+(r+(off||0))*(sc==null?.5:sc)*(amt==null?1:amt)
  }

  // Render source at stamp dimensions at 2× for SSAA quality then downscale.
  // Spacing mode: stampW = tileW (full cell, gap is additive)
  // Inset mode:   stampW = tileW*(1-gap) (tile shrinks, cell spacing fixed)
  var srcCv=null
  if(refId&&cmap){
    var sW2=Math.round(stampW*2), sH2=Math.round(stampH*2)
    var rawHi=compAny(refId,cmap,cache,iC,sW2,sH2,new Set(vis||[]))
    if(rawHi){
      // Downscale to stamp size for SSAA quality
      var sCV=document.createElement("canvas"); sCV.width=Math.round(stampW); sCV.height=Math.round(stampH)
      var sCTX=sCV.getContext("2d"); sCTX.imageSmoothingEnabled=true; sCTX.imageSmoothingQuality="high"
      sCTX.drawImage(rawHi,0,0,Math.round(stampW),Math.round(stampH))
      srcCv=sCV
    }
  }

  // Background
  if(bgA>0){
    ctx.save(); ctx.globalAlpha=bgA
    ctx.fillStyle="rgb("+bgC.r+","+bgC.g+","+bgC.b+")"
    ctx.fillRect(0,0,w,h); ctx.restore()
  }

  if(!srcCv)return

  ctx.imageSmoothingEnabled=true; ctx.imageSmoothingQuality="high"

  // Stamp each tile, then add extra copies for repeat/mirror overflow at edges.
  // This approach is simpler than an extended grid and handles stagger gaps correctly:
  // a tile that bleeds off the right edge stamps a copy on the left, filling the gap.
  for(var row=0;row<rows;row++){
    for(var col=0;col<cols;col++){

      // Per-cell RNG using source coordinates
      var cRot  =rv2(cellRnd(col,row,0,p.rRotSeed),  p.rRotEn,  baseRot,   p.rRotSc,  p.rRotBi,  p.rRotAmt,  p.rRotOff)
      var cScale=rv2(cellRnd(col,row,1,p.rScaleSeed),p.rScaleEn,baseScale, p.rScaleSc,p.rScaleBi,p.rScaleAmt,p.rScaleOff)
      // Opacity: unipolar (0,1) range reduces from base (negateUni=true) so it always darkens
      var cOpacity=Math.max(0,Math.min(1,rv2(cellRnd(col,row,2,p.rOpSeed),p.rOpEn,baseOpacity,p.rOpSc,p.rOpBi,p.rOpAmt,p.rOpOff,true)))
      var cOX=rv2(cellRnd(col,row,3,p.rOxSeed),p.rOxEn,0,p.rOxSc,p.rOxBi,p.rOxAmt,p.rOxOff)*tileW
      var cOY=rv2(cellRnd(col,row,4,p.rOySeed),p.rOyEn,0,p.rOySc,p.rOyBi,p.rOyAmt,p.rOyOff)*tileH
      var doFlipX=flipXP>0&&cellRnd(col,row,5)()<flipXP
      var doFlipY=flipYP>0&&cellRnd(col,row,6)()<flipYP

      // Cell centre
      var staggerOff=0
      var sp=p.staggerParity||"odd"
      var rowParity=((row%2)+2)%2, colParity=((col%2)+2)%2
      if(staggerAxis==="row"&&rowParity===(sp==="odd"?1:0)) staggerOff=stagger*cellSpacingW
      else if(staggerAxis==="col"&&colParity===(sp==="odd"?1:0)) staggerOff=stagger*cellSpacingH
      var cx3=(col+0.5)*cellSpacingW+offX+(staggerAxis==="row"?staggerOff:0)+cOX
      var cy3=(row+0.5)*cellSpacingH+offY+(staggerAxis==="col"?staggerOff:0)+cOY

      // Half-extents for overflow detection (scale affects how far stamp reaches)
      var hw=stampW/2*cScale, hh=stampH/2*cScale
      // For repeat wrap in spacing mode, use cellSpacing as the repeat period
      var wrapW=gapMode==="spacing"?cellSpacingW*cols:w
      var wrapH=gapMode==="spacing"?cellSpacingH*rows:h

      // Draw stamp function — fx/fy = extra flip for mirror copies (XOR with tile flip)
      function doStamp(dx,dy,fx,fy) {
        var flipX=(doFlipX)!==(fx||false)
        var flipY=(doFlipY)!==(fy||false)
        ctx.save()
        ctx.translate(dx,dy)
        ctx.rotate(cRot)
        ctx.scale(cScale*(flipX?-1:1),cScale*(flipY?-1:1))
        ctx.globalAlpha=cOpacity
        ctx.drawImage(srcCv,-stampW/2,-stampH/2,stampW,stampH)
        ctx.restore()
      }

      doStamp(cx3,cy3)

      if(wrap==="repeat"){
        // Tile bleeds off an edge → place a copy at the wrapped position
        if(cx3+hw>w) doStamp(cx3-wrapW,cy3)
        if(cx3-hw<0) doStamp(cx3+wrapW,cy3)
        if(cy3+hh>h) doStamp(cx3,cy3-wrapH)
        if(cy3-hh<0) doStamp(cx3,cy3+wrapH)
        if(cx3+hw>w&&cy3+hh>h) doStamp(cx3-wrapW,cy3-wrapH)
        if(cx3-hw<0&&cy3-hh<0) doStamp(cx3+wrapW,cy3+wrapH)
        if(cx3+hw>w&&cy3-hh<0) doStamp(cx3-wrapW,cy3+wrapH)
        if(cx3-hw<0&&cy3+hh>h) doStamp(cx3+wrapW,cy3-wrapH)
      } else if(wrap==="mirror"){
        // Tile bleeds off an edge → place a FLIPPED copy reflected at the edge
        if(cx3+hw>w) doStamp(2*w-cx3,cy3,true,false)   // right → reflect, flip X
        if(cx3-hw<0) doStamp(-cx3,cy3,true,false)       // left → reflect, flip X
        if(cy3+hh>h) doStamp(cx3,2*h-cy3,false,true)   // bottom → reflect, flip Y
        if(cy3-hh<0) doStamp(cx3,-cy3,false,true)       // top → reflect, flip Y
        // Corners: flip both axes
        if(cx3+hw>w&&cy3+hh>h) doStamp(2*w-cx3,2*h-cy3,true,true)
        if(cx3-hw<0&&cy3-hh<0) doStamp(-cx3,-cy3,true,true)
        if(cx3+hw>w&&cy3-hh<0) doStamp(2*w-cx3,-cy3,true,true)
        if(cx3-hw<0&&cy3+hh>h) doStamp(-cx3,2*h-cy3,true,true)
      }
      // clamp: nothing extra — canvas clips naturally at edges
    }
  }
}

// ── Grid point creator engine ────────────────────────────────────────────────
// Generates a grid of points and stores them in cv._pts.
// Renders point markers to the canvas (pixel output).
function gGrid(ctx,p,w,h) {
  var cols=Math.max(1,Math.round(p.cols||4))
  var rows=Math.max(1,Math.round(p.rows||4))
  var spacingX=(p.spacingX||1)*w/cols
  var spacingY=(p.spacingY||1)*h/rows
  var offX=(p.offX||0)*spacingX, offY=(p.offY||0)*spacingY
  var stagger=p.stagger||0
  var staggerAxis=p.staggerAxis||"row"
  var staggerParity=p.staggerParity==null?1:p.staggerParity
  var jitterX=p.jitterX||0, jitterY=p.jitterY||0
  var seed=p.seed||1, rnd=seededRand(seed)
  var showPts=p.showPoints!==false
  var ptStyle=p.ptStyle||"circle"
  var ptColor=p.ptColor||"#24cca8"
  var ptSize=p.ptSize||4
  var ptOpacity=p.ptOpacity==null?1:p.ptOpacity

  var pts=[]
  var totalPoints=cols*rows

  for(var row=0;row<rows;row++){
    for(var col=0;col<cols;col++){
      var idx2=row*cols+col
      var staggerOff=0
      if(staggerAxis==="row"&&row%2===staggerParity) staggerOff=stagger*spacingX
      else if(staggerAxis==="col"&&col%2===staggerParity) staggerOff=stagger*spacingY
      var jx=jitterX>0?(rnd()-0.5)*2*jitterX*spacingX:0
      var jy=jitterY>0?(rnd()-0.5)*2*jitterY*spacingY:0
      var px=(col+0.5)*spacingX+offX+(staggerAxis==="row"?staggerOff:0)+jx
      var py=(row+0.5)*spacingY+offY+(staggerAxis==="col"?staggerOff:0)+jy
      pts.push({
        x:px, y:py, scale:1, rotation:0, opacity:1, sourceIndex:-1,
        id:"g-"+idx2, pointIndex:idx2, pointCount:totalPoints,
        row:row, col:col, rowCount:rows, colCount:cols,
        rowNorm:rows>1?row/(rows-1):0.5,
        colNorm:cols>1?col/(cols-1):0.5
      })
    }
  }

  // Render point markers
  if(showPts&&ptOpacity>0){
    ctx.save(); ctx.globalAlpha=ptOpacity
    ctx.fillStyle=ptColor; ctx.strokeStyle=ptColor
    pts.forEach(function(pt){
      ctx.beginPath()
      if(ptStyle==="circle")     { ctx.arc(pt.x,pt.y,ptSize/2,0,Math.PI*2); ctx.fill() }
      else if(ptStyle==="dot")   { ctx.arc(pt.x,pt.y,ptSize/4,0,Math.PI*2); ctx.fill() }
      else if(ptStyle==="square"){ ctx.fillRect(pt.x-ptSize/2,pt.y-ptSize/2,ptSize,ptSize) }
      else if(ptStyle==="crosshair"){
        ctx.lineWidth=1
        ctx.moveTo(pt.x-ptSize,pt.y); ctx.lineTo(pt.x+ptSize,pt.y)
        ctx.moveTo(pt.x,pt.y-ptSize); ctx.lineTo(pt.x,pt.y+ptSize)
        ctx.stroke()
      }
    })
    ctx.restore()
  }

  // Store _pts on the canvas element for downstream effects
  ctx.canvas._pts=pts
}

// ── Point generator functions ────────────────────────────────────────────────
// All attach _points to the canvas element for downstream effects to consume.
// Each point: {id,pointIndex,pointCount,x,y,rotation,scale,opacity,sourceIndex,...type attrs}

function mkPt(idx,total,x,y,extra){
  return Object.assign({id:"pt"+idx,pointIndex:idx,pointCount:total,
    x:x,y:y,rotation:0,scale:1,opacity:1,sourceIndex:0},extra||{})
}

function gSpiral(ctx,p,w,h) {
  var n=Math.max(2,Math.round(p.pointCount||32))
  var turns=p.turns||3, r0=p.startRadius||0, r1=p.endRadius||.45
  var cx=p.cx==null?.5:p.cx, cy=p.cy==null?.5:p.cy
  var pts=[]
  for(var i=0;i<n;i++){
    var t=i/(n-1), angle=t*turns*Math.PI*2
    var r=r0+(r1-r0)*t
    var x=cx+Math.cos(angle)*r, y=cy+Math.sin(angle)*r
    var winding=Math.floor(t*turns)
    pts.push(mkPt(i,n,x,y,{spiralT:t,windingNumber:winding,angleNorm:(angle%(Math.PI*2))/(Math.PI*2),radiusNorm:r>0?(r-r0)/(r1-r0||1):0}))
  }
  var dotR=(p.dotSize||4)/Math.max(w,h)
  ctx.fillStyle=p.color||"#ffffff"
  ctx.globalAlpha=p.opacity==null?1:p.opacity
  if(p.renderMode!=="hidden") pts.forEach(function(pt){
    ctx.beginPath(); ctx.arc(pt.x*w,pt.y*h,dotR*Math.min(w,h),0,Math.PI*2); ctx.fill()
  })
  ctx.canvas._points=pts
}

function gPolarGrid(ctx,p,w,h) {
  var rings=Math.max(1,Math.round(p.rings||4))
  var ppr=Math.max(1,Math.round(p.pointsPerRing||8))
  var r0=p.startRadius||.05, r1=p.endRadius||.45
  var cx=p.cx==null?.5:p.cx, cy=p.cy==null?.5:p.cy
  var pts=[], idx=0, total=rings*ppr
  for(var ri=0;ri<rings;ri++) for(var pi=0;pi<ppr;pi++){
    var rn=rings>1?ri/(rings-1):0
    var r=r0+(r1-r0)*rn
    var angle=pi/ppr*Math.PI*2
    pts.push(mkPt(idx++,total,cx+Math.cos(angle)*r,cy+Math.sin(angle)*r,{
      ringIndex:ri,ringCount:rings,angleNorm:pi/ppr,radiusNorm:rn
    }))
  }
  var dotR=(p.dotSize||4)/Math.max(w,h)
  ctx.fillStyle=p.color||"#ffffff"
  ctx.globalAlpha=p.opacity==null?1:p.opacity
  if(p.renderMode!=="hidden") pts.forEach(function(pt){
    ctx.beginPath(); ctx.arc(pt.x*w,pt.y*h,dotR*Math.min(w,h),0,Math.PI*2); ctx.fill()
  })
  ctx.canvas._points=pts
}

function gPhyllotaxis(ctx,p,w,h) {
  var n=Math.max(1,Math.round(p.pointCount||64))
  var div=p.divergenceAngle==null?137.508:p.divergenceAngle
  var sc=p.scale||.45, cx=p.cx==null?.5:p.cx, cy=p.cy==null?.5:p.cy
  var pts=[]
  for(var i=0;i<n;i++){
    var a=i*div*Math.PI/180, r=sc*Math.sqrt(i/n)
    pts.push(mkPt(i,n,cx+Math.cos(a)*r,cy+Math.sin(a)*r,{
      fibIndex:i,angleNorm:(a%(Math.PI*2))/(Math.PI*2),radiusNorm:r/sc
    }))
  }
  var dotR=(p.dotSize||4)/Math.max(w,h)
  ctx.fillStyle=p.color||"#ffffff"
  ctx.globalAlpha=p.opacity==null?1:p.opacity
  if(p.renderMode!=="hidden") pts.forEach(function(pt){
    ctx.beginPath(); ctx.arc(pt.x*w,pt.y*h,dotR*Math.min(w,h),0,Math.PI*2); ctx.fill()
  })
  ctx.canvas._points=pts
}

function gScatter(ctx,p,w,h) {
  var n=Math.max(1,Math.round(p.pointCount||32)), seed=p.seed||1
  var rnd=seededRand(seed)
  var x0=p.x0||0,y0=p.y0||0,x1=p.x1||1,y1=p.y1||1
  var pts=[]
  for(var i=0;i<n;i++){
    pts.push(mkPt(i,n,x0+(x1-x0)*rnd(),y0+(y1-y0)*rnd(),{scatterIndex:i}))
  }
  var dotR=(p.dotSize||4)/Math.max(w,h)
  ctx.fillStyle=p.color||"#ffffff"
  ctx.globalAlpha=p.opacity==null?1:p.opacity
  if(p.renderMode!=="hidden") pts.forEach(function(pt){
    ctx.beginPath(); ctx.arc(pt.x*w,pt.y*h,dotR*Math.min(w,h),0,Math.PI*2); ctx.fill()
  })
  ctx.canvas._points=pts
}

// Seeded pseudo-random for reproducible jitter/variation. LCG — fast, good enough.
function seededRand(seed) {
  var s = (seed * 1664525 + 1013904223) & 0xFFFFFFFF
  return function() { s = (s * 1664525 + 1013904223) & 0xFFFFFFFF; return (s >>> 0) / 0xFFFFFFFF }
}
// Apply per-param randomise: returns base + (random + offset) * scale * amount
function applyRand(base, rnd, enabled, rangeScale, rangeBipolar, amount, offset) {
  if(!enabled) return base
  var r = rnd() // 0-1
  if(rangeBipolar) r = (r * 2 - 1)  // -1 to 1
  return base + (r + (offset||0)) * (rangeScale||0.5) * (amount==null?1:amount)
}
function gImg(ctx,p,iC,w,h) {
  var url=p.url||"",fit=p.fit||"contain",alpha=p.alpha==null?1:p.alpha
  ctx.save();ctx.globalAlpha=alpha
  if(!url){drawPH(ctx,w,h,"no image");ctx.restore();return}
  var img=iC.get(url)
  if(!img||!img.complete||!img.naturalWidth){drawPH(ctx,w,h,"loading…");ctx.restore();return}
  var iw=img.naturalWidth,ih=img.naturalHeight,dx=0,dy=0,dw=w,dh=h
  if(fit==="contain"){var s=Math.min(w/iw,h/ih);dw=iw*s;dh=ih*s;dx=(w-dw)/2;dy=(h-dh)/2}
  else if(fit==="cover"){var s2=Math.max(w/iw,h/ih);dw=iw*s2;dh=ih*s2;dx=(w-dw)/2;dy=(h-dh)/2}
  try{ctx.drawImage(img,dx,dy,dw,dh)}catch(e){}
  ctx.restore()
}
function drawPH(ctx,w,h,msg) {
  ctx.fillStyle="#06061a";ctx.fillRect(0,0,w,h);ctx.fillStyle="#202058"
  ctx.font="10px IBM Plex Mono,monospace";ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(msg,w/2,h/2)
}

/* ─── PATH HELPERS — for drill-down navigation ──────────────────────── */
// Path model: {slotKey, steps}
//   slotKey: where to start in the node, e.g. "inputA.effectStack", "outMask",
//            "effectStack" (for Stack node), "maskStack" (for Stack node).
//   steps: array of {kind:"effect"|"mask", id:string}. Walk steps from the
//            slot's array to reach a target item. Between steps, the child
//            array alternates: an effect step descends into effect.maskStack,
//            a mask step descends into mask.effectStack.
function getRootArr(node, slotKey) {
  if (!node || !slotKey) return []
  if (slotKey === "outEfx") return node.outEfx || []
  if (slotKey === "outMask") return node.outMask || []
  if (slotKey === "effectStack") return node.effectStack || []
  if (slotKey === "maskStack") return node.maskStack || []
  // Handle layers[N].effectStack / layers[N].maskStack
  var lm = slotKey.match(/^layers\[(\d+)\]\.(\w+)$/)
  if (lm) { var li=parseInt(lm[1]); return ((node.layers||[])[li]||{})[lm[2]] || [] }
  var parts = slotKey.split(".")
  var slot = node[parts[0]] || {}
  return slot[parts[1]] || []
}
function setRootArr(node, slotKey, newArr) {
  if (slotKey === "outEfx") return Object.assign({}, node, {outEfx: newArr})
  if (slotKey === "outMask") return Object.assign({}, node, {outMask: newArr})
  if (slotKey === "effectStack") return Object.assign({}, node, {effectStack: newArr})
  if (slotKey === "maskStack") return Object.assign({}, node, {maskStack: newArr})
  // Handle layers[N].effectStack / layers[N].maskStack
  var lm = slotKey.match(/^layers\[(\d+)\]\.(\w+)$/)
  if (lm) {
    var li=parseInt(lm[1])
    var nl=(node.layers||[]).map(function(l,i){
      if(i!==li) return l
      var upd={}; upd[lm[2]]=newArr; return Object.assign({},l,upd)
    })
    return Object.assign({},node,{layers:nl})
  }
  var parts = slotKey.split(".")
  var slotObj = Object.assign({}, node[parts[0]])
  slotObj[parts[1]] = newArr
  var upd = {}
  upd[parts[0]] = slotObj
  return Object.assign({}, node, upd)
}
function walkPath(arr, steps) {
  var item = null
  for (var i = 0; i < steps.length; i++) {
    var step = steps[i]
    item = (arr||[]).find(function(x){return x.id===step.id})
    if (!item) return null
    if (step.kind === "effect") arr = item.maskStack || []
    else arr = item.effectStack || []
  }
  return item
}
function walkReplace(arr, steps, idx, updateFn) {
  if (idx >= steps.length) return arr
  return (arr||[]).map(function(item) {
    if (item.id !== steps[idx].id) return item
    if (idx === steps.length - 1) return updateFn(item)
    var childKey = steps[idx].kind === "effect" ? "maskStack" : "effectStack"
    var newChild = walkReplace(item[childKey] || [], steps, idx + 1, updateFn)
    var upd = {}; upd[childKey] = newChild
    return Object.assign({}, item, upd)
  })
}
function updatePath(node, slotKey, steps, updateFn) {
  var rootArr = getRootArr(node, slotKey)
  var newArr = walkReplace(rootArr, steps, 0, updateFn)
  return setRootArr(node, slotKey, newArr)
}
// Resolve path → target item (leaf). Returns null if path is stale.
function resolvePath(node, slotKey, steps) {
  if (!steps || steps.length === 0) return null
  return walkPath(getRootArr(node, slotKey), steps)
}

/* ─── RENDERING ENGINE ───────────────────────────────────── */
var BM = {"normal":"source-over","add":"lighter","multiply":"multiply","screen":"screen","overlay":"overlay","soft-light":"soft-light","hard-light":"hard-light","difference":"difference","exclusion":"exclusion","darken":"darken","lighten":"lighten","color-burn":"color-burn","color-dodge":"color-dodge","hue":"hue","saturation":"saturation","color":"color","luminosity":"luminosity"}
function mkCv(w,h){var c=document.createElement("canvas");c.width=w;c.height=h;return c}
function clCv(s,w,h){var c=mkCv(w,h);c.getContext("2d").drawImage(s,0,0);return c}

function pxBl(mode,p,c) {
  if(mode==="multiply")return[p[0]*c[0]/255,p[1]*c[1]/255,p[2]*c[2]/255]
  if(mode==="screen")return[255-(255-p[0])*(255-c[0])/255,255-(255-p[1])*(255-c[1])/255,255-(255-p[2])*(255-c[2])/255]
  if(mode==="overlay")return[p[0]<128?2*p[0]*c[0]/255:255-2*(255-p[0])*(255-c[0])/255,p[1]<128?2*p[1]*c[1]/255:255-2*(255-p[1])*(255-c[1])/255,p[2]<128?2*p[2]*c[2]/255:255-2*(255-p[2])*(255-c[2])/255]
  if(mode==="add")return[Math.min(255,p[0]+c[0]),Math.min(255,p[1]+c[1]),Math.min(255,p[2]+c[2])]
  if(mode==="subtract")return[Math.max(0,p[0]-c[0]),Math.max(0,p[1]-c[1]),Math.max(0,p[2]-c[2])]
  if(mode==="darken")return[Math.min(p[0],c[0]),Math.min(p[1],c[1]),Math.min(p[2],c[2])]
  if(mode==="lighten")return[Math.max(p[0],c[0]),Math.max(p[1],c[1]),Math.max(p[2],c[2])]
  return[c[0],c[1],c[2]]
}
// applyBack blends post into pre weighted by mask+opacity.
//
// Alpha IS blended here — blur/threshold/etc. need to modify alpha (e.g. softening
// a shape's hard edge into a feathered falloff requires alpha to change).
//
// Effect mask semantics are preserved: where mask weight m=0, pre is kept unchanged
// (both RGB and alpha). Where m=1, post is fully adopted. The MASK controls where
// the effect applies — it does not cut pixels itself. Pixels at m=0 keep their
// original alpha. Pixels at m=1 get the effect's alpha. Partial m blends both.
// This means a masked blur only softens where the mask is bright; pixels outside
// the mask keep their hard alpha edge. That is the correct isolated-effect behaviour.
function applyBack(pre,post,mv,opacity,mode,blendChannels,blendIf) {
  var f=(opacity==null?100:opacity)/100
  var ch=blendChannels||null  // null = all channels
  var bi=blendIf||null
  var biThis=bi&&blendIfActive(bi.thisLayer)?bi.thisLayer:null
  var biUnder=bi&&blendIfActive(bi.underlyingLayer)?bi.underlyingLayer:null
  for(var i=0;i<pre.length;i+=4){
    var pi=i/4
    var m=Math.min(1,Math.max(0,(mv?mv[pi]:1)*f))
    // BlendIf: only compute if stops actually restrict something
    if(biThis||biUnder){
      var postLum=Math.round(.299*post[i]+.587*post[i+1]+.114*post[i+2])
      var preLum =Math.round(.299*pre[i] +.587*pre[i+1] +.114*pre[i+2])
      if(biThis)  m*=blendIfMult(postLum,biThis.s0,biThis.s1,biThis.h1,biThis.h0)
      if(biUnder) m*=blendIfMult(preLum, biUnder.s0,biUnder.s1,biUnder.h1,biUnder.h0)
    }
    var res=pxBl(mode,[pre[i],pre[i+1],pre[i+2]],[post[i],post[i+1],post[i+2]])
    if(!ch||ch.R) pre[i]  =Math.round(pre[i]  *(1-m)+res[0]*m)
    if(!ch||ch.G) pre[i+1]=Math.round(pre[i+1]*(1-m)+res[1]*m)
    if(!ch||ch.B) pre[i+2]=Math.round(pre[i+2]*(1-m)+res[2]*m)
    if(!ch||ch.A) pre[i+3]=Math.round(pre[i+3]*(1-m)+post[i+3]*m)
  }
}
function compMasks(stack,cmap,cache,iC,w,h,vis) {
  var out=new Float32Array(w*h).fill(1),any=false
  // Bottom-to-top iteration: last in list applied first, first in list applied last
  for(var mi=stack.length-1;mi>=0;mi--){
    var mk=stack[mi];if(mk.enabled===false)continue
    // Defensive: treat missing strength as 1 (full), missing opacity as 100,
    // missing channel as luminosity, missing blendMode as multiply
    if(mk.opacity==null) mk=Object.assign({},mk,{opacity:100})
    // Stack reference — apply referenced Mask Stack with opacity/blendMode control
    if(mk.type==="__stackref__"){
      var refMaskNode=cmap.get(mk.stackRefId)
      if(refMaskNode&&refMaskNode.type==="stack"&&refMaskNode.stackType==="mask"&&
         (refMaskNode.maskStack||[]).length>0&&!vis.has(refMaskNode.id)){
        var visMsk=new Set(vis); visMsk.add(refMaskNode.id)
        var subMv=compMasks(refMaskNode.maskStack,cmap,cache,iC,w,h,visMsk)
        if(subMv){
          any=true
          var rf=(mk.opacity==null?100:mk.opacity)/100
          var rbm=mk.blendMode||"multiply"
          for(var qi=0;qi<w*h;qi++){
            var mv2r=subMv[qi]*rf
            if(rbm==="screen")out[qi]=1-(1-out[qi])*(1-mv2r)
            else if(rbm==="add")out[qi]=Math.min(1,out[qi]+mv2r)
            else if(rbm==="subtract")out[qi]=Math.max(0,out[qi]-mv2r)
            else if(rbm==="normal")out[qi]=mv2r
            else out[qi]*=mv2r
          }
        }
      }
      continue
    }
    if(!mk.refId||vis.has(mk.refId))continue
    var visMk=new Set(vis)
    var cv
    if(mk.refId.indexOf("__sibling__:")===0){
      // Synthetic sibling ref: "__sibling__:nodeId:effectId:maskId"
      var sibParts=mk.refId.split(":")
      var sibNode=cmap.get(sibParts[1]),sibCv2=null
      if(sibNode){
        var allEfxStacks=[]
        if(sibNode.outEfx) allEfxStacks=allEfxStacks.concat(sibNode.outEfx)
        if(sibNode.inputA&&sibNode.inputA.effectStack) allEfxStacks=allEfxStacks.concat(sibNode.inputA.effectStack)
        if(sibNode.inputB&&sibNode.inputB.effectStack) allEfxStacks=allEfxStacks.concat(sibNode.inputB.effectStack)
        if(sibNode.layers) sibNode.layers.forEach(function(l){if(l.effectStack)allEfxStacks=allEfxStacks.concat(l.effectStack)})
        var sibEfx2=allEfxStacks.find(function(e){return e.id===sibParts[2]})
        var sibMk2=sibEfx2&&(sibEfx2.maskStack||[]).find(function(m){return m.id===sibParts[3]})
        if(sibMk2&&sibMk2.refId&&!vis.has(sibMk2.refId)){
          var sibBase2=compAny(sibMk2.refId,cmap,cache,iC,w,h,visMk)
          if(sibBase2){
            var sibCh2=sibMk2.channel||"luminosity"
            if(sibCh2!=="A"){
              var sibRaw2=sibBase2.getContext("2d").getImageData(0,0,w,h).data
              var sibGcv2=mkCv(w,h),sibGctx2=sibGcv2.getContext("2d"),sibGid2=sibGctx2.createImageData(w,h)
              for(var sg2=0;sg2<w*h;sg2++){var sgp2=sg2*4,sgv2;if(sibCh2==="R")sgv2=sibRaw2[sgp2];else if(sibCh2==="G")sgv2=sibRaw2[sgp2+1];else if(sibCh2==="B")sgv2=sibRaw2[sgp2+2];else sgv2=Math.round(.299*sibRaw2[sgp2]+.587*sibRaw2[sgp2+1]+.114*sibRaw2[sgp2+2]);sibGid2.data[sgp2]=sgv2;sibGid2.data[sgp2+1]=sgv2;sibGid2.data[sgp2+2]=sgv2;sibGid2.data[sgp2+3]=255}
              sibGctx2.putImageData(sibGid2,0,0)
              if(sibMk2.effectStack&&sibMk2.effectStack.length>0) applyEfxStk(sibGctx2,sibMk2.effectStack,cmap,cache,iC,w,h,visMk)
              sibCv2=sibGcv2
            } else {
              sibCv2=clCv(sibBase2,w,h)
              if(sibMk2.effectStack&&sibMk2.effectStack.length>0) applyEfxStk(sibCv2.getContext("2d"),sibMk2.effectStack,cmap,cache,iC,w,h,visMk)
            }
          }
        }
      }
      cv=sibCv2; if(!cv)continue; any=true
    } else {
      // Do NOT pre-add mk.refId to vis — compAny handles its own circular check
      cv=compAny(mk.refId,cmap,cache,iC,w,h,visMk);if(!cv)continue;any=true
      visMk.add(mk.refId)
    }
    // Extract channel to greyscale BEFORE applying effectStack.
    // Applying effects (e.g. blur) to RGBA then extracting causes bleed/expansion
    // because blur spreads colour into transparent areas — those areas then have
    // high luminosity/R/G/B values even though they're transparent, making the
    // extracted mask expand. Solution: work in the mask's own greyscale space.
    // For sibling refs, cv is already processed greyscale — skip extraction+effects
    if(mk.refId.indexOf("__sibling__:")!==0){
      var rawId=cv.getContext("2d").getImageData(0,0,w,h).data
      var ch=mk.channel||"luminosity"
      if(ch!=="A"){
        var gcv=mkCv(w,h),gctx=gcv.getContext("2d")
        var gid=gctx.createImageData(w,h)
        for(var gi=0;gi<w*h;gi++){
          var gpi=gi*4,gv
          if(ch==="R")gv=rawId[gpi];else if(ch==="G")gv=rawId[gpi+1];else if(ch==="B")gv=rawId[gpi+2]
          else gv=Math.round(.299*rawId[gpi]+.587*rawId[gpi+1]+.114*rawId[gpi+2])
          // Multiply by source alpha — isolates shape from any composited background.
          // Without this, a composited source (blender, layer comp) leaks background
          // colour into the mask value for pixels where the foreground is transparent.
          var ga=rawId[gpi+3]/255
          gv=Math.round(gv*ga)
          gid.data[gpi]=gv;gid.data[gpi+1]=gv;gid.data[gpi+2]=gv;gid.data[gpi+3]=255
        }
        gctx.putImageData(gid,0,0)
        if(mk.fillOpacity!=null&&mk.fillOpacity<100){
          var foid=gctx.getImageData(0,0,w,h),fof=mk.fillOpacity/100
          for(var foi=0;foi<w*h;foi++){foid.data[foi*4]=Math.round(foid.data[foi*4]*fof);foid.data[foi*4+1]=Math.round(foid.data[foi*4+1]*fof);foid.data[foi*4+2]=Math.round(foid.data[foi*4+2]*fof)}
          gctx.putImageData(foid,0,0)
        }
        if(mk.effectStack&&mk.effectStack.length>0) applyEfxStk(gctx,mk.effectStack,cmap,cache,iC,w,h,visMk)
        cv=gcv
      } else {
        // Alpha channel — greyscale-first so effectStack effects (invert, blur etc.)
        // operate on the alpha values directly and work correctly
        var rawAc=cv.getContext("2d").getImageData(0,0,w,h).data
        var gcvAc=mkCv(w,h),gctxAc=gcvAc.getContext("2d"),gidAc=gctxAc.createImageData(w,h)
        for(var gaci=0;gaci<w*h;gaci++){var gacv=rawAc[gaci*4+3];gidAc.data[gaci*4]=gacv;gidAc.data[gaci*4+1]=gacv;gidAc.data[gaci*4+2]=gacv;gidAc.data[gaci*4+3]=255}
        gctxAc.putImageData(gidAc,0,0)
        if(mk.effectStack&&mk.effectStack.length>0) applyEfxStk(gctxAc,mk.effectStack,cmap,cache,iC,w,h,visMk)
        cv=gcvAc
      }
    }
    // All channel paths now produce a greyscale canvas — read R uniformly
    var src=cv.getContext("2d").getImageData(0,0,w,h).data,f=(mk.opacity==null?100:mk.opacity)/100
    for(var ii=0;ii<w*h;ii++){
      var pi=ii*4,v
      v=src[pi]/255  // greyscale canvas: R=G=B for all channel types
      var rawV=mk.invert?1-v:v
      var contribution=f  // lerp(1, maskValue, opacity/100)
      // lerp(1, rawV, contribution): at contribution=0 → no masking (identity=1)
      // at contribution=1 → full mask effect. Matches Nuke/AE/Fusion behaviour.
      var mv2=1-(1-rawV)*contribution
      if(mk.blendMode==="screen")out[ii]=1-(1-out[ii])*(1-mv2)
      else if(mk.blendMode==="add")out[ii]=Math.min(1,out[ii]+mv2)
      else if(mk.blendMode==="subtract")out[ii]=Math.max(0,out[ii]-mv2)
      else if(mk.blendMode==="normal")out[ii]=mv2
      else out[ii]*=mv2
    }
  }
  return any?out:null
}
function applyEfxStk(ctx,stack,cmap,cache,iC,w,h,vis) {
  // Iterate bottom-to-top: last item in list is applied first (bottom layer),
  // first item in list is applied last (top layer). Standard layer convention.
  for(var ei=stack.length-1;ei>=0;ei--){
    var efx=stack[ei]; if(!efx.enabled) continue
    // Points-domain effects: operate on _pts stored on canvas element, skip pixel transform
    if((efx.domain==="points")&&POINTS_DOMAIN_EFFECTS[efx.type]){
      var curPts=ctx.canvas?ctx.canvas._pts:(ctx._pts||null)
      if(curPts){
        var newPts=applyEfxPoints(curPts,efx,w,h)
        if(ctx.canvas)ctx.canvas._pts=newPts; else ctx._pts=newPts
      }
      continue
    }
    // Stack reference — apply referenced Effect Stack with opacity/blendMode control
    if(efx.type==="__stackref__"){
      var refEn=cmap.get(efx.stackRefId)
      // Guard against circular stackrefs
      if(refEn&&refEn.type==="stack"&&refEn.stackType==="effect"&&
         (refEn.effectStack||[]).length>0&&!vis.has(refEn.id)){
        var visEfx=new Set(vis); visEfx.add(refEn.id)
        var preImg=ctx.getImageData(0,0,w,h)
        var preCopy=new Uint8ClampedArray(preImg.data)
        applyEfxStk(ctx,refEn.effectStack,cmap,cache,iC,w,h,visEfx)
        var postImg=ctx.getImageData(0,0,w,h)
        applyBack(preCopy,postImg.data,null,efx.opacity!=null?efx.opacity:100,efx.blendMode||"normal")
        ctx.putImageData(new ImageData(preCopy,w,h),0,0)
      }
      continue
    }
    // UV Distort — pixel remapping using a separate UV source canvas
    // Show Points — renders point markers onto canvas (pixels domain, debug utility)
    if (efx.type==="show-points") {
      var pts=ctx.canvas&&ctx.canvas._points
      if(pts&&pts.length>0){
        var sp2=efx.params||{}, spR=(sp2.size||6), spC=sp2.color||"#00ccff", spO=sp2.opacity==null?.8:sp2.opacity
        var pre=ctx.getImageData(0,0,w,h)
        ctx.save(); ctx.globalAlpha=spO; ctx.fillStyle=spC
        if(sp2.style==="square"){
          pts.forEach(function(pt){ctx.fillRect(pt.x*w-spR/2,pt.y*h-spR/2,spR,spR)})
        } else if(sp2.style==="crosshair"){
          pts.forEach(function(pt){
            ctx.fillRect(pt.x*w-spR/2,pt.y*h-1,spR,2)
            ctx.fillRect(pt.x*w-1,pt.y*h-spR/2,2,spR)
          })
        } else {
          pts.forEach(function(pt){ctx.beginPath();ctx.arc(pt.x*w,pt.y*h,spR/2,0,Math.PI*2);ctx.fill()})
        }
        if(sp2.showLabels){
          ctx.font=(sp2.labelSize||9)+"px 'IBM Plex Mono',monospace"
          ctx.fillStyle=sp2.labelColor||"#ffffff"; ctx.globalAlpha=spO
          pts.forEach(function(pt){ctx.fillText(pt.pointIndex,pt.x*w+spR/2+1,pt.y*h-spR/2-1)})
        }
        ctx.restore()
        // Show Points doesn't affect _points
      }
      continue
    }
    if (efx.type==="uv-distort") {
      var uvSrcId=efx.params&&efx.params.uvRefId
      if(uvSrcId){
        var uvCv=compAny(uvSrcId,cmap,new Map(cache),iC,w,h,new Set(vis))
        if(uvCv){
          var uvD=uvCv.getContext("2d").getImageData(0,0,w,h).data
          var srcImg=ctx.getImageData(0,0,w,h)
          var outImg2=ctx.createImageData(w,h)
          var uvMode=efx.params.mode||"displacement"
          var uvAmtX=(efx.params.amtX==null?.1:efx.params.amtX)
          var uvAmtY=(efx.params.amtY==null?.1:efx.params.amtY)
          var uvChX=efx.params.chX||"R", uvChY=efx.params.chY||"G"
          function uvRead(px,py,ch){
            var idx2=(Math.max(0,Math.min(h-1,py))*w+Math.max(0,Math.min(w-1,px)))*4
            if(ch==="R")return uvD[idx2]/255;if(ch==="G")return uvD[idx2+1]/255
            if(ch==="B")return uvD[idx2+2]/255
            return(.299*uvD[idx2]+.587*uvD[idx2+1]+.114*uvD[idx2+2])/255
          }
          for(var uvy=0;uvy<h;uvy++) for(var uvx=0;uvx<w;uvx++){
            var uvVal=uvRead(uvx,uvy,uvChX), uvValY=uvRead(uvx,uvy,uvChY)
            var sx4,sy4
            if(uvMode==="absolute"){
              sx4=Math.round(uvVal*w); sy4=Math.round(uvValY*h)
            } else {
              sx4=Math.round(uvx+(uvVal-.5)*uvAmtX*w)
              sy4=Math.round(uvy+(uvValY-.5)*uvAmtY*h)
            }
            sx4=Math.max(0,Math.min(w-1,sx4)); sy4=Math.max(0,Math.min(h-1,sy4))
            var si4=(sy4*w+sx4)*4, di4=(uvy*w+uvx)*4
            outImg2.data[di4]=srcImg.data[si4];outImg2.data[di4+1]=srcImg.data[si4+1]
            outImg2.data[di4+2]=srcImg.data[si4+2];outImg2.data[di4+3]=srcImg.data[si4+3]
          }
          var preUv=srcImg.data
          applyBack(preUv,outImg2.data,mv,efx.opacity,efx.blendMode||"normal",efx.blendChannels,efx.blendIf)
          ctx.putImageData(new ImageData(preUv,w,h),0,0)
        }
      }
      continue
    }
    // Polar / Cartesian coordinate remapping
    if (efx.type==="polar-to-cart"||efx.type==="cart-to-polar") {
      var pcSrc=ctx.getImageData(0,0,w,h), pcOut=ctx.createImageData(w,h)
      var pcW=w,pcH=h,pcCx=pcW/2,pcCy=pcH/2,pcR=Math.min(pcW,pcH)/2
      for(var pcy=0;pcy<pcH;pcy++) for(var pcx=0;pcx<pcW;pcx++){
        var sx5,sy5
        if(efx.type==="cart-to-polar"){
          var dx=pcx-pcCx, dy=pcy-pcCy
          var ang=(Math.atan2(dy,dx)+Math.PI*2)%(Math.PI*2)
          var dist3=Math.sqrt(dx*dx+dy*dy)/pcR
          sx5=Math.round((ang/(Math.PI*2))*pcW)
          sy5=Math.round(Math.min(dist3,1)*(pcH-1))
        } else {
          var u=pcx/pcW,v=pcy/pcH
          var ang2=u*Math.PI*2, r2=v*pcR
          sx5=Math.round(pcCx+Math.cos(ang2)*r2)
          sy5=Math.round(pcCy+Math.sin(ang2)*r2)
        }
        sx5=Math.max(0,Math.min(pcW-1,sx5)); sy5=Math.max(0,Math.min(pcH-1,sy5))
        var si5=(sy5*pcW+sx5)*4, di5=(pcy*pcW+pcx)*4
        pcOut.data[di5]=pcSrc.data[si5];pcOut.data[di5+1]=pcSrc.data[si5+1]
        pcOut.data[di5+2]=pcSrc.data[si5+2];pcOut.data[di5+3]=pcSrc.data[si5+3]
      }
      var prePc=pcSrc.data
      var mvPc=efx.maskStack&&efx.maskStack.length>0?compMasks(efx.maskStack,cmap,cache,iC,w,h,new Set(vis)):null
      applyBack(prePc,pcOut.data,mvPc,efx.opacity,efx.blendMode||"normal",efx.blendChannels,efx.blendIf)
      ctx.putImageData(new ImageData(prePc,w,h),0,0)
      continue
    }
    if (efx.type==="transform") {
      // Transform is a full canvas operation — snap pre state, apply matrix, blend back via mask if present
      if (efx.maskStack && efx.maskStack.length>0) {
        // Masked transform: capture pre, apply transform, blend back using mask
        var preSnap = ctx.getImageData(0,0,w,h)
        applyTransform(ctx, efx.params, w, h)
        var postData = ctx.getImageData(0,0,w,h)
        var mv = compMasks(efx.maskStack, cmap, cache, iC, w, h, new Set(vis))
        // applyBack writes the blend into preSnap.data — put preSnap (not postData)
        applyBack(preSnap.data, postData.data, mv, efx.opacity, efx.blendMode||"normal", efx.blendChannels, efx.blendIf)
        ctx.putImageData(preSnap, 0, 0)
      } else {
        // No mask — apply transform directly, respecting opacity
        var preT = ctx.getImageData(0,0,w,h)
        applyTransform(ctx, efx.params, w, h)
        if (efx.opacity < 100) {
          var postT = ctx.getImageData(0,0,w,h)
          var blended = new Uint8ClampedArray(preT.data)
          applyBack(blended, postT.data, null, efx.opacity, efx.blendMode||"normal", efx.blendChannels, efx.blendIf)
          ctx.putImageData(new ImageData(blended,w,h), 0, 0)
        }
      }
      continue
    }

    var pre=ctx.getImageData(0,0,w,h), post=new Uint8ClampedArray(pre.data)
    pxFn(post,w,h,efx.type,efx.params)
    var mv=efx.maskStack&&efx.maskStack.length>0?compMasks(efx.maskStack,cmap,cache,iC,w,h,new Set(vis)):null
    applyBack(pre.data,post,mv,efx.opacity,efx.blendMode||"normal",efx.blendChannels,efx.blendIf)
    ctx.putImageData(pre,0,0)
  }
}
function maskToAlpha(ctx,stack,cmap,cache,iC,w,h,vis) {
  var mv=compMasks(stack,cmap,cache,iC,w,h,vis);if(!mv)return
  var id=ctx.getImageData(0,0,w,h)
  for(var i=0;i<w*h;i++)id.data[i*4+3]=Math.round(id.data[i*4+3]*mv[i])
  ctx.putImageData(id,0,0)
}
// Compute effective matte: source_alpha × mask_value (both 0-1)
// Returns Float32Array length w*h, or null if no source canvas.
// When maskStack is empty/null, effective = source alpha channel alone.
// When source is null but maskStack exists, effective = mask values alone.
// Empty mask stack = fully opaque = 1.0 (white — no mask means no restriction)
function effectiveMatte(sourceCv,maskStack,cmap,cache,iC,w,h,vis){
  var mv=maskStack&&maskStack.length>0
    ? compMasks(maskStack,cmap,cache,iC,w,h,new Set(vis))
    : null
  var out=new Float32Array(w*h)
  if(sourceCv){
    var id=sourceCv.getContext("2d").getImageData(0,0,w,h)
    for(var i=0;i<w*h;i++){
      var sa=id.data[i*4+3]/255
      out[i]=mv ? sa*mv[i] : sa
    }
  } else if(mv){
    for(var j=0;j<w*h;j++) out[j]=mv[j]
  } else {
    // No source, no mask — fully opaque (white)
    for(var k=0;k<w*h;k++) out[k]=1
  }
  return out
}
function resolveSlot(slot,cmap,cache,iC,w,h,vis) {
  if(!slot||!slot.refId||vis.has(slot.refId))return null
  if(slot.enabled===false)return null
  var base=compAny(slot.refId,cmap,cache,iC,w,h,new Set(vis));if(!base)return null
  var cv=clCv(base,w,h),ctx=cv.getContext("2d")
  if(slot.effectStack&&slot.effectStack.length>0)applyEfxStk(ctx,slot.effectStack,cmap,cache,iC,w,h,new Set(vis))
  if(slot.maskStack&&slot.maskStack.length>0)maskToAlpha(ctx,slot.maskStack,cmap,cache,iC,w,h,new Set(vis))
  return cv
}
// Like resolveSlot but WITHOUT applying maskToAlpha — pixels+effects only.
// Used by blender/layer comp to get source pixels for visual blend while
// computing matte separately via slotEffectiveMatte.
function resolveSlotBase(slot,cmap,cache,iC,w,h,vis) {
  if(!slot||!slot.refId||vis.has(slot.refId))return null
  if(slot.enabled===false)return null
  var base=compAny(slot.refId,cmap,cache,iC,w,h,new Set(vis));if(!base)return null
  var cv=clCv(base,w,h),ctx=cv.getContext("2d")
  // Fill opacity: affects source pixels before effects
  if(slot.fillOpacity!=null&&slot.fillOpacity<100){
    var sid=ctx.getImageData(0,0,w,h)
    var sf=slot.fillOpacity/100
    for(var si=0;si<w*h;si++) sid.data[si*4+3]=Math.round(sid.data[si*4+3]*sf)
    ctx.putImageData(sid,0,0)
  }
  if(slot.effectStack&&slot.effectStack.length>0)applyEfxStk(ctx,slot.effectStack,cmap,cache,iC,w,h,new Set(vis))
  return cv
}
// Compute effective matte for a slot: source_alpha × maskStack result.
// Returns Float32Array[w*h]. If no refId, returns null (no contribution).
// If refId but no maskStack, returns source alpha channel.
function slotEffectiveMatte(slot,baseCv,cmap,cache,iC,w,h,vis){
  if(!slot||!slot.refId) return null
  var mv=slot.maskStack&&slot.maskStack.length>0
    ? compMasks(slot.maskStack,cmap,cache,iC,w,h,new Set(vis)) : null
  var out=new Float32Array(w*h)
  if(baseCv){
    var bd=baseCv.getContext("2d").getImageData(0,0,w,h).data
    for(var i=0;i<w*h;i++){var sa=bd[i*4+3]/255; out[i]=mv?sa*mv[i]:sa}
  } else if(mv){
    for(var j=0;j<w*h;j++) out[j]=mv[j]
  }
  return out
}
// Blend modes for the alpha/matte channel (separate from pixel blend)
var ALPHA_BM={
  "add":    function(a,b,f){return Math.min(1,a+b*f)},
  "normal": function(a,b,f){return a*(1-f)+b*f},       // Over — B over A
  "multiply":function(a,b,f){return a*(1-(1-b)*f)},    // intersection
  "subtract":function(a,b,f){return Math.max(0,a-b*f)},
  "screen": function(a,b,f){return 1-(1-a)*(1-b*f)},
}
// Blend pixel colours. blendChannels restricts which channels are updated.
// blendIf gates the blend by luminosity (thisLayer=src, underlyingLayer=dest).
function blendCv(ctx,srcCv,mode,amount,w,h,maskMode,maskAmount,blendChannels,blendIf) {
  var ch=blendChannels||null
  var bi=blendIf||null
  var hasRestrict=ch&&(!ch.R||!ch.G||!ch.B||!ch.A)
  var hasBi=blendIfHasEffect(bi)
  if(mode==="subtract"||mode==="divide"||hasRestrict||hasBi){
    var base=ctx.getImageData(0,0,w,h)
    var srcD=clCv(srcCv,w,h).getContext("2d").getImageData(0,0,w,h).data
    var B=base.data,f=amount/100
    var pre=hasRestrict||hasBi?new Uint8ClampedArray(B):null
    for(var i=0;i<B.length;i+=4){
      var blended=[B[i],B[i+1],B[i+2]]
      if(mode==="subtract"){
        blended[0]=Math.max(0,B[i]-srcD[i]*f)
        blended[1]=Math.max(0,B[i+1]-srcD[i+1]*f)
        blended[2]=Math.max(0,B[i+2]-srcD[i+2]*f)
      } else if(mode==="divide"){
        blended[0]=srcD[i]>0?Math.min(255,B[i]/(srcD[i]/255)*f+B[i]*(1-f)):B[i]
        blended[1]=srcD[i+1]>0?Math.min(255,B[i+1]/(srcD[i+1]/255)*f+B[i+1]*(1-f)):B[i+1]
        blended[2]=srcD[i+2]>0?Math.min(255,B[i+2]/(srcD[i+2]/255)*f+B[i+2]*(1-f)):B[i+2]
      } else {
        var r=pxBl(mode,[B[i],B[i+1],B[i+2]],[srcD[i],srcD[i+1],srcD[i+2]])
        blended[0]=Math.round(B[i]*(1-f)+r[0]*f)
        blended[1]=Math.round(B[i+1]*(1-f)+r[1]*f)
        blended[2]=Math.round(B[i+2]*(1-f)+r[2]*f)
      }
      // BlendIf gate
      var gate=1
      if(hasBi){
        var biThisA=blendIfActive(bi.thisLayer)?bi.thisLayer:null
        var biUnderA=blendIfActive(bi.underlyingLayer)?bi.underlyingLayer:null
        if(biThisA){var srcLum=Math.round(.299*srcD[i]+.587*srcD[i+1]+.114*srcD[i+2]);gate*=blendIfMult(srcLum,biThisA.s0,biThisA.s1,biThisA.h1,biThisA.h0)}
        if(biUnderA){var dstLum=Math.round(.299*B[i]+.587*B[i+1]+.114*B[i+2]);gate*=blendIfMult(dstLum,biUnderA.s0,biUnderA.s1,biUnderA.h1,biUnderA.h0)}
      }
      var m=gate
      if(!ch||ch.R) B[i]  =Math.round(B[i]  *(1-m)+blended[0]*m)
      if(!ch||ch.G) B[i+1]=Math.round(B[i+1]*(1-m)+blended[1]*m)
      if(!ch||ch.B) B[i+2]=Math.round(B[i+2]*(1-m)+blended[2]*m)
      // Alpha: preserve dest — caller sets matte
    }
    ctx.putImageData(base,0,0)
  } else {
    ctx.save();ctx.globalAlpha=amount/100
    ctx.globalCompositeOperation=BM[mode]||"source-over"
    ctx.drawImage(srcCv,0,0);ctx.restore()
  }
}
// Partially evaluate an effect stack up to and including a given effect id.
// withSub: if true, also apply that effect's own maskStack (for promoted taps that include the masked result).
function applyEfxStkUpTo(ctx,stack,afterId,withSub,cmap,cache,iC,w,h,vis) {
  // Find the index of afterId in the stack (display order top-to-bottom)
  var afterIdx=-1; for(var fi=0;fi<stack.length;fi++){if(stack[fi].id===afterId){afterIdx=fi;break}}
  // Iterate bottom-to-top, stopping at afterIdx (inclusive)
  for(var ei=stack.length-1;ei>=(afterIdx>=0?afterIdx:0);ei--){
    var efx=stack[ei]; if(!efx.enabled)continue
    if(efx.type==="transform"){applyTransform(ctx,efx.params,w,h)}
    else {
      var pre=ctx.getImageData(0,0,w,h), post=new Uint8ClampedArray(pre.data)
      pxFn(post,w,h,efx.type,efx.params)
      var useMask = withSub || efx.id!==afterId
      var mv = useMask&&efx.maskStack&&efx.maskStack.length>0
        ? compMasks(efx.maskStack,cmap,cache,iC,w,h,new Set(vis)) : null
      applyBack(pre.data,post,mv,efx.opacity,efx.blendMode||"normal")
      ctx.putImageData(pre,0,0)
    }
  }
}
// Partially evaluate a mask stack up to and including a given mask id.
// Returns the Float32Array of mask values at that point.
function compMasksUpTo(stack,afterId,withSub,cmap,cache,iC,w,h,vis){
  var out=new Float32Array(w*h).fill(1),any=false
  var afterIdx=-1; for(var fi=0;fi<stack.length;fi++){if(stack[fi].id===afterId){afterIdx=fi;break}}
  for(var mi=stack.length-1;mi>=(afterIdx>=0?afterIdx:0);mi--){
    var mk=stack[mi];if(mk.enabled===false||!mk.refId||vis.has(mk.refId))continue
    var cv=compAny(mk.refId,cmap,cache,iC,w,h,new Set(vis));if(!cv)continue;any=true
    var useSub = withSub || mk.id!==afterId
    var chU=mk.channel||"luminosity"
    if(useSub&&mk.effectStack&&mk.effectStack.length>0){
      if(chU!=="A"){
        var rawU=cv.getContext("2d").getImageData(0,0,w,h).data
        var gcvU=mkCv(w,h),gctxU=gcvU.getContext("2d"),gidU=gctxU.createImageData(w,h)
        for(var giu=0;giu<w*h;giu++){
          var gpu=giu*4,gvu
          if(chU==="R")gvu=rawU[gpu];else if(chU==="G")gvu=rawU[gpu+1];else if(chU==="B")gvu=rawU[gpu+2]
          else gvu=Math.round(.299*rawU[gpu]+.587*rawU[gpu+1]+.114*rawU[gpu+2])
          var gaU=rawU[gpu+3]/255; gvu=Math.round(gvu*gaU)
          gidU.data[gpu]=gvu;gidU.data[gpu+1]=gvu;gidU.data[gpu+2]=gvu;gidU.data[gpu+3]=255
        }
        gctxU.putImageData(gidU,0,0)
        applyEfxStk(gctxU,mk.effectStack,cmap,cache,iC,w,h,new Set(vis))
        cv=gcvU
      } else {
        // Alpha channel — greyscale-first so effects work on alpha values
        var rawAU=cv.getContext("2d").getImageData(0,0,w,h).data
        var gcvAU=mkCv(w,h),gctxAU=gcvAU.getContext("2d"),gidAU=gctxAU.createImageData(w,h)
        for(var gauI=0;gauI<w*h;gauI++){var gauV=rawAU[gauI*4+3];gidAU.data[gauI*4]=gauV;gidAU.data[gauI*4+1]=gauV;gidAU.data[gauI*4+2]=gauV;gidAU.data[gauI*4+3]=255}
        gctxAU.putImageData(gidAU,0,0)
        if(mk.effectStack&&mk.effectStack.length>0) applyEfxStk(gctxAU,mk.effectStack,cmap,cache,iC,w,h,new Set(vis))
        cv=gcvAU
      }
    }
    var src=cv.getContext("2d").getImageData(0,0,w,h).data,f=(mk.opacity==null?100:mk.opacity)/100
    for(var ii=0;ii<w*h;ii++){
      var pi=ii*4,v
      v=src[pi]/255  // all channels: greyscale canvas
      var rawVU=mk.invert?1-v:v
      var contribU=f
      var mv2=1-(1-rawVU)*contribU
      if(mk.blendMode==="screen")out[ii]=1-(1-out[ii])*(1-mv2)
      else if(mk.blendMode==="add")out[ii]=Math.min(1,out[ii]+mv2)
      else if(mk.blendMode==="subtract")out[ii]=Math.max(0,out[ii]-mv2)
      else if(mk.blendMode==="normal")out[ii]=mv2
      else out[ii]*=mv2
    }
  }
  return any?out:null
}
// Resolve a tap path for a promoted node — partially evaluates the chain
// and returns the canvas state at the exact promoted point.
function compPromoted(n,cmap,cache,iC,w,h,vis){
  var tp=n.tapPath; if(!tp||!tp.nodeId||vis.has(tp.nodeId))return null
  var srcNode=cmap.get(tp.nodeId); if(!srcNode||!srcNode.enabled)return null

  // ── Resolve tp.slot to a {refId, effectStack, maskStack} slot object ─────
  var slot
  var slotKey=tp.slot||""

  if(slotKey==="inputA") slot=srcNode.inputA
  else if(slotKey==="inputB") slot=srcNode.inputB

  // "inputA.effectStack" / "inputB.effectStack" / "inputA.maskStack" etc.
  else if(slotKey==="inputA.effectStack"||slotKey==="inputA.maskStack") slot=srcNode.inputA
  else if(slotKey==="inputB.effectStack"||slotKey==="inputB.maskStack") slot=srcNode.inputB

  // "layers[N].effectStack" / "layers[N].maskStack"
  else if(/^layers\[\d+\]/.test(slotKey)){
    var lm=slotKey.match(/^layers\[(\d+)\]/)
    var li=parseInt(lm[1])
    var lyr=(srcNode.layers||[])[li]
    if(!lyr||lyr.enabled===false)return null
    // Synthesise a slot-like object from the layer
    slot={refId:lyr.refId, effectStack:lyr.effectStack||[], maskStack:lyr.maskStack||[]}
  }

  // Output stacks — tap into the node's outEfx or outMask after full composition
  else if(slotKey==="outEfx"||slotKey==="outMask"){
    var baseOut=compAny(tp.nodeId,cmap,cache,iC,w,h,new Set(vis))
    if(!baseOut)return null
    var cv=clCv(baseOut,w,h),ctx=cv.getContext("2d")
    if(slotKey==="outEfx"&&srcNode.outEfx&&srcNode.outEfx.length>0){
      applyEfxStkUpTo(ctx,srcNode.outEfx,tp.afterId,tp.withSub,cmap,cache,iC,w,h,new Set(vis))
    }else if(slotKey==="outMask"&&srcNode.outMask&&srcNode.outMask.length>0){
      var mv=compMasksUpTo(srcNode.outMask,tp.afterId,tp.withSub,cmap,cache,iC,w,h,new Set(vis))
      if(mv){var gid=ctx.getImageData(0,0,w,h);for(var i=0;i<w*h;i++)gid.data[i*4+3]=Math.round(gid.data[i*4+3]*mv[i]);ctx.putImageData(gid,0,0)}
    }
    return cv
  }

  if(!slot||!slot.refId||vis.has(slot.refId))return null

  // ── Resolve base source and partially apply the stack ────────────────────
  var base=compAny(slot.refId,cmap,cache,iC,w,h,new Set(vis));if(!base)return null
  var cv2=clCv(base,w,h),ctx2=cv2.getContext("2d")
  if(tp.stackType==="effect"&&slot.effectStack&&slot.effectStack.length>0){
    applyEfxStkUpTo(ctx2,slot.effectStack,tp.afterId,tp.withSub,cmap,cache,iC,w,h,new Set(vis))
  }else if(tp.stackType==="mask"&&slot.maskStack&&slot.maskStack.length>0){
    // Return greyscale matte canvas — NOT RGBA with alpha applied.
    // Applying matte to alpha then reading luminance later gives wrong results
    // because the source's colour values bleed into the matte reading.
    var mv2=compMasksUpTo(slot.maskStack,tp.afterId,tp.withSub,cmap,cache,iC,w,h,new Set(vis))
    if(mv2){
      var grCv=mkCv(w,h),grCtx=grCv.getContext("2d"),grId=grCtx.createImageData(w,h)
      for(var j=0;j<w*h;j++){var gv=Math.round(mv2[j]*255);grId.data[j*4]=gv;grId.data[j*4+1]=gv;grId.data[j*4+2]=gv;grId.data[j*4+3]=255}
      grCtx.putImageData(grId,0,0)
      return grCv
    }
  }
  return cv2
}

function compAny(id,cmap,cache,iC,w,h,vis) {
  if(!vis)vis=new Set()
  if(cache.has(id))return cache.get(id)
  if(vis.has(id))return null
  var n=cmap.get(id);if(!n||!n.enabled)return null

  // ── Pixel Creators ───────────────────────────────────────
  if(n.section===1){
    var cv=mkCv(w,h),ctx=cv.getContext("2d")
    if(n.type==="solid")gSolid(ctx,n.props,w,h)
    else if(n.type==="shape")gShape(ctx,n.props,w,h)
    else if(n.type==="gradient")gGrad(ctx,n.props,w,h)
    else if(n.type==="noise")gNoise(ctx,n.props,w,h)
    else if(n.type==="pattern")gPat(ctx,n.props,w,h)
    else if(n.type==="tile")gTile(ctx,n.props,cmap,cache,iC,w,h,vis)
    else if(n.type==="grid")   { gGrid(ctx,n.props,w,h); cv._points=ctx.canvas._points }
    else if(n.type==="spiral") { gSpiral(ctx,n.props,w,h); cv._points=ctx.canvas._points }
    else if(n.type==="polar-grid"){ gPolarGrid(ctx,n.props,w,h); cv._points=ctx.canvas._points }
    else if(n.type==="phyllotaxis"){ gPhyllotaxis(ctx,n.props,w,h); cv._points=ctx.canvas._points }
    else if(n.type==="scatter"){ gScatter(ctx,n.props,w,h); cv._points=ctx.canvas._points }
    else if(n.type==="image")gImg(ctx,n.props,iC,w,h)
    cache.set(id,cv);return cv
  }

  // ── Promoted tap point ───────────────────────────────────
  if(n.type==="promoted"){
    var pv=new Set(vis);pv.add(id)
    var pcv=compPromoted(n,cmap,cache,iC,w,h,pv)
    if(pcv)cache.set(id,pcv)
    return pcv
  }

  vis.add(id)

  // ── Stack node — renderable only when previewRefId is set ───────────────────
  if(n.type==="stack"){
    if(!n.previewRefId){vis.delete(id);return null}
    // Use a fresh isolated vis for the preview — only the stack node itself
    // is marked in-progress. This prevents false-positive bail when the
    // preview source appears elsewhere in the outer vis chain.
    var spVis=new Set([id])
    var previewBase=compAny(n.previewRefId,cmap,cache,iC,w,h,spVis)
    if(!previewBase){vis.delete(id);return null}
    var pcv=clCv(previewBase,w,h),pctx=pcv.getContext("2d")
    if(n.stackType==="effect"&&(n.effectStack||[]).length>0){
      applyEfxStk(pctx,n.effectStack,cmap,cache,iC,w,h,spVis)
    } else if(n.stackType==="mask"&&(n.maskStack||[]).length>0){
      // Mask stack preview:
      //   Preview source set → show source with mask applied as alpha
      //     (preview unaltered except by the mask's alpha cut)
      //   No preview source → render mask as greyscale B&W matte
      // Masks always read as greyscale when no preview is provided.
      var mv=compMasks(n.maskStack,cmap,cache,iC,w,h,spVis)
      if(mv){
        // Apply mask to preview source alpha
        var id=pctx.getImageData(0,0,w,h)
        for(var gi3=0;gi3<w*h;gi3++){
          id.data[gi3*4+3]=Math.round(id.data[gi3*4+3]*mv[gi3])
        }
        pctx.putImageData(id,0,0)
      }
      // If mv is null (no masks have sources), leave preview source unaltered.
    }
    cache.set(id,pcv);vis.delete(id);return pcv
  }

  // ── Layer compositor ──────────────────────────────────────
  if(n.type==="layers"){
    var lcv=mkCv(w,h),lctx=lcv.getContext("2d")
    // Running matte — starts fully transparent (no layers = nothing visible)
    var runMatte=new Float32Array(w*h)
    var layers=n.layers||[]
    // Iterate bottom-to-top (last in array = top layer)
    for(var li=layers.length-1;li>=0;li--){
      var lyr=layers[li]
      if(lyr.enabled===false) continue
      if(!lyr.refId||vis.has(lyr.refId)) continue
      var lVis=new Set(vis)
      var lBase=compAny(lyr.refId,cmap,cache,iC,w,h,lVis)
      if(!lBase) continue
      var lCv=clCv(lBase,w,h),lCtx=lCv.getContext("2d")
      // Fill opacity: applied before effectStack (doesn't affect effects like glows)
      if(lyr.fillOpacity!=null&&lyr.fillOpacity<100){
        var fid=lCtx.getImageData(0,0,w,h)
        var ff=lyr.fillOpacity/100
        for(var fi=0;fi<w*h;fi++) fid.data[fi*4+3]=Math.round(fid.data[fi*4+3]*ff)
        lCtx.putImageData(fid,0,0)
      }
      if(lyr.effectStack&&lyr.effectStack.length>0) applyEfxStk(lCtx,lyr.effectStack,cmap,cache,iC,w,h,lVis)
      // Compute layer effective matte (source_alpha × maskStack)
      var lyrMatte=slotEffectiveMatte(
        {refId:lyr.refId,maskStack:lyr.maskStack},lCv,cmap,cache,iC,w,h,lVis)
      // Apply matte to layer alpha for visual pixel blend
      if(lyrMatte){
        var lid2=lCtx.getImageData(0,0,w,h)
        for(var lmi=0;lmi<w*h;lmi++) lid2.data[lmi*4+3]=Math.round(lyrMatte[lmi]*255)
        lCtx.putImageData(lid2,0,0)
      } else {
        if(lyr.maskStack&&lyr.maskStack.length>0) maskToAlpha(lCtx,lyr.maskStack,cmap,cache,iC,w,h,lVis)
      }
      blendCv(lctx,lCv,lyr.blendMode||"normal",lyr.opacity==null?100:lyr.opacity,w,h,null,null,lyr.blendChannels,lyr.blendIf)

      // Accumulate matte using layer's maskMode
      var lmf=(lyr.maskAmount==null?100:lyr.maskAmount)/100
      var lmblend=ALPHA_BM[lyr.maskMode||"add"]||ALPHA_BM["add"]
      var lyrMv=lyrMatte||(function(){
        // No explicit mask — use source alpha
        var ld=lBase.getContext("2d").getImageData(0,0,w,h).data
        var m=new Float32Array(w*h); for(var x=0;x<w*h;x++) m[x]=ld[x*4+3]/255; return m
      })()
      for(var lri=0;lri<w*h;lri++) runMatte[lri]=lmblend(runMatte[lri],lyrMv[lri],lmf)
    }
    // Override alpha with accumulated matte
    var lOutImg=lctx.getImageData(0,0,w,h)
    for(var loi=0;loi<w*h;loi++) lOutImg.data[loi*4+3]=Math.round(runMatte[loi]*255)
    lctx.putImageData(lOutImg,0,0)
    if(n.outFillOpacity!=null&&n.outFillOpacity<100){
      var lfid=lctx.getImageData(0,0,w,h),lff=n.outFillOpacity/100
      for(var lfi=0;lfi<w*h;lfi++) lfid.data[lfi*4+3]=Math.round(lfid.data[lfi*4+3]*lff)
      lctx.putImageData(lfid,0,0)
    }
    if(n.outEfx&&n.outEfx.length>0) applyEfxStk(lctx,n.outEfx,cmap,cache,iC,w,h,new Set(vis))
    if(n.outMask&&n.outMask.length>0) maskToAlpha(lctx,n.outMask,cmap,cache,iC,w,h,new Set(vis))
    if(n.outOpacity!=null&&n.outOpacity<100){
      var loid=lctx.getImageData(0,0,w,h),lof=n.outOpacity/100
      for(var loi2=0;loi2<w*h;loi2++) loid.data[loi2*4+3]=Math.round(loid.data[loi2*4+3]*lof)
      lctx.putImageData(loid,0,0)
    }
    cache.set(id,lcv);vis.delete(id);return lcv
  }

  // ── Blender compositor ───────────────────────────────────
  // Pixel blend and matte composition are computed independently.
  // resolveSlotBase: pixels+effects, no mask on alpha.
  // slotEffectiveMatte: source_alpha × maskStack → the input's matte.
  var cv2=mkCv(w,h),ctx2=cv2.getContext("2d")
  var cAb=resolveSlotBase(n.inputA,cmap,cache,iC,w,h,new Set(vis))
  var cBb=resolveSlotBase(n.inputB,cmap,cache,iC,w,h,new Set(vis))
  var mA=slotEffectiveMatte(n.inputA,cAb,cmap,cache,iC,w,h,new Set(vis))
  var mB=slotEffectiveMatte(n.inputB,cBb,cmap,cache,iC,w,h,new Set(vis))
  // Apply mattes to pixel alpha for visual compositing
  function applyMatte(baseCv, matte){
    if(!baseCv) return null
    var cv=clCv(baseCv,w,h),id2=cv.getContext("2d").getImageData(0,0,w,h)
    for(var i=0;i<w*h;i++) id2.data[i*4+3]=matte?Math.round(matte[i]*255):id2.data[i*4+3]
    cv.getContext("2d").putImageData(id2,0,0); return cv
  }
  var cA=applyMatte(cAb,mA), cB=applyMatte(cBb,mB)
  // Pixel blend (switched controls draw order = A over B or B over A)
  var bottom=n.switched?cA:cB, topC=n.switched?cB:cA
  if(bottom)ctx2.drawImage(bottom,0,0)
  if(topC)blendCv(ctx2,topC,n.mode,n.amount,w,h,null,null,n.blendChannels,n.blendIf)
  // Matte combination — switched also affects matte order
  var botM=n.switched?mA:mB, topM=n.switched?mB:mA
  var mf=(n.maskAmount==null?100:n.maskAmount)/100
  var mblend=ALPHA_BM[n.maskMode||"add"]||ALPHA_BM["add"]
  var outImg=ctx2.getImageData(0,0,w,h)
  for(var mi=0;mi<w*h;mi++){
    var bv=botM?botM[mi]:(n.switched?(n.inputA.refId?1:0):(n.inputB.refId?1:0))
    var tv=topM?topM[mi]:(n.switched?(n.inputB.refId?1:0):(n.inputA.refId?1:0))
    outImg.data[mi*4+3]=Math.round(mblend(bv,tv,mf)*255)
  }
  ctx2.putImageData(outImg,0,0)
  // Output fill opacity: affects composited pixels before outEfx
  if(n.outFillOpacity!=null&&n.outFillOpacity<100){
    var ofid=ctx2.getImageData(0,0,w,h),off=n.outFillOpacity/100
    for(var ofi=0;ofi<w*h;ofi++) ofid.data[ofi*4+3]=Math.round(ofid.data[ofi*4+3]*off)
    ctx2.putImageData(ofid,0,0)
  }
  if(n.outEfx&&n.outEfx.length>0)applyEfxStk(ctx2,n.outEfx,cmap,cache,iC,w,h,new Set(vis))
  if(n.outMask&&n.outMask.length>0)maskToAlpha(ctx2,n.outMask,cmap,cache,iC,w,h,new Set(vis))
  // Output opacity: affects entire output after effects
  if(n.outOpacity!=null&&n.outOpacity<100){
    var ooid=ctx2.getImageData(0,0,w,h),oof=n.outOpacity/100
    for(var ooi=0;ooi<w*h;ooi++) ooid.data[ooi*4+3]=Math.round(ooid.data[ooi*4+3]*oof)
    ctx2.putImageData(ooid,0,0)
  }
  cache.set(id,cv2);vis.delete(id);return cv2
}
function renderPipeline(canvas,dispId,nodes,iC,dispMask,dispSlot) {
  if(!canvas||!dispId)return
  try {
    var ctx=canvas.getContext("2d");ctx.clearRect(0,0,canvas.width,canvas.height)
    var cmap=new Map(nodes.map(function(n){return[n.id,n]}))
    var w=canvas.width,h=canvas.height
    if(dispSlot){
      // Display a specific input slot — pixels or mask
      var dsNode=cmap.get(dispSlot.nodeId)
      function renderMaskGrey(stack,fallbackLabel){
        var mv2=stack&&stack.length>0?compMasks(stack,cmap,new Map(),iC,w,h,new Set()):null
        ctx.fillStyle="#040412"; ctx.fillRect(0,0,w,h)
        if(mv2){
          var gd=ctx.createImageData(w,h)
          for(var dsi=0;dsi<w*h;dsi++){var dv=Math.round(mv2[dsi]*255);gd.data[dsi*4]=dv;gd.data[dsi*4+1]=dv;gd.data[dsi*4+2]=dv;gd.data[dsi*4+3]=255}
          ctx.putImageData(gd,0,0)
        } else {
          ctx.fillStyle="var(--bd)"; ctx.fillRect(0,0,w,h)
          ctx.fillStyle="#8090c0"; ctx.font="11px 'IBM Plex Mono',monospace"
          ctx.textAlign="center"; ctx.fillText(fallbackLabel||"no mask",w/2,h/2)
        }
      }
      if(dispSlot.slot==="output"&&dsNode){
        // Output slot — show composite pixels or outMask greyscale
        if(dispSlot.mode==="mask"){
          renderMaskGrey(dsNode.outMask,"no output mask")
        } else {
          var outRes=compAny(dispSlot.nodeId,cmap,new Map(),iC,w,h,new Set())
          if(outRes) ctx.drawImage(outRes,0,0)
          else { ctx.fillStyle="#040412"; ctx.fillRect(0,0,w,h) }
        }
      } else {
        var dsSlot=dsNode&&(dispSlot.slot==="inputA"?dsNode.inputA:dsNode.inputB)
        if(dsSlot&&dsSlot.refId){
          if(dispSlot.mode==="mask"){
            // Show effective matte: source_alpha × mask_value
            var dsSrc=dsSlot.refId?compAny(dsSlot.refId,cmap,new Map(),iC,w,h,new Set()):null
            var em=effectiveMatte(dsSrc,dsSlot.maskStack,cmap,new Map(),iC,w,h,new Set())
            ctx.fillStyle="#040412"; ctx.fillRect(0,0,w,h)
            var emGid=ctx.createImageData(w,h)
            for(var emi=0;emi<w*h;emi++){var emv=Math.round(em[emi]*255);emGid.data[emi*4]=emv;emGid.data[emi*4+1]=emv;emGid.data[emi*4+2]=emv;emGid.data[emi*4+3]=255}
            ctx.putImageData(emGid,0,0)
          } else {
            var dsRes=resolveSlot(dsSlot,cmap,new Map(),iC,w,h,new Set())
            if(dsRes) ctx.drawImage(dsRes,0,0)
            else { ctx.fillStyle="#040412"; ctx.fillRect(0,0,w,h) }
          }
        } else { ctx.fillStyle="#040412"; ctx.fillRect(0,0,w,h) }
      }
    } else if(dispMask){
      // Top-level ◈ — show effective matte (source_alpha × mask) using fallback chain.
      // Undefined outMask = fully opaque (white). Falls back through inputs/layers.
      var mn=cmap.get(dispId)
      var em2=null, emLabel="no mask configured"
      if(mn){
        if(mn.outMask&&mn.outMask.length>0){
          // Output mask defined — show it (no source alpha to multiply, it's an output matte)
          em2=compMasks(mn.outMask,cmap,new Map(),iC,w,h,new Set()); emLabel="output mask"
        }
        // Empty outMask = no restriction — fall through to input/layer mattes
        if(!em2&&(mn.type==="blender")&&(mn.inputA||mn.inputB)){
          // For blender: compute combined matte same as engine (both inputs combined)
          var dispCvA=mn.inputA&&mn.inputA.refId?compAny(mn.inputA.refId,cmap,new Map(),iC,w,h,new Set()):null
          var dispCvB=mn.inputB&&mn.inputB.refId?compAny(mn.inputB.refId,cmap,new Map(),iC,w,h,new Set()):null
          var dispMA=dispCvA?slotEffectiveMatte(mn.inputA,dispCvA,cmap,new Map(),iC,w,h,new Set()):null
          var dispMB=dispCvB?slotEffectiveMatte(mn.inputB,dispCvB,cmap,new Map(),iC,w,h,new Set()):null
          if(dispMA||dispMB){
            var dispMf=(mn.maskAmount==null?100:mn.maskAmount)/100
            var dispMblend=ALPHA_BM[mn.maskMode||"add"]||ALPHA_BM["add"]
            var dispBotM=mn.switched?dispMA:dispMB, dispTopM=mn.switched?dispMB:dispMA
            em2=new Float32Array(w*h)
            for(var dmi=0;dmi<w*h;dmi++){
              var dbv=dispBotM?dispBotM[dmi]:(mn.switched?(mn.inputA.refId?1:0):(mn.inputB.refId?1:0))
              var dtv=dispTopM?dispTopM[dmi]:(mn.switched?(mn.inputB.refId?1:0):(mn.inputA.refId?1:0))
              em2[dmi]=dispMblend(dbv,dtv,dispMf)
            }
            emLabel="blender combined matte"
          }
        }
        if(!em2&&mn.inputA&&mn.inputA.refId&&mn.type!=="blender"){
          var iaS=compAny(mn.inputA.refId,cmap,new Map(),iC,w,h,new Set())
          em2=effectiveMatte(iaS,mn.inputA.maskStack,cmap,new Map(),iC,w,h,new Set())
          emLabel="input A effective matte"
        }
        if(!em2&&mn.inputB&&mn.inputB.refId&&mn.type!=="blender"){
          var ibS=compAny(mn.inputB.refId,cmap,new Map(),iC,w,h,new Set())
          em2=effectiveMatte(ibS,mn.inputB.maskStack,cmap,new Map(),iC,w,h,new Set())
          emLabel="input B effective matte"
        }
        if(!em2&&mn.layers){
          for(var mli=0;mli<mn.layers.length;mli++){
            var mll=mn.layers[mli]
            if(mll.refId||mll.maskStack&&mll.maskStack.length>0){
              var lls=mll.refId?compAny(mll.refId,cmap,new Map(),iC,w,h,new Set()):null
              em2=effectiveMatte(lls,mll.maskStack,cmap,new Map(),iC,w,h,new Set())
              emLabel="layer "+(mli+1)+" effective matte"; break
            }
          }
        }
        // §1 pixel creators: show intrinsic alpha channel as matte
        // (shape fillOpacity, gradient alpha stops, image transparency, etc.)
        if(!em2&&mn.section===1){
          var pcCv=compAny(dispId,cmap,new Map(),iC,w,h,new Set())
          if(pcCv){
            var pcId=pcCv.getContext("2d").getImageData(0,0,w,h)
            em2=new Float32Array(w*h)
            for(var pci=0;pci<w*h;pci++) em2[pci]=pcId.data[pci*4+3]/255
            emLabel="intrinsic alpha"
          }
        }
      }
      ctx.fillStyle="#040412"; ctx.fillRect(0,0,w,h)
      if(em2){
        var gid=ctx.createImageData(w,h)
        for(var gi=0;gi<w*h;gi++){var gv=Math.round(em2[gi]*255);gid.data[gi*4]=gv;gid.data[gi*4+1]=gv;gid.data[gi*4+2]=gv;gid.data[gi*4+3]=255}
        ctx.putImageData(gid,0,0)
      } else {
        ctx.fillStyle="var(--bd)"; ctx.fillRect(0,0,w,h)
        ctx.fillStyle="#8090c0"; ctx.font="11px 'IBM Plex Mono',monospace"
        ctx.textAlign="center"; ctx.fillText(emLabel,w/2,h/2)
      }
    } else {
      var result=compAny(dispId,cmap,new Map(),iC,w,h,new Set())
      if(result)ctx.drawImage(result,0,0)
    }
  } catch(err) {
    // Render pipeline failed — draw a soft error overlay so the UI stays interactive
    try {
      var ectx=canvas.getContext("2d")
      ectx.clearRect(0,0,canvas.width,canvas.height)
      ectx.fillStyle="#2a1020"
      ectx.fillRect(0,0,canvas.width,canvas.height)
      ectx.fillStyle="#e03060"
      ectx.font="14px 'IBM Plex Mono', monospace"
      ectx.textAlign="center"
      ectx.fillText("render error", canvas.width/2, canvas.height/2-10)
      ectx.fillStyle="#e0a0b0"
      ectx.font="10px 'IBM Plex Mono', monospace"
      var msg=String(err&&err.message||err).slice(0,60)
      ectx.fillText(msg, canvas.width/2, canvas.height/2+10)
    } catch(_){}
    if(typeof console!=="undefined"&&console.error)console.error("NLICS render:",err)
  }
}




/* ─── UI PRIMITIVES ─────────────────────────────────────── */
function PR(props) {
  return (
    <div className="prow" style={props.style}>
      {!props.ns && <span className="plbl">{props.l}</span>}
      {props.children}
    </div>
  )
}
function Sl(props) {
  var disp = props.fmt ? props.fmt(props.v) : (props.st < 1 ? Number(props.v).toFixed(2) : Math.round(props.v))
  return (
    <PR l={props.l}>
      <input type="range" min={props.mn} max={props.mx} step={props.st||.01} value={props.v}
        onChange={function(e){ props.fn(parseFloat(e.target.value)) }} style={{flex:1}}/>
      <span className="pval">{disp}</span>
    </PR>
  )
}
function Co(props) {
  return (
    <PR l={props.l}>
      <input type="color" value={props.v} onChange={function(e){props.fn(e.target.value)}}/>
      <input type="text" value={props.v} onChange={function(e){props.fn(e.target.value)}} style={{flex:1,marginLeft:6}}/>
    </PR>
  )
}
function Se(props) {
  return (
    <PR l={props.l}>
      <select value={props.v} onChange={function(e){props.fn(e.target.value)}} style={{flex:1}}>
        {props.opts.map(function(o){ return <option key={o}>{o}</option> })}
      </select>
    </PR>
  )
}
/* ─── NODE REFERENCE PICKER (thumbnail) ─────────────────── */
// Thumb size for the picker grid items
var THUMB_PX = 48
// Render a single thumbnail onto a canvas element — called once per item on open
function renderThumb(canvas, nodeId, nodes, iC, asMask, greySource) {
  if(!canvas||!nodeId) return
  var ctx=canvas.getContext("2d"); ctx.clearRect(0,0,THUMB_PX,THUMB_PX)
  var cmap=new Map(nodes.map(function(n){return[n.id,n]}))
  var n=cmap.get(nodeId)
  // Stack nodes with no previewRefId return null from compAny.
  // For mask stacks: render their mask as greyscale if possible.
  // For effect stacks with no preview: show a hatched placeholder.
  if(n&&n.type==="stack"&&!n.previewRefId){
    ctx.fillStyle="#0d0d22"; ctx.fillRect(0,0,THUMB_PX,THUMB_PX)
    if(n.stackType==="mask"&&(n.maskStack||[]).length>0){
      // Try to render mask values using a white base
      var baseC=document.createElement("canvas"); baseC.width=THUMB_PX; baseC.height=THUMB_PX
      var bx=baseC.getContext("2d"); bx.fillStyle="#ffffff"; bx.fillRect(0,0,THUMB_PX,THUMB_PX)
      try {
        var mv=compMasks(n.maskStack,cmap,new Map(),iC||new Map(),THUMB_PX,THUMB_PX,new Set())
        if(mv){
          var gid=ctx.createImageData(THUMB_PX,THUMB_PX)
          for(var gi=0;gi<THUMB_PX*THUMB_PX;gi++){var gv=Math.round(mv[gi]*255);gid.data[gi*4]=gv;gid.data[gi*4+1]=gv;gid.data[gi*4+2]=gv;gid.data[gi*4+3]=255}
          ctx.putImageData(gid,0,0)
        } else { drawThumbLabel(ctx,"mask stack",THUMB_PX) }
      } catch(_) { drawThumbLabel(ctx,"mask stack",THUMB_PX) }
    } else {
      drawThumbLabel(ctx,n.stackType==="mask"?"mask stack":"effect stack",THUMB_PX)
    }
    return
  }
  try {
    var result=compAny(nodeId,cmap,new Map(),iC||new Map(),THUMB_PX,THUMB_PX,new Set())
    if(result){
      if(asMask){
        // ◈ matte — alpha channel as greyscale (mask boundary)
        var rId=result.getContext("2d").getImageData(0,0,THUMB_PX,THUMB_PX)
        var gId=ctx.createImageData(THUMB_PX,THUMB_PX)
        for(var ri=0;ri<THUMB_PX*THUMB_PX;ri++){
          var rp=ri*4
          var av=rId.data[rp+3]
          gId.data[rp]=av;gId.data[rp+1]=av;gId.data[rp+2]=av;gId.data[rp+3]=255
        }
        ctx.putImageData(gId,0,0)
      } else if(greySource){
        // ◉ source in mask context — luminance greyscale for identification
        // (masks are always read as greyscale so colour is misleading)
        var rsId=result.getContext("2d").getImageData(0,0,THUMB_PX,THUMB_PX)
        var gsId=ctx.createImageData(THUMB_PX,THUMB_PX)
        for(var gsi=0;gsi<THUMB_PX*THUMB_PX;gsi++){
          var gsp=gsi*4
          var lv=Math.round(.299*rsId.data[gsp]+.587*rsId.data[gsp+1]+.114*rsId.data[gsp+2])
          var la=Math.round(lv*(rsId.data[gsp+3]/255))
          gsId.data[gsp]=la;gsId.data[gsp+1]=la;gsId.data[gsp+2]=la;gsId.data[gsp+3]=255
        }
        ctx.putImageData(gsId,0,0)
      } else {
        // Full RGBA colour — normal source picker context
        ctx.drawImage(result,0,0,THUMB_PX,THUMB_PX)
      }
    } else { ctx.fillStyle="#0d0d22"; ctx.fillRect(0,0,THUMB_PX,THUMB_PX); drawThumbLabel(ctx,"no preview",THUMB_PX) }
  } catch(_) { ctx.fillStyle="#0d0d22"; ctx.fillRect(0,0,THUMB_PX,THUMB_PX) }
}
function drawThumbLabel(ctx, text, sz) {
  ctx.fillStyle="rgba(96,104,152,.5)"; ctx.fillRect(0,0,sz,sz)
  ctx.fillStyle="#8090c0"; ctx.font="8px 'IBM Plex Mono',monospace"
  ctx.textAlign="center"; ctx.fillText(text, sz/2, sz/2+3)
}
// Single thumb item in the picker
function ThumbItem(props) {
  var cvRef=useRef(null)
  useEffect(function(){
    if(!cvRef.current||!props.iC) return
    var delay = (props.index||0) * 18
    var t = setTimeout(function(){
      renderThumb(cvRef.current, props.nodeId, props.nodes, props.iC.current||props.iC, props.asMask, props.greySource)
    }, delay)
    return function(){ clearTimeout(t) }
  },[props.nodeId, props.index, props.asMask, props.greySource])
  return (
    <div onClick={props.onClick}
      style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer",
        padding:"6px 4px",borderRadius:6,
        background:props.active?"var(--sl)":"none",
        border:props.active?"1px solid var(--ac)":"1px solid transparent",
        minWidth:THUMB_PX+16}}>
      <div style={{width:THUMB_PX,height:THUMB_PX,borderRadius:4,overflow:"hidden",
        flexShrink:0,background:"var(--bg)",
        boxShadow:props.active?"0 0 0 1px var(--ac)":"0 0 0 1px var(--bd)"}}>
        <canvas ref={cvRef} width={THUMB_PX} height={THUMB_PX} style={{display:"block"}}/>
      </div>
      <span style={{fontSize:8,color:props.active?"var(--ac)":"var(--mu)",textAlign:"center",
        fontFamily:"'IBM Plex Mono',monospace",maxWidth:THUMB_PX+8,
        overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",lineHeight:1.2}}>
        {props.label}
      </span>
    </div>
  )
}
function NRef(props) {
  var mode = props.mode || "all"
  var asMaskSt=useState(props.asMask||false); var asMask=asMaskSt[0], setAsMask=asMaskSt[1]
  var openSt=useState(false); var open=openSt[0], setOpen=openSt[1]
  var anchorRef=useRef(null)
  var menuRef=useRef(null)
  var pos=usePopoverPosition(anchorRef, open, "above")
  useEffect(function(){
    if(!open) return
    function h(e){
      if(anchorRef.current&&anchorRef.current.contains(e.target)) return
      if(menuRef.current&&menuRef.current.contains(e.target)) return
      setOpen(false)
    }
    document.addEventListener("mousedown",h)
    return function(){document.removeEventListener("mousedown",h)}
  },[open])
  var creators = mode==="intermediate" ? [] : props.nodes.filter(function(n){return n.section===1&&n.id!==props.selfId})
  var comps = props.nodes.filter(function(n){
    if(n.id===props.selfId) return false
    if(n.section!==2) return false
    if(mode==="intermediate") return n.type==="promoted"
    if(mode==="source") return true  // all compositors (incl. promoted taps) are valid pixel sources
    if(mode==="effect-source") return n.type==="stack"&&n.stackType==="effect"
    if(mode==="mask-source") return n.type==="stack"&&n.stackType==="mask"||n.type==="promoted"
    return true
  })
  var allItems = creators.concat(comps)
  var selectedNode = allItems.find(function(n){return n.id===props.v})
  var btnLabel = selectedNode ? selectedNode.name : "— none —"
  var btnStyle={flex:1,textAlign:"left",fontSize:11,padding:"0 10px",
    fontFamily:"'IBM Plex Mono',monospace",overflow:"hidden",textOverflow:"ellipsis",
    whiteSpace:"nowrap",color:selectedNode?"var(--tx)":"var(--mu)"}

  function pick(id){ props.fn(id||null); setOpen(false) }

  var menuContent = (
    <div style={{padding:8,maxHeight:"50vh",overflowY:"auto",userSelect:"none"}}>
      {/* Source/Matte toggle — only shown in mask context */}
      {props.asMask&&(
        <div style={{display:"flex",gap:4,marginBottom:8}}>
          <button onClick={function(){setAsMask(false)}}
            style={{flex:1,padding:"4px 0",fontSize:9,borderRadius:4,cursor:"pointer",
              fontFamily:"'IBM Plex Mono',monospace",
              background:!asMask?"var(--ac)":"var(--el)",
              color:!asMask?"var(--bg)":"var(--mu)",
              border:"1px solid "+(!asMask?"var(--ac)":"var(--bd)")}}>
            ◉ source
          </button>
          <button onClick={function(){setAsMask(true)}}
            style={{flex:1,padding:"4px 0",fontSize:9,borderRadius:4,cursor:"pointer",
              fontFamily:"'IBM Plex Mono',monospace",
              background:asMask?"var(--lv)":"var(--el)",
              color:asMask?"#fff":"var(--mu)",
              border:"1px solid "+(asMask?"var(--lv)":"var(--bd)")}}>
            ◈ matte
          </button>
        </div>
      )}
      {/* None option */}
      <div onClick={function(){pick(null)}}
        style={{padding:"6px 10px",fontSize:11,color:"var(--mu)",cursor:"pointer",
          borderRadius:5,marginBottom:6,border:"1px solid "+(props.v==null?"var(--bd)":"transparent"),
          background:props.v==null?"var(--sl)":"none"}}>— none —</div>
      {props.siblingEffects&&props.siblingEffects.length>0&&(
        <div>
          <div style={{fontSize:8,color:"var(--mu)",textTransform:"uppercase",
            letterSpacing:".1em",padding:"2px 4px 6px",fontFamily:"'IBM Plex Mono',monospace"}}>
            Same Stack
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:8}}>
            {props.siblingEffects.map(function(sibEfx){
              return (sibEfx.maskStack||[]).map(function(sibMk){
                var synId="__sibling__:"+(props.ownerNodeId||"?")+":"+sibEfx.id+":"+sibMk.id
                var lbl=(sibEfx.name||sibEfx.type)+" › "+(sibMk.name||sibMk.channel||"mask")
                return (
                  <div key={synId} onClick={function(){pick(synId)}}
                    style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer",
                      padding:"6px 4px",borderRadius:6,
                      background:props.v===synId?"var(--sl)":"none",
                      border:props.v===synId?"1px solid var(--lv)":"1px solid transparent",
                      minWidth:THUMB_PX+16}}>
                    <div style={{width:THUMB_PX,height:THUMB_PX,borderRadius:4,overflow:"hidden",
                      background:"var(--bg)",display:"flex",alignItems:"center",justifyContent:"center",
                      boxShadow:"0 0 0 1px "+(props.v===synId?"var(--lv)":"var(--bd)")}}>
                      <span style={{fontSize:8,color:"var(--mu)",textAlign:"center",padding:2}}>mask</span>
                    </div>
                    <span style={{fontSize:8,color:props.v===synId?"var(--lv)":"var(--mu)",textAlign:"center",
                      fontFamily:"'IBM Plex Mono',monospace",maxWidth:THUMB_PX+8,
                      overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",lineHeight:1.2}}>
                      {lbl}
                    </span>
                  </div>
                )
              })
            })}
          </div>
        </div>
      )}
      {(function(){
        // Phase 2: Other Stacks — masks from effect stacks on other nodes
        var otherMasks=[]
        ;(props.nodes||[]).forEach(function(n){
          if(n.id===props.selfId) return
          function collectFromStack(stack, slotLabel){
            if(!stack||!stack.length) return
            stack.forEach(function(efx){
              if(efx.type==="__stackref__") return
              var efxMasks=(efx.maskStack||[]).filter(function(m){return m.refId&&m.refId.length>0})
              efxMasks.forEach(function(m){
                otherMasks.push({
                  nodeId:n.id, nodeName:n.name||n.type,
                  effectId:efx.id, effectLabel:efx.name||efx.type,
                  slotLabel:slotLabel,
                  maskId:m.id, maskLabel:m.name||m.channel||"mask",
                  synId:"__sibling__:"+n.id+":"+efx.id+":"+m.id
                })
              })
            })
          }
          if(n.outEfx) collectFromStack(n.outEfx,"output")
          if(n.inputA&&n.inputA.effectStack) collectFromStack(n.inputA.effectStack,"input A")
          if(n.inputB&&n.inputB.effectStack) collectFromStack(n.inputB.effectStack,"input B")
          if(n.layers) n.layers.forEach(function(l,li){
            collectFromStack(l.effectStack,(l.name||"layer "+(li+1)))
          })
          if(n.effectStack) collectFromStack(n.effectStack,"")
        })
        // Exclude masks already shown in Same Stack group
        var sibIds=new Set((props.siblingEffects||[]).map(function(e){
          return (e.maskStack||[]).map(function(m){return e.id+":"+m.id})
        }).reduce(function(a,b){return a.concat(b)},[]))
        otherMasks=otherMasks.filter(function(om){
          return !sibIds.has(om.effectId+":"+om.maskId)
        })
        if(!otherMasks.length) return null
        return (
          <div style={{marginBottom:8}}>
            <div style={{fontSize:8,color:"var(--mu)",textTransform:"uppercase",
              letterSpacing:".1em",padding:"2px 4px 6px",fontFamily:"'IBM Plex Mono',monospace"}}>
              Other Stacks
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
              {otherMasks.map(function(om){
                var lbl=om.nodeName+(om.slotLabel?" · "+om.slotLabel:"")+" › "+om.effectLabel+" › "+om.maskLabel
                var isActive=props.v===om.synId
                return (
                  <div key={om.synId} onClick={function(){pick(om.synId)}}
                    style={{display:"flex",flexDirection:"column",alignItems:"center",gap:4,cursor:"pointer",
                      padding:"6px 4px",borderRadius:6,
                      background:isActive?"var(--sl)":"none",
                      border:isActive?"1px solid var(--lv)":"1px solid transparent",
                      minWidth:THUMB_PX+16}}>
                    <div style={{width:THUMB_PX,height:THUMB_PX,borderRadius:4,overflow:"hidden",
                      background:"var(--bg)",display:"flex",alignItems:"center",justifyContent:"center",
                      boxShadow:"0 0 0 1px "+(isActive?"var(--lv)":"var(--bd)")}}>
                      <span style={{fontSize:7,color:"var(--mu)",textAlign:"center",padding:2,lineHeight:1.3}}>mask</span>
                    </div>
                    <span style={{fontSize:8,color:isActive?"var(--lv)":"var(--mu)",textAlign:"center",
                      fontFamily:"'IBM Plex Mono',monospace",maxWidth:THUMB_PX+8,
                      overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",lineHeight:1.2}}
                      title={lbl}>
                      {om.effectLabel+" › "+om.maskLabel}
                    </span>
                    <span style={{fontSize:7,color:"var(--mu)",textAlign:"center",
                      maxWidth:THUMB_PX+8,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
                      {om.nodeName}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })()}
      {creators.length>0&&(
        <div>
          <div style={{fontSize:8,color:"var(--mu)",textTransform:"uppercase",
            letterSpacing:".1em",padding:"2px 4px 6px",fontFamily:"'IBM Plex Mono',monospace"}}>
            Pixel Creators
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
            {creators.map(function(n,ci){
              return <ThumbItem key={n.id} nodeId={n.id} nodes={props.nodes} iC={props.iC}
                label={n.name} active={props.v===n.id} index={ci} asMask={asMask}
                greySource={!asMask&&!!props.asMask} onClick={function(){pick(n.id)}}/>
            })}
          </div>
        </div>
      )}
      {comps.length>0&&(
        <div style={{marginTop:creators.length>0?10:0}}>
          <div style={{fontSize:8,color:"var(--mu)",textTransform:"uppercase",
            letterSpacing:".1em",padding:"2px 4px 6px",fontFamily:"'IBM Plex Mono',monospace"}}>
            {mode==="intermediate"?"Promoted Taps":"Compositors"}
          </div>
          <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
            {comps.map(function(n,ci){
              return <ThumbItem key={n.id} nodeId={n.id} nodes={props.nodes} iC={props.iC}
                label={n.name} active={props.v===n.id} index={creators.length+ci} asMask={asMask}
                greySource={!asMask&&!!props.asMask} onClick={function(){pick(n.id)}}/>
            })}
          </div>
        </div>
      )}
      {allItems.length===0&&(
        <div style={{fontSize:11,color:"var(--mu)",padding:"4px 10px"}}>no valid sources</div>
      )}
    </div>
  )
  return (
    <PR l={props.l}>
      <button ref={anchorRef} onClick={function(){setOpen(!open)}}
        style={Object.assign({},btnStyle,{minHeight:"var(--tap-sm)",background:"var(--el)",
          border:"1px solid var(--bd)",borderRadius:6})}>
        {btnLabel}
      </button>
      {open&&pos&&createPortal(
        <div ref={menuRef} style={Object.assign({},pos,{
          position:"fixed",zIndex:9000,background:"var(--pn)",
          border:"1px solid var(--bd)",borderRadius:10,
          boxShadow:"0 -8px 32px rgba(0,0,0,.7)"})}>
          {menuContent}
        </div>,
        document.body
      )}
    </PR>
  )
}
function TabBar(props) {
  return (
    <div className="tabs">
      {props.tabs.map(function(t) {
        var cls = "tab" + (props.active===t.id ? " on" + (t.color ? " "+t.color : "") : "")
        return (
          <button key={t.id} className={cls} onClick={function(){props.onChange(t.id)}}>
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

/* ─── CREATOR PROP PANELS ─────────────────────────────── */
function SolidP(props) {
  var p=props.p, up=props.up
  return (
    <div>
      <Co l="colour" v={p.color} fn={function(v){up(Object.assign({},p,{color:v}))}}/>
      <Sl l="alpha" v={p.alpha} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{alpha:v}))}}/>
    </div>
  )
}
function ShapeP(props) {
  var p=props.p, up=props.up, s=p.shapeType
  return (
    <div>
      <Se l="type" v={s} opts={SHAPES} fn={function(v){up(Object.assign({},p,{shapeType:v}))}}/>
      <Sl l="x" v={p.x} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{x:v}))}}/>
      <Sl l="y" v={p.y} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{y:v}))}}/>
      <Sl l="size" v={p.sz} mn={.05} mx={1.8} st={.01} fn={function(v){up(Object.assign({},p,{sz:v}))}}/>
      {(s==="ellipse") && (
        <div>
          <Sl l="x radius" v={p.rx==null?1:p.rx} mn={.1} mx={3} st={.01} fn={function(v){up(Object.assign({},p,{rx:v}))}}/>
          <Sl l="y radius" v={p.ry==null?1:p.ry} mn={.1} mx={3} st={.01} fn={function(v){up(Object.assign({},p,{ry:v}))}}/>
        </div>
      )}
      {(s==="rectangle") && (
        <div>
          <Sl l="corner x" v={p.rx==null?1:p.rx} mn={0} mx={2} st={.01} fn={function(v){up(Object.assign({},p,{rx:v}))}}/>
          <Sl l="corner y" v={p.ry==null?1:p.ry} mn={0} mx={2} st={.01} fn={function(v){up(Object.assign({},p,{ry:v}))}}/>
        </div>
      )}
      <Sl l="rotation" v={p.rot} mn={0} mx={360} st={1} fmt={function(v){return Math.round(v)+"deg"}} fn={function(v){up(Object.assign({},p,{rot:v}))}}/>
      {s==="star" && (
        <div>
          <Sl l="points" v={p.pts} mn={3} mx={16} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{pts:v}))}}/>
          <Sl l="inner r" v={p.innerR} mn={.05} mx={.95} st={.01} fn={function(v){up(Object.assign({},p,{innerR:v}))}}/>
          <Sl l="jitter" v={p.jitter||0} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{jitter:v}))}}/>
          {(p.jitter||0)>0&&<Sl l="j.seed" v={p.jitterSeed||1} mn={0} mx={9999} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{jitterSeed:v}))}}/>}
        </div>
      )}
      {s==="ring" && <Sl l="inner r" v={p.ringR} mn={.1} mx={.95} st={.01} fn={function(v){up(Object.assign({},p,{ringR:v}))}}/>}
      {s==="rounded-rect" && (
        <Sl l="corner r" v={p.cornerR==null?.2:p.cornerR} mn={0} mx={1} st={.01}
          fmt={function(v){return Math.round(v*100)+"%"}}
          fn={function(v){up(Object.assign({},p,{cornerR:v}))}}/>
      )}
      {s==="polygon" && (
        <div>
          <Sl l="sides" v={p.sides} mn={3} mx={14} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{sides:v}))}}/>
          <Sl l="jitter" v={p.jitter||0} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{jitter:v}))}}/>
          {(p.jitter||0)>0&&<Sl l="j.seed" v={p.jitterSeed||1} mn={0} mx={9999} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{jitterSeed:v}))}}/>}
        </div>
      )}
      {/* Render mode: smooth (arcs) vs faceted (line segments — enables jitter on all shapes) */}
      <PR l="render">
        {["smooth","faceted"].map(function(m){
          return <button key={m} className={(p.renderMode||"smooth")===m?"ac":"ghost"}
            onClick={function(){up(Object.assign({},p,{renderMode:m}))}}
            style={{flex:1,fontSize:10,minHeight:32}}>{m}</button>
        })}
      </PR>
      {(p.renderMode==="faceted")&&(
        <Sl l="segments" v={p.segments||32} mn={3} mx={128} st={1}
          fmt={function(v){return Math.round(v)}}
          fn={function(v){up(Object.assign({},p,{segments:v}))}}/>
      )}
      {/* Jitter available in both modes for all shapes */}
      {(s==="ellipse"||s==="ring"||s==="rectangle"||s==="rounded-rect")&&(
        <div>
          <Sl l="jitter" v={p.jitter||0} mn={0} mx={1} st={.01}
            fn={function(v){up(Object.assign({},p,{jitter:v}))}}/>
          {(p.jitter||0)>0&&<Sl l="j.seed" v={p.jitterSeed||1} mn={0} mx={9999} st={1}
            fmt={function(v){return Math.round(v)}}
            fn={function(v){up(Object.assign({},p,{jitterSeed:v}))}}/>}
        </div>
      )}
      <Co l="fill" v={p.fill} fn={function(v){up(Object.assign({},p,{fill:v}))}}/>
      <Sl l="fill op" v={p.fillOpacity==null?1:p.fillOpacity} mn={0} mx={1} st={.01}
        fmt={function(v){return Math.round(v*100)+"%"}}
        fn={function(v){up(Object.assign({},p,{fillOpacity:v}))}}/>
      <Sl l="stroke w" v={p.strokeW} mn={0} mx={20} st={.5} fmt={function(v){return v.toFixed(1)}} fn={function(v){up(Object.assign({},p,{strokeW:v}))}}/>
      {p.strokeW>0 && (
        <div>
          <Co l="stroke" v={p.stroke} fn={function(v){up(Object.assign({},p,{stroke:v}))}}/>
          <Sl l="stroke op" v={p.strokeOpacity==null?1:p.strokeOpacity} mn={0} mx={1} st={.01}
            fmt={function(v){return Math.round(v*100)+"%"}}
            fn={function(v){up(Object.assign({},p,{strokeOpacity:v}))}}/>
        </div>
      )}
      <Sl l="opacity" v={p.opacity==null?(p.alpha==null?1:p.alpha):p.opacity} mn={0} mx={1} st={.01}
        fmt={function(v){return Math.round(v*100)+"%"}}
        fn={function(v){up(Object.assign({},p,{opacity:v}))}}/>
    </div>
  )
}
function GradP(props) {
  var p=props.p, up=props.up
  // Migrate legacy c1/s1/c2/s2 to stops on first render via gradStops helper
  var stops=gradStops(p).slice().sort(function(a,b){return a.pos-b.pos})
  function setStops(ns){up(Object.assign({},p,{stops:ns,c1:undefined,s1:undefined,c2:undefined,s2:undefined}))}
  function updStop(i,patch){setStops(stops.map(function(s,si){return si===i?Object.assign({},s,patch):s}))}
  function addStop(){
    // Insert at widest gap, interpolate colour + alpha
    var maxGap=0,ins=.5,insC="#808080",insA=1
    for(var i=0;i<stops.length-1;i++){
      var gap=stops[i+1].pos-stops[i].pos
      if(gap>maxGap){
        maxGap=gap; ins=stops[i].pos+gap/2
        function ph(h){var s=(h||"#000").replace("#","");if(s.length===3)s=s.split("").map(function(c){return c+c}).join("");return[parseInt(s.slice(0,2),16)||0,parseInt(s.slice(2,4),16)||0,parseInt(s.slice(4,6),16)||0]}
        var r1=ph(stops[i].color),r2=ph(stops[i+1].color)
        insC="#"+[0,1,2].map(function(j){return Math.round((r1[j]+r2[j])/2).toString(16).padStart(2,"0")}).join("")
        var ai=stops[i].alpha==null?1:stops[i].alpha, aj=stops[i+1].alpha==null?1:stops[i+1].alpha
        insA=(ai+aj)/2
      }
    }
    setStops(stops.concat([{pos:ins,color:insC,alpha:insA}]))
  }
  function delStop(i){if(stops.length<=2)return;setStops(stops.filter(function(_,si){return si!==i}))}
  // CSS preview strip using rgba stops
  var previewStops=stops.map(function(s){
    var hex=(s.color||"#000000").replace("#",""),a=s.alpha==null?1:s.alpha
    if(hex.length===3)hex=hex.split("").map(function(c){return c+c}).join("")
    return "rgba("+[parseInt(hex.slice(0,2),16),parseInt(hex.slice(2,4),16),parseInt(hex.slice(4,6),16),a].join(",")+" "+(s.pos*100).toFixed(1)+"%"
  }).join(",")
  return (
    <div>
      <Se l="type" v={p.gType} opts={GTYPES} fn={function(v){up(Object.assign({},p,{gType:v}))}}/>
      {/* Gradient preview strip */}
      <div style={{display:"flex",alignItems:"center",gap:8,margin:"4px 0 8px"}}>
        <span style={{fontSize:9,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",
          minWidth:76,textAlign:"right",flexShrink:0}}>preview</span>
        <div style={{flex:1,height:24,borderRadius:5,border:"1px solid var(--bd)",
          background:"linear-gradient(to right,"+previewStops+"),repeating-conic-gradient(#1a1a38 0deg 90deg,#121228 90deg 180deg) 0 0 / 10px 10px"}}/>
      </div>
      {/* Stops editor */}
      <div style={{display:"flex",flexDirection:"column",gap:4,marginBottom:8}}>
        {stops.map(function(s,i){
          var aVal=s.alpha==null?1:s.alpha
          return (
            <div key={i} style={{background:"rgba(20,20,44,.5)",border:"1px solid var(--bd)",borderRadius:6,padding:"6px 8px",display:"flex",flexDirection:"column",gap:4}}>
              {/* Row 1: swatch + position + delete */}
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <input type="color" value={s.color||"#ffffff"}
                  onChange={function(e){updStop(i,{color:e.target.value})}}
                  style={{width:32,height:28,padding:0,border:"1px solid var(--bd)",borderRadius:4,background:"none",cursor:"pointer",flexShrink:0}}/>
                <span style={{fontSize:9,color:"var(--mu)",flexShrink:0}}>pos</span>
                <input type="range" min={0} max={1} step={.001} value={s.pos}
                  onChange={function(e){updStop(i,{pos:parseFloat(e.target.value)})}}
                  style={{flex:1}}/>
                <span style={{fontSize:10,color:"var(--di)",minWidth:38,textAlign:"right",flexShrink:0}}>{(s.pos*100).toFixed(1)}%</span>
                <button onClick={function(){delStop(i)}} disabled={stops.length<=2}
                  style={{minHeight:28,padding:"0 8px",fontSize:12,color:stops.length<=2?"var(--mu)":"var(--dng)",background:"none",border:"none",cursor:stops.length<=2?"default":"pointer",flexShrink:0}}>×</button>
              </div>
              {/* Row 2: alpha */}
              <div style={{display:"flex",gap:6,alignItems:"center",paddingLeft:38}}>
                <span style={{fontSize:9,color:"var(--mu)",flexShrink:0,minWidth:14}}>α</span>
                <input type="range" min={0} max={1} step={.01} value={aVal}
                  onChange={function(e){updStop(i,{alpha:parseFloat(e.target.value)})}}
                  style={{flex:1}}/>
                <span style={{fontSize:10,color:"var(--di)",minWidth:38,textAlign:"right",flexShrink:0}}>{Math.round(aVal*100)}%</span>
              </div>
            </div>
          )
        })}
      </div>
      <button className="ac" style={{width:"100%",marginBottom:8}} onClick={addStop}>+ stop</button>
      {p.gType==="linear" && <Sl l="angle" v={p.angle||90} mn={0} mx={360} st={1} fmt={function(v){return Math.round(v)+"deg"}} fn={function(v){up(Object.assign({},p,{angle:v}))}}/>}
      {(p.gType==="radial"||p.gType==="conic") && (
        <div>
          <Sl l="centre x" v={p.cx||.5} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cx:v}))}}/>
          <Sl l="centre y" v={p.cy||.5} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cy:v}))}}/>
        </div>
      )}
      {p.gType==="radial" && <Sl l="radius" v={p.r||.7} mn={.01} mx={2.5} st={.01} fn={function(v){up(Object.assign({},p,{r:v}))}}/>}
      {p.gType==="conic" && <Sl l="start" v={p.sa||0} mn={0} mx={360} st={1} fmt={function(v){return Math.round(v)+"deg"}} fn={function(v){up(Object.assign({},p,{sa:v}))}}/>}
      <Sl l="opacity" v={p.alpha==null?1:p.alpha} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{alpha:v}))}}/>
      {/* ── Gradient utilities ── */}
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginTop:4}}>
        <button onClick={function(){
          setStops(stops.map(function(s){return Object.assign({},s,{pos:1-s.pos})}))
        }} className="ghost" style={{flex:"1 1 0",fontSize:10,padding:"4px 8px"}}>reverse</button>
      </div>
      <div style={{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap",marginTop:4}}>
        <span style={{fontSize:9,color:"var(--mu)",marginRight:4}}>distribute</span>
        {[["even",function(t){return t}],["expo",function(t){return t*t}],["log",function(t){return Math.sqrt(t)}]].map(function(m){
          return <button key={m[0]} className="ghost" style={{fontSize:10,padding:"4px 10px"}}
            onClick={function(){
              var n2=stops.length; if(n2<2)return
              var ns=stops.map(function(s,i){return Object.assign({},s,{pos:m[1](i/(n2-1))})})
              setStops(ns)
            }}>{m[0]}</button>
        })}
      </div>
      <div style={{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap",marginTop:4}}>
        <span style={{fontSize:9,color:"var(--mu)",marginRight:4}}>presets</span>
        {[
          {label:"B→W",  stops:[{pos:0,color:"#000000",alpha:1},{pos:1,color:"#ffffff",alpha:1}]},
          {label:"W→B",  stops:[{pos:0,color:"#ffffff",alpha:1},{pos:1,color:"#000000",alpha:1}]},
          {label:"rainbow",stops:[{pos:0,color:"#ff0000",alpha:1},{pos:.17,color:"#ff8800",alpha:1},{pos:.33,color:"#ffff00",alpha:1},{pos:.5,color:"#00cc00",alpha:1},{pos:.67,color:"#0044ff",alpha:1},{pos:.83,color:"#8800cc",alpha:1},{pos:1,color:"#ff0088",alpha:1}]},
          {label:"heat",  stops:[{pos:0,color:"#000000",alpha:1},{pos:.33,color:"#cc2200",alpha:1},{pos:.66,color:"#ffaa00",alpha:1},{pos:1,color:"#ffffff",alpha:1}]},
          {label:"cyan",  stops:[{pos:0,color:"#000033",alpha:1},{pos:1,color:"#00ffcc",alpha:1}]},
          {label:"α→full",stops:[{pos:0,color:"#ffffff",alpha:0},{pos:1,color:"#ffffff",alpha:1}]}
        ].map(function(pr){
          return <button key={pr.label} className="ghost" style={{fontSize:10,padding:"4px 8px"}}
            onClick={function(){setStops(pr.stops)}}>{pr.label}</button>
        })}
      </div>
    </div>
  )
}
// Shared point creator controls
function PointCreatorBase(props) {
  var p=props.p, up=props.up
  return (
    <div>
      <PR l="render">
        {["dots","hidden"].map(function(m){
          return <button key={m} className={(p.renderMode||"dots")===m?"ac":"ghost"}
            onClick={function(){up(Object.assign({},p,{renderMode:m}))}}
            style={{flex:1,fontSize:11,minHeight:32}}>{m}</button>
        })}
      </PR>
      {(p.renderMode||"dots")==="dots"&&(
        <div>
          <Sl l="dot size" v={p.dotSize||4} mn={1} mx={20} st={.5}
            fmt={function(v){return v.toFixed(1)+"px"}} fn={function(v){up(Object.assign({},p,{dotSize:v}))}}/>
          <Co l="colour" v={p.color||"#ffffff"} fn={function(v){up(Object.assign({},p,{color:v}))}}/>
          <Sl l="opacity" v={p.opacity==null?1:p.opacity} mn={0} mx={1} st={.01}
            fmt={function(v){return Math.round(v*100)+"%"}} fn={function(v){up(Object.assign({},p,{opacity:v}))}}/>
        </div>
      )}
      {props.children}
    </div>
  )
}
function GridP(props) {
  var p=props.p, up=props.up
  return (
    <PointCreatorBase p={p} up={up}>
      <Sl l="columns" v={p.cols||4} mn={1} mx={64} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{cols:v}))}}/>
      <Sl l="rows" v={p.rows||4} mn={1} mx={64} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{rows:v}))}}/>
      <Sl l="stagger" v={p.stagger||0} mn={0} mx={1} st={.01} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{stagger:v}))}}/>
      {(p.stagger||0)>0&&(
        <div>
          <Se l="axis" v={p.staggerAxis||"row"} opts={["row","col"]} fn={function(v){up(Object.assign({},p,{staggerAxis:v}))}}/>
          <PR l="apply to">
            {["odd","even"].map(function(o){
              return <button key={o} className={(p.staggerParity||"odd")===o?"ac":"ghost"}
                onClick={function(){up(Object.assign({},p,{staggerParity:o}))}}
                style={{flex:1,fontSize:11,minHeight:32}}>{o}</button>
            })}
          </PR>
        </div>
      )}
      <Sl l="offset X" v={p.offX||0} mn={-.5} mx={.5} st={.01} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{offX:v}))}}/>
      <Sl l="offset Y" v={p.offY||0} mn={-.5} mx={.5} st={.01} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{offY:v}))}}/>
    </PointCreatorBase>
  )
}
function SpiralP(props) {
  var p=props.p, up=props.up
  return (
    <PointCreatorBase p={p} up={up}>
      <Sl l="points" v={p.pointCount||32} mn={4} mx={512} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{pointCount:v}))}}/>
      <Sl l="turns" v={p.turns||3} mn={.25} mx={20} st={.25} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{turns:v}))}}/>
      <Sl l="start r" v={p.startRadius||0} mn={0} mx={.5} st={.01} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{startRadius:v}))}}/>
      <Sl l="end r" v={p.endRadius||.45} mn={.01} mx={.5} st={.01} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{endRadius:v}))}}/>
      <Sl l="centre X" v={p.cx==null?.5:p.cx} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cx:v}))}}/>
      <Sl l="centre Y" v={p.cy==null?.5:p.cy} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cy:v}))}}/>
    </PointCreatorBase>
  )
}
function PolarGridP(props) {
  var p=props.p, up=props.up
  return (
    <PointCreatorBase p={p} up={up}>
      <Sl l="rings" v={p.rings||4} mn={1} mx={32} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{rings:v}))}}/>
      <Sl l="per ring" v={p.pointsPerRing||8} mn={2} mx={64} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{pointsPerRing:v}))}}/>
      <Sl l="start r" v={p.startRadius||.05} mn={0} mx={.5} st={.01} fn={function(v){up(Object.assign({},p,{startRadius:v}))}}/>
      <Sl l="end r" v={p.endRadius||.45} mn={.01} mx={.5} st={.01} fn={function(v){up(Object.assign({},p,{endRadius:v}))}}/>
      <Sl l="centre X" v={p.cx==null?.5:p.cx} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cx:v}))}}/>
      <Sl l="centre Y" v={p.cy==null?.5:p.cy} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cy:v}))}}/>
    </PointCreatorBase>
  )
}
function PhyllotaxisP(props) {
  var p=props.p, up=props.up
  return (
    <PointCreatorBase p={p} up={up}>
      <Sl l="points" v={p.pointCount||64} mn={4} mx={1024} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{pointCount:v}))}}/>
      <Sl l="divergence" v={p.divergenceAngle==null?137.508:p.divergenceAngle} mn={90} mx={180} st={.001}
        fmt={function(v){return v.toFixed(3)+"°"}} fn={function(v){up(Object.assign({},p,{divergenceAngle:v}))}}/>
      <Sl l="scale" v={p.scale||.45} mn={.05} mx={.5} st={.005} fn={function(v){up(Object.assign({},p,{scale:v}))}}/>
      <Sl l="centre X" v={p.cx==null?.5:p.cx} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cx:v}))}}/>
      <Sl l="centre Y" v={p.cy==null?.5:p.cy} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cy:v}))}}/>
    </PointCreatorBase>
  )
}
function ScatterP(props) {
  var p=props.p, up=props.up
  return (
    <PointCreatorBase p={p} up={up}>
      <Sl l="points" v={p.pointCount||32} mn={2} mx={512} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{pointCount:v}))}}/>
      <Sl l="seed" v={p.seed||1} mn={0} mx={9999} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{seed:v}))}}/>
      <Sl l="x min" v={p.x0||0} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{x0:v}))}}/>
      <Sl l="x max" v={p.x1||1} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{x1:v}))}}/>
      <Sl l="y min" v={p.y0||0} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{y0:v}))}}/>
      <Sl l="y max" v={p.y1||1} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{y1:v}))}}/>
    </PointCreatorBase>
  )
}
function NoiseP(props) {
  var p=props.p, up=props.up
  var hasOct=["perlin","fbm","turbulence","marble","wood"].includes(p.nType)
  return (
    <div>
      <Se l="type" v={p.nType} opts={NTYPES} fn={function(v){up(Object.assign({},p,{nType:v}))}}/>
      <Co l="colour 1" v={p.c1} fn={function(v){up(Object.assign({},p,{c1:v}))}}/>
      <Co l="colour 2" v={p.c2} fn={function(v){up(Object.assign({},p,{c2:v}))}}/>
      <Sl l="scale" v={p.scale} mn={.005} mx={.4} st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up(Object.assign({},p,{scale:v}))}}/>
      {hasOct&&<Sl l="octaves" v={p.oct||4} mn={1} mx={8} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{oct:v}))}}/>}
      {p.nType==="fbm"&&(
        <div>
          <Sl l="lacunarity" v={p.lac||2} mn={1} mx={4} st={.1} fmt={function(v){return v.toFixed(1)}} fn={function(v){up(Object.assign({},p,{lac:v}))}}/>
          <Sl l="gain" v={p.gain||.5} mn={.1} mx={.9} st={.05} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{gain:v}))}}/>
        </div>
      )}
      {p.nType==="worley"&&(
        <Sl l="jitter" v={p.wJitter==null?1:p.wJitter} mn={0} mx={1} st={.01} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{wJitter:v}))}}/>
      )}
      {(p.nType==="marble"||p.nType==="wood")&&(
        <div>
          <Sl l="frequency" v={p.mFreq||4} mn={1} mx={20} st={.5} fmt={function(v){return v.toFixed(1)}} fn={function(v){up(Object.assign({},p,{mFreq:v}))}}/>
          <Sl l="turbulence" v={p.mTurb||2} mn={0} mx={10} st={.1} fmt={function(v){return v.toFixed(1)}} fn={function(v){up(Object.assign({},p,{mTurb:v}))}}/>
        </div>
      )}
      <Sl l="seed" v={p.seed||1} mn={0} mx={9999} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{seed:v}))}}/>
      <Sl l="opacity" v={p.alpha==null?1:p.alpha} mn={0} mx={1} st={.01} fmt={function(v){return Math.round(v*100)+"%"}} fn={function(v){up(Object.assign({},p,{alpha:v}))}}/>
    </div>
  )
}
function PatP(props) {
  var p=props.p, up=props.up
  return (
    <div>
      <Se l="type" v={p.pType} opts={PTYPES} fn={function(v){up(Object.assign({},p,{pType:v}))}}/>
      <Co l="colour 1" v={p.c1} fn={function(v){up(Object.assign({},p,{c1:v}))}}/>
      <Sl l="opacity 1" v={p.a1==null?1:p.a1} mn={0} mx={1} st={.01} fmt={function(v){return Math.round(v*100)+"%"}} fn={function(v){up(Object.assign({},p,{a1:v}))}}/>
      <Co l="colour 2" v={p.c2} fn={function(v){up(Object.assign({},p,{c2:v}))}}/>
      <Sl l="opacity 2" v={p.a2==null?1:p.a2} mn={0} mx={1} st={.01} fmt={function(v){return Math.round(v*100)+"%"}} fn={function(v){up(Object.assign({},p,{a2:v}))}}/>
      <Sl l="scale" v={p.scale||.1} mn={.01} mx={.5} st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up(Object.assign({},p,{scale:v}))}}/>
      <Sl l="angle" v={p.angle||0} mn={0} mx={360} st={1} fmt={function(v){return Math.round(v)+"deg"}} fn={function(v){up(Object.assign({},p,{angle:v}))}}/>
      {p.pType==="stripes" && (
        <Sl l="width" v={p.sw||.1} mn={.01} mx={.5} st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up(Object.assign({},p,{sw:v}))}}/>
      )}
      {p.pType==="dots" && (
        <div>
          <Sl l="dot r" v={p.dr||.03} mn={.005} mx={.2} st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up(Object.assign({},p,{dr:v}))}}/>
          <Sl l="spacing" v={p.ds||.1} mn={.02} mx={.5} st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up(Object.assign({},p,{ds:v}))}}/>
        </div>
      )}
      <Sl l="opacity" v={p.alpha==null?1:p.alpha} mn={0} mx={1} st={.01} fmt={function(v){return Math.round(v*100)+"%"}} fn={function(v){up(Object.assign({},p,{alpha:v}))}}/>
    </div>
  )
}

// ── Grid creator UI ─────────────────────────────────────────────────────────