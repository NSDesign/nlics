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
.sheet-body{background:var(--pn);border-radius:18px 18px 0 0;max-height:92vh;display:flex;flex-direction:column;overflow:hidden;}
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
// Blend modes whose RGB output is identical regardless of input order.
// With uniform alpha in both inputs, swapping them produces the same pixels.
// Used to show a hint when the user toggles 'A over B' with such a mode.
var COMMUTATIVE_MODES = {add:1,multiply:1,screen:1,difference:1,exclusion:1,darken:1,lighten:1}
var EBMS   = ["normal","multiply","screen","overlay","add","subtract","darken","lighten"]
var MBMS   = ["multiply","screen","add","subtract","normal"]
var MCH    = ["luminosity","R","G","B","A"]
var SHAPES = ["ellipse","rectangle","polygon","star","ring"]
var GTYPES = ["linear","radial","conic"]
var NTYPES = ["perlin","random"]
var PTYPES = ["checkerboard","stripes","dots"]
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
  if(t==="transform") params={tx:0,ty:0,rot:0,su:1,sx:1,sy:1,skX:0,skY:0}
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
  return { id:uid(), type:t, name:"", enabled:true, params:params, opacity:100, blendMode:"normal", maskStack:[] }
}
function mkMask() { return { id:uid(), name:"", refId:null, channel:"luminosity", invert:false, strength:1, opacity:100, blendMode:"multiply", effectStack:[], enabled:true } }
function mkSlot() { return { refId:null, effectStack:[], maskStack:[] } }
function mkBlender() { return { id:uid(), name:"Blender "+(_uid-100), type:"blender", section:2, enabled:true, inputA:mkSlot(), inputB:mkSlot(), mode:"normal", amount:100, switched:false, maskMode:"add", maskAmount:100, outEfx:[], outMask:[] } }
function mkLayer(refId) { return { id:uid(), refId:refId||null, name:"", enabled:true, effectStack:[], maskStack:[], blendMode:"normal", opacity:100, maskMode:"add", maskAmount:100 } }
function mkLayerComp() { return { id:uid(), name:"Layer Comp "+(_uid-100), type:"layers", section:2, enabled:true, layers:[mkLayer(),mkLayer()], outEfx:[], outMask:[] } }
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
  }
  // NOTE: "transform" is handled specially in applyEfxStk (needs full canvas context, not just ImageData)
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
  var pts=p.pts||5,innerR=p.innerR||.45,sides=p.sides||5,ringR=p.ringR||.62,alpha=p.alpha==null?1:p.alpha
  // Render at 2× resolution then downscale — gives SSAA-quality antialiasing on
  // all path types, especially star and polygon which have sharp angle vertices.
  var sc=2, sw2=w*sc, sh2=h*sc
  var tc=document.createElement("canvas"); tc.width=sw2; tc.height=sh2
  var tc2=tc.getContext("2d")
  var r=sz*Math.min(sw2,sh2)/2
  tc2.translate(x*sw2,y*sh2); tc2.rotate(rot*Math.PI/180); tc2.beginPath()
  if(s==="ellipse")tc2.ellipse(0,0,r,r,0,0,Math.PI*2)
  else if(s==="rectangle")tc2.rect(-r,-r,r*2,r*2)
  else if(s==="polygon"){
    for(var i=0;i<sides;i++){var a=(i*2*Math.PI/sides)-Math.PI/2;i===0?tc2.moveTo(Math.cos(a)*r,Math.sin(a)*r):tc2.lineTo(Math.cos(a)*r,Math.sin(a)*r)}
    tc2.closePath()
  }
  else if(s==="star"){
    var ir=r*innerR
    for(var j=0;j<pts*2;j++){var a2=(j*Math.PI/pts)-Math.PI/2,rr=j%2===0?r:ir;j===0?tc2.moveTo(Math.cos(a2)*rr,Math.sin(a2)*rr):tc2.lineTo(Math.cos(a2)*rr,Math.sin(a2)*rr)}
    tc2.closePath()
  }
  else if(s==="ring"){tc2.arc(0,0,r,0,Math.PI*2);tc2.moveTo(r*ringR,0);tc2.arc(0,0,r*ringR,0,Math.PI*2,true)}
  if(fill&&fill!=="none"){tc2.fillStyle=fill;tc2.fill("evenodd")}
  if(strokeW>0){tc2.strokeStyle=stroke;tc2.lineWidth=strokeW*sc;tc2.stroke()}
  // Downscale to output with bilinear filtering for smooth edges
  ctx.save();ctx.globalAlpha=alpha;ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality="high"
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
  var nType=p.nType||"perlin",c1=p.c1||"#fff",c2=p.c2||"#000",scale=p.scale||.04,oct=p.oct||4,seed=p.seed||1,alpha=p.alpha==null?1:p.alpha
  var CA=h2r(c1),CB=h2r(c2),ds=2,dw=Math.ceil(w/ds),dh=Math.ceil(h/ds),img=ctx.createImageData(dw,dh),d=img.data
  for(var py=0;py<dh;py++) for(var px=0;px<dw;px++){
    var v=Math.max(0,Math.min(1,nType==="perlin"?octN(px*scale,py*scale,oct,seed):vh(px,py,seed)))
    var c=lrC(CB,CA,v),idx=(py*dw+px)*4;d[idx]=c.r;d[idx+1]=c.g;d[idx+2]=c.b;d[idx+3]=255
  }
  var tc=document.createElement("canvas");tc.width=dw;tc.height=dh;tc.getContext("2d").putImageData(img,0,0)
  ctx.save();ctx.globalAlpha=alpha;ctx.imageSmoothingEnabled=true;ctx.drawImage(tc,0,0,w,h);ctx.restore()
}
function gPat(ctx,p,w,h) {
  var pType=p.pType||"checkerboard",c1=p.c1||"#fff",c2=p.c2||"#000"
  var scale=p.scale||.1,sw=p.sw||.1,angle=p.angle||0,dr=p.dr||.03,ds=p.ds||.1,alpha=p.alpha==null?1:p.alpha
  var a1=p.a1==null?1:p.a1, a2=p.a2==null?1:p.a2   // per-colour alpha (0-1)
  var CA=h2r(c1),CB=h2r(c2)
  var img=ctx.createImageData(w,h),d=img.data
  // cs = cell size in pixels. scale is fraction of canvas dimension (0.1 = 10% = ~10 tiles across).
  var cs  = Math.max(2, Math.round(scale * Math.max(w,h)))
  var sW  = Math.max(1, sw * Math.max(w,h))
  var dR  = Math.max(1, dr * Math.max(w,h))
  var dS  = Math.max(2, ds * Math.max(w,h))
  var rad = angle * Math.PI / 180

  for(var py=0;py<h;py++) for(var px=0;px<w;px++){
    var ii=(py*w+px)*4, r, g, b

    if(pType==="checkerboard"){
      var t=(Math.floor(px/cs)+Math.floor(py/cs))%2
      r=t===0?CA.r:CB.r; g=t===0?CA.g:CB.g; b=t===0?CA.b:CB.b
      d[ii]=r;d[ii+1]=g;d[ii+2]=b;d[ii+3]=Math.round((t===0?a1:a2)*255)

    } else if(pType==="stripes"){
      var pj=px*Math.cos(rad)+py*Math.sin(rad)
      var t2=((pj%(sW*2))+sW*2)%(sW*2)<sW?0:1
      r=t2===0?CA.r:CB.r; g=t2===0?CA.g:CB.g; b=t2===0?CA.b:CB.b
      d[ii]=r;d[ii+1]=g;d[ii+2]=b;d[ii+3]=Math.round((t2===0?a1:a2)*255)

    } else if(pType==="dots"){
      var gx=((px%dS)+dS)%dS-dS/2
      var gy=((py%dS)+dS)%dS-dS/2
      var dist=Math.sqrt(gx*gx+gy*gy)
      var blend=Math.max(0,Math.min(1,dist-dR+0.5))
      r=Math.round(CA.r*(1-blend)+CB.r*blend)
      g=Math.round(CA.g*(1-blend)+CB.g*blend)
      b=Math.round(CA.b*(1-blend)+CB.b*blend)
      d[ii]=r;d[ii+1]=g;d[ii+2]=b;d[ii+3]=Math.round((a1*(1-blend)+a2*blend)*255)
    }
  }
  ctx.save();ctx.globalAlpha=alpha;ctx.putImageData(img,0,0);ctx.restore()
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
function applyBack(pre,post,mv,opacity,mode) {
  var f=(opacity==null?100:opacity)/100
  for(var i=0;i<pre.length;i+=4){
    var m=Math.min(1,Math.max(0,(mv?mv[i/4]:1)*f))
    var res=pxBl(mode,[pre[i],pre[i+1],pre[i+2]],[post[i],post[i+1],post[i+2]])
    pre[i]  =Math.round(pre[i]  *(1-m)+res[0]*m)
    pre[i+1]=Math.round(pre[i+1]*(1-m)+res[1]*m)
    pre[i+2]=Math.round(pre[i+2]*(1-m)+res[2]*m)
    pre[i+3]=Math.round(pre[i+3]*(1-m)+post[i+3]*m)
  }
}
function compMasks(stack,cmap,cache,iC,w,h,vis) {
  var out=new Float32Array(w*h).fill(1),any=false
  // Bottom-to-top iteration: last in list applied first, first in list applied last
  for(var mi=stack.length-1;mi>=0;mi--){
    var mk=stack[mi];if(mk.enabled===false)continue
    // Defensive: treat missing strength as 1 (full), missing opacity as 100,
    // missing channel as luminosity, missing blendMode as multiply
    if(mk.strength==null) mk=Object.assign({},mk,{strength:1})
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
      var mv2=(mk.invert?1-v:v)*(mk.strength==null?1:mk.strength)*f
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
    if (efx.type==="transform") {
      // Transform is a full canvas operation — snap pre state, apply matrix, blend back via mask if present
      if (efx.maskStack && efx.maskStack.length>0) {
        // Masked transform: capture pre, apply transform, blend back using mask
        var preSnap = ctx.getImageData(0,0,w,h)
        applyTransform(ctx, efx.params, w, h)
        var postData = ctx.getImageData(0,0,w,h)
        var mv = compMasks(efx.maskStack, cmap, cache, iC, w, h, new Set(vis))
        // applyBack writes the blend into preSnap.data — put preSnap (not postData)
        applyBack(preSnap.data, postData.data, mv, efx.opacity, efx.blendMode||"normal")
        ctx.putImageData(preSnap, 0, 0)
      } else {
        // No mask — apply transform directly, respecting opacity
        var preT = ctx.getImageData(0,0,w,h)
        applyTransform(ctx, efx.params, w, h)
        if (efx.opacity < 100) {
          var postT = ctx.getImageData(0,0,w,h)
          var blended = new Uint8ClampedArray(preT.data)
          applyBack(blended, postT.data, null, efx.opacity, efx.blendMode||"normal")
          ctx.putImageData(new ImageData(blended,w,h), 0, 0)
        }
      }
      continue
    }

    var pre=ctx.getImageData(0,0,w,h), post=new Uint8ClampedArray(pre.data)
    pxFn(post,w,h,efx.type,efx.params)
    var mv=efx.maskStack&&efx.maskStack.length>0?compMasks(efx.maskStack,cmap,cache,iC,w,h,new Set(vis)):null
    applyBack(pre.data,post,mv,efx.opacity,efx.blendMode||"normal")
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
// Blend pixel colours only — matte/alpha is handled separately by the caller.
// maskMode/maskAmount params kept for API compat but no longer used here.
function blendCv(ctx,srcCv,mode,amount,w,h,maskMode,maskAmount) {
  if(mode==="subtract"||mode==="divide"){
    var base=ctx.getImageData(0,0,w,h)
    var srcD=clCv(srcCv,w,h).getContext("2d").getImageData(0,0,w,h).data
    var B=base.data,f=amount/100
    for(var i=0;i<B.length;i+=4){
      if(mode==="subtract"){
        B[i]=Math.max(0,B[i]-srcD[i]*f)
        B[i+1]=Math.max(0,B[i+1]-srcD[i+1]*f)
        B[i+2]=Math.max(0,B[i+2]-srcD[i+2]*f)
      } else {
        B[i]=srcD[i]>0?Math.min(255,B[i]/(srcD[i]/255)*f+B[i]*(1-f)):B[i]
        B[i+1]=srcD[i+1]>0?Math.min(255,B[i+1]/(srcD[i+1]/255)*f+B[i+1]*(1-f)):B[i+1]
        B[i+2]=srcD[i+2]>0?Math.min(255,B[i+2]/(srcD[i+2]/255)*f+B[i+2]*(1-f)):B[i+2]
      }
      // Alpha: preserve dest alpha — caller sets the matte explicitly
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
      var mv2=(mk.invert?1-v:v)*(mk.strength==null?1:mk.strength)*f
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
      blendCv(lctx,lCv,lyr.blendMode||"normal",lyr.opacity==null?100:lyr.opacity,w,h)
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
    if(n.outEfx&&n.outEfx.length>0) applyEfxStk(lctx,n.outEfx,cmap,cache,iC,w,h,new Set(vis))
    if(n.outMask&&n.outMask.length>0) maskToAlpha(lctx,n.outMask,cmap,cache,iC,w,h,new Set(vis))
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
  if(topC)blendCv(ctx2,topC,n.mode,n.amount,w,h)
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
  if(n.outEfx&&n.outEfx.length>0)applyEfxStk(ctx2,n.outEfx,cmap,cache,iC,w,h,new Set(vis))
  if(n.outMask&&n.outMask.length>0)maskToAlpha(ctx2,n.outMask,cmap,cache,iC,w,h,new Set(vis))
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
        } else if(mn.outMask&&mn.outMask.length===0){
          // No outMask defined — white (fully opaque default)
          em2=new Float32Array(w*h); for(var wi=0;wi<w*h;wi++) em2[wi]=1; emLabel="output (no mask = white)"
        }
        if(!em2&&mn.inputA&&mn.inputA.refId){
          var iaS=compAny(mn.inputA.refId,cmap,new Map(),iC,w,h,new Set())
          em2=effectiveMatte(iaS,mn.inputA.maskStack,cmap,new Map(),iC,w,h,new Set())
          emLabel="input A effective matte"
        }
        if(!em2&&mn.inputB&&mn.inputB.refId){
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
      <Sl l="rotation" v={p.rot} mn={0} mx={360} st={1} fmt={function(v){return Math.round(v)+"deg"}} fn={function(v){up(Object.assign({},p,{rot:v}))}}/>
      {s==="star" && (
        <div>
          <Sl l="points" v={p.pts} mn={3} mx={16} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{pts:v}))}}/>
          <Sl l="inner r" v={p.innerR} mn={.05} mx={.95} st={.01} fn={function(v){up(Object.assign({},p,{innerR:v}))}}/>
        </div>
      )}
      {s==="ring" && <Sl l="inner r" v={p.ringR} mn={.1} mx={.95} st={.01} fn={function(v){up(Object.assign({},p,{ringR:v}))}}/>}
      {s==="polygon" && <Sl l="sides" v={p.sides} mn={3} mx={14} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{sides:v}))}}/>}
      <Co l="fill" v={p.fill} fn={function(v){up(Object.assign({},p,{fill:v}))}}/>
      <Sl l="stroke w" v={p.strokeW} mn={0} mx={20} st={.5} fmt={function(v){return v.toFixed(1)}} fn={function(v){up(Object.assign({},p,{strokeW:v}))}}/>
      {p.strokeW>0 && <Co l="stroke" v={p.stroke} fn={function(v){up(Object.assign({},p,{stroke:v}))}}/>}
      <Sl l="alpha" v={p.alpha} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{alpha:v}))}}/>
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
      {/* Gradient preview */}
      <div style={{height:24,borderRadius:5,margin:"4px 0 8px",border:"1px solid var(--bd)",
        background:"linear-gradient(to right,"+previewStops+"),repeating-conic-gradient(#1a1a38 0deg 90deg,#121228 90deg 180deg) 0 0 / 10px 10px"}}/>
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
    </div>
  )
}
function NoiseP(props) {
  var p=props.p, up=props.up
  return (
    <div>
      <Se l="type" v={p.nType} opts={NTYPES} fn={function(v){up(Object.assign({},p,{nType:v}))}}/>
      <Co l="colour 1" v={p.c1} fn={function(v){up(Object.assign({},p,{c1:v}))}}/>
      <Co l="colour 2" v={p.c2} fn={function(v){up(Object.assign({},p,{c2:v}))}}/>
      <Sl l="scale" v={p.scale} mn={.005} mx={.4} st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up(Object.assign({},p,{scale:v}))}}/>
      {(p.nType==="perlin"||p.nType==="turbulent") && <Sl l="octaves" v={p.oct} mn={1} mx={8} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{oct:v}))}}/>}
      <Sl l="seed" v={p.seed} mn={0} mx={99} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{seed:v}))}}/>
      <Sl l="alpha" v={p.alpha} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{alpha:v}))}}/>
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
      <Sl l="scale" v={p.scale} mn={.01} mx={.5} st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up(Object.assign({},p,{scale:v}))}}/>
      {p.pType==="stripes" && (
        <div>
          <Sl l="width" v={p.sw} mn={.01} mx={.5} st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up(Object.assign({},p,{sw:v}))}}/>
          <Sl l="angle" v={p.angle} mn={0} mx={180} st={1} fmt={function(v){return Math.round(v)+"deg"}} fn={function(v){up(Object.assign({},p,{angle:v}))}}/>
        </div>
      )}
      {p.pType==="dots" && (
        <div>
          <Sl l="dot r" v={p.dr} mn={.005} mx={.2} st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up(Object.assign({},p,{dr:v}))}}/>
          <Sl l="spacing" v={p.ds} mn={.02} mx={.5} st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up(Object.assign({},p,{ds:v}))}}/>
        </div>
      )}
      <Sl l="alpha" v={p.alpha} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{alpha:v}))}}/>
    </div>
  )
}
function ImgP(props) {
  var p=props.p, up=props.up, onLoad=props.onLoad
  var fileRef=useRef(null)
  function loadBlob(file){
    if(!file)return
    var b=URL.createObjectURL(file)
    up(Object.assign({},p,{url:b}))
    onLoad(b)
  }
  return (
    <div>
      <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}}
        onChange={function(e){loadBlob(e.target.files&&e.target.files[0]);e.target.value=""}}/>
      <button className="ac" style={{width:"100%",marginBottom:10,minHeight:44}}
        onClick={function(){if(fileRef.current)fileRef.current.click()}}>
        + Load image from device
      </button>
      {p.url&&(
        <div style={{fontSize:10,color:"var(--ac)",marginBottom:10,textAlign:"center"}}>
          {p.url.startsWith("blob:")?"image loaded ✓":p.url.length>40?p.url.slice(0,40)+"…":p.url}
        </div>
      )}
      <Se l="fit" v={p.fit} opts={["contain","cover","fill"]} fn={function(v){up(Object.assign({},p,{fit:v}))}}/>
      <Sl l="alpha" v={p.alpha} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{alpha:v}))}}/>
    </div>
  )
}
function CreatorProps(props) {
  var node=props.node, onUpdate=props.onUpdate, onLoad=props.onLoad
  function up(p){onUpdate(Object.assign({},node,{props:p}))}
  var savedSt=useState(false); var savedMsg=savedSt[0], setSavedMsg=savedSt[1]
  var hasSt=useState(hasCreatorDefault(node.type)); var hasDef=hasSt[0], setHasDef=hasSt[1]
  function saveDefault(){
    if(saveCreatorDefault(node.type, node.props)){
      setSavedMsg("saved ✓"); setHasDef(true)
      setTimeout(function(){setSavedMsg(false)},1800)
    }
  }
  function resetDefault(){
    if(resetCreatorDefault(node.type)){
      setSavedMsg("cleared"); setHasDef(false)
      setTimeout(function(){setSavedMsg(false)},1800)
    }
  }
  return (
    <div style={{padding:"12px 12px 4px"}}>
      {node.type==="solid"    && <SolidP p={node.props} up={up}/>}
      {node.type==="shape"    && <ShapeP p={node.props} up={up}/>}
      {node.type==="gradient" && <GradP  p={node.props} up={up}/>}
      {node.type==="noise"    && <NoiseP p={node.props} up={up}/>}
      {node.type==="pattern"  && <PatP   p={node.props} up={up}/>}
      {node.type==="image"    && <ImgP   p={node.props} up={up} onLoad={onLoad}/>}
      {/* Save-as-default row */}
      <div style={{display:"flex",gap:6,marginTop:10,paddingTop:10,borderTop:"1px solid var(--bd)",alignItems:"center"}}>
        <button className="ghost" style={{flex:1,fontSize:10,padding:"6px 10px"}}
          onClick={saveDefault}
          title={"Make these "+node.type+" settings the default for new "+node.type+" nodes"}>
          save as default
        </button>
        {hasDef&&(
          <button className="ghost" style={{flex:1,fontSize:10,padding:"6px 10px",color:"var(--mu)"}}
            onClick={resetDefault}
            title="Remove custom default, revert to built-in">
            reset
          </button>
        )}
        {savedMsg&&(
          <span style={{fontSize:10,color:"var(--ac)",minWidth:52,textAlign:"right"}}>{savedMsg}</span>
        )}
      </div>
      {hasDef&&!savedMsg&&(
        <div style={{fontSize:9,color:"var(--mu)",marginTop:4,textAlign:"center"}}>
          custom defaults active for {node.type}
        </div>
      )}
    </div>
  )
}

