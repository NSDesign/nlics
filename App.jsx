import { useState, useEffect, useRef } from "react"

/* ─── CSS ─────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=IBM+Plex+Mono:wght@300;400&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#040412;--pn:#09091e;--sf:#0d0d22;--el:#131328;
  --sl:#1a1a38;--bd:#252550;--tx:#b8c8e8;--mu:#606898;
  --di:#8090c0;--ac:#24cca8;--lv:#b060f0;
  --gn:#28d878;--co:#d04898;--dng:#e03060
}
::-webkit-scrollbar{width:3px;height:3px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--bd);border-radius:2px}
input[type=range]{-webkit-appearance:none;width:100%;height:2px;background:var(--bd);border-radius:1px;outline:none;cursor:pointer}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:8px;height:8px;border-radius:50%;background:var(--ac);cursor:pointer}
select,input[type=text]{background:var(--el);border:1px solid var(--bd);color:var(--tx);padding:2px 4px;border-radius:2px;font-family:'IBM Plex Mono',monospace;font-size:9.5px;outline:none;width:100%}
select:focus,input[type=text]:focus{border-color:var(--ac)}
select{cursor:pointer}
input[type=color]{width:20px;height:17px;border:1px solid var(--bd);border-radius:2px;padding:1px;background:var(--el);cursor:pointer;flex-shrink:0}
button{background:var(--el);border:1px solid var(--bd);color:var(--di);padding:1px 6px;border-radius:2px;font-family:'IBM Plex Mono',monospace;font-size:9px;cursor:pointer;transition:all .1s;white-space:nowrap}
button:hover{background:var(--sl);border-color:var(--ac);color:var(--ac)}
button.ac{border-color:var(--ac);color:var(--ac);background:rgba(36,204,168,.07)}
button.lv{border-color:var(--lv);color:var(--lv);background:rgba(168,78,232,.07)}
button.ib{background:none;border:none;color:var(--mu);padding:0 3px;font-size:11px}
button.ib:hover{background:none;border:none;color:var(--tx)}
button.ib.dng:hover{color:var(--dng)}
button.sm{padding:1px 5px;font-size:8.5px}
.r{display:flex;align-items:center;gap:3px;margin-bottom:3px;min-height:18px}
.rl{color:var(--di);font-size:9px;min-width:48px;text-align:right;flex-shrink:0}
.rv{color:var(--ac);font-size:8.5px;min-width:24px;text-align:right;font-family:'IBM Plex Mono',monospace;flex-shrink:0}
.nrow{display:flex;align-items:center;gap:3px;padding:3px 8px;cursor:pointer;user-select:none;border-bottom:1px solid rgba(26,26,54,.8);transition:background .08s;position:relative;min-height:24px}
.nrow:hover{background:var(--sf)}
.nrow.sel{background:var(--sl)}
.nrow.off{opacity:.3}
.nrow.dsp::after{content:'';position:absolute;right:0;top:0;bottom:0;width:2px;background:var(--lv)}
.pw{background:rgba(4,4,18,.95);border-bottom:1px solid var(--bd);animation:fps .1s ease}
@keyframes fps{from{opacity:0;transform:translateY(-3px)}to{opacity:1;transform:none}}
.shdr{display:flex;align-items:center;gap:4px;padding:5px 9px;background:var(--pn);border-bottom:1px solid var(--bd);user-select:none;flex-shrink:0}
.divh{width:8px;background:var(--bd);cursor:col-resize;flex-shrink:0;transition:background .12s;z-index:10;display:flex;align-items:center;justify-content:center;touch-action:none}
.divh::after{content:'⋮';color:var(--bd);font-size:11px;pointer-events:none}
.divh:hover,.divh.drag{background:var(--ac)}
.divh:hover::after,.divh.drag::after{color:var(--bg)}
.divv{height:8px;background:var(--bd);cursor:row-resize;flex-shrink:0;transition:background .12s;z-index:10;display:flex;align-items:center;justify-content:center;touch-action:none}
.divv::after{content:'···';color:var(--bd);font-size:11px;pointer-events:none}
.divv:hover,.divv.drag{background:var(--ac)}
.divv:hover::after,.divv.drag::after{color:var(--bg)}
.checker{background-image:linear-gradient(45deg,#0b0b1e 25%,transparent 25%),linear-gradient(-45deg,#0b0b1e 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#0b0b1e 75%),linear-gradient(-45deg,transparent 75%,#0b0b1e 75%);background-size:12px 12px;background-position:0 0,0 6px,6px -6px,-6px 0;background-color:#050616}
.ftag{font-size:7px;padding:1px 3px;border-radius:2px;text-transform:uppercase;letter-spacing:.07em;font-weight:700;flex-shrink:0}
.tgn{background:rgba(24,184,96,.12);color:#28e878;border:1px solid rgba(24,184,96,.22)}
.tco{background:rgba(184,40,128,.12);color:#d858a0;border:1px solid rgba(184,40,128,.22)}
.dm{position:absolute;top:100%;right:0;z-index:300;margin-top:2px;background:#0c0c26;border:1px solid var(--bd);border-radius:3px;min-width:130px;box-shadow:0 8px 24px rgba(0,0,0,.85);overflow:hidden}
.dmi{padding:5px 10px;cursor:pointer;font-size:9.5px;color:var(--tx);border-bottom:1px solid #141432;transition:background .08s;font-family:'IBM Plex Mono',monospace}
.dmi:last-child{border-bottom:none}
.dmi:hover{background:var(--sl);color:var(--ac)}
.ni{background:none;border:none;border-bottom:1px solid var(--ac);color:var(--tx);font-family:'IBM Plex Mono',monospace;font-size:10px;outline:none;width:100%;padding:0}
.slbl{font-family:'Syne',sans-serif;font-size:9.5px;font-weight:700;text-transform:uppercase;letter-spacing:.14em}
.se{border-left:2px solid rgba(36,204,168,.18);margin:2px 0 2px 6px;padding-left:2px}
.sm2{border-left:2px solid rgba(168,78,232,.18);margin:2px 0 2px 6px;padding-left:2px}
.ei{border-bottom:1px solid rgba(26,26,54,.5)}
.ei:last-child{border-bottom:none}
.er{display:flex;align-items:center;gap:2px;padding:2px 4px;min-height:21px}
.mi{border-bottom:1px solid rgba(26,26,54,.5)}
.mi:last-child{border-bottom:none}
.mr{display:flex;align-items:center;gap:2px;padding:2px 4px;min-height:21px;flex-wrap:wrap}
.ad{display:flex;align-items:center;gap:3px;padding:2px 5px 3px;border-top:1px solid rgba(255,255,255,.04)}
.ps{display:flex;align-items:center;gap:4px;padding:3px 7px;background:rgba(6,6,22,.8);border-top:1px solid rgba(26,26,54,.5);cursor:pointer;user-select:none}
.ps:hover{background:rgba(12,12,34,.8)}
.psl{font-size:8px;color:var(--tx);text-transform:uppercase;letter-spacing:.1em;flex:1}
.bdg{font-size:7px;padding:0 3px;border-radius:2px;font-family:'IBM Plex Mono',monospace}
.bac{background:rgba(36,204,168,.1);color:var(--ac);border:1px solid rgba(36,204,168,.18)}
.blv{background:rgba(168,78,232,.1);color:var(--lv);border:1px solid rgba(168,78,232,.18)}
.gp{padding:6px 8px;background:rgba(4,4,14,.7)}
/* Unified layout icon buttons — readable at all viewport sizes */
.hico{background:none;border:none;cursor:pointer;transition:all .14s;
  font-size:16px;color:#7ab8e8;padding:4px 6px;border-radius:3px;line-height:1;}
.hico:hover{color:#aaddff;background:rgba(122,184,232,.12);}
.hico.vert{font-size:21px;padding:6px 9px;}
.hico.exit{color:var(--ac);padding:4px 8px;
  border:1px solid rgba(36,204,168,.3);background:rgba(36,204,168,.07);}
.hico.exit:hover{color:#fff;background:rgba(36,204,168,.22);border-color:var(--ac);}
.hico.exit.vert{font-size:22px;padding:6px 11px;}
/* Fullscreen escape overlay — always findable */
.fs-escape{
  position:fixed;top:10px;right:10px;z-index:500;
  background:rgba(36,204,168,.18);border:1px solid var(--ac);
  color:var(--ac);font-size:12px;padding:5px 12px;border-radius:4px;
  font-family:'IBM Plex Mono',monospace;cursor:pointer;
  transition:all .14s;backdrop-filter:blur(4px);
}
.fs-escape:hover{background:rgba(36,204,168,.36);color:#fff;}
/* node row button contrast improvements */
.ibq{background:none;border:none;padding:0 3px;font-size:12px;cursor:pointer;transition:color .12s}
.nrow-tog-off{color:#7888b8}
.nrow-tog-off:hover{color:var(--tx)}
.nrow-dsp-off{color:#7888b8}
.nrow-dsp-off:hover{color:var(--lv)}
.nrow-del{color:#904060;font-size:11px;padding:0 3px;background:none;border:none;cursor:pointer;transition:all .12s;border-radius:2px}
.nrow-del:hover{color:#e06080;background:rgba(220,48,80,.1)}
.nrow-del.armed{color:#e02850;background:rgba(220,40,80,.18);border-radius:3px;padding:0 4px;font-size:9px;letter-spacing:.02em}
.nrow-del.armed:hover{color:#fff;background:rgba(220,40,80,.4)}
/* undo toast */
.undo-toast{
  position:fixed;bottom:18px;left:50%;transform:translateX(-50%);
  background:#1a1a36;border:1px solid var(--ac);color:var(--ac);
  padding:5px 14px;border-radius:4px;font-size:9px;font-family:'IBM Plex Mono',monospace;
  pointer-events:none;z-index:500;opacity:0;transition:opacity .2s;
}
.undo-toast.show{opacity:1}
`

function StyleInjector() {
  useEffect(function() {
    var s = document.createElement("style")
    s.textContent = CSS
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
function mkMask() { return { id:uid(), refId:null, channel:"luminosity", invert:false, strength:1, opacity:100, blendMode:"multiply", effectStack:[] } }
function mkSlot() { return { refId:null, effectStack:[], maskStack:[] } }
function mkBlender() { return { id:uid(), name:"Blender "+(_uid-100), type:"blender", section:2, enabled:true, inputA:mkSlot(), inputB:mkSlot(), mode:"screen", amount:100, switched:false, outEfx:[], outMask:[] } }
function mkNode(t) { return { id:uid(), name:t+" "+(_uid-100), type:t, section:1, enabled:true, props:Object.assign({},CPROPS[t]) } }

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
    var mk=stack[mi];if(!mk.refId||vis.has(mk.refId))continue
    var cv=compAny(mk.refId,cmap,cache,iC,w,h,new Set(vis));if(!cv)continue;any=true
    if(mk.effectStack&&mk.effectStack.length>0){cv=clCv(cv,w,h);applyEfxStk(cv.getContext("2d"),mk.effectStack,cmap,cache,iC,w,h,new Set(vis))}
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

    if (efx.type==="transform") {
      // Transform is a full canvas operation — snap pre state, apply matrix, blend back via mask if present
      if (efx.maskStack && efx.maskStack.length>0) {
        // Masked transform: render transform onto snap, blend by mask, write back
        var preSnap = ctx.getImageData(0,0,w,h)
        applyTransform(ctx, efx.params, w, h)
        var postData = ctx.getImageData(0,0,w,h)
        var mv = compMasks(efx.maskStack, cmap, cache, iC, w, h, new Set(vis))
        if (mv) {
          applyBack(preSnap.data, postData.data, mv, efx.opacity, efx.blendMode||"normal")
        }
        ctx.putImageData(mv ? postData : ctx.getImageData(0,0,w,h), 0, 0)
        if (!mv) {
          // No valid masks — just put pre back with opacity blend
          var plain=new Uint8ClampedArray(preSnap.data)
          applyBack(plain, postData.data, null, efx.opacity, efx.blendMode||"normal")
          ctx.putImageData(new ImageData(plain,w,h),0,0)
        }
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
function compAny(id,cmap,cache,iC,w,h,vis) {
  if(!vis)vis=new Set()
  if(cache.has(id))return cache.get(id)
  if(vis.has(id))return null
  var n=cmap.get(id);if(!n||!n.enabled)return null
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
  vis.add(id)
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
    <div className="r" style={props.style}>
      {!props.ns && <span className="rl">{props.l}</span>}
      {props.children}
    </div>
  )
}
function Sl(props) {
  var disp = props.fmt ? props.fmt(props.v) : (props.st < 1 ? Number(props.v).toFixed(2) : Math.round(props.v))
  return (
    <PR l={props.l}>
      <input type="range" min={props.mn} max={props.mx} step={props.st||.01} value={props.v}
        onChange={function(e){ props.fn(parseFloat(e.target.value)) }} style={{flex:1}} />
      <span className="rv">{disp}</span>
    </PR>
  )
}
function Co(props) {
  return (
    <PR l={props.l}>
      <input type="color" value={props.v} onChange={function(e){ props.fn(e.target.value) }} />
      <input type="text"  value={props.v} onChange={function(e){ props.fn(e.target.value) }} style={{flex:1,marginLeft:3}} />
    </PR>
  )
}
function Se(props) {
  return (
    <PR l={props.l}>
      <select value={props.v} onChange={function(e){ props.fn(e.target.value) }} style={{flex:1}}>
        {props.opts.map(function(o){ return <option key={o}>{o}</option> })}
      </select>
    </PR>
  )
}
function NRef(props) {
  return (
    <PR l={props.l}>
      <select value={props.v||""} onChange={function(e){ props.fn(e.target.value||null) }} style={{flex:1}}>
        <option value="">—none—</option>
        <optgroup label="Creators">
          {props.nodes.filter(function(n){ return n.section===1&&n.id!==props.selfId }).map(function(n){ return <option key={n.id} value={n.id}>{n.name}</option> })}
        </optgroup>
        <optgroup label="Blenders">
          {props.nodes.filter(function(n){ return n.section===2&&n.id!==props.selfId }).map(function(n){ return <option key={n.id} value={n.id}>{n.name}</option> })}
        </optgroup>
      </select>
    </PR>
  )
}

/* ─── CREATOR PROP PANELS ───────────────────────────────── */
function SolidP(props) {
  var p=props.p, up=props.up
  return (
    <div>
      <Co l="colour" v={p.color} fn={function(v){up(Object.assign({},p,{color:v}))}} />
      <Sl l="alpha" v={p.alpha} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{alpha:v}))}} />
    </div>
  )
}
function ShapeP(props) {
  var p=props.p, up=props.up, s=p.shapeType
  return (
    <div>
      <Se l="type" v={s} opts={SHAPES} fn={function(v){up(Object.assign({},p,{shapeType:v}))}} />
      <Sl l="x"    v={p.x}  mn={0} mx={1}   st={.01} fn={function(v){up(Object.assign({},p,{x:v}))}} />
      <Sl l="y"    v={p.y}  mn={0} mx={1}   st={.01} fn={function(v){up(Object.assign({},p,{y:v}))}} />
      <Sl l="size" v={p.sz} mn={.05} mx={1.8} st={.01} fn={function(v){up(Object.assign({},p,{sz:v}))}} />
      <Sl l="rot"  v={p.rot} mn={0} mx={360} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{rot:v}))}} />
      {s==="star" && (
        <div>
          <Sl l="points" v={p.pts}    mn={3} mx={16} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{pts:v}))}} />
          <Sl l="innerR" v={p.innerR} mn={.05} mx={.95} st={.01} fn={function(v){up(Object.assign({},p,{innerR:v}))}} />
        </div>
      )}
      {s==="ring"    && <Sl l="innerR" v={p.ringR} mn={.1} mx={.95} st={.01} fn={function(v){up(Object.assign({},p,{ringR:v}))}} />}
      {s==="polygon" && <Sl l="sides"  v={p.sides} mn={3} mx={14} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{sides:v}))}} />}
      <Co l="fill"    v={p.fill}   fn={function(v){up(Object.assign({},p,{fill:v}))}} />
      <Sl l="strokeW" v={p.strokeW} mn={0} mx={20} st={.5} fmt={function(v){return v.toFixed(1)}} fn={function(v){up(Object.assign({},p,{strokeW:v}))}} />
      {p.strokeW>0 && <Co l="stroke" v={p.stroke} fn={function(v){up(Object.assign({},p,{stroke:v}))}} />}
      <Sl l="alpha"   v={p.alpha} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{alpha:v}))}} />
    </div>
  )
}
function GradP(props) {
  var p=props.p, up=props.up
  return (
    <div>
      <Se l="type" v={p.gType} opts={GTYPES} fn={function(v){up(Object.assign({},p,{gType:v}))}} />
      <Co l="col 1"  v={p.c1} fn={function(v){up(Object.assign({},p,{c1:v}))}} />
      <Sl l="stop 1" v={p.s1} mn={0} mx={.999} st={.01} fn={function(v){up(Object.assign({},p,{s1:v}))}} />
      <Co l="col 2"  v={p.c2} fn={function(v){up(Object.assign({},p,{c2:v}))}} />
      <Sl l="stop 2" v={p.s2} mn={.001} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{s2:v}))}} />
      {p.gType==="linear" && <Sl l="angle°" v={p.angle} mn={0} mx={360} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{angle:v}))}} />}
      {(p.gType==="radial"||p.gType==="conic") && (
        <div>
          <Sl l="cx" v={p.cx} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cx:v}))}} />
          <Sl l="cy" v={p.cy} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cy:v}))}} />
        </div>
      )}
      {p.gType==="radial" && <Sl l="radius" v={p.r}  mn={.01} mx={2.5} st={.01} fn={function(v){up(Object.assign({},p,{r:v}))}} />}
      {p.gType==="conic"  && <Sl l="start°" v={p.sa} mn={0} mx={360} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{sa:v}))}} />}
      <Sl l="alpha" v={p.alpha} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{alpha:v}))}} />
    </div>
  )
}
function NoiseP(props) {
  var p=props.p, up=props.up
  return (
    <div>
      <Se l="type" v={p.nType} opts={NTYPES} fn={function(v){up(Object.assign({},p,{nType:v}))}} />
      <Co l="col 1" v={p.c1} fn={function(v){up(Object.assign({},p,{c1:v}))}} />
      <Co l="col 2" v={p.c2} fn={function(v){up(Object.assign({},p,{c2:v}))}} />
      <Sl l="scale" v={p.scale} mn={.005} mx={.4} st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up(Object.assign({},p,{scale:v}))}} />
      {p.nType==="perlin" && <Sl l="octaves" v={p.oct} mn={1} mx={8} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{oct:v}))}} />}
      <Sl l="seed"  v={p.seed} mn={0} mx={99} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{seed:v}))}} />
      <Sl l="alpha" v={p.alpha} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{alpha:v}))}} />
    </div>
  )
}
function PatP(props) {
  var p=props.p, up=props.up
  return (
    <div>
      <Se l="type" v={p.pType} opts={PTYPES} fn={function(v){up(Object.assign({},p,{pType:v}))}} />
      <Co l="col 1" v={p.c1} fn={function(v){up(Object.assign({},p,{c1:v}))}} />
      <Co l="col 2" v={p.c2} fn={function(v){up(Object.assign({},p,{c2:v}))}} />
      <Sl l="scale" v={p.scale} mn={.01} mx={.5} st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up(Object.assign({},p,{scale:v}))}} />
      {p.pType==="stripes" && (
        <div>
          <Sl l="width"  v={p.sw}    mn={.01} mx={.5}  st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up(Object.assign({},p,{sw:v}))}} />
          <Sl l="angle°" v={p.angle} mn={0}   mx={180} st={1}    fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{angle:v}))}} />
        </div>
      )}
      {p.pType==="dots" && (
        <div>
          <Sl l="dot r"   v={p.dr} mn={.005} mx={.2}  st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up(Object.assign({},p,{dr:v}))}} />
          <Sl l="spacing" v={p.ds} mn={.02}  mx={.5}  st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up(Object.assign({},p,{ds:v}))}} />
        </div>
      )}
      <Sl l="alpha" v={p.alpha} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{alpha:v}))}} />
    </div>
  )
}
function ImgP(props) {
  var p=props.p, up=props.up, onLoad=props.onLoad
  var uState = useState(p.url||"")
  var u = uState[0], setU = uState[1]
  var fileRef = useRef(null)
  var camRef  = useRef(null)

  function loadBlob(file) {
    if (!file) return
    var blobUrl = URL.createObjectURL(file)
    setU(blobUrl)
    up(Object.assign({},p,{url:blobUrl}))
    onLoad(blobUrl)
  }
  function onFileChange(e) { loadBlob(e.target.files&&e.target.files[0]); e.target.value="" }
  function goUrl() { up(Object.assign({},p,{url:u})); onLoad(u) }

  var btnStyle = {flex:1, textAlign:"center", padding:"4px 0", fontSize:9}

  return (
    <div>
      <input ref={fileRef} type="file" accept="image/*" style={{display:"none"}}
        onChange={onFileChange} />
      <input ref={camRef} type="file" accept="image/*" capture="environment" style={{display:"none"}}
        onChange={onFileChange} />

      <PR l="load">
        <div style={{display:"flex",gap:3,flex:1}}>
          <button className="ac sm" style={btnStyle}
            onClick={function(){ if(fileRef.current)fileRef.current.click() }}
            title="Load from device">
            📁 Device
          </button>
          <button className="ac sm" style={btnStyle}
            onClick={function(){ if(camRef.current)camRef.current.click() }}
            title="Take photo or use camera">
            📷 Camera
          </button>
        </div>
      </PR>

      {p.url && p.url.startsWith("blob:") && (
        <PR l="source">
          <span style={{fontSize:8,color:"var(--ac)",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
            local file loaded ✓
          </span>
        </PR>
      )}

      <PR l="url">
        <input type="text" value={u.startsWith("blob:")?"":u} placeholder="https://…"
          onChange={function(e){ setU(e.target.value) }}
          onKeyDown={function(e){ if(e.key==="Enter") goUrl() }}
          style={{flex:1}} />
        <button className="ac sm" onClick={goUrl} style={{flexShrink:0,marginLeft:2}}>↵</button>
      </PR>

      <Se l="fit" v={p.fit} opts={["contain","cover","fill"]} fn={function(v){up(Object.assign({},p,{fit:v}))}} />
      <Sl l="alpha" v={p.alpha} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{alpha:v}))}} />
    </div>
  )
}
function CreatorProps(props) {
  var node=props.node, onUpdate=props.onUpdate, onLoad=props.onLoad
  function up(p) { onUpdate(Object.assign({},node,{props:p})) }
  return (
    <div className="gp">
      {node.type==="solid"    && <SolidP p={node.props} up={up} />}
      {node.type==="shape"    && <ShapeP p={node.props} up={up} />}
      {node.type==="gradient" && <GradP  p={node.props} up={up} />}
      {node.type==="noise"    && <NoiseP p={node.props} up={up} />}
      {node.type==="pattern"  && <PatP   p={node.props} up={up} />}
      {node.type==="image"    && <ImgP   p={node.props} up={up} onLoad={onLoad} />}
    </div>
  )
}

/* ─── RECURSIVE EFFECT / MASK STACKS ────────────────────── */
function EfxRow(props) {
  var mOpenState = useState(false)
  var mOpen=mOpenState[0], setMOpen=mOpenState[1]
  var efx=props.efx, cfg=ECFG[efx.type]
  function upP(np) { props.onChange(Object.assign({},efx,{params:Object.assign({},efx.params,np)})) }
  return (
    <div className="ei">
      <div className="er">
        <button className="ib" onClick={function(){props.onMv(props.idx,-1)}} disabled={props.idx===0} style={{fontSize:7,padding:"0 2px",lineHeight:1.2}}>▲</button>
        <button className="ib" onClick={function(){props.onMv(props.idx,1)}} disabled={props.idx===props.tot-1} style={{fontSize:7,padding:"0 2px",lineHeight:1.2}}>▼</button>
        <button className="ib" onClick={function(){props.onChange(Object.assign({},efx,{enabled:!efx.enabled}))}} style={{color:efx.enabled?"var(--ac)":"var(--mu)",fontSize:11,padding:"0 2px"}}>{efx.enabled?"●":"○"}</button>
        <span style={{fontSize:8.5,color:efx.enabled?"var(--tx)":"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",minWidth:58,flexShrink:0}}>{efx.type}</span>
        {cfg
          ? <input type="range" min={cfg[1]} max={cfg[2]} step={cfg[3]} value={efx.params[cfg[0]]!=null?efx.params[cfg[0]]:cfg[4]} onChange={function(e){upP({[cfg[0]]:parseFloat(e.target.value)})}} style={{flex:1,minWidth:30}} />
          : efx.type==="curves"
            ? <span style={{fontSize:7.5,color:"var(--di)",flex:1}}>expand ▼</span>
            : <span style={{flex:1}} />
        }
        <input type="range" min={0} max={100} step={1} value={efx.opacity} onChange={function(e){props.onChange(Object.assign({},efx,{opacity:+e.target.value}))}} style={{width:28,flexShrink:0}} />
        <span style={{fontSize:7.5,color:"var(--di)",minWidth:20,textAlign:"right"}}>{Math.round(efx.opacity)}%</span>
        <select value={efx.blendMode} onChange={function(e){props.onChange(Object.assign({},efx,{blendMode:e.target.value}))}} style={{width:50,fontSize:8.5,padding:"1px 2px",flexShrink:0}}>
          {EBMS.map(function(m){return <option key={m}>{m}</option>})}
        </select>
        <button className={efx.maskStack.length>0?"sm lv":"sm"} onClick={function(){setMOpen(!mOpen)}} style={{padding:"1px 4px",fontSize:8}}>
          {efx.maskStack.length>0?"M("+efx.maskStack.length+")":"M"}
        </button>
        <button className="ib dng" onClick={props.onDel} style={{fontSize:11,padding:"0 2px"}}>×</button>
      </div>
      {efx.type==="curves" && mOpen && (
        <div style={{padding:"4px 6px 4px 8px",background:"rgba(4,4,14,.6)"}}>
          <div style={{fontSize:7.5,color:"var(--di)",marginBottom:3}}>INPUT RANGE</div>
          <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:3}}>
            <span style={{fontSize:8,color:"var(--muted)",minWidth:36}}>in black</span>
            <input type="range" min={0} max={254} step={1} value={efx.params.inBlack||0} onChange={function(e){upP({inBlack:+e.target.value})}} style={{flex:1}} />
            <span style={{fontSize:7.5,color:"var(--ac)",minWidth:20}}>{efx.params.inBlack||0}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:3}}>
            <span style={{fontSize:8,color:"var(--muted)",minWidth:36}}>in white</span>
            <input type="range" min={1} max={255} step={1} value={efx.params.inWhite==null?255:efx.params.inWhite} onChange={function(e){upP({inWhite:+e.target.value})}} style={{flex:1}} />
            <span style={{fontSize:7.5,color:"var(--ac)",minWidth:20}}>{efx.params.inWhite==null?255:efx.params.inWhite}</span>
          </div>
          <div style={{fontSize:7.5,color:"var(--di)",marginBottom:3,marginTop:2}}>OUTPUT RANGE</div>
          <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:3}}>
            <span style={{fontSize:8,color:"var(--muted)",minWidth:36}}>out black</span>
            <input type="range" min={0} max={254} step={1} value={efx.params.outBlack||0} onChange={function(e){upP({outBlack:+e.target.value})}} style={{flex:1}} />
            <span style={{fontSize:7.5,color:"var(--ac)",minWidth:20}}>{efx.params.outBlack||0}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:3}}>
            <span style={{fontSize:8,color:"var(--muted)",minWidth:36}}>out white</span>
            <input type="range" min={1} max={255} step={1} value={efx.params.outWhite==null?255:efx.params.outWhite} onChange={function(e){upP({outWhite:+e.target.value})}} style={{flex:1}} />
            <span style={{fontSize:7.5,color:"var(--ac)",minWidth:20}}>{efx.params.outWhite==null?255:efx.params.outWhite}</span>
          </div>
          <div style={{fontSize:7.5,color:"var(--di)",marginBottom:3,marginTop:2}}>S-CURVE</div>
          <div style={{display:"flex",alignItems:"center",gap:3}}>
            <span style={{fontSize:8,color:"var(--muted)",minWidth:36}}>shape</span>
            <input type="range" min={-100} max={100} step={1} value={efx.params.sCurve||0} onChange={function(e){upP({sCurve:+e.target.value})}} style={{flex:1}} />
            <span style={{fontSize:7.5,color:"var(--ac)",minWidth:20}}>{efx.params.sCurve||0}</span>
          </div>
        </div>
      )}
      {efx.type==="transform" && mOpen && (
        <div style={{padding:"4px 6px 4px 8px",background:"rgba(4,4,14,.6)"}}>
          <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:3}}>
            <span style={{fontSize:8,color:"var(--di)",minWidth:42}}>translate x</span>
            <input type="range" min={-0.5} max={0.5} step={.005} value={efx.params.tx||0} onChange={function(e){upP({tx:+e.target.value})}} style={{flex:1}} />
            <span style={{fontSize:7.5,color:"var(--ac)",minWidth:28,textAlign:"right"}}>{Number(efx.params.tx||0).toFixed(3)}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:3}}>
            <span style={{fontSize:8,color:"var(--di)",minWidth:42}}>translate y</span>
            <input type="range" min={-0.5} max={0.5} step={.005} value={efx.params.ty||0} onChange={function(e){upP({ty:+e.target.value})}} style={{flex:1}} />
            <span style={{fontSize:7.5,color:"var(--ac)",minWidth:28,textAlign:"right"}}>{Number(efx.params.ty||0).toFixed(3)}</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:3}}>
            <span style={{fontSize:8,color:"var(--di)",minWidth:42}}>rotation °</span>
            <input type="range" min={-180} max={180} step={1} value={efx.params.rot||0} onChange={function(e){upP({rot:+e.target.value})}} style={{flex:1}} />
            <span style={{fontSize:7.5,color:"var(--ac)",minWidth:28,textAlign:"right"}}>{Math.round(efx.params.rot||0)}°</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:3}}>
            <span style={{fontSize:8,color:"var(--di)",minWidth:42}}>scale unif</span>
            <input type="range" min={0.05} max={4} step={.01} value={efx.params.su!=null?efx.params.su:1} onChange={function(e){upP({su:+e.target.value})}} style={{flex:1}} />
            <span style={{fontSize:7.5,color:"var(--ac)",minWidth:28,textAlign:"right"}}>{Number(efx.params.su!=null?efx.params.su:1).toFixed(2)}×</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:3}}>
            <span style={{fontSize:8,color:"var(--di)",minWidth:42}}>scale x</span>
            <input type="range" min={0.05} max={4} step={.01} value={efx.params.sx!=null?efx.params.sx:1} onChange={function(e){upP({sx:+e.target.value})}} style={{flex:1}} />
            <span style={{fontSize:7.5,color:"var(--ac)",minWidth:28,textAlign:"right"}}>{Number(efx.params.sx!=null?efx.params.sx:1).toFixed(2)}×</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:3}}>
            <span style={{fontSize:8,color:"var(--di)",minWidth:42}}>scale y</span>
            <input type="range" min={0.05} max={4} step={.01} value={efx.params.sy!=null?efx.params.sy:1} onChange={function(e){upP({sy:+e.target.value})}} style={{flex:1}} />
            <span style={{fontSize:7.5,color:"var(--ac)",minWidth:28,textAlign:"right"}}>{Number(efx.params.sy!=null?efx.params.sy:1).toFixed(2)}×</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:3,marginBottom:3}}>
            <span style={{fontSize:8,color:"var(--di)",minWidth:42}}>skew x °</span>
            <input type="range" min={-60} max={60} step={1} value={efx.params.skX||0} onChange={function(e){upP({skX:+e.target.value})}} style={{flex:1}} />
            <span style={{fontSize:7.5,color:"var(--ac)",minWidth:28,textAlign:"right"}}>{Math.round(efx.params.skX||0)}°</span>
          </div>
          <div style={{display:"flex",alignItems:"center",gap:3}}>
            <span style={{fontSize:8,color:"var(--di)",minWidth:42}}>skew y °</span>
            <input type="range" min={-60} max={60} step={1} value={efx.params.skY||0} onChange={function(e){upP({skY:+e.target.value})}} style={{flex:1}} />
            <span style={{fontSize:7.5,color:"var(--ac)",minWidth:28,textAlign:"right"}}>{Math.round(efx.params.skY||0)}°</span>
          </div>
        </div>
      )}
      {efx.type!=="curves" && mOpen && (
        <div className="sm2" style={{margin:"0 0 2px 8px"}}>
          <MaskStack stack={efx.maskStack} autoExpand={true} onChange={function(ms){props.onChange(Object.assign({},efx,{maskStack:ms}))}} nodes={props.nodes} selfId={props.selfId} depth={(props.depth||0)+1} />
        </div>
      )}
      {efx.type==="curves" && (
        <div className="sm2" style={{margin:"0 0 2px 8px"}}>
          <MaskStack stack={efx.maskStack} autoExpand={true} onChange={function(ms){props.onChange(Object.assign({},efx,{maskStack:ms}))}} nodes={props.nodes} selfId={props.selfId} depth={(props.depth||0)+1} />
        </div>
      )}
    </div>
  )
}
var EFX_GROUPS = [
  {label:"Tonal",   items:["brightness","contrast","exposure","levels","curves","posterize"]},
  {label:"Colour",  items:["hue-shift","saturation"]},
  {label:"Pixel",   items:["blur","invert","threshold"]},
  {label:"Transform", items:["transform"]},
]
function EfxStack(props) {
  var menuState = useState(false)
  var menuOpen=menuState[0], setMenuOpen=menuState[1]
  var menuRef = useRef(null)

  useEffect(function() {
    if (!menuOpen) return
    function onDown(e) { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false) }
    document.addEventListener("mousedown", onDown)
    return function() { document.removeEventListener("mousedown", onDown) }
  }, [menuOpen])

  function addEfx(type) { props.onChange(props.stack.concat([mkEfx(type)])); setMenuOpen(false) }
  function upd(id,nw) { props.onChange(props.stack.map(function(e){return e.id===id?nw:e})) }
  function del(id) { props.onChange(props.stack.filter(function(e){return e.id!==id})) }
  function mv(idx,dir) {
    var ni=Math.max(0,Math.min(props.stack.length-1,idx+dir)); if(ni===idx)return
    var a=props.stack.slice(), tmp=a[idx]; a[idx]=a[ni]; a[ni]=tmp; props.onChange(a)
  }
  return (
    <div className="se">
      {props.stack.length===0 && <div style={{padding:"2px 6px",fontSize:8,color:"var(--di)"}}>no effects</div>}
      {props.stack.map(function(e,i){
        return (
          <EfxRow key={e.id} efx={e} idx={i} tot={props.stack.length}
            onChange={function(nw){upd(e.id,nw)}} onDel={function(){del(e.id)}} onMv={mv}
            nodes={props.nodes} selfId={props.selfId} depth={props.depth||0} />
        )
      })}
      <div className="ad" style={{position:"relative"}} ref={menuRef}>
        <button className="ac sm" style={{width:"100%"}} onClick={function(){setMenuOpen(!menuOpen)}}>
          + add effect ▾
        </button>
        {menuOpen && (
          <div style={{
            position:"absolute",bottom:"100%",left:0,right:0,zIndex:400,
            background:"#0e0e28",border:"1px solid var(--bd)",borderRadius:"3px",
            boxShadow:"0 -6px 20px rgba(0,0,0,.7)",overflow:"hidden",marginBottom:2
          }}>
            {EFX_GROUPS.map(function(grp) {
              return (
                <div key={grp.label}>
                  <div style={{fontSize:7,color:"var(--mu)",textTransform:"uppercase",letterSpacing:".1em",padding:"4px 8px 2px",borderTop:"1px solid rgba(255,255,255,.04)"}}>
                    {grp.label}
                  </div>
                  {grp.items.map(function(t) {
                    return (
                      <div key={t}
                        onClick={function(){addEfx(t)}}
                        style={{padding:"4px 12px",fontSize:9.5,color:"var(--tx)",cursor:"pointer",fontFamily:"'IBM Plex Mono',monospace",transition:"background .08s"}}
                        onMouseEnter={function(e){e.currentTarget.style.background="var(--sl)";e.currentTarget.style.color="var(--ac)"}}
                        onMouseLeave={function(e){e.currentTarget.style.background="";e.currentTarget.style.color="var(--tx)"}}>
                        {t}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
function MaskRow(props) {
  var eOpenState = useState(false)
  var eOpen=eOpenState[0], setEOpen=eOpenState[1]
  var mk=props.mk
  return (
    <div className="mi">
      <div className="mr">
        <button className="ib" onClick={function(){props.onMv(props.idx,-1)}} disabled={props.idx===0} style={{fontSize:7,padding:"0 2px",lineHeight:1.2}}>▲</button>
        <button className="ib" onClick={function(){props.onMv(props.idx,1)}} disabled={props.idx===props.tot-1} style={{fontSize:7,padding:"0 2px",lineHeight:1.2}}>▼</button>
        <span style={{fontSize:10,color:"var(--lv)",padding:"0 2px",flexShrink:0}}>◈</span>
        <select value={mk.refId||""} onChange={function(e){props.onChange(Object.assign({},mk,{refId:e.target.value||null}))}} style={{flex:2,minWidth:55,fontSize:8.5,padding:"1px 2px"}}>
          <option value="">—src—</option>
          {props.nodes.filter(function(n){return n.id!==props.selfId&&n.section===1}).map(function(n){return <option key={n.id} value={n.id}>{n.name}</option>})}
          {props.nodes.filter(function(n){return n.id!==props.selfId&&n.section===2}).map(function(n){return <option key={n.id} value={n.id}>{n.name}</option>})}
        </select>
        <select value={mk.channel} onChange={function(e){props.onChange(Object.assign({},mk,{channel:e.target.value}))}} style={{width:36,fontSize:8.5,padding:"1px 2px",flexShrink:0}}>
          {MCH.map(function(c){return <option key={c}>{c}</option>})}
        </select>
        <input type="range" min={0} max={1} step={.01} value={mk.strength} onChange={function(e){props.onChange(Object.assign({},mk,{strength:+e.target.value}))}} style={{width:26,flexShrink:0}} />
        <button className={mk.invert?"sm ac":"sm"} onClick={function(){props.onChange(Object.assign({},mk,{invert:!mk.invert}))}} style={{padding:"0 4px",fontSize:8}}>inv</button>
        <input type="range" min={0} max={100} step={1} value={mk.opacity} onChange={function(e){props.onChange(Object.assign({},mk,{opacity:+e.target.value}))}} style={{width:26,flexShrink:0}} />
        <span style={{fontSize:7.5,color:"var(--di)",minWidth:18,textAlign:"right"}}>{Math.round(mk.opacity)}%</span>
        <select value={mk.blendMode} onChange={function(e){props.onChange(Object.assign({},mk,{blendMode:e.target.value}))}} style={{width:44,fontSize:8.5,padding:"1px 2px",flexShrink:0}}>
          {MBMS.map(function(m){return <option key={m}>{m}</option>})}
        </select>
        <button className={mk.effectStack.length>0?"sm ac":"sm"} onClick={function(){setEOpen(!eOpen)}} style={{padding:"1px 4px",fontSize:8}}>
          {mk.effectStack.length>0?"E("+mk.effectStack.length+")":"E"}
        </button>
        <button className="ib dng" onClick={props.onDel} style={{fontSize:11,padding:"0 2px"}}>×</button>
      </div>
      {eOpen && (
        <div className="se" style={{margin:"0 0 2px 8px"}}>
          <EfxStack stack={mk.effectStack} onChange={function(es){props.onChange(Object.assign({},mk,{effectStack:es}))}} nodes={props.nodes} selfId={props.selfId} depth={(props.depth||0)+1} />
        </div>
      )}
    </div>
  )
}
function MaskStack(props) {
  // If autoExpand, add first mask immediately on mount (called from EfxRow M button)
  useEffect(function() {
    if (props.autoExpand && props.stack.length === 0) {
      props.onChange([mkMask()])
    }
  }, [])

  function add() { props.onChange(props.stack.concat([mkMask()])) }
  function upd(id,nw) { props.onChange(props.stack.map(function(m){return m.id===id?nw:m})) }
  function del(id) { props.onChange(props.stack.filter(function(m){return m.id!==id})) }
  function mv(i,d) {
    var ni=Math.max(0,Math.min(props.stack.length-1,i+d)); if(ni===i)return
    var a=props.stack.slice(), tmp=a[i]; a[i]=a[ni]; a[ni]=tmp; props.onChange(a)
  }
  return (
    <div className="sm2">
      {props.stack.map(function(m,i){
        return (
          <MaskRow key={m.id} mk={m} idx={i} tot={props.stack.length}
            onChange={function(nw){upd(m.id,nw)}} onDel={function(){del(m.id)}} onMv={mv}
            nodes={props.nodes} selfId={props.selfId} depth={props.depth||0} />
        )
      })}
      <div className="ad">
        <button className="lv sm" onClick={add}>+ mask</button>
      </div>
    </div>
  )
}

/* ─── COLLAPSIBLE STACK SECTION ─────────────────────────── */
function StackSect(props) {
  var openState = useState(false)
  var open=openState[0], setOpen=openState[1]
  return (
    <div>
      <div className="ps" onClick={function(){setOpen(!open)}}>
        <span style={{fontSize:8,color:open?"var(--ac)":"var(--di)"}}>{open?"▼":"▶"}</span>
        <span className="psl">{props.label}</span>
        {props.n>0 && <span className={props.isE?"bdg bac":"bdg blv"}>{props.n}</span>}
      </div>
      {open && <div style={{background:"rgba(4,4,14,.5)"}}>{props.children}</div>}
    </div>
  )
}

/* ─── SLOT PANEL ─────────────────────────────────────────── */
function SlotPanel(props) {
  var slot=props.slot, onChange=props.onChange, nodes=props.nodes, selfId=props.selfId
  return (
    <div style={{borderTop:"1px solid var(--bd)"}}>
      <div style={{padding:"4px 8px",background:"rgba(6,6,20,.9)"}}>
        <div style={{fontSize:8.5,color:props.accent,fontFamily:"'Syne',sans-serif",fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",marginBottom:3}}>{props.label}</div>
        <NRef l="source" v={slot.refId} nodes={nodes} selfId={selfId} fn={function(v){onChange(Object.assign({},slot,{refId:v}))}} />
      </div>
      <StackSect label="Effect Stack" n={slot.effectStack.length} isE={true}>
        <EfxStack stack={slot.effectStack} onChange={function(es){onChange(Object.assign({},slot,{effectStack:es}))}} nodes={nodes} selfId={selfId} />
      </StackSect>
      <StackSect label="Mask Stack" n={slot.maskStack.length} isE={false}>
        <MaskStack stack={slot.maskStack} onChange={function(ms){onChange(Object.assign({},slot,{maskStack:ms}))}} nodes={nodes} selfId={selfId} />
      </StackSect>
    </div>
  )
}

/* ─── BLENDER PROPS ─────────────────────────────────────── */
function BlenderProps(props) {
  var node=props.node, onChange=props.onChange, nodes=props.nodes
  return (
    <div>
      <SlotPanel label="Input A" slot={node.inputA} onChange={function(s){onChange(Object.assign({},node,{inputA:s}))}} nodes={nodes} selfId={node.id} accent="var(--ac)" />
      <div style={{padding:"5px 8px",background:"rgba(4,4,16,.9)",borderTop:"1px solid var(--bd)",borderBottom:"1px solid var(--bd)"}}>
        <div style={{fontSize:8.5,color:"var(--di)",fontFamily:"'Syne',sans-serif",fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",marginBottom:4}}>Blend</div>
        <Se l="mode"   v={node.mode}   opts={BMODES} fn={function(v){onChange(Object.assign({},node,{mode:v}))}} />
        <Sl l="amount" v={node.amount} mn={0} mx={100} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){onChange(Object.assign({},node,{amount:v}))}} />
        <PR l="switch">
          <button onClick={function(){onChange(Object.assign({},node,{switched:!node.switched}))}} className={node.switched?"ac":""} style={{fontSize:8.5}}>
            {node.switched?"B→A (switched)":"A→B (normal)"}
          </button>
        </PR>
      </div>
      <SlotPanel label="Input B" slot={node.inputB} onChange={function(s){onChange(Object.assign({},node,{inputB:s}))}} nodes={nodes} selfId={node.id} accent="var(--co)" />
      <div style={{borderTop:"1px solid var(--bd)"}}>
        <div style={{padding:"3px 8px",background:"rgba(6,6,20,.9)"}}>
          <div style={{fontSize:8.5,color:"var(--lv)",fontFamily:"'Syne',sans-serif",fontWeight:700,textTransform:"uppercase",letterSpacing:".1em"}}>Output</div>
        </div>
        <StackSect label="Output Effects" n={node.outEfx.length} isE={true}>
          <EfxStack stack={node.outEfx} onChange={function(es){onChange(Object.assign({},node,{outEfx:es}))}} nodes={nodes} selfId={node.id} />
        </StackSect>
        <StackSect label="Output Masks" n={node.outMask.length} isE={false}>
          <MaskStack stack={node.outMask} onChange={function(ms){onChange(Object.assign({},node,{outMask:ms}))}} nodes={nodes} selfId={node.id} />
        </StackSect>
      </div>
    </div>
  )
}

/* ─── NODE ITEM ROW ─────────────────────────────────────── */
var TDOT = {solid:"#3850a0",shape:"#18b860",gradient:"#7820b0",noise:"#a87018",pattern:"#1878b0",image:"#2060a8",blender:"#b82880"}

function NodeItem(props) {
  var node=props.node
  var edState  = useState(false);     var ed=edState[0],   setEd=edState[1]
  var nmState  = useState(node.name); var nm=nmState[0],   setNm=nmState[1]
  var armedSt  = useState(false);     var armed=armedSt[0],setArmed=armedSt[1]
  var inR    = useRef(null)
  var timerR = useRef(null)

  useEffect(function(){setNm(node.name)},[node.name])
  useEffect(function(){if(ed&&inR.current)inR.current.focus()},[ed])
  useEffect(function(){
    return function(){ if(timerR.current)clearTimeout(timerR.current) }
  },[])

  function commit(){setEd(false);if(nm.trim())props.onRen(nm.trim());else setNm(node.name)}

  function handleDel(e) {
    e.stopPropagation()
    if (!armed) {
      setArmed(true)
      timerR.current = setTimeout(function(){ setArmed(false) }, 3000)
    } else {
      clearTimeout(timerR.current)
      setArmed(false)
      props.onDel(node.id)
    }
  }

  return (
    <div className={"nrow"+(props.isSel?" sel":"")+(props.isDsp?" dsp":"")+(!node.enabled?" off":"")}
      onClick={function(){
        if(armed){ setArmed(false); clearTimeout(timerR.current); return }
        props.onSel(node.id)
      }}>
      <div style={{width:6,height:6,borderRadius:"50%",background:TDOT[node.type]||"#555",flexShrink:0}} />
      <div style={{flex:1,overflow:"hidden",minWidth:0}}>
        {ed
          ? <input ref={inR} className="ni" value={nm} onChange={function(e){setNm(e.target.value)}} onBlur={commit}
              onKeyDown={function(e){if(e.key==="Enter")commit();if(e.key==="Escape"){setEd(false);setNm(node.name)}}}
              onClick={function(e){e.stopPropagation()}} />
          : <span onDoubleClick={function(e){e.stopPropagation();setEd(true)}} style={{fontSize:10.5,color:props.isDsp?"var(--lv)":node.enabled?"var(--tx)":"#7080a8",fontFamily:"'IBM Plex Mono',monospace",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block",userSelect:"none"}}>{node.name}</span>
        }
      </div>
      <span className={"ftag "+(node.section===1?"tgn":"tco")}>{node.type}</span>
      <button className="ibq nrow-tog-off" onClick={function(e){e.stopPropagation();props.onTog(node.id)}}
        style={{color:node.enabled?"var(--ac)":undefined,fontSize:12}}>
        {node.enabled?"●":"○"}
      </button>
      <button className="ibq nrow-dsp-off" onClick={function(e){e.stopPropagation();props.onDsp(node.id)}}
        style={{color:props.isDsp?"var(--lv)":undefined,fontSize:13}}>
        {props.isDsp?"◉":"◎"}
      </button>
      <button className={"nrow-del"+(armed?" armed":"")} onClick={handleDel}
        title={armed?"click again to confirm delete":"delete"}>
        {armed?"✕ sure?":"×"}
      </button>
    </div>
  )
}

/* ─── ADD MENU ──────────────────────────────────────────── */
function AddMenu(props) {
  var openState = useState(false); var open=openState[0], setOpen=openState[1]
  var ref = useRef(null)
  useEffect(function(){
    if(!open)return
    function h(e){if(ref.current&&!ref.current.contains(e.target))setOpen(false)}
    document.addEventListener("mousedown",h)
    return function(){document.removeEventListener("mousedown",h)}
  },[open])
  var s1=[{t:"solid",l:"Solid Colour"},{t:"shape",l:"Shape"},{t:"gradient",l:"Gradient"},{t:"noise",l:"Noise Field"},{t:"pattern",l:"Pattern"},{t:"image",l:"Image"}]
  var items=props.sec===1?s1:[{t:"blender",l:"Blender"}]
  return (
    <div ref={ref} style={{position:"relative"}}>
      <button className="ac" onClick={function(){setOpen(!open)}} style={{fontSize:8.5,padding:"2px 7px"}}>+Add▾</button>
      {open && (
        <div className="dm">
          {items.map(function(item){
            return <div key={item.t} className="dmi" onClick={function(){props.onAdd(item.t,props.sec);setOpen(false)}}>{item.l}</div>
          })}
        </div>
      )}
    </div>
  )
}

/* ─── SECTION ───────────────────────────────────────────── */
function Section(props) {
  var items=props.nodes.filter(function(n){return n.section===props.sec})
  return (
    <div style={{display:"flex",flexDirection:"column",flex:props.collapsed?"0 0 auto":1,overflow:"hidden",borderBottom:"1px solid var(--bd)"}}>
      <div className="shdr" style={{cursor:"pointer"}} onClick={props.onToggle}>
        <span style={{fontSize:9,color:"var(--tx)"}}>{props.collapsed?"▶":"▼"}</span>
        <span className="slbl" style={{flex:1,color:props.sec===1?"var(--gn)":"var(--co)"}}>{props.title}</span>
        <span style={{fontSize:8.5,color:"var(--mu)",marginRight:5}}>{items.length}</span>
        <div onClick={function(e){e.stopPropagation()}}><AddMenu sec={props.sec} onAdd={props.onAdd} /></div>
      </div>
      {!props.collapsed && (
        <div style={{flex:1,overflowY:"auto",overflowX:"hidden"}}>
          {items.length===0 && <div style={{padding:10,color:"var(--di)",fontSize:9.5,textAlign:"center"}}>no items</div>}
          {items.map(function(node){
            var isSel=props.selId===node.id, isDsp=props.dispId===node.id
            return (
              <div key={node.id}>
                <NodeItem node={node} isSel={isSel} isDsp={isDsp}
                  onSel={function(id){props.onSel(id===props.selId?null:id)}}
                  onDsp={props.onDsp} onDel={props.onDel}
                  onRen={function(name){props.onRen(node.id,name)}} onTog={props.onTog} />
                {isSel && (
                  <div className="pw">
                    {props.sec===1
                      ? <CreatorProps node={node} onUpdate={props.onUpd} onLoad={props.onLoad} />
                      : <BlenderProps node={node} onChange={props.onUpd} nodes={props.nodes} />
                    }
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/* ─── LIVE PREVIEW ──────────────────────────────────────── */
function LivePreview(props) {
  var zoomState = useState(1); var zoom=zoomState[0], setZoom=zoomState[1]
  var fmtState  = useState("png"); var fmt=fmtState[0], setFmt=fmtState[1]
  return (
    <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
      <div style={{display:"flex",alignItems:"center",gap:4,padding:"4px 9px",background:"var(--pn)",borderBottom:"1px solid var(--bd)",flexShrink:0,flexWrap:"wrap"}}>
        <span className="slbl" style={{fontSize:9,color:"var(--tx)"}}>Live Preview</span>
        {props.active
          ? <span style={{fontSize:8,padding:"1px 5px",borderRadius:2,background:"rgba(168,78,232,.12)",color:"#b878ee",border:"1px solid rgba(168,78,232,.24)"}}>◉ {props.active.name}</span>
          : <span style={{fontSize:8,color:"var(--di)"}}>—none—</span>}
        <span style={{flex:1}} />
        <select value={String(props.sz)} onChange={function(e){props.onResize(parseInt(e.target.value))}} style={{width:55,fontSize:8.5,padding:"1px 3px"}}>
          {["256","400","512","768","1024"].map(function(s){return <option key={s} value={s}>{s}</option>})}
        </select>
        <button onClick={function(){setZoom(function(z){return Math.max(.25,z-.25)})}} style={{padding:"1px 5px",fontSize:11}}>−</button>
        <span style={{fontSize:8.5,color:"var(--di)",minWidth:26,textAlign:"center"}}>{Math.round(zoom*100)}%</span>
        <button onClick={function(){setZoom(function(z){return Math.min(4,z+.25)})}} style={{padding:"1px 5px",fontSize:11}}>+</button>
        <button onClick={function(){setZoom(1)}} style={{padding:"1px 4px",fontSize:8.5}}>1:1</button>
        <select value={fmt} onChange={function(e){setFmt(e.target.value)}} style={{width:46,fontSize:8.5,padding:"1px 2px"}}>
          {["png","jpeg","webp"].map(function(f){return <option key={f}>{f}</option>})}
        </select>
        <button className="ac" onClick={function(){props.onExport(fmt)}} style={{padding:"1px 7px",fontSize:8.5}}>↓export</button>
      </div>
      <div className="checker" style={{flex:1,overflow:"auto",display:"flex",alignItems:"center",justifyContent:"center",padding:16,position:"relative"}}>
        {!props.active && (
          <div style={{position:"absolute",textAlign:"center",pointerEvents:"none"}}>
            <div style={{fontSize:28,color:"var(--bd)",marginBottom:6}}>◎</div>
            <div style={{fontSize:9,color:"var(--mu)"}}>Click ◎ on any item to preview</div>
          </div>
        )}
        <div style={{transform:"scale("+zoom+")",transformOrigin:"center center",boxShadow:"0 12px 50px rgba(0,0,0,.85),0 0 0 1px rgba(255,255,255,.04)",lineHeight:0}}>
          <canvas ref={props.cvRef} width={props.sz} height={props.sz} style={{display:"block",imageRendering:zoom>2?"pixelated":"auto"}} />
        </div>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:8,padding:"3px 9px",background:"var(--pn)",borderTop:"1px solid var(--bd)",flexShrink:0}}>
        <span style={{fontSize:8,color:"var(--di)"}}>{props.sz}×{props.sz}px</span>
        {props.active && <span style={{fontSize:8,color:"var(--di)",fontFamily:"'IBM Plex Mono',monospace"}}>[{props.active.type}]</span>}
        <span style={{flex:1}} />
        <span style={{fontSize:7,color:"var(--bd)",letterSpacing:".1em"}}>NLICS v3.1</span>
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
  var s9 = useState(false);       var flipped=s9[0], setFlipped=s9[1]
  var s10= useState(false);       var leftFS=s10[0], setLeftFS=s10[1]
  var s11= useState(false);       var rightFS=s11[0],setRightFS=s11[1]
  var s12= useState(400);         var sz=s12[0],     setSz=s12[1]

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
  useEffect(function(){
    if(cvRef.current)renderPipeline(cvRef.current,dispId,nodes,iC.current)
  },[nodes,dispId,sz])

  function loadUrl(url){
    if(!url||iC.current.has(url))return
    var img=new Image(); img.crossOrigin="anonymous"
    img.onload=function(){iC.current.set(url,img);var st=stRef.current;renderPipeline(cvRef.current,st.dispId,st.nodes,iC.current)}
    img.onerror=function(){iC.current.set(url,{complete:false,naturalWidth:0})}
    img.src=url; iC.current.set(url,img)
  }
  function add(type,sec){pushHistory({nodes:nodes});var n=type==="blender"?mkBlender():mkNode(type);n.section=sec;setNodes(function(p){return p.concat([n])});setSelId(n.id)}
  function del(id){pushHistory({nodes:nodes});setNodes(function(p){return p.filter(function(n){return n.id!==id})});if(selId===id)setSelId(null);if(dispId===id)setDispId(null)}
  function upd(u){setNodes(function(p){return p.map(function(n){return n.id===u.id?u:n})})}
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
    var next  = Math.max(15, Math.min(85, dr.pct0 + (delta / dr.tot) * 100))
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
  var sp={nodes:nodes,selId:selId,dispId:dispId,onSel:sel,onDsp:dsp,onDel:del,onAdd:add,onUpd:upd,onLoad:loadUrl,onRen:ren,onTog:tog}

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
  function exitFS() { setLeftFS(false); setRightFS(false) }

  return (
    <div ref={appRef} onPointerMove={handleRootPointerMove} onPointerUp={handleRootPointerUp} style={{display:"flex",flexDirection:isVert?"column":"row",height:"100vh",width:"100vw",overflow:"hidden",background:"var(--bg)",fontFamily:"'IBM Plex Mono','Courier New',monospace",fontSize:12,color:"var(--tx)"}}>
      <StyleInjector />

      {anyFS && (
        <button className="fs-escape" onClick={function(){setLeftFS(false);setRightFS(false)}}>
          ⊠ exit fullscreen
        </button>
      )}

      <div style={flipped&&isVert ? rightBoxStyle : leftBoxStyle}>
        {flipped&&isVert ? (
          <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",
            padding:isVert?"8px 12px":"5px 9px",gap:isVert?12:6,
            background:"var(--bg)",borderBottom:"1px solid var(--bd)",flexShrink:0}}>
            <button className={"hico"+(rightFS?" exit":"")+(isVert?" vert":"")}
              onClick={function(){setRightFS(!rightFS)}}
              title={rightFS?"Exit fullscreen":"Expand preview"}>
              {rightFS?"⊠":"⊡"}
            </button>
          </div>
        ) : (
          <div style={{display:"flex",alignItems:"center",
            padding:isVert?"8px 12px":"5px 9px",gap:isVert?12:6,
            background:"var(--bg)",borderBottom:"1px solid var(--bd)",flexShrink:0}}>
            <span style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:800,color:"var(--ac)",letterSpacing:".2em"}}>NLICS</span>
            <span style={{fontSize:7,color:"var(--mu)",marginTop:1}}>Non-Linear Image Compositing</span>
            <span style={{fontSize:6.5,color:"var(--di)",marginTop:1}}>⌘Z</span>
            <span style={{flex:1}} />
            <button className={"hico"+(isVert?" vert":"")} title="Toggle layout orientation"
              onClick={function(){setIsVert(!isVert)}}>
              {isVert?"⇔":"⇕"}
            </button>
            {isVert && (
              <button className="hico vert" title="Flip panel order"
                onClick={function(){setFlipped(!flipped)}}>
                ⇅
              </button>
            )}
            <button className={"hico"+(leftFS?" exit":"")+(isVert?" vert":"")}
              title={leftFS?"Exit fullscreen":"Expand left panel"}
              onClick={function(){setLeftFS(!leftFS)}}>
              {leftFS?"⊠":"⊞"}
            </button>
          </div>
        )}
        {flipped&&isVert
          ? <LivePreview cvRef={cvRef} active={active} sz={sz} onResize={handleResize} onExport={doExport} />
          : <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden"}}>
              <Section sec={1} title="§1 · Pixel Creators" {...sp} collapsed={s1Col} onToggle={function(){setS1Col(!s1Col)}} />
              <Section sec={2} title="§2 · Compositors"   {...sp} collapsed={s2Col} onToggle={function(){setS2Col(!s2Col)}} />
            </div>
        }
      </div>

      <div ref={divHook.ref} onPointerDown={divHook.onPointerDown} className={isVert?"divv":"divh"} style={{userSelect:"none"}} />

      <div style={flipped&&isVert ? leftBoxStyle : rightBoxStyle}>
        {flipped&&isVert ? (
          <div style={{display:"flex",alignItems:"center",
            padding:isVert?"8px 12px":"5px 9px",gap:isVert?12:6,
            background:"var(--bg)",borderBottom:"1px solid var(--bd)",flexShrink:0}}>
            <span style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:800,color:"var(--ac)",letterSpacing:".2em"}}>NLICS</span>
            <span style={{fontSize:7,color:"var(--mu)",marginTop:1}}>Non-Linear Image Compositing</span>
            <span style={{fontSize:6.5,color:"var(--di)",marginTop:1}}>⌘Z</span>
            <span style={{flex:1}} />
            <button className={"hico"+(isVert?" vert":"")} title="Toggle layout orientation"
              onClick={function(){setIsVert(!isVert)}}>
              {isVert?"⇔":"⇕"}
            </button>
            {isVert && (
              <button className="hico vert" title="Flip panel order"
                onClick={function(){setFlipped(!flipped)}}>
                ⇅
              </button>
            )}
            <button className={"hico"+(leftFS?" exit":"")+(isVert?" vert":"")}
              title={leftFS?"Exit fullscreen":"Expand left panel"}
              onClick={function(){setLeftFS(!leftFS)}}>
              {leftFS?"⊠":"⊞"}
            </button>
          </div>
        ) : (
          <div style={{display:"flex",alignItems:"center",justifyContent:"flex-end",
            padding:isVert?"8px 12px":"5px 9px",gap:isVert?12:6,
            background:"var(--bg)",borderBottom:"1px solid var(--bd)",flexShrink:0}}>
            <button className={"hico"+(rightFS?" exit":"")+(isVert?" vert":"")}
              title={rightFS?"Exit fullscreen":"Expand preview"}
              onClick={function(){setRightFS(!rightFS)}}>
              {rightFS?"⊠":"⊡"}
            </button>
          </div>
        )}
        {flipped&&isVert
          ? <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden"}}>
              <Section sec={1} title="§1 · Pixel Creators" {...sp} collapsed={s1Col} onToggle={function(){setS1Col(!s1Col)}} />
              <Section sec={2} title="§2 · Compositors"   {...sp} collapsed={s2Col} onToggle={function(){setS2Col(!s2Col)}} />
            </div>
          : <LivePreview cvRef={cvRef} active={active} sz={sz} onResize={handleResize} onExport={doExport} />
        }
      </div>

      <div className={"undo-toast"+(toastOn?" show":"")}>↩ undo restored</div>
    </div>
  )
}
