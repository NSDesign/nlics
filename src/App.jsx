import { useState, useEffect, useRef } from "react"


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
.bc-item{font-size:10px;color:var(--di);font-family:'IBM Plex Mono',monospace;}
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
.drop-menu{position:absolute;top:100%;left:0;z-index:300;margin-top:4px;background:#111128;border:1px solid var(--bd);border-radius:8px;min-width:180px;box-shadow:0 10px 32px rgba(0,0,0,.8);overflow:hidden;}
.drop-item{padding:12px 16px;cursor:pointer;font-size:12px;color:var(--tx);border-bottom:1px solid #161630;transition:background .08s;font-family:'IBM Plex Mono',monospace;}
.drop-item:last-child{border-bottom:none;}
.drop-item:hover,.drop-item:active{background:var(--sl);color:var(--ac);}
.drop-grp{padding:8px 16px 4px;font-size:9px;color:var(--mu);text-transform:uppercase;letter-spacing:.1em;pointer-events:none;}
.eff-menu{position:absolute;bottom:100%;left:0;right:0;z-index:400;margin-bottom:4px;background:#111128;border:1px solid var(--bd);border-radius:8px;box-shadow:0 -8px 28px rgba(0,0,0,.75);overflow:hidden;max-height:320px;overflow-y:auto;}
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
/* Promoted group in node list */
.prom-group-hdr{display:flex;align-items:center;gap:6px;padding:6px 12px;background:rgba(220,180,40,.06);border-top:1px solid rgba(220,180,40,.18);border-bottom:1px solid rgba(220,180,40,.18);}
/* ── Settings sheet ── */
.sheet-scrim{position:fixed;inset:0;background:rgba(0,0,0,.72);z-index:700;display:flex;flex-direction:column;justify-content:flex-end;}
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
.node-sheet{position:fixed;bottom:0;left:0;right:0;z-index:600;background:var(--pn);border-radius:18px 18px 0 0;max-height:82vh;display:flex;flex-direction:column;box-shadow:0 -8px 40px rgba(0,0,0,.6);}
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
  exposure:   ["stops",-3,3,.1,1],
  levels:     ["gamma",0.1,4,.05,1],
  posterize:  ["levels",2,16,1,4]
}
// Curves effect has no single inline-slider param (uses in/out point pairs), handled separately
var ECFG_CURVES_ONLY = ["curves"]
var ETYPES = Object.keys(ECFG)
var CPROPS = {
  solid:    { color:"#2244cc", alpha:1 },
  shape:    { shapeType:"ellipse", x:.5, y:.5, sz:.6, rot:0, fill:"#ffffff", stroke:"#000000", strokeW:0, pts:5, innerR:.45, sides:5, ringR:.62, alpha:1 },
  gradient: { gType:"radial", c1:"#ff2277", c2:"#000022", s1:0, s2:1, angle:90, cx:.5, cy:.5, r:.7, sa:0, alpha:1 },
  noise:    { nType:"perlin", c1:"#ffffff", c2:"#000000", scale:.04, oct:4, seed:1, alpha:1 },
  pattern:  { pType:"checkerboard", c1:"#ffffff", c2:"#000000", scale:.1, sw:.1, angle:0, dr:.03, ds:.1, alpha:1 },
  image:    { url:"", fit:"contain", alpha:1 }
}

var _uid = 100
function uid() { return "n" + (_uid++) }
function mkEfx(t) {
  var cfg=ECFG[t]
  var params=cfg ? { [cfg[0]]:cfg[4] } : {}
  if(t==="curves")    params={inBlack:0,inWhite:255,outBlack:0,outWhite:255,sCurve:0}
  if(t==="transform") params={tx:0,ty:0,rot:0,su:1,sx:1,sy:1,skX:0,skY:0}
  return { id:uid(), type:t, enabled:true, params:params, opacity:100, blendMode:"normal", maskStack:[] }
}
function mkMask() { return { id:uid(), refId:null, channel:"luminosity", invert:false, strength:1, opacity:100, blendMode:"multiply", effectStack:[], enabled:true } }
function mkSlot() { return { refId:null, effectStack:[], maskStack:[] } }
function mkBlender() { return { id:uid(), name:"Blender "+(_uid-100), type:"blender", section:2, enabled:true, inputA:mkSlot(), inputB:mkSlot(), mode:"screen", amount:100, switched:false, outEfx:[], outMask:[] } }
function mkNode(t) { return { id:uid(), name:t+" "+(_uid-100), type:t, section:1, enabled:true, props:Object.assign({},CPROPS[t]) } }

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
  return { id:uid(), type:"__stackref__", stackRefId:stackRefId, enabled:true, opacity:100, blendMode:"normal" }
}
function mkMaskStackRef(stackRefId) {
  return { id:uid(), type:"__stackref__", stackRefId:stackRefId, enabled:true, opacity:100, blendMode:"multiply" }
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
  ctx.save();ctx.globalAlpha=alpha;var r=sz*Math.min(w,h)/2
  ctx.translate(x*w,y*h);ctx.rotate(rot*Math.PI/180);ctx.beginPath()
  if(s==="ellipse")ctx.ellipse(0,0,r,r,0,0,Math.PI*2)
  else if(s==="rectangle")ctx.rect(-r,-r,r*2,r*2)
  else if(s==="polygon"){for(var i=0;i<sides;i++){var a=(i*2*Math.PI/sides)-Math.PI/2;i===0?ctx.moveTo(Math.cos(a)*r,Math.sin(a)*r):ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r)}ctx.closePath()}
  else if(s==="star"){var ir=r*innerR;for(var j=0;j<pts*2;j++){var a2=(j*Math.PI/pts)-Math.PI/2,rr=j%2===0?r:ir;j===0?ctx.moveTo(Math.cos(a2)*rr,Math.sin(a2)*rr):ctx.lineTo(Math.cos(a2)*rr,Math.sin(a2)*rr)}ctx.closePath()}
  else if(s==="ring"){ctx.arc(0,0,r,0,Math.PI*2);ctx.moveTo(r*ringR,0);ctx.arc(0,0,r*ringR,0,Math.PI*2,true)}
  if(fill&&fill!=="none"){ctx.fillStyle=fill;ctx.fill("evenodd")}
  if(strokeW>0){ctx.strokeStyle=stroke;ctx.lineWidth=strokeW;ctx.stroke()}
  ctx.restore()
}
function gGrad(ctx,p,w,h) {
  var gType=p.gType||"radial",c1=p.c1||"#f03",c2=p.c2||"#00f",s1=p.s1||0,s2=p.s2||1
  var angle=p.angle||90,cx=p.cx||.5,cy=p.cy||.5,r=p.r||.7,sa=p.sa||0,alpha=p.alpha==null?1:p.alpha
  ctx.save();ctx.globalAlpha=alpha;var g
  try {
    if(gType==="linear"){var rd=angle*Math.PI/180,d=Math.max(w,h)/2;g=ctx.createLinearGradient(w/2-Math.cos(rd)*d,h/2-Math.sin(rd)*d,w/2+Math.cos(rd)*d,h/2+Math.sin(rd)*d)}
    else if(gType==="radial")g=ctx.createRadialGradient(cx*w,cy*h,0,cx*w,cy*h,r*Math.max(w,h))
    else g=ctx.createConicGradient(sa*Math.PI/180,cx*w,cy*h)
    g.addColorStop(Math.max(0,Math.min(s1,s2-.001)),c1);g.addColorStop(Math.min(1,Math.max(s2,s1+.001)),c2);ctx.fillStyle=g
  } catch(e){ctx.fillStyle=c1}
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
      d[ii]=r;d[ii+1]=g;d[ii+2]=b;d[ii+3]=255

    } else if(pType==="stripes"){
      var pj=px*Math.cos(rad)+py*Math.sin(rad)
      var t2=((pj%(sW*2))+sW*2)%(sW*2)<sW?0:1
      r=t2===0?CA.r:CB.r; g=t2===0?CA.g:CB.g; b=t2===0?CA.b:CB.b
      d[ii]=r;d[ii+1]=g;d[ii+2]=b;d[ii+3]=255

    } else if(pType==="dots"){
      // Anti-aliased dots: blend at the 1px boundary using distance from edge
      var gx=((px%dS)+dS)%dS-dS/2
      var gy=((py%dS)+dS)%dS-dS/2
      var dist=Math.sqrt(gx*gx+gy*gy)
      // t=0 inside dot (CA), t=1 outside (CB). Feather 1px at edge.
      var blend=Math.max(0,Math.min(1,dist-dR+0.5))
      r=Math.round(CA.r*(1-blend)+CB.r*blend)
      g=Math.round(CA.g*(1-blend)+CB.g*blend)
      b=Math.round(CA.b*(1-blend)+CB.b*blend)
      d[ii]=r;d[ii+1]=g;d[ii+2]=b;d[ii+3]=255
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
  for(var mi=0;mi<stack.length;mi++){
    var mk=stack[mi];if(mk.enabled===false)continue
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
    var visMk=new Set(vis); visMk.add(mk.refId)
    var cv=compAny(mk.refId,cmap,cache,iC,w,h,visMk);if(!cv)continue;any=true
    if(mk.effectStack&&mk.effectStack.length>0){cv=clCv(cv,w,h);applyEfxStk(cv.getContext("2d"),mk.effectStack,cmap,cache,iC,w,h,visMk)}
    var src=clCv(cv,w,h).getContext("2d").getImageData(0,0,w,h).data,f=(mk.opacity==null?100:mk.opacity)/100
    for(var ii=0;ii<w*h;ii++){
      var pi=ii*4,v
      if(mk.channel==="R")v=src[pi]/255
      else if(mk.channel==="G")v=src[pi+1]/255
      else if(mk.channel==="B")v=src[pi+2]/255
      else if(mk.channel==="A")v=src[pi+3]/255
      else v=(.299*src[pi]+.587*src[pi+1]+.114*src[pi+2])/255
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
  for(var ei=0;ei<stack.length;ei++){
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
function resolveSlot(slot,cmap,cache,iC,w,h,vis) {
  if(!slot||!slot.refId||vis.has(slot.refId))return null
  if(slot.enabled===false)return null
  var base=compAny(slot.refId,cmap,cache,iC,w,h,new Set(vis));if(!base)return null
  var cv=clCv(base,w,h),ctx=cv.getContext("2d")
  if(slot.effectStack&&slot.effectStack.length>0)applyEfxStk(ctx,slot.effectStack,cmap,cache,iC,w,h,new Set(vis))
  if(slot.maskStack&&slot.maskStack.length>0)maskToAlpha(ctx,slot.maskStack,cmap,cache,iC,w,h,new Set(vis))
  return cv
}
function blendCv(ctx,srcCv,mode,amount,w,h) {
  if(mode==="subtract"||mode==="divide"){
    var base=ctx.getImageData(0,0,w,h),src=clCv(srcCv,w,h).getContext("2d").getImageData(0,0,w,h).data,B=base.data,f=amount/100
    for(var i=0;i<B.length;i+=4){
      if(mode==="subtract"){B[i]=Math.max(0,B[i]-src[i]*f);B[i+1]=Math.max(0,B[i+1]-src[i+1]*f);B[i+2]=Math.max(0,B[i+2]-src[i+2]*f)}
      else{B[i]=src[i]>0?Math.min(255,B[i]/(src[i]/255)*f+B[i]*(1-f)):B[i];B[i+1]=src[i+1]>0?Math.min(255,B[i+1]/(src[i+1]/255)*f+B[i+1]*(1-f)):B[i+1];B[i+2]=src[i+2]>0?Math.min(255,B[i+2]/(src[i+2]/255)*f+B[i+2]*(1-f)):B[i+2]}
    }
    ctx.putImageData(base,0,0)
  }else{ctx.save();ctx.globalAlpha=amount/100;ctx.globalCompositeOperation=BM[mode]||"source-over";ctx.drawImage(srcCv,0,0);ctx.restore()}
}
// Partially evaluate an effect stack up to and including a given effect id.
// withSub: if true, also apply that effect's own maskStack (for promoted taps that include the masked result).
function applyEfxStkUpTo(ctx,stack,afterId,withSub,cmap,cache,iC,w,h,vis) {
  for(var ei=0;ei<stack.length;ei++){
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
    if(efx.id===afterId)break
  }
}
// Partially evaluate a mask stack up to and including a given mask id.
// Returns the Float32Array of mask values at that point.
function compMasksUpTo(stack,afterId,withSub,cmap,cache,iC,w,h,vis){
  var out=new Float32Array(w*h).fill(1),any=false
  for(var mi=0;mi<stack.length;mi++){
    var mk=stack[mi];if(mk.enabled===false||!mk.refId||vis.has(mk.refId))continue
    var cv=compAny(mk.refId,cmap,cache,iC,w,h,new Set(vis));if(!cv)continue;any=true
    var useSub = withSub || mk.id!==afterId
    if(useSub&&mk.effectStack&&mk.effectStack.length>0){cv=clCv(cv,w,h);applyEfxStk(cv.getContext("2d"),mk.effectStack,cmap,cache,iC,w,h,new Set(vis))}
    var src=clCv(cv,w,h).getContext("2d").getImageData(0,0,w,h).data,f=(mk.opacity==null?100:mk.opacity)/100
    for(var ii=0;ii<w*h;ii++){
      var pi=ii*4,v
      if(mk.channel==="R")v=src[pi]/255
      else if(mk.channel==="G")v=src[pi+1]/255
      else if(mk.channel==="B")v=src[pi+2]/255
      else if(mk.channel==="A")v=src[pi+3]/255
      else v=(.299*src[pi]+.587*src[pi+1]+.114*src[pi+2])/255
      var mv2=(mk.invert?1-v:v)*(mk.strength==null?1:mk.strength)*f
      if(mk.blendMode==="screen")out[ii]=1-(1-out[ii])*(1-mv2)
      else if(mk.blendMode==="add")out[ii]=Math.min(1,out[ii]+mv2)
      else if(mk.blendMode==="subtract")out[ii]=Math.max(0,out[ii]-mv2)
      else if(mk.blendMode==="normal")out[ii]=mv2
      else out[ii]*=mv2
    }
    if(mk.id===afterId)break
  }
  return any?out:null
}
// Resolve a tap path for a promoted node — partially evaluates the chain
// and returns the canvas state at the exact promoted point.
function compPromoted(n,cmap,cache,iC,w,h,vis){
  var tp=n.tapPath; if(!tp||!tp.nodeId||vis.has(tp.nodeId))return null
  var srcNode=cmap.get(tp.nodeId); if(!srcNode||!srcNode.enabled)return null
  // Get the slot to work from
  var slot
  if(tp.slot==="inputA")slot=srcNode.inputA
  else if(tp.slot==="inputB")slot=srcNode.inputB
  else if(tp.slot&&tp.slot.indexOf("input_")===0){
    var idx=parseInt(tp.slot.slice(6))
    slot=srcNode.inputs&&srcNode.inputs[idx]
  }
  else if(tp.slot==="outEfx"||tp.slot==="outMask"){
    // Start from the fully composited output of the source node, then partially apply out stack
    var baseOut=compAny(tp.nodeId,cmap,cache,iC,w,h,new Set(vis))
    if(!baseOut)return null
    var cv=clCv(baseOut,w,h),ctx=cv.getContext("2d")
    if(tp.slot==="outEfx"&&srcNode.outEfx&&srcNode.outEfx.length>0){
      applyEfxStkUpTo(ctx,srcNode.outEfx,tp.afterId,tp.withSub,cmap,cache,iC,w,h,new Set(vis))
    }else if(tp.slot==="outMask"&&srcNode.outMask&&srcNode.outMask.length>0){
      var mv=compMasksUpTo(srcNode.outMask,tp.afterId,tp.withSub,cmap,cache,iC,w,h,new Set(vis))
      if(mv){var id=ctx.getImageData(0,0,w,h);for(var i=0;i<w*h;i++)id.data[i*4+3]=Math.round(id.data[i*4+3]*mv[i]);ctx.putImageData(id,0,0)}
    }
    return cv
  }
  if(!slot||!slot.refId||vis.has(slot.refId))return null
  // Resolve the base source for this slot
  var base=compAny(slot.refId,cmap,cache,iC,w,h,new Set(vis));if(!base)return null
  var cv2=clCv(base,w,h),ctx2=cv2.getContext("2d")
  if(tp.stackType==="effect"&&slot.effectStack&&slot.effectStack.length>0){
    applyEfxStkUpTo(ctx2,slot.effectStack,tp.afterId,tp.withSub,cmap,cache,iC,w,h,new Set(vis))
  }else if(tp.stackType==="mask"&&slot.maskStack&&slot.maskStack.length>0){
    var mv2=compMasksUpTo(slot.maskStack,tp.afterId,tp.withSub,cmap,cache,iC,w,h,new Set(vis))
    if(mv2){var id2=ctx2.getImageData(0,0,w,h);for(var j=0;j<w*h;j++)id2.data[j*4+3]=Math.round(id2.data[j*4+3]*mv2[j]);ctx2.putImageData(id2,0,0)}
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
    if(!n.previewRefId||vis.has(n.previewRefId)){vis.delete(id);return null}
    var spVis=new Set(vis);spVis.add(n.previewRefId)
    var previewBase=compAny(n.previewRefId,cmap,cache,iC,w,h,spVis)
    if(!previewBase){vis.delete(id);return null}
    var pcv=clCv(previewBase,w,h),pctx=pcv.getContext("2d")
    if(n.stackType==="effect"&&(n.effectStack||[]).length>0){
      applyEfxStk(pctx,n.effectStack,cmap,cache,iC,w,h,spVis)
    } else if(n.stackType==="mask"&&(n.maskStack||[]).length>0){
      // Mask stack: render as pure grayscale (white=fully unmasked, black=fully masked)
      // This matches how all professional compositing tools display masks/mattes
      var mv=compMasks(n.maskStack,cmap,cache,iC,w,h,spVis)
      var gid=pctx.createImageData(w,h)
      if(mv){
        for(var gi=0;gi<w*h;gi++){
          var gv=Math.round(mv[gi]*255)
          gid.data[gi*4]=gv; gid.data[gi*4+1]=gv; gid.data[gi*4+2]=gv; gid.data[gi*4+3]=255
        }
      }else{
        // No masks computed — show white (fully unmasked)
        for(var gi2=0;gi2<w*h;gi2++){
          gid.data[gi2*4]=255;gid.data[gi2*4+1]=255;gid.data[gi2*4+2]=255;gid.data[gi2*4+3]=255
        }
      }
      pctx.putImageData(gid,0,0)
    }
    cache.set(id,pcv);vis.delete(id);return pcv
  }

  // ── Blender compositor ───────────────────────────────────
  var cv2=mkCv(w,h),ctx2=cv2.getContext("2d")
  var sA=n.switched?n.inputB:n.inputA,sB=n.switched?n.inputA:n.inputB
  var cA=resolveSlot(sA,cmap,cache,iC,w,h,new Set(vis)),cB=resolveSlot(sB,cmap,cache,iC,w,h,new Set(vis))
  if(cA)ctx2.drawImage(cA,0,0)
  if(cB)blendCv(ctx2,cB,n.mode,n.amount,w,h)
  if(n.outEfx&&n.outEfx.length>0)applyEfxStk(ctx2,n.outEfx,cmap,cache,iC,w,h,new Set(vis))
  if(n.outMask&&n.outMask.length>0)maskToAlpha(ctx2,n.outMask,cmap,cache,iC,w,h,new Set(vis))
  cache.set(id,cv2);vis.delete(id);return cv2
}
function renderPipeline(canvas,dispId,nodes,iC) {
  if(!canvas||!dispId)return
  var ctx=canvas.getContext("2d");ctx.clearRect(0,0,canvas.width,canvas.height)
  var cmap=new Map(nodes.map(function(n){return[n.id,n]}))
  var result=compAny(dispId,cmap,new Map(),iC,canvas.width,canvas.height,new Set())
  if(result)ctx.drawImage(result,0,0)
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
function NRef(props) {
  // mode: "all" (default) | "intermediate" (promoted only) | "source" (creators+blenders+stacks, no promoted)
  var mode = props.mode || "all"
  var creators = mode==="intermediate" ? [] : props.nodes.filter(function(n){return n.section===1&&n.id!==props.selfId})
  var comps    = props.nodes.filter(function(n){
    if(n.id===props.selfId)return false
    if(n.section!==2)return false
    if(mode==="intermediate")return n.type==="promoted"
    if(mode==="source")return n.type!=="promoted"
    // "effect-source": only effect-type Stack nodes (for linking an effect stack)
    if(mode==="effect-source")return n.type==="stack"&&n.stackType==="effect"
    // "mask-source": only mask-type Stack nodes (for linking a mask stack)
    if(mode==="mask-source")return n.type==="stack"&&n.stackType==="mask"
    return true
  })
  return (
    <PR l={props.l}>
      <select value={props.v||""} onChange={function(e){props.fn(e.target.value||null)}} style={{flex:1}}>
        <option value="">— none —</option>
        {creators.length>0&&<optgroup label="Pixel Creators">
          {creators.map(function(n){return <option key={n.id} value={n.id}>{n.name}</option>})}
        </optgroup>}
        {comps.length>0&&<optgroup label={mode==="intermediate"?"Promoted Taps":"Compositors"}>
          {comps.map(function(n){return <option key={n.id} value={n.id}>{n.name}</option>})}
        </optgroup>}
        {creators.length===0&&comps.length===0&&<option disabled>no valid sources</option>}
      </select>
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
  return (
    <div>
      <Se l="type" v={p.gType} opts={GTYPES} fn={function(v){up(Object.assign({},p,{gType:v}))}}/>
      <Co l="colour 1" v={p.c1} fn={function(v){up(Object.assign({},p,{c1:v}))}}/>
      <Sl l="stop 1" v={p.s1} mn={0} mx={.999} st={.01} fn={function(v){up(Object.assign({},p,{s1:v}))}}/>
      <Co l="colour 2" v={p.c2} fn={function(v){up(Object.assign({},p,{c2:v}))}}/>
      <Sl l="stop 2" v={p.s2} mn={.001} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{s2:v}))}}/>
      {p.gType==="linear" && <Sl l="angle" v={p.angle} mn={0} mx={360} st={1} fmt={function(v){return Math.round(v)+"deg"}} fn={function(v){up(Object.assign({},p,{angle:v}))}}/>}
      {(p.gType==="radial"||p.gType==="conic") && (
        <div>
          <Sl l="centre x" v={p.cx} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cx:v}))}}/>
          <Sl l="centre y" v={p.cy} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cy:v}))}}/>
        </div>
      )}
      {p.gType==="radial" && <Sl l="radius" v={p.r} mn={.01} mx={2.5} st={.01} fn={function(v){up(Object.assign({},p,{r:v}))}}/>}
      {p.gType==="conic" && <Sl l="start" v={p.sa} mn={0} mx={360} st={1} fmt={function(v){return Math.round(v)+"deg"}} fn={function(v){up(Object.assign({},p,{sa:v}))}}/>}
      <Sl l="alpha" v={p.alpha} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{alpha:v}))}}/>
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
      <Co l="colour 2" v={p.c2} fn={function(v){up(Object.assign({},p,{c2:v}))}}/>
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
  return (
    <div style={{padding:"12px 12px 4px"}}>
      {node.type==="solid"    && <SolidP p={node.props} up={up}/>}
      {node.type==="shape"    && <ShapeP p={node.props} up={up}/>}
      {node.type==="gradient" && <GradP  p={node.props} up={up}/>}
      {node.type==="noise"    && <NoiseP p={node.props} up={up}/>}
      {node.type==="pattern"  && <PatP   p={node.props} up={up}/>}
      {node.type==="image"    && <ImgP   p={node.props} up={up} onLoad={onLoad}/>}
    </div>
  )
}