/* ─── EFFECT PRIMARY PARAMS ──────────────────────────── */
/* ─── COLOUR MAP EDITOR ──────────────────────────────── */
function ColourMapEditor(props) {
  var p=props.p, up=props.up
  var stops=(p.stops||[]).slice().sort(function(a,b){return a.pos-b.pos})
  function setStops(ns){up({stops:ns})}
  function updStop(i,nw){var ns=stops.map(function(s,si){return si===i?Object.assign({},s,nw):s});setStops(ns)}
  function addStop(){
    var maxGap=0,insertAt=.5,afterColor="#808080",afterAlpha=100
    for(var i=0;i<stops.length-1;i++){
      var gap=stops[i+1].pos-stops[i].pos
      if(gap>maxGap){maxGap=gap;insertAt=stops[i].pos+gap/2
        var c1=stops[i].color,c2=stops[i+1].color
        function ph(h){var s=(h||"#000000").replace("#","");return [parseInt(s.slice(0,2),16)||0,parseInt(s.slice(2,4),16)||0,parseInt(s.slice(4,6),16)||0]}
        var r1=ph(c1),r2=ph(c2)
        var ri=Math.round((r1[0]+r2[0])/2),gi=Math.round((r1[1]+r2[1])/2),bi=Math.round((r1[2]+r2[2])/2)
        afterColor="#"+[ri,gi,bi].map(function(v){return v.toString(16).padStart(2,"0")}).join("")
        var a1=stops[i].alpha==null?100:stops[i].alpha, a2=stops[i+1].alpha==null?100:stops[i+1].alpha
        afterAlpha=Math.round((a1+a2)/2)
      }
    }
    setStops(stops.concat([{pos:insertAt,color:afterColor,alpha:afterAlpha}]))
  }
  function delStop(i){
    if(stops.length<=2)return
    setStops(stops.filter(function(_,si){return si!==i}))
  }
  function distribute(mode){
    var n=stops.length
    if(n<2)return
    var ns=stops.map(function(s,i){
      var t=i/(n-1)
      var pos=t
      if(mode==="even")         pos=t
      else if(mode==="expo")    pos=t*t
      else if(mode==="log")     pos=Math.sqrt(t)
      return Object.assign({},s,{pos:pos})
    })
    setStops(ns)
  }
  // Convert a hex + alpha (0..100) into an rgba() CSS string
  function rgbaStr(hex, alpha){
    var s=(hex||"#000000").replace("#","")
    if(s.length===3)s=s.split("").map(function(c){return c+c}).join("")
    var r=parseInt(s.slice(0,2),16)||0, g=parseInt(s.slice(2,4),16)||0, b=parseInt(s.slice(4,6),16)||0
    var a=(alpha==null?100:alpha)/100
    return "rgba("+r+","+g+","+b+","+a.toFixed(3)+")"
  }
  // CSS gradient — includes alpha, rendered on a checkered pattern for visibility
  var grad=(p.reverse?stops.slice().reverse().map(function(s){return Object.assign({},s,{pos:1-s.pos})}):stops)
    .map(function(s){return rgbaStr(s.color,s.alpha)+" "+(s.pos*100).toFixed(1)+"%"}).join(",")
  // Checkerboard background so transparency is visible
  var checker="repeating-conic-gradient(#242440 0deg 90deg, #181830 90deg 180deg) 0 0 / 12px 12px"
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {/* Gradient preview strip */}
      <div style={{height:32,borderRadius:6,border:"1px solid var(--bd)",
        background:"linear-gradient(to right,"+grad+"),"+checker}}/>
      {/* Stops list */}
      <div style={{display:"flex",flexDirection:"column",gap:6}}>
        <div style={{fontSize:9,color:"var(--mu)",textTransform:"uppercase",letterSpacing:".1em"}}>stops</div>
        {stops.map(function(s,i){
          var alphaVal=s.alpha==null?100:s.alpha
          return (
            <div key={i} style={{display:"flex",flexDirection:"column",gap:4,padding:"6px 8px",
              background:"rgba(20,20,44,.4)",border:"1px solid var(--bd)",borderRadius:6}}>
              {/* Row 1: colour swatch, position, delete */}
              <div style={{display:"flex",gap:6,alignItems:"center"}}>
                <input type="color" value={s.color}
                  onChange={function(e){updStop(i,{color:e.target.value})}}
                  style={{width:32,height:28,padding:0,border:"1px solid var(--bd)",borderRadius:4,background:"none",cursor:"pointer"}}/>
                <span style={{fontSize:9,color:"var(--mu)",minWidth:22}}>pos</span>
                <input type="range" min={0} max={1} step={0.001} value={s.pos}
                  onChange={function(e){updStop(i,{pos:parseFloat(e.target.value)})}}
                  style={{flex:1}}/>
                <span style={{fontSize:10,color:"var(--di)",minWidth:42,textAlign:"right"}}>
                  {(s.pos*100).toFixed(1)}%
                </span>
                <button onClick={function(){delStop(i)}} disabled={stops.length<=2}
                  style={{minHeight:28,padding:"0 8px",fontSize:12,color:stops.length<=2?"var(--mu)":"var(--dng)",
                  background:"none",border:"none",cursor:stops.length<=2?"default":"pointer"}}>×</button>
              </div>
              {/* Row 2: alpha */}
              <div style={{display:"flex",gap:6,alignItems:"center",paddingLeft:38}}>
                <span style={{fontSize:9,color:"var(--mu)",minWidth:22}}>α</span>
                <input type="range" min={0} max={100} step={1} value={alphaVal}
                  onChange={function(e){updStop(i,{alpha:parseInt(e.target.value)})}}
                  style={{flex:1}}/>
                <span style={{fontSize:10,color:"var(--di)",minWidth:42,textAlign:"right"}}>
                  {alphaVal}%
                </span>
              </div>
            </div>
          )
        })}
      </div>
      {/* Controls */}
      <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
        <button className="ac" style={{flex:"1 1 0",minWidth:90}} onClick={addStop}>+ stop</button>
        <button onClick={function(){up({reverse:!p.reverse})}}
          className={p.reverse?"ac":"ghost"}
          style={{flex:"1 1 0",minWidth:90}}>
          {p.reverse?"reversed":"reverse"}
        </button>
      </div>
      <div style={{display:"flex",gap:4,alignItems:"center",flexWrap:"wrap"}}>
        <span style={{fontSize:9,color:"var(--mu)",alignSelf:"center",marginRight:4}}>presets</span>
        <button className="ghost" style={{fontSize:10,padding:"4px 8px"}} title="2-stop duotone: edit shadow + highlight colours"
          onClick={function(){setStops([{pos:0,color:"#0a0a2a",alpha:100},{pos:1,color:"#f5e642",alpha:100}])}}>duotone</button>
        <button className="ghost" style={{fontSize:10,padding:"4px 8px"}} title="Classic B&W tonal map"
          onClick={function(){setStops([{pos:0,color:"#000000",alpha:100},{pos:1,color:"#ffffff",alpha:100}])}}>B&W</button>
        <button className="ghost" style={{fontSize:10,padding:"4px 8px"}} title="Heat map: black → red → yellow → white"
          onClick={function(){setStops([{pos:0,color:"#000000",alpha:100},{pos:.33,color:"#cc2200",alpha:100},{pos:.66,color:"#ffaa00",alpha:100},{pos:1,color:"#ffffff",alpha:100}])}}>heat</button>
      </div>
      <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
        <span style={{fontSize:9,color:"var(--mu)",alignSelf:"center",marginRight:4}}>distribute</span>
        <button className="ghost" style={{fontSize:10,padding:"4px 10px"}} onClick={function(){distribute("even")}}>even</button>
        <button className="ghost" style={{fontSize:10,padding:"4px 10px"}} onClick={function(){distribute("expo")}}>expo</button>
        <button className="ghost" style={{fontSize:10,padding:"4px 10px"}} onClick={function(){distribute("log")}}>log</button>
      </div>
    </div>
  )
}

function EfxPrimary(props) {
  var efx=props.efx, p=efx.params
  function up(np){props.onChange(Object.assign({},efx,{params:Object.assign({},p,np)}))}
  if(efx.type==="brightness") return <Sl l="value" v={p.value} mn={0} mx={300} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up({value:v})}}/>
  if(efx.type==="contrast")   return <Sl l="value" v={p.value} mn={0} mx={300} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up({value:v})}}/>
  if(efx.type==="blur")       return <Sl l="radius" v={p.radius} mn={0} mx={60} st={.5} fmt={function(v){return v.toFixed(1)+"px"}} fn={function(v){up({radius:v})}}/>
  if(efx.type==="invert")     return <Sl l="amount" v={p.amount} mn={0} mx={100} st={1} fmt={function(v){return Math.round(v)+"%"}} fn={function(v){up({amount:v})}}/>
  if(efx.type==="threshold")  return <Sl l="level" v={p.value} mn={0} mx={255} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up({value:v})}}/>
  if(efx.type==="hue-shift")  return <Sl l="angle" v={p.angle} mn={0} mx={360} st={1} fmt={function(v){return Math.round(v)+"deg"}} fn={function(v){up({angle:v})}}/>
  if(efx.type==="saturation") return <Sl l="amount" v={p.amount} mn={0} mx={300} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up({amount:v})}}/>
  if(efx.type==="vibrance")   return <Sl l="amount" v={p.amount==null?0:p.amount} mn={-100} mx={100} st={1} fmt={function(v){return (v>0?"+":"")+Math.round(v)}} fn={function(v){up({amount:v})}}/>
  if(efx.type==="posterize")  return <Sl l="levels" v={p.levels} mn={2} mx={16} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up({levels:v})}}/>
  if(efx.type==="exposure")   return <Sl l="stops" v={p.stops} mn={-3} mx={3} st={.1} fmt={function(v){return v.toFixed(1)+"EV"}} fn={function(v){up({stops:v})}}/>
  if(efx.type==="levels")     return <Sl l="gamma" v={p.gamma!=null?p.gamma:1} mn={.1} mx={4} st={.05} fmt={function(v){return v.toFixed(2)}} fn={function(v){up({gamma:v})}}/>
  if(efx.type==="curves") return (
    <div>
      <Sl l="in black"  v={p.inBlack||0}                    mn={0}   mx={254} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up({inBlack:v})}}/>
      <Sl l="in white"  v={p.inWhite==null?255:p.inWhite}   mn={1}   mx={255} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up({inWhite:v})}}/>
      <Sl l="out black" v={p.outBlack||0}                   mn={0}   mx={254} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up({outBlack:v})}}/>
      <Sl l="out white" v={p.outWhite==null?255:p.outWhite} mn={1}   mx={255} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up({outWhite:v})}}/>
      <Sl l="S-curve"   v={p.sCurve||0}                     mn={-100} mx={100} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up({sCurve:v})}}/>
    </div>
  )
  if(efx.type==="colour-map") return <ColourMapEditor efx={efx} p={p} up={up}/>
  if(efx.type==="sharpen") return (
    <Sl l="amount" v={p.amount==null?100:p.amount} mn={0} mx={500} st={1}
      fmt={function(v){return Math.round(v)+"%"}} fn={function(v){up({amount:v})}}/>
  )
  if(efx.type==="vignette") return (
    <div>
      <Sl l="strength" v={p.strength==null?80:p.strength} mn={0} mx={100} st={1}
        fmt={function(v){return Math.round(v)+"%"}} fn={function(v){up({strength:v})}}/>
      <Sl l="radius" v={p.radius==null?.65:p.radius} mn={0} mx={1} st={.01}
        fmt={function(v){return v.toFixed(2)}} fn={function(v){up({radius:v})}}/>
      <Sl l="softness" v={p.softness==null?.45:p.softness} mn={0.01} mx={1} st={.01}
        fmt={function(v){return v.toFixed(2)}} fn={function(v){up({softness:v})}}/>
      <PR l="colour">
        <input type="color" value={p.color||"#000000"}
          onChange={function(e){up({color:e.target.value})}}
          style={{width:44,height:32,padding:0,border:"1px solid var(--bd)",borderRadius:4,background:"none",cursor:"pointer"}}/>
        <span style={{fontSize:10,color:"var(--mu)",marginLeft:6}}>{p.color||"#000000"}</span>
      </PR>
    </div>
  )
  if(efx.type==="chromatic-ab") return (
    <div>
      <Sl l="distance" v={p.distance==null?6:p.distance} mn={0} mx={40} st={.5}
        fmt={function(v){return v.toFixed(1)+"px"}} fn={function(v){up({distance:v})}}/>
      <Sl l="angle" v={p.angle||0} mn={0} mx={360} st={1}
        fmt={function(v){return Math.round(v)+"deg"}} fn={function(v){up({angle:v})}}/>
    </div>
  )
  if(efx.type==="glow") return (
    <div>
      <Sl l="radius" v={p.radius==null?12:p.radius} mn={1} mx={60} st={1}
        fmt={function(v){return Math.round(v)+"px"}} fn={function(v){up({radius:v})}}/>
      <Sl l="strength" v={p.strength==null?60:p.strength} mn={0} mx={100} st={1}
        fmt={function(v){return Math.round(v)+"%"}} fn={function(v){up({strength:v})}}/>
      <Sl l="threshold" v={p.threshold==null?120:p.threshold} mn={0} mx={255} st={1}
        fmt={function(v){return Math.round(v)}} fn={function(v){up({threshold:v})}}/>
    </div>
  )
  if(efx.type==="emboss") return (
    <div>
      <Sl l="angle" v={p.angle==null?135:p.angle} mn={0} mx={360} st={1}
        fmt={function(v){return Math.round(v)+"deg"}} fn={function(v){up({angle:v})}}/>
      <Sl l="strength" v={p.strength==null?100:p.strength} mn={0} mx={400} st={1}
        fmt={function(v){return Math.round(v)+"%"}} fn={function(v){up({strength:v})}}/>
      <Sl l="midpoint" v={p.flat==null?128:p.flat} mn={0} mx={255} st={1}
        fmt={function(v){return Math.round(v)}} fn={function(v){up({flat:v})}}/>
    </div>
  )
  if(efx.type==="edge-detect") return (
    <div>
      <Sl l="strength" v={p.strength==null?100:p.strength} mn={0} mx={400} st={1}
        fmt={function(v){return Math.round(v)+"%"}} fn={function(v){up({strength:v})}}/>
      <PR l="invert">
        <button className={p.invert?"ac":"ghost"} style={{minHeight:32,padding:"0 14px"}}
          onClick={function(){up({invert:!p.invert})}}>
          {p.invert?"on":"off"}
        </button>
      </PR>
    </div>
  )
  if(efx.type==="pixelate") return (
    <Sl l="block size" v={p.size==null?8:p.size} mn={2} mx={64} st={1}
      fmt={function(v){return Math.round(v)+"px"}} fn={function(v){up({size:v})}}/>
  )
  if(efx.type==="duotone") return (
    <div>
      <PR l="shadows">
        <input type="color" value={p.shadow||"#0a0a2a"}
          onChange={function(e){up({shadow:e.target.value})}}
          style={{width:44,height:32,padding:0,border:"1px solid var(--bd)",borderRadius:4,background:"none",cursor:"pointer"}}/>
        <span style={{fontSize:10,color:"var(--mu)",marginLeft:6}}>{p.shadow||"#0a0a2a"}</span>
      </PR>
      <PR l="highlights">
        <input type="color" value={p.highlight||"#f5e642"}
          onChange={function(e){up({highlight:e.target.value})}}
          style={{width:44,height:32,padding:0,border:"1px solid var(--bd)",borderRadius:4,background:"none",cursor:"pointer"}}/>
        <span style={{fontSize:10,color:"var(--mu)",marginLeft:6}}>{p.highlight||"#f5e642"}</span>
      </PR>
    </div>
  )
  if(efx.type==="dir-blur") return (
    <div>
      <Sl l="angle" v={p.angle||0} mn={0} mx={360} st={1}
        fmt={function(v){return Math.round(v)+"deg"}}
        fn={function(v){up({angle:v})}}/>
      <Sl l="distance" v={p.distance==null?20:p.distance} mn={1} mx={200} st={1}
        fmt={function(v){return Math.round(v)+"px"}}
        fn={function(v){up({distance:v})}}/>
      <PR l="spread">
        {["both","forward","backward"].map(function(opt){
          return (
            <button key={opt}
              className={(p.spread||"both")===opt?"ac":"ghost"}
              style={{flex:1,fontSize:10,minHeight:32}}
              onClick={function(){up({spread:opt})}}>
              {opt}
            </button>
          )
        })}
      </PR>
    </div>
  )
  if(efx.type==="transform") return (
    <div>
      <Sl l="translate x" v={p.tx||0}  mn={-.5} mx={.5}   st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up({tx:v})}}/>
      <Sl l="translate y" v={p.ty||0}  mn={-.5} mx={.5}   st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up({ty:v})}}/>
      <Sl l="rotation"    v={p.rot||0} mn={-180} mx={180}  st={1}    fmt={function(v){return Math.round(v)+"deg"}} fn={function(v){up({rot:v})}}/>
      <Sl l="scale unif"  v={p.su!=null?p.su:1} mn={.05} mx={4} st={.01} fmt={function(v){return v.toFixed(2)+"x"}} fn={function(v){up({su:v})}}/>
      <Sl l="scale x"     v={p.sx!=null?p.sx:1} mn={.05} mx={4} st={.01} fmt={function(v){return v.toFixed(2)+"x"}} fn={function(v){up({sx:v})}}/>
      <Sl l="scale y"     v={p.sy!=null?p.sy:1} mn={.05} mx={4} st={.01} fmt={function(v){return v.toFixed(2)+"x"}} fn={function(v){up({sy:v})}}/>
      <Sl l="skew x"      v={p.skX||0} mn={-60} mx={60}   st={1}    fmt={function(v){return Math.round(v)+"deg"}} fn={function(v){up({skX:v})}}/>
      <Sl l="skew y"      v={p.skY||0} mn={-60} mx={60}   st={1}    fmt={function(v){return Math.round(v)+"deg"}} fn={function(v){up({skY:v})}}/>
    </div>
  )
  return <div className="empty">no parameters</div>
}

/* ─── MASK CARD ───────────────────────────────────────── */
/* ─── INLINE RENAME ────────────────────────────────────── */
// Small inline rename widget for effect/mask/stackref cards. Shows the label
// (custom name if set, else default label). Double-click/tap to rename.
// props: value (current name, may be empty), fallback (default label when no name),
//        onChange(newName), style, labelStyle
function InlineRename(props) {
  var edSt=useState(false); var ed=edSt[0], setEd=edSt[1]
  var nmSt=useState(props.value||""); var nm=nmSt[0], setNm=nmSt[1]
  var inR=useRef(null)
  useEffect(function(){setNm(props.value||"")},[props.value])
  useEffect(function(){if(ed&&inR.current){inR.current.focus();inR.current.select()}},[ed])
  function commit(){
    setEd(false)
    var t=nm.trim()
    if(t!==(props.value||""))props.onChange(t)
  }
  if(ed){
    return (
      <input ref={inR} value={nm}
        onChange={function(e){setNm(e.target.value)}}
        onBlur={commit}
        onKeyDown={function(e){
          if(e.key==="Enter")commit()
          if(e.key==="Escape"){setEd(false);setNm(props.value||"")}
        }}
        onClick={function(e){e.stopPropagation()}}
        placeholder={props.fallback}
        style={Object.assign({flex:1,minWidth:0,fontSize:12,padding:"2px 6px",
          background:"var(--bg)",border:"1px solid var(--ac)",borderRadius:4,
          color:"var(--tx)",fontFamily:"'IBM Plex Mono',monospace"},props.style||{})}/>
    )
  }
  return (
    <span onDoubleClick={function(e){e.stopPropagation();setEd(true)}}
      title="Double-tap to rename"
      style={Object.assign({flex:1,minWidth:0,cursor:"text",userSelect:"none",
        overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},props.labelStyle||{})}>
      {props.value && props.value.trim() ? props.value : props.fallback}
    </span>
  )
}