/* ─── EFFECT PRIMARY PARAMS ──────────────────────────── */
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
  if(efx.type==="vibrance")   return <Sl l="amount" v={p.amount} mn={0} mx={100} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up({amount:v})}}/>
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
function MaskCard(props) {
  var mk=props.mask
  var armSt=useState(false); var armed=armSt[0],setArmed=armSt[1]
  var timerRef=useRef(null)
  useEffect(function(){return function(){if(timerRef.current)clearTimeout(timerRef.current)}},[])
  function handleDel(){
    if(!armed){setArmed(true);timerRef.current=setTimeout(function(){setArmed(false)},3000)}
    else{clearTimeout(timerRef.current);setArmed(false);props.onDel()}
  }
  return (
    <div className="mask-card" style={{opacity:mk.enabled===false?.4:1}}>
      <div style={{display:"flex",flexDirection:"column",gap:2,alignSelf:"flex-start",flexShrink:0,marginRight:4}}>
        {props.onMove&&<button className="icon-btn sm" onClick={function(){props.onMove(-1)}} disabled={props.isFirst} style={{fontSize:11,height:20,width:26}}>▲</button>}
        <button className="icon-btn sm" onClick={function(){props.onChange(Object.assign({},mk,{enabled:mk.enabled===false}))}}
          style={{color:mk.enabled===false?"var(--mu)":"var(--ac)",fontSize:16,height:28,width:26}}>{mk.enabled===false?"○":"●"}</button>
        {props.onMove&&<button className="icon-btn sm" onClick={function(){props.onMove(1)}} disabled={props.isLast} style={{fontSize:11,height:20,width:26}}>▼</button>}
      </div>
      <span style={{fontSize:16,color:"var(--lv)",flexShrink:0,paddingTop:2}}>◈</span>
      <div style={{flex:1,minWidth:0}}>
        <select value={mk.refId||""} onChange={function(e){props.onChange(Object.assign({},mk,{refId:e.target.value||null}))}} style={{width:"100%",marginBottom:8}}>
          <option value="">— select source —</option>
          <optgroup label="Pixel Creators">
            {props.nodes.filter(function(n){return n.section===1&&n.id!==props.selfId}).map(function(n){return <option key={n.id} value={n.id}>{n.name}</option>})}
          </optgroup>
          <optgroup label="Compositors">
            {props.nodes.filter(function(n){return n.section===2&&n.id!==props.selfId}).map(function(n){return <option key={n.id} value={n.id}>{n.name}</option>})}
          </optgroup>
        </select>
        <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:6}}>
          <select value={mk.channel} onChange={function(e){props.onChange(Object.assign({},mk,{channel:e.target.value}))}} style={{width:90,flex:"none"}}>
            {MCH.map(function(c){return <option key={c}>{c}</option>})}
          </select>
          <input type="range" min={0} max={1} step={.01} value={mk.strength} onChange={function(e){props.onChange(Object.assign({},mk,{strength:+e.target.value}))}} style={{flex:1}}/>
          <span style={{fontSize:10,color:"var(--ac)",minWidth:32,textAlign:"right"}}>{Math.round(mk.strength*100)}%</span>
          <button className={mk.invert?"ac":"ghost"} style={{minHeight:32,padding:"0 10px",fontSize:11}} onClick={function(){props.onChange(Object.assign({},mk,{invert:!mk.invert}))}}>inv</button>
        </div>
        <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:props.onEditEffects?8:0}}>
          <select value={mk.blendMode} onChange={function(e){props.onChange(Object.assign({},mk,{blendMode:e.target.value}))}} style={{flex:1}}>
            {MBMS.map(function(m){return <option key={m}>{m}</option>})}
          </select>
          <input type="range" min={0} max={100} step={1} value={mk.opacity} onChange={function(e){props.onChange(Object.assign({},mk,{opacity:+e.target.value}))}} style={{flex:1}}/>
          <span style={{fontSize:10,color:"var(--di)",minWidth:32,textAlign:"right"}}>{Math.round(mk.opacity)}%</span>
        </div>
        {props.onEditEffects && (
          <button className="ac" style={{width:"100%"}} onClick={props.onEditEffects}>
            Edit mask effects ({(mk.effectStack||[]).length}) →
          </button>
        )}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:4,alignSelf:"flex-start",flexShrink:0}}>
        {props.onPromote&&<button className="promote-btn" style={{padding:"2px 6px",fontSize:9}} onClick={props.onPromote} title="Promote">↗</button>}
        <button onClick={handleDel} style={{minHeight:30,padding:"0 8px",fontSize:armed?9:14,background:armed?"rgba(224,48,96,.2)":"none",border:armed?"1px solid var(--dng)":"none",color:armed?"var(--dng)":"var(--mu)",borderRadius:6,minWidth:armed?52:28}}>
          {armed?"sure?":"×"}
        </button>
      </div>
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
      <div className="card-hdr" style={{background:accentBg}}>
        <div style={{display:"flex",flexDirection:"column",flexShrink:0}}>
          <button className="icon-btn sm" onClick={function(){props.onMove(-1)}} disabled={props.isFirst} style={{fontSize:11,height:20,width:28}}>▲</button>
          <button className="icon-btn sm" onClick={function(){props.onMove(1)}}  disabled={props.isLast}  style={{fontSize:11,height:20,width:28}}>▼</button>
        </div>
        <button className="icon-btn sm" onClick={function(){props.onChange(Object.assign({},item,{enabled:!item.enabled}))}}
          style={{color:item.enabled?accent:"var(--mu)",fontSize:18}}>
          {item.enabled?"●":"○"}
        </button>
        <span style={{fontSize:9,padding:"1px 6px",borderRadius:4,background:accentBg,
          color:accent,border:"1px solid "+accent,flexShrink:0,marginRight:4}}>
          {isMask?"mask":"effect"} stack
        </span>
        <select value={item.stackRefId||""}
          onChange={function(e){props.onChange(Object.assign({},item,{stackRefId:e.target.value||null}))}}
          style={{flex:1,fontSize:11,padding:"3px 4px",
            background:"none",border:"none",color:item.enabled?accent:"var(--mu)",
            fontFamily:"'IBM Plex Mono',monospace",cursor:"pointer"}}>
          <option value="">— select stack —</option>
          {matchingStacks.map(function(n){return <option key={n.id} value={n.id}>{n.name}</option>})}
        </select>
        <button onClick={handleDel} style={{minHeight:32,padding:"0 10px",
          fontSize:armed?10:14,background:armed?"rgba(224,48,96,.2)":"none",
          border:armed?"1px solid var(--dng)":"none",
          color:armed?"var(--dng)":"var(--mu)",borderRadius:6,minWidth:armed?70:32}}>
          {armed?"confirm ×":"×"}
        </button>
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
  useEffect(function(){return function(){if(timerRef.current)clearTimeout(timerRef.current)}},[])
  function handleDel(){
    if(!armed){setArmed(true);timerRef.current=setTimeout(function(){setArmed(false)},3000)}
    else{clearTimeout(timerRef.current);setArmed(false);props.onDel()}
  }
  var nMasks=(efx.maskStack||[]).length
  var tabs=[
    {id:"primary",label:"Primary"},
    {id:"layer",  label:"Layer"},
    {id:"mask",   label:"Mask"+(nMasks>0?" ("+nMasks+")":""),color:"lv"},
  ]
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
        <span style={{flex:1,fontSize:12,color:efx.enabled?"var(--tx)":"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",fontWeight:500}}>{efx.type}</span>
        {props.onPromote&&<button className="promote-btn" onClick={function(e){e.stopPropagation();props.onPromote()}} title="Promote to named tap point">↗</button>}
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
              <MaskCard key={mk.id} mask={mk} nodes={props.nodes} selfId={props.selfId}
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
            var ms=(efx.maskStack||[]).concat([mkMask()])
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
  {label:"Colour",   items:["hue-shift","saturation","vibrance"]},
  {label:"Pixel",    items:["blur","invert","threshold"]},
  {label:"Transform",items:["transform"]},
]
function AddEfxMenu(props) {
  var openSt=useState(false); var open=openSt[0], setOpen=openSt[1]
  var ref=useRef(null)
  useEffect(function(){
    if(!open)return
    function h(e){if(ref.current&&!ref.current.contains(e.target))setOpen(false)}
    document.addEventListener("mousedown",h)
    return function(){document.removeEventListener("mousedown",h)}
  },[open])
  return (
    <div ref={ref} style={{position:"relative",flex:2,minWidth:0}}>
      <button className="ac" style={{width:"100%",height:"100%"}} onClick={function(){setOpen(!open)}}>+ effect</button>
      {open && (
        <div className="eff-menu">
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
        </div>
      )}
    </div>
  )
}