function MaskCard(props) {
  // Defensive copy — backfill missing fields
  var mk=Object.assign({
    refId:null, channel:"luminosity", invert:false, strength:1, opacity:100,
    blendMode:"multiply", effectStack:[], enabled:true, name:""
  }, props.mask||{})
  var tabSt=useState("source"); var tab=tabSt[0], setTab=tabSt[1]
  var armSt=useState(false); var armed=armSt[0], setArmed=armSt[1]
  var timerRef=useRef(null)
  useEffect(function(){return function(){if(timerRef.current)clearTimeout(timerRef.current)}},[])
  function handleDel(){
    if(!armed){setArmed(true);timerRef.current=setTimeout(function(){setArmed(false)},3000)}
    else{clearTimeout(timerRef.current);setArmed(false);props.onDel()}
  }
  var nEfx=(mk.effectStack||[]).length
  var tabs=[
    {id:"source", label:"Source"},
    {id:"layer",  label:"Layer"},
    {id:"effects",label:"Effects"+(nEfx>0?" ("+nEfx+")":""),color:"ac"},
  ]
  return (
    <div className="card" style={{marginBottom:10,border:"1px solid rgba(176,96,240,.25)"}}>
      {/* Header — matches EfxCard layout */}
      <div className="card-hdr" style={{background:"rgba(176,96,240,.06)"}}>
        <div style={{display:"flex",flexDirection:"column",flexShrink:0}}>
          {props.onMove&&<button className="icon-btn sm" onClick={function(){props.onMove(-1)}} disabled={props.isFirst} style={{fontSize:11,height:20,width:28}}>▲</button>}
          {props.onMove&&<button className="icon-btn sm" onClick={function(){props.onMove(1)}}  disabled={props.isLast}  style={{fontSize:11,height:20,width:28}}>▼</button>}
        </div>
        <button className="icon-btn sm" onClick={function(){props.onChange(Object.assign({},mk,{enabled:mk.enabled===false}))}}
          style={{color:mk.enabled===false?"var(--mu)":"var(--lv)",fontSize:18}}>
          {mk.enabled===false?"○":"●"}
        </button>
        <InlineRename value={mk.name} fallback={mk.channel||"luminosity"}
          onChange={function(nw){props.onChange(Object.assign({},mk,{name:nw}))}}
          labelStyle={{fontSize:12,color:mk.enabled===false?"var(--mu)":"var(--lv)",
            fontFamily:"'IBM Plex Mono',monospace",fontWeight:500,padding:"2px 0"}}/>
        {props.onPromote&&(function(){
          var taps=(props.nodes||[]).filter(function(pn){
            return pn.type==="promoted"&&pn.tapPath&&pn.tapPath.afterId===mk.id
          })
          var isTapped=taps.length>0
          var mTapSt=useState(false); var mTapPop=mTapSt[0], setMTapPop=mTapSt[1]
          var mTapRef=useRef(null), mMenuRef=useRef(null)
          var mTapPos=usePopoverPosition(mTapRef,mTapPop,"above")
          useEffect(function(){
            if(!mTapPop) return
            function h(e){
              if(mTapRef.current&&mTapRef.current.contains(e.target))return
              if(mMenuRef.current&&mMenuRef.current.contains(e.target))return
              setMTapPop(false)
            }
            document.addEventListener("mousedown",h)
            return function(){document.removeEventListener("mousedown",h)}
          },[mTapPop])
          return (
            <div style={{position:"relative",display:"inline-flex"}}>
              <button ref={mTapRef}
                className={"promote-btn"+(isTapped?" tapped":"")}
                onClick={function(){isTapped?setMTapPop(!mTapPop):props.onPromote()}}
                title={isTapped?"Tapped — click to see references":"Promote mask tap point"}>
                {isTapped?"● tapped":"↗ tap"}
              </button>
              {isTapped&&!mTapPop&&<span style={{position:"absolute",bottom:-2,right:-2,width:6,height:6,borderRadius:"50%",background:"var(--ac)"}}/>}
              {mTapPop&&mTapPos&&createPortal(
                <div ref={mMenuRef} style={Object.assign({},mTapPos,{
                  position:"fixed",zIndex:9100,background:"var(--pn)",
                  border:"1px solid var(--bd)",borderRadius:10,
                  boxShadow:"0 -6px 24px rgba(0,0,0,.7)",minWidth:180,padding:"8px 0"})}>
                  <div style={{fontSize:8,color:"var(--mu)",textTransform:"uppercase",letterSpacing:".1em",
                    padding:"2px 12px 6px",fontFamily:"'IBM Plex Mono',monospace"}}>Promoted taps</div>
                  {taps.map(function(tap){
                    var refs=(props.nodes||[]).filter(function(rn){
                      return rn.id!==tap.id&&JSON.stringify(rn).indexOf(tap.id)>=0
                    })
                    return (
                      <div key={tap.id}>
                        <div onClick={function(){setMTapPop(false);props.onNavigate&&props.onNavigate(tap.id)}}
                          style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",cursor:"pointer",
                            color:"var(--ac)",fontSize:11,fontFamily:"'IBM Plex Mono',monospace"}}
                          className="drop-item">
                          ◈ {tap.name}
                        </div>
                        {refs.map(function(ref){
                          return (
                            <div key={ref.id} onClick={function(){setMTapPop(false);props.onNavigate&&props.onNavigate(ref.id)}}
                              style={{display:"flex",alignItems:"center",gap:8,padding:"4px 14px 4px 28px",
                                cursor:"pointer",color:"var(--di)",fontSize:10}}
                              className="drop-item">
                              ↳ {ref.name||ref.type}
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>,
                document.body
              )}
            </div>
          )
        })()}
        <button onClick={handleDel} style={{minHeight:32,padding:"0 10px",fontSize:armed?10:14,
          background:armed?"rgba(224,48,96,.2)":"none",border:armed?"1px solid var(--dng)":"none",
          color:armed?"var(--dng)":"var(--mu)",borderRadius:6,minWidth:armed?70:32}}>
          {armed?"confirm ×":"×"}
        </button>
      </div>
      <TabBar tabs={tabs} active={tab} onChange={setTab}/>
      {tab==="source" && (
        <div className="card-body">
          {!mk.refId && (
            <div style={{fontSize:9,color:"#e0a060",background:"rgba(224,160,96,.1)",
              border:"1px solid rgba(224,160,96,.25)",borderRadius:4,padding:"4px 8px",marginBottom:8}}>
              ⚠ no source — mask inactive until a source is selected
            </div>
          )}
          <NRef l="source" v={mk.refId} nodes={props.nodes} selfId={props.selfId}
            iC={props.iC} mode="source" asMask={true}
            siblingEffects={props.siblingEffects} ownerNodeId={props.ownerNodeId}
            fn={function(v){props.onChange(Object.assign({},mk,{refId:v}))}}/>
          <Se l="channel" v={mk.channel}
            opts={MCH}
            fn={function(v){props.onChange(Object.assign({},mk,{channel:v}))}}/>
          <Sl l="strength" v={mk.strength} mn={0} mx={1} st={.01}
            fmt={function(v){return Math.round(v*100)+"%"}}
            fn={function(v){props.onChange(Object.assign({},mk,{strength:v}))}}/>
          <PR l="invert">
            <button className="icon-btn sm"
              onClick={function(){props.onChange(Object.assign({},mk,{invert:!mk.invert}))}}
              style={{color:mk.invert?"var(--ac)":"var(--mu)",fontSize:18,width:32,height:32}}>
              {mk.invert?"●":"○"}
            </button>
            <span style={{fontSize:10,color:mk.invert?"var(--ac)":"var(--mu)",marginLeft:4}}>
              {mk.invert?"inverted":"normal"}
            </span>
          </PR>
        </div>
      )}
      {tab==="layer" && (
        <div className="card-body">
          <Se l="blend" v={mk.blendMode} opts={MBMS}
            fn={function(v){props.onChange(Object.assign({},mk,{blendMode:v}))}}/>
          <Sl l="opacity" v={mk.opacity} mn={0} mx={100} st={1}
            fmt={function(v){return Math.round(v)+"%"}}
            fn={function(v){props.onChange(Object.assign({},mk,{opacity:v}))}}/>
        </div>
      )}
      {tab==="effects" && (
        <div className="card-body" style={{paddingTop:8}}>
          {nEfx===0 && <div className="empty" style={{padding:"6px 0 10px"}}>no effects on this mask</div>}
          {props.onEditEffects && (
            <button className="ac" style={{width:"100%",marginTop:nEfx===0?0:4}} onClick={props.onEditEffects}>
              {nEfx>0?"edit effects ("+nEfx+") →":"+ add effects →"}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

/* ─── STACK REF CARD ─────────────────────────────────────── */
// Renders a __stackref__ item in an effect or mask stack.
// Same controls as any other stack item: ▲▼ reorder, ●/○ enable, armed delete.
// No Primary/Layer/Mask tabs — the referenced Stack has its own editing panel.
function StackRefCard(props) {
  var item = props.item
  var refNode = props.nodes.find(function(n){ return n.id===item.stackRefId })
  var armSt=useState(false); var armed=armSt[0], setArmed=armSt[1]
  // stackType derived from refNode if present, else from item.stackType hint
  var stype = (refNode && refNode.stackType) || props.stackType || "effect"
  var matchingStacks = (props.nodes||[]).filter(function(n){
    return n.type==="stack" && n.stackType===stype
  })
  var timerRef=useRef(null)
  useEffect(function(){return function(){if(timerRef.current)clearTimeout(timerRef.current)}},[])
  function handleDel(){
    if(!armed){setArmed(true);timerRef.current=setTimeout(function(){setArmed(false)},3000)}
    else{clearTimeout(timerRef.current);setArmed(false);props.onDel()}
  }
  var isMask = refNode && refNode.stackType==="mask"
  var accent = isMask ? "var(--lv)" : "var(--ac)"
  var accentBg = isMask ? "rgba(176,96,240,.08)" : "rgba(36,204,168,.08)"
  return (
    <div className="card" style={{marginBottom:10,border:isMask?"1px solid rgba(176,96,240,.3)":"1px solid rgba(36,204,168,.28)"}}>
      <div className="card-hdr" style={{background:accentBg,flexWrap:"wrap"}}>
        <div style={{display:"flex",flexDirection:"column",flexShrink:0}}>
          <button className="icon-btn sm" onClick={function(){props.onMove(-1)}} disabled={props.isFirst} style={{fontSize:11,height:20,width:28}}>▲</button>
          <button className="icon-btn sm" onClick={function(){props.onMove(1)}}  disabled={props.isLast}  style={{fontSize:11,height:20,width:28}}>▼</button>
        </div>
        <button className="icon-btn sm" onClick={function(){props.onChange(Object.assign({},item,{enabled:!item.enabled}))}}
          style={{color:item.enabled?accent:"var(--mu)",fontSize:18}}>
          {item.enabled?"●":"○"}
        </button>
        <button onClick={function(){
          if(props.onNavigate&&item.stackRefId)props.onNavigate(item.stackRefId)
        }} disabled={!refNode||!props.onNavigate}
          title={refNode?"Open "+refNode.name:""}
          style={{fontSize:9,padding:"2px 7px",borderRadius:4,background:accentBg,
            color:accent,border:"1px solid "+accent,flexShrink:0,marginRight:4,
            cursor:refNode&&props.onNavigate?"pointer":"default",
            fontFamily:"'IBM Plex Mono',monospace",textTransform:"none",letterSpacing:0,
            minHeight:0,lineHeight:1.4}}>
          {isMask?"mask":"effect"} stack ↗
        </button>
        <InlineRename value={item.name} fallback={refNode?refNode.name:(isMask?"mask ref":"effect ref")}
          onChange={function(nw){props.onChange(Object.assign({},item,{name:nw}))}}
          labelStyle={{fontSize:11,color:item.enabled?accent:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",padding:"2px 0"}}/>
        <button onClick={handleDel} style={{minHeight:32,padding:"0 10px",
          fontSize:armed?10:14,background:armed?"rgba(224,48,96,.2)":"none",
          border:armed?"1px solid var(--dng)":"none",
          color:armed?"var(--dng)":"var(--mu)",borderRadius:6,minWidth:armed?70:32}}>
          {armed?"confirm ×":"×"}
        </button>
      </div>
      {/* Reference selector below header */}
      <div style={{padding:"6px 10px",borderBottom:"1px solid var(--bd)",display:"flex",gap:8,alignItems:"center"}}>
        <span style={{fontSize:9,color:"var(--mu)",textTransform:"uppercase",letterSpacing:".08em",flexShrink:0}}>refs</span>
        <select value={item.stackRefId||""}
          onChange={function(e){props.onChange(Object.assign({},item,{stackRefId:e.target.value||null}))}}
          style={{flex:1,fontSize:11,padding:"3px 4px",
            background:"var(--bg)",border:"1px solid var(--bd)",borderRadius:4,
            color:item.enabled?accent:"var(--mu)",
            fontFamily:"'IBM Plex Mono',monospace",cursor:"pointer"}}>
          <option value="">— select stack —</option>
          {matchingStacks.map(function(n){return <option key={n.id} value={n.id}>{n.name}</option>})}
        </select>
      </div>
        {/* Opacity + blend mode row */}
      <div style={{padding:"8px 12px",borderTop:"1px solid var(--bd)",display:"flex",gap:8,alignItems:"center"}}>
        <select value={item.blendMode||"normal"}
          onChange={function(e){props.onChange(Object.assign({},item,{blendMode:e.target.value}))}}
          style={{flex:1,fontSize:10,padding:"3px 4px"}}>
          {(isMask?MBMS:EBMS).map(function(m){return <option key={m}>{m}</option>})}
        </select>
        <input type="range" min={0} max={100} step={1}
          value={item.opacity!=null?item.opacity:100}
          onChange={function(e){props.onChange(Object.assign({},item,{opacity:+e.target.value}))}}
          style={{flex:1}}/>
        <span style={{fontSize:10,color:"var(--di)",minWidth:30,textAlign:"right",flexShrink:0}}>
          {Math.round(item.opacity!=null?item.opacity:100)}%
        </span>
      </div>

    </div>
  )
}

/* ─── EFFECT CARD ─────────────────────────────────────── */
function EfxCard(props) {
  var efx=props.efx
  var tabSt=useState("primary"); var tab=tabSt[0], setTab=tabSt[1]
  var armedSt=useState(false); var armed=armedSt[0], setArmed=armedSt[1]
  var timerRef=useRef(null)
  // Swap state machine: null | "picking" | {type, keepMask, keepLayer}
  var swapSt=useState(null); var swap=swapSt[0], setSwap=swapSt[1]
  var swapAnchorRef=useRef(null)
  var swapMenuRef=useRef(null)
  var swapPos=usePopoverPosition(swapAnchorRef, swap==="picking", "above")
  useEffect(function(){return function(){if(timerRef.current)clearTimeout(timerRef.current)}},[])
  useEffect(function(){
    if(swap!=="picking") return
    function h(e){
      if(swapAnchorRef.current&&swapAnchorRef.current.contains(e.target)) return
      if(swapMenuRef.current&&swapMenuRef.current.contains(e.target)) return
      setSwap(null)
    }
    document.addEventListener("mousedown",h)
    return function(){document.removeEventListener("mousedown",h)}
  },[swap])
  function handleDel(){
    if(!armed){setArmed(true);timerRef.current=setTimeout(function(){setArmed(false)},3000)}
    else{clearTimeout(timerRef.current);setArmed(false);props.onDel()}
  }
  var nMasks=(efx.maskStack||[]).length
  var hasNonDefaultLayer=(efx.opacity!==100||efx.blendMode!=="normal")
  function pickType(t){
    if(t===efx.type){setSwap(null);return}
    // Skip confirm step entirely when there's nothing to carry over
    if(nMasks===0&&!hasNonDefaultLayer){
      var fresh=mkEfx(t)
      props.onChange(Object.assign({},fresh,{id:efx.id,name:efx.name,enabled:efx.enabled,maskStack:[],opacity:100,blendMode:"normal"}))
      setSwap(null)
    } else {
      setSwap({type:t, keepMask:true, keepLayer:true})
    }
  }
  function confirmSwap(){
    var s=swap; if(!s||!s.type) return
    var fresh=mkEfx(s.type)
    var next=Object.assign({},fresh,{
      id:efx.id,                               // keep same id so list key stable
      name:efx.name,                           // keep user's custom name
      enabled:efx.enabled,
      maskStack: s.keepMask  ? efx.maskStack  : [],
      opacity:   s.keepLayer ? efx.opacity    : 100,
      blendMode: s.keepLayer ? efx.blendMode  : "normal",
    })
    props.onChange(next)
    setSwap(null)
  }
  var tabs=[
    {id:"primary",label:"Primary"},
    {id:"layer",  label:"Layer"},
    {id:"mask",   label:"Mask"+(nMasks>0?" ("+nMasks+")":""),color:"lv"},
  ]
  // Confirm-swap overlay rendered inside the card body
  if(swap&&swap!=="picking") return (
    <div className="card" style={{marginBottom:10,border:"1px solid var(--ac)"}}>
      <div className="card-hdr" style={{background:"rgba(36,204,168,.06)"}}>
        <span style={{fontSize:11,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace"}}>
          {efx.type}
        </span>
        <span style={{fontSize:12,color:"var(--mu)",padding:"0 6px"}}>→</span>
        <span style={{flex:1,fontSize:12,color:"var(--ac)",fontFamily:"'IBM Plex Mono',monospace",fontWeight:600}}>
          {swap.type}
        </span>
        <button className="ghost" style={{fontSize:12,padding:"0 8px",minHeight:32}} onClick={function(){setSwap(null)}}>cancel</button>
      </div>
      <div style={{padding:"10px 12px",display:"flex",flexDirection:"column",gap:10}}>
        <div style={{fontSize:11,color:"var(--di)"}}>What to carry over from the current effect?</div>
        {/* Retain mask stack option — only shown when masks exist */}
        {nMasks>0 && (
          <button
            onClick={function(){setSwap(Object.assign({},swap,{keepMask:!swap.keepMask}))}}
            style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",
              background:swap.keepMask?"var(--sl)":"var(--sf)",border:"1px solid "+(swap.keepMask?"var(--lv)":"var(--bd)"),
              borderRadius:6,cursor:"pointer",textAlign:"left"}}>
            <span style={{fontSize:16,color:swap.keepMask?"var(--lv)":"var(--mu)"}}>
              {swap.keepMask?"◈":"○"}
            </span>
            <div>
              <div style={{fontSize:11,color:swap.keepMask?"var(--tx)":"var(--mu)",fontWeight:swap.keepMask?600:400}}>
                retain mask stack
              </div>
              <div style={{fontSize:9,color:"var(--mu)"}}>
                {nMasks} mask{nMasks!==1?"s":""} · {swap.keepMask?"will be kept":"will be cleared"}
              </div>
            </div>
          </button>
        )}
        {/* Retain layer settings option — only shown when non-default */}
        {hasNonDefaultLayer && (
          <button
            onClick={function(){setSwap(Object.assign({},swap,{keepLayer:!swap.keepLayer}))}}
            style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",
              background:swap.keepLayer?"var(--sl)":"var(--sf)",border:"1px solid "+(swap.keepLayer?"var(--ac)":"var(--bd)"),
              borderRadius:6,cursor:"pointer",textAlign:"left"}}>
            <span style={{fontSize:16,color:swap.keepLayer?"var(--ac)":"var(--mu)"}}>
              {swap.keepLayer?"●":"○"}
            </span>
            <div>
              <div style={{fontSize:11,color:swap.keepLayer?"var(--tx)":"var(--mu)",fontWeight:swap.keepLayer?600:400}}>
                retain layer settings
              </div>
              <div style={{fontSize:9,color:"var(--mu)"}}>
                opacity {Math.round(efx.opacity)}% · {efx.blendMode} · {swap.keepLayer?"will be kept":"will reset to defaults"}
              </div>
            </div>
          </button>
        )}
        {/* No non-default settings to carry over */}
        {nMasks===0&&!hasNonDefaultLayer&&(
          <div style={{fontSize:11,color:"var(--mu)",padding:"4px 0"}}>
            No custom masks or layer settings to carry over.
          </div>
        )}
        <button className="ac" style={{width:"100%",minHeight:40}} onClick={confirmSwap}>
          apply {swap.type}
        </button>
      </div>
    </div>
  )
  return (
    <div className="card" style={{marginBottom:10}}>
      <div className="card-hdr">
        <div style={{display:"flex",flexDirection:"column",flexShrink:0}}>
          <button className="icon-btn sm" onClick={function(){props.onMove(-1)}} disabled={props.isFirst} style={{fontSize:11,height:20,width:28}}>▲</button>
          <button className="icon-btn sm" onClick={function(){props.onMove(1)}}  disabled={props.isLast}  style={{fontSize:11,height:20,width:28}}>▼</button>
        </div>
        <button className="icon-btn sm" onClick={function(){props.onChange(Object.assign({},efx,{enabled:!efx.enabled}))}} style={{color:efx.enabled?"var(--ac)":"var(--mu)",fontSize:18}}>
          {efx.enabled?"●":"○"}
        </button>
        {/* Type button — tap to open effect-swap picker */}
        <button ref={swapAnchorRef} onClick={function(){setSwap(swap==="picking"?null:"picking")}}
          title="Tap to swap effect type"
          style={{fontSize:12,padding:"0 8px",minHeight:32,fontFamily:"'IBM Plex Mono',monospace",
            fontWeight:500,color:efx.enabled?"var(--tx)":"var(--mu)",
            background:"none",border:"none",cursor:"pointer",flexShrink:0,
            textDecoration:"underline dotted",textUnderlineOffset:3}}>
          {efx.type}
        </button>
        {/* Custom name (separate from type) */}
        <InlineRename value={efx.name} fallback=""
          onChange={function(nw){props.onChange(Object.assign({},efx,{name:nw}))}}
          labelStyle={{fontSize:11,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",fontStyle:"italic",padding:"2px 0"}}/>
        {/* Effect-swap picker portal */}
        {swap==="picking"&&swapPos&&createPortal(
          <div ref={swapMenuRef} className="eff-menu" style={swapPos}>
            {EFX_GROUPS.map(function(grp){return (
              <div key={grp.label}>
                <div className="drop-grp">{grp.label}</div>
                {grp.items.map(function(t){return (
                  <div key={t} className={"drop-item"+(t===efx.type?" sel":"")}
                    onClick={function(){pickType(t)}}
                    style={t===efx.type?{color:"var(--ac)"}:{}}>
                    {t}{t===efx.type?" ✓":""}
                  </div>
                )})}
              </div>
            )})}
          </div>,
          document.body
        )}
        {props.onPromote&&(function(){
          // Find any promoted nodes that tap this exact effect
          var taps=(props.nodes||[]).filter(function(pn){
            return pn.type==="promoted"&&pn.tapPath&&pn.tapPath.afterId===efx.id
          })
          var isTapped=taps.length>0
          var tapBtnSt=useState(false); var tapPop=tapBtnSt[0], setTapPop=tapBtnSt[1]
          var tapAnchorRef=useRef(null)
          var tapMenuRef=useRef(null)
          useEffect(function(){
            if(!tapPop) return
            function h(e){
              if(tapAnchorRef.current&&tapAnchorRef.current.contains(e.target))return
              if(tapMenuRef.current&&tapMenuRef.current.contains(e.target))return
              setTapPop(false)
            }
            document.addEventListener("mousedown",h)
            return function(){document.removeEventListener("mousedown",h)}
          },[tapPop])
          var tapPos=usePopoverPosition(tapAnchorRef,tapPop,"above")
          return (
            <div style={{position:"relative",display:"inline-flex"}}>
              <button ref={tapAnchorRef}
                className={"promote-btn"+(isTapped?" tapped":"")}
                onClick={function(e){
                  e.stopPropagation()
                  if(isTapped) setTapPop(!tapPop)
                  else props.onPromote()
                }}
                title={isTapped?"Tapped — click to see references":"Promote: capture pipeline state here"}>
                {isTapped?"● tapped":"↗ tap"}
              </button>
              {isTapped&&!tapPop&&<span style={{position:"absolute",bottom:-2,right:-2,width:6,height:6,borderRadius:"50%",background:"var(--ac)"}}/>}
              {tapPop&&tapPos&&createPortal(
                <div ref={tapMenuRef} style={Object.assign({},tapPos,{
                  position:"fixed",zIndex:9100,background:"var(--pn)",
                  border:"1px solid var(--bd)",borderRadius:10,
                  boxShadow:"0 -6px 24px rgba(0,0,0,.7)",minWidth:180,padding:"8px 0"})}>
                  <div style={{fontSize:8,color:"var(--mu)",textTransform:"uppercase",letterSpacing:".1em",
                    padding:"2px 12px 6px",fontFamily:"'IBM Plex Mono',monospace"}}>Promoted taps</div>
                  {taps.map(function(tap){
                    // Find nodes that reference this tap as a source
                    var refs=(props.nodes||[]).filter(function(rn){
                      if(rn.id===tap.id) return false
                      var str=JSON.stringify(rn)
                      return str.indexOf(tap.id)>=0
                    })
                    return (
                      <div key={tap.id}>
                        <div onClick={function(){setTapPop(false);props.onNavigate&&props.onNavigate(tap.id)}}
                          style={{display:"flex",alignItems:"center",gap:8,padding:"8px 14px",cursor:"pointer",
                            color:"var(--ac)",fontSize:11,fontFamily:"'IBM Plex Mono',monospace"}}
                          className="drop-item">
                          ◈ {tap.name}
                        </div>
                        {refs.length>0&&refs.map(function(ref){
                          return (
                            <div key={ref.id} onClick={function(){setTapPop(false);props.onNavigate&&props.onNavigate(ref.id)}}
                              style={{display:"flex",alignItems:"center",gap:8,padding:"4px 14px 4px 28px",
                                cursor:"pointer",color:"var(--di)",fontSize:10}}
                              className="drop-item">
                              ↳ {ref.name||ref.type}
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>,
                document.body
              )}
            </div>
          )
        })()}
        <button onClick={handleDel} style={{minHeight:32,padding:"0 10px",fontSize:armed?10:14,background:armed?"rgba(224,48,96,.2)":"none",border:armed?"1px solid var(--dng)":"none",color:armed?"var(--dng)":"var(--mu)",borderRadius:6,minWidth:armed?70:32}}>
          {armed?"confirm x":"x"}
        </button>
      </div>
      <TabBar tabs={tabs} active={tab} onChange={setTab}/>
      {tab==="primary" && (
        <div className="card-body">
          <EfxPrimary efx={efx} onChange={props.onChange}/>
        </div>
      )}
      {tab==="layer" && (
        <div className="card-body">
          <Sl l="opacity" v={efx.opacity} mn={0} mx={100} st={1} fmt={function(v){return Math.round(v)+"%"}} fn={function(v){props.onChange(Object.assign({},efx,{opacity:v}))}}/>
          <Se l="blend" v={efx.blendMode||"normal"} opts={EBMS} fn={function(v){props.onChange(Object.assign({},efx,{blendMode:v}))}}/>
        </div>
      )}
      {tab==="mask" && (
        <div className="card-body" style={{paddingTop:8}}>
          {nMasks===0 && <div className="empty" style={{padding:"6px 0 10px"}}>no masks on this effect</div>}
          {(efx.maskStack||[]).map(function(mk,mi){
            return (
              <MaskCard key={mk.id} mask={mk} nodes={props.nodes} selfId={props.selfId} iC={props.iC}
                siblingEffects={props.siblingEffects} ownerNodeId={props.ownerNodeId}
                isFirst={mi===0} isLast={mi===(efx.maskStack||[]).length-1}
                onMove={function(dir){
                  var ms=(efx.maskStack||[]).slice()
                  var ni=Math.max(0,Math.min(ms.length-1,mi+dir))
                  if(ni===mi) return
                  var tmp=ms[mi]; ms[mi]=ms[ni]; ms[ni]=tmp
                  props.onChange(Object.assign({},efx,{maskStack:ms}))
                }}
                onChange={function(nw){
                  var ms=(efx.maskStack||[]).map(function(x,xi){return xi===mi?nw:x})
                  props.onChange(Object.assign({},efx,{maskStack:ms}))
                }}
                onDel={function(){
                  var ms=(efx.maskStack||[]).filter(function(_,xi){return xi!==mi})
                  props.onChange(Object.assign({},efx,{maskStack:ms}))
                }}
                onEditEffects={function(){props.onDrillMask(mi)}}
              />
            )
          })}
          <button className="lv" style={{width:"100%",marginTop:4}} onClick={function(){
            var ms=[mkMask()].concat(efx.maskStack||[])
            props.onChange(Object.assign({},efx,{maskStack:ms}))
          }}>+ add mask</button>
        </div>
      )}
    </div>
  )
}

/* ─── ADD EFFECT MENU ─────────────────────────────────── */
var EFX_GROUPS=[
  {label:"Tonal",    items:["brightness","contrast","exposure","levels","curves","posterize"]},
  {label:"Colour",   items:["hue-shift","saturation","vibrance","colour-map"]},
  {label:"Pixel",    items:["blur","dir-blur","sharpen","invert","threshold","pixelate","vignette","chromatic-ab","glow","emboss","edge-detect"]},
  {label:"Transform",items:["transform"]},
]
// Hook: compute a fixed-position rect for a popover relative to an anchor ref.
// placement: "above" or "below" — menu opens above or below the anchor, whichever fits.
// Returns a style object suitable for inline style.
function usePopoverPosition(anchorRef, open, placement) {
  var posSt=useState(null); var pos=posSt[0], setPos=posSt[1]
  useEffect(function(){
    if(!open||!anchorRef.current){setPos(null);return}
    function recalc(){
      var el=anchorRef.current; if(!el)return
      var r=el.getBoundingClientRect()
      var vh=window.innerHeight, vw=window.innerWidth
      var prefAbove = placement==="above"
      var spaceBelow=vh-r.bottom, spaceAbove=r.top
      var above = prefAbove ? (spaceAbove>=180 || spaceAbove>spaceBelow) : (spaceBelow<180 && spaceAbove>spaceBelow)
      var width=Math.max(r.width, 180)
      var left=Math.min(r.left, vw-width-8)
      left=Math.max(8,left)
      if(above) setPos({left:left, bottom:(vh-r.top+4), width:width, maxHeight:(spaceAbove-12)+"px"})
      else      setPos({left:left, top:(r.bottom+4), width:width, maxHeight:(spaceBelow-12)+"px"})
    }
    recalc()
    window.addEventListener("resize",recalc)
    window.addEventListener("scroll",recalc,true)
    return function(){
      window.removeEventListener("resize",recalc)
      window.removeEventListener("scroll",recalc,true)
    }
  },[open])
  return pos
}

function AddEfxMenu(props) {
  var openSt=useState(false); var open=openSt[0], setOpen=openSt[1]
  var anchorRef=useRef(null)
  var menuRef=useRef(null)
  var pos=usePopoverPosition(anchorRef, open, "above")
  useEffect(function(){
    if(!open)return
    function h(e){
      if(anchorRef.current&&anchorRef.current.contains(e.target))return
      if(menuRef.current&&menuRef.current.contains(e.target))return
      setOpen(false)
    }
    document.addEventListener("mousedown",h)
    return function(){document.removeEventListener("mousedown",h)}
  },[open])
  return (
    <div ref={anchorRef} style={{position:"relative",flex:2,minWidth:0}}>
      <button className="ac" style={{width:"100%",height:"100%"}} onClick={function(){setOpen(!open)}}>+ effect</button>
      {open&&pos&&createPortal(
        <div ref={menuRef} className="eff-menu" style={pos}>
          {EFX_GROUPS.map(function(grp){
            return (
              <div key={grp.label}>
                <div className="drop-grp">{grp.label}</div>
                {grp.items.map(function(t){
                  return (
                    <div key={t} className="drop-item" onClick={function(){props.onAdd(t);setOpen(false)}}>{t}</div>
                  )
                })}
              </div>
            )
          })}
        </div>,
        document.body
      )}
    </div>
  )
}

/* ─── EFFECT STACK ────────────────────────────────────── */
function EfxStack(props) {
  var lkSt=useState(false); var lkOpen=lkSt[0], setLkOpen=lkSt[1]
  var lkRef=useRef(null)
  var lkMenuRef=useRef(null)
  var lkPos=usePopoverPosition(lkRef, lkOpen, "above")
  useEffect(function(){
    if(!lkOpen)return
    function h(e){
      if(lkRef.current&&lkRef.current.contains(e.target))return
      if(lkMenuRef.current&&lkMenuRef.current.contains(e.target))return
      setLkOpen(false)
    }
    document.addEventListener("mousedown",h)
    return function(){document.removeEventListener("mousedown",h)}
  },[lkOpen])

  function addEfx(type){props.onChange([mkEfx(type)].concat(props.stack))}
  function linkStack(stackId){
    props.onChange([mkEfxStackRef(stackId)].concat(props.stack))
    setLkOpen(false)
  }
  function upd(id,nw){props.onChange(props.stack.map(function(e){return e.id===id?nw:e}))}
  function del(id){props.onChange(props.stack.filter(function(e){return e.id!==id}))}
  function move(idx,dir){
    var ni=Math.max(0,Math.min(props.stack.length-1,idx+dir))
    if(ni===idx)return
    var a=props.stack.slice(),tmp=a[idx];a[idx]=a[ni];a[ni]=tmp;props.onChange(a)
  }

  // Effect Stack nodes available to link
  var efxStacks = (props.nodes||[]).filter(function(n){
    return n.type==="stack"&&n.stackType==="effect"&&n.id!==props.selfId
  })

  return (
    <div>
      {props.stack.length===0 && <div className="empty">no effects</div>}
      {props.stack.map(function(efx,i){
        if(efx.type==="__stackref__") return (
          <StackRefCard key={efx.id} item={efx} nodes={props.nodes||[]} stackType="effect"
            isFirst={i===0} isLast={i===props.stack.length-1}
            onChange={function(nw){upd(efx.id,nw)}}
            onDel={function(){del(efx.id)}}
            onMove={function(dir){move(i,dir)}}
            onNavigate={props.onNavigate}/>
        )
        return (
          <EfxCard key={efx.id} efx={efx} nodes={props.nodes} selfId={props.selfId} iC={props.iC}
            onNavigate={props.onNavigate}
            siblingEffects={props.stack.filter(function(s){return s.id!==efx.id&&s.maskStack&&s.maskStack.length>0})}
            ownerNodeId={props.selfId}
            isFirst={i===0} isLast={i===props.stack.length-1}
            onChange={function(nw){upd(efx.id,nw)}}
            onDel={function(){del(efx.id)}}
            onMove={function(dir){move(i,dir)}}
            onPromote={props.onPromote ? function(){props.onPromote({slot:props.basePath&&props.basePath.slotKey,afterId:efx.id,withSub:true,stackType:"effect"})} : null}
            onDrillMask={function(mi){
              if(!props.navPush||!props.basePath)return
              var curEfx=props.stack.find(function(e){return e.id===efx.id})||efx
              var targetMask=(curEfx.maskStack||[])[mi]
              if(!targetMask)return
              props.navPush({label:efx.name||efx.type,kind:"effect",id:efx.id,
                slotKey:props.basePath.slotKey,parentSteps:props.basePath.steps||[]})
              props.navPush({label:targetMask.name||targetMask.channel||"mask",kind:"mask",id:targetMask.id,
                slotKey:props.basePath.slotKey,parentSteps:(props.basePath.steps||[]).concat([{kind:"effect",id:efx.id}])})
            }}
          />
        )
      })}
      <div style={{display:"flex",gap:4,marginTop:6,alignItems:"stretch",minHeight:36}}>
        {/* + effect — 2 parts */}
        <AddEfxMenu onAdd={addEfx}/>
        {/* + stack — 2 parts */}
        <div ref={lkRef} style={{position:"relative",flex:2,minWidth:0}}>
          <button className="ac" style={{width:"100%",height:"100%",fontSize:11}}
            onClick={function(){setLkOpen(!lkOpen)}}>+ stack</button>
          {lkOpen&&lkPos&&createPortal(
            <div ref={lkMenuRef} className="eff-menu" style={lkPos}>
              {efxStacks.length===0
                ? <div className="drop-item" style={{color:"var(--mu)",cursor:"default"}}>no effect stacks yet</div>
                : efxStacks.map(function(n){
                    return(
                      <div key={n.id} className="drop-item" onClick={function(){linkStack(n.id)}}>
                        {n.name}
                      </div>
                    )
                  })
              }
            </div>,
            document.body
          )}
        </div>
        {/* extract — 1 part, only when available */}
        {props.onExtract&&props.stack.length>0&&(
          <button className="promote-btn" style={{flex:1,minWidth:0,fontSize:10}}
            onClick={props.onExtract} title="Extract stack to a reusable Stack node">⊞ extract</button>
        )}
      </div>
    </div>
  )
}

/* ─── MASK STACK PANEL ────────────────────────────────── */
function MaskStackPanel(props) {
  var lkSt=useState(false); var lkOpen=lkSt[0], setLkOpen=lkSt[1]
  var lkRef=useRef(null)
  var lkMenuRef=useRef(null)
  var lkPos=usePopoverPosition(lkRef, lkOpen, "above")
  useEffect(function(){
    if(!lkOpen)return
    function h(e){
      if(lkRef.current&&lkRef.current.contains(e.target))return
      if(lkMenuRef.current&&lkMenuRef.current.contains(e.target))return
      setLkOpen(false)
    }
    document.addEventListener("mousedown",h)
    return function(){document.removeEventListener("mousedown",h)}
  },[lkOpen])

  function addMask(){props.onChange([mkMask()].concat(props.stack))}
  function linkStack(stackId){
    props.onChange([mkMaskStackRef(stackId)].concat(props.stack))
    setLkOpen(false)
  }
  function upd(id,nw){props.onChange(props.stack.map(function(m){return m.id===id?nw:m}))}
  function del(id){props.onChange(props.stack.filter(function(m){return m.id!==id}))}
  function move(idx,dir){
    var ni=Math.max(0,Math.min(props.stack.length-1,idx+dir)); if(ni===idx)return
    var a=props.stack.slice(),tmp=a[idx];a[idx]=a[ni];a[ni]=tmp; props.onChange(a)
  }

  var mskStacks = (props.nodes||[]).filter(function(n){
    return n.type==="stack"&&n.stackType==="mask"&&n.id!==props.selfId
  })

  return (
    <div>
      {props.stack.length===0 && <div className="empty">no masks</div>}
      {props.stack.map(function(mk,mi){
        if(mk.type==="__stackref__") return (
          <StackRefCard key={mk.id} item={mk} nodes={props.nodes||[]} stackType="mask"
            isFirst={mi===0} isLast={mi===props.stack.length-1}
            onChange={function(nw){upd(mk.id,nw)}}
            onDel={function(){del(mk.id)}}
            onMove={function(dir){move(mi,dir)}}
            onNavigate={props.onNavigate}/>
        )
        return (
          <MaskCard key={mk.id} mask={mk} nodes={props.nodes} selfId={props.selfId} iC={props.iC}
            siblingEffects={props.siblingEffects} ownerNodeId={props.ownerNodeId}
            isFirst={mi===0} isLast={mi===props.stack.length-1}
            onMove={function(dir){move(mi,dir)}}
            onChange={function(nw){upd(mk.id,nw)}}
            onDel={function(){del(mk.id)}}
            onPromote={props.onPromote ? function(){props.onPromote({slot:props.basePath&&props.basePath.slotKey,afterId:mk.id,withSub:true,stackType:"mask"})} : null}
            onEditEffects={function(){
              if(!props.navPush||!props.basePath)return
              props.navPush({label:mk.name||mk.channel||"mask",kind:"mask",id:mk.id,
                slotKey:props.basePath.slotKey,parentSteps:props.basePath.steps||[]})
            }}
          />
        )
      })}
      <div style={{display:"flex",gap:4,marginTop:6,alignItems:"stretch",minHeight:36}}>
        {/* + mask — 2 parts */}
        <button className="lv" style={{flex:2,minWidth:0,fontSize:11}}
          onClick={addMask}>+ mask</button>
        {/* + stack — 2 parts */}
        <div ref={lkRef} style={{position:"relative",flex:2,minWidth:0}}>
          <button className="lv" style={{width:"100%",height:"100%",fontSize:11}}
            onClick={function(){setLkOpen(!lkOpen)}}>+ stack</button>
          {lkOpen&&lkPos&&createPortal(
            <div ref={lkMenuRef} className="eff-menu" style={lkPos}>
              {mskStacks.length===0
                ? <div className="drop-item" style={{color:"var(--mu)",cursor:"default"}}>no mask stacks yet</div>
                : mskStacks.map(function(n){
                    return(
                      <div key={n.id} className="drop-item" onClick={function(){linkStack(n.id)}}>
                        {n.name}
                      </div>
                    )
                  })
              }
            </div>,
            document.body
          )}
        </div>
        {/* extract — 1 part, only when available */}
        {props.onExtract&&props.stack.length>0&&(
          <button className="promote-btn" style={{flex:1,minWidth:0,fontSize:10}}
            onClick={props.onExtract} title="Extract stack to a reusable Stack node">⊞ extract</button>
        )}
      </div>
    </div>
  )
}

/* ─── SLOT PANEL ──────────────────────────────────────── */
function SlotPanel(props) {
  var slot=props.slot, onChange=props.onChange, nodes=props.nodes, selfId=props.selfId
  var tabSt=useState("source"); var tab=tabSt[0], setTab=tabSt[1]
  var nEfx=(slot.effectStack||[]).length, nMask=(slot.maskStack||[]).length
  var tabs=[
    {id:"source", label:"Source"},
    {id:"effects",label:"Effects"+(nEfx>0?" ("+nEfx+")":""),color:"ac"},
    {id:"masks",  label:"Masks"+(nMask>0?" ("+nMask+")":""),color:"lv"},
  ]
  var inner = (
    <>
      <TabBar tabs={tabs} active={tab} onChange={setTab}/>
      {tab==="source" && (
        <div className="card-body">
          <NRef l="source" v={slot.refId} nodes={nodes} selfId={selfId} iC={props.iC} fn={function(v){onChange(Object.assign({},slot,{refId:v}))}}/>
        </div>
      )}
      {tab==="effects" && (
        <div style={{padding:10}}>
          <EfxStack key={(slot.effectStack||[]).map(function(e){return e.id}).join(",")}
            stack={slot.effectStack||[]} nodes={nodes} selfId={selfId} navPush={props.navPush}
            basePath={{slotKey:(props.slotKey||"")+".effectStack", steps:[]}}
            onNavigate={props.onNavigate}
            onPromote={props.onPromote}
            onChange={function(es){onChange(Object.assign({},slot,{effectStack:es}))}}
            onExtract={props.onExtract ? function(){props.onExtract({slot:props.slotKey,slotObj:slot,kind:"effect",owner:props.owner})} : null}/>
        </div>
      )}
      {tab==="masks" && (
        <div style={{padding:10}}>
          <MaskStackPanel key={(slot.maskStack||[]).map(function(e){return e.id}).join(",")}
            stack={slot.maskStack||[]} nodes={nodes} selfId={selfId} navPush={props.navPush} iC={props.iC}
            basePath={{slotKey:(props.slotKey||"")+".maskStack", steps:[]}}
            onNavigate={props.onNavigate}
            onPromote={props.onPromote}
            onChange={function(ms){onChange(Object.assign({},slot,{maskStack:ms}))}}
            onExtract={props.onExtract ? function(){props.onExtract({slot:props.slotKey,slotObj:slot,kind:"mask",owner:props.owner})} : null}/>
        </div>
      )}
    </>
  )
  if(props.headless) return inner
  return (
    <div className="card">
      <div className="card-hdr" style={{background:props.accent==="var(--ac)"?"rgba(36,204,168,.06)":"rgba(208,72,152,.06)"}}>
        <span style={{flex:1,fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:props.accent}}>{props.label}</span>
        {props.dspSlot&&props.slotKey&&props.owner&&(function(){
          var ownerId=props.owner.id||props.owner
          var ds=props.dispSlot
          var isThis=ds&&ds.nodeId===ownerId&&ds.slot===props.slotKey
          var icon=!isThis?"◎":ds.mode==="pixels"?"◉":"◈"
          var col=!isThis?"var(--mu)":"var(--lv)"
          var ttip=!isThis?"Preview this input":ds.mode==="pixels"?"Previewing pixels · tap for mask":"Previewing mask · tap to stop"
          return <button className="icon-btn sm"
            onClick={function(e){e.stopPropagation();props.dspSlot(ownerId,props.slotKey)}}
            style={{color:col,fontSize:18}} title={ttip}>{icon}</button>
        })()}
      </div>
      {inner}
    </div>
  )
}

/* ─── BLENDER PROPS ───────────────────────────────────── */
function BlenderProps(props) {
  var node=props.node, onChange=props.onChange, nodes=props.nodes
  // Wrap onPromote to inject nodeId — EfxStack/MaskStackPanel don't know which node they're inside
  var wrappedPromote=props.onPromote?function(tp){props.onPromote(Object.assign({nodeId:node.id},tp))}:null
  var navSt=useState([]); var navStack=navSt[0], setNavStack=navSt[1]
  // All hooks must be declared before any early return to satisfy Rules of Hooks
  var outTabSt=useState("effects"); var outTab=outTabSt[0], setOutTab=outTabSt[1]
  var blendTabSt=useState("pixels"); var blendTab=blendTabSt[0], setBlendTab=blendTabSt[1]
  // Layout mode state — MUST be declared here, not below the conditional early
  // return. Previous placement caused React error #300 (changing hook count)
  // whenever the drill-down was entered/exited.
  var BP_LAYOUT_KEY = "nlics:bp-layout:v2"  // v2: default accordion, resets v1 tabs pref
  var layoutSt=useState(function(){
    try{var v=localStorage.getItem(BP_LAYOUT_KEY);return v||"accordion"}catch(e){return "accordion"}
  })
  var layout=layoutSt[0], setLayoutRaw=layoutSt[1]
  function setLayout(v){setLayoutRaw(v);try{localStorage.setItem(BP_LAYOUT_KEY,v)}catch(e){}}
  function navPush(item){setNavStack(function(s){return s.concat([item])})}
  function navPop(){setNavStack(function(s){return s.slice(0,-1)})}

  if(navStack.length>0){
    var top=navStack[navStack.length-1]
    // Reconstruct full steps from the last entry: parentSteps + [{kind,id}]
    var topSteps=(top.parentSteps||[]).concat(top.kind?[{kind:top.kind,id:top.id}]:top.steps||[])
    // Resolve target from CURRENT node state
    var drillTarget=resolvePath(node,top.slotKey,topSteps)
    if(!drillTarget){
      setTimeout(function(){setNavStack([])},0)
      return <div style={{padding:20,color:"var(--mu)",fontSize:11}}>Target no longer exists — returning…</div>
    }
    function jumpTo(idx){setNavStack(function(s){return s.slice(0,idx)})}
    // Build basePath for child components so they push correctly
    var childBasePath={slotKey:top.slotKey,steps:topSteps}
    return (
      <div style={{display:"flex",flexDirection:"column",minHeight:300}}>
        <div className="breadcrumb">
          <span className="bc-item" onClick={function(){setNavStack([])}}>{node.name||"Blender"}</span>
          {(function(){
            var sk=navStack[0]&&navStack[0].slotKey||""
            var ctx=sk.indexOf("inputA")>=0?"Input A":sk.indexOf("inputB")>=0?"Input B":
              sk==="outEfx"||sk==="outMask"?"Output":
              sk.indexOf("layers[")>=0?("Layer "+(parseInt((sk.match(/layers\[(\d+)\]/)||[,"?"])[1])+1)):
              sk==="effectStack"?"Effects":sk==="maskStack"?"Masks":null
            if(!ctx) return null
            return (<span style={{display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
              <span style={{color:"var(--mu)",margin:"0 2px"}}>›</span>
              <span className="bc-item" onClick={function(){setNavStack([])}} style={{color:"var(--di)"}}>
                {ctx}
              </span>
            </span>)
          })()}
          {navStack.map(function(n,i){
            var isCur=i===navStack.length-1
            return (
              <span key={i} style={{display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
                <span style={{color:"var(--mu)",margin:"0 2px"}}>›</span>
                <span className={"bc-item"+(isCur?" cur":"")}
                  onClick={function(){jumpTo(i)}}>
                  {n.label}
                </span>
              </span>
            )
          })}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:10}}>
          {(function(){
            var isEffectDrill=top.kind==="effect"
            var stackToShow=isEffectDrill?(drillTarget.maskStack||[]):(drillTarget.effectStack||[])
            var stackLabel=isEffectDrill?"masks on effect":"effects on mask"
            if(isEffectDrill){
              return (<div>
                <div className="stack-lbl">{stackLabel}</div>
                <MaskStackPanel
                  key={stackToShow.map(function(m){return m.id}).join(",")}
                  stack={stackToShow} nodes={nodes} selfId={node.id}
                  navPush={navPush} iC={props.iC}
                  basePath={childBasePath}
                  onNavigate={props.onNavigate}
                  onPromote={wrappedPromote}
                  onChange={function(ms){
                    var newNode=updatePath(node,top.slotKey,topSteps,function(efx){
                      return Object.assign({},efx,{maskStack:ms})
                    })
                    onChange(newNode)
                  }}/>
              </div>)
            }
            return (<div>
              <div className="stack-lbl">{stackLabel}</div>
              <EfxStack
                key={stackToShow.map(function(e){return e.id}).join(",")}
                stack={stackToShow}
                nodes={nodes} selfId={node.id}
                navPush={navPush}
                basePath={childBasePath}
                onNavigate={props.onNavigate}
                onPromote={wrappedPromote}
                onChange={function(es){
                  var newNode=updatePath(node,top.slotKey,topSteps,function(mask){
                    return Object.assign({},mask,{effectStack:es})
                  })
                  onChange(newNode)
                }}/>
            </div>)
          })()}
        </div>
      </div>
    )
  }

  var nOutEfx=(node.outEfx||[]).length, nOutMask=(node.outMask||[]).length
  var outTabs=[
    {id:"effects",label:"Effects"+(nOutEfx>0?" ("+nOutEfx+")":""),color:"ac"},
    {id:"masks",  label:"Masks"+(nOutMask>0?" ("+nOutMask+")":""),color:"lv"},
  ]
  // Per-blender collapse state (accordion) / active-tab set (tabs) — lives on node._ui
  var ui = node._ui || {}
  function setUi(patch){
    onChange(Object.assign({},node,{_ui:Object.assign({},ui,patch)}))
  }
  // Collapse state for each section (default: all expanded)
  var collapsed = ui.collapsed || {}
  function toggleCollapse(key){
    var nc=Object.assign({},collapsed); nc[key]=!nc[key]
    setUi({collapsed:nc})
  }
  // Multi-select tabs (default: all on so the layout switch doesn't hide everything)
  var activeTabs = ui.bpTabs || {inputA:true, blend:true, inputB:true, output:true}
  function toggleTab(key){
    var na=Object.assign({},activeTabs)
    na[key]=!na[key]
    // Ensure at least one tab remains active
    if(!na.inputA&&!na.blend&&!na.inputB&&!na.output)na[key]=true
    setUi({bpTabs:na})
  }

  // Section renderers — closures over state. `headless` flag omits the
  // section's own title header when the Acc wrapper provides one.
  function renderInputA(headless){
    return (
      <SlotPanel label="Input A" slot={node.inputA} accent="var(--ac)"
        nodes={nodes} selfId={node.id} navPush={navPush}
        slotKey="inputA" owner={node} iC={props.iC}
        headless={headless}
        onNavigate={props.onNavigate}
        onPromote={wrappedPromote}
        dspSlot={props.dspSlot} dispSlot={props.dispSlot}
        onChange={function(s){onChange(Object.assign({},node,{inputA:s}))}}
        onExtract={props.onExtract ? props.onExtract : null}/>
    )
  }
  function renderBlend(headless){
    var blendTabs=[{id:"pixels",label:"Pixels"},{id:"masks",label:"Masks"}]
    var pixelsBody=(
      <div className="card-body">
        <Se l="mode" v={node.mode} opts={BMODES} fn={function(v){onChange(Object.assign({},node,{mode:v}))}}/>
        <Sl l="amount" v={node.amount} mn={0} mx={100} st={1} fmt={function(v){return Math.round(v)+"%"}} fn={function(v){onChange(Object.assign({},node,{amount:v}))}}/>
        <PR l="order">
          <button onClick={function(){onChange(Object.assign({},node,{switched:!node.switched}))}}
            className={node.switched?"ac":""}
            style={{minHeight:36,padding:"0 14px"}}>
            {node.switched?"B over A":"A over B"}
          </button>
        </PR>
        {COMMUTATIVE_MODES[node.mode] && (
          <div style={{fontSize:9,color:"var(--mu)",padding:"0 0 4px 84px",lineHeight:1.5,fontStyle:"italic"}}>
            order has no effect in {node.mode} mode
          </div>
        )}
      </div>
    )
    var masksBody=(
      <div className="card-body">
        <Se l="mode" v={node.maskMode||"add"} opts={MASK_BMODES}
          fn={function(v){onChange(Object.assign({},node,{maskMode:v}))}}/>
        <Sl l="amount" v={node.maskAmount==null?100:node.maskAmount} mn={0} mx={100} st={1}
          fmt={function(v){return Math.round(v)+"%"}}
          fn={function(v){onChange(Object.assign({},node,{maskAmount:v}))}}/>
      </div>
    )
    var body=(<div><TabBar tabs={blendTabs} active={blendTab} onChange={setBlendTab}/>{blendTab==="pixels"?pixelsBody:masksBody}</div>)
    if(headless) return body
    return (
      <div className="card" style={{marginBottom:10}}>
        <div className="card-hdr">
          <span style={{flex:1,fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"var(--di)"}}>Blend</span>

        </div>
        {body}
      </div>
    )
  }
  function renderInputB(headless){
    return (
      <SlotPanel label="Input B" slot={node.inputB} accent="var(--co)"
        nodes={nodes} selfId={node.id} navPush={navPush}
        slotKey="inputB" owner={node} iC={props.iC}
        headless={headless}
        onNavigate={props.onNavigate}
        onPromote={wrappedPromote}
        dspSlot={props.dspSlot} dispSlot={props.dispSlot}
        onChange={function(s){onChange(Object.assign({},node,{inputB:s}))}}
        onExtract={props.onExtract ? props.onExtract : null}/>
    )
  }
  function renderOutput(headless){
    var body = (
      <>
        <TabBar tabs={outTabs} active={outTab} onChange={setOutTab}/>
        {outTab==="effects" && (
          <div style={{padding:10}}>
            <EfxStack stack={node.outEfx||[]} nodes={nodes} selfId={node.id} navPush={navPush}
              basePath={{slotKey:"outEfx", steps:[]}}
              onNavigate={props.onNavigate}
              onPromote={wrappedPromote}
              onChange={function(es){onChange(Object.assign({},node,{outEfx:es}))}}
              onExtract={props.onExtract ? function(){props.onExtract({slot:"outEfx",slotObj:{effectStack:node.outEfx||[]},kind:"effect",owner:node})} : null}/>
          </div>
        )}
        {outTab==="masks" && (
          <div style={{padding:10}}>
            <MaskStackPanel stack={node.outMask||[]} nodes={nodes} selfId={node.id} navPush={navPush} iC={props.iC}
              basePath={{slotKey:"outMask", steps:[]}}
              onNavigate={props.onNavigate}
              onPromote={wrappedPromote}
              onChange={function(ms){onChange(Object.assign({},node,{outMask:ms}))}}
              onExtract={props.onExtract ? function(){props.onExtract({slot:"outMask",slotObj:{maskStack:node.outMask||[]},kind:"mask",owner:node})} : null}/>
          </div>
        )}
      </>
    )
    if(headless) return body
    return (
      <div className="card">
        <div className="card-hdr" style={{background:"rgba(176,96,240,.06)"}}>
          <span style={{flex:1,fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"var(--lv)"}}>Output</span>
          {props.dspSlot&&(function(){
            var ds=props.dispSlot
            var isThis=ds&&ds.nodeId===node.id&&ds.slot==="output"
            var icon=!isThis?"◎":ds.mode==="pixels"?"◉":"◈"
            var col=!isThis?"var(--mu)":"var(--lv)"
            var tip=!isThis?"Preview output":ds.mode==="pixels"?"output pixels · tap for mask":"output mask · tap to stop"
            return <button className="icon-btn sm"
              onClick={function(e){e.stopPropagation();props.dspSlot(node.id,"output")}}
              style={{color:col,fontSize:18}} title={tip}>{icon}</button>
          })()}
        </div>
        {body}
      </div>
    )
  }

  // Accordion wrapper: header is the section title with chevron, body flows
  // directly beneath as part of the same rounded box (no duplicated title,
  // no double borders). Matches card radius exactly.
  function Acc(sKey, label, accent, headerBg, renderFn){
    var isCollapsed = !!collapsed[sKey]
    return (
      <div key={sKey} className="card" style={{marginBottom:10}}>
        <button onClick={function(){toggleCollapse(sKey)}}
          style={{width:"100%",display:"flex",alignItems:"center",gap:8,
            padding:"0 10px",background:headerBg||"var(--sf)",border:"none",
            borderBottom:isCollapsed?"none":"1px solid var(--bd)",
            color:accent||"var(--tx)",cursor:"pointer",minHeight:"var(--tap)",
            fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,
            textTransform:"uppercase",letterSpacing:".1em",textAlign:"left",
            borderRadius:isCollapsed?8:"8px 8px 0 0"}}>
          <span className={"bp-chevron"+(isCollapsed?"":" open")} style={{color:accent||"var(--mu)"}}>›</span>
          <span style={{flex:1}}>{label}</span>
        </button>
        {!isCollapsed && renderFn(true)}
      </div>
    )
  }

  return (
    <div style={{padding:0,overflowY:"auto"}}>
      {/* Layout toolbar */}
      <div className="bp-toolbar">
        <div className="bp-toggle" role="tablist" aria-label="Blender panel layout">
          <button className={layout==="accordion"?"active":""}
            onClick={function(){setLayout("accordion")}}
            title="Accordion — stacked collapsible sections">
            {/* rows icon — horizontal stripes */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <rect x="3" y="4"  width="14" height="3" rx="1"/>
              <rect x="3" y="9"  width="14" height="3" rx="1"/>
              <rect x="3" y="14" width="14" height="3" rx="1"/>
            </svg>
          </button>
          <button className={layout==="tabs"?"active":""}
            onClick={function(){setLayout("tabs")}}
            title="Tabs — multi-select columns">
            {/* columns icon — vertical stripes */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <rect x="3"  y="3" width="3" height="14" rx="1"/>
              <rect x="9"  y="3" width="3" height="14" rx="1"/>
              <rect x="15" y="3" width="3" height="14" rx="1"/>
            </svg>
          </button>
        </div>
      </div>

      {layout==="tabs" ? (
        <div>
          <div className="bp-tabs">
            <button className={"bp-tab"+(activeTabs.inputA?" on ac":"")} onClick={function(){toggleTab("inputA")}}>Input A</button>
            <button className={"bp-tab"+(activeTabs.blend?" on di":"")} onClick={function(){toggleTab("blend")}}>Blend</button>
            <button className={"bp-tab"+(activeTabs.inputB?" on co":"")} onClick={function(){toggleTab("inputB")}}>Input B</button>
            <button className={"bp-tab"+(activeTabs.output?" on lv":"")} onClick={function(){toggleTab("output")}}>Output</button>
          </div>
          <div style={{padding:"4px 10px 10px"}}>
            {activeTabs.inputA && <div style={{marginBottom:10}}>{renderInputA(false)}</div>}
            {activeTabs.blend  && renderBlend(false)}
            {activeTabs.inputB && <div style={{marginBottom:10}}>{renderInputB(false)}</div>}
            {activeTabs.output && renderOutput(false)}
          </div>
        </div>
      ) : (
        <div style={{padding:"0 10px 10px"}}>
          {Acc("inputA","Input A","var(--ac)","rgba(36,204,168,.06)",renderInputA)}
          {Acc("blend", "Blend",  "var(--di)",null,                  renderBlend)}
          {Acc("inputB","Input B","var(--co)","rgba(208,72,152,.06)",renderInputB)}
          {Acc("output","Output", "var(--lv)","rgba(176,96,240,.06)",renderOutput)}
        </div>
      )}
    </div>
  )
}

/* ─── NODE ITEM ───────────────────────────────────────── */
var TDOT={"solid":"#3850a0","shape":"#18b860","gradient":"#7820b0","noise":"#a87018","pattern":"#1878b0","image":"#2060a8","blender":"#b82880","layers":"#e06828","stack":"#24acc4","promoted":"#d4b428"}
/* ─── DISPLAY MODE BUTTON ──────────────────────────────── */
// Renders a stacked-layers SVG icon in a round-rect.
// A small triangle badge in the bottom-right signals multiple modes.
// Tap: cycle off→comp→mask. Long-press: popover with labelled options.
function DisplayModeBtn(props) {
  // props: active (bool), maskMode (bool), onDsp (fn), size (number)
  var pressTimer=useRef(null)
  var popSt=useState(false); var pop=popSt[0], setPop=popSt[1]
  var anchorRef=useRef(null)
  var menuRef=useRef(null)
  var pos=usePopoverPosition(anchorRef, pop, "above")

  useEffect(function(){
    if(!pop) return
    function h(e){
      if(anchorRef.current&&anchorRef.current.contains(e.target)) return
      if(menuRef.current&&menuRef.current.contains(e.target)) return
      setPop(false)
    }
    document.addEventListener("mousedown",h)
    document.addEventListener("touchstart",h)
    return function(){
      document.removeEventListener("mousedown",h)
      document.removeEventListener("touchstart",h)
    }
  },[pop])

  function startPress(){
    pressTimer.current=setTimeout(function(){
      pressTimer.current=null
      setPop(true)
    }, 400)
  }
  function endPress(e){
    if(pressTimer.current){
      clearTimeout(pressTimer.current); pressTimer.current=null
      // Short tap — cycle
      props.onDsp()
    }
    // Long press opened popover — don't cycle
  }
  function cancelPress(){
    if(pressTimer.current){ clearTimeout(pressTimer.current); pressTimer.current=null }
  }

  var sz=props.size||28
  var isOn=props.active
  var isMask=props.maskMode
  // Colours
  var col=isOn?(isMask?"var(--lv)":"var(--lv)"):"var(--mu)"
  var bg=isOn?"rgba(176,96,240,.12)":"none"
  var border=isOn?"1px solid "+(isMask?"var(--lv)":"var(--lv)"):"1px solid transparent"

  var modes=[
    {key:"off",   label:"Off",        icon:"○"},
    {key:"comp",  label:"Composite",  icon:"◉"},
    {key:"mask",  label:"Mask only",  icon:"◈"},
  ]
  var curMode=!isOn?"off":isMask?"mask":"comp"

  return (
    <div style={{position:"relative",display:"inline-flex"}}>
      <button ref={anchorRef}
        onMouseDown={startPress} onMouseUp={endPress} onMouseLeave={cancelPress}
        onTouchStart={startPress} onTouchEnd={endPress} onTouchCancel={cancelPress}
        onClick={function(e){e.preventDefault()}}
        title={"Display: "+curMode+" — tap to cycle, hold to pick"}
        style={{width:sz,height:sz,padding:0,background:bg,border:border,
          borderRadius:6,cursor:"pointer",display:"inline-flex",alignItems:"center",
          justifyContent:"center",flexShrink:0,position:"relative",transition:"all .15s"}}>
        {/* Stacked layers icon */}
        <svg width={sz-8} height={sz-8} viewBox="0 0 18 18" fill="none" stroke={col} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12l7 4 7-4"/>
          <path d="M2 9l7 4 7-4"/>
          <path d="M2 6l7-4 7 4"/>
        </svg>
        {/* Triangle badge — signals multiple modes */}
        <svg width={8} height={8} viewBox="0 0 8 8" style={{position:"absolute",bottom:1,right:1}}>
          <path d="M8 8 L0 8 L8 0 Z" fill={isOn?"var(--lv)":"var(--bd)"}/>
        </svg>
      </button>
      {pop&&pos&&createPortal(
        <div ref={menuRef} style={Object.assign({},pos,{
          position:"fixed",zIndex:9000,background:"var(--pn)",
          border:"1px solid var(--bd)",borderRadius:10,
          boxShadow:"0 -6px 24px rgba(0,0,0,.7)",
          minWidth:140,padding:"6px 0"})}>
          <div style={{fontSize:8,color:"var(--mu)",textTransform:"uppercase",
            letterSpacing:".1em",padding:"4px 12px 6px",fontFamily:"'IBM Plex Mono',monospace"}}>
            Display mode
          </div>
          {modes.map(function(m){
            var isActive=m.key===curMode
            return (
              <div key={m.key} onClick={function(){
                  if(m.key==="off"&&isOn) props.onDsp()
                  else if(m.key==="comp"&&(!isOn||isMask)) props.onDsp()
                  else if(m.key==="mask"&&(!isOn||!isMask)) props.onDsp()
                  setPop(false)
                }}
                style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",
                  cursor:"pointer",background:isActive?"var(--sl)":"none",
                  color:isActive?"var(--lv)":"var(--mu)"}}>
                <span style={{fontSize:16,width:20,textAlign:"center"}}>{m.icon}</span>
                <span style={{fontSize:11,fontFamily:"'IBM Plex Mono',monospace"}}>{m.label}</span>
                {isActive&&<span style={{marginLeft:"auto",fontSize:9,color:"var(--lv)"}}>✓</span>}
              </div>
            )
          })}
        </div>,
        document.body
      )}
    </div>
  )
}

function NodeItem(props) {
  var node=props.node
  var edSt=useState(false);    var ed=edSt[0],     setEd=edSt[1]
  var nmSt=useState(node.name); var nm=nmSt[0],    setNm=nmSt[1]
  var armSt=useState(false);   var armed=armSt[0], setArmed=armSt[1]
  var inR=useRef(null),timerR=useRef(null)
  useEffect(function(){setNm(node.name)},[node.name])
  useEffect(function(){if(ed&&inR.current)inR.current.focus()},[ed])
  useEffect(function(){return function(){if(timerR.current)clearTimeout(timerR.current)}},[])
  function commit(){setEd(false);if(nm.trim())props.onRen(nm.trim());else setNm(node.name)}
  function handleDel(e){
    e.stopPropagation()
    if(!armed){setArmed(true);timerR.current=setTimeout(function(){setArmed(false)},3000)}
    else{clearTimeout(timerR.current);setArmed(false);props.onDel(node.id)}
  }
  return (
    <div className={"nrow"+(props.isSel?" sel":"")+(props.isDsp?" dsp":"")+(!node.enabled?" off":"")}
      onClick={function(){if(armed){setArmed(false);clearTimeout(timerR.current);return}props.onSel(node.id)}}>
      <div style={{width:10,height:10,borderRadius:"50%",background:TDOT[node.type]||"#555",flexShrink:0}}/>
      <div style={{flex:1,overflow:"hidden",minWidth:0}}>
        {ed
          ? <input ref={inR} className="ninput" value={nm} onChange={function(e){setNm(e.target.value)}} onBlur={commit}
              onKeyDown={function(e){if(e.key==="Enter")commit();if(e.key==="Escape"){setEd(false);setNm(node.name)}}}
              onClick={function(e){e.stopPropagation()}}/>
          : <span onDoubleClick={function(e){e.stopPropagation();setEd(true)}}
              style={{fontSize:13,color:props.isDsp?"var(--lv)":node.enabled?"var(--tx)":"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block",userSelect:"none"}}>
              {node.name}
            </span>
        }
      </div>
      <span className={"ftag "+(node.type==="stack"?"tstack":node.type==="promoted"?"tprom":node.type==="layers"?"tco":node.section===1?"tgn":"tco")}
        style={node.type==="layers"?{borderColor:"#e06828",color:"#e06828",background:"rgba(224,104,40,.1)"}:{}}>
        {node.type==="stack"?(node.stackType||"effect")+" stack":node.type==="layers"?"layer comp":node.type}
      </span>
      <button className="icon-btn sm" onClick={function(e){e.stopPropagation();props.onTog(node.id)}} style={{color:node.enabled?"var(--ac)":"var(--mu)"}}>
        {node.enabled?"●":"○"}
      </button>
      {(function(){
        // Sub-flag driving (dispSlot) → purple, mirrors sub icon
        // Top-level user control (dispId===node, no dispSlot) → teal --ac
        // Off → muted ◎
        var nds=props.dispSlot&&props.dispSlot.nodeId===node.id?props.dispSlot:null
        var icon,col,tip
        if(nds){
          icon=nds.mode==="pixels"?"◉":"◈"
          col="var(--lv)"
          var slotLabel=nds.slot==="inputA"?"Input A":nds.slot==="inputB"?"Input B":"Output"
          tip=slotLabel+" · "+(nds.mode==="pixels"?"pixels":"mask")+" · tap for composite"
        } else if(props.isDsp){
          icon=props.isMaskDisp?"◈":"◉"
          col="var(--ac)"
          tip=props.isMaskDisp?"output mask · tap off":"composite · tap for mask"
        } else {
          icon="◎"; col="var(--mu)"; tip="Set as live preview"
        }
        return <button className="icon-btn sm"
          onClick={function(e){e.stopPropagation();props.onDsp(node.id)}}
          style={{color:col,fontSize:20}} title={tip}>{icon}</button>
      })()}
      <button onClick={handleDel} style={{minHeight:32,padding:"0 8px",fontSize:armed?9:14,background:armed?"rgba(224,48,96,.2)":"none",border:armed?"1px solid var(--dng)":"none",color:armed?"var(--dng)":"var(--mu)",borderRadius:6,minWidth:armed?56:32}}>
        {armed?"confirm ×":"×"}
      </button>
    </div>
  )
}

/* ─── ADD MENU ────────────────────────────────────────── */
function AddMenu(props) {
  var openSt=useState(false); var open=openSt[0], setOpen=openSt[1]
  var anchorRef=useRef(null)
  var menuRef=useRef(null)
  var pos=usePopoverPosition(anchorRef, open, "below")
  useEffect(function(){
    if(!open)return
    function h(e){
      if(anchorRef.current&&anchorRef.current.contains(e.target))return
      if(menuRef.current&&menuRef.current.contains(e.target))return
      setOpen(false)
    }
    document.addEventListener("mousedown",h)
    return function(){document.removeEventListener("mousedown",h)}
  },[open])
  var s1=[{t:"solid",l:"Solid Colour"},{t:"shape",l:"Shape"},{t:"gradient",l:"Gradient"},{t:"noise",l:"Noise Field"},{t:"pattern",l:"Pattern"},{t:"image",l:"Image"}]
  var items=props.sec===1?s1:[{t:"blender",l:"Blender"},{t:"layers",l:"Layer Comp"},{t:"stack-effect",l:"Effect Stack"},{t:"stack-mask",l:"Mask Stack"}]
  return (
    <div ref={anchorRef} style={{position:"relative"}}>
      <button className="ac" style={{fontSize:10,padding:"0 10px"}} onClick={function(){setOpen(!open)}}>+ Add</button>
      {open&&pos&&createPortal(
        <div ref={menuRef} className="drop-menu" style={pos}>
          {items.map(function(item){return <div key={item.t} className="drop-item" onClick={function(){props.onAdd(item.t,props.sec);setOpen(false)}}>{item.l}</div>})}
        </div>,
        document.body
      )}
    </div>
  )
}

/* ─── LIVE PREVIEW ────────────────────────────────────── */
function LivePreview(props) {
  var zSt=useState(1); var zoom=zSt[0], setZoom=zSt[1]
  var fSt=useState("png"); var fmt=fSt[0], setFmt=fSt[1]
  return (
    <div style={{display:"flex",flexDirection:"column",flex:1,minHeight:0,overflow:"hidden"}}>
      <div style={{display:"flex",alignItems:"center",gap:4,padding:"6px 10px",background:"var(--pn)",borderBottom:"1px solid var(--bd)",flexShrink:0,overflowX:"auto"}}>
        <select value={String(props.sz)} onChange={function(e){props.onResize(parseInt(e.target.value))}} style={{width:58,fontSize:10,padding:"3px 4px",flexShrink:0}}>
          {["256","400","512","768","1024"].map(function(s){return <option key={s} value={s}>{s}</option>})}
        </select>
        <button className="icon-btn sm" onClick={function(){setZoom(function(z){return Math.max(.25,z-.25)})}} style={{fontSize:16,width:32,height:32}}>-</button>
        <span style={{fontSize:10,color:"var(--di)",minWidth:30,textAlign:"center",flexShrink:0}}>{Math.round(zoom*100)}%</span>
        <button className="icon-btn sm" onClick={function(){setZoom(function(z){return Math.min(4,z+.25)})}} style={{fontSize:16,width:32,height:32}}>+</button>
        <button onClick={function(){setZoom(1)}} style={{fontSize:10,padding:"0 8px",minHeight:30,flexShrink:0}}>1:1</button>
        <select value={fmt} onChange={function(e){setFmt(e.target.value)}} style={{width:50,fontSize:10,padding:"3px 3px",flexShrink:0}}>
          {["png","jpeg","webp"].map(function(f){return <option key={f}>{f}</option>})}
        </select>
        <button className="ac" onClick={function(){props.onExport(fmt)}} style={{padding:"0 10px",fontSize:11,flexShrink:0}}>↓</button>
      </div>
      <div className="checker" style={{flex:1,overflow:"auto",display:"flex",alignItems:"center",justifyContent:"center",padding:20,position:"relative"}}>
        {!props.active && (
          <div style={{position:"absolute",textAlign:"center",pointerEvents:"none"}}>
            <div style={{fontSize:40,color:"var(--bd)",marginBottom:12}}>◎</div>
            <div style={{fontSize:12,color:"var(--mu)"}}>Tap ◎ on any item to preview</div>
          </div>
        )}
        <div style={{transform:"scale("+zoom+")",transformOrigin:"center center",boxShadow:"0 12px 60px rgba(0,0,0,.85),0 0 0 1px rgba(255,255,255,.04)",lineHeight:0}}>
          <canvas ref={props.cvRef} width={props.sz} height={props.sz} style={{display:"block",imageRendering:zoom>2?"pixelated":"auto"}}/>
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"5px 12px",background:"var(--pn)",borderTop:"1px solid var(--bd)",flexShrink:0}}>
        <span style={{fontSize:9,color:"var(--mu)"}}>{props.sz}x{props.sz}px</span>
        {props.active && <span style={{fontSize:9,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace"}}>[{props.active.type}]</span>}
        <span style={{flex:1}}/>
        <span style={{fontSize:9,color:"var(--mu)",letterSpacing:".08em",fontFamily:"'IBM Plex Mono',monospace"}}>{(typeof __BUILD_HASH__!=="undefined"?__BUILD_HASH__:"dev")+" · NLICS"}</span>
      </div>
    </div>
  )
}

/* ─── DIVIDER HOOK ──────────────────────────────────────── */
// Drag state is tracked in App via refs; onPointerMove/Up are on the root div
// so they fire even as the pointer moves across the entire app area — no
// external document listeners needed, no iframe boundary issues.
function useDivider(vert, onDragStart) {
  var divRef = useRef(null)

  function onPointerDown(e) {
    e.preventDefault()
    var el = divRef.current
    if (el) el.classList.add("drag")
    onDragStart(e.clientX, e.clientY, vert, function() {
      if (el) el.classList.remove("drag")
    })
  }

  return { ref: divRef, onPointerDown: onPointerDown }
}

/* ─── INITIAL STATE ─────────────────────────────────────── */
function initState() {
  function ef(id,t,p,o,bm,ms){return{id:id,type:t,enabled:true,params:p,opacity:o||100,blendMode:bm||"normal",maskStack:ms||[]}}
  function mk(id,refId,ch,inv,str,o,bm,es){return{id:id,refId:refId,channel:ch||"luminosity",invert:inv||false,strength:str||1,opacity:o||100,blendMode:bm||"multiply",effectStack:es||[]}}
  function sl(refId,efx,msk){return{refId:refId,effectStack:efx||[],maskStack:msk||[]}}
  var nodes=[
    {id:"g1",name:"BG Gradient", type:"gradient",section:1,enabled:true,props:{gType:"radial",c1:"#180068",c2:"#030316",s1:0,s2:1,angle:90,cx:.5,cy:.45,r:.95,sa:0,alpha:1}},
    {id:"g2",name:"Perlin Noise",type:"noise",   section:1,enabled:true,props:{nType:"perlin",c1:"#5533ee",c2:"#000000",scale:.042,oct:5,seed:7,alpha:1}},
    {id:"g3",name:"Dot Pattern", type:"pattern", section:1,enabled:true,props:{pType:"dots",c1:"#ffffff",c2:"#000000",scale:.12,sw:.1,angle:0,dr:.025,ds:.09,alpha:1}},
    {id:"g4",name:"Glow Orb",    type:"shape",   section:1,enabled:true,props:{shapeType:"ellipse",x:.5,y:.5,sz:.62,rot:0,fill:"#2288ff",stroke:"#000",strokeW:0,pts:5,innerR:.45,sides:5,ringR:.62,alpha:1}},
    {id:"g5",name:"Star Shape",  type:"shape",   section:1,enabled:true,props:{shapeType:"star",x:.5,y:.5,sz:.38,rot:0,fill:"#ffffff",stroke:"#000",strokeW:0,pts:7,innerR:.42,sides:5,ringR:.62,alpha:1}},
    {id:"b1",name:"BG+Noise",    type:"blender", section:2,enabled:true,inputA:sl("g1"),inputB:sl("g2",[ef("e1","blur",{radius:3})]),mode:"overlay",amount:60,switched:false,outEfx:[],outMask:[]},
    {id:"b2",name:"BG+Orb",      type:"blender", section:2,enabled:true,inputA:sl("b1"),inputB:sl("g4",[ef("e2","blur",{radius:24})]),mode:"screen",amount:100,switched:false,outEfx:[],outMask:[]},
    {id:"b3",name:"Final Output",type:"blender", section:2,enabled:true,
      inputA:sl("b2"),
      inputB:sl("g5",[ef("e3","blur",{radius:5})],[mk("m1","g3","luminosity",false,1,100,"multiply")]),
      mode:"screen",amount:90,switched:false,
      outEfx:[ef("e4","exposure",{stops:.35})],outMask:[]}
  ]
  return {nodes:nodes,dispId:"b3"}
}

/* ─── SETTINGS SHEET ─────────────────────────────────────── */
function SegCtrl(props) {
  return (
    <div className="seg-ctrl">
      {props.options.map(function(opt) {
        var on = props.value === opt.v
        return (
          <button key={opt.v}
            className={"seg-btn" + (on ? " on" + (props.accent ? " "+props.accent : "") : "")}
            onClick={function(){ props.onChange(opt.v) }}>
            {opt.l}
          </button>
        )
      })}
    </div>
  )
}

function SettingsSheet(props) {
  // props: open, onClose, settings, onSettings
  // settings: {viewMode, previewPinned, stickyHeaders, panelStyle}
  var s = props.settings
  function set(k, v) { props.onSettings(Object.assign({}, s, {[k]: v})) }

  if (!props.open) return null
  return (
    <div className="sheet-scrim" onClick={function(e){ if(e.target===e.currentTarget) props.onClose() }}>
      <div className="sheet-body">
        <div className="sheet-grip"/>
        <div className="sheet-hdr">
          <span className="sheet-title">Layout Settings</span>
          <button className="ghost" style={{fontSize:20,minHeight:36}} onClick={props.onClose}>×</button>
        </div>
        <div className="sheet-scroll">

          <div className="setting-grp">
            <div className="setting-grp-lbl">View mode</div>
            <div className="setting-row">
              <div>
                <div className="setting-lbl">Layout style</div>
                <div className="setting-desc">Split keeps lists and preview in separate resizable panels. Unified scrolls everything in one column.</div>
              </div>
            </div>
            <SegCtrl
              value={s.viewMode}
              options={[{v:"split",l:"Split"},{v:"unified",l:"Unified scroll"}]}
              accent="ac"
              onChange={function(v){ set("viewMode", v) }}/>
          </div>

          {s.viewMode==="unified" && (
            <div className="setting-grp">
              <div className="setting-grp-lbl">Unified options</div>
              <div className="setting-row">
                <div style={{flex:1}}>
                  <div className="setting-lbl">Preview</div>
                  <div className="setting-desc">Pinned keeps the preview locked at the top while lists scroll below. Scrollable lets the preview scroll with the lists.</div>
                </div>
              </div>
              <SegCtrl
                value={s.previewPinned?"pinned":"scrollable"}
                options={[{v:"pinned",l:"Pinned"},{v:"scrollable",l:"Scrollable"}]}
                accent="ac"
                onChange={function(v){ set("previewPinned", v==="pinned") }}/>

              <div className="setting-row" style={{marginTop:16}}>
                <div style={{flex:1}}>
                  <div className="setting-lbl">Section headers</div>
                  <div className="setting-desc">Sticky keeps §1 and §2 headers fixed while you scroll their contents. Flowing lets them scroll away.</div>
                </div>
              </div>
              <SegCtrl
                value={s.stickyHeaders?"sticky":"flowing"}
                options={[{v:"sticky",l:"Sticky"},{v:"flowing",l:"Flowing"}]}
                onChange={function(v){ set("stickyHeaders", v==="sticky") }}/>
            </div>
          )}

          <div className="setting-grp">
            <div className="setting-grp-lbl">Node settings panel</div>
            <div className="setting-row">
              <div style={{flex:1}}>
                <div className="setting-lbl">Panel style</div>
                <div className="setting-desc">Inline expands settings below the node row, pushing content down. Sheet slides up from the bottom as an overlay, keeping the list visible.</div>
              </div>
            </div>
            <SegCtrl
              value={s.panelStyle}
              options={[{v:"inline",l:"Inline"},{v:"sheet",l:"Sheet"}]}
              onChange={function(v){ set("panelStyle", v) }}/>
          </div>

          <div className="setting-grp">
            <div className="setting-grp-lbl">Orientation</div>
            <div className="setting-row">
              <div style={{flex:1}}>
                <div className="setting-lbl">Layout axis</div>
                <div className="setting-desc">Vertical stacks panels top/bottom. Horizontal places them side by side.</div>
              </div>
              <SegCtrl
                value={props.isVert?"vert":"horiz"}
                options={[{v:"vert",l:"Vertical"},{v:"horiz",l:"Horizontal"}]}
                onChange={function(v){ props.onIsVert(v==="vert") }}/>
            </div>
            {props.isVert && (
              <div>
                <div className="setting-row" style={{marginTop:12}}>
                  <div style={{flex:1}}>
                    <div className="setting-lbl">Panel order</div>
                    <div className="setting-desc">Choose whether the preview or the lists appear at the top.</div>
                  </div>
                </div>
                <SegCtrl
                  value={props.flipped?"preview-top":"lists-top"}
                  options={[{v:"preview-top",l:"Preview top"},{v:"lists-top",l:"Lists top"}]}
                  onChange={function(v){ props.onFlipped(v==="preview-top") }}/>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

/* ─── NODE DETAIL SHEET (panel style = sheet) ──────────────── */
/* ─── LAYER CARD ───────────────────────────────────────── */
// Extracted from LayerCompProps.map() — each layer needs its own hook scope.
// useState inside .map() violates Rules of Hooks (error #300 on rename/reorder).
function LayerCard(props) {
  var lyr=props.lyr, li=props.li
  var tabSt=useState("source"); var layerTab=tabSt[0], setLayerTab=tabSt[1]
  // Hoist ALL hooks including nested tab state — can't use useState inside conditionals/IIFEs
  var lyBTSt=useState("pixels"); var lyBT=lyBTSt[0], setLyBT=lyBTSt[1]
  var nEfx=(lyr.effectStack||[]).length, nMask=(lyr.maskStack||[]).length
  var lyrTabs=[
    {id:"source",  label:"Source"},
    {id:"effects", label:"Fx"+(nEfx>0?" ("+nEfx+")":""), color:"ac"},
    {id:"masks",   label:"Mask"+(nMask>0?" ("+nMask+")":""), color:"lv"},
    {id:"layer",   label:"Layer"},
  ]
  var isCollapsed = props.collapsed || false
  var delArmedSt=useState(false); var delArmed=delArmedSt[0], setDelArmed=delArmedSt[1]
  return (
    <div className="card" style={{marginBottom:8}}>
      <div className="card-hdr" style={{background:"rgba(224,104,40,.06)",
        borderBottom:isCollapsed?"none":"1px solid var(--bd)",
        borderRadius:isCollapsed?8:"8px 8px 0 0"}}>
        <span className={"bp-chevron"+(isCollapsed?"":" open")}
          onClick={props.onToggleCollapse}
          style={{color:"#e06828",flexShrink:0,fontSize:18}}>›</span>
        <div style={{display:"flex",flexDirection:"column",flexShrink:0}}>
          <button className="icon-btn sm" onClick={function(){props.onMove(-1)}} disabled={props.isFirst} style={{fontSize:11,height:20,width:28}}>▲</button>
          <button className="icon-btn sm" onClick={function(){props.onMove(1)}}  disabled={props.isLast}  style={{fontSize:11,height:20,width:28}}>▼</button>
        </div>
        <button className="icon-btn sm" onClick={function(){props.onChange({enabled:lyr.enabled===false})}}
          style={{color:lyr.enabled===false?"var(--mu)":"#e06828",fontSize:18}}>
          {lyr.enabled===false?"○":"●"}
        </button>
        <InlineRename value={lyr.name} fallback={"layer "+(props.totalLayers-li)}
          onChange={function(nw){props.onChange({name:nw})}}
          labelStyle={{fontSize:12,color:"#e06828",fontFamily:"'IBM Plex Mono',monospace",fontWeight:500}}/>
        <button
          onClick={function(){
            if(props.totalLayers<=1) return
            if(delArmed){props.onDel();setDelArmed(false)}
            else setDelArmed(true)
          }}
          onBlur={function(){setDelArmed(false)}}
          disabled={props.totalLayers<=1}
          style={{minHeight:32,padding:"0 8px",fontSize:delArmed?9:14,
            color:props.totalLayers<=1?"var(--bd)":delArmed?"var(--dng)":"var(--mu)",
            background:delArmed?"rgba(224,48,96,.12)":"none",
            border:delArmed?"1px solid var(--dng)":"none",
            borderRadius:6,minWidth:delArmed?56:32,
            cursor:props.totalLayers<=1?"default":"pointer",transition:"all .15s"}}>
          {props.totalLayers<=1?"×":delArmed?"confirm ×":"×"}
        </button>
      </div>
      {!isCollapsed && <TabBar tabs={lyrTabs} active={layerTab} onChange={setLayerTab}/>}
      {!isCollapsed && layerTab==="source" && (
        <div className="card-body">
          <NRef l="source" v={lyr.refId} nodes={props.nodes} selfId={props.selfId} iC={props.iC} mode="source"
            fn={function(v){props.onChange({refId:v})}}/>
        </div>
      )}
      {!isCollapsed && layerTab==="effects" && (
        <div style={{padding:10}}>
          <EfxStack
            key={(lyr.effectStack||[]).map(function(e){return e.id}).join(",")}
            stack={lyr.effectStack||[]} nodes={props.nodes} selfId={props.selfId}
            navPush={props.navPush} iC={props.iC}
            basePath={{slotKey:"layers["+li+"].effectStack", steps:[]}}
            onNavigate={props.onNavigate}
            onPromote={props.onPromote}
            onChange={function(es){props.onChange({effectStack:es})}}/>
        </div>
      )}
      {!isCollapsed && layerTab==="masks" && (
        <div style={{padding:10}}>
          <MaskStackPanel
            key={(lyr.maskStack||[]).map(function(m){return m.id}).join(",")}
            stack={lyr.maskStack||[]} nodes={props.nodes} selfId={props.selfId}
            navPush={props.navPush} iC={props.iC}
            basePath={{slotKey:"layers["+li+"].maskStack", steps:[]}}
            onNavigate={props.onNavigate}
            onPromote={props.onPromote}
            onChange={function(ms){props.onChange({maskStack:ms})}}/>
        </div>
      )}
      {!isCollapsed && layerTab==="layer" && (
          <div>
            <TabBar tabs={[{id:"pixels",label:"Pixels"},{id:"masks",label:"Masks"}]} active={lyBT} onChange={setLyBT}/>
            {lyBT==="pixels"?(
              <div className="card-body">
                <Se l="blend" v={lyr.blendMode||"normal"} opts={BMODES}
                  fn={function(v){props.onChange({blendMode:v})}}/>
                <Sl l="opacity" v={lyr.opacity==null?100:lyr.opacity} mn={0} mx={100} st={1}
                  fmt={function(v){return Math.round(v)+"%"}}
                  fn={function(v){props.onChange({opacity:v})}}/>
                {COMMUTATIVE_MODES[lyr.blendMode] && (
                  <div style={{fontSize:9,color:"var(--mu)",padding:"0 0 4px 84px",fontStyle:"italic"}}>
                    order has no effect in {lyr.blendMode} mode
                  </div>
                )}
              </div>
            ):(
              <div className="card-body">
                <div style={{fontSize:9,color:"var(--mu)",padding:"0 0 8px 84px",fontStyle:"italic",lineHeight:1.5}}>
                  How this layer's matte (source alpha × mask) composites over layers below.
                </div>
                <Se l="mode" v={lyr.maskMode||"add"} opts={MASK_BMODES}
                  fn={function(v){props.onChange({maskMode:v})}}/>
                <Sl l="amount" v={lyr.maskAmount==null?100:lyr.maskAmount} mn={0} mx={100} st={1}
                  fmt={function(v){return Math.round(v)+"%"}}
                  fn={function(v){props.onChange({maskAmount:v})}}/>
              </div>
            )}
          </div>
      )}
    </div>
  )
}

/* ─── LAYER COMP PROPS ─────────────────────────────────── */
function LayerCompProps(props) {
  var node=props.node, onChange=props.onChange, nodes=props.nodes
  var wrappedPromote=props.onPromote?function(tp){props.onPromote(Object.assign({nodeId:node.id},tp))}:null
  var navSt=useState([]); var navStack=navSt[0], setNavStack=navSt[1]
  // ALL hooks must be above any early return — Rules of Hooks
  var outTabSt=useState("effects"); var outTab=outTabSt[0], setOutTab=outTabSt[1]
  function navPush(item){setNavStack(function(s){return s.concat([item])})}
  function navPop(){setNavStack(function(s){return s.slice(0,-1)})}

  // Drill-down into layer effectStack → mask effects chain
  if(navStack.length>0){
    var top=navStack[navStack.length-1]
    var topSteps=(top.parentSteps||[]).concat(top.kind?[{kind:top.kind,id:top.id}]:top.steps||[])
    var drillTarget=resolvePath(node, top.slotKey, topSteps)
    if(!drillTarget){
      setTimeout(function(){setNavStack([])},0)
      return <div style={{padding:20,color:"var(--mu)",fontSize:11}}>Target gone — returning…</div>
    }
    function jumpTo(idx){setNavStack(function(s){return s.slice(0,idx)})}
    var childBasePath={slotKey:top.slotKey,steps:topSteps}
    var isEffectDrill=top.kind==="effect"
    var stackToShow=isEffectDrill?(drillTarget.maskStack||[]):(drillTarget.effectStack||[])
    return (
      <div style={{display:"flex",flexDirection:"column",minHeight:300}}>
        <div className="breadcrumb">
          <span className="bc-item" onClick={function(){setNavStack([])}}>{node.name}</span>
          {(function(){
            var sk=navStack[0]&&navStack[0].slotKey||""
            var ctx=sk.indexOf("inputA")>=0?"Input A":sk.indexOf("inputB")>=0?"Input B":
              sk==="outEfx"||sk==="outMask"?"Output":
              sk.indexOf("layers[")>=0?("Layer "+(parseInt((sk.match(/layers\[(\d+)\]/)||[,"?"])[1])+1)):
              sk==="effectStack"?"Effects":sk==="maskStack"?"Masks":null
            if(!ctx) return null
            return (<span style={{display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
              <span style={{color:"var(--mu)",margin:"0 2px"}}>›</span>
              <span className="bc-item" onClick={function(){setNavStack([])}} style={{color:"var(--di)"}}>
                {ctx}
              </span>
            </span>)
          })()}
          {navStack.map(function(n,i){
            var isCur=i===navStack.length-1
            return (
              <span key={i} style={{display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
                <span style={{color:"var(--mu)",margin:"0 2px"}}>›</span>
                <span className={"bc-item"+(isCur?" cur":"")}
                  onClick={function(){jumpTo(i)}}>
                  {n.label}
                </span>
              </span>
            )
          })}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:10}}>
          {isEffectDrill?(
            <MaskStackPanel
              key={stackToShow.map(function(m){return m.id}).join(",")}
              stack={stackToShow} nodes={nodes} selfId={node.id}
              navPush={navPush} iC={props.iC}
              basePath={childBasePath}
              onNavigate={props.onNavigate}
              onPromote={wrappedPromote}
              onChange={function(ms){
                var newNode=updatePath(node,top.slotKey,topSteps,function(efx){
                  return Object.assign({},efx,{maskStack:ms})
                })
                onChange(newNode)
              }}/>
          ):(
            <EfxStack
              key={stackToShow.map(function(e){return e.id}).join(",")}
              stack={stackToShow}
              nodes={nodes} selfId={node.id}
              navPush={navPush} iC={props.iC}
              basePath={childBasePath}
              onNavigate={props.onNavigate}
              onPromote={wrappedPromote}
              onChange={function(es){
                var newNode=updatePath(node, top.slotKey, topSteps, function(mask){
                  return Object.assign({},mask,{effectStack:es})
                })
                onChange(newNode)
              }}/>
          )}
        </div>
      </div>
    )
  }

  var layers = node.layers || []
  // Accordion collapse state per layer — lives in node._ui.layerCollapsed
  var lcpUi = node._ui || {}
  function setLcpUi(patch){ onChange(Object.assign({},node,{_ui:Object.assign({},lcpUi,patch)})) }
  var layerCollapsed = lcpUi.layerCollapsed || {}
  function toggleLayerCollapse(lid){
    var nc=Object.assign({},layerCollapsed); nc[lid]=!nc[lid]
    setLcpUi({layerCollapsed:nc})
  }
  function updLayer(idx, patch){
    var nl=layers.map(function(l,i){return i===idx?Object.assign({},l,patch):l})
    onChange(Object.assign({},node,{layers:nl,_ui:lcpUi}))
  }
  function addLayer(){
    onChange(Object.assign({},node,{layers:[mkLayer()].concat(layers)}))
  }
  function delLayer(idx){
    if(layers.length<=1) return
    onChange(Object.assign({},node,{layers:layers.filter(function(_,i){return i!==idx})}))
  }
  function moveLayer(idx, dir){
    var ni=Math.max(0,Math.min(layers.length-1,idx+dir))
    if(ni===idx) return
    var a=layers.slice(); var tmp=a[idx]; a[idx]=a[ni]; a[ni]=tmp
    onChange(Object.assign({},node,{layers:a}))
  }
  var outTabs=[
    {id:"effects",label:"Effects"+((node.outEfx||[]).length>0?" ("+(node.outEfx||[]).length+")":""),color:"ac"},
    {id:"masks",  label:"Masks"+((node.outMask||[]).length>0?" ("+(node.outMask||[]).length+")":""),color:"lv"},
  ]
  return (
    <div style={{padding:10,overflowY:"auto"}}>
      {/* Layers list — top of list = top layer (applied last) */}
      <div style={{marginBottom:10}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
          <span style={{fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,
            textTransform:"uppercase",letterSpacing:".1em",color:"#e06828",flex:1}}>Layers</span>
          <button className="ac" style={{fontSize:10,padding:"0 10px",minHeight:30}} onClick={addLayer}>+ layer</button>
        </div>
        {layers.map(function(lyr,li){
          return (
            <LayerCard key={lyr.id} lyr={lyr} li={li}
              isFirst={li===0} isLast={li===layers.length-1}
              totalLayers={layers.length}
              collapsed={!!layerCollapsed[lyr.id]}
              onToggleCollapse={function(){toggleLayerCollapse(lyr.id)}}
              nodes={nodes} selfId={node.id} iC={props.iC}
              navPush={navPush} onNavigate={props.onNavigate}
              onPromote={wrappedPromote}
              onMove={function(dir){moveLayer(li,dir)}}
              onDel={function(){delLayer(li)}}
              onChange={function(patch){updLayer(li,patch)}}/>
          )
        })}
      </div>

      {/* Output effects + masks */}
      <div className="card">
        <div className="card-hdr" style={{background:"rgba(176,96,240,.06)"}}>
          <span style={{flex:1,fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,
            textTransform:"uppercase",letterSpacing:".1em",color:"var(--lv)"}}>Output</span>
        </div>
        <TabBar tabs={outTabs} active={outTab} onChange={setOutTab}/>
        {outTab==="effects" && (
          <div style={{padding:10}}>
            <EfxStack stack={node.outEfx||[]} nodes={nodes} selfId={node.id} navPush={navPush}
              basePath={{slotKey:"outEfx", steps:[]}}
              onNavigate={props.onNavigate}
              onPromote={wrappedPromote}
              onChange={function(es){onChange(Object.assign({},node,{outEfx:es}))}}/>
          </div>
        )}
        {outTab==="masks" && (
          <div style={{padding:10}}>
            <MaskStackPanel stack={node.outMask||[]} nodes={nodes} selfId={node.id} navPush={navPush} iC={props.iC}
              basePath={{slotKey:"outMask", steps:[]}}
              onNavigate={props.onNavigate}
              onChange={function(ms){onChange(Object.assign({},node,{outMask:ms}))}}/>
          </div>
        )}
      </div>
    </div>
  )
}

function NodeDetailSheet(props) {
  // props: node, sec, open, onClose, onUpdate, onLoad, nodes, dispId, onDsp
  var sheetRef=useRef(null)
  var dragRef=useRef(null)  // {startY, startH, sheetEl}
  var heightSt=useState(null); var sheetH=heightSt[0], setSheetH=heightSt[1]

  function onGripDown(e){
    var el=sheetRef.current; if(!el)return
    e.preventDefault()
    var startY=e.touches?e.touches[0].clientY:e.clientY
    var startH=el.offsetHeight
    dragRef.current={startY:startY, startH:startH}
    function onMove(ev){
      if(!dragRef.current)return
      var y=ev.touches?ev.touches[0].clientY:ev.clientY
      var delta=dragRef.current.startY-y   // drag up = expand
      var newH=Math.max(120, Math.min(window.innerHeight*0.92, dragRef.current.startH+delta))
      setSheetH(newH)
    }
    function onUp(){
      dragRef.current=null
      document.removeEventListener("mousemove",onMove)
      document.removeEventListener("mouseup",onUp)
      document.removeEventListener("touchmove",onMove)
      document.removeEventListener("touchend",onUp)
    }
    document.addEventListener("mousemove",onMove,{passive:false})
    document.addEventListener("mouseup",onUp)
    document.addEventListener("touchmove",onMove,{passive:false})
    document.addEventListener("touchend",onUp)
  }

  if (!props.open || !props.node) return null
  var isDsp = props.dispId === props.node.id
  var sheetStyle = sheetH ? {maxHeight:sheetH+"px"} : {}
  return (
    <div className="sheet-scrim" onClick={function(e){ if(e.target===e.currentTarget) props.onClose() }}>
      <div className="node-sheet" ref={sheetRef} style={sheetStyle}>
        {/* Draggable grip pill — original visual design, drag to resize */}
        <div className="sheet-grip"
          style={{cursor:"row-resize",touchAction:"none",padding:"12px 40px",
            marginTop:-10,marginBottom:-6,display:"flex",justifyContent:"center"}}
          onMouseDown={onGripDown}
          onTouchStart={onGripDown}>
          <div style={{width:40,height:4,background:"var(--bd)",borderRadius:2}}/>
        </div>
        <div className="node-sheet-hdr">
          <span style={{flex:1,fontSize:13,fontFamily:"'IBM Plex Mono',monospace",
            color:"var(--tx)",fontWeight:500}}>
            {props.node.name}
          </span>
          {/* Display toggle — same ◎/◉ as the list item */}
          {props.onDsp && (function(){
            var nds=props.dispSlot&&props.dispSlot.nodeId===props.node.id?props.dispSlot:null
            var icon,col,tip
            if(nds){
              icon=nds.mode==="pixels"?"◉":"◈"
              col="var(--lv)"
              var slotLabel=nds.slot==="inputA"?"Input A":nds.slot==="inputB"?"Input B":"Output"
              tip=slotLabel+" · "+(nds.mode==="pixels"?"pixels":"mask")+" · tap for composite"
            } else if(isDsp){
              icon=props.dispMask?"◈":"◉"; col="var(--ac)"
              tip=props.dispMask?"output mask · tap off":"composite · tap for mask"
            } else { icon="◎"; col="var(--mu)"; tip="Set as live preview" }
            return <button className="icon-btn sm"
              onClick={function(){props.onDsp(props.node.id)}}
              style={{color:col,fontSize:20,marginRight:4}} title={tip}>{icon}</button>
          })()}
          <button className="ghost" style={{fontSize:20,minHeight:36}} onClick={props.onClose}>×</button>
        </div>
        <div className="node-sheet-scroll">
          {props.sec===1
            ? <CreatorProps node={props.node} onUpdate={props.onUpdate} onLoad={props.onLoad}/>
            : props.node.type==="stack"
              ? <StackProps node={props.node} onChange={props.onUpdate} nodes={props.nodes} iC={props.iC}
                  onPromote={props.onPromote} onExtract={props.onExtract} onNavigate={props.onNavigate}/>
              : props.node.type==="layers"
                ? <LayerCompProps node={props.node} onChange={props.onUpdate} nodes={props.nodes} iC={props.iC}
                    onPromote={props.onPromote} onNavigate={props.onNavigate}/>
                : props.node.type==="promoted"
                ? <PromotedProps node={props.node} nodes={props.nodes}/>
                : <BlenderProps node={props.node} onChange={props.onUpdate} nodes={props.nodes} iC={props.iC}
                    onPromote={props.onPromote} onExtract={props.onExtract} dspSlot={props.dspSlot} dispSlot={props.dispSlot} onDsp={props.onDsp} dispId={props.dispId} dispMask={props.dispMask} onNavigate={props.onNavigate}/>
          }
        </div>
      </div>
    </div>
  )
}

/* ─── STACK PROPS ──────────────────────────────────────── */
// A Stack node is a named, reusable effect or mask stack.
// Its UI is identical to the inline stack in a blender/stack input's tab.
function StackProps(props) {
  var node=props.node, onChange=props.onChange, nodes=props.nodes
  var wrappedPromote=props.onPromote?function(tp){props.onPromote(Object.assign({nodeId:node.id},tp))}:null
  var navSt=useState([]); var navStack=navSt[0], setNavStack=navSt[1]
  // Hoist hook above early return
  var unused=useState(null) // placeholder so hook count is stable

  function navPush(item){setNavStack(function(s){return s.concat([item])})}
  function navPop(){setNavStack(function(s){return s.slice(0,-1)})}

  // Drill-down for mask → effect editing (path-based, no stale closures)
  if(navStack.length>0){
    var top=navStack[navStack.length-1]
    var topStepsS=(top.parentSteps||[]).concat(top.kind?[{kind:top.kind,id:top.id}]:top.steps||[])
    var drillMask=resolvePath(node,top.slotKey,topStepsS)
    if(!drillMask){
      setTimeout(function(){setNavStack([])},0)
      return <div style={{padding:20,color:"var(--mu)",fontSize:11}}>Target no longer exists — returning…</div>
    }
    function jumpTo(idx){setNavStack(function(s){return s.slice(0,idx)})}
    return (
      <div style={{display:"flex",flexDirection:"column",minHeight:300}}>
        <div className="breadcrumb">
          <button className="ghost" style={{fontSize:13,padding:"0 6px 0 0",minHeight:32}} onClick={navPop}>Back</button>
          <span className="bc-item" onClick={function(){setNavStack([])}}
            style={{cursor:"pointer",textDecoration:"underline",textUnderlineOffset:2}}>{node.name}</span>
          {navStack.map(function(n,i){
            var isCur=i===navStack.length-1
            return (
              <span key={i} style={{display:"flex",alignItems:"center",gap:6}}>
                <span style={{color:"var(--mu)"}}>›</span>
                <span className={"bc-item"+(isCur?" cur":"")}
                  onClick={isCur?null:function(){jumpTo(i)}}
                  style={isCur?null:{cursor:"pointer",textDecoration:"underline",textUnderlineOffset:2}}>
                  {n.label}
                </span>
              </span>
            )
          })}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:10}}>
          <EfxStack
            key={(drillMask.effectStack||[]).map(function(e){return e.id}).join(",")}
            stack={drillMask.effectStack||[]} nodes={nodes} selfId={node.id}
            navPush={navPush}
            basePath={{slotKey:top.slotKey,steps:topStepsS}}
            onNavigate={props.onNavigate}
            onPromote={wrappedPromote}
            onChange={function(es){
              var newNode=updatePath(node,top.slotKey,topSteps,function(mask){
                return Object.assign({},mask,{effectStack:es})
              })
              onChange(newNode)
            }}/>
        </div>
      </div>
    )
  }

  var isEffect = node.stackType==="effect"
  var accentColor = isEffect ? "var(--ac)" : "var(--lv)"
  var accentBg    = isEffect ? "rgba(36,204,168,.06)" : "rgba(176,96,240,.06)"

  return (
    <div style={{padding:10}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
        <span style={{fontSize:9,padding:"1px 7px",borderRadius:4,
          background:isEffect?"rgba(36,204,168,.12)":"rgba(176,96,240,.12)",
          color:accentColor,
          border:isEffect?"1px solid rgba(36,204,168,.25)":"1px solid rgba(176,96,240,.3)"}}>
          {isEffect ? "Effect Stack" : "Mask Stack"}
        </span>
      </div>

      {/* Preview source — applies the stack to this source for live preview only */}
      <div className="card" style={{marginBottom:10}}>
        <div className="card-hdr" style={{background:"rgba(180,180,80,.06)"}}>
          <span style={{flex:1,fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,
            textTransform:"uppercase",letterSpacing:".1em",color:"#c8c040"}}>
            Preview source
          </span>
          <span style={{fontSize:9,color:"var(--mu)"}}>for preview only · not composited</span>
        </div>
        <div className="card-body">
          <NRef l="source" v={node.previewRefId||null} nodes={nodes} selfId={node.id} iC={props.iC}
            fn={function(v){onChange(Object.assign({},node,{previewRefId:v||null}))}}/>
          {node.previewRefId && (
            <div style={{fontSize:9,color:"var(--mu)",marginTop:6,lineHeight:1.5}}>
              Tap ◎ on this node to preview. {isEffect?"Effects":"The mask"} will be applied to the selected source. This reference is ignored during compositing.
            </div>
          )}
        </div>
      </div>

      {isEffect ? (
        <EfxStack
          stack={node.effectStack||[]}
          nodes={nodes}
          selfId={node.id}
          navPush={navPush}
          basePath={{slotKey:"effectStack",steps:[]}}
          onNavigate={props.onNavigate}
          onPromote={wrappedPromote}
          onChange={function(es){onChange(Object.assign({},node,{effectStack:es}))}}
        />
      ) : (
        <MaskStackPanel
          stack={node.maskStack||[]}
          nodes={nodes}
          selfId={node.id}
          navPush={navPush} iC={props.iC}
          basePath={{slotKey:"maskStack",steps:[]}}
          onNavigate={props.onNavigate}
          onChange={function(ms){onChange(Object.assign({},node,{maskStack:ms}))}}
        />
      )}
    </div>
  )
}

/* ─── PROMOTED PROPS ───────────────────────────────────── */
function PromotedProps(props) {
  var node=props.node
  var tp=node.tapPath||{}
  var srcNode=props.nodes.find(function(n){return n.id===tp.nodeId})
  return (
    <div style={{padding:12}}>
      <div className="card" style={{marginBottom:10}}>
        <div className="card-hdr"><span style={{fontSize:11,color:"#e8c840",fontFamily:"'Syne',sans-serif",fontWeight:700,textTransform:"uppercase",letterSpacing:".1em"}}>Promoted Tap</span></div>
        <div className="card-body" style={{fontSize:11,lineHeight:1.8}}>
          <div><span style={{color:"var(--mu)"}}>Source: </span><span style={{color:"var(--tx)"}}>{srcNode?srcNode.name:"unknown"}</span></div>
          <div><span style={{color:"var(--mu)"}}>Slot: </span><span style={{color:"var(--tx)"}}>{tp.slot||"—"}</span></div>
          <div><span style={{color:"var(--mu)"}}>Stack type: </span><span style={{color:"var(--tx)"}}>{tp.stackType||"—"}</span></div>
          <div><span style={{color:"var(--mu)"}}>After item: </span><span style={{color:"var(--tx)"}}>{tp.afterId||"—"}</span></div>
          <div><span style={{color:"var(--mu)"}}>Includes sub-stack: </span><span style={{color:"var(--tx)"}}>{tp.withSub?"yes":"no"}</span></div>
        </div>
      </div>
      <div style={{fontSize:10,color:"var(--mu)",textAlign:"center",padding:"4px 0"}}>Read-only tap on intermediate pipeline state. Delete this node to remove the tap (check no references point to it first).</div>
    </div>
  )
}

/* ─── SECTION (stickyHeader + sheet panel style) ─── */
function Section(props) {
  var items = props.nodes.filter(function(n){ return n.section===props.sec })
  var color = props.sec===1 ? "var(--gn)" : "var(--co)"
  var shdrCls = "shdr" + (props.stickyHeaders ? " sticky" : "")
  // In split mode (inScroll=false): section is a flex column that fills available
  // space with an internal scroll area. In unified/scroll mode (inScroll=true):
  // section expands to natural height and the parent container scrolls.
  var outerStyle = props.inScroll
    ? {borderBottom:"1px solid var(--bd)"}
    : {display:"flex",flexDirection:"column",flex:props.collapsed?"0 0 auto":1,
       overflow:"hidden",borderBottom:"1px solid var(--bd)"}
  var innerStyle = props.inScroll
    ? {}
    : {flex:1,overflowY:"auto",overflowX:"hidden"}
  return (
    <div style={outerStyle}>
      <div className={shdrCls} style={{cursor:"pointer"}} onClick={props.onToggle}>
        <span style={{fontSize:12,color:props.collapsed?"var(--mu)":"var(--di)"}}>{props.collapsed?"▶":"▼"}</span>
        <span className="slbl" style={{flex:1,color}}>{props.title}</span>
        <span style={{fontSize:11,color:"var(--mu)",marginRight:8}}>{items.length}</span>
        <div onClick={function(e){e.stopPropagation()}}><AddMenu sec={props.sec} onAdd={props.onAdd}/></div>
      </div>
      {!props.collapsed && (
        <div style={innerStyle}>
          {items.length===0 && <div className="empty">no items — tap + Add</div>}
          {/* Regular (non-promoted) items */}
          {items.filter(function(n){return n.type!=="promoted"}).map(function(node){
            var isSel = props.selId===node.id
            var isDsp = props.dispId===node.id
            return (
              <div key={node.id} id={"ni-"+node.id}>
                <NodeItem node={node} isSel={isSel} isDsp={isDsp}
                  isMaskDisp={!!(props.dispMask&&props.dispId===node.id)}
                  dispSlot={props.dispSlot}
                  onSel={function(id){ props.onSel(id===props.selId?null:id) }}
                  onDsp={props.onDsp} onDel={props.onDel}
                  onRen={function(name){ props.onRen(node.id,name) }}
                  onTog={props.onTog}/>
                {isSel && props.panelStyle!=="sheet" && (
                  <div style={{background:"rgba(4,4,18,.97)",borderBottom:"1px solid var(--bd)"}}>
                    {props.sec===1
                      ? <CreatorProps node={node} onUpdate={props.onUpd} onLoad={props.onLoad}/>
                      : node.type==="blender"
                        ? <BlenderProps node={node} onChange={props.onUpd} nodes={props.nodes} iC={props.iC} onExtract={props.onExtract} onPromote={props.onPromote} dspSlot={props.dspSlot} dispSlot={props.dispSlot} onDsp={props.onDsp} dispId={props.dispId} dispMask={props.dispMask} onNavigate={props.onNavigate}/>
                        : node.type==="layers"
                          ? <LayerCompProps node={node} onChange={props.onUpd} nodes={props.nodes} iC={props.iC} onPromote={props.onPromote} onNavigate={props.onNavigate}/>
                        : node.type==="stack"
                          ? <StackProps node={node} onChange={props.onUpd} nodes={props.nodes} iC={props.iC} onPromote={props.onPromote} onNavigate={props.onNavigate}/>
                          : null
                    }
                  </div>
                )}
              </div>
            )
          })}
          {/* Promoted taps — grouped */}
          {props.sec===2 && items.filter(function(n){return n.type==="promoted"}).length>0 && (
            <div>
              <div className="prom-group-hdr">
                <span style={{fontSize:9,color:"#e8c840",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"IBM Plex Mono,monospace"}}>Promoted taps</span>
                <span style={{fontSize:9,color:"var(--mu)",marginLeft:6}}>{items.filter(function(n){return n.type==="promoted"}).length}</span>
              </div>
              {items.filter(function(n){return n.type==="promoted"}).map(function(node){
                var isSel = props.selId===node.id
                var isDsp = props.dispId===node.id
                return (
                  <div key={node.id} id={"ni-"+node.id}>
                    <NodeItem node={node} isSel={isSel} isDsp={isDsp}
                      isMaskDisp={!!(props.dispMask&&props.dispId===node.id)}
                      dispSlot={props.dispSlot}
                      onSel={function(id){ props.onSel(id===props.selId?null:id) }}
                      onDsp={props.onDsp} onDel={props.onDel}
                      onRen={function(name){ props.onRen(node.id,name) }}
                      onTog={props.onTog}/>
                    {isSel && props.panelStyle!=="sheet" && (
                      <div style={{background:"rgba(4,4,18,.97)",borderBottom:"1px solid var(--bd)"}}>
                        <PromotedProps node={node} nodes={props.nodes}/>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

/* ─── UNIFIED SCROLL LAYOUT ───────────────────────────────── */
function UnifiedLayout(props) {
  // props: settings, sp, cvRef, active, sz, onResize, onExport, dragRef, appRef, s1Col, setS1Col, s2Col, setS2Col
  var s = props.settings
  var resizeRef = useRef(null)

  function onResizeHandleDown(e) {
    e.preventDefault()
    var el = resizeRef.current
    if (el) el.classList.add("drag")
    var app = props.appRef.current
    var tot = app ? app.offsetHeight : window.innerHeight
    var startY = e.clientY
    var startH = props.previewH

    function onMove(me) {
      var delta = me.clientY - startY
      var next = Math.max(15, Math.min(80, startH + (delta / tot) * 100))
      props.setPreviewH(next)
    }
    function onUp() {
      if (el) el.classList.remove("drag")
      document.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerup", onUp)
    }
    document.addEventListener("pointermove", onMove)
    document.addEventListener("pointerup", onUp)
  }

  var previewBlock = (
    <div style={{height:props.previewH+"vh",display:"flex",flexDirection:"column"}}>
      <props.LivePreviewCmp cvRef={props.cvRef} active={props.active} sz={props.sz}
        onResize={props.onResize} onExport={props.onExport}/>
    </div>
  )

  var resizeHandle = (
    <div ref={resizeRef} className="unified-resize-handle"
      onPointerDown={onResizeHandleDown}
      style={{userSelect:"none"}}/>
  )

  if (s.previewPinned) {
    // flex:1 + minHeight:0 fills the space left after HeaderBar without overflowing the viewport
    return (
      <div style={{flex:1,minHeight:0,display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{flexShrink:0}}>
          {previewBlock}
          {resizeHandle}
        </div>
        <div style={{flex:1,minHeight:0,overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
          <Section sec={1} title="§1 · Pixel Creators" {...props.sp}
            collapsed={props.s1Col} onToggle={function(){props.setS1Col(!props.s1Col)}}
            stickyHeaders={s.stickyHeaders} panelStyle={s.panelStyle} inScroll={true}/>
          <Section sec={2} title="§2 · Compositors" {...props.sp}
            collapsed={props.s2Col} onToggle={function(){props.setS2Col(!props.s2Col)}}
            stickyHeaders={s.stickyHeaders} panelStyle={s.panelStyle} inScroll={true}/>
          <div style={{height:24}}/>
        </div>
      </div>
    )
  }

  // Free scroll — everything in one column
  return (
    <div style={{flex:1,minHeight:0,overflowY:"auto",WebkitOverflowScrolling:"touch"}}>
      {previewBlock}
      {resizeHandle}
      <Section sec={1} title="§1 · Pixel Creators" {...props.sp}
        collapsed={props.s1Col} onToggle={function(){props.setS1Col(!props.s1Col)}}
        stickyHeaders={s.stickyHeaders} panelStyle={s.panelStyle} inScroll={true}/>
      <Section sec={2} title="§2 · Compositors" {...props.sp}
        collapsed={props.s2Col} onToggle={function(){props.setS2Col(!props.s2Col)}}
        stickyHeaders={s.stickyHeaders} panelStyle={s.panelStyle} inScroll={true}/>
      <div style={{height:24}}/>
    </div>
  )
}

/* ─── APP ROOT ──────────────────────────────────────────── */
function App() {
  var init = initState()
  var s1 = useState(init.nodes);  var nodes=s1[0],   setNodes=s1[1]
  var s2 = useState(init.dispId); var dispId=s2[0],  setDispId=s2[1]
  var s2m= useState(false);      var dispMask=s2m[0],setDispMask=s2m[1]
  var s2s= useState(null);       var dispSlot=s2s[0],setDispSlot=s2s[1]  // {nodeId,slot,mode}
  var s3 = useState(null);        var selId=s3[0],   setSelId=s3[1]
  var s4 = useState(36);          var leftW=s4[0],   setLeftW=s4[1]
  var s5 = useState(56);          var topH=s5[0],    setTopH=s5[1]
  var s6 = useState(false);       var s1Col=s6[0],   setS1Col=s6[1]
  var s7 = useState(false);       var s2Col=s7[0],   setS2Col=s7[1]
  var s8 = useState(false);       var isVert=s8[0],  setIsVert=s8[1]
  var s9 = useState(true);        var flipped=s9[0], setFlipped=s9[1]  // default: preview on top
  var s10= useState(false);       var leftFS=s10[0], setLeftFS=s10[1]
  var s11= useState(false);       var rightFS=s11[0],setRightFS=s11[1]
  var s12= useState(400);         var sz=s12[0],     setSz=s12[1]

  // Settings state
  var DEFAULTS = {viewMode:"split",previewPinned:true,stickyHeaders:true,panelStyle:"inline",previewH:44,isVert:false,flipped:true}
  var ss1 = useState(DEFAULTS)
  var settings=ss1[0], setSettings=ss1[1]
  var ss2 = useState(false); var settingsOpen=ss2[0], setSettingsOpen=ss2[1]
  var ss3 = useState(44);   var previewH=ss3[0],    setPreviewH=ss3[1]    // unified preview height %
  // Sheet-mode selected node
  var ss4 = useState(null);  var sheetNode=ss4[0],   setSheetNode=ss4[1]   // {node, sec}

  var appRef=useRef(null), cvRef=useRef(null), iC=useRef(new Map()), stRef=useRef({nodes:nodes,dispId:dispId})
  var histRef  = useRef([])        // undo ring: array of {nodes} snapshots
  var toastSt  = useState(false);  var toastOn=toastSt[0], setToastOn=toastSt[1]
  var toastTmr = useRef(null)

  function pushHistory(snapshot) {
    var ring = histRef.current
    ring.push(JSON.parse(JSON.stringify(snapshot)))
    if (ring.length > 30) ring.shift()
  }
  function showToast() {
    setToastOn(true)
    if (toastTmr.current) clearTimeout(toastTmr.current)
    toastTmr.current = setTimeout(function(){ setToastOn(false) }, 1600)
  }
  function doUndo() {
    var ring = histRef.current
    if (ring.length === 0) return
    var snap = ring.pop()
    setNodes(snap.nodes)
    showToast()
  }

  useEffect(function(){stRef.current={nodes:nodes,dispId:dispId,dispMask:dispMask,dispSlot:dispSlot}},[nodes,dispId,dispMask,dispSlot])

  // ── Persist settings via localStorage ───────────────────────────────────
  // Works on GitHub Pages, local dev, and any browser.
  // Wrapped in try/catch — localStorage throws in private mode with full quota.
  var STORAGE_KEY = 'nlics:ui-settings:v1'
  // v1 suffix means a new app version can change the key to reset stale settings

  // Load on mount — runs once, synchronously reads from localStorage
  useEffect(function(){
    try {
      var raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      var saved = JSON.parse(raw)
      // Always merge with DEFAULTS so new keys survive app updates
      var m = Object.assign({}, DEFAULTS, saved)
      setSettings({
        viewMode:      m.viewMode,
        previewPinned: m.previewPinned,
        stickyHeaders: m.stickyHeaders,
        panelStyle:    m.panelStyle,
      })
      if (m.previewH !== undefined) setPreviewH(m.previewH)
      if (m.isVert   !== undefined) setIsVert(m.isVert)
      if (m.flipped  !== undefined) setFlipped(m.flipped)
      if (m.leftW    !== undefined) setLeftW(m.leftW)
      if (m.topH     !== undefined) setTopH(m.topH)
    } catch(e) {}
  }, [])

  // Save whenever any persisted value changes
  useEffect(function(){
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        viewMode:      settings.viewMode,
        previewPinned: settings.previewPinned,
        stickyHeaders: settings.stickyHeaders,
        panelStyle:    settings.panelStyle,
        previewH:      previewH,
        isVert:        isVert,
        flipped:       flipped,
        leftW:         leftW,
        topH:          topH,
      }))
    } catch(e) {}
  }, [settings, previewH, isVert, flipped, leftW, topH])

  useEffect(function(){
    function onKey(e){
      if((e.ctrlKey||e.metaKey)&&e.key==="z"&&!e.shiftKey){
        e.preventDefault(); doUndo()
      }
    }
    document.addEventListener("keydown",onKey)
    return function(){document.removeEventListener("keydown",onKey)}
  },[])
  useEffect(function(){
    function check(){setIsVert(window.innerWidth<700)}
    check(); window.addEventListener("resize",check)
    return function(){window.removeEventListener("resize",check)}
  },[])
  // Immediate re-render on data changes
  useEffect(function(){
    if(cvRef.current) renderPipeline(cvRef.current,dispId,nodes,iC.current,dispMask,dispSlot)
  },[nodes,dispId,sz,dispMask,dispSlot])
  // Deferred re-render on layout changes — waits for browser reflow so
  // canvas has correct dimensions and cvRef is attached to the live canvas
  useEffect(function(){
    var t = setTimeout(function(){
      if(cvRef.current) renderPipeline(cvRef.current,dispId,nodes,iC.current,dispMask,dispSlot)
    }, 60)
    return function(){ clearTimeout(t) }
  },[flipped,isVert])

  function loadUrl(url){
    if(!url)return
    // Don't skip if already in cache but not yet loaded (blob URLs land here immediately)
    var existing=iC.current.get(url)
    if(existing&&existing.complete&&existing.naturalWidth)return  // already fully loaded
    var img=new Image()
    // blob: URLs are same-origin — crossOrigin header causes CORS failure on blobs
    if(!url.startsWith("blob:"))img.crossOrigin="anonymous"
    img.onload=function(){iC.current.set(url,img);var st=stRef.current;renderPipeline(cvRef.current,st.dispId,st.nodes,iC.current)}
    img.onerror=function(){iC.current.set(url,{complete:false,naturalWidth:0})}
    iC.current.set(url,img)
    img.src=url
  }
  function add(type,sec){pushHistory({nodes:nodes});var n=type==="blender"?mkBlender():type==="layers"?mkLayerComp():type==="stack-effect"?mkStack("effect"):type==="stack-mask"?mkStack("mask"):mkNode(type);n.section=sec;setNodes(function(p){return p.concat([n])});setSelId(n.id)}
  function del(id){pushHistory({nodes:nodes});setNodes(function(p){return p.filter(function(n){return n.id!==id})});if(selId===id)setSelId(null);if(dispId===id){setDispId(null);setDispMask(false);setDispSlot(null)}}
  function upd(u){
    setNodes(function(p){return p.map(function(n){return n.id===u.id?u:n})})
    // Keep sheet node in sync if it's the one being updated
    setSheetNode(function(sn){ return sn&&sn.node.id===u.id ? {node:u,sec:u.section} : sn })
  }
  function ren(id,name){pushHistory({nodes:nodes});setNodes(function(p){return p.map(function(n){return n.id===id?Object.assign({},n,{name:name}):n})})}
  function tog(id){setNodes(function(p){return p.map(function(n){return n.id===id?Object.assign({},n,{enabled:!n.enabled}):n})})}
  // Single display-state setter — mutual exclusivity enforced here.
  // All display changes go through this. Clears everything else first.
  function setDisplay(state){
    // state: null | {type:"node",id,mask:bool} | {type:"slot",nodeId,slot,mode}
    if(!state){
      setDispId(null); setDispMask(false); setDispSlot(null)
      return
    }
    if(state.type==="node"){
      setDispSlot(null)                    // clear any slot flag
      setDispId(state.id)
      setDispMask(state.mask||false)
    } else if(state.type==="slot"){
      setDispMask(false)                   // clear node mask mode
      setDispId(state.nodeId)              // keep node lit in the list
      setDispSlot({nodeId:state.nodeId,slot:state.slot,mode:state.mode})
    }
  }
  // Top-level node display button — cycles: off → composite → mask → off
  // If a sub-flag is driving, first tap takes top-level control (composite).
  function dsp(id){
    var subActive=dispSlot&&dispSlot.nodeId===id
    if(subActive){
      setDisplay({type:"node",id:id,mask:false})
    } else if(dispId===id){
      if(!dispMask) setDisplay({type:"node",id:id,mask:true})
      else setDisplay(null)
    } else {
      setDisplay({type:"node",id:id,mask:false})
    }
  }
  // Sub-flag (slot) display button — cycles: off → pixels → mask → off
  // Clearing all other flags is handled by setDisplay.
  function dspSlot(nodeId,slot){
    if(dispSlot&&dispSlot.nodeId===nodeId&&dispSlot.slot===slot){
      if(dispSlot.mode==="pixels") setDisplay({type:"slot",nodeId:nodeId,slot:slot,mode:"mask"})
      else setDisplay(null)
    } else {
      setDisplay({type:"slot",nodeId:nodeId,slot:slot,mode:"pixels"})
    }
  }
  function sel(id){setSelId(function(p){return p===id?null:id})}
  function doExport(fmt){var cv=cvRef.current;if(!cv)return;var a=document.createElement("a");a.download="nlics."+fmt;a.href=cv.toDataURL(fmt==="jpeg"?"image/jpeg":fmt==="webp"?"image/webp":"image/png",.95);a.click()}

  // Drag state — held in refs so pointer handlers don't need re-registration
  var dragRef  = useRef(null)  // {vert, start, pct0, onEnd}

  function handleDragStart(cx, cy, vert, onEnd) {
    var app = appRef.current; if (!app) return
    var tot = vert ? app.offsetHeight : app.offsetWidth
    dragRef.current = {
      vert: vert,
      start: vert ? cy : cx,
      pct0:  vert ? topH : leftW,
      tot:   tot,
      onEnd: onEnd
    }
  }
  function handleRootPointerMove(e) {
    var dr = dragRef.current; if (!dr) return
    var coord = dr.vert ? e.clientY : e.clientX
    var delta = coord - dr.start
    // When flipped+vert the preview is on top and controls at bottom.
    // topH drives the bottom (controls) panel — dragging divider down should
    // shrink controls (topH decreases), so we negate the delta.
    var sign  = (dr.vert && flipped) ? -1 : 1
    var next  = Math.max(15, Math.min(85, dr.pct0 + sign * (delta / dr.tot) * 100))
    if (dr.vert) setTopH(next); else setLeftW(next)
  }
  function handleRootPointerUp(e) {
    var dr = dragRef.current; if (!dr) return
    if (dr.onEnd) dr.onEnd()
    dragRef.current = null
  }

  var hDivHook = useDivider(false, handleDragStart)
  var vDivHook = useDivider(true,  handleDragStart)
  var divHook  = isVert ? vDivHook : hDivHook
  var active=nodes.find(function(n){return n.id===dispId})||null
  function selWithSheet(id) {
    var actual = id===selId ? null : id
    setSelId(actual)
    if (settings.panelStyle==="sheet" && actual) {
      var node = nodes.find(function(n){return n.id===actual})
      if (node) setSheetNode({node:node, sec:node.section})
    } else {
      setSheetNode(null)
    }
  }
  function handlePromote(tapPath) {
    var suggestName = "Tap " + (tapPath.stackType||"") + " " + (tapPath.afterId||"").slice(0,4)
    var name
    if(window.prompt) {
      var result = window.prompt("Name this tap point:", suggestName)
      if(result === null) return  // user cancelled — do nothing
      name = result.trim() || suggestName
    } else {
      name = suggestName
    }
    var pNode = mkPromoted(name, tapPath)
    pNode.section = 2
    pushHistory({nodes:nodes})
    setNodes(function(p){ return p.concat([pNode]) })
  }
  function handleExtract(info) {
    // info: {slot, slotObj, kind:"effect"|"mask", owner}
    var suggestName = (info.owner ? info.owner.name+" " : "") + (info.kind==="effect"?"Effect":"Mask")+" Stack"
    var name = window.prompt ? (window.prompt("Name this new Stack:", suggestName)||suggestName) : suggestName
    var newStack = mkStack(info.kind)
    newStack.name = name
    if(info.kind==="effect"){
      newStack.effectStack = (info.slotObj.effectStack||[]).slice()
    } else {
      newStack.maskStack = (info.slotObj.maskStack||[]).slice()
    }
    var stackRefItem = info.kind==="effect" ? mkEfxStackRef(newStack.id) : mkMaskStackRef(newStack.id)

    // Build the updated owner node from info.owner (current at call time)
    function applySlotUpdate(n) {
      if(!info.owner||n.id!==info.owner.id)return n
      var updated = Object.assign({},n)
      if(info.slot==="inputA"){
        updated.inputA = Object.assign({},n.inputA,{
          effectStack: info.kind==="effect" ? [stackRefItem] : n.inputA.effectStack,
          maskStack:   info.kind==="mask"   ? [stackRefItem] : n.inputA.maskStack,
        })
      } else if(info.slot==="inputB"){
        updated.inputB = Object.assign({},n.inputB,{
          effectStack: info.kind==="effect" ? [stackRefItem] : n.inputB.effectStack,
          maskStack:   info.kind==="mask"   ? [stackRefItem] : n.inputB.maskStack,
        })
      } else if(info.slot==="outEfx"){
        updated.outEfx = [stackRefItem]
      } else if(info.slot==="outMask"){
        updated.outMask = [stackRefItem]
      }
      return updated
    }
    var updatedOwner = applySlotUpdate(info.owner)

    pushHistory({nodes:nodes})
    setNodes(function(p){ return p.concat([newStack]).map(applySlotUpdate) })
    // Keep sheetNode in sync so sheet panel mode sees the change immediately
    setSheetNode(function(sn){
      return sn&&info.owner&&sn.node.id===info.owner.id
        ? {node:updatedOwner, sec:info.owner.section} : sn
    })
  }

  function handleNavigate(id) {
    var node = nodes.find(function(n){return n.id===id})
    if (!node) return
    setSelId(id)
    if (settings.panelStyle === "sheet") setSheetNode({node: node, sec: node.section})
    if (node.section === 1) setS1Col(false)
    else setS2Col(false)
    // Scroll to the node in the list after state has updated and panel has expanded
    setTimeout(function(){
      var el=document.getElementById("ni-"+id)
      if(el) el.scrollIntoView({behavior:"smooth",block:"nearest"})
    }, 120)
  }

  var sp={nodes:nodes,selId:selId,dispId:dispId,dispMask:dispMask,dispSlot:dispSlot,dspSlot:dspSlot,
    onSel:selWithSheet,onDsp:dsp,onDel:del,onAdd:add,onUpd:upd,onLoad:loadUrl,onRen:ren,onTog:tog,
    panelStyle:settings.panelStyle,onPromote:handlePromote,onExtract:handleExtract,onNavigate:handleNavigate,
    iC:iC}

  var leftBoxStyle = Object.assign(
    {display:rightFS?"none":"flex",flexDirection:"column",background:"var(--pn)"},
    leftFS ? {position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:200,width:"100vw",height:"100vh"}
    : isVert ? {height:topH+"%",flexShrink:0,overflow:"hidden"}
    : {width:leftW+"%",flexShrink:0,overflow:"hidden"}
  )
  var rightBoxStyle = Object.assign(
    {display:leftFS?"none":"flex",flexDirection:"column",flex:1,overflow:"hidden"},
    rightFS ? {position:"fixed",top:0,left:0,right:0,bottom:0,zIndex:200} : {}
  )

  function handleResize(s){setSz(s);setTimeout(function(){var st=stRef.current;renderPipeline(cvRef.current,st.dispId,st.nodes,iC.current)},30)}

  var anyFS = leftFS || rightFS

  // Header bar — shared across both layout modes
  function HeaderBar(hProps) {
    return (
      <div style={{display:"flex",alignItems:"center",padding:"8px 12px",gap:8,background:"var(--bg)",borderBottom:"1px solid var(--bd)",flexShrink:0}}>
        <span style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:800,color:"var(--ac)",letterSpacing:".2em"}}>NLICS</span>
        <span style={{fontSize:7,color:"var(--mu)",marginTop:1}}>Non-Linear Image Compositing</span>
        <span style={{flex:1}}/>
        <button className="hico" title="Layout settings" onClick={function(){setSettingsOpen(true)}}>⚙</button>
        {hProps.showExpand && <button className={"hico"+(leftFS?" exit":"")} onClick={function(){setLeftFS(!leftFS)}}>{leftFS?"⊠":"⊞"}</button>}
      </div>
    )
  }
  function PreviewBar(pProps) {
    return (
      <div style={{display:"flex",alignItems:"center",padding:"8px 12px",gap:8,background:"var(--bg)",borderBottom:"1px solid var(--bd)",flexShrink:0}}>
        <span className="slbl" style={{fontSize:10,color:"var(--di)"}}>Preview</span>
        {active
          ? <span style={{fontSize:9,padding:"2px 8px",borderRadius:4,background:"rgba(176,96,240,.14)",color:"#c87aff",border:"1px solid rgba(176,96,240,.28)"}}>◉ {active.name}</span>
          : <span style={{fontSize:9,color:"var(--mu)"}}>none selected</span>}
        <span style={{flex:1}}/>
        <button className={"hico"+(rightFS?" exit":"")} onClick={function(){setRightFS(!rightFS)}}>{rightFS?"⊠":"⊡"}</button>
      </div>
    )
  }

  return (
    <div ref={appRef} onPointerMove={handleRootPointerMove} onPointerUp={handleRootPointerUp}
      style={{display:settings.viewMode==="unified"?"block":"flex",flexDirection:isVert?"column":"row",height:"100vh",width:"100vw",overflow:"hidden",background:"var(--bg)",fontFamily:"'IBM Plex Mono','Courier New',monospace",fontSize:12,color:"var(--tx)"}}>
      <StyleInjector />

      <SettingsSheet open={settingsOpen} onClose={function(){setSettingsOpen(false)}}
        settings={settings} onSettings={setSettings}
        isVert={isVert} onIsVert={setIsVert}
        flipped={flipped} onFlipped={setFlipped}/>

      <NodeDetailSheet
        open={settings.panelStyle==="sheet" && sheetNode!==null}
        node={sheetNode?sheetNode.node:null}
        sec={sheetNode?sheetNode.sec:null}
        onClose={function(){setSheetNode(null);setSelId(null)}}
        onUpdate={upd} onLoad={loadUrl} nodes={nodes} iC={iC}
        dispId={dispId} dispMask={dispMask} dispSlot={dispSlot} onDsp={dsp} dspSlot={dspSlot}
        onPromote={handlePromote} onExtract={handleExtract} onNavigate={handleNavigate}/>

      {anyFS && (
        <button className="fs-escape" onClick={function(){setLeftFS(false);setRightFS(false)}}>
          ⊠ exit fullscreen
        </button>
      )}

      {settings.viewMode==="unified" ? (
        <div style={{height:"100vh",display:"flex",flexDirection:"column"}}>
          <HeaderBar showExpand={false}/>
          <UnifiedLayout
            settings={settings}
            sp={sp}
            cvRef={cvRef}
            active={active}
            sz={sz}
            previewH={previewH}
            setPreviewH={setPreviewH}
            onResize={handleResize}
            onExport={doExport}
            appRef={appRef}
            s1Col={s1Col} setS1Col={setS1Col}
            s2Col={s2Col} setS2Col={setS2Col}
            LivePreviewCmp={LivePreview}
          />
        </div>
      ) : (
        <div style={{display:"contents"}}>
          <div style={flipped&&isVert ? rightBoxStyle : leftBoxStyle}>
            {flipped&&isVert
              ? <PreviewBar/>
              : <HeaderBar showExpand={true}/>
            }
            {flipped&&isVert
              ? <LivePreview cvRef={cvRef} active={active} sz={sz} onResize={handleResize} onExport={doExport}/>
              : <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",position:"relative"}}>
                  <Section sec={1} title="§1 · Pixel Creators" {...sp}
                    collapsed={s1Col} onToggle={function(){setS1Col(!s1Col)}}
                    stickyHeaders={false} panelStyle={settings.panelStyle} inScroll={false}/>
                  <Section sec={2} title="§2 · Compositors" {...sp}
                    collapsed={s2Col} onToggle={function(){setS2Col(!s2Col)}}
                    stickyHeaders={false} panelStyle={settings.panelStyle} inScroll={false}/>
                  {settings.panelStyle==="sheet"&&sheetNode&&(
                    <div style={{position:"absolute",inset:0,background:"rgba(4,4,18,.65)",
                      zIndex:650,pointerEvents:"auto"}}
                      onClick={function(){setSheetNode(null);setSelId(null)}}/>
                  )}
                </div>
            }
          </div>

          <div ref={divHook.ref} onPointerDown={divHook.onPointerDown} className={isVert?"divv":"divh"} style={{userSelect:"none"}}/>

          <div style={flipped&&isVert ? leftBoxStyle : rightBoxStyle}>
            {flipped&&isVert
              ? <HeaderBar showExpand={true}/>
              : <PreviewBar/>
            }
            {flipped&&isVert
              ? <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",position:"relative"}}>
                  <Section sec={1} title="§1 · Pixel Creators" {...sp}
                    collapsed={s1Col} onToggle={function(){setS1Col(!s1Col)}}
                    stickyHeaders={false} panelStyle={settings.panelStyle} inScroll={false}/>
                  <Section sec={2} title="§2 · Compositors" {...sp}
                    collapsed={s2Col} onToggle={function(){setS2Col(!s2Col)}}
                    stickyHeaders={false} panelStyle={settings.panelStyle} inScroll={false}/>
                  {settings.panelStyle==="sheet"&&sheetNode&&(
                    <div style={{position:"absolute",inset:0,background:"rgba(4,4,18,.65)",
                      zIndex:650,pointerEvents:"auto"}}
                      onClick={function(){setSheetNode(null);setSelId(null)}}/>
                  )}
                </div>
              : <LivePreview cvRef={cvRef} active={active} sz={sz} onResize={handleResize} onExport={doExport}/>
            }
          </div>
        </div>
      )}

      <div className={"undo-toast"+(toastOn?" show":"")}>↩ undo restored</div>
    </div>
  )
}


/* ─── ERROR BOUNDARY ────────────────────────────────────── */
class ErrorBoundary extends Component {
  constructor(p){ super(p); this.state = { err: null, info: null } }
  static getDerivedStateFromError(err){ return { err: err } }
  componentDidCatch(err, info){
    this.setState({ err: err, info: info })
    if(typeof console!=="undefined"&&console.error)console.error("NLICS boundary:", err, info)
  }
  render(){
    if(this.state.err){
      return (
        <div style={{minHeight:"100vh",padding:20,background:"#05050d",color:"#e0a0b0",
          fontFamily:"'IBM Plex Mono',monospace",fontSize:12,lineHeight:1.5}}>
          <div style={{fontSize:16,color:"#e03060",marginBottom:10,fontWeight:700}}>NLICS crashed</div>
          <div style={{marginBottom:10,color:"#c8d0e8"}}>
            {String(this.state.err&&this.state.err.message||this.state.err)}
          </div>
          {this.state.info&&this.state.info.componentStack&&(
            <pre style={{fontSize:10,color:"#8090c0",whiteSpace:"pre-wrap",
              background:"#0d0d22",padding:10,borderRadius:6,maxHeight:"40vh",overflow:"auto"}}>
              {this.state.info.componentStack}
            </pre>
          )}
          <button onClick={function(){location.reload()}}
            style={{marginTop:16,padding:"10px 20px",background:"#24cca8",border:"none",
            borderRadius:6,color:"#040412",cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:700}}>
            Reload
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default function AppWithBoundary(){
  return <ErrorBoundary><App/></ErrorBoundary>
}