/* ─── EFFECT STACK ────────────────────────────────────── */
function EfxStack(props) {
  var lkSt=useState(false); var lkOpen=lkSt[0], setLkOpen=lkSt[1]
  var lkRef=useRef(null)
  useEffect(function(){
    if(!lkOpen)return
    function h(e){if(lkRef.current&&!lkRef.current.contains(e.target))setLkOpen(false)}
    document.addEventListener("mousedown",h)
    return function(){document.removeEventListener("mousedown",h)}
  },[lkOpen])

  function addEfx(type){props.onChange(props.stack.concat([mkEfx(type)]))}
  function linkStack(stackId){
    props.onChange(props.stack.concat([mkEfxStackRef(stackId)]))
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
            onMove={function(dir){move(i,dir)}}/>
        )
        return (
          <EfxCard key={efx.id} efx={efx} nodes={props.nodes} selfId={props.selfId}
            isFirst={i===0} isLast={i===props.stack.length-1}
            onChange={function(nw){upd(efx.id,nw)}}
            onDel={function(){del(efx.id)}}
            onMove={function(dir){move(i,dir)}}
            onDrillMask={function(mi){
              if(props.navPush) props.navPush({
                label:efx.type+" / mask "+(mi+1),
                getMask:function(){
                  var cur=props.stack.find(function(e){return e.id===efx.id})
                  return cur?(cur.maskStack||[])[mi]:null
                },
                setMask:function(newMask){
                  var ms=(efx.maskStack||[]).map(function(x,xi){return xi===mi?newMask:x})
                  upd(efx.id,Object.assign({},efx,{maskStack:ms}))
                }
              })
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
          {lkOpen&&(
            <div className="eff-menu" style={{left:0,right:0}}>
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
            </div>
          )}
        </div>
        {/* extract — 1 part, only when available */}
        {props.onExtract&&props.stack.length>0&&(
          <button className="promote-btn" style={{flex:1,minWidth:0,fontSize:10}}
            onClick={props.onExtract} title="Extract to Effect Stack node">↗</button>
        )}
      </div>
    </div>
  )
}

/* ─── MASK STACK PANEL ────────────────────────────────── */
function MaskStackPanel(props) {
  var lkSt=useState(false); var lkOpen=lkSt[0], setLkOpen=lkSt[1]
  var lkRef=useRef(null)
  useEffect(function(){
    if(!lkOpen)return
    function h(e){if(lkRef.current&&!lkRef.current.contains(e.target))setLkOpen(false)}
    document.addEventListener("mousedown",h)
    return function(){document.removeEventListener("mousedown",h)}
  },[lkOpen])

  function addMask(){props.onChange(props.stack.concat([mkMask()]))}
  function linkStack(stackId){
    props.onChange(props.stack.concat([mkMaskStackRef(stackId)]))
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
            onMove={function(dir){move(mi,dir)}}/>
        )
        return (
          <MaskCard key={mk.id} mask={mk} nodes={props.nodes} selfId={props.selfId}
            isFirst={mi===0} isLast={mi===props.stack.length-1}
            onMove={function(dir){move(mi,dir)}}
            onChange={function(nw){upd(mk.id,nw)}}
            onDel={function(){del(mk.id)}}
            onEditEffects={function(){
              if(props.navPush) props.navPush({
                label:"mask "+(mi+1)+" / effects",
                getMask:function(){return props.stack.find(function(m){return m.id===mk.id})},
                setMask:function(nm){upd(mk.id,nm)}
              })
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
          {lkOpen&&(
            <div className="eff-menu" style={{left:0,right:0}}>
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
            </div>
          )}
        </div>
        {/* extract — 1 part, only when available */}
        {props.onExtract&&props.stack.length>0&&(
          <button className="promote-btn" style={{flex:1,minWidth:0,fontSize:10}}
            onClick={props.onExtract} title="Extract to Mask Stack node">↗</button>
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
  return (
    <div className="card">
      <div className="card-hdr" style={{background:props.accent==="var(--ac)"?"rgba(36,204,168,.06)":"rgba(208,72,152,.06)"}}>
        <span style={{flex:1,fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:props.accent}}>{props.label}</span>
      </div>
      <TabBar tabs={tabs} active={tab} onChange={setTab}/>
      {tab==="source" && (
        <div className="card-body">
          <NRef l="source" v={slot.refId} nodes={nodes} selfId={selfId} fn={function(v){onChange(Object.assign({},slot,{refId:v}))}}/>
        </div>
      )}
      {tab==="effects" && (
        <div style={{padding:10}}>
          <EfxStack stack={slot.effectStack||[]} nodes={nodes} selfId={selfId} navPush={props.navPush}
            onChange={function(es){onChange(Object.assign({},slot,{effectStack:es}))}}
            onExtract={props.onExtract ? function(){props.onExtract({slot:props.slotKey,slotObj:slot,kind:"effect",owner:props.owner})} : null}/>
        </div>
      )}
      {tab==="masks" && (
        <div style={{padding:10}}>
          <MaskStackPanel stack={slot.maskStack||[]} nodes={nodes} selfId={selfId} navPush={props.navPush}
            onChange={function(ms){onChange(Object.assign({},slot,{maskStack:ms}))}}
            onExtract={props.onExtract ? function(){props.onExtract({slot:props.slotKey,slotObj:slot,kind:"mask",owner:props.owner})} : null}/>
        </div>
      )}
    </div>
  )
}

/* ─── BLENDER PROPS ───────────────────────────────────── */
function BlenderProps(props) {
  var node=props.node, onChange=props.onChange, nodes=props.nodes
  var navSt=useState([]); var navStack=navSt[0], setNavStack=navSt[1]
  // Must be declared before any early return to satisfy Rules of Hooks
  var outTabSt=useState("effects"); var outTab=outTabSt[0], setOutTab=outTabSt[1]
  function navPush(item){setNavStack(function(s){return s.concat([item])})}
  function navPop(){setNavStack(function(s){return s.slice(0,-1)})}

  if(navStack.length>0){
    var top=navStack[navStack.length-1]
    var drillMask=top.getMask()
    return (
      <div style={{display:"flex",flexDirection:"column",minHeight:300}}>
        <div className="breadcrumb">
          <button className="ghost" style={{fontSize:13,padding:"0 6px 0 0",minHeight:32}} onClick={navPop}>
            Back
          </button>
          <span className="bc-item">Blender</span>
          {navStack.map(function(n,i){return (
            <span key={i} style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{color:"var(--mu)"}}>›</span>
              <span className={"bc-item"+(i===navStack.length-1?" cur":"")}>{n.label}</span>
            </span>
          )})}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:10}}>
          <div className="stack-lbl">effects on mask</div>
          {drillMask && (
            <EfxStack
              stack={drillMask.effectStack||[]}
              nodes={nodes} selfId={node.id}
              navPush={navPush}
              onChange={function(es){top.setMask(Object.assign({},drillMask,{effectStack:es}))}}
            />
          )}
        </div>
      </div>
    )
  }

  var nOutEfx=(node.outEfx||[]).length, nOutMask=(node.outMask||[]).length
  var outTabs=[
    {id:"effects",label:"Effects"+(nOutEfx>0?" ("+nOutEfx+")":""),color:"ac"},
    {id:"masks",  label:"Masks"+(nOutMask>0?" ("+nOutMask+")":""),color:"lv"},
  ]
  return (
    <div style={{padding:10,overflowY:"auto"}}>
      <SlotPanel label="Input A" slot={node.inputA} accent="var(--ac)"
        nodes={nodes} selfId={node.id} navPush={navPush}
        slotKey="inputA" owner={node}
        onChange={function(s){onChange(Object.assign({},node,{inputA:s}))}}
        onExtract={props.onExtract ? props.onExtract : null}/>
      <div className="card" style={{marginBottom:10}}>
        <div className="card-hdr">
          <span style={{flex:1,fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"var(--di)"}}>Blend</span>
        </div>
        <div className="card-body">
          <Se l="mode" v={node.mode} opts={BMODES} fn={function(v){onChange(Object.assign({},node,{mode:v}))}}/>
          <Sl l="amount" v={node.amount} mn={0} mx={100} st={1} fmt={function(v){return Math.round(v)+"%"}} fn={function(v){onChange(Object.assign({},node,{amount:v}))}}/>
          <PR l="switch">
            <button onClick={function(){onChange(Object.assign({},node,{switched:!node.switched}))}} className={node.switched?"ac":""} style={{minHeight:36,padding:"0 14px"}}>
              {node.switched?"B to A (switched)":"A to B (normal)"}
            </button>
          </PR>
        </div>
      </div>
      <SlotPanel label="Input B" slot={node.inputB} accent="var(--co)"
        nodes={nodes} selfId={node.id} navPush={navPush}
        slotKey="inputB" owner={node}
        onChange={function(s){onChange(Object.assign({},node,{inputB:s}))}}
        onExtract={props.onExtract ? props.onExtract : null}/>
      <div className="card">
        <div className="card-hdr" style={{background:"rgba(176,96,240,.06)"}}>
          <span style={{flex:1,fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"var(--lv)"}}>Output</span>
        </div>
        <TabBar tabs={outTabs} active={outTab} onChange={setOutTab}/>
        {outTab==="effects" && (
          <div style={{padding:10}}>
            <EfxStack stack={node.outEfx||[]} nodes={nodes} selfId={node.id} navPush={navPush}
              onChange={function(es){onChange(Object.assign({},node,{outEfx:es}))}}
              onExtract={props.onExtract ? function(){props.onExtract({slot:"outEfx",slotObj:{effectStack:node.outEfx||[]},kind:"effect",owner:node})} : null}/>
          </div>
        )}
        {outTab==="masks" && (
          <div style={{padding:10}}>
            <MaskStackPanel stack={node.outMask||[]} nodes={nodes} selfId={node.id} navPush={navPush}
              onChange={function(ms){onChange(Object.assign({},node,{outMask:ms}))}}
              onExtract={props.onExtract ? function(){props.onExtract({slot:"outMask",slotObj:{maskStack:node.outMask||[]},kind:"mask",owner:node})} : null}/>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── NODE ITEM ───────────────────────────────────────── */
var TDOT={"solid":"#3850a0","shape":"#18b860","gradient":"#7820b0","noise":"#a87018","pattern":"#1878b0","image":"#2060a8","blender":"#b82880","stack":"#24acc4","promoted":"#d4b428"}
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
      <span className={"ftag "+(node.type==="stack"?"tstack":node.type==="promoted"?"tprom":node.section===1?"tgn":"tco")}>{node.type==="stack"?(node.stackType||"effect")+" stack":node.type}</span>
      <button className="icon-btn sm" onClick={function(e){e.stopPropagation();props.onTog(node.id)}} style={{color:node.enabled?"var(--ac)":"var(--mu)"}}>
        {node.enabled?"●":"○"}
      </button>
      <button className="icon-btn sm" onClick={function(e){e.stopPropagation();props.onDsp(node.id)}} style={{color:props.isDsp?"var(--lv)":"var(--mu)",fontSize:20}}>
        {props.isDsp?"◉":"◎"}
      </button>
      <button onClick={handleDel} style={{minHeight:32,padding:"0 8px",fontSize:armed?9:14,background:armed?"rgba(224,48,96,.2)":"none",border:armed?"1px solid var(--dng)":"none",color:armed?"var(--dng)":"var(--mu)",borderRadius:6,minWidth:armed?56:32}}>
        {armed?"sure?":"×"}
      </button>
    </div>
  )
}

/* ─── ADD MENU ────────────────────────────────────────── */
function AddMenu(props) {
  var openSt=useState(false); var open=openSt[0], setOpen=openSt[1]
  var ref=useRef(null)
  useEffect(function(){
    if(!open)return
    function h(e){if(ref.current&&!ref.current.contains(e.target))setOpen(false)}
    document.addEventListener("mousedown",h)
    return function(){document.removeEventListener("mousedown",h)}
  },[open])
  var s1=[{t:"solid",l:"Solid Colour"},{t:"shape",l:"Shape"},{t:"gradient",l:"Gradient"},{t:"noise",l:"Noise Field"},{t:"pattern",l:"Pattern"},{t:"image",l:"Image"}]
  var items=props.sec===1?s1:[{t:"blender",l:"Blender"},{t:"stack-effect",l:"Effect Stack"},{t:"stack-mask",l:"Mask Stack"}]
  return (
    <div ref={ref} style={{position:"relative"}}>
      <button className="ac" style={{fontSize:10,padding:"0 10px"}} onClick={function(){setOpen(!open)}}>+ Add</button>
      {open && (
        <div className="drop-menu">
          {items.map(function(item){return <div key={item.t} className="drop-item" onClick={function(){props.onAdd(item.t,props.sec);setOpen(false)}}>{item.l}</div>})}
        </div>
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
        <span style={{fontSize:8,color:"var(--bd)",letterSpacing:".1em"}}>NLICS v3.2 mobile</span>
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
function NodeDetailSheet(props) {
  // props: node, sec, open, onClose, onUpdate, onLoad, nodes
  if (!props.open || !props.node) return null
  return (
    <div className="sheet-scrim" onClick={function(e){ if(e.target===e.currentTarget) props.onClose() }}>
      <div className="node-sheet">
        <div className="node-sheet-hdr">
          <div className="sheet-grip" style={{position:"absolute",top:8,left:"50%",transform:"translateX(-50%)"}}/>
          <span style={{flex:1,fontSize:13,fontFamily:"'IBM Plex Mono',monospace",color:"var(--tx)",fontWeight:500,marginTop:4}}>
            {props.node.name}
          </span>
          <button className="ghost" style={{fontSize:20,minHeight:36}} onClick={props.onClose}>×</button>
        </div>
        <div className="node-sheet-scroll">
          {props.sec===1
            ? <CreatorProps node={props.node} onUpdate={props.onUpdate} onLoad={props.onLoad}/>
            : props.node.type==="stack"
              ? <StackProps node={props.node} onChange={props.onUpdate} nodes={props.nodes}
                  onPromote={props.onPromote} onExtract={props.onExtract}/>
              : props.node.type==="promoted"
                ? <PromotedProps node={props.node} nodes={props.nodes}/>
                : <BlenderProps node={props.node} onChange={props.onUpdate} nodes={props.nodes}
                    onPromote={props.onPromote} onExtract={props.onExtract}/>
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
  var navSt=useState([]); var navStack=navSt[0], setNavStack=navSt[1]
  // Hoist hook above early return
  var unused=useState(null) // placeholder so hook count is stable

  function navPush(item){setNavStack(function(s){return s.concat([item])})}
  function navPop(){setNavStack(function(s){return s.slice(0,-1)})}

  // Drill-down for mask → effect editing
  if(navStack.length>0){
    var top=navStack[navStack.length-1]
    var drillMask=top.getMask()
    return (
      <div style={{display:"flex",flexDirection:"column",minHeight:300}}>
        <div className="breadcrumb">
          <button className="ghost" style={{fontSize:13,padding:"0 6px 0 0",minHeight:32}} onClick={navPop}>Back</button>
          <span className="bc-item">{node.name}</span>
          {navStack.map(function(n,i){return(
            <span key={i} style={{display:"flex",alignItems:"center",gap:6}}>
              <span style={{color:"var(--mu)"}}>›</span>
              <span className={"bc-item"+(i===navStack.length-1?" cur":"")}>{n.label}</span>
            </span>
          )})}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:10}}>
          {drillMask&&(
            <EfxStack stack={drillMask.effectStack||[]} nodes={nodes} selfId={node.id}
              navPush={navPush}
              onChange={function(es){top.setMask(Object.assign({},drillMask,{effectStack:es}))}}/>
          )}
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
          <NRef l="source" v={node.previewRefId||null} nodes={nodes} selfId={node.id}
            fn={function(v){onChange(Object.assign({},node,{previewRefId:v||null}))}}/>
          {node.previewRefId && (
            <div style={{fontSize:9,color:"var(--mu)",marginTop:6,lineHeight:1.5}}>
              Tap ◎ on this node to preview the {isEffect?"effects":"masks"} applied to the selected source.
              This reference is ignored during compositing.
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
          onChange={function(es){onChange(Object.assign({},node,{effectStack:es}))}}
        />
      ) : (
        <MaskStackPanel
          stack={node.maskStack||[]}
          nodes={nodes}
          selfId={node.id}
          navPush={navPush}
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
              <div key={node.id}>
                <NodeItem node={node} isSel={isSel} isDsp={isDsp}
                  onSel={function(id){ props.onSel(id===props.selId?null:id) }}
                  onDsp={props.onDsp} onDel={props.onDel}
                  onRen={function(name){ props.onRen(node.id,name) }}
                  onTog={props.onTog}/>
                {isSel && props.panelStyle!=="sheet" && (
                  <div style={{background:"rgba(4,4,18,.97)",borderBottom:"1px solid var(--bd)"}}>
                    {props.sec===1
                      ? <CreatorProps node={node} onUpdate={props.onUpd} onLoad={props.onLoad}/>
                      : node.type==="blender"
                        ? <BlenderProps node={node} onChange={props.onUpd} nodes={props.nodes} onExtract={props.onExtract} onPromote={props.onPromote}/>
                        : node.type==="stack"
                          ? <StackProps node={node} onChange={props.onUpd} nodes={props.nodes} onPromote={props.onPromote}/>
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
                  <div key={node.id}>
                    <NodeItem node={node} isSel={isSel} isDsp={isDsp}
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
export default function App() {
  var init = initState()
  var s1 = useState(init.nodes);  var nodes=s1[0],   setNodes=s1[1]
  var s2 = useState(init.dispId); var dispId=s2[0],  setDispId=s2[1]
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

  useEffect(function(){stRef.current={nodes:nodes,dispId:dispId}},[nodes,dispId])

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
    if(cvRef.current) renderPipeline(cvRef.current,dispId,nodes,iC.current)
  },[nodes,dispId,sz])
  // Deferred re-render on layout changes — waits for browser reflow so
  // canvas has correct dimensions and cvRef is attached to the live canvas
  useEffect(function(){
    var t = setTimeout(function(){
      if(cvRef.current) renderPipeline(cvRef.current,dispId,nodes,iC.current)
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
  function add(type,sec){pushHistory({nodes:nodes});var n=type==="blender"?mkBlender():type==="stack-effect"?mkStack("effect"):type==="stack-mask"?mkStack("mask"):mkNode(type);n.section=sec;setNodes(function(p){return p.concat([n])});setSelId(n.id)}
  function del(id){pushHistory({nodes:nodes});setNodes(function(p){return p.filter(function(n){return n.id!==id})});if(selId===id)setSelId(null);if(dispId===id)setDispId(null)}
  function upd(u){
    setNodes(function(p){return p.map(function(n){return n.id===u.id?u:n})})
    // Keep sheet node in sync if it's the one being updated
    setSheetNode(function(sn){ return sn&&sn.node.id===u.id ? {node:u,sec:u.section} : sn })
  }
  function ren(id,name){pushHistory({nodes:nodes});setNodes(function(p){return p.map(function(n){return n.id===id?Object.assign({},n,{name:name}):n})})}
  function tog(id){setNodes(function(p){return p.map(function(n){return n.id===id?Object.assign({},n,{enabled:!n.enabled}):n})})}
  function dsp(id){setDispId(function(p){return p===id?null:id})}
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
    var name = window.prompt ? (window.prompt("Name this tap point:", suggestName)||suggestName) : suggestName
    var pNode = mkPromoted(name, tapPath)
    pNode.section = 2
    pushHistory({nodes:nodes})
    setNodes(function(p){ return p.concat([pNode]) })
  }
  function handleExtract(info) {
    // info: {slot, slotObj, kind:"effect"|"mask", owner}
    var suggestName = (info.owner ? info.owner.name+" " : "") + (info.kind==="effect"?"Effect":"Mask")+" Stack"
    var name = window.prompt ? (window.prompt("Name this new Stack:", suggestName)||suggestName) : suggestName
    // Create a Stack node containing the inline stack being extracted
    var newStack = mkStack(info.kind)
    newStack.name = name
    if(info.kind==="effect"){
      newStack.effectStack = (info.slotObj.effectStack||[]).slice()
    } else {
      newStack.maskStack = (info.slotObj.maskStack||[]).slice()
    }
    // Replace inline stack in the originating slot with a __stackref__ item
    // pointing at the new Stack node — everything else in the stack is preserved
    var stackRefItem = info.kind==="effect"
      ? mkEfxStackRef(newStack.id)
      : mkMaskStackRef(newStack.id)

    pushHistory({nodes:nodes})
    setNodes(function(p){
      var withStack = p.concat([newStack])
      return withStack.map(function(n){
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
      })
    })
  }

  var sp={nodes:nodes,selId:selId,dispId:dispId,
    onSel:selWithSheet,onDsp:dsp,onDel:del,onAdd:add,onUpd:upd,onLoad:loadUrl,onRen:ren,onTog:tog,
    panelStyle:settings.panelStyle,onPromote:handlePromote,onExtract:handleExtract}

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
        onUpdate={upd} onLoad={loadUrl} nodes={nodes}
        onPromote={handlePromote} onExtract={handleExtract}/>

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
              : <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden"}}>
                  <Section sec={1} title="§1 · Pixel Creators" {...sp}
                    collapsed={s1Col} onToggle={function(){setS1Col(!s1Col)}}
                    stickyHeaders={false} panelStyle={settings.panelStyle} inScroll={false}/>
                  <Section sec={2} title="§2 · Compositors" {...sp}
                    collapsed={s2Col} onToggle={function(){setS2Col(!s2Col)}}
                    stickyHeaders={false} panelStyle={settings.panelStyle} inScroll={false}/>
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
              ? <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden"}}>
                  <Section sec={1} title="§1 · Pixel Creators" {...sp}
                    collapsed={s1Col} onToggle={function(){setS1Col(!s1Col)}}
                    stickyHeaders={false} panelStyle={settings.panelStyle} inScroll={false}/>
                  <Section sec={2} title="§2 · Compositors" {...sp}
                    collapsed={s2Col} onToggle={function(){setS2Col(!s2Col)}}
                    stickyHeaders={false} panelStyle={settings.panelStyle} inScroll={false}/>
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
