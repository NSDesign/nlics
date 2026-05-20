import { useState, useEffect, useRef, Component, cloneElement, Children } from "react"
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
input[type=range]::-moz-range-thumb{width:22px;height:22px;border-radius:50%;background:var(--ac);cursor:pointer;border:none;}
.expr-ref input[type=range]::-webkit-slider-thumb{background:var(--lv);box-shadow:0 2px 8px rgba(176,96,240,.4);}
.expr-ref input[type=range]::-moz-range-thumb{background:var(--lv);}
.expr-val input[type=range]::-webkit-slider-thumb{background:var(--bg);box-shadow:0 0 0 2.5px rgba(176,96,240,.8),0 2px 6px rgba(0,0,0,.4);}
.expr-val input[type=range]::-moz-range-thumb{background:var(--bg);border:2.5px solid rgba(176,96,240,.8);}
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
/* ── Expression editor (expVals) ── */
.expr-icon{width:26px;height:var(--tap-sm);display:inline-flex;align-items:center;justify-content:center;background:none;border:none;font-size:13px;color:var(--mu);cursor:pointer;flex-shrink:0;border-radius:4px;font-family:'IBM Plex Mono',monospace;padding:0;transition:color .12s;}
.expr-icon.active{color:var(--lv);}
.expr-icon:hover,.expr-icon:active{color:var(--tx);background:none;border:none;}
.expr-pill-row{display:flex;flex-wrap:wrap;align-items:center;gap:4px;padding:3px 8px 7px 84px;}
.expr-pill{display:inline-flex;align-items:center;background:var(--sl);border:1px solid var(--bd);border-radius:20px;font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--tx);padding:0 8px;min-height:28px;gap:2px;flex-shrink:0;}
.expr-pill.op{color:var(--di);padding:0 2px;background:none;border:none;cursor:pointer;font-size:14px;min-height:28px;}
.expr-pill.op:hover,.expr-pill.op:active{color:var(--tx);background:none;border:none;}
.expr-pill.term{padding:0 4px 0 0;cursor:default;overflow:hidden;}
.expr-type-badge{background:none;border:none;border-right:1px solid var(--bd);color:var(--mu);font-size:9px;font-family:'IBM Plex Mono',monospace;cursor:pointer;padding:0 6px;min-height:0;height:28px;line-height:1;display:inline-flex;align-items:center;flex-shrink:0;transition:color .1s;}
.expr-type-badge:hover,.expr-type-badge:active{color:var(--ac);background:none;border-right:1px solid var(--bd);}
.expr-pill.term .term-body{display:inline-flex;align-items:center;gap:2px;padding:0 2px 0 5px;}
.expr-pill.term input{background:none;border:none;color:var(--ac);font-family:'IBM Plex Mono',monospace;font-size:10px;width:40px;outline:none;text-align:center;padding:0;min-height:0;}
.expr-pill.rand-pill .term-body input{width:32px;}
.rand-sep{color:var(--mu);font-size:9px;padding:0 1px;}
.ref-tap{color:var(--lv);font-size:9px;cursor:pointer;font-style:italic;}
.expr-pill.add-btn{color:var(--ac);border-style:dashed;cursor:pointer;padding:0 10px;font-size:14px;}
.expr-pill.add-btn:hover{background:var(--el);border-color:var(--ac);}
.expr-pill-rm{color:var(--mu);font-size:10px;margin-left:2px;cursor:pointer;background:none;border:none;padding:0 2px;min-height:0;line-height:1;display:inline-flex;align-items:center;}
.expr-pill-rm:hover,.expr-pill-rm:active{color:var(--dng);background:none;border:none;}
.expr-clear{font-size:9px;color:var(--mu);background:none;border:none;cursor:pointer;padding:0 4px;min-height:0;font-family:'IBM Plex Mono',monospace;}
.expr-clear:hover,.expr-clear:active{color:var(--dng);background:none;border:none;}
.expr-locked input[type=range]{opacity:.3;pointer-events:none;}
.expr-ref.expr-locked input[type=range]::-webkit-slider-thumb{background:var(--lv);opacity:.35;}
.expr-val.expr-locked input[type=range]::-webkit-slider-thumb{background:var(--bg);box-shadow:0 0 0 2.5px rgba(176,96,240,.5);}
/* ── Ref picker sheet ── */
.rp-scrim{position:fixed;inset:0;z-index:1200;background:rgba(0,0,0,.55);display:flex;flex-direction:column;justify-content:flex-end;}
.rp-sheet{background:var(--pn);border-radius:18px 18px 0 0;max-height:78vh;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 -8px 40px rgba(0,0,0,.7);}
.rp-grip{width:40px;height:4px;background:var(--bd);border-radius:2px;margin:10px auto 0;flex-shrink:0;}
.rp-hdr{display:flex;align-items:center;gap:8px;padding:10px 16px 10px;border-bottom:1px solid var(--bd);flex-shrink:0;}
.rp-hdr-title{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:var(--tx);flex:1;}
.rp-hdr-sub{font-size:10px;color:var(--mu);font-family:'IBM Plex Mono',monospace;}
.rp-back{background:none;border:none;color:var(--ac);font-size:11px;font-family:'IBM Plex Mono',monospace;cursor:pointer;padding:0 4px;min-height:0;}
.rp-back:hover{color:var(--tx);background:none;border:none;}
.rp-scroll{flex:1;overflow-y:auto;padding:8px 0 32px;}
.rp-section-lbl{font-size:9px;color:var(--mu);text-transform:uppercase;letter-spacing:.12em;padding:10px 16px 4px;font-family:'IBM Plex Mono',monospace;}
.rp-row{display:flex;align-items:center;gap:10px;padding:11px 16px;cursor:pointer;border-bottom:1px solid rgba(37,37,80,.6);transition:background .08s;}
.rp-row:hover,.rp-row:active{background:var(--sf);}
.rp-row.self{border-left:3px solid var(--ac);}
.rp-row-name{flex:1;font-size:12px;color:var(--tx);font-family:'IBM Plex Mono',monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.rp-row-type{font-size:9px;color:var(--mu);background:var(--el);border:1px solid var(--bd);border-radius:10px;padding:2px 7px;flex-shrink:0;font-family:'IBM Plex Mono',monospace;}
.rp-prop-row{display:flex;align-items:center;padding:12px 16px;cursor:pointer;border-bottom:1px solid rgba(37,37,80,.6);transition:background .08s;gap:10px;}
.rp-prop-row:hover,.rp-prop-row:active{background:var(--sf);}
.rp-prop-lbl{flex:1;font-size:12px;color:var(--tx);font-family:'IBM Plex Mono',monospace;}
.rp-prop-val{font-size:10px;color:var(--ac);font-family:'IBM Plex Mono',monospace;flex-shrink:0;}
.rp-empty{padding:24px 16px;font-size:11px;color:var(--mu);font-family:'IBM Plex Mono',monospace;text-align:center;}
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

// ── ExprEditor: expression value system (expVals) UI components ──────────────

// Display labels for node types in ref picker
var NODE_TYPE_LABEL = {
  solid:'solid', shape:'shape', gradient:'gradient', noise:'noise',
  pattern:'pattern', tile:'tile', image:'image', 'uv-create':'UV',
  layers:'layers', blender:'blender', stack:function(n){return n.stackType||'stack'},
  promoted:'tap', 'point-comp':'points', 'uv-distort':'UV distort',
}
function nodeTypeLabel(n) {
  var v = NODE_TYPE_LABEL[n.type]
  if(!v) return n.type
  return typeof v==='function' ? v(n) : v
}

// Get current numeric value for a prop path from a node
function getNodePropVal(node, propKey) {
  // propKey is like "props.sz" or "props.cols"
  var parts = propKey.split('.')
  var cur = node
  for(var i=0;i<parts.length;i++) cur = cur ? cur[parts[i]] : null
  if(cur == null || typeof cur !== 'number') return null
  return cur
}

// RefPickerSheet — two-step bottom sheet: node list → property list
function RefPickerSheet(props) {
  // props: open, nodes, selfId, onPick(nodeId, propKey), onClose
  var stepSt=useState(0); var step=stepSt[0], setStep=stepSt[1]
  var selSt=useState(null); var sel=selSt[0], setSel=selSt[1]

  useEffect(function(){ if(!props.open){setStep(0);setSel(null)} },[props.open])

  if(!props.open) return null

  var nodes = props.nodes||[]
  var selfNode = nodes.find(function(n){return n.id===props.selfId})
  var otherCreators = nodes.filter(function(n){return n.section===1&&n.id!==props.selfId})
  var otherComps = nodes.filter(function(n){return n.section===2&&n.id!==props.selfId})

  function pickNode(node){ setSel(node); setStep(1) }
  function pickProp(propKey){ props.onPick(sel.id, propKey); props.onClose() }

  var selType = sel ? sel.type : null
  var selProps = sel ? (EXPR_PROPS[selType]||[]) : []

  function NodeRow(p) {
    return (
      <div className={'rp-row'+(p.isSelf?' self':'')} onClick={function(){pickNode(p.node)}}>
        <span className="rp-row-name">{p.node.name||p.node.id}</span>
        <span className="rp-row-type">{nodeTypeLabel(p.node)}</span>
      </div>
    )
  }

  return createPortal(
    <div className="rp-scrim" onClick={props.onClose}>
      <div className="rp-sheet" onClick={function(e){e.stopPropagation()}}>
        <div className="rp-grip"/>
        <div className="rp-hdr">
          {step===1&&<button className="rp-back" onClick={function(){setStep(0);setSel(null)}}>← back</button>}
          <span className="rp-hdr-title">
            {step===0 ? 'Select item' : (sel.name||sel.id)}
          </span>
          {step===1&&<span className="rp-hdr-sub">{nodeTypeLabel(sel)}</span>}
          <button className="rp-back" onClick={props.onClose}>✕</button>
        </div>
        <div className="rp-scroll">
          {step===0&&(
            <div>
              {selfNode&&(
                <div>
                  <div className="rp-section-lbl">This item</div>
                  <NodeRow node={selfNode} isSelf={true}/>
                </div>
              )}
              {!selfNode&&nodes.length===0&&(
                <div className="rp-empty">No items in the scene yet.</div>
              )}
              {otherCreators.length>0&&(
                <div>
                  <div className="rp-section-lbl">Pixel creators</div>
                  {otherCreators.map(function(n){return <NodeRow key={n.id} node={n}/>})}
                </div>
              )}
              {otherComps.length>0&&(
                <div>
                  <div className="rp-section-lbl">Compositors</div>
                  {otherComps.map(function(n){return <NodeRow key={n.id} node={n}/>})}
                </div>
              )}
            </div>
          )}
          {step===1&&(
            <div>
              {selProps.length===0&&(
                <div className="rp-empty">No registered properties for this item type yet.</div>
              )}
              {selProps.map(function(ep){
                // Prevent direct self-ref: same node + same prop key
                var isSelfProp = sel.id===props.selfId && ep.key===props.selfPropKey
                var cur = getNodePropVal(sel, ep.key)
                var curStr = cur!=null ? (Number.isInteger(cur)?cur:Number(cur).toFixed(2)) : '—'
                return (
                  <div key={ep.key}
                    className={'rp-prop-row'+(isSelfProp?' rp-prop-disabled':'')}
                    onClick={isSelfProp?null:function(){pickProp(ep.key)}}
                    style={isSelfProp?{opacity:.35,cursor:'not-allowed'}:{}}>
                    <span className="rp-prop-lbl">{ep.label}{isSelfProp?' (self)':''}</span>
                    <span className="rp-prop-val">{curStr}</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

function ExprEditorIcon(props) {
  return (
    <button className={'expr-icon'+(props.active?' active':'')}
      onClick={props.onToggle}
      title={props.active?'expression active':'add expression'}>⊛</button>
  )
}

var EXPR_OPS      = ['+','-','*','/','^']
var EXPR_OP_LABEL = {'+':'+', '-':'−', '*':'×', '/':'÷', '^':'^'}

function OpPill(props) {
  var idx = EXPR_OPS.indexOf(props.value)
  function cycle(e) { e.stopPropagation(); props.onChange(EXPR_OPS[(idx+1)%EXPR_OPS.length]) }
  return (
    <button className="expr-pill op" onClick={cycle} title="tap to cycle operator">
      {EXPR_OP_LABEL[props.value]||props.value}
    </button>
  )
}

// TermPill — unified value pill with cycling type badge: # lit | ~ rand | @ ref
var TERM_TYPES = ['lit','rand','ref']
var TERM_BADGE = {lit:'#', rand:'~', ref:'@'}

// NumInput: controlled-like input that preserves intermediate typed states (e.g. "-", "0.")
function NumInput(props) {
  var raw = useState(String(props.value!=null?props.value:0))
  var str = raw[0], setStr = raw[1]
  // Sync external value changes (e.g. type cycle) but not while user is mid-edit
  var prev = useRef(props.value)
  if(props.value !== prev.current && parseFloat(str) !== props.value) {
    prev.current = props.value
    setStr(String(props.value!=null?props.value:0))
  }
  function commit(s) {
    var v = parseFloat(s)
    if(!isNaN(v) && isFinite(v)) { prev.current = v; props.onChange(v) }
  }
  return (
    <input type="text" inputMode="decimal" value={str} style={props.style}
      onChange={function(e){ setStr(e.target.value); commit(e.target.value) }}
      onFocus={function(e){ e.target.select() }}
      onBlur={function(){ commit(str); setStr(String(props.value!=null?props.value:0)) }}
    />
  )
}

function TermPill(props) {
  var t = props.token

  function cycleType(e) {
    e.stopPropagation()
    var next = TERM_TYPES[(TERM_TYPES.indexOf(t.type)+1) % TERM_TYPES.length]
    if(next==='lit')  props.onChange({type:'lit',  value: t.value!=null ? t.value : (t.min!=null ? t.min : 0)})
    if(next==='rand') props.onChange({type:'rand', domain:'0-1', amount:1, offset:0, scale:1, min:0, max:t.value!=null?Math.max(1,Math.abs(t.value)):1, seedType:'free', seed:1})
    if(next==='ref')  props.onChange({type:'ref',  nodeId:null, prop:null})
  }

  var isRand = t.type==='rand'
  return (
    <span className={'expr-pill term'+(isRand?' rand-pill':'')}>
      <button className="expr-type-badge" onClick={cycleType} title="tap to cycle type">
        {TERM_BADGE[t.type]||'#'}
      </button>
      <span className="term-body">
        {t.type==='lit' && (
          <NumInput value={t.value!=null?t.value:0}
            onChange={function(v){ props.onChange(Object.assign({},t,{value:v})) }}/>
        )}
        {t.type==='rand' && (
          <span className="rand-tap" onClick={props.onRandSettings} title="tap to edit range &amp; seed"
            style={{display:'inline-flex',alignItems:'center',gap:2,cursor:'pointer'}}>
            <span style={{color:'var(--ac)',fontFamily:"'IBM Plex Mono',monospace",fontSize:10}}>
              {(t.min!=null?t.min:0).toFixed(2)}
            </span>
            <span className="rand-sep">↔</span>
            <span style={{color:'var(--ac)',fontFamily:"'IBM Plex Mono',monospace",fontSize:10}}>
              {(t.max!=null?t.max:1).toFixed(2)}
            </span>
            {t.seed!=null&&<span style={{fontSize:8,color:'var(--mu)',marginLeft:2}}>🔒</span>}
          </span>
        )}
        {t.type==='ref' && (
          <span className="ref-tap" onClick={props.onPickRef}>
            {t.nodeId ? t.nodeId+' · '+t.prop : 'pick…'}
          </span>
        )}
      </span>
      <button className="expr-pill-rm" onClick={props.onRemove} title="remove">×</button>
    </span>
  )
}

// RandSettingsSheet — full RandRow-style rand token editor
function RandSettingsSheet(props) {
  var t = props.token || {type:'rand',domain:'0-1',amount:1,offset:0,scale:1,min:0,max:1,seedType:'free',seed:1}
  if(!props.open) return null
  var domain = t.domain||'0-1'
  var seedType = t.seedType||'free'
  var niStyle = {width:80,background:'var(--el)',border:'1px solid var(--bd)',borderRadius:6,
    color:'var(--ac)',fontFamily:"'IBM Plex Mono',monospace",fontSize:12,textAlign:'right',
    padding:'6px 10px',outline:'none'}
  function up(patch){ props.onChange(Object.assign({},t,patch)) }
  function Row(p){ return (
    <div className="rp-prop-row" style={{cursor:'default'}}>
      <div style={{flex:1}}>
        <div className="rp-prop-lbl">{p.label}</div>
        {p.desc&&<div style={{fontSize:9,color:'var(--mu)',fontFamily:"'IBM Plex Mono',monospace",marginTop:2}}>{p.desc}</div>}
      </div>
      {p.children}
    </div>
  )}
  function ToggleRow(p){ return (
    <div className="rp-prop-row" style={{cursor:'default'}}>
      <div style={{flex:1}}>
        <div className="rp-prop-lbl">{p.label}</div>
        {p.desc&&<div style={{fontSize:9,color:'var(--mu)',fontFamily:"'IBM Plex Mono',monospace",marginTop:2}}>{p.desc}</div>}
      </div>
      <div style={{display:'flex',gap:6}}>
        {p.options.map(function(opt){
          var on=p.value===opt.v
          return <button key={opt.v} onClick={function(){p.onChange(opt.v)}}
            style={{padding:'5px 12px',fontSize:10,borderRadius:20,cursor:'pointer',
              fontFamily:"'IBM Plex Mono',monospace",
              background:on?'var(--sl)':'none',color:on?'var(--tx)':'var(--mu)',
              border:'1px solid '+(on?'var(--lv)':'var(--bd)')}}>
            {opt.l}
          </button>
        })}
      </div>
    </div>
  )}
  return createPortal(
    <div className="rp-scrim" onClick={props.onClose}>
      <div className="rp-sheet" onClick={function(e){e.stopPropagation()}}>
        <div className="rp-grip"/>
        <div className="rp-hdr">
          <span className="rp-hdr-title">Random</span>
          <span className="rp-hdr-sub" style={{color:'var(--lv)'}}>~ per-render value</span>
          <button className="rp-back" onClick={props.onClose}>✕</button>
        </div>
        <div className="rp-scroll" style={{padding:'4px 16px 48px'}}>
          <ToggleRow label="domain"
            desc={domain==='0-1'?'Unipolar: output 0 to 1':'Bipolar: output −1 to 1'}
            value={domain}
            options={[{v:'0-1',l:'0→1'},{v:'-1-1',l:'−1→1'}]}
            onChange={function(v){up({domain:v})}}/>
          <Row label="amount" desc="Overall multiplier on the random output">
            <NumInput value={t.amount!=null?t.amount:1} onChange={function(v){up({amount:v})}} style={niStyle}/>
          </Row>
          <Row label="offset" desc="Constant added before scaling">
            <NumInput value={t.offset!=null?t.offset:0} onChange={function(v){up({offset:v})}} style={niStyle}/>
          </Row>
          <Row label="scale" desc="Range scale applied after offset">
            <NumInput value={t.scale!=null?t.scale:1} onChange={function(v){up({scale:v})}} style={niStyle}/>
          </Row>
          <div style={{borderTop:'1px solid var(--bd)',margin:'4px 0'}}/>
          <div className="rp-section-lbl" style={{padding:'8px 0 0'}}>Range (output clamp)</div>
          <Row label="min">
            <NumInput value={t.min!=null?t.min:(domain==='-1-1'?-1:0)} onChange={function(v){up({min:v})}} style={niStyle}/>
          </Row>
          <Row label="max">
            <NumInput value={t.max!=null?t.max:1} onChange={function(v){up({max:v})}} style={niStyle}/>
          </Row>
          <div style={{borderTop:'1px solid var(--bd)',margin:'4px 0'}}/>
          <div className="rp-section-lbl" style={{padding:'8px 0 0'}}>Seed</div>
          <ToggleRow label="seed type"
            desc={seedType==='free'?'New random value each render':'Reproducible: same value every render'}
            value={seedType}
            options={[{v:'free',l:'∞ free'},{v:'locked',l:'🔒 fixed'}]}
            onChange={function(v){up({seedType:v})}}/>
          {seedType==='locked'&&(
            <Row label="seed value">
              <NumInput value={t.seed!=null?t.seed:1}
                onChange={function(v){up({seed:Math.max(1,Math.round(Math.abs(v)))||1})}}
                style={niStyle}/>
            </Row>
          )}
          <div style={{borderTop:'1px solid var(--bd)',margin:'12px 0 8px'}}/>
          <div className="rp-section-lbl" style={{padding:'0 0 8px'}}>Presets</div>
          <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
            {[
              {l:'0→1',    p:{domain:'0-1', min:0,   max:1,   amount:1,offset:0,scale:1}},
              {l:'−1→1',   p:{domain:'-1-1',min:-1,  max:1,   amount:1,offset:0,scale:1}},
              {l:'0→360°', p:{domain:'0-1', min:0,   max:360, amount:360,offset:0,scale:1}},
              {l:'±180°',  p:{domain:'-1-1',min:-180,max:180, amount:180,offset:0,scale:1}},
              {l:'0→100%', p:{domain:'0-1', min:0,   max:1,   amount:1,offset:0,scale:1}},
            ].map(function(pr){
              return <button key={pr.l} onClick={function(){up(pr.p)}}
                style={{padding:'5px 12px',fontSize:10,borderRadius:20,cursor:'pointer',
                  fontFamily:"'IBM Plex Mono',monospace",background:'var(--el)',
                  color:'var(--di)',border:'1px solid var(--bd)'}}>
                {pr.l}
              </button>
            })}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

function ExprPillRow(props) {
  var tokens = props.tokens||[]
  function update(i,patch){ props.onChange(tokens.map(function(t,j){return j===i?Object.assign({},t,patch):t})) }
  function replaceTerm(i,newToken){ props.onChange(tokens.map(function(t,j){return j===i?newToken:t})) }
  function removeTerm(i) {
    var next
    if(i===0) next=tokens.slice(tokens.length>1&&tokens[1].type==='op'?2:1)
    else next=tokens.filter(function(_,j){return j!==i&&j!==i-1})
    props.onChange(next.length>0?next:null)
  }
  function addTerm() { props.onChange(tokens.concat([{type:'op',value:'+'},{type:'lit',value:0}])) }
  return (
    <div className="expr-pill-row">
      {tokens.map(function(t,i){
        if(t.type==='op') return <OpPill key={i} value={t.value} onChange={function(v){update(i,{value:v})}}/>
        return <TermPill key={i} token={t}
          onChange={function(newToken){replaceTerm(i,newToken)}}
          onRemove={function(){removeTerm(i)}}
          onPickRef={props.onPickRef ? function(){props.onPickRef(i)} : null}
          onRandSettings={props.onRandSettings ? function(){props.onRandSettings(i)} : null}/>
      })}
      <button className="expr-pill add-btn" onClick={addTerm} title="add term">⊕</button>
      {tokens.length>0&&<button className="expr-clear" onClick={function(){props.onChange(null)}}>clear</button>}
    </div>
  )
}

// ExprEditor — wraps a single Sl child, injecting expr icon + pill row.
// Props: paramKey, tokens (array|null), nodes, selfId, onExprChange(tokens|null)
function ExprEditor(props) {
  var openSt=useState(false); var open=openSt[0], setOpen=openSt[1]
  var pickerIdxSt=useState(null); var pickerIdx=pickerIdxSt[0], setPickerIdx=pickerIdxSt[1]
  var tokens=props.tokens&&props.tokens.length>0?props.tokens:null
  var hasExpr=!!tokens
  var result=hasExpr?resolveExpr(tokens,props.nodes||[],null):null

  function handleChange(newTokens){
    var t=newTokens&&newTokens.length>0?newTokens:null
    props.onExprChange(t)
    if(!t) setOpen(false)
  }
  function toggleOpen(){ if(!open&&!tokens) handleChange([{type:'lit',value:0}]); setOpen(function(o){return !o}) }
  function openPicker(tokenIdx){ setPickerIdx(tokenIdx) }
  function closePicker(){ setPickerIdx(null) }
  function onPick(nodeId, propKey){
    var toks = tokens||[{type:'lit',value:0}]
    var next = toks.map(function(t,i){
      return i===pickerIdx ? {type:'ref',nodeId:nodeId,prop:propKey} : t
    })
    handleChange(next)
    closePicker()
  }

  var randIdxSt=useState(null); var randIdx=randIdxSt[0], setRandIdx=randIdxSt[1]
  function openRand(tokenIdx){ setRandIdx(tokenIdx) }
  function closeRand(){ setRandIdx(null) }
  function onRandChange(newToken){
    var toks = tokens||[]
    var next = toks.map(function(t,i){ return i===randIdx ? newToken : t })
    handleChange(next)
  }

  var exprType = hasExpr
    ? (tokens.some(function(t){return t.type==='ref'&&t.nodeId}) ? 'ref' : 'val')
    : null
  var icon=<ExprEditorIcon active={hasExpr} open={open} onToggle={toggleOpen}/>
  var child=Children.only(props.children)
  var enhanced=cloneElement(child,{exprActive:hasExpr,exprResult:result,exprIcon:icon,exprType:exprType})
  var randToken = randIdx!=null && tokens ? tokens[randIdx] : null

  return (
    <div>
      {enhanced}
      {open&&<ExprPillRow tokens={tokens||[{type:'lit',value:0}]} onChange={handleChange}
        onPickRef={openPicker} onRandSettings={openRand}/>}
      <RefPickerSheet open={pickerIdx!==null} nodes={props.nodes||[]} selfId={props.selfId} selfPropKey={"props."+props.paramKey} onPick={onPick} onClose={closePicker}/>
      <RandSettingsSheet open={randIdx!==null} token={randToken} onChange={onRandChange} onClose={closeRand}/>
    </div>
  )
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
var SHAPES = ["ellipse","rectangle","rounded-rect","polygon","star","ring","grid","spiral","polar-grid","phyllotaxis","scatter"]
var GTYPES = ["linear","radial","conic"]
var NTYPES = ["perlin","fbm","turbulence","worley","simplex","marble","wood","value","crystal","phasor","white"]
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
var _renderNodes = []  // set at start of each renderPipeline call
// Restore _uid from saved project — avoids ID collisions on load
// If _uid is stored, use it (fast). Otherwise scan all node IDs (legacy files).
function restoreUid(savedUid, nodes) {
  if(savedUid&&savedUid>_uid){ _uid=savedUid; return }
  // Legacy file — scan all IDs
  function scan(n) {
    if(!n) return
    var m=String(n.id||"").match(/^n(\d+)$/)
    if(m) _uid=Math.max(_uid,parseInt(m[1])+1)
    if(n.layers) n.layers.forEach(scan)
    if(n.inputA) scan(n.inputA); if(n.inputB) scan(n.inputB)
    ;[n.outEfx,n.effectStack,n.maskStack,n.outMask].forEach(function(s){
      if(s)s.forEach(function(e){var em=String(e.id||"").match(/^n(\d+)$/);if(em)_uid=Math.max(_uid,parseInt(em[1])+1)})
    })
  }
  if(nodes) nodes.forEach(scan)
}
function mkEfx(t) {
  var cfg=ECFG[t]
  var params=cfg ? { [cfg[0]]:cfg[4] } : {}
  if(t==="curves")    params={inBlack:0,inWhite:255,outBlack:0,outWhite:255,sCurve:0}
  if(t==="match")      params={matchPos:"xy",matchScale:false,matchRot:false,sourceId:null,efxId:null,offsetX:0,offsetY:0,offsetScale:1,offsetRot:0}
  if(t==="transform")  params={tx:0,ty:0,rot:0,su:1,sx:1,sy:1,skX:0,skY:0,space:"local"}
  if(t==="wave")          params={amplitude:.05,freqX:3,freqY:3,phaseX:0,phaseY:0}
  if(t==="twirl")         params={angle:180,radius:.5,cx:.5,cy:.5,softness:.3}
  if(t==="bulge")         params={strength:.5,radius:.7,cx:.5,cy:.5,softness:.3}
  if(t==="solarise")      params={threshold:.5}
  if(t==="uv-distort")    params={uvRefId:null,mode:"displacement",amtX:.1,amtY:.1,chX:"R",chY:"G"}
  if(t==="uv-texture")    params={texRefId:null,chU:"R",chV:"G",wrapX:"clamp",wrapY:"clamp"}
  if(t==="polar-to-cart") params={amount:1}
  if(t==="cart-to-polar") params={amount:1}
  if(t==="show-points")    params={style:"circle",color:"#00ccff",size:6,opacity:.8,labels:[],labelOffsetX:10,labelOffsetY:-4,labelLineSpacing:11}
  if(t==="point-map")      params={mappings:[]}
  if(t==="source-at-points")params={sources:[],distributionMode:"weighted",wrap:"clamp"}
  if(t==="colour")      params={color:"#ff0000",opacity:1}
  if(t==="colour-map")  params={stops:[{pos:0,color:"#000000",alpha:100},{pos:1,color:"#ffffff",alpha:100}],reverse:false}
  if(t==="dir-blur")     params={angle:0, distance:20, spread:"both"}
  if(t==="sharpen")      params={amount:100}
  if(t==="vignette")     params={strength:80, radius:.65, softness:.45, color:"#000000"}
  if(t==="chromatic-ab") params={distance:6, angle:45, mode:"rgb"}
  if(t==="glow")         params={radius:12, strength:60, threshold:120}
  if(t==="emboss")       params={angle:135, strength:100, flat:128}
  if(t==="edge-detect")  params={strength:100, invert:false}
  if(t==="pixelate")     params={size:8}
  if(t==="duotone")      params={shadow:"#0a0a2a", highlight:"#f5e642"}
  if(t==="combine")      params={setA:"",setB:"",outputSet:"",mode:"union"}
  if(t==="separate")     params={inputSet:"",by:"opacity",threshold:.5,outputA:"",outputB:""}
  if(t==="filter")       params={attr:"opacity",op:">",value:.5}
  if(t==="delete")       params={attr:"opacity",op:"<",value:.1}
  var ptDomain=["point-map","source-at-points"]; return { id:uid(), type:t, name:"", enabled:true, params:params, opacity:100, blendMode:"normal", maskStack:[], blendChannels:{R:true,G:true,B:true,A:true}, blendIf:{thisLayer:{s0:0,s1:0,h1:255,h0:255},underlyingLayer:{s0:0,s1:0,h1:255,h0:255}}, domain:ptDomain.includes(t)?"points":"pixels" }
}
function mkMask() { return { id:uid(), name:"", refId:null, channel:"luminosity", invert:false, fillOpacity:100, opacity:100, blendMode:"multiply", effectStack:[], enabled:true, blendIf:{thisLayer:{s0:0,s1:0,h1:255,h0:255},underlyingLayer:{s0:0,s1:0,h1:255,h0:255}} } }
function mkSlot() { return { refId:null, effectStack:[], maskStack:[], fillOpacity:100 } }
function mkRasterise() {
  return { id:uid(), name:"Rasterise "+(_uid-100), type:"rasterise", section:2, enabled:true,
    sourceId:null, width:512, height:512, antialias:true, outEfx:[], outMask:[] }
}
function mkIsolate() {
  return { id:uid(), name:"Isolate "+(_uid-100), type:"isolate", section:2, enabled:true,
    sourceId:null, threshold:.5, invert:false, outEfx:[], outMask:[] }
}
function mkBlender() { return { id:uid(), name:"Blender "+(_uid-100), type:"blender", section:2, enabled:true, inputA:mkSlot(), inputB:mkSlot(), mode:"normal", amount:100, switched:false, maskMode:"add", maskAmount:100, blendChannels:{R:true,G:true,B:true,A:true}, blendIf:{thisLayer:{s0:0,s1:0,h1:255,h0:255},underlyingLayer:{s0:0,s1:0,h1:255,h0:255}}, outFillOpacity:100, outOpacity:100, outEfx:[], outMask:[] } }
function mkLayer(refId) { return { id:uid(), refId:refId||null, name:"", enabled:true,
  effectStack:[], maskStack:[], blendMode:"normal", opacity:100, maskMode:"add", maskAmount:100,
  fillOpacity:100, blendChannels:{R:true,G:true,B:true,A:true},
  blendIf:{thisLayer:{s0:0,s1:0,h1:255,h0:255},underlyingLayer:{s0:0,s1:0,h1:255,h0:255}} } }
function mkLayerComp() {
  var l1=mkLayer(); l1.name="layer 1"
  var l2=mkLayer(); l2.name="layer 2"
  return { id:uid(), name:"Layer Comp "+(_uid-100), type:"layers", section:2, enabled:true,
    context:"pixel",  // "pixel" | "point"
    layers:[l2,l1], outFillOpacity:100, outOpacity:100, outEfx:[], outMask:[] }
}
// Point Comp data model:
// sources[] — input section (like Output at bottom). Each entry: {id, name, refId, isolate[]}.
//             Multiple geometry sources, each with its own isolate mask.
// chain[]   — ordered modifier chain. Each item: single modifier with isolate[].
function mkPointChainItem(t) {
  var efx=mkEfx(t)
  return { id:efx.id, type:efx.type, name:efx.name, enabled:efx.enabled,
    params:efx.params, isolate:[], isolateAttr:"" }
}
function mkPointComp() {
  return { id:uid(), name:"Point Comp "+(_uid-100), type:"point-comp", section:2, enabled:true,
    refId:null, isolate:[], isolateAttr:"",
    chain:[], outModifiers:[], outMask:[] }
}
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
function octN(x,y,o,s,lac,gain) { lac=lac||2.08;gain=gain||.5; var v=0,a=1,f=1,m=0; for(var i=0;i<o;i++){v+=vn(x*f,y*f,s+i)*a;m+=a;a*=gain;f*=lac} return v/m }

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
// ── Crystal noise — Voronoi F2-F1 (highlights cell borders as bright ridges) ──
function crystal(x,y,s,jitter,mode) {
  jitter=jitter==null?1:jitter; mode=mode||"f2f1"
  var ix=Math.floor(x), iy=Math.floor(y)
  var f1=1e9, f2=1e9
  for(var dy=-2;dy<=2;dy++) for(var dx=-2;dx<=2;dx++){
    var cx=ix+dx, cy=iy+dy
    var px=cx+vh(cx,cy,s)*jitter, py=cy+vh(cx+31.4,cy+27.8,s)*jitter
    var d=Math.sqrt((x-px)*(x-px)+(y-py)*(y-py))
    if(d<f1){f2=f1;f1=d} else if(d<f2){f2=d}
  }
  if(mode==="f2")   return Math.max(0,Math.min(1,f2*.8))
  if(mode==="f2f1") return Math.max(0,Math.min(1,(f2-f1)*2.5))
  if(mode==="f1f2") return Math.max(0,Math.min(1,f1*f2*4))
  if(mode==="f2df1")return Math.max(0,Math.min(1,f1>0?f2/f1*.5:0))
  return Math.max(0,Math.min(1,f2-f1))
}
// ── Phasor noise — oriented sinusoidal bands (Tricard et al. 2019) ───────────
// Anisotropic stripe/ripple pattern with controllable frequency and direction
function phasor(x,y,s,freq,angle,bandwidth,oct) {
  freq=freq||8; angle=(angle||0)*Math.PI/180; bandwidth=bandwidth||1; oct=oct||3
  var v=0,a=1,f=1,m=0
  for(var i=0;i<oct;i++){
    // Oriented kernel: project position onto direction, add value noise phase
    var nx=x*f, ny=y*f
    var pn=vn(nx,ny,s+i)*bandwidth*Math.PI*2  // value noise as phase offset
    var proj=Math.cos(angle)*nx+Math.sin(angle)*ny  // oriented projection
    v+=Math.sin(proj*freq*Math.PI*2+pn)*a
    m+=a; a*=.5; f*=2.08
  }
  return Math.max(0,Math.min(1,(v/m+1)*.5))
}
// ── Simplex-style noise (gradient noise, fewer artefacts than value noise) ────
function simplex2(x,y,s) {
  // Correct 2D simplex noise (Gustavson algorithm)
  var F2=.5*(Math.sqrt(3)-1), G2=(3-Math.sqrt(3))/6
  // Skew input to simplex grid
  var sk=(x+y)*F2, i=Math.floor(x+sk), j=Math.floor(y+sk)
  var t=(i+j)*G2, x0=x-(i-t), y0=y-(j-t)
  var i1=x0>y0?1:0, j1=1-i1
  var x1=x0-i1+G2, y1=y0-j1+G2
  var x2=x0-1+2*G2, y2=y0-1+2*G2
  // Gradient lookup — hash lattice point to gradient vector
  function grad(ix,iy,dx,dy){
    var h=((vh(ix,iy,s)*65536)&7)  // 8 gradient directions
    var u=h<4?dx:dy, v2=h<4?dy:dx
    return ((h&1)?-u:u)+((h&2)?-v2:v2)
  }
  var n0=0,n1=0,n2=0
  var t0=.5-x0*x0-y0*y0; if(t0>0){t0*=t0;n0=t0*t0*grad(i,j,x0,y0)}
  var t1=.5-x1*x1-y1*y1; if(t1>0){t1*=t1;n1=t1*t1*grad(i+i1,j+j1,x1,y1)}
  var t2=.5-x2*x2-y2*y2; if(t2>0){t2*=t2;n2=t2*t2*grad(i+1,j+1,x2,y2)}
  return Math.max(0,Math.min(1,(70*(n0+n1+n2)+1)*.5))
}
// ── White noise — uncorrelated random value per pixel ────────────────────────
function whiteNoise(px,py,seed,grainSize) {
  var gs=Math.max(1,Math.round(grainSize||1))
  var gx=Math.floor(px/gs)*gs, gy=Math.floor(py/gs)*gs
  return vh(gx,gy,seed)
}
// ── Octave simplex — simplex looped like perlin ───────────────────────────────
function octSimplex(x,y,oct,lac,gain,s) {
  var v=0,a=.5,f=1,m=0
  for(var i=0;i<oct;i++){v+=simplex2(x*f,y*f,s+i)*a;a*=gain;f*=lac}
  return Math.max(0,Math.min(1,v+.5))
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
  } else if (t==="colour") {
    var hueShift=p.hue||0,sat=p.saturation||0,lit=p.lightness||0
    var con=p.contrast||0,temp=p.temperature||0,tnt=p.tint||0,vib=p.vibrance||0
    for(i=0;i<d.length;i+=4){
      var rr=d[i]/255,gg=d[i+1]/255,bb=d[i+2]/255
      rr=Math.max(0,Math.min(1,rr+temp*.15));bb=Math.max(0,Math.min(1,bb-temp*.15));gg=Math.max(0,Math.min(1,gg+tnt*.1))
      var mx=Math.max(rr,gg,bb),mn2=Math.min(rr,gg,bb),d2=mx-mn2
      var l2=(mx+mn2)/2,s2=d2===0?0:(d2/(1-Math.abs(2*l2-1)))
      var h2=d2===0?0:mx===rr?(((gg-bb)/d2)%6)*60:mx===gg?((bb-rr)/d2+2)*60:((rr-gg)/d2+4)*60
      if(h2<0)h2+=360
      s2=Math.max(0,Math.min(1,s2+(1-s2)*vib*.5))
      h2=(h2+hueShift*360+360)%360;s2=Math.max(0,Math.min(1,s2+sat));l2=Math.max(0,Math.min(1,l2+lit*.5))
      l2=Math.max(0,Math.min(1,(l2-.5)*(1+con)+.5))
      var c3=(1-Math.abs(2*l2-1))*s2,x3=c3*(1-Math.abs((h2/60)%2-1)),m3=l2-c3/2
      var r3,g3,b3
      if(h2<60){r3=c3;g3=x3;b3=0}else if(h2<120){r3=x3;g3=c3;b3=0}else if(h2<180){r3=0;g3=c3;b3=x3}
      else if(h2<240){r3=0;g3=x3;b3=c3}else if(h2<300){r3=x3;g3=0;b3=c3}else{r3=c3;g3=0;b3=x3}
      d[i]=Math.round((r3+m3)*255);d[i+1]=Math.round((g3+m3)*255);d[i+2]=Math.round((b3+m3)*255)
    }
  } else if (t==="colour") {
    var hx2=p.color||"#ff0000",cop2=p.opacity==null?1:p.opacity
    var cr2=parseInt(hx2.slice(1,3),16)||0,cg2=parseInt(hx2.slice(3,5),16)||0,cb2=parseInt(hx2.slice(5,7),16)||0
    for(i=0;i<d.length;i+=4){
      var ia2=d[i+3]/255,fa2=cop2*ia2
      d[i]  =Math.round(cr2*fa2+d[i]  *(1-fa2))
      d[i+1]=Math.round(cg2*fa2+d[i+1]*(1-fa2))
      d[i+2]=Math.round(cb2*fa2+d[i+2]*(1-fa2))
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
    // Pre-bake LUT incorporating bezier curve if defined
    var bzCv=p.curve
    var clut=new Uint8Array(256)
    for(var li=0;li<256;li++){
      var norm=(li-inB)/Math.max(1,inW-inB)
      norm=Math.max(0,Math.min(1,norm))
      if(bzCv){
        var bpx=bzCv.p1x||.33,bpy=bzCv.p1y||.33,bqx=bzCv.p2x||.67,bqy=bzCv.p2y||.67
        var lo2=0,hi2=1
        var bzXf=function(t2){return 3*bpx*t2*(1-t2)*(1-t2)+3*bqx*t2*t2*(1-t2)+t2*t2*t2}
        var bzYf=function(t2){return 3*bpy*t2*(1-t2)*(1-t2)+3*bqy*t2*t2*(1-t2)+t2*t2*t2}
        for(var ni2=0;ni2<10;ni2++){var mid2=(lo2+hi2)/2;if(bzXf(mid2)<norm)lo2=mid2;else hi2=mid2}
        norm=Math.max(0,Math.min(1,bzYf((lo2+hi2)/2)))
      }
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
    // Rotate pixels around centre; angle decreases with distance; softness feathers the edge
    var tAngle=(p.angle||180)*Math.PI/180, tRadius=(p.radius||0.5)*Math.min(w,h)*0.5
    var tSoftPx=p.softness==null?.3:p.softness
    var tcx=p.cx!=null?p.cx*w:w/2, tcy=p.cy!=null?p.cy*h:h/2
    var orig2=new Uint8ClampedArray(d)
    for(i=0;i<w*h;i++){
      var tx=i%w-tcx, ty=Math.floor(i/w)-tcy
      var dist2=Math.sqrt(tx*tx+ty*ty)
      if(dist2<tRadius){
        var rawA2=tAngle*(1-dist2/tRadius)
        var tBl=1
        if(tSoftPx>0&&dist2>tRadius*(1-tSoftPx)){var tt2=(dist2-tRadius*(1-tSoftPx))/(tRadius*tSoftPx);tt2=Math.min(1,Math.max(0,tt2));tBl=1-tt2*tt2*(3-2*tt2)}
        var a=rawA2*tBl
        var ca=Math.cos(a),sa=Math.sin(a)
        var sx2=Math.round(tcx+tx*ca-ty*sa), sy2=Math.round(tcy+tx*sa+ty*ca)
        sx2=Math.max(0,Math.min(w-1,sx2)); sy2=Math.max(0,Math.min(h-1,sy2))
        var si2=(sy2*w+sx2)*4, di2=i*4
        d[di2]=orig2[si2];d[di2+1]=orig2[si2+1];d[di2+2]=orig2[si2+2];d[di2+3]=orig2[si2+3]
      }
    }
  } else if (t==="bulge") {
    // Radial bulge/pinch; softness feathers the displacement at the radius boundary
    var bStrength=p.strength||0.5, bRadius=(p.radius||0.7)*Math.min(w,h)*0.5
    var bSoftPx=p.softness==null?.3:p.softness
    var bcx=p.cx!=null?p.cx*w:w/2, bcy=p.cy!=null?p.cy*h:h/2
    var orig3=new Uint8ClampedArray(d)
    for(i=0;i<w*h;i++){
      var bx=i%w-bcx, by=Math.floor(i/w)-bcy
      var bd=Math.sqrt(bx*bx+by*by)
      if(bd<bRadius&&bd>0){
        var norm=bd/bRadius
        var newR=norm>0?Math.pow(norm,1/(1+bStrength))*bRadius:0
        var bScl=newR/bd
        var bBl=1
        if(bSoftPx>0&&bd>bRadius*(1-bSoftPx)){var bt2=(bd-bRadius*(1-bSoftPx))/(bRadius*bSoftPx);bt2=Math.min(1,Math.max(0,bt2));bBl=1-bt2*bt2*(3-2*bt2)}
        var bScFin=bScl*bBl+(1-bBl)
        var sx3=Math.round(bcx+bx*bScFin), sy3=Math.round(bcy+by*bScFin)
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
// Apply a composed local+global transform stack to ctx canvas.
// localOps/globalOps: arrays of {tx,ty,rot,su,sx,sy,skX,skY}
// All locals applied first (pivot = shape centroid or canvas centre),
// then all globals (pivot = canvas centre).
// Uses an oversized 3× buffer to prevent clipping on large transforms.
function applyTransformStack(ctx, localOps, globalOps, w, h) {
  if(!localOps.length && !globalOps.length) return
  // Oversized buffer: 1× padding each side prevents clipping on large transforms
  var PAD = 1
  var bw = w*(1+2*PAD), bh = h*(1+2*PAD)
  var buf = document.createElement("canvas"); buf.width=bw; buf.height=bh
  var bx = buf.getContext("2d")
  var sp = ctx.canvas._shapeProps
  // Local pivot: shape centroid in buffer coords; fallback canvas centre
  var localCx = sp ? sp.x*w + w*PAD : bw/2
  var localCy = sp ? sp.y*h + h*PAD : bh/2
  var globalCx = bw/2, globalCy = bh/2
  bx.save()
  // ── Build composed matrix (local first, then global) ─────────────────────
  if(localOps.length){
    bx.translate(localCx, localCy)
    localOps.forEach(function(p){
      var tx=(p.tx||0)*w, ty=(p.ty||0)*h
      var rot=(p.rot||0)*Math.PI/180
      var su=p.su!=null?p.su:1, sx=(p.sx!=null?p.sx:1)*su, sy=(p.sy!=null?p.sy:1)*su
      var skX=(p.skX||0)*Math.PI/180, skY=(p.skY||0)*Math.PI/180
      bx.translate(tx,ty)
      if(skX||skY) bx.transform(1,Math.tan(skY),Math.tan(skX),1,0,0)
      bx.rotate(rot); bx.scale(sx,sy)
    })
    bx.translate(-localCx, -localCy)
  }
  if(globalOps.length){
    bx.translate(globalCx, globalCy)
    globalOps.forEach(function(p){
      var tx=(p.tx||0)*w, ty=(p.ty||0)*h
      var rot=(p.rot||0)*Math.PI/180
      var su=p.su!=null?p.su:1, sx=(p.sx!=null?p.sx:1)*su, sy=(p.sy!=null?p.sy:1)*su
      var skX=(p.skX||0)*Math.PI/180, skY=(p.skY||0)*Math.PI/180
      bx.translate(tx,ty)
      if(skX||skY) bx.transform(1,Math.tan(skY),Math.tan(skX),1,0,0)
      bx.rotate(rot); bx.scale(sx,sy)
    })
    bx.translate(-globalCx, -globalCy)
  }
  // ── Draw source THROUGH the composed matrix, then crop back ──────────────
  bx.drawImage(ctx.canvas, w*PAD, h*PAD)
  bx.restore()
  ctx.clearRect(0,0,w,h)
  ctx.drawImage(buf, w*PAD,h*PAD, w,h, 0,0, w,h)
}
// Single-effect convenience wrapper used by match effect and pt-domain
function applyTransform(ctx, p, w, h) {
  var isLocal = !p.space || p.space==="local"
  applyTransformStack(ctx, isLocal?[p]:[], isLocal?[]:[p], w, h)
}

/* ─── GENERATORS ─────────────────────────────────────────── */
function gSolid(ctx,p,w,h) { ctx.save();ctx.globalAlpha=p.alpha==null?1:p.alpha;ctx.fillStyle=p.color||"#000";ctx.fillRect(0,0,w,h);ctx.restore() }
// UV Create — generates a clean UV coordinate canvas:
// R channel = U = normalised x position (0→1 left→right)
// G channel = V = normalised y position (0→1 top→bottom)
// B = 0, A = 255. The identity UV map; distort this before uv-texture.
function gUVCreate(ctx,p,w,h){
  var img=ctx.createImageData(w,h),d=img.data
  var scX=p.scaleX==null?1:p.scaleX, scY=p.scaleY==null?1:p.scaleY
  var offX=p.offX==null?0:p.offX, offY=p.offY==null?0:p.offY
  for(var py=0;py<h;py++) for(var px=0;px<w;px++){
    var i=(py*w+px)*4
    var u=((px/(w-1))*scX+offX)%1, v=((py/(h-1))*scY+offY)%1
    if(u<0)u+=1; if(v<0)v+=1
    d[i]=Math.round(u*255); d[i+1]=Math.round(v*255); d[i+2]=0; d[i+3]=255
  }
  ctx.putImageData(img,0,0)
}
// Generate normalised points (0-1) for any shape type
// Returns [{x,y,rotation,scale,opacity,id,pointIndex,pointCount,...}]
function shapePoints(p,w,h) {
  var s=p.shapeType||"ellipse"
  var x=p.x||.5, y=p.y||.5, sz=p.sz||.6, rot=(p.rot||0)*Math.PI/180
  var pts2=p.pts||5, innerR=p.innerR||.45, sides=p.sides||5, ringR=p.ringR||.62
  var rx=p.rx==null?1:p.rx, ry=p.ry==null?1:p.ry
  var cornerR=p.cornerR||0.2
  var jitter=p.jitter||0, jitterSeed=p.jitterSeed||1
  var segs=Math.max(3,Math.round(p.segments||32))
  var rnd=seededRand(jitterSeed)
  var r=sz*Math.min(w,h)/2
  var out=[]

  function mkPt2(nx,ny,extra) {
    // nx,ny in canvas pixels relative to shape centre — normalise to 0-1
    var ca=Math.cos(rot),sa=Math.sin(rot)
    var rx2=nx*ca-ny*sa, ry2=nx*sa+ny*ca
    return Object.assign({x:x+rx2/w, y:y+ry2/h, rotation:0, scale:1, opacity:1},extra||{})
  }
  function jv2(vx,vy) {
    if(!jitter)return[vx,vy]
    return[vx+(rnd()-.5)*2*jitter*r, vy+(rnd()-.5)*2*jitter*r]
  }

  if(s==="ellipse"||s==="circle") {
    for(var i=0;i<segs;i++){
      var a=i*Math.PI*2/segs
      var v=jv2(Math.cos(a)*r*rx, Math.sin(a)*r*ry)
      out.push(mkPt2(v[0],v[1]))
    }
  } else if(s==="rectangle") {
    var rw=r*rx,rh=r*ry, es=Math.max(1,Math.round(segs/4))
    var edges=[
      function(t){return jv2(-rw+t*2*rw,-rh)},
      function(t){return jv2(rw,-rh+t*2*rh)},
      function(t){return jv2(rw-t*2*rw,rh)},
      function(t){return jv2(-rw,rh-t*2*rh)}
    ]
    edges.forEach(function(ef){for(var i=0;i<es;i++){var v=ef(i/es);out.push(mkPt2(v[0],v[1]))}})
  } else if(s==="rounded-rect") {
    var rrW=r*rx,rrH=r*ry,cr=Math.min(rrW,rrH)*Math.max(0,Math.min(1,cornerR))
    var cs=Math.max(2,Math.round(segs/8))
    var corners2=[[-rrW+cr,-rrH+cr,Math.PI,3*Math.PI/2],[rrW-cr,-rrH+cr,3*Math.PI/2,2*Math.PI],[rrW-cr,rrH-cr,0,Math.PI/2],[-rrW+cr,rrH-cr,Math.PI/2,Math.PI]]
    corners2.forEach(function(co){
      for(var i=0;i<=cs;i++){var ca2=co[2]+(co[3]-co[2])*i/cs;var v=jv2(co[0]+Math.cos(ca2)*cr,co[1]+Math.sin(ca2)*cr);out.push(mkPt2(v[0],v[1]))}
    })
  } else if(s==="polygon") {
    for(var i=0;i<sides;i++){var a=(i*2*Math.PI/sides)-Math.PI/2;var v=jv2(Math.cos(a)*r,Math.sin(a)*r);out.push(mkPt2(v[0],v[1]))}
  } else if(s==="star") {
    var ir=r*innerR
    for(var j=0;j<pts2*2;j++){var a2=(j*Math.PI/pts2)-Math.PI/2,rr=j%2===0?r:ir;var v=j%2===0?jv2(Math.cos(a2)*rr,Math.sin(a2)*rr):[Math.cos(a2)*rr,Math.sin(a2)*rr];out.push(mkPt2(v[0],v[1]))}
  } else if(s==="ring") {
    var rnd2=seededRand(jitterSeed+9999)
    function jvI(vx,vy){if(!jitter)return[vx,vy];return[vx+(rnd2()-.5)*2*jitter*r*ringR,vy+(rnd2()-.5)*2*jitter*r*ringR]}
    for(var i=0;i<segs;i++){var a=i*Math.PI*2/segs;var v=jv2(Math.cos(a)*r,Math.sin(a)*r);out.push(mkPt2(v[0],v[1],{ring:"outer"}))}
    for(var i=0;i<segs;i++){var a=i*Math.PI*2/segs;var v=jvI(Math.cos(a)*r*ringR,Math.sin(a)*r*ringR);out.push(mkPt2(v[0],v[1],{ring:"inner"}))}
  }

  // Attach intrinsic point info
  var n=out.length
  out.forEach(function(pt,i){pt.id=i;pt.pointIndex=i;pt.pointCount=n})
  return out
}

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

  // If _points set on canvas (from shapePoints or modified by effects), use them
  var extPts=ctx.canvas&&ctx.canvas._points
  var hasPts=extPts&&extPts.length>0&&!GEO_POINT_TYPES.includes(s)

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
  // Appends a smooth closed bezier subpath to the current path (no beginPath)
  function addSmooth(pts2) {
    if(pts2.length<3){var ap=pts2;tc2.moveTo(ap[0][0],ap[0][1]);for(var ak=1;ak<ap.length;ak++)tc2.lineTo(ap[ak][0],ap[ak][1]);tc2.closePath();return}
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
  function drawSmooth(pts2) { tc2.beginPath(); addSmooth(pts2) }

  // Render mode = points: draw dots at _points positions (works for all shape types)
  if(renderMode==="points") {
    var ptSrc=extPts||shapePoints(p,w,h)
    var dr=Math.max(1,(p.dotSize||4)*sc/2)
    tc2.save();tc2.setTransform(1,0,0,1,0,0)  // reset transform — draw in canvas coords
    tc2.globalAlpha=opacity;tc2.fillStyle=p.color||fill||"#ffffff"
    ptSrc.forEach(function(pt){tc2.beginPath();tc2.arc(pt.x*sw2,pt.y*sh2,dr,0,Math.PI*2);tc2.fill()})
    tc2.restore()
    // Skip the path drawing below
  } else if(s==="ellipse") {
    if(hasPts) {
      // Use effect-modified points for render
      var epts2=extPts.map(function(pt){return [(pt.x-x)*w*sc,(pt.y-y)*h*sc]})
      renderMode==="faceted"?drawPts(epts2):drawSmooth(epts2)
    } else if(renderMode==="faceted") {
      var epts=[]; for(var ei=0;ei<segs;ei++) epts.push(ev(ei*Math.PI*2/segs))
      drawPts(epts)
    } else if(jitter>0) {
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
    } else {
      // Rectangle always uses straight lines — smooth mode = rect() (sharpest), faceted = segmented
      if(jitter>0){
        var rw3=r*rx, rh3=r*ry, rjSegs=Math.max(1,Math.round(segs/4)), rjpts=[]
        for(var rj=0;rj<rjSegs;rj++) rjpts.push(jv(-rw3+rj*2*rw3/rjSegs,-rh3))
        for(var rj2=0;rj2<rjSegs;rj2++) rjpts.push(jv(rw3,-rh3+rj2*2*rh3/rjSegs))
        for(var rj3=0;rj3<rjSegs;rj3++) rjpts.push(jv(rw3-rj3*2*rw3/rjSegs,rh3))
        for(var rj4=0;rj4<rjSegs;rj4++) rjpts.push(jv(-rw3,rh3-rj4*2*rh3/rjSegs))
        drawPts(rjpts)
      } else { tc2.rect(-r*rx,-r*ry,r*rx*2,r*ry*2) }
    }
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
    if(renderMode==="smooth") drawSmooth(polyPts)
    else drawPts(polyPts)
  }
  else if(s==="star"){
    var ir=r*innerR, starPts=[]
    for(var j=0;j<pts*2;j++){
      var a2=(j*Math.PI/pts)-Math.PI/2, rr=j%2===0?r:ir
      var v=j%2===0?jv(Math.cos(a2)*rr,Math.sin(a2)*rr):[Math.cos(a2)*rr,Math.sin(a2)*rr]
      starPts.push(v)
    }
    if(renderMode==="smooth") drawSmooth(starPts)
    else drawPts(starPts)
  }
  else if(s==="grid"||s==="spiral"||s==="polar-grid"||s==="phyllotaxis"||s==="scatter"){
    // Geometry types: generate _points and render as dots or path line
    // _points are set in compAny after gShape runs; here we just draw markers if needed
    var geoPts=ctx.canvas&&ctx.canvas._points
    if(geoPts&&geoPts.length>0&&(p.pointStyle||"dots")==="dots"){
      var dr=Math.max(1,(p.dotSize||4)/2),gc=p.color||"#ffffff"
      ctx.save();ctx.globalAlpha=p.opacity==null?1:p.opacity;ctx.fillStyle=gc
      geoPts.forEach(function(pt){ctx.beginPath();ctx.arc(pt.x*w,pt.y*h,dr,0,Math.PI*2);ctx.fill()})
      ctx.restore()
    }
    // Connected toggle — draw lines between points
    if(geoPts&&geoPts.length>1&&s!=="scatter"&&(p.connected!==false)){
      ctx.save();ctx.strokeStyle=p.color||"#ffffff"
      ctx.lineWidth=Math.max(.5,p.strokeW||1);ctx.globalAlpha=(p.opacity==null?1:p.opacity)
      ctx.beginPath()
      if(s==="grid"){
        var gcols=Math.round(p.cols||4), grows=Math.round(p.rows||4)
        for(var gr=0;gr<grows;gr++){
          for(var gc2=0;gc2<gcols;gc2++){
            var gidx=gr*gcols+gc2, pt2=geoPts[gidx]; if(!pt2)continue
            gc2===0?ctx.moveTo(pt2.x*w,pt2.y*h):ctx.lineTo(pt2.x*w,pt2.y*h)
          }
        }
        for(var gc=0;gc<gcols;gc++){
          for(var gr2=0;gr2<grows;gr2++){
            var gidx2=gr2*gcols+gc, pt3=geoPts[gidx2]; if(!pt3)continue
            gr2===0?ctx.moveTo(pt3.x*w,pt3.y*h):ctx.lineTo(pt3.x*w,pt3.y*h)
          }
        }
      } else if(s==="polar-grid"){
        var ppr=Math.round(p.pointsPerRing||8), prings=Math.round(p.rings||4)
        for(var ri=0;ri<prings;ri++){
          for(var pi=0;pi<=ppr;pi++){
            var pidx=ri*ppr+(pi%ppr), rpt=geoPts[pidx]; if(!rpt)continue
            pi===0?ctx.moveTo(rpt.x*w,rpt.y*h):ctx.lineTo(rpt.x*w,rpt.y*h)
          }
          ctx.closePath()
        }
        for(var si2=0;si2<ppr;si2++){
          for(var ri2=0;ri2<prings;ri2++){
            var sidx=ri2*ppr+si2, spt=geoPts[sidx]; if(!spt)continue
            ri2===0?ctx.moveTo(spt.x*w,spt.y*h):ctx.lineTo(spt.x*w,spt.y*h)
          }
        }
      } else {
        geoPts.forEach(function(pt,i){i===0?ctx.moveTo(pt.x*w,pt.y*h):ctx.lineTo(pt.x*w,pt.y*h)})
      }
      ctx.stroke();ctx.restore()
    }
  }
  else if(s==="ring"){
    if(renderMode==="faceted") {
      var outerPts=[]; for(var oi=0;oi<segs;oi++) outerPts.push(jv(Math.cos(oi*Math.PI*2/segs)*r,Math.sin(oi*Math.PI*2/segs)*r))
      drawPts(outerPts)
      var innerPts=[]; for(var ii=0;ii<segs;ii++) innerPts.push(jv(Math.cos(ii*Math.PI*2/segs)*r*ringR,Math.sin(ii*Math.PI*2/segs)*r*ringR))
      tc2.moveTo(innerPts[0][0],innerPts[0][1])
      for(var ik=1;ik<innerPts.length;ik++) tc2.lineTo(innerPts[ik][0],innerPts[ik][1])
      tc2.closePath()
    } else if(renderMode==="smooth") {
      // Both rings added as subpaths in one beginPath — evenodd fill cuts the hole
      var rOutPts=[]; for(var ro=0;ro<segs;ro++) rOutPts.push(jv(Math.cos(ro*Math.PI*2/segs)*r,Math.sin(ro*Math.PI*2/segs)*r))
      var rndInner=seededRand(jitterSeed+9999)
      function jvI(vx,vy){if(!jitter)return[vx,vy];return[vx+(rndInner()-0.5)*2*jitter*r*ringR,vy+(rndInner()-0.5)*2*jitter*r*ringR]}
      var rInPts=[]; for(var ri5=0;ri5<segs;ri5++) rInPts.push(jvI(Math.cos(ri5*Math.PI*2/segs)*r*ringR,Math.sin(ri5*Math.PI*2/segs)*r*ringR))
      tc2.beginPath(); addSmooth(rOutPts); addSmooth(rInPts)
    } else {
      // Default smooth (no jitter, not faceted) — clean arcs
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
  var lac=p.lac||2.0,gain=p.gain||.5       // lacunarity + gain (perlin, fbm, simplex, value)
  var wJitter=p.wJitter==null?1:p.wJitter  // worley/crystal jitter
  var wMode=p.wMode||"f1"                  // worley mode: f1, f2, f2f1
  var grainSize=p.grainSize||1             // white noise grain size
  var mFreq=p.mFreq||4,mTurb=p.mTurb||2   // marble/wood freq+turb
  var CA=h2r(c1),CB=h2r(c2)
  var ds=2,dw=Math.ceil(w/ds),dh=Math.ceil(h/ds)
  var img=ctx.createImageData(dw,dh),d=img.data
  for(var py=0;py<dh;py++) for(var px=0;px<dw;px++){
    var sx=px*scale, sy=py*scale, v
    switch(nType){
      case "perlin":     v=octN(sx,sy,oct,seed,lac,gain); break
      case "fbm":        v=fbm(sx,sy,oct,lac,gain,seed); break
      case "turbulence": v=turbulence(sx,sy,oct,seed); break
      case "worley":     { var wF1=worley(sx,sy,seed,wJitter); v=wMode==="f2"?1-wF1:wMode==="f2f1"?crystal(sx,sy,seed,wJitter,"f2f1"):wF1; break }
      case "simplex":    v=octSimplex(sx,sy,oct,lac,gain,seed); break
      case "marble":     v=marble(sx,sy,oct,seed,mFreq,mTurb); break
      case "wood":       v=wood(sx,sy,oct,seed,mFreq,mTurb); break
      case "value":      v=octSimplex(sx,sy,oct,lac,gain,seed+777); break
      case "crystal":    v=crystal(sx,sy,seed,p.wJitter,p.crystalMode||"f2f1"); break
      case "phasor":     v=phasor(sx,sy,seed,p.pFreq,p.pAngle,p.pBandwidth,oct); break
      case "white":      v=whiteNoise(px,py,seed,grainSize); break
      default:           v=vh(px,py,seed)
    }
    v=Math.max(0,Math.min(1,v))
    var idx2=(py*dw+px)*4
    if(p.colorMode==="rgb"){
      // Independent noise per channel — useful for multi-directional UV displacement
      var sx2=sx,sy2=sy
      function nv(s){
        switch(nType){
          case "perlin":    return octN(sx2,sy2,oct,s,lac,gain)
          case "fbm":       return fbm(sx2,sy2,oct,lac,gain,s)
          case "simplex":   return octSimplex(sx2,sy2,oct,lac,gain,s)
          case "value":     return octSimplex(sx2,sy2,oct,lac,gain,s+777)
          case "white":     return whiteNoise(px,py,s,grainSize)
          default:          return octN(sx2,sy2,oct,s,lac,gain)
        }
      }
      var vr=Math.max(0,Math.min(1,nv(seed)))
      var vg=Math.max(0,Math.min(1,nv(seed+1000)))
      var vb=Math.max(0,Math.min(1,nv(seed+2000)))
      d[idx2]=Math.round(vr*255);d[idx2+1]=Math.round(vg*255);d[idx2+2]=Math.round(vb*255);d[idx2+3]=255
    } else {
      var c=lrC(CB,CA,v)
      d[idx2]=c.r;d[idx2+1]=c.g;d[idx2+2]=c.b;d[idx2+3]=255
    }
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
// Module-level tile cell rand — mirrors gTile's local cellRnd but takes masterSeed explicitly.
// Used by resolveExpr when context.col/row are available.
function tileCellRnd(col, row, ch, propertySeed, masterSeed) {
  var ps = propertySeed||0, ms = masterSeed||1
  return seededRand(ms*13 + ps*997 + col*1009 + row*100003 + ch*7)
}

function gTile(ctx,p,cmap,cache,iC,w,h,vis,origProps,extNodes,extNodeId) {
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
      // Re-resolve expVals rand expressions with cell context (col/row/masterSeed)
      var pCell = origProps ? resolveParams(origProps, extNodes, extNodeId, {col:col,row:row,masterSeed:masterSeed}) : p
      var cellBaseRot     = pCell.rotation!=null     ? pCell.rotation     : baseRot
      var cellBaseScale   = pCell.scale!=null         ? pCell.scale         : baseScale
      var cellBaseOpacity = pCell.opacity!=null       ? pCell.opacity       : baseOpacity

      // Per-cell RNG using source coordinates
      var cRot  =rv2(cellRnd(col,row,0,p.rRotSeed),  p.rRotEn,  cellBaseRot,   p.rRotSc,  p.rRotBi,  p.rRotAmt,  p.rRotOff)
      var cScale=rv2(cellRnd(col,row,1,p.rScaleSeed),p.rScaleEn,cellBaseScale, p.rScaleSc,p.rScaleBi,p.rScaleAmt,p.rScaleOff)
      // Opacity: unipolar (0,1) range reduces from base (negateUni=true) so it always darkens
      var cOpacity=Math.max(0,Math.min(1,rv2(cellRnd(col,row,2,p.rOpSeed),p.rOpEn,cellBaseOpacity,p.rOpSc,p.rOpBi,p.rOpAmt,p.rOpOff,true)))
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

// ── Point creators ────────────────────────────────────────────────────────────
function mkPt(idx,total,x,y,extra){
  return Object.assign({id:"pt"+idx,pointIndex:idx,pointCount:total,
    x:x,y:y,rotation:0,scale:1,opacity:1,sourceIndex:0},extra||{})
}
function gGrid(ctx,p,w,h) {
  var cols=Math.max(1,Math.round(p.cols||4)),rows=Math.max(1,Math.round(p.rows||4))
  var offX=p.offX||0,offY=p.offY||0,stagger=p.stagger||0
  var staggerAxis=p.staggerAxis||"row",sp=p.staggerParity||"odd"
  var sc=p.scale==null?1:p.scale,cx=.5,cy=.5
  var pts=[],total=cols*rows,idx=0
  for(var row=0;row<rows;row++) for(var col=0;col<cols;col++){
    var rP=((row%2)+2)%2,cP=((col%2)+2)%2,sOff=0
    if(staggerAxis==="row"&&rP===(sp==="odd"?1:0)) sOff=stagger*(1/cols)
    else if(staggerAxis==="col"&&cP===(sp==="odd"?1:0)) sOff=stagger*(1/rows)
    var nx=(col+0.5)/cols+offX+(staggerAxis==="row"?sOff:0)
    var ny=(row+0.5)/rows+offY+(staggerAxis==="col"?sOff:0)
    // Apply scale from centre
    var sx=cx+(nx-cx)*sc, sy=cy+(ny-cy)*sc
    pts.push(mkPt(idx++,total,sx,sy,{row:row,col:col,rowCount:rows,colCount:cols,
      rowNorm:rows>1?row/(rows-1):0,colNorm:cols>1?col/(cols-1):0}))
  }
  var color=p.color||"#ffffff",alpha=p.opacity==null?1:p.opacity
  var dR=Math.max(1,(p.dotSize||4)/2)
  ctx.save();ctx.globalAlpha=alpha
  if(p.renderMode!=="hidden"){
    ctx.fillStyle=color
    pts.forEach(function(pt){ctx.beginPath();ctx.arc(pt.x*w,pt.y*h,dR,0,Math.PI*2);ctx.fill()})
  }
  if(p.connected!==false){
    ctx.strokeStyle=color;ctx.lineWidth=Math.max(.5,p.strokeW||1);ctx.beginPath()
    for(var r2=0;r2<rows;r2++){
      for(var c2=0;c2<cols;c2++){var pt=pts[r2*cols+c2];c2===0?ctx.moveTo(pt.x*w,pt.y*h):ctx.lineTo(pt.x*w,pt.y*h)}
    }
    for(var c3=0;c3<cols;c3++){
      for(var r3=0;r3<rows;r3++){var pt=pts[r3*cols+c3];r3===0?ctx.moveTo(pt.x*w,pt.y*h):ctx.lineTo(pt.x*w,pt.y*h)}
    }
    ctx.stroke()
  }
  ctx.restore();ctx.canvas._points=pts
}
function gSpiral(ctx,p,w,h) {
  var n=Math.max(2,Math.round(p.pointCount||32)),turns=p.turns||3
  var sc=p.scale==null?1:p.scale
  var r0=(p.startRadius||0)*sc,r1=(p.endRadius||.45)*sc
  var cx=p.cx==null?.5:p.cx,cy=p.cy==null?.5:p.cy
  var pts=[]
  for(var i=0;i<n;i++){
    var t=n>1?i/(n-1):0,angle=t*turns*Math.PI*2,r=r0+(r1-r0)*t
    pts.push(mkPt(i,n,cx+Math.cos(angle)*r,cy+Math.sin(angle)*r,
      {spiralT:t,windingNumber:Math.floor(t*turns),angleNorm:(angle%(Math.PI*2))/(Math.PI*2),radiusNorm:r1>r0?(r-r0)/(r1-r0):0}))
  }
  var color=p.color||"#ffffff",alpha=p.opacity==null?1:p.opacity
  var dR2=Math.max(1,(p.dotSize||4)/2)
  ctx.save();ctx.globalAlpha=alpha
  if(p.renderMode!=="hidden"){
    ctx.fillStyle=color
    pts.forEach(function(pt){ctx.beginPath();ctx.arc(pt.x*w,pt.y*h,dR2,0,Math.PI*2);ctx.fill()})
  }
  if(p.connected!==false&&pts.length>1){
    ctx.strokeStyle=color;ctx.lineWidth=Math.max(.5,p.strokeW||1);ctx.beginPath()
    pts.forEach(function(pt,i){i===0?ctx.moveTo(pt.x*w,pt.y*h):ctx.lineTo(pt.x*w,pt.y*h)})
    ctx.stroke()
  }
  ctx.restore();ctx.canvas._points=pts
}
function gPolarGrid(ctx,p,w,h) {
  var rings=Math.max(1,Math.round(p.rings||4)),ppr=Math.max(2,Math.round(p.pointsPerRing||8))
  var sc=p.scale==null?1:p.scale
  var r0=(p.startRadius||.05)*sc,r1=(p.endRadius||.45)*sc
  var cx=p.cx==null?.5:p.cx,cy=p.cy==null?.5:p.cy
  var pts=[],idx=0,total=rings*ppr
  for(var ri=0;ri<rings;ri++) for(var pi=0;pi<ppr;pi++){
    var rn=rings>1?ri/(rings-1):0,r=r0+(r1-r0)*rn,angle=pi/ppr*Math.PI*2
    pts.push(mkPt(idx++,total,cx+Math.cos(angle)*r,cy+Math.sin(angle)*r,
      {ringIndex:ri,ringCount:rings,angleNorm:pi/ppr,radiusNorm:rn}))
  }
  var color=p.color||"#ffffff",alpha=p.opacity==null?1:p.opacity
  var dR3=Math.max(1,(p.dotSize||4)/2)
  ctx.save();ctx.globalAlpha=alpha
  if(p.renderMode!=="hidden"){
    ctx.fillStyle=color
    pts.forEach(function(pt){ctx.beginPath();ctx.arc(pt.x*w,pt.y*h,dR3,0,Math.PI*2);ctx.fill()})
  }
  if(p.connected!==false){
    ctx.strokeStyle=color;ctx.lineWidth=Math.max(.5,p.strokeW||1);ctx.beginPath()
    // Rings
    for(var ri2=0;ri2<rings;ri2++){
      for(var pi2=0;pi2<=ppr;pi2++){var pt=pts[ri2*ppr+(pi2%ppr)];pi2===0?ctx.moveTo(pt.x*w,pt.y*h):ctx.lineTo(pt.x*w,pt.y*h)}
      ctx.closePath()
    }
    // Spokes
    for(var si=0;si<ppr;si++){
      for(var ri3=0;ri3<rings;ri3++){var pt=pts[ri3*ppr+si];ri3===0?ctx.moveTo(pt.x*w,pt.y*h):ctx.lineTo(pt.x*w,pt.y*h)}
    }
    ctx.stroke()
  }
  ctx.restore();ctx.canvas._points=pts
}
function gPhyllotaxis(ctx,p,w,h) {
  var n=Math.max(1,Math.round(p.pointCount||64))
  var div=p.divergenceAngle==null?137.508:p.divergenceAngle
  var sc=p.scale||.45,cx=p.cx==null?.5:p.cx,cy=p.cy==null?.5:p.cy
  var pts=[]
  for(var i=0;i<n;i++){
    var a=i*div*Math.PI/180,r=sc*Math.sqrt(i/n)
    pts.push(mkPt(i,n,cx+Math.cos(a)*r,cy+Math.sin(a)*r,
      {fibIndex:i,angleNorm:(a%(Math.PI*2))/(Math.PI*2),radiusNorm:r/sc}))
  }
  var color=p.color||"#ffffff",alpha=p.opacity==null?1:p.opacity
  var dR4=Math.max(1,(p.dotSize||4)/2)
  ctx.save();ctx.globalAlpha=alpha
  if(p.renderMode!=="hidden"){
    ctx.fillStyle=color
    pts.forEach(function(pt){ctx.beginPath();ctx.arc(pt.x*w,pt.y*h,dR4,0,Math.PI*2);ctx.fill()})
  }
  if(p.connected!==false&&pts.length>1){
    ctx.strokeStyle=color;ctx.lineWidth=Math.max(.5,p.strokeW||1);ctx.beginPath()
    pts.forEach(function(pt,i){i===0?ctx.moveTo(pt.x*w,pt.y*h):ctx.lineTo(pt.x*w,pt.y*h)})
    ctx.stroke()
  }
  ctx.restore();ctx.canvas._points=pts
}
function gScatter(ctx,p,w,h) {
  var n=Math.max(1,Math.round(p.pointCount||32)),seed=p.seed||1
  var sc=p.scale==null?1:p.scale
  var rnd=seededRand(seed)
  var x0=p.x0||0,y0=p.y0||0,x1=p.x1||1,y1=p.y1||1
  var scx=.5,scy=.5  // scale from centre
  var pts=[]
  for(var i=0;i<n;i++){
    var rx=x0+(x1-x0)*rnd(),ry=y0+(y1-y0)*rnd()
    pts.push(mkPt(i,n,scx+(rx-scx)*sc,scy+(ry-scy)*sc,{scatterIndex:i}))
  }
  if(p.renderMode!=="hidden"){
    var dR5=Math.max(1,(p.dotSize||4)/2)
    ctx.save();ctx.fillStyle=p.color||"#ffffff";ctx.globalAlpha=p.opacity==null?1:p.opacity
    pts.forEach(function(pt){ctx.beginPath();ctx.arc(pt.x*w,pt.y*h,dR5,0,Math.PI*2);ctx.fill()})
    ctx.restore()
  }
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

// ── expVals — expression value resolution engine ──────────────────────────────
// resolveExpr: walks a token array [ {type,value/nodeId/prop}, … ] and returns
// a number, or null on error / cycle / missing ref.
function resolveExpr(tokens, nodes, visited, context) {
  if(!tokens||tokens.length===0) return null
  var nmap=null
  if(nodes&&nodes.length>0) nmap=nodes instanceof Map?nodes:new Map(nodes.map(function(n){return [n.id,n]}))
  var acc=null, pendingOp=null
  function applyOp(a,op,b){
    if(op==='+') return a+b
    if(op==='-') return a-b
    if(op==='*') return a*b
    if(op==='/') return b===0?0:a/b
    if(op==='^') return Math.pow(a,b)
    return b
  }
  for(var i=0;i<tokens.length;i++){
    var t=tokens[i]
    if(t.type==='lit'){
      var val=Number(t.value)
      if(acc===null) acc=val
      else if(pendingOp!==null){acc=applyOp(acc,pendingOp,val);pendingOp=null}
    } else if(t.type==='rand'){
      // Full RandRow-style formula: domain → amount → offset → scale → range clamp
      var rBipolar = t.domain==='-1-1'
      var rSeed = t.seed!=null ? t.seed : 1
      // Context-aware seeding: tile cell (col/row) or point index, else simple rand
      var rRaw
      if(context && context.col!=null && context.row!=null)
        rRaw = tileCellRnd(context.col, context.row, 0, rSeed, context.masterSeed||1)()
      else if(context && context.pointIndex!=null)
        rRaw = seededRand((context.pointIndex*2999 + rSeed) >>> 0)()
      else
        rRaw = t.seedType==='locked' ? seededRand(rSeed)() : Math.random()
      if(rBipolar) rRaw = rRaw*2-1
      var rVal = (rRaw + (t.offset||0)) * (t.scale!=null?t.scale:1) * (t.amount!=null?t.amount:1)
      var rLo = t.min!=null ? t.min : (rBipolar?-1:0)
      var rHi = t.max!=null ? t.max : 1
      rVal = Math.min(rHi, Math.max(rLo, rVal))
      if(acc===null) acc=rVal
      else if(pendingOp!==null){acc=applyOp(acc,pendingOp,rVal);pendingOp=null}
    } else if(t.type==='ref'){
      if(!nmap){if(acc===null)acc=0;pendingOp=null;continue}
      var vst=visited||new Set()
      var key=t.nodeId+':'+t.prop
      if(vst.has(key)||vst.size>=8) return null
      var nd=nmap.get(t.nodeId)
      if(!nd) return null
      var parts=t.prop.split('.'),raw=nd
      for(var pi=0;pi<parts.length;pi++) raw=raw?raw[parts[pi]]:null
      if(raw==null||typeof raw!=='number') return null
      // check nested expression on this prop
      var lastKey=parts[parts.length-1]
      var container=parts.length>1?nd[parts[0]]:nd
      var nestedExpr=container?container[lastKey+'_expr']:null
      if(nestedExpr&&nestedExpr.length>0){
        var nv2=new Set(vst);nv2.add(key)
        raw=resolveExpr(nestedExpr,nodes,nv2,context)
        if(raw===null) return null
      }
      if(acc===null) acc=raw
      else if(pendingOp!==null){acc=applyOp(acc,pendingOp,raw);pendingOp=null}
    } else if(t.type==='op'){
      pendingOp=t.value
    }
  }
  if(acc===null||!isFinite(acc)) return null
  return acc
}

// resolveParams: returns a new props/params object with all _expr keys resolved.
// Fast-exits if no _expr keys present. Call at the top of each renderer.
function resolveParams(p, nodes, nodeId, context) {
  var ks=Object.keys(p),hasExpr=false
  for(var i=0;i<ks.length;i++){var k=ks[i];if(k.length>5&&k.slice(-5)==='_expr'&&p[k]&&p[k].length>0){hasExpr=true;break}}
  if(!hasExpr) return p
  var out=Object.assign({},p)
  for(var j=0;j<ks.length;j++){
    var k2=ks[j]
    if(k2.length>5&&k2.slice(-5)==='_expr'&&p[k2]&&p[k2].length>0){
      var baseKey=k2.slice(0,-5)
      var visited=new Set(nodeId?[nodeId+':'+baseKey]:[])
      var val=resolveExpr(p[k2],nodes,visited,context)
      if(val!==null) out[baseKey]=val
    }
  }
  return out
}

// EXPR_PROPS: referenceable numeric props per node type (Phase 1: shape + tile).
var EXPR_PROPS = {
  shape: [
    {key:'props.x',       label:'x'},
    {key:'props.y',       label:'y'},
    {key:'props.sz',      label:'size'},
    {key:'props.rot',     label:'rotation'},
    {key:'props.strokeW', label:'stroke width'},
    {key:'props.pts',     label:'points'},
    {key:'props.innerR',  label:'inner radius'},
    {key:'props.alpha',   label:'opacity'},
  ],
  tile: [
    {key:'props.cols',      label:'columns'},
    {key:'props.rows',      label:'rows'},
    {key:'props.scale',     label:'scale'},
    {key:'props.rotation',  label:'rotation'},
    {key:'props.opacity',   label:'opacity'},
    {key:'props.offX',      label:'offset X'},
    {key:'props.offY',      label:'offset Y'},
    {key:'props.gapX',      label:'gap X'},
    {key:'props.gapY',      label:'gap Y'},
    {key:'props.stagger',   label:'stagger'},
    {key:'props.flipXProb', label:'flip X prob'},
    {key:'props.flipYProb', label:'flip Y prob'},
    {key:'props.seed',      label:'seed'},
    {key:'props.rRotAmt',   label:'rand rot amount'},
    {key:'props.rScaleAmt', label:'rand scale amount'},
    {key:'props.rOpAmt',    label:'rand opacity amount'},
    {key:'props.rOxAmt',    label:'rand nudge X amount'},
    {key:'props.rOyAmt',    label:'rand nudge Y amount'},
  ],
}
// ─────────────────────────────────────────────────────────────────────────────

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
  if (slotKey === "outModifiers") return node.outModifiers || []
  if (slotKey === "outMask") return node.outMask || []
  if (slotKey === "effectStack") return node.effectStack || []
  if (slotKey === "maskStack") return node.maskStack || []
  // Handle layers[N].effectStack / layers[N].maskStack
  var lm = slotKey.match(/^layers\[(\d+)\]\.(\w+)$/)
  if (lm) { var li=parseInt(lm[1]); return ((node.layers||[])[li]||{})[lm[2]] || [] }
  if (slotKey === "isolate") return node.isolate || []
  var cm = slotKey.match(/^chain\[(\d+)\]\.isolate$/)
  if (cm) { var ci2=parseInt(cm[1]); return ((node.chain||[])[ci2]||{}).isolate || [] }
  var om = slotKey.match(/^outModifiers\[(\d+)\]\.isolate$/)
  if (om) { var oi2=parseInt(om[1]); return ((node.outModifiers||[])[oi2]||{}).isolate || [] }
  var parts = slotKey.split(".")
  var slot = node[parts[0]] || {}
  return slot[parts[1]] || []
}
function setRootArr(node, slotKey, newArr) {
  if (slotKey === "outEfx") return Object.assign({}, node, {outEfx: newArr})
  if (slotKey === "outModifiers") return Object.assign({}, node, {outModifiers: newArr})
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
  if (slotKey === "isolate") return Object.assign({}, node, {isolate: newArr})
  var cm = slotKey.match(/^chain\[(\d+)\]\.isolate$/)
  if (cm) {
    var ci2=parseInt(cm[1])
    var nc2=(node.chain||[]).map(function(item,i){
      if(i!==ci2) return item
      return Object.assign({},item,{isolate:newArr})
    })
    return Object.assign({},node,{chain:nc2})
  }
  var om = slotKey.match(/^outModifiers\[(\d+)\]\.isolate$/)
  if (om) {
    var oi2=parseInt(om[1])
    var no2=(node.outModifiers||[]).map(function(item,i){
      if(i!==oi2) return item
      return Object.assign({},item,{isolate:newArr})
    })
    return Object.assign({},node,{outModifiers:no2})
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
function clCv(s,w,h){var c=mkCv(w,h);c.getContext("2d").drawImage(s,0,0);if(s&&s._points)c._points=s._points.slice();return c}

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
          if(ch==="R")      gv=rawId[gpi]
          else if(ch==="G") gv=rawId[gpi+1]
          else if(ch==="B") gv=rawId[gpi+2]
          else               gv=Math.round(.299*rawId[gpi]+.587*rawId[gpi+1]+.114*rawId[gpi+2])
          // Use raw RGB channel value — no alpha multiplication.
          // Alpha (matte) is only relevant when channel==="A" (handled separately below).
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
// Apply a spatial effect to point positions rather than pixels
// Returns new _points array with x,y (and optionally rotation/scale) modified
function applyEfxToPoints(pts,efx,w,h) {
  var p=efx.params||{}, t=efx.type
  var out=pts.map(function(pt){ return Object.assign({},pt) })
  if(t==="transform"){
    var tx=p.tx||0,ty=p.ty||0,rot=(p.rot||0)*Math.PI/180
    var su=p.su!=null?p.su:1
    var sx2=(p.sx!=null?p.sx:1)*su, sy2=(p.sy!=null?p.sy:1)*su  // non-uniform scale
    var cx2=w/2,cy2=h/2
    out.forEach(function(pt){
      var px=pt.x*w-cx2, py=pt.y*h-cy2
      var rx=px*Math.cos(rot)-py*Math.sin(rot), ry=px*Math.sin(rot)+py*Math.cos(rot)
      // No clamping — points are allowed to travel beyond canvas bounds
      pt.x=(rx*sx2+cx2+tx*w)/w
      pt.y=(ry*sy2+cy2+ty*h)/h
      pt.rotation=(pt.rotation||0)+(p.rot||0)
      pt.scale=(pt.scale||1)*su
    })
  } else if(t==="wave"){
    var wA=(p.amplitude||.05),fX=p.freqX||3,fY=p.freqY||3
    out.forEach(function(pt){
      pt.x=pt.x+Math.sin(pt.y*fY*Math.PI*2+(p.phaseY||0))*wA
      pt.y=pt.y+Math.sin(pt.x*fX*Math.PI*2+(p.phaseX||0))*wA
    })
  } else if(t==="twirl"){
    var tA=(p.angle||180)*Math.PI/180,tR=p.radius||.5
    var tSoftPt=p.softness==null?.3:p.softness
    var tcx=p.cx!=null?p.cx:.5,tcy=p.cy!=null?p.cy:.5
    out.forEach(function(pt){
      var dx=pt.x-tcx,dy=pt.y-tcy,d=Math.sqrt(dx*dx+dy*dy)
      if(d<tR){
        var rawAt=tA*(1-d/tR)
        var spBl=1
        if(tSoftPt>0&&d>tR*(1-tSoftPt)){var st2=(d-tR*(1-tSoftPt))/(tR*tSoftPt);st2=Math.min(1,Math.max(0,st2));spBl=1-st2*st2*(3-2*st2)}
        var a=rawAt*spBl;var ca=Math.cos(a),sa=Math.sin(a)
        pt.x=tcx+dx*ca-dy*sa; pt.y=tcy+dx*sa+dy*ca}
    })
  } else if(t==="bulge"){
    var bS=p.strength||.5,bR=p.radius||.7
    var bSoftPt=p.softness==null?.3:p.softness
    var bcx=p.cx!=null?p.cx:.5,bcy=p.cy!=null?p.cy:.5
    out.forEach(function(pt){
      var dx=pt.x-bcx,dy=pt.y-bcy,d=Math.sqrt(dx*dx+dy*dy)
      if(d>0&&d<bR){
        var norm=d/bR,newR=Math.pow(norm,1/(1+bS))*bR
        var sc2=newR/d
        var bpBl=1
        if(bSoftPt>0&&d>bR*(1-bSoftPt)){var bpt2=(d-bR*(1-bSoftPt))/(bR*bSoftPt);bpt2=Math.min(1,Math.max(0,bpt2));bpBl=1-bpt2*bpt2*(3-2*bpt2)}
        var blSc=sc2*bpBl+(1-bpBl); pt.x=bcx+dx*blSc; pt.y=bcy+dy*blSc}
    })
  } else if(t==="cart-to-polar"){
    out.forEach(function(pt){
      var dx=pt.x-.5,dy=pt.y-.5
      var ang=(Math.atan2(dy,dx)+Math.PI*2)%(Math.PI*2)
      var r=Math.sqrt(dx*dx+dy*dy)
      pt.x=ang/(Math.PI*2); pt.y=r*2
    })
  } else if(t==="polar-to-cart"){
    out.forEach(function(pt){
      var ang=pt.x*Math.PI*2,r=pt.y*.5
      pt.x=.5+Math.cos(ang)*r; pt.y=.5+Math.sin(ang)*r
    })
  } else if(t==="uv-distort"){
    // UV-distort in points domain: sample UV source at point position, displace x/y
    // Requires the UV source canvas to be pre-rendered — we use a placeholder
    // that reads from the UV ref if available via the efx._uvCanvas cache
    var uvMode2=p.mode||"displacement"
    var uvAmtX2=(p.amtX==null?.1:p.amtX), uvAmtY2=(p.amtY==null?.1:p.amtY)
    var uvChX2=p.chX||"R", uvChY2=p.chY||"G"
    var uvCv2=efx._uvCanvas  // pre-rendered UV source, set by applyEfxStk
    if(uvCv2){
      var uvD2=uvCv2.getContext("2d").getImageData(0,0,uvCv2.width,uvCv2.height).data
      var uvW2=uvCv2.width, uvH2=uvCv2.height
      function uvRd2(px2,py2,ch2){
        var ix2=Math.max(0,Math.min(uvW2-1,Math.round(px2*(uvW2-1))))
        var iy2=Math.max(0,Math.min(uvH2-1,Math.round(py2*(uvH2-1))))
        var id2=(iy2*uvW2+ix2)*4
        if(ch2==="R")return uvD2[id2]/255;if(ch2==="G")return uvD2[id2+1]/255
        if(ch2==="B")return uvD2[id2+2]/255
        return(.299*uvD2[id2]+.587*uvD2[id2+1]+.114*uvD2[id2+2])/255
      }
      out.forEach(function(pt){
        var vx2=uvRd2(pt.x,pt.y,uvChX2), vy2=uvRd2(pt.x,pt.y,uvChY2)
        if(uvMode2==="absolute"){
          pt.x=vx2; pt.y=vy2
        } else {
          pt.x=pt.x+(vx2-.5)*uvAmtX2
          pt.y=pt.y+(vy2-.5)*uvAmtY2
        }
      })
    }
  } else if(t==="point-map"){
    var mappings=p.mappings||[]
    var n=out.length
    mappings.forEach(function(m){
      if(m.enabled===false) return  // skip disabled mappings
      // "normalize": min-max across all points for this attribute (two-pass)
      var normRangeMin=0, normRangeMax=1
      if(m.mode==="normalize"){
        var allVals=out.map(function(pt){return pt[m.inputAttr]||0})
        normRangeMin=Math.min.apply(null,allVals)
        normRangeMax=Math.max.apply(null,allVals)
      }
      out.forEach(function(pt){
        var inV=pt[m.inputAttr]
        if(inV==null)return  // 0 is valid, only skip null/undefined
        var outMin=m.min==null?0:m.min, outMax=m.max==null?1:m.max
        // Normalise inV to 0-1 against its natural range
        var normV
        if(m.mode==="normalize"){
          var rng=normRangeMax-normRangeMin
          normV=rng>0?(inV-normRangeMin)/rng:0.5  // min-max across all points
        } else {
          // For index-type attrs, normalise against pointCount
          var ptCount=pt.pointCount||n
          if(m.inputAttr==="pointIndex")        normV=ptCount>1?inV/(ptCount-1):0
          else if(m.inputAttr==="row")           normV=pt.rowCount>1?inV/(pt.rowCount-1):0
          else if(m.inputAttr==="col")           normV=pt.colCount>1?inV/(pt.colCount-1):0
          else if(m.inputAttr==="ringIndex")     normV=pt.ringCount>1?inV/(pt.ringCount-1):0
          else if(m.inputAttr==="fibIndex"||m.inputAttr==="scatterIndex") normV=ptCount>1?inV/(ptCount-1):0
          else normV=Math.max(0,Math.min(1,inV))  // already 0-1 (rowNorm, colNorm, x, y, spiralT etc.)
        }
        normV=Math.max(0,Math.min(1,normV))
        var tV
        if(m.mode==="invert")    tV=1-normV
        else if(m.mode==="log")  tV=normV>0?Math.log(1+normV*9)/Math.log(10):0
        else if(m.mode==="exp")  tV=(Math.pow(10,normV)-1)/9
        else if(m.mode==="random") tV=seededRand((pt.pointIndex*2654435761^0x9e3779b9)>>>0)()
        else tV=normV  // linear + normalize both produce normV directly
        // Bezier curve remap: applied after mode produces tV (0-1), before outMin/outMax scaling
        // m.curve={p1x,p1y,p2x,p2y} — cubic bezier from (0,0) to (1,1)
        if(m.curveEnabled&&m.curve){
          var cp=m.curve,p1x=cp.p1x||.33,p1y=cp.p1y||.33,p2x=cp.p2x||.67,p2y=cp.p2y||.67
          var bx=function(t2){return 3*p1x*t2*(1-t2)*(1-t2)+3*p2x*t2*t2*(1-t2)+t2*t2*t2}
          var by=function(t2){return 3*p1y*t2*(1-t2)*(1-t2)+3*p2y*t2*t2*(1-t2)+t2*t2*t2}
          var lo=0,hi=1
          for(var ni=0;ni<8;ni++){var mid=(lo+hi)/2;if(bx(mid)<tV)lo=mid;else hi=mid}
          tV=Math.max(0,Math.min(1,by((lo+hi)/2)))
        }
        var mapped=tV*(outMax-outMin)+outMin
        if(m.outputAttr==="color"){
          var cA=m.colorA||"#000000",cB=m.colorB||"#ffffff"
          var rA=parseInt(cA.slice(1,3),16),gA=parseInt(cA.slice(3,5),16),bA=parseInt(cA.slice(5,7),16)
          var rB=parseInt(cB.slice(1,3),16),gB=parseInt(cB.slice(3,5),16),bB=parseInt(cB.slice(5,7),16)
          var rC=Math.round(rA+(rB-rA)*tV),gC=Math.round(gA+(gB-gA)*tV),bC=Math.round(bA+(bB-bA)*tV)
          pt.color="#"+("0"+rC.toString(16)).slice(-2)+("0"+gC.toString(16)).slice(-2)+("0"+bC.toString(16)).slice(-2)
        } else {
          var curV=pt[m.outputAttr]==null?1:pt[m.outputAttr]
          var cm=m.combine||"replace"
          if(cm==="replace")       pt[m.outputAttr]=mapped
          else if(cm==="multiply") pt[m.outputAttr]=curV*mapped
          else if(cm==="add")      pt[m.outputAttr]=curV+mapped
          else if(cm==="subtract") pt[m.outputAttr]=curV-mapped
          else pt[m.outputAttr]=mapped
        }
      })
    })
  } else if(t==="filter"){
    var fAttr=p.attr||"opacity", fOp=p.op||">", fVal=p.value==null?.5:p.value
    out=out.filter(function(pt){
      var v=pt[fAttr]; if(v==null)return false
      if(fOp===">")  return v>fVal
      if(fOp===">=") return v>=fVal
      if(fOp==="<")  return v<fVal
      if(fOp==="<=") return v<=fVal
      if(fOp==="==") return Math.abs(v-fVal)<.001
      if(fOp==="!=") return Math.abs(v-fVal)>=.001
      return true
    })
  } else if(t==="delete"){
    var dAttr=p.attr||"opacity", dOp=p.op||"<", dVal=p.value==null?.1:p.value
    out=out.filter(function(pt){
      var v=pt[dAttr]; if(v==null)return true
      if(dOp===">")  return !(v>dVal)
      if(dOp===">=") return !(v>=dVal)
      if(dOp==="<")  return !(v<dVal)
      if(dOp==="<=") return !(v<=dVal)
      if(dOp==="==") return !(Math.abs(v-dVal)<.001)
      if(dOp==="!=") return !(Math.abs(v-dVal)>=.001)
      return true
    })
  } else if(t==="separate"){
    var sAttr=p.by||"opacity",sThresh=p.threshold==null?.5:p.threshold
    out=out.map(function(pt){
      var v=pt[sAttr]; var norm=v==null?0:Math.max(0,Math.min(1,v))
      return Object.assign({},pt,{_setGroup:norm>=sThresh?"A":"B"})
    })
  } else if(t==="combine"){
    // combine is handled at Point Comp engine level; no-op in linear chain
  }
  return out
}

function applyMatchEfx(ctx, mp, w, h) {
  if(!mp.efxId) return
  var isStackRef=mp.efxId.indexOf("stack::")=== 0
  var localOps=[], globalOps=[]
  function collectTfx(params) {
    var isLocal=!params.space||params.space==="local"
    if(isLocal) localOps.push(params); else globalOps.push(params)
  }
  if(isStackRef){
    // Collect all transforms from the referenced stack
    var stackKey=mp.efxId.slice(7)  // strip "stack::"
    function findStack(n){
      var sl=stackKey.split("::")
      if(sl[0]==="out"&&n.id===sl[1])   return n.outEfx
      if(sl[0]==="efx"&&n.id===sl[1])   return n.effectStack
      if(sl[0]==="inputA"&&n.id===sl[1])return n.inputA&&n.inputA.effectStack
      if(sl[0]==="inputB"&&n.id===sl[1])return n.inputB&&n.inputB.effectStack
      if(sl[0].indexOf("layer")===0&&n.id===sl[1]){
        var li=parseInt(sl[0].slice(5)); return n.layers&&n.layers[li]&&n.layers[li].effectStack
      }
    }
    _renderNodes.forEach(function(n){
      var stk=findStack(n)
      ;(stk||[]).forEach(function(e){if(e.type==="transform"&&e.enabled)collectTfx(e.params||{})})
    })
  } else {
    // Cumulative: apply all transforms from the same stack up to and including the target
    var targetStack=null
    _renderNodes.forEach(function(n){
      function checkStk(stk){
        if(!stk) return
        for(var si=0;si<stk.length;si++){if(stk[si].id===mp.efxId){targetStack=stk;return}}
      }
      checkStk(n.outEfx); checkStk(n.effectStack)
      if(n.inputA) checkStk(n.inputA.effectStack)
      if(n.inputB) checkStk(n.inputB.effectStack)
      ;(n.layers||[]).forEach(function(l){checkStk(l.effectStack)})
    })
    if(!targetStack) return
    for(var tsi=0;tsi<targetStack.length;tsi++){
      var te=targetStack[tsi]
      if(te.type==="transform"&&te.enabled) collectTfx(te.params||{})
      if(te.id===mp.efxId) break  // stop after target
    }
  }
  if(!localOps.length&&!globalOps.length) return
  // Apply axis masking and offsets to final effective params
  // Build synthetic single-pass transform from composed stack values
  // For simplicity: apply collected ops then offset
  applyTransformStack(ctx,localOps,globalOps,w,h)
  // Apply offsets as a follow-on local transform if set
  var ox=mp.offsetX||0,oy=mp.offsetY||0,or2=mp.offsetRot||0,os=mp.offsetScale==null?1:mp.offsetScale
  if(ox||oy||or2||os!==1)
    applyTransformStack(ctx,[{tx:ox,ty:oy,rot:or2,su:os,sx:1,sy:1,skX:0,skY:0}],[],w,h)
}
function applyEfxStk(ctx,stack,cmap,cache,iC,w,h,vis,nodesList) {
  if(!stack||!stack.length)return
  var spDeferred=[]  // show-points deferred to end (always on top)
  // Collect transform ops — local first, then global, applied as a batch at end
  var localTfxOps=[], globalTfxOps=[], hasTfx=false
  stack.forEach(function(e){
    if(e.enabled&&e.type==="transform"){
      hasTfx=true
      if(!e.params||!e.params.space||e.params.space==="local") localTfxOps.push(e.params||{})
      else globalTfxOps.push(e.params||{})
    }
  })
  // Apply batched transforms first so subsequent pixel effects operate on transformed canvas
  if(hasTfx) applyTransformStack(ctx,localTfxOps,globalTfxOps,w,h)
  for(var ei=0;ei<stack.length;ei++){
    var efx=stack[ei]; if(!efx.enabled) continue
    if(efx.type==="show-points"||(efx.type==="point-map"&&efx.params&&efx.params.showLabels)){spDeferred.push(efx);continue}
    if(efx.type==="transform"){continue}  // already applied above
    if(efx.type==="match"){applyMatchEfx(ctx,efx.params||{},w,h);continue}
    // Points-domain effects: transform _points, skip canvas
    if(efx.domain==="points"&&efx.type!=="show-points"&&efx.type!=="source-at-points"){
      if(ctx.canvas&&ctx.canvas._points){
        // For uv-distort in pt mode: pre-render UV source and attach to efx
        if(efx.type==="uv-distort"&&efx.params&&efx.params.uvRefId&&cmap){
          efx._uvCanvas=compAny(efx.params.uvRefId,cmap,new Map(),iC,w,h,new Set(vis))||null
        }
        ctx.canvas._points=applyEfxToPoints(ctx.canvas._points,efx,w,h)
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
    // Point Map — handled via domain:"points" above, skip pixel path
    if(efx.type==="point-map"){ continue }

    // Source at Points — stamps sources at each point position
    if(efx.type==="source-at-points"){
      var satPts=ctx.canvas&&ctx.canvas._points
      if(satPts&&satPts.length>0){
        var satP=efx.params||{}, satSrcs=satP.sources||[]
        if(satSrcs.length>0){
          var satMode=satP.distributionMode||"weighted"
          var satTW=Math.max(4,Math.round(w/Math.sqrt(Math.max(1,satPts.length))*1.5))
          var satTH=satTW
          var satRendered=satSrcs.map(function(s){
            if(!s.refId)return null
            var sc=compAny(s.refId,cmap,new Map(cache),iC,satTW*2,satTH*2,new Set(vis))
            if(!sc)return null
            var sv=document.createElement("canvas");sv.width=satTW;sv.height=satTH
            var sx2=sv.getContext("2d");sx2.imageSmoothingEnabled=true;sx2.imageSmoothingQuality="high"
            sx2.drawImage(sc,0,0,satTW,satTH);return sv
          })
          var satTotalW=satSrcs.reduce(function(a,s){return a+(s.weight||1)},0)
          satPts.forEach(function(pt,pi){
            var srcIdx=0
            if(satMode==="sequence"){
              srcIdx=pi%satSrcs.length
            } else if(satMode==="attribute"){
              srcIdx=Math.min(Math.max(0,Math.round(pt.sourceIndex||0)),satSrcs.length-1)
            } else {
              var satR=seededRand(pi*997+(efx._seed||1))()
              var satAcc=0;for(var satSi=0;satSi<satSrcs.length;satSi++){satAcc+=(satSrcs[satSi].weight||1)/satTotalW;if(satR<satAcc){srcIdx=satSi;break}}
            }
            var satCv=satRendered[srcIdx]; if(!satCv)return
            var ptScale=(pt.scale||1), ptRot=(pt.rotation||0)*Math.PI/180
            var sw=satTW*ptScale, sh=satTH*ptScale
            // Determine tint colour from source's colorMode
            var satSrcEntry=satSrcs[srcIdx]||{}
            var satCM=satSrcEntry.colorMode||"attribute"
            var satTint=null
            if(satCM==="attribute"){
              satTint=pt.color||null
            } else if(satCM==="solid"){
              satTint=satSrcEntry.color||null
            } else if(satCM==="random"){
              var satRand2=seededRand(pi*1337+(efx._seed||1))
              var satHue=Math.round(satRand2()*360)
              satTint="hsl("+satHue+",75%,58%)"
            } else if(satCM==="range"){
              var satT=satPts.length>1?pi/(satPts.length-1):0
              var satCA=h2r(satSrcEntry.colorA||"#ff4488")
              var satCB=h2r(satSrcEntry.colorB||"#4488ff")
              var satLC=lrC(satCA,satCB,satT)
              satTint="#"+("0"+satLC.r.toString(16)).slice(-2)+("0"+satLC.g.toString(16)).slice(-2)+("0"+satLC.b.toString(16)).slice(-2)
            }
            // Apply tint via source-atop compositing on an offscreen canvas
            var drawCv=satCv
            if(satTint){
              var tintCv=mkCv(satTW,satTH),tintCtx=tintCv.getContext("2d")
              tintCtx.drawImage(satCv,0,0)
              tintCtx.globalCompositeOperation="source-atop"
              tintCtx.fillStyle=satTint
              tintCtx.fillRect(0,0,satTW,satTH)
              drawCv=tintCv
            }
            ctx.save()
            ctx.translate(pt.x*w,pt.y*h)
            ctx.rotate(ptRot)
            ctx.globalAlpha=Math.max(0,Math.min(1,pt.opacity==null?1:pt.opacity))
            ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality="high"
            ctx.drawImage(drawCv,-sw/2,-sh/2,sw,sh)
            ctx.restore()
          })
        }
      }
      continue
    }

    // Show Points — renders markers at point positions onto canvas
    if(efx.type==="show-points"){
      var spts=ctx.canvas&&ctx.canvas._points
      if(spts&&spts.length>0){
        var sp2=efx.params||{},spR=(sp2.size||6)/2,spC=sp2.color||"#00ccff",spO=sp2.opacity==null?.8:sp2.opacity
        ctx.save();ctx.globalAlpha=spO;ctx.fillStyle=spC;ctx.strokeStyle=spC;ctx.lineWidth=1
        spts.forEach(function(pt){
          var sx=pt.x*w,sy=pt.y*h
          if(sp2.style==="square") ctx.fillRect(sx-spR,sy-spR,spR*2,spR*2)
          else if(sp2.style==="crosshair"){ctx.beginPath();ctx.moveTo(sx-spR*1.5,sy);ctx.lineTo(sx+spR*1.5,sy);ctx.moveTo(sx,sy-spR*1.5);ctx.lineTo(sx,sy+spR*1.5);ctx.stroke()}
          else {ctx.beginPath();ctx.arc(sx,sy,spR,0,Math.PI*2);ctx.fill()}
          // Multi-label rendering (backward compat: falls back to old single-label params)
          var sp2Lbls=sp2.labels||[]
          if(!sp2Lbls.length&&sp2.showLabels&&sp2.labelAttr) sp2Lbls=[{attr:sp2.labelAttr,color:sp2.labelColor||"#fff",size:sp2.labelSize||9,enabled:true}]
          if(sp2Lbls.length>0){
            var lOX2=sp2.labelOffsetX!=null?sp2.labelOffsetX:(spR+3)
            var lOY2=sp2.labelOffsetY!=null?sp2.labelOffsetY:-(spR+2)
            var lSp2=sp2.labelLineSpacing!=null?sp2.labelLineSpacing:11
            var lLine2=0
            sp2Lbls.forEach(function(lbl){
              if(lbl.enabled===false) return
              var lv=pt[lbl.attr]; if(lv==null) return
              var lx2=sx+lOX2, ly2=sy+lOY2+lLine2*lSp2
              if(typeof lv==="string"&&lv.startsWith("#")){
                ctx.fillStyle=lv;ctx.fillRect(lx2,ly2-8,10,8)
                ctx.strokeStyle="rgba(0,0,0,.4)";ctx.lineWidth=.5;ctx.strokeRect(lx2,ly2-8,10,8)
              } else {
                ctx.fillStyle=lbl.color||"#fff"
                ctx.font=(lbl.size||9)+"px 'IBM Plex Mono',monospace"
                ctx.fillText(typeof lv==="number"?(Number.isInteger(lv)?String(lv):lv.toFixed(3)):String(lv),lx2,ly2)
              }
              lLine2++
            })
            ctx.fillStyle=spC; ctx.strokeStyle=spC
          }
        })
        ctx.restore()
      }
      continue
    }
    // UV Texture — true UV coordinate remap: current canvas is the UV map, samples texture by UV coords
    if(efx.type==="uv-texture"){
      var texId2=efx.params&&efx.params.texRefId
      if(texId2&&cmap){
        var texCv2=compAny(texId2,cmap,new Map(cache),iC,w,h,new Set(vis))
        if(texCv2){
          var uvMapD=ctx.getImageData(0,0,w,h)        // current canvas = UV coordinate map
          var texSrc=texCv2.getContext("2d").getImageData(0,0,w,h).data  // texture to sample
          var uvOut=ctx.createImageData(w,h)
          var wX=efx.params.wrapX||"clamp", wY=efx.params.wrapY||"clamp"
          var chU2=efx.params.chU||"R", chV2=efx.params.chV||"G"
          function uvWrap(val,dim,mode){
            // val is already a 0-1 normalised coord; convert to float pixel coord
            var fx=val*(dim-1)
            if(mode==="clamp") return Math.max(0,Math.min(dim-1,fx))
            if(mode==="repeat"){ fx=((fx%dim)+dim)%dim; return fx }
            // mirror
            var m=((fx%(dim*2))+dim*2)%(dim*2)
            return m>=dim?dim*2-1-m:m
          }
          function bilerpTex(d,fw,fh,fx,fy,ci){
            fx=Math.max(0,Math.min(fw-1,fx)); fy=Math.max(0,Math.min(fh-1,fy))
            var x0=fx|0,y0=fy|0,x1=Math.min(fw-1,x0+1),y1=Math.min(fh-1,y0+1)
            var tx=fx-x0,ty=fy-y0
            var i00=(y0*fw+x0)*4+ci,i10=(y0*fw+x1)*4+ci
            var i01=(y1*fw+x0)*4+ci,i11=(y1*fw+x1)*4+ci
            return d[i00]*(1-tx)*(1-ty)+d[i10]*tx*(1-ty)+d[i01]*(1-tx)*ty+d[i11]*tx*ty
          }
          var uvMD=uvMapD.data
          for(var ty2=0;ty2<h;ty2++) for(var tx2=0;tx2<w;tx2++){
            var uvIdx2=(ty2*w+tx2)*4
            var u2,v2
            if(chU2==="R")      u2=uvMD[uvIdx2]/255
            else if(chU2==="G") u2=uvMD[uvIdx2+1]/255
            else if(chU2==="B") u2=uvMD[uvIdx2+2]/255
            else u2=(.299*uvMD[uvIdx2]+.587*uvMD[uvIdx2+1]+.114*uvMD[uvIdx2+2])/255
            if(chV2==="R")      v2=uvMD[uvIdx2]/255
            else if(chV2==="G") v2=uvMD[uvIdx2+1]/255
            else if(chV2==="B") v2=uvMD[uvIdx2+2]/255
            else v2=(.299*uvMD[uvIdx2]+.587*uvMD[uvIdx2+1]+.114*uvMD[uvIdx2+2])/255
            var sfx=uvWrap(u2,w,wX), sfy=uvWrap(v2,h,wY)
            var di6=(ty2*w+tx2)*4
            uvOut.data[di6]  =Math.round(bilerpTex(texSrc,w,h,sfx,sfy,0))
            uvOut.data[di6+1]=Math.round(bilerpTex(texSrc,w,h,sfx,sfy,1))
            uvOut.data[di6+2]=Math.round(bilerpTex(texSrc,w,h,sfx,sfy,2))
            uvOut.data[di6+3]=Math.round(bilerpTex(texSrc,w,h,sfx,sfy,3))
          }
          applyBack(uvMD,uvOut.data,mv,efx.opacity,efx.blendMode||"normal",efx.blendChannels,efx.blendIf)
          ctx.putImageData(new ImageData(uvMD,w,h),0,0)
        }
      }
      continue
    }
    // UV Distort — pixel remapping using a separate UV source canvas
    if (efx.type==="uv-distort") {
      var uvSrcId=efx.params&&efx.params.uvRefId
      if(uvSrcId){
        var uvCv=compAny(uvSrcId,cmap,new Map(cache),iC,w,h,new Set(vis))
        if(uvCv){
          var uvD=uvCv.getContext("2d").getImageData(0,0,w,h).data
          var srcImg=ctx.getImageData(0,0,w,h)
          var srcD=srcImg.data
          var outImg2=ctx.createImageData(w,h)
          var uvMode=efx.params.mode||"displacement"
          var uvAmtX=(efx.params.amtX==null?.1:efx.params.amtX)
          var uvAmtY=(efx.params.amtY==null?.1:efx.params.amtY)
          var uvChX=efx.params.chX||"R", uvChY=efx.params.chY||"G"
          var uvCX=(efx.params.cx==null?.5:efx.params.cx)*w
          var uvCY=(efx.params.cy==null?.5:efx.params.cy)*h
          var uvRadAmt=(efx.params.radAmt==null?.5:efx.params.radAmt)
          // Bilinear sampler — clamps to edges
          function bilerp(d,fw,fh,fx,fy,ci){
            fx=Math.max(0,Math.min(fw-1,fx)); fy=Math.max(0,Math.min(fh-1,fy))
            var x0=fx|0,y0=fy|0,x1=Math.min(fw-1,x0+1),y1=Math.min(fh-1,y0+1)
            var tx=fx-x0,ty=fy-y0
            var i00=(y0*fw+x0)*4+ci,i10=(y0*fw+x1)*4+ci
            var i01=(y1*fw+x0)*4+ci,i11=(y1*fw+x1)*4+ci
            return d[i00]*(1-tx)*(1-ty)+d[i10]*tx*(1-ty)+d[i01]*(1-tx)*ty+d[i11]*tx*ty
          }
          // Bilinearly interpolated UV source read — smoother than integer lookup,
          // avoids 8-bit quantization steps being amplified into visible noise
          function uvReadB(fx,fy,ch){
            if(ch==="R")      return bilerp(uvD,w,h,fx,fy,0)/255
            else if(ch==="G") return bilerp(uvD,w,h,fx,fy,1)/255
            else if(ch==="B") return bilerp(uvD,w,h,fx,fy,2)/255
            return(.299*bilerp(uvD,w,h,fx,fy,0)
                  +.587*bilerp(uvD,w,h,fx,fy,1)
                  +.114*bilerp(uvD,w,h,fx,fy,2))/255
          }
          for(var uvy=0;uvy<h;uvy++) for(var uvx=0;uvx<w;uvx++){
            var uvVal=uvReadB(uvx,uvy,uvChX), uvValY=uvReadB(uvx,uvy,uvChY)
            var sx4f,sy4f
            if(uvMode==="absolute"){
              sx4f=uvVal*(w-1); sy4f=uvValY*(h-1)
            } else if(uvMode==="radial"){
              // UV source = scalar magnitude. Direction = outward unit vector from centre.
              // Positive amount = push outward (barrel); negative = pull inward (pinch).
              var mag=uvReadB(uvx,uvy,uvChX)
              var rdx=uvx-uvCX, rdy=uvy-uvCY
              var rdist=Math.sqrt(rdx*rdx+rdy*rdy)
              var rnx=rdist>0?rdx/rdist:0, rny=rdist>0?rdy/rdist:0
              var rscale=mag*uvRadAmt*Math.min(w,h)
              sx4f=uvx+rnx*rscale; sy4f=uvy+rny*rscale
            } else {
              // displacement (default) — R/G channels drive X/Y independently
              // With greyscale source R=G so result is identical; with RGB noise R≠G
              sx4f=uvx+(uvVal-.5)*uvAmtX*w
              sy4f=uvy+(uvValY-.5)*uvAmtY*h
            }
            var di4=(uvy*w+uvx)*4
            outImg2.data[di4]  =Math.round(bilerp(srcD,w,h,sx4f,sy4f,0))
            outImg2.data[di4+1]=Math.round(bilerp(srcD,w,h,sx4f,sy4f,1))
            outImg2.data[di4+2]=Math.round(bilerp(srcD,w,h,sx4f,sy4f,2))
            outImg2.data[di4+3]=Math.round(bilerp(srcD,w,h,sx4f,sy4f,3))
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
    // transform effects already applied as batch above

    var pre=ctx.getImageData(0,0,w,h), post=new Uint8ClampedArray(pre.data)
    pxFn(post,w,h,efx.type,efx.params)
    var mv=efx.maskStack&&efx.maskStack.length>0?compMasks(efx.maskStack,cmap,cache,iC,w,h,new Set(vis)):null
    applyBack(pre.data,post,mv,efx.opacity,efx.blendMode||"normal",efx.blendChannels,efx.blendIf)
    ctx.putImageData(pre,0,0)
  }

  // Flush deferred show-points — always rendered on top regardless of stack position
  spDeferred.forEach(function(spEfx){
    var spp=spEfx.params||{}, spts=ctx.canvas&&ctx.canvas._points
    if(!spts||!spts.length) return
    var sDr=Math.max(1,(spp.size||6)/2), sClr=spp.color||"#00ccff"
    var sSty=spp.style||"circle", sOp=spp.opacity==null?.8:spp.opacity
    ctx.save(); ctx.globalAlpha=sOp; ctx.fillStyle=sClr; ctx.strokeStyle=sClr; ctx.lineWidth=1
    spts.forEach(function(pt){
      var sx=pt.x*w, sy=pt.y*h; ctx.beginPath()
      if(sSty==="square") ctx.rect(sx-sDr,sy-sDr,sDr*2,sDr*2)
      else if(sSty==="crosshair"){ctx.moveTo(sx-sDr*1.5,sy);ctx.lineTo(sx+sDr*1.5,sy);ctx.moveTo(sx,sy-sDr*1.5);ctx.lineTo(sx,sy+sDr*1.5);ctx.stroke()}
      else ctx.arc(sx,sy,sDr,0,Math.PI*2)
      if(sSty!=="crosshair") ctx.fill()
      // Multi-label rendering (backward compat: falls back to old single-label params)
      var sppLbls=spp.labels||[]
      if(!sppLbls.length&&spp.showLabels&&spp.labelAttr) sppLbls=[{attr:spp.labelAttr,color:spp.labelColor||"#fff",size:spp.labelSize||9,enabled:true}]
      if(sppLbls.length>0){
        var lOX=spp.labelOffsetX!=null?spp.labelOffsetX:(sDr+3)
        var lOY=spp.labelOffsetY!=null?spp.labelOffsetY:-(sDr+2)
        var lSp=spp.labelLineSpacing!=null?spp.labelLineSpacing:11
        var lLine=0
        sppLbls.forEach(function(lbl){
          if(lbl.enabled===false) return
          var lv=pt[lbl.attr]; if(lv==null) return
          var lx=sx+lOX, ly=sy+lOY+lLine*lSp
          if(typeof lv==="string"&&lv.startsWith("#")){
            ctx.fillStyle=lv;ctx.fillRect(lx,ly-8,10,8)
            ctx.strokeStyle="rgba(0,0,0,.4)";ctx.lineWidth=.5;ctx.strokeRect(lx,ly-8,10,8)
          } else {
            ctx.fillStyle=lbl.color||"#fff"
            ctx.font=(lbl.size||9)+"px 'IBM Plex Mono',monospace"
            ctx.fillText(typeof lv==="number"?(Number.isInteger(lv)?String(lv):lv.toFixed(3)):String(lv),lx,ly)
          }
          lLine++
        })
        ctx.fillStyle=pt.color||sClr; ctx.strokeStyle=pt.color||sClr
      }
    })
    ctx.restore()
  })
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
  if(slot.effectStack&&slot.effectStack.length>0){
    var hadPtEfx=slot.effectStack.some(function(e){return e.enabled&&e.domain==="points"&&e.type!=="show-points"&&e.type!=="source-at-points"})
    applyEfxStk(ctx,slot.effectStack,cmap,cache,iC,w,h,new Set(vis),nodes)
    if(hadPtEfx&&cv._shapeProps&&cv._points&&cv._points.length>0){
      ctx.clearRect(0,0,w,h); gShape(ctx,cv._shapeProps,w,h)
    }
  }
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
    if(efx.type==="match"){applyMatchEfx(ctx,efx.params||{},w,h);continue}
    if(efx.type==="transform"){applyTransform(ctx,efx.params,w,h);continue}
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

function compPointComp(n,cmap,cache,iC,w,h,vis) {
  var cv=mkCv(w,h), ctx=cv.getContext("2d")
  // ── 1. Single source (refId direct on node; legacy fallback: sources[0]) ─
  var pts=[]
  var srcId=n.refId||(n.sources&&n.sources[0]&&n.sources[0].refId)
  if(srcId&&!vis.has(srcId)){
    var srcCv=compAny(srcId,cmap,cache,iC,w,h,new Set(vis))
    if(srcCv&&srcCv._points&&srcCv._points.length){
      pts=srcCv._points.map(function(p){return Object.assign({},p)})
      var srcIso=n.isolate||(n.sources&&n.sources[0]&&n.sources[0].isolate)||[]
      if(srcIso.length>0){
        var iv0=new Set(vis); iv0.add(n.id)
        var mv0=compMasks(srcIso,cmap,cache,iC,w,h,iv0)
        if(mv0){
          var srcIsoAttr=n.isolateAttr&&n.isolateAttr.trim()?n.isolateAttr.trim():"isolate"
          pts.forEach(function(pt){
            var px=Math.max(0,Math.min(w-1,Math.round(pt.x*(w-1))))
            var py=Math.max(0,Math.min(h-1,Math.round(pt.y*(h-1))))
            pt[srcIsoAttr]=mv0[py*w+px]
          })
          pts=pts.filter(function(pt){return pt[srcIsoAttr]>0.01})
        }
      }
    }
  }
  // ── 2. Modifier chain top→bottom ─────────────────────────────────────────
  var chain=n.chain||[]
  for(var ci=0;ci<chain.length;ci++){
    var item=chain[ci]
    if(item.type==="_source") continue
    if(item.enabled===false||!pts.length) continue
    var targets=pts, unchanged=[]
    if(item.isolate&&item.isolate.length>0){
      var iv1=new Set(vis); iv1.add(n.id)
      var mv1=compMasks(item.isolate,cmap,cache,iC,w,h,iv1)
      if(mv1){
        var isoAttrNm=item.isolateAttr&&item.isolateAttr.trim()?item.isolateAttr.trim():("isolate_"+(ci+1))
        pts.forEach(function(pt){
          var px=Math.max(0,Math.min(w-1,Math.round(pt.x*(w-1))))
          var py=Math.max(0,Math.min(h-1,Math.round(pt.y*(h-1))))
          pt[isoAttrNm]=mv1[py*w+px]
        })
        unchanged=pts.filter(function(pt){return pt[isoAttrNm]<=0.01})
        targets=pts.filter(function(pt){return pt[isoAttrNm]>0.01})
      }
    }
    // Renderer items (show-points, source-at-points): draw to canvas, don't transform pts
    if(item.type==="show-points"||item.type==="source-at-points"){
      ctx.canvas._points=targets  // respect isolate filter (targets=pts when no isolate)
      applyEfxStk(ctx,[item],cmap,cache,iC,w,h,new Set(vis))
      continue
    }
    if(item.type==="uv-distort"&&item.params&&item.params.uvRefId)
      item._uvCanvas=compAny(item.params.uvRefId,cmap,new Map(),iC,w,h,new Set(vis))||null
    targets=applyEfxToPoints(targets,item,w,h)
    pts=unchanged.concat(targets)
  }
  cv._points=pts
  // ── 3. Output chain (point context modifiers applied before rendering) ───
  var outChain=n.outModifiers||[]
  for(var oci=0;oci<outChain.length;oci++){
    var outItem=outChain[oci]
    if(outItem.enabled===false||!pts.length) continue
    var outTargets=pts, outUnchanged=[]
    if(outItem.isolate&&outItem.isolate.length>0){
      var oiv=new Set(vis); oiv.add(n.id)
      var omv=compMasks(outItem.isolate,cmap,cache,iC,w,h,oiv)
      if(omv){
        var oAttr=outItem.isolateAttr&&outItem.isolateAttr.trim()?outItem.isolateAttr.trim():("out_isolate_"+(oci+1))
        pts.forEach(function(pt){
          var px=Math.max(0,Math.min(w-1,Math.round(pt.x*(w-1))))
          var py=Math.max(0,Math.min(h-1,Math.round(pt.y*(h-1))))
          pt[oAttr]=omv[py*w+px]
        })
        outUnchanged=pts.filter(function(pt){return pt[oAttr]<=0.01})
        outTargets=pts.filter(function(pt){return pt[oAttr]>0.01})
      }
    }
    if(outItem.type==="show-points"||outItem.type==="source-at-points"){
      cv._points=outTargets
      applyEfxStk(ctx,[outItem],cmap,cache,iC,w,h,new Set(vis))
      continue
    }
    if(outItem.type==="uv-distort"&&outItem.params&&outItem.params.uvRefId)
      outItem._uvCanvas=compAny(outItem.params.uvRefId,cmap,new Map(),iC,w,h,new Set(vis))||null
    outTargets=applyEfxToPoints(outTargets,outItem,w,h)
    pts=outUnchanged.concat(outTargets)
  }
  cv._points=pts
  // ── 4. Render ─────────────────────────────────────────────────────────────
  if(pts.length>0){
    pts.forEach(function(pt){
      ctx.globalAlpha=Math.max(0,Math.min(1,pt.opacity==null?1:pt.opacity))
      ctx.fillStyle=pt.color||"#24cca8"
      var r=Math.max(1,(pt.scale==null?1:pt.scale)*3)
      ctx.beginPath(); ctx.arc(pt.x*w,pt.y*h,r,0,Math.PI*2); ctx.fill()
    })
    ctx.globalAlpha=1
  }
  if(n.outMask&&n.outMask.length>0){
    if(n.outMaskOpacity!=null&&n.outMaskOpacity<100){
      var omid=ctx.getImageData(0,0,w,h),omf=n.outMaskOpacity/100
      for(var omi=0;omi<w*h;omi++) omid.data[omi*4+3]=Math.round(omid.data[omi*4+3]*omf)
      ctx.putImageData(omid,0,0)
    }
    maskToAlpha(ctx,n.outMask,cmap,cache,iC,w,h,new Set(vis))
  }
  if(n.outOpacity!=null&&n.outOpacity<100){
    var oid=ctx.getImageData(0,0,w,h),of=n.outOpacity/100
    for(var oi=0;oi<w*h;oi++) oid.data[oi*4+3]=Math.round(oid.data[oi*4+3]*of)
    ctx.putImageData(oid,0,0)
  }
  return cv
}

function compAny(id,cmap,cache,iC,w,h,vis) {
  if(!vis)vis=new Set()
  if(cache.has(id))return cache.get(id)
  if(vis.has(id))return null
  var n=cmap.get(id);if(!n||!n.enabled)return null

  // ── Creators ───────────────────────────────────────
  if(n.section===1){
    var cv=mkCv(w,h),ctx=cv.getContext("2d")
    if(n.type==="solid")gSolid(ctx,n.props,w,h)
    else if(n.type==="shape"){
      var sType=n.props&&n.props.shapeType
      // Generate _points for ALL shape types first
      if(sType==="grid")            gGrid(ctx,n.props,w,h)
      else if(sType==="spiral")     gSpiral(ctx,n.props,w,h)
      else if(sType==="polar-grid") gPolarGrid(ctx,n.props,w,h)
      else if(sType==="phyllotaxis")gPhyllotaxis(ctx,n.props,w,h)
      else if(sType==="scatter")    gScatter(ctx,n.props,w,h)
      else cv._points=shapePoints(n.props,w,h)  // classic shapes: vertices/perimeter
      // Pre-apply any points-domain effects BEFORE gShape renders
      // This allows wave/twirl/bulge etc. in pt mode to warp the point positions
      // Apply points-domain effects in FORWARD order (0 → n) before gShape renders.
      // Forward order = top-of-stack first, matching user's expectation:
      // Point Map (top) transforms points, Source at Points (below) uses result.
      var shapeEfxAll=(n.outEfx||n.effectStack||[])
      for(var pei=0;pei<shapeEfxAll.length;pei++){
        var pefx=shapeEfxAll[pei]
        if(!pefx.enabled||pefx.domain!=="points")continue
        if(pefx.type==="show-points"||pefx.type==="source-at-points")continue
        if(cv._points) cv._points=applyEfxToPoints(cv._points,pefx,w,h)
      }
      // Write modified _points back so gShape reads them via ctx.canvas._points
      ctx.canvas._points=cv._points
      ctx.clearRect(0,0,w,h)
      gShape(ctx,resolveParams(n.props,nodes,n.id),w,h)
      // Apply pixel-domain effects
      var pixEfxAll=shapeEfxAll.filter(function(e){return e.enabled&&e.domain!=="points"})
      if(pixEfxAll.length>0) applyEfxStk(ctx,pixEfxAll,cmap,cache,iC,w,h,new Set(vis),nodes)
    }
    else if(n.type==="uv-create")gUVCreate(ctx,n.props,w,h)
    else if(n.type==="gradient")gGrad(ctx,resolveParams(n.props,nodes,n.id),w,h)
    else if(n.type==="noise")gNoise(ctx,resolveParams(n.props,nodes,n.id),w,h)
    else if(n.type==="pattern")gPat(ctx,resolveParams(n.props,nodes,n.id),w,h)
    else if(n.type==="tile")gTile(ctx,resolveParams(n.props,nodes,n.id,null),cmap,cache,iC,w,h,vis,n.props,nodes,n.id)
    else if(n.type==="grid"||n.type==="spiral"||n.type==="polar-grid"||n.type==="phyllotaxis"||n.type==="scatter"){
      // Route standalone geo nodes through same pre-pass+re-render as shape+shapeType nodes
      var gFn2={"grid":gGrid,"spiral":gSpiral,"polar-grid":gPolarGrid,"phyllotaxis":gPhyllotaxis,"scatter":gScatter}[n.type]
      if(gFn2) gFn2(ctx,n.props,w,h)
      cv._points=ctx.canvas._points
      var synProps=Object.assign({},n.props,{shapeType:n.type})
      cv._shapeProps=synProps
      // Pre-pass: apply pt-domain effects FORWARD before rendering
      var geoEfx=(n.outEfx||n.effectStack||[])
      if(geoEfx.length>0){
        for(var gpi=0;gpi<geoEfx.length;gpi++){
          var gpefx=geoEfx[gpi]; if(!gpefx.enabled||gpefx.domain!=="points")continue
          if(gpefx.type==="show-points"||gpefx.type==="source-at-points")continue
          if(cv._points) cv._points=applyEfxToPoints(cv._points,gpefx,w,h)
        }
      }
      // Write modified _points back so gShape reads them via ctx.canvas._points
      ctx.canvas._points=cv._points
      ctx.clearRect(0,0,w,h); gShape(ctx,synProps,w,h)
      if(geoEfx.length>0){
        var gpx=geoEfx.filter(function(e){return e.enabled&&e.domain!=="points"&&e.type!=="show-points"&&e.type!=="source-at-points"})
        if(gpx.length) applyEfxStk(ctx,gpx,cmap,cache,iC,w,h,new Set(vis),nodes)
        var gsat=geoEfx.filter(function(e){return e.enabled&&(e.type==="source-at-points"||e.type==="show-points")})
        if(gsat.length) applyEfxStk(ctx,gsat,cmap,cache,iC,w,h,new Set(vis),nodes)
      }
    }
    else if(n.type==="image")gImg(ctx,n.props,iC,w,h)
    cache.set(id,cv);return cv
  }

  // ── Point Comp compositor ──────────────────────────────────
  if(n.type==="point-comp"){
    vis.add(id)
    var pccv=compPointComp(n,cmap,cache,iC,w,h,new Set(vis))
    if(pccv) cache.set(id,pccv)
    vis.delete(id); return pccv
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
    // Iterate bottom-first: index 0 = top layer in UI, so render last index first
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
  _renderNodes=nodes||[]
  if(!canvas)return
  if(!dispId||!nodes||nodes.length===0){
    var clrCtx=canvas.getContext("2d")
    clrCtx.clearRect(0,0,canvas.width,canvas.height)
    return
  }
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
      } else if(dispSlot.slot&&dispSlot.slot.indexOf("chain_isolate_")===0&&dsNode){
        // Point Comp source-chain item isolate mask — individual modifier's isolate
        var isoCI=parseInt(dispSlot.slot.replace("chain_isolate_",""))
        var isoItem=dsNode&&(dsNode.chain||[])[isoCI]
        renderMaskGrey(isoItem?isoItem.isolate||[]:[],"no isolate mask")
      } else if(dispSlot.slot==="source_isolate"&&dsNode){
        // Point Comp source-level isolate mask — combined result of the source mask stack
        renderMaskGrey(dsNode.isolate||[],"no source isolate mask")
      } else if(dispSlot.slot&&dispSlot.slot.indexOf("out_isolate_")===0&&dsNode){
        // Point Comp output-chain item isolate mask — individual output modifier's isolate
        var outIsoCI=parseInt(dispSlot.slot.replace("out_isolate_",""))
        var outIsoItem=dsNode&&(dsNode.outModifiers||[])[outIsoCI]
        renderMaskGrey(outIsoItem?outIsoItem.isolate||[]:[],"no output isolate mask")
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
        // Point-comp: walk all isolate contexts in priority order.
        // Source isolate → chain item isolates → output chain isolates → outMask.
        if(!em2&&mn.type==="point-comp"){
          if(mn.isolate&&mn.isolate.length>0){
            em2=compMasks(mn.isolate,cmap,new Map(),iC,w,h,new Set())
            emLabel="source isolate"
          }
          // Chain item isolates — find first one that has masks configured
          if(!em2){
            var pcCh=mn.chain||[]
            for(var pci=0;pci<pcCh.length&&!em2;pci++){
              var pcIt=pcCh[pci]
              if(pcIt.isolate&&pcIt.isolate.length>0){
                em2=compMasks(pcIt.isolate,cmap,new Map(),iC,w,h,new Set())
                emLabel=(pcIt.name||pcIt.type)+" isolate"
              }
            }
          }
          // Output chain item isolates
          if(!em2){
            var pcOut=mn.outModifiers||[]
            for(var pco=0;pco<pcOut.length&&!em2;pco++){
              var pcOIt=pcOut[pco]
              if(pcOIt.isolate&&pcOIt.isolate.length>0){
                em2=compMasks(pcOIt.isolate,cmap,new Map(),iC,w,h,new Set())
                emLabel="output "+(pcOIt.name||pcOIt.type)+" isolate"
              }
            }
          }
          if(!em2&&mn.outMask&&mn.outMask.length>0){
            em2=compMasks(mn.outMask,cmap,new Map(),iC,w,h,new Set())
            emLabel="output mask"
          }
        }
        // §1 creators: show intrinsic alpha channel as matte
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
  var locked = !!props.exprActive
  var disp = props.fmt ? props.fmt(props.v) : (props.st < 1 ? Number(props.v).toFixed(2) : Math.round(props.v))
  var shown = locked
    ? (props.exprResult!=null ? (props.fmt?props.fmt(props.exprResult):(props.st<1?Number(props.exprResult).toFixed(2):Math.round(props.exprResult))) : '—')
    : disp
  var trackVal = locked ? (props.exprResult!=null?props.exprResult:props.v) : props.v
  return (
    <PR l={props.l} className={(locked?'expr-locked ':'')+(props.exprType?'expr-'+props.exprType:'')}>
      <input type="range" min={props.mn} max={props.mx} step={props.st||.01} value={trackVal}
        onChange={locked?function(){}:function(e){ props.fn(parseFloat(e.target.value)) }}
        readOnly={locked} style={{flex:1}}/>
      <span className="pval" style={locked?{color:'var(--mu)'}:{}}>{shown}</span>
      {props.exprIcon||null}
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
  // Safety: nodes must be an array
  if(!props.nodes||!Array.isArray(props.nodes)) return null
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
            Creators
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
// Geometry types that are point-based (use point render controls)
var GEO_POINT_TYPES = ["grid","spiral","polar-grid","phyllotaxis","scatter"]
// Effects available in point context (transform + point-specific only)
// Effects available in Point Comp isolate mask effect stacks.
// Luminance/shape ops only — no colour manipulation (masks are greyscale).
var ISOLATE_MASK_EFFECTS = ["brightness","contrast","curves","exposure","levels","posterize","invert","threshold","pixelate","blur"]
var POINT_CONTEXT_EFFECTS = ["transform","wave","twirl","bulge","cart-to-polar","polar-to-cart","uv-distort","match","point-map","source-at-points","show-points","attributes","combine","separate","filter","delete"]
function getSourceGeomType(nodes, sourceId) {
  if(!sourceId||!nodes) return null
  var n=(nodes||[]).find(function(x){return x.id===sourceId})
  if(!n) return null
  if(GEO_POINT_TYPES.includes(n.type)) return n.type
  if(n.type==="shape"&&n.props&&GEO_POINT_TYPES.includes(n.props.shapeType)) return n.props.shapeType
  return null
}
function getPointAttrs(geomType) {
  var base=["pointIndex","x","y"]
  var mapped=["scale","rotation","opacity","color","sourceIndex"]
  if(geomType==="grid")        return base.concat(["row","col"]).concat(mapped)
  if(geomType==="polar-grid") return base.concat(["ringIndex","sectorIndex"]).concat(mapped)
  if(geomType==="spiral")     return base.concat(["spiralT"]).concat(mapped)
  if(geomType==="phyllotaxis") return base.concat(["fibIndex"]).concat(mapped)
  if(geomType==="scatter")    return base.concat(["scatterIndex"]).concat(mapped)
  return base.concat(mapped)
}
// Collects custom attribute names from a point-comp node's chain:
// isolate mask attrs, attributes modifier add/set op names, system attrs
function getChainCustomAttrs(node) {
  if(!node||node.type!=="point-comp") return []
  var attrs=[]
  function addA(a){var t=(a||"").trim();if(t&&!attrs.includes(t))attrs.push(t)}
  if((node.isolate||[]).length>0) addA((node.isolateAttr||"").trim()||"isolate")
  ;(node.chain||[]).forEach(function(item,ci){
    if((item.isolate||[]).length>0) addA((item.isolateAttr||"").trim()||("isolate_"+(ci+1)))
    if(item.type==="attributes"){
      ;((item.params&&item.params.ops)||[]).forEach(function(op){
        if((op.action==="add"||op.action==="set")&&op.name) addA(op.name)
      })
    }
  })
  addA("_modIdx"); addA("_setGroup")
  return attrs
}
// Derive the full available attribute list for a point-comp context.
// Used by EfxPrimary, PointChainItemCard attributes tab, etc.
function computeAllAttrs(nodes,selfId,sourceId){
  var srcNode=(nodes||[]).find(function(n){return n.id===sourceId})
  var srcShape=srcNode?(srcNode.type==="shape"?srcNode.props&&srcNode.props.shapeType:srcNode.type):null
  var ptAttrs=getPointAttrs(srcShape||"")
  var pcNode=(nodes||[]).find(function(n){return n.id===selfId&&n.type==="point-comp"})
  var customAttrs=getChainCustomAttrs(pcNode)
  return ptAttrs.concat(customAttrs.filter(function(a){return !ptAttrs.includes(a)}))
}

function ShapeP(props) {
  var p=props.p, up=props.up, s=p.shapeType, nodes=props.nodes||[], selfId=props.selfId
  var isPointGeo = GEO_POINT_TYPES.includes(s)
  var rm = p.renderMode||"smooth"
  // ExprEditor factory for shape props
  function ex(paramKey, child) {
    return <ExprEditor paramKey={paramKey} tokens={p[paramKey+'_expr']||null}
      nodes={nodes} selfId={selfId}
      onExprChange={function(t){var o={};o[paramKey+'_expr']=t;up(Object.assign({},p,o))}}>
      {child}
    </ExprEditor>
  }
  return (
    <div>
      <Se l="type" v={s} opts={SHAPES} fn={function(v){up(Object.assign({},p,{shapeType:v}))}}/>
      <Se l="render" v={rm} opts={isPointGeo?["points"]:["smooth","faceted","points"]}
        fn={function(v){up(Object.assign({},p,{renderMode:v}))}}/>
      {!isPointGeo&&ex('x',     <Sl l="x"    v={p.x||.5}   mn={0}   mx={1}   st={.01} fn={function(v){up(Object.assign({},p,{x:v}))}}/>)}
      {!isPointGeo&&ex('y',     <Sl l="y"    v={p.y||.5}   mn={0}   mx={1}   st={.01} fn={function(v){up(Object.assign({},p,{y:v}))}}/>)}
      {!isPointGeo&&ex('sz',    <Sl l="size" v={p.sz||.6}  mn={.05} mx={1.8} st={.01} fn={function(v){up(Object.assign({},p,{sz:v}))}}/>)}
      {(s==="ellipse") && (
        <div>
          <Sl l="x radius" v={p.rx==null?1:p.rx} mn={.1} mx={3} st={.01} fn={function(v){up(Object.assign({},p,{rx:v}))}}/>
          <Sl l="y radius" v={p.ry==null?1:p.ry} mn={.1} mx={3} st={.01} fn={function(v){up(Object.assign({},p,{ry:v}))}}/>
        </div>
      )}
      {(s==="rectangle") && (
        <div>
          <Sl l="size x" v={p.rx==null?1:p.rx} mn={0.1} mx={3} st={.01} fmt={function(v){return v.toFixed(2)+"×"}} fn={function(v){up(Object.assign({},p,{rx:v}))}}/>
          <Sl l="size y" v={p.ry==null?1:p.ry} mn={0.1} mx={3} st={.01} fmt={function(v){return v.toFixed(2)+"×"}} fn={function(v){up(Object.assign({},p,{ry:v}))}}/>
        </div>
      )}
      {!isPointGeo&&ex("rot",<Sl l="rotation" v={p.rot||0} mn={0} mx={360} st={1} fmt={function(v){return Math.round(v)+"deg"}} fn={function(v){up(Object.assign({},p,{rot:v}))}}/>)}
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
      {/* ── Geometry-specific params ── */}
      {s==="grid"&&(<div>
        <Sl l="columns" v={p.cols||4} mn={1} mx={64} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{cols:v}))}}/>
        <Sl l="rows" v={p.rows||4} mn={1} mx={64} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{rows:v}))}}/>
        <Sl l="stagger" v={p.stagger||0} mn={0} mx={1} st={.01} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{stagger:v}))}}/>
        {(p.stagger||0)>0&&<Se l="axis" v={p.staggerAxis||"row"} opts={["row","col"]} fn={function(v){up(Object.assign({},p,{staggerAxis:v}))}}/>}
        <Sl l="offset X" v={p.offX||0} mn={-.5} mx={.5} st={.01} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{offX:v}))}}/>
        <Sl l="offset Y" v={p.offY||0} mn={-.5} mx={.5} st={.01} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{offY:v}))}}/>
        <Sl l="scale" v={p.scale==null?1:p.scale} mn={.1} mx={3} st={.01} fmt={function(v){return v.toFixed(2)+"×"}} fn={function(v){up(Object.assign({},p,{scale:v}))}}/>
        <PR l="connected">{["on","off"].map(function(opt){var a=(p.connected===false?"off":"on")===opt;return <button key={opt} className={a?"ac":"ghost"} onClick={function(){up(Object.assign({},p,{connected:opt==="on"}))}} style={{flex:1,fontSize:11,minHeight:32}}>{opt}</button>})}</PR>
      </div>)}
      {s==="spiral"&&(<div>
        <Sl l="points" v={p.pointCount||32} mn={4} mx={512} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{pointCount:v}))}}/>
        <Sl l="turns" v={p.turns||3} mn={.25} mx={20} st={.25} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{turns:v}))}}/>
        <Sl l="start r" v={p.startRadius||0} mn={0} mx={.5} st={.01} fn={function(v){up(Object.assign({},p,{startRadius:v}))}}/>
        <Sl l="end r" v={p.endRadius||.45} mn={.01} mx={.5} st={.01} fn={function(v){up(Object.assign({},p,{endRadius:v}))}}/>
        <Sl l="centre X" v={p.cx==null?.5:p.cx} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cx:v}))}}/>
        <Sl l="centre Y" v={p.cy==null?.5:p.cy} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cy:v}))}}/>
        <Sl l="scale" v={p.scale==null?1:p.scale} mn={.1} mx={3} st={.01} fmt={function(v){return v.toFixed(2)+"×"}} fn={function(v){up(Object.assign({},p,{scale:v}))}}/>
        <PR l="connected">{["on","off"].map(function(opt){var a=(p.connected===false?"off":"on")===opt;return <button key={opt} className={a?"ac":"ghost"} onClick={function(){up(Object.assign({},p,{connected:opt==="on"}))}} style={{flex:1,fontSize:11,minHeight:32}}>{opt}</button>})}</PR>
      </div>)}
      {s==="polar-grid"&&(<div>
        <Sl l="rings" v={p.rings||4} mn={1} mx={32} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{rings:v}))}}/>
        <Sl l="per ring" v={p.pointsPerRing||8} mn={2} mx={64} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{pointsPerRing:v}))}}/>
        <Sl l="start r" v={p.startRadius||.05} mn={0} mx={.5} st={.01} fn={function(v){up(Object.assign({},p,{startRadius:v}))}}/>
        <Sl l="end r" v={p.endRadius||.45} mn={.01} mx={.5} st={.01} fn={function(v){up(Object.assign({},p,{endRadius:v}))}}/>
        <Sl l="centre X" v={p.cx==null?.5:p.cx} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cx:v}))}}/>
        <Sl l="centre Y" v={p.cy==null?.5:p.cy} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cy:v}))}}/>
        <Sl l="scale" v={p.scale==null?1:p.scale} mn={.1} mx={3} st={.01} fmt={function(v){return v.toFixed(2)+"×"}} fn={function(v){up(Object.assign({},p,{scale:v}))}}/>
        <PR l="connected">{["on","off"].map(function(opt){var a=(p.connected===false?"off":"on")===opt;return <button key={opt} className={a?"ac":"ghost"} onClick={function(){up(Object.assign({},p,{connected:opt==="on"}))}} style={{flex:1,fontSize:11,minHeight:32}}>{opt}</button>})}</PR>
      </div>)}
      {s==="phyllotaxis"&&(<div>
        <Sl l="points" v={p.pointCount||64} mn={4} mx={1024} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{pointCount:v}))}}/>
        <Sl l="divergence" v={p.divergenceAngle==null?137.508:p.divergenceAngle} mn={90} mx={180} st={.001} fmt={function(v){return v.toFixed(3)+"°"}} fn={function(v){up(Object.assign({},p,{divergenceAngle:v}))}}/>
        <Sl l="spread" v={p.scale||.45} mn={.05} mx={.5} st={.005} fn={function(v){up(Object.assign({},p,{scale:v}))}}/>
        <Sl l="centre X" v={p.cx==null?.5:p.cx} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cx:v}))}}/>
        <Sl l="centre Y" v={p.cy==null?.5:p.cy} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cy:v}))}}/>
        <Sl l="scale" v={p.scale==null?1:p.scale} mn={.1} mx={3} st={.01} fmt={function(v){return v.toFixed(2)+"×"}} fn={function(v){up(Object.assign({},p,{scale:v}))}}/>
        <PR l="connected">{["on","off"].map(function(opt){var a=(p.connected===false?"off":"on")===opt;return <button key={opt} className={a?"ac":"ghost"} onClick={function(){up(Object.assign({},p,{connected:opt==="on"}))}} style={{flex:1,fontSize:11,minHeight:32}}>{opt}</button>})}</PR>
      </div>)}
      {s==="scatter"&&(<div>
        <Sl l="points" v={p.pointCount||32} mn={2} mx={512} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{pointCount:v}))}}/>
        <Sl l="seed" v={p.seed||1} mn={0} mx={9999} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{seed:v}))}}/>
        <Sl l="x min" v={p.x0||0} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{x0:v}))}}/>
        <Sl l="x max" v={p.x1||1} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{x1:v}))}}/>
        <Sl l="y min" v={p.y0||0} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{y0:v}))}}/>
        <Sl l="y max" v={p.y1||1} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{y1:v}))}}/>
        <Sl l="scale" v={p.scale==null?1:p.scale} mn={.1} mx={3} st={.01} fmt={function(v){return v.toFixed(2)+"×"}} fn={function(v){up(Object.assign({},p,{scale:v}))}}/>
      </div>)}
      {isPointGeo&&<div>
        <Se l="style" v={p.pointStyle||"dots"} opts={["dots","hidden"]}
          fn={function(v){up(Object.assign({},p,{pointStyle:v}))}}/>
        {(p.pointStyle||"dots")==="dots"&&<div>
          <Sl l="dot size" v={p.dotSize||4} mn={1} mx={20} st={.5}
            fmt={function(v){return v.toFixed(1)+"px"}} fn={function(v){up(Object.assign({},p,{dotSize:v}))}}/>
          <Co l="colour" v={p.color||"#ffffff"} fn={function(v){up(Object.assign({},p,{color:v}))}}/>
          <Sl l="opacity" v={p.opacity==null?1:p.opacity} mn={0} mx={1} st={.01}
            fmt={function(v){return Math.round(v*100)+"%"}} fn={function(v){up(Object.assign({},p,{opacity:v}))}}/>
        </div>}
      </div>}
      {!isPointGeo&&<Co l="fill" v={p.fill} fn={function(v){up(Object.assign({},p,{fill:v}))}}/>}
      {!isPointGeo&&<Sl l="fill op" v={p.fillOpacity==null?1:p.fillOpacity} mn={0} mx={1} st={.01}
        fmt={function(v){return Math.round(v*100)+"%"}}
        fn={function(v){up(Object.assign({},p,{fillOpacity:v}))}}/>}
      {!isPointGeo&&ex("strokeW",<Sl l="stroke w" v={p.strokeW} mn={0} mx={20} st={.5} fmt={function(v){return v.toFixed(1)}} fn={function(v){up(Object.assign({},p,{strokeW:v}))}}/>)}
      {!isPointGeo&&p.strokeW>0 && (
        <div>
          <Co l="stroke" v={p.stroke} fn={function(v){up(Object.assign({},p,{stroke:v}))}}/>
          <Sl l="stroke op" v={p.strokeOpacity==null?1:p.strokeOpacity} mn={0} mx={1} st={.01}
            fmt={function(v){return Math.round(v*100)+"%"}}
            fn={function(v){up(Object.assign({},p,{strokeOpacity:v}))}}/>
        </div>
      )}
      {!isPointGeo&&ex("opacity",<Sl l="opacity" v={p.opacity==null?(p.alpha==null?1:p.alpha):p.opacity} mn={0} mx={1} st={.01}
        fmt={function(v){return Math.round(v*100)+"%"}}
        fn={function(v){up(Object.assign({},p,{opacity:v}))}}/>)}
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
function NoiseP(props) {
  var p=props.p, up=props.up
  var hasOct=["perlin","fbm","turbulence","simplex","value","marble","wood"].includes(p.nType)
  var isRGB=p.colorMode==="rgb"
  return (
    <div>
      <Se l="type" v={p.nType} opts={NTYPES} fn={function(v){up(Object.assign({},p,{nType:v}))}}/>
      <Se l="colour mode" v={p.colorMode||"greyscale"} opts={["greyscale","rgb"]}
        fn={function(v){up(Object.assign({},p,{colorMode:v}))}}/>
      {!isRGB&&<Co l="colour 1" v={p.c1} fn={function(v){up(Object.assign({},p,{c1:v}))}}/>}
      {!isRGB&&<Co l="colour 2" v={p.c2} fn={function(v){up(Object.assign({},p,{c2:v}))}}/>}
      {isRGB&&<div style={{fontSize:9,color:"var(--mu)",padding:"3px 0 5px",fontFamily:"'IBM Plex Mono',monospace"}}>
        R/G/B channels are independent noise fields (seed, seed+1000, seed+2000). Use as UV displacement map.
      </div>}
      <Sl l="scale" v={p.scale} mn={.005} mx={.4} st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up(Object.assign({},p,{scale:v}))}}/>
      {hasOct&&<Sl l="octaves" v={p.oct||4} mn={1} mx={8} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{oct:v}))}}/>}
      {["fbm","perlin","simplex","value"].includes(p.nType)&&(
        <div>
          <Sl l="lacunarity" v={p.lac||2} mn={1} mx={4} st={.1} fmt={function(v){return v.toFixed(1)}} fn={function(v){up(Object.assign({},p,{lac:v}))}}/>
          <Sl l="gain" v={p.gain||.5} mn={.1} mx={.9} st={.05} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{gain:v}))}}/>
        </div>
      )}
      {p.nType==="worley"&&(
        <div>
          <Se l="mode" v={p.wMode||"f1"} opts={["f1","f2","f2f1"]} fn={function(v){up(Object.assign({},p,{wMode:v}))}}/>
          <Sl l="jitter" v={p.wJitter==null?1:p.wJitter} mn={0} mx={1} st={.01} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{wJitter:v}))}}/>
        </div>
      )}
      {p.nType==="white"&&(
        <Sl l="grain size" v={p.grainSize||1} mn={1} mx={32} st={1} fmt={function(v){return Math.round(v)+"px"}} fn={function(v){up(Object.assign({},p,{grainSize:v}))}}/>
      )}
      {p.nType==="crystal"&&(
        <div>
          <Se l="mode" v={p.crystalMode||"f2f1"} opts={["f2f1","f2","f1f2","f2df1"]} fn={function(v){up(Object.assign({},p,{crystalMode:v}))}}/>
          <Sl l="jitter" v={p.wJitter==null?1:p.wJitter} mn={0} mx={1} st={.01} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{wJitter:v}))}}/>
        </div>
      )}
      {p.nType==="phasor"&&(
        <div>
          <Sl l="frequency" v={p.pFreq||8} mn={1} mx={40} st={.5} fmt={function(v){return v.toFixed(1)}} fn={function(v){up(Object.assign({},p,{pFreq:v}))}}/>
          <Sl l="angle" v={p.pAngle||0} mn={0} mx={360} st={1} fmt={function(v){return Math.round(v)+"deg"}} fn={function(v){up(Object.assign({},p,{pAngle:v}))}}/>
          <Sl l="bandwidth" v={p.pBandwidth||1} mn={0} mx={4} st={.05} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{pBandwidth:v}))}}/>
        </div>
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
// UV Create props — minimal: the purpose is to be a clean coordinate canvas
function UVCreateP(props) {
  var p=props.p, up=props.up
  return (
    <div>
      <div style={{fontSize:9,color:"var(--mu)",padding:"4px 0 8px",lineHeight:1.5,fontFamily:"'IBM Plex Mono',monospace"}}>
        Generates a UV coordinate canvas: R=U (x), G=V (y), B=0. Apply Distort/Transform effects to warp the coordinate space, then use uv-texture to sample a texture from it.
      </div>
      <Sl l="scale X" v={p.scaleX==null?1:p.scaleX} mn={.1} mx={4} st={.05}
        fmt={function(v){return v.toFixed(2)+"×"}} fn={function(v){up(Object.assign({},p,{scaleX:v}))}}/>
      <Sl l="scale Y" v={p.scaleY==null?1:p.scaleY} mn={.1} mx={4} st={.05}
        fmt={function(v){return v.toFixed(2)+"×"}} fn={function(v){up(Object.assign({},p,{scaleY:v}))}}/>
      <Sl l="offset X" v={p.offX==null?0:p.offX} mn={-1} mx={1} st={.01}
        fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{offX:v}))}}/>
      <Sl l="offset Y" v={p.offY==null?0:p.offY} mn={-1} mx={1} st={.01}
        fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{offY:v}))}}/>
    </div>
  )
}
function PointCreatorBase(props) {
  var p=props.p,up=props.up
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
  var p=props.p,up=props.up
  return (<PointCreatorBase p={p} up={up}>
    <Sl l="columns" v={p.cols||4} mn={1} mx={64} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{cols:v}))}}/>
    <Sl l="rows" v={p.rows||4} mn={1} mx={64} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{rows:v}))}}/>
    <Sl l="stagger" v={p.stagger||0} mn={0} mx={1} st={.01} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{stagger:v}))}}/>
    {(p.stagger||0)>0&&<Se l="axis" v={p.staggerAxis||"row"} opts={["row","col"]} fn={function(v){up(Object.assign({},p,{staggerAxis:v}))}}/>}
    <Sl l="offset X" v={p.offX||0} mn={-.5} mx={.5} st={.01} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{offX:v}))}}/>
    <Sl l="offset Y" v={p.offY||0} mn={-.5} mx={.5} st={.01} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{offY:v}))}}/>
  </PointCreatorBase>)
}
function SpiralP(props) {
  var p=props.p,up=props.up
  return (<PointCreatorBase p={p} up={up}>
    <Sl l="points" v={p.pointCount||32} mn={4} mx={512} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{pointCount:v}))}}/>
    <Sl l="turns" v={p.turns||3} mn={.25} mx={20} st={.25} fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{turns:v}))}}/>
    <Sl l="start r" v={p.startRadius||0} mn={0} mx={.5} st={.01} fn={function(v){up(Object.assign({},p,{startRadius:v}))}}/>
    <Sl l="end r" v={p.endRadius||.45} mn={.01} mx={.5} st={.01} fn={function(v){up(Object.assign({},p,{endRadius:v}))}}/>
    <Sl l="centre X" v={p.cx==null?.5:p.cx} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cx:v}))}}/>
    <Sl l="centre Y" v={p.cy==null?.5:p.cy} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cy:v}))}}/>
  </PointCreatorBase>)
}
function PolarGridP(props) {
  var p=props.p,up=props.up
  return (<PointCreatorBase p={p} up={up}>
    <Sl l="rings" v={p.rings||4} mn={1} mx={32} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{rings:v}))}}/>
    <Sl l="per ring" v={p.pointsPerRing||8} mn={2} mx={64} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{pointsPerRing:v}))}}/>
    <Sl l="start r" v={p.startRadius||.05} mn={0} mx={.5} st={.01} fn={function(v){up(Object.assign({},p,{startRadius:v}))}}/>
    <Sl l="end r" v={p.endRadius||.45} mn={.01} mx={.5} st={.01} fn={function(v){up(Object.assign({},p,{endRadius:v}))}}/>
    <Sl l="centre X" v={p.cx==null?.5:p.cx} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cx:v}))}}/>
    <Sl l="centre Y" v={p.cy==null?.5:p.cy} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cy:v}))}}/>
  </PointCreatorBase>)
}
function PhyllotaxisP(props) {
  var p=props.p,up=props.up
  return (<PointCreatorBase p={p} up={up}>
    <Sl l="points" v={p.pointCount||64} mn={4} mx={1024} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{pointCount:v}))}}/>
    <Sl l="divergence" v={p.divergenceAngle==null?137.508:p.divergenceAngle} mn={90} mx={180} st={.001}
      fmt={function(v){return v.toFixed(3)+"°"}} fn={function(v){up(Object.assign({},p,{divergenceAngle:v}))}}/>
    <Sl l="scale" v={p.scale||.45} mn={.05} mx={.5} st={.005} fn={function(v){up(Object.assign({},p,{scale:v}))}}/>
    <Sl l="centre X" v={p.cx==null?.5:p.cx} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cx:v}))}}/>
    <Sl l="centre Y" v={p.cy==null?.5:p.cy} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{cy:v}))}}/>
  </PointCreatorBase>)
}
function ScatterP(props) {
  var p=props.p,up=props.up
  return (<PointCreatorBase p={p} up={up}>
    <Sl l="points" v={p.pointCount||32} mn={2} mx={512} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{pointCount:v}))}}/>
    <Sl l="seed" v={p.seed||1} mn={0} mx={9999} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{seed:v}))}}/>
    <Sl l="x min" v={p.x0||0} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{x0:v}))}}/>
    <Sl l="x max" v={p.x1||1} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{x1:v}))}}/>
    <Sl l="y min" v={p.y0||0} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{y0:v}))}}/>
    <Sl l="y max" v={p.y1||1} mn={0} mx={1} st={.01} fn={function(v){up(Object.assign({},p,{y1:v}))}}/>
  </PointCreatorBase>)
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

// ── Tile pattern UI ───────────────────────────────────────────────────────────
function TileP(props) {
  var p=props.p, up=props.up, nodes=props.nodes, selfId=props.selfId, iC=props.iC
  // ExprEditor factory for tile props
  function ex(paramKey, child) {
    return <ExprEditor paramKey={paramKey} tokens={p[paramKey+'_expr']||null}
      nodes={nodes} selfId={selfId}
      onExprChange={function(t){var o={};o[paramKey+'_expr']=t;up(Object.assign({},p,o))}}>
      {child}
    </ExprEditor>
  }
  // RandRow factory for per-tile params
  function tr(enK,baseK,scK,biK,amtK,offK,seedK){
    return {
      enabled:p[enK]||false, onToggle:function(){var o={};o[enK]=!p[enK];up(Object.assign({},p,o))},
      rangeBipolar:p[biK]!==false, onRangeBipolar:function(v){var o={};o[biK]=v;up(Object.assign({},p,o))},
      scale:p[scK], onScale:function(v){var o={};o[scK]=v;up(Object.assign({},p,o))},
      offset:p[offK]||0, onOffset:function(v){var o={};o[offK]=v;up(Object.assign({},p,o))},
      amount:p[amtK]==null?1:p[amtK], onAmount:function(v){var o={};o[amtK]=v;up(Object.assign({},p,o))},
      seed:p[seedK]||0, onSeed:function(v){var o={};o[seedK]=v;up(Object.assign({},p,o))}
    }
  }
  return (
    <div>
      {/* Source */}
      <NRef l="source" v={p.refId} nodes={nodes} selfId={selfId} iC={iC}
        fn={function(v){up(Object.assign({},p,{refId:v}))}}/>
      {/* Grid */}
      {ex("cols",   <Sl l="columns" v={p.cols||4} mn={1} mx={32} st={1}
        fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{cols:v}))}}/>)}
      {ex("rows",   <Sl l="rows" v={p.rows||4} mn={1} mx={32} st={1}
        fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{rows:v}))}}/>)}
      {/* Layout */}
      {ex("stagger",<Sl l="stagger" v={p.stagger||0} mn={0} mx={1} st={.01}
        fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{stagger:v}))}}/>)}
      {(p.stagger||0)>0&&(
        <div>
          <Se l="stagger axis" v={p.staggerAxis||"row"} opts={["row","col"]}
            fn={function(v){up(Object.assign({},p,{staggerAxis:v}))}}/>
          <Se l="apply to" v={p.staggerParity||"odd"} opts={["odd","even"]}
            fn={function(v){up(Object.assign({},p,{staggerParity:v}))}}/>
        </div>
      )}
      {ex("offX",<Sl l="offset X" v={p.offX||0} mn={-1} mx={1} st={.01}
        fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{offX:v}))}}/>)}
      {ex("offY",<Sl l="offset Y" v={p.offY||0} mn={-1} mx={1} st={.01}
        fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{offY:v}))}}/>)}
      <PR l="gap mode">
        {[["spacing","spread"],["inset","shrink"]].map(function(m){
          return <button key={m[0]} className={(p.gapMode||"spacing")===m[0]?"ac":"ghost"}
            onClick={function(){up(Object.assign({},p,{gapMode:m[0]}))}}
            style={{flex:1,fontSize:11,minHeight:32}}>{m[1]}</button>
        })}
      </PR>
      {ex("gapX",<Sl l="gap X" v={p.gapX||0} mn={0} mx={(p.gapMode||"spacing")==="spacing"?4:.98} st={.01}
        fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{gapX:v}))}}/>)}
      {ex("gapY",<Sl l="gap Y" v={p.gapY||0} mn={0} mx={(p.gapMode||"spacing")==="spacing"?4:.98} st={.01}
        fmt={function(v){return v.toFixed(2)}} fn={function(v){up(Object.assign({},p,{gapY:v}))}}/>)}
      {/* Per-tile base + randomise */}
      <RandRow {...tr("rRotEn","rotation","rRotSc","rRotBi","rRotAmt","rRotOff","rRotSeed")}>
        {ex("rotation",<Sl l="rotation" v={p.rotation||0} mn={-180} mx={180} st={1}
          fmt={function(v){return Math.round(v)+"deg"}} fn={function(v){up(Object.assign({},p,{rotation:v}))}}/>)}
      </RandRow>
      <RandRow {...tr("rScaleEn","scale","rScaleSc","rScaleBi","rScaleAmt","rScaleOff","rScaleSeed")}>
        {ex("scale",<Sl l="scale" v={p.scale==null?1:p.scale} mn={.05} mx={3} st={.01}
          fmt={function(v){return v.toFixed(2)+"×"}} fn={function(v){up(Object.assign({},p,{scale:v}))}}/>)}
      </RandRow>
      <RandRow {...tr("rOpEn","opacity","rOpSc","rOpBi","rOpAmt","rOpOff","rOpSeed")}>
        {ex("opacity",<Sl l="opacity" v={p.opacity==null?1:p.opacity} mn={0} mx={1} st={.01}
          fmt={function(v){return Math.round(v*100)+"%"}} fn={function(v){up(Object.assign({},p,{opacity:v}))}}/>)}
      </RandRow>
      {/* Random position nudge per tile — base is always 0 (cell centre) */}
      <RandRow {...tr("rOxEn","rOxBase","rOxSc","rOxBi","rOxAmt","rOxOff","rOxSeed")}>
        <div style={{display:"flex",alignItems:"center",minHeight:36}}>
          <span style={{fontSize:9,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",minWidth:76,textAlign:"right",paddingRight:12}}>nudge X</span>
          <span style={{fontSize:9,color:"var(--di)"}}>per-tile random offset</span>
        </div>
      </RandRow>
      <RandRow {...tr("rOyEn","rOyBase","rOySc","rOyBi","rOyAmt","rOyOff","rOySeed")}>
        <div style={{display:"flex",alignItems:"center",minHeight:36}}>
          <span style={{fontSize:9,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",minWidth:76,textAlign:"right",paddingRight:12}}>nudge Y</span>
          <span style={{fontSize:9,color:"var(--di)"}}>per-tile random offset</span>
        </div>
      </RandRow>
      {/* Flip probabilities */}
      {ex("flipXProb",<Sl l="flip X prob" v={p.flipXProb||0} mn={0} mx={1} st={.01}
        fmt={function(v){return Math.round(v*100)+"%"}} fn={function(v){up(Object.assign({},p,{flipXProb:v}))}}/>)}
      {ex("flipYProb",<Sl l="flip Y prob" v={p.flipYProb||0} mn={0} mx={1} st={.01}
        fmt={function(v){return Math.round(v*100)+"%"}} fn={function(v){up(Object.assign({},p,{flipYProb:v}))}}/>)}
      {/* Wrap + background */}
      <Se l="wrap" v={p.wrap||"clamp"} opts={["clamp","repeat","mirror"]}
        fn={function(v){up(Object.assign({},p,{wrap:v}))}}/>
      <Co l="bg colour" v={p.bgColor||"#000000"} fn={function(v){up(Object.assign({},p,{bgColor:v}))}}/>
      <Sl l="bg opacity" v={p.bgOpacity||0} mn={0} mx={1} st={.01}
        fmt={function(v){return Math.round(v*100)+"%"}} fn={function(v){up(Object.assign({},p,{bgOpacity:v}))}}/>
      {ex("seed",<Sl l="seed" v={p.seed||1} mn={0} mx={9999} st={1}
        fmt={function(v){return Math.round(v)}} fn={function(v){up(Object.assign({},p,{seed:v}))}}/>)}
    </div>
  )
}
function ImgP(props) {
  var p=props.p, up=props.up, onLoad=props.onLoad
  var fileRef=useRef(null)
  function loadBlob(file){
    if(!file)return
    var reader=new FileReader()
    reader.onload=function(ev){
      var dataUrl=ev.target.result
      up(Object.assign({},p,{url:dataUrl}))
      onLoad(dataUrl)
    }
    reader.readAsDataURL(file)
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
  var nodes=props.nodes||[], iC=props.iC
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
      {node.type==="uv-create" && <UVCreateP p={node.props} up={up}/>}
      {node.type==="solid"    && <SolidP p={node.props} up={up}/>}
      {node.type==="shape"    && <ShapeP p={node.props} up={up} nodes={props.nodes} selfId={node.id}/>}
      {node.type==="gradient" && <GradP  p={node.props} up={up}/>}
      {node.type==="noise"    && <NoiseP p={node.props} up={up}/>}
      {node.type==="pattern"  && <PatP   p={node.props} up={up}/>}
      {node.type==="tile"     && <TileP  p={node.props} up={up} nodes={props.nodes} selfId={node.id} iC={props.iC}/>}
      {node.type==="grid"        && <GridP       p={node.props} up={up}/>}
      {node.type==="spiral"      && <SpiralP     p={node.props} up={up}/>}
      {node.type==="polar-grid"  && <PolarGridP  p={node.props} up={up}/>}
      {node.type==="phyllotaxis" && <PhyllotaxisP p={node.props} up={up}/>}
      {node.type==="scatter"     && <ScatterP    p={node.props} up={up}/>}
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
  var stops=(p.stops||[]).slice()  // display in array order — sort only for CSS/engine
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
  var grad=stops.slice().sort(function(a,b){return a.pos-b.pos})
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
                <div style={{display:"flex",flexDirection:"column",gap:1}}>
                  <button onClick={function(){if(i>0){var ns=stops.slice();var t2=ns[i];ns[i]=ns[i-1];ns[i-1]=t2;setStops(ns)}}} disabled={i===0} style={{fontSize:8,padding:"1px 4px",background:"none",border:"1px solid var(--bd)",borderRadius:2,color:"var(--mu)",cursor:"pointer"}}>▲</button>
                  <button onClick={function(){if(i<stops.length-1){var ns=stops.slice();var t2=ns[i];ns[i]=ns[i+1];ns[i+1]=t2;setStops(ns)}}} disabled={i===stops.length-1} style={{fontSize:8,padding:"1px 4px",background:"none",border:"1px solid var(--bd)",borderRadius:2,color:"var(--mu)",cursor:"pointer"}}>▼</button>
                </div>
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
        <button onClick={function(){
            var rev=stops.slice().reverse().map(function(s){return Object.assign({},s,{pos:parseFloat((1-s.pos).toFixed(4))})})
            setStops(rev)
          }}
          className={p.reverse?"ac":"ghost"}
          style={{flex:"1 1 0",minWidth:90}}>
          reverse
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

// ── BezierCurveEditor ─────────────────────────────────────────────────────────
// Reusable cubic bezier curve editor: (0,0)→P1→P2→(1,1)
// Props: curve={p1x,p1y,p2x,p2y}, onChange(curve), label (optional)
// Shared by: point-map curve remap, curves effect, gradient map (future)
function BezierCurveEditor(props) {
  var cv=props.curve||{p1x:.33,p1y:.33,p2x:.67,p2y:.67}
  var viewSt=useState("curve"); var view=viewSt[0],setView=viewSt[1]
  var containerRef=useRef(null)
  var szSt=useState(0); var sz=szSt[0],setSz=szSt[1]
  // Always observe container width regardless of view mode
  useEffect(function(){
    var el=containerRef.current; if(!el) return
    var ro=new ResizeObserver(function(entries){
      var w=Math.floor(entries[0].contentRect.width)
      if(w>0) setSz(w)
    })
    ro.observe(el)
    // Initial measure
    var iw=Math.floor(el.getBoundingClientRect().width)
    if(iw>0) setSz(iw)
    return function(){ro.disconnect()}
  },[])
  var pad=10
  var inner=Math.max(80,(sz||200)-pad*2)
  var toS=function(v){return pad+v*inner}
  var fromS=function(px){return Math.max(0,Math.min(1,(px-pad)/inner))}
  var tsz=pad*2+inner
  var slFmt=function(v){return v.toFixed(2)}
  function reset(){props.onChange({p1x:.33,p1y:.33,p2x:.67,p2y:.67})}
  function startDrag(e){
    var rect=e.currentTarget.getBoundingClientRect()
    var ex=e.clientX-rect.left,ey=e.clientY-rect.top
    var d1=Math.hypot(ex-toS(cv.p1x),ey-toS(1-cv.p1y))
    var d2=Math.hypot(ex-toS(cv.p2x),ey-toS(1-cv.p2y))
    var drag=d1<d2?"p1":"p2"
    e.currentTarget.setPointerCapture(e.pointerId)
    function onMove(ev){
      var nx=fromS(ev.clientX-rect.left),ny=1-fromS(ev.clientY-rect.top)
      props.onChange(drag==="p1"?Object.assign({},cv,{p1x:nx,p1y:ny}):Object.assign({},cv,{p2x:nx,p2y:ny}))
    }
    e.currentTarget.addEventListener("pointermove",onMove)
    e.currentTarget.addEventListener("pointerup",function(){e.currentTarget.removeEventListener("pointermove",onMove)},{once:true})
  }
  // Toolbar shared by both modes
  var toolbar=(
    <div style={{display:"flex",gap:6,marginBottom:4,alignItems:"center"}}>
      <span style={{flex:1,fontSize:9,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace"}}>{props.label||"curve"}</span>
      <button className="ghost" style={{fontSize:9,padding:"2px 6px",minHeight:24}} onClick={reset}>reset</button>
      <button className={view==="curve"?"ac":"ghost"} style={{fontSize:9,padding:"2px 6px",minHeight:24}} onClick={function(){setView("curve")}}>curve</button>
      <button className={view==="sliders"?"ac":"ghost"} style={{fontSize:9,padding:"2px 6px",minHeight:24}} onClick={function(){setView("sliders")}}>sliders</button>
    </div>
  )
  return (
    <div ref={containerRef} style={{width:"100%"}}>
      {toolbar}
      {view==="curve"&&sz>0&&(
        <div>
          <div style={{width:tsz,height:tsz,background:"var(--el)",borderRadius:6,
              border:"1px solid var(--bd)",touchAction:"none",userSelect:"none"}}
            onPointerDown={startDrag}>
            <svg width={tsz} height={tsz} style={{display:"block"}}>
              {[.25,.5,.75].map(function(v,vi){return <g key={vi}>
                <line x1={toS(v)} y1={pad} x2={toS(v)} y2={pad+inner} stroke="var(--bd)" strokeWidth={.5}/>
                <line x1={pad} y1={toS(v)} x2={pad+inner} y2={toS(v)} stroke="var(--bd)" strokeWidth={.5}/>
              </g>})}
              <line x1={pad} y1={pad+inner} x2={pad+inner} y2={pad} stroke="var(--bd)" strokeWidth={1} strokeDasharray="3,3"/>
              <path d={"M "+pad+" "+(pad+inner)+" C "+toS(cv.p1x)+" "+toS(1-cv.p1y)+" "+toS(cv.p2x)+" "+toS(1-cv.p2y)+" "+(pad+inner)+" "+pad}
                fill="none" stroke="var(--ac)" strokeWidth={2}/>
              <line x1={pad} y1={pad+inner} x2={toS(cv.p1x)} y2={toS(1-cv.p1y)} stroke="var(--mu)" strokeWidth={1}/>
              <line x1={pad+inner} y1={pad} x2={toS(cv.p2x)} y2={toS(1-cv.p2y)} stroke="var(--mu)" strokeWidth={1}/>
              <circle cx={toS(cv.p1x)} cy={toS(1-cv.p1y)} r={8} fill="var(--ac)" style={{cursor:"grab"}}/>
              <circle cx={toS(cv.p2x)} cy={toS(1-cv.p2y)} r={8} fill="var(--lv)" style={{cursor:"grab"}}/>
            </svg>
          </div>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"var(--mu)",
              fontFamily:"'IBM Plex Mono',monospace",padding:"2px 0 4px"}}>
            <span style={{color:"var(--ac)"}}>● P1 ({cv.p1x.toFixed(2)},{cv.p1y.toFixed(2)})</span>
            <span style={{color:"var(--lv)"}}>● P2 ({cv.p2x.toFixed(2)},{cv.p2y.toFixed(2)})</span>
          </div>
        </div>
      )}
      {view==="sliders"&&(
        <div>
          <Sl l="P1 x" v={cv.p1x} mn={0} mx={1} st={.01} fmt={slFmt} fn={function(v){props.onChange(Object.assign({},cv,{p1x:v}))}}/>
          <Sl l="P1 y" v={cv.p1y} mn={0} mx={1} st={.01} fmt={slFmt} fn={function(v){props.onChange(Object.assign({},cv,{p1y:v}))}}/>
          <Sl l="P2 x" v={cv.p2x} mn={0} mx={1} st={.01} fmt={slFmt} fn={function(v){props.onChange(Object.assign({},cv,{p2x:v}))}}/>
          <Sl l="P2 y" v={cv.p2y} mn={0} mx={1} st={.01} fmt={slFmt} fn={function(v){props.onChange(Object.assign({},cv,{p2y:v}))}}/>
        </div>
      )}
    </div>
  )
}
function EfxPrimary(props) {
  var efx=props.efx, p=efx.params
  var allAttrs=computeAllAttrs(props.nodes,props.selfId,props.sourceId)
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
  if(efx.type==="curves") {
    // Convert bezier curve params to/from legacy in/out black/white if needed
    var curveParms=p.curve||{p1x:.33,p1y:.33,p2x:.67,p2y:.67}
    return (
    <div>
      <BezierCurveEditor curve={curveParms} label="tone curve"
        onChange={function(c){up({curve:c})}}/>
      <div style={{borderTop:"1px solid var(--bd)",marginTop:6,paddingTop:6}}>
        <Sl l="in black"  v={p.inBlack||0}                    mn={0}   mx={254} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up({inBlack:v})}}/>
        <Sl l="in white"  v={p.inWhite==null?255:p.inWhite}   mn={1}   mx={255} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up({inWhite:v})}}/>
        <Sl l="out black" v={p.outBlack||0}                   mn={0}   mx={254} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up({outBlack:v})}}/>
        <Sl l="out white" v={p.outWhite==null?255:p.outWhite} mn={1}   mx={255} st={1} fmt={function(v){return Math.round(v)}} fn={function(v){up({outWhite:v})}}/>
      </div>
    </div>
  )}
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
  if(efx.type==="attributes") {
    var ops=p.ops||[]
    function updOp(i,patch){up({ops:ops.map(function(o,j){return j===i?Object.assign({},o,patch):o})})}
    function addOp(){up({ops:ops.concat([{action:"add",name:"",value:0}])})}
    function delOp(i){up({ops:ops.filter(function(_,j){return j!==i})})}
    var IMMUTABLE=["pointIndex"]
    return (
      <div>
        {ops.length===0&&<div style={{fontSize:10,color:"var(--mu)",padding:"6px 0"}}>no operations — tap + to add</div>}
        {ops.map(function(op,oi){return (
          <div key={oi} style={{borderBottom:"1px solid var(--bd)",paddingBottom:8,marginBottom:8}}>
            <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:4}}>
              <span style={{fontSize:9,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",flex:1}}>op {oi+1}</span>
              <button onClick={function(){delOp(oi)}} className="ghost" style={{fontSize:11,padding:"2px 6px"}}>×</button>
            </div>
            <Se l="action" v={op.action||"add"} opts={["add","set","remove","rename"]} fn={function(v){updOp(oi,{action:v})}}/>
            {op.action==="rename"
              ? <div>
                  <div style={{display:"flex",gap:6,alignItems:"center",margin:"4px 0"}}>
                    <span style={{fontSize:9,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",width:80,flexShrink:0}}>from</span>
                    <input value={op.from||""} onChange={function(e){updOp(oi,{from:e.target.value})}}
                      style={{flex:1,background:"var(--el)",border:"1px solid var(--bd)",borderRadius:4,color:"var(--tx)",padding:"4px 8px",fontSize:11,fontFamily:"'IBM Plex Mono',monospace"}}/>
                  </div>
                  <div style={{display:"flex",gap:6,alignItems:"center",margin:"4px 0"}}>
                    <span style={{fontSize:9,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",width:80,flexShrink:0}}>to</span>
                    <input value={op.name||""} onChange={function(e){updOp(oi,{name:e.target.value})}}
                      style={{flex:1,background:"var(--el)",border:"1px solid var(--bd)",borderRadius:4,color:"var(--tx)",padding:"4px 8px",fontSize:11,fontFamily:"'IBM Plex Mono',monospace"}}/>
                  </div>
                </div>
              : <div>
                  <div style={{display:"flex",gap:6,alignItems:"center",margin:"4px 0"}}> 
                    <span style={{fontSize:9,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",width:80,flexShrink:0}}>
                      {op.action==="remove"?"attr":"name"}
                    </span>
                    <input value={op.name||""} onChange={function(e){updOp(oi,{name:e.target.value})}}
                      placeholder={op.action==="add"?"e.g. myAttr":op.action==="remove"?"attr to remove":"attr name"}
                      style={{flex:1,background:"var(--el)",border:"1px solid "+(IMMUTABLE.includes(op.name)?"var(--dng)":"var(--bd)"),
                        borderRadius:4,color:IMMUTABLE.includes(op.name)?"var(--dng)":"var(--tx)",
                        padding:"4px 8px",fontSize:11,fontFamily:"'IBM Plex Mono',monospace"}}/>
                    {IMMUTABLE.includes(op.name)&&<span style={{fontSize:8,color:"var(--dng)",flexShrink:0}}>read-only</span>}
                  </div>
                  {(op.action==="add"||op.action==="set")&&(
                    <Sl l="value" v={op.value||0} mn={-1000} mx={1000} st={.01}
                      fmt={function(v){return typeof v==="number"?v.toFixed(3):String(v)}}
                      fn={function(v){updOp(oi,{value:v})}}/>
                  )}
                </div>
            }
          </div>
        )})}
        <button onClick={addOp} className="ac" style={{width:"100%",minHeight:36,fontSize:10,
          letterSpacing:".05em",fontFamily:"'IBM Plex Mono',monospace"}}>+ add operation</button>
      </div>
    )
  }
  if(efx.type==="match") {
    // Build flat list of all transform effects across all nodes and their stacks
    var allTfx=[]
    function scanEfxForTfx(stack,nodeLabel,nodeId,stackKey) {
      var tfxInStack=(stack||[]).filter(function(e){return e.type==="transform"&&e.enabled})
      var tfxCount=tfxInStack.length
      tfxInStack.forEach(function(e,ti){
        // Index disambiguates unnamed transforms in the same stack
        var suffix=e.name?(" · "+e.name):(tfxCount>1?" · transform "+(ti+1):" · transform")
        allTfx.push({nodeId:nodeId,efxId:e.id,isStack:false,
          label:nodeLabel+suffix,params:e.params})
      })
      if(tfxCount>1){
        allTfx.push({nodeId:nodeId,efxId:"stack::"+stackKey,isStack:true,stackRef:stack,
          label:nodeLabel+" · all transforms ("+tfxCount+")"})
      }
    }
    ;(props.nodes||[]).forEach(function(n){
      var nl=n.name||n.id
      // Output stack labelled explicitly
      scanEfxForTfx(n.outEfx,nl+" · output",n.id,"out::"+n.id)
      scanEfxForTfx(n.effectStack,nl,n.id,"efx::"+n.id)
      if(n.inputA) scanEfxForTfx(n.inputA.effectStack,nl+" · input A",n.id,"inputA::"+n.id)
      if(n.inputB) scanEfxForTfx(n.inputB.effectStack,nl+" · input B",n.id,"inputB::"+n.id)
      ;(n.layers||[]).forEach(function(l,li){scanEfxForTfx(l.effectStack,nl+" · layer "+(li+1),n.id,"layer"+li+"::"+n.id)})
    })
    // Build filter options from collected transforms
    var nodeIds=[]; var nodeNames={}
    allTfx.forEach(function(t){
      if(!nodeIds.includes(t.nodeId)){nodeIds.push(t.nodeId);nodeNames[t.nodeId]=t.label.split(" · ")[0]}
    })
    var filterNode=p._filterNode||"all"
    var filterCtx=p._filterCtx||"all"
    // Contexts available for selected node
    var ctxSet=[]
    allTfx.filter(function(t){return filterNode==="all"||t.nodeId===filterNode}).forEach(function(t){
      var parts=t.label.split(" · "); var ctx2=parts.length>2?parts.slice(1,-1).join(" · "):parts.length===2?"output":"output"
      if(!ctxSet.includes(ctx2)) ctxSet.push(ctx2)
    })
    // Filtered list
    var filtered=allTfx.filter(function(t){
      if(filterNode!=="all"&&t.nodeId!==filterNode) return false
      if(filterCtx!=="all"){
        var parts=t.label.split(" · "); var ctx2=parts.length>2?parts.slice(1,-1).join(" · "):"output"
        if(ctx2!==filterCtx) return false
      }
      return true
    })
    var selTfx=allTfx.find(function(t){return t.efxId===p.efxId})
    var sp2=selTfx&&!selTfx.isStack&&selTfx.params
    var stackTfxs=selTfx&&selTfx.isStack?(selTfx.stackRef||[]).filter(function(e){return e.type==="transform"&&e.enabled}):null
    return (
    <div>
      {allTfx.length===0
        ? <div style={{fontSize:10,color:"var(--mu)",padding:"6px 0"}}>No transform effects found in project</div>
        : <div style={{display:"flex",gap:6,marginBottom:8}}>
            <div style={{flex:1,minWidth:0}}>
              <select value={filterNode} onChange={function(e){up({_filterNode:e.target.value,_filterCtx:"all"})}}
                style={{width:"100%",background:"var(--el)",color:"var(--tx)",border:"1px solid var(--bd)",
                  borderRadius:4,padding:"5px 6px",fontSize:10,fontFamily:"'IBM Plex Mono',monospace",
                  overflow:"hidden",textOverflow:"ellipsis"}}>
                <option value="all">All compositors</option>
                {nodeIds.map(function(nid){return <option key={nid} value={nid}>{nodeNames[nid]}</option>})}
              </select>
            </div>
            {filterNode!=="all"&&<div style={{flex:1,minWidth:0}}>
              <select value={filterCtx} onChange={function(e){up({_filterCtx:e.target.value})}}
                style={{width:"100%",background:"var(--el)",color:"var(--tx)",border:"1px solid var(--bd)",
                  borderRadius:4,padding:"5px 6px",fontSize:10,fontFamily:"'IBM Plex Mono',monospace",
                  overflow:"hidden",textOverflow:"ellipsis"}}>
                <option value="all">All contexts</option>
                {ctxSet.map(function(c){return <option key={c} value={c}>{c}</option>})}
              </select>
            </div>}
          </div>
      }
      {filtered.map(function(t){
        var sel=t.efxId===p.efxId
        // Strip prefix already shown by filters — show only leaf label
        var parts=t.label.split(" · ")
        var shortLabel=filterNode!=="all"&&filterCtx!=="all"?parts[parts.length-1]:
                       filterNode!=="all"?parts.slice(1).join(" · "):t.label
        return <div key={t.efxId} onClick={function(){up({sourceId:t.nodeId,efxId:t.efxId})}}
          style={{padding:"7px 10px",marginBottom:3,borderRadius:5,cursor:"pointer",fontSize:11,
            background:sel?"rgba(36,204,168,.12)":"var(--el)",
            border:"1px solid "+(sel?"var(--ac)":"var(--bd)"),
            color:sel?"var(--ac)":"var(--tx)",
            overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
          {shortLabel}
        </div>
      })}
      {sp2&&<div style={{padding:"6px 8px",marginTop:4,marginBottom:4,background:"var(--el)",borderRadius:4,
          fontSize:9,fontFamily:"'IBM Plex Mono',monospace",color:"var(--mu)",lineHeight:1.6}}>
        <span style={{color:"var(--ac)"}}>source values →</span>{" "}
        tx:{((sp2.tx||0)*100).toFixed(1)}%{" "}
        ty:{((sp2.ty||0)*100).toFixed(1)}%{" "}
        rot:{(sp2.rot||0).toFixed(1)}°{" "}
        su:{(sp2.su!=null?sp2.su:1).toFixed(2)}{" "}
        sx:{(sp2.sx!=null?sp2.sx:1).toFixed(2)}{" "}
        sy:{(sp2.sy!=null?sp2.sy:1).toFixed(2)}
      </div>}
      {stackTfxs&&<div style={{padding:"6px 8px",marginTop:4,marginBottom:4,background:"var(--el)",borderRadius:4,
          fontSize:9,fontFamily:"'IBM Plex Mono',monospace",color:"var(--mu)",lineHeight:1.5}}>
        <span style={{color:"var(--ac)"}}>combined stack ({stackTfxs.length} transforms)</span>
        {stackTfxs.map(function(e,i){var pp=e.params||{};return <div key={i}>
          {e.name||"transform "+(i+1)}: tx:{((pp.tx||0)*100).toFixed(1)}% ty:{((pp.ty||0)*100).toFixed(1)}% rot:{(pp.rot||0).toFixed(1)}° [{pp.space||"local"}]
        </div>})}
      </div>}
      {selTfx&&<div style={{marginTop:8}}>
        <div style={{opacity:selTfx?1:.35,pointerEvents:selTfx?"auto":"none"}}>
        <PR l="position">
          {["off","x","y","xy"].map(function(opt){return <button key={opt}
            className={(p.matchPos===false?"off":p.matchPos||"xy")===opt?"ac":"ghost"}
            onClick={function(){up({matchPos:opt==="off"?false:opt})}}
            style={{flex:1,fontSize:10,minHeight:32}}>{opt}</button>})}
        </PR>
        <PR l="scale">
          {["off","x","y","xy"].map(function(opt){return <button key={opt}
            className={(p.matchScale===false?"off":p.matchScale||"xy")===opt?"ac":"ghost"}
            onClick={function(){up({matchScale:opt==="off"?false:opt})}}
            style={{flex:1,fontSize:10,minHeight:32}}>{opt}</button>})}
        </PR>
        <PR l="rotation">
          <button className={p.matchRot?"ac":"ghost"} style={{flex:1,fontSize:11,minHeight:32}}
            onClick={function(){up({matchRot:!p.matchRot})}}>
            {p.matchRot?"on":"off"}
          </button>
        </PR>
        {(p.matchPos&&p.matchPos!==false)&&<Sl l="offset x" v={p.offsetX||0} mn={-1} mx={1} st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up({offsetX:v})}}/>}
        {(p.matchPos&&p.matchPos!==false)&&<Sl l="offset y" v={p.offsetY||0} mn={-1} mx={1} st={.005} fmt={function(v){return v.toFixed(3)}} fn={function(v){up({offsetY:v})}}/>}
        {(p.matchScale&&p.matchScale!==false)&&<Sl l="offset scale" v={p.offsetScale==null?1:p.offsetScale} mn={.1} mx={4} st={.01} fmt={function(v){return v.toFixed(2)+"×"}} fn={function(v){up({offsetScale:v})}}/>}
        {p.matchRot&&<Sl l="offset rot" v={p.offsetRot||0} mn={-180} mx={180} st={1} fmt={function(v){return Math.round(v)+"°"}} fn={function(v){up({offsetRot:v})}}/>}
        </div>
      </div>}
    </div>
  )}
  if(efx.type==="transform") return (
    <div>
      <PR l="space">
        {["local","global"].map(function(sp){return <button key={sp}
          className={(p.space||"local")===sp?"ac":"ghost"}
          onClick={function(){up(Object.assign({},p,{space:sp}))}}
          style={{flex:1,fontSize:11,minHeight:32}}>{sp}</button>})}
      </PR>
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
  if(efx.type==="solarise") return (
    <Sl l="threshold" v={p.threshold==null?.5:p.threshold} mn={0} mx={1} st={.01}
      fmt={function(v){return Math.round(v*100)+"%"}} fn={function(v){up({threshold:v})}}/>)
  if(efx.type==="colour") return (
    <div>
      <Co l="colour" v={p.color||"#ff0000"} fn={function(v){up({color:v})}}/>
      <Sl l="opacity" v={p.opacity==null?1:p.opacity} mn={0} mx={1} st={.01}
        fmt={function(v){return Math.round(v*100)+"%"}} fn={function(v){up({opacity:v})}}/>
    </div>
  )
  if(efx.type==="wave") return (
    <div>
      <RandRow enabled={p.rAmpEn} onToggle={function(){up({rAmpEn:!p.rAmpEn})}}
        rangeBipolar={p.rAmpBi!==false} onRangeBipolar={function(v){up({rAmpBi:v})}}
        scale={p.rAmpSc} onScale={function(v){up({rAmpSc:v})}}
        offset={p.rAmpOff||0} onOffset={function(v){up({rAmpOff:v})}}
        amount={p.rAmpAmt} onAmount={function(v){up({rAmpAmt:v})}}
        seed={p.rSeed||1} onSeed={function(v){up({rSeed:v})}}>
        <Sl l="amplitude" v={p.amplitude==null?.05:p.amplitude} mn={0} mx={.5} st={.005}
          fmt={function(v){return (v*100).toFixed(1)+"%"}} fn={function(v){up({amplitude:v})}}/>
      </RandRow>
      <RandRow enabled={p.rFxEn} onToggle={function(){up({rFxEn:!p.rFxEn})}}
        rangeBipolar={p.rFxBi!==false} onRangeBipolar={function(v){up({rFxBi:v})}}
        scale={p.rFxSc} onScale={function(v){up({rFxSc:v})}}
        offset={p.rFxOff||0} onOffset={function(v){up({rFxOff:v})}}
        amount={p.rFxAmt} onAmount={function(v){up({rFxAmt:v})}}
        seed={p.rSeed||1} onSeed={function(v){up({rSeed:v})}}>
        <Sl l="freq x" v={p.freqX==null?3:p.freqX} mn={0} mx={20} st={.5}
          fmt={function(v){return v.toFixed(1)}} fn={function(v){up({freqX:v})}}/>
      </RandRow>
      <RandRow enabled={p.rFyEn} onToggle={function(){up({rFyEn:!p.rFyEn})}}
        rangeBipolar={p.rFyBi!==false} onRangeBipolar={function(v){up({rFyBi:v})}}
        scale={p.rFySc} onScale={function(v){up({rFySc:v})}}
        offset={p.rFyOff||0} onOffset={function(v){up({rFyOff:v})}}
        amount={p.rFyAmt} onAmount={function(v){up({rFyAmt:v})}}
        seed={p.rSeed||1} onSeed={function(v){up({rSeed:v})}}>
        <Sl l="freq y" v={p.freqY==null?3:p.freqY} mn={0} mx={20} st={.5}
          fmt={function(v){return v.toFixed(1)}} fn={function(v){up({freqY:v})}}/>
      </RandRow>
      <Sl l="phase x" v={p.phaseX||0} mn={0} mx={6.28} st={.05}
        fmt={function(v){return v.toFixed(2)}} fn={function(v){up({phaseX:v})}}/>
      <Sl l="phase y" v={p.phaseY||0} mn={0} mx={6.28} st={.05}
        fmt={function(v){return v.toFixed(2)}} fn={function(v){up({phaseY:v})}}/>
      <div style={{fontSize:8,color:"var(--mu)",padding:"2px 84px",fontFamily:"'IBM Plex Mono',monospace",lineHeight:1.4}}>
        All rand params share one seed
      </div>
    </div>)
  if(efx.type==="twirl") return (
    <div>
      <Sl l="angle" v={p.angle==null?180:p.angle} mn={-720} mx={720} st={5}
        fmt={function(v){return Math.round(v)+"deg"}} fn={function(v){up({angle:v})}}/>
      <Sl l="radius" v={p.radius==null?.5:p.radius} mn={.05} mx={1.5} st={.01}
        fn={function(v){up({radius:v})}}/>
      <Sl l="softness" v={p.softness==null?.3:p.softness} mn={0} mx={1} st={.01}
        fmt={function(v){return Math.round(v*100)+"%"}} fn={function(v){up({softness:v})}}/>
      <Sl l="centre x" v={p.cx==null?.5:p.cx} mn={0} mx={1} st={.01} fn={function(v){up({cx:v})}}/>
      <Sl l="centre y" v={p.cy==null?.5:p.cy} mn={0} mx={1} st={.01} fn={function(v){up({cy:v})}}/>
    </div>)
  if(efx.type==="bulge") return (
    <div>
      <Sl l="strength" v={p.strength==null?.5:p.strength} mn={-2} mx={2} st={.05}
        fmt={function(v){return v.toFixed(2)}} fn={function(v){up({strength:v})}}/>
      <Sl l="radius" v={p.radius==null?.7:p.radius} mn={.05} mx={1.5} st={.01}
        fn={function(v){up({radius:v})}}/>
      <Sl l="softness" v={p.softness==null?.3:p.softness} mn={0} mx={1} st={.01}
        fmt={function(v){return Math.round(v*100)+"%"}} fn={function(v){up({softness:v})}}/>
      <Sl l="centre x" v={p.cx==null?.5:p.cx} mn={0} mx={1} st={.01} fn={function(v){up({cx:v})}}/>
      <Sl l="centre y" v={p.cy==null?.5:p.cy} mn={0} mx={1} st={.01} fn={function(v){up({cy:v})}}/>
    </div>)
  if(efx.type==="uv-texture") return (
    <div>
      <div style={{fontSize:9,color:"var(--mu)",padding:"3px 0 6px",lineHeight:1.5,fontFamily:"'IBM Plex Mono',monospace"}}>
        Reads the current canvas as UV coordinates and samples the texture at those positions. Put a UV Create node upstream, distort it, then use this to remap the texture.
      </div>
      <NRef l="texture" v={p.texRefId} nodes={props.nodes} selfId={props.selfId}
        iC={props.iC} mode="source" fn={function(v){up({texRefId:v})}}/>
      <Se l="U channel" v={p.chU||"R"} opts={["R","G","B","luminosity"]}
        fn={function(v){up({chU:v})}}/>
      <Se l="V channel" v={p.chV||"G"} opts={["R","G","B","luminosity"]}
        fn={function(v){up({chV:v})}}/>
      <Se l="wrap X" v={p.wrapX||"clamp"} opts={["clamp","repeat","mirror"]}
        fn={function(v){up({wrapX:v})}}/>
      <Se l="wrap Y" v={p.wrapY||"clamp"} opts={["clamp","repeat","mirror"]}
        fn={function(v){up({wrapY:v})}}/>
    </div>)
  if(efx.type==="uv-distort") return (
    <div>
      <NRef l="UV source" v={p.uvRefId} nodes={props.nodes} selfId={props.selfId}
        iC={props.iC} mode="source" fn={function(v){up({uvRefId:v})}}/>
      <Se l="mode" v={p.mode||"displacement"}
        opts={["displacement","radial","absolute"]}
        fn={function(v){up({mode:v})}}/>
      {(p.mode==="radial")?(
        <div>
          <div style={{fontSize:9,color:"var(--mu)",padding:"3px 0 5px",lineHeight:1.5,fontFamily:"'IBM Plex Mono',monospace"}}>
            UV source = magnitude (B&W works). Direction = radially outward from centre.
            Positive amount = barrel, negative = pinch.
          </div>
          <Se l="channel" v={p.chX||"R"} opts={["R","G","B","luminosity"]}
            fn={function(v){up({chX:v})}}/>
          <Sl l="amount" v={p.radAmt==null?.5:p.radAmt} mn={-2} mx={2} st={.001}
            fmt={function(v){return (v*100).toFixed(2)+"%"}} fn={function(v){up({radAmt:v})}}/>
          <Sl l="centre X" v={p.cx==null?.5:p.cx} mn={0} mx={1} st={.01}
            fmt={function(v){return v.toFixed(2)}} fn={function(v){up({cx:v})}}/>
          <Sl l="centre Y" v={p.cy==null?.5:p.cy} mn={0} mx={1} st={.01}
            fmt={function(v){return v.toFixed(2)}} fn={function(v){up({cy:v})}}/>
        </div>
      ):(p.mode==="absolute")?(
        <div>
          <div style={{fontSize:9,color:"var(--mu)",padding:"3px 0 5px",lineHeight:1.5,fontFamily:"'IBM Plex Mono',monospace"}}>
            UV source values used as direct coordinates (R→X, G→Y). 0=start, 1=end of canvas.
          </div>
          <Se l="X channel" v={p.chX||"R"} opts={["R","G","B","luminosity"]}
            fn={function(v){up({chX:v})}}/>
          <Se l="Y channel" v={p.chY||"G"} opts={["R","G","B","luminosity"]}
            fn={function(v){up({chY:v})}}/>
        </div>
      ):(
        <div>
          <div style={{fontSize:9,color:"var(--mu)",padding:"3px 0 5px",lineHeight:1.5,fontFamily:"'IBM Plex Mono',monospace"}}>
            R/G channels drive X/Y displacement independently. With greyscale source R=G. With RGB noise R≠G giving true multi-axis warp.
          </div>
          <Sl l="X amount" v={p.amtX==null?.1:p.amtX} mn={-2} mx={2} st={.001}
            fmt={function(v){return (v*100).toFixed(2)+"%"}} fn={function(v){up({amtX:v})}}/>
          <Sl l="Y amount" v={p.amtY==null?.1:p.amtY} mn={-2} mx={2} st={.001}
            fmt={function(v){return (v*100).toFixed(2)+"%"}} fn={function(v){up({amtY:v})}}/>
          <Se l="X channel" v={p.chX||"R"} opts={["R","G","B","luminosity"]}
            fn={function(v){up({chX:v})}}/>
          <Se l="Y channel" v={p.chY||"G"} opts={["R","G","B","luminosity"]}
            fn={function(v){up({chY:v})}}/>
        </div>
      )}
    </div>)
  if(efx.type==="polar-to-cart"||efx.type==="cart-to-polar") return (
    <div style={{padding:"8px 0",fontSize:10,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",lineHeight:1.5}}>
      {efx.type==="cart-to-polar"
        ?"Wraps image into a circle (Cartesian → Polar)"
        :"Unrolls circle into a strip (Polar → Cartesian)"}
    </div>)
  if(efx.type==="show-points") return (
    <div>
      <Se l="style" v={p.style||"circle"} opts={["circle","dot","square","crosshair"]}
        fn={function(v){up({style:v})}}/>
      <Co l="colour" v={p.color||"#00ccff"} fn={function(v){up({color:v})}}/>
      <Sl l="size" v={p.size||6} mn={1} mx={40} st={.5}
        fmt={function(v){return v.toFixed(1)+"px"}} fn={function(v){up({size:v})}}/>
      <Sl l="opacity" v={p.opacity==null?.8:p.opacity} mn={0} mx={1} st={.01}
        fmt={function(v){return Math.round(v*100)+"%"}} fn={function(v){up({opacity:v})}}/>
    </div>)
  if(efx.type==="point-map") {
    var mappings=p.mappings||[]
    function updMapping(i,patch){
      var nm=mappings.map(function(m,j){return j===i?Object.assign({},m,patch):m})
      up({mappings:nm})
    }
    function addMapping(){up({mappings:mappings.concat([{inputAttr:"pointIndex",outputAttr:"scale",mode:"linear",min:0,max:1,multiply:false}])})}
    function delMapping(i){up({mappings:mappings.filter(function(_,j){return j!==i})})}
    return (
      <div>
        {mappings.length===0&&<div className="empty" style={{padding:"8px 0"}}>no mappings — tap + to add</div>}
        {mappings.map(function(m,mi){
          return (
            <div key={mi} style={{borderBottom:"1px solid var(--bd)",paddingBottom:8,marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                <button onClick={function(){updMapping(mi,{enabled:m.enabled===false?true:false})}}
                  style={{width:18,height:18,minWidth:18,minHeight:18,borderRadius:"50%",
                    border:"2px solid "+(m.enabled===false?"var(--bd)":"var(--ac)"),
                    background:m.enabled===false?"none":"var(--ac)",
                    flexShrink:0,flexGrow:0,alignSelf:"center",cursor:"pointer",
                    padding:0,boxSizing:"content-box"}}/>
                <span style={{flex:1,fontSize:9,color:m.enabled===false?"var(--mu)":"var(--tx)",
                  fontFamily:"'IBM Plex Mono',monospace",textDecoration:m.enabled===false?"line-through":"none"}}>mapping {mi+1}</span>
                <button onClick={function(){delMapping(mi)}} className="ghost" style={{fontSize:11,padding:"2px 8px"}}>×</button>
              </div>
              <Se l="input" v={m.inputAttr||"pointIndex"} opts={allAttrs.filter(function(a){return ["scale","rotation","opacity","sourceIndex"].indexOf(a)<0})} fn={function(v){updMapping(mi,{inputAttr:v})}}/>
              <Se l="output" v={m.outputAttr||"scale"} opts={["scale","rotation","opacity","x","y","sourceIndex","color"]} fn={function(v){updMapping(mi,{outputAttr:v,min:null,max:null})}}/>
              <Se l="mode" v={m.mode||"linear"} opts={["linear","normalise","invert","log","exp","random"]} fn={function(v){updMapping(mi,{mode:v})}}/>
              <div style={{display:"flex",alignItems:"center",gap:8,margin:"4px 0 2px"}}>
                <span style={{fontSize:9,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",flex:1}}>curve remap</span>
                <button className={m.curveEnabled?"ac":"ghost"} style={{fontSize:10,padding:"2px 8px",minHeight:26}}
                  onClick={function(){updMapping(mi,{curveEnabled:!m.curveEnabled,curve:m.curve||{p1x:.33,p1y:.33,p2x:.67,p2y:.67}})}}>
                  {m.curveEnabled?"on":"off"}
                </button>
              </div>
              {m.curveEnabled&&<BezierCurveEditor
                curve={m.curve||{p1x:.33,p1y:.33,p2x:.67,p2y:.67}}
                label="curve remap"
                onChange={function(c){updMapping(mi,{curve:c})}}/>}
              {(function(){
                var oa=m.outputAttr||"scale"
                var defMin=oa==="opacity"?0:oa==="rotation"?-180:oa==="scale"?0:oa==="sourceIndex"?0:-1
                var defMax=oa==="opacity"?1:oa==="rotation"?180:oa==="scale"?3:oa==="sourceIndex"?10:1
                var mn=oa==="rotation"?-360:oa==="scale"||oa==="opacity"?0:oa==="sourceIndex"?0:-4
                var mx=oa==="rotation"?360:oa==="scale"?8:oa==="opacity"?1:oa==="sourceIndex"?20:4
                return (<div>
                  <Sl l="min out" v={m.min==null?defMin:m.min} mn={mn} mx={mx} st={.01} fmt={function(v){return v.toFixed(2)}} fn={function(v){updMapping(mi,{min:v})}}/>
                  <Sl l="max out" v={m.max==null?defMax:m.max} mn={mn} mx={mx} st={.01} fmt={function(v){return v.toFixed(2)}} fn={function(v){updMapping(mi,{max:v})}}/>
                </div>)
              })()}
              {m.outputAttr==="color"
                ? <div>
                    <Co l="colour A" v={m.colorA||"#000000"} fn={function(v){updMapping(mi,{colorA:v})}}/>
                    <Co l="colour B" v={m.colorB||"#ffffff"} fn={function(v){updMapping(mi,{colorB:v})}}/>
                  </div>
                : <Se l="combine" v={m.combine||"replace"} opts={["replace","add","subtract","multiply"]}
                    fn={function(v){updMapping(mi,{combine:v})}}/>}
            </div>
          )
        })}
        <button onClick={addMapping} className="ac" style={{width:"100%",minHeight:36,fontSize:10,letterSpacing:".05em",fontFamily:"'IBM Plex Mono',monospace"}}>+ add mapping</button>
      </div>
    )
  }
  if(efx.type==="source-at-points") {
    var satSrcs=p.sources||[]
    function updSrc(i,patch){
      var ns=satSrcs.map(function(s,j){return j===i?Object.assign({},s,patch):s})
      up({sources:ns})
    }
    function addSrc(){up({sources:satSrcs.concat([{refId:null,weight:1}])})}
    function delSrc(i){up({sources:satSrcs.filter(function(_,j){return j!==i})})}
    return (
      <div>
        {satSrcs.length===0&&<div className="empty" style={{padding:"8px 0"}}>no sources — tap + to add</div>}
        {satSrcs.map(function(s,si){
          return (
            <div key={si} style={{borderBottom:"1px solid var(--bd)",paddingBottom:6,marginBottom:6}}>
              <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                <span style={{fontSize:9,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",flex:1}}>source {si+1}</span>
                <button onClick={function(){delSrc(si)}} className="ghost" style={{fontSize:11,padding:"2px 8px"}}>×</button>
              </div>
              {(function(idx){return <NRef l="node" v={s.refId} nodes={props.nodes||[]} selfId={props.selfId} iC={props.iC}
                mode="source" fn={function(v){updSrc(idx,{refId:v})}}/>})(si)}
              <Sl l="weight" v={s.weight==null?1:s.weight} mn={0} mx={10} st={.1}
                fmt={function(v){return v.toFixed(1)}} fn={function(v){updSrc(si,{weight:v})}}/>
              <Se l="colour" v={s.colorMode||"attribute"} opts={["attribute","solid","random","range"]}
                fn={function(v){(function(idx){updSrc(idx,{colorMode:v})})(si)}}/>
              {(s.colorMode||"attribute")==="solid"&&(
                <Co l="colour" v={s.color||"#ffffff"} fn={function(v){(function(idx){updSrc(idx,{color:v})})(si)}}/>
              )}
              {(s.colorMode||"attribute")==="range"&&(
                <>
                  <Co l="from" v={s.colorA||"#ff4488"} fn={function(v){(function(idx){updSrc(idx,{colorA:v})})(si)}}/>
                  <Co l="to"   v={s.colorB||"#4488ff"} fn={function(v){(function(idx){updSrc(idx,{colorB:v})})(si)}}/>
                </>
              )}
            </div>
          )
        })}
        <button onClick={addSrc} className="ac" style={{width:"100%",minHeight:36,fontSize:10,letterSpacing:".05em",fontFamily:"'IBM Plex Mono',monospace"}}>+ add source</button>
        <div style={{borderTop:"1px solid var(--bd)",paddingTop:8,marginTop:4}}>
          <Se l="distribute" v={p.distributionMode||"weighted"} opts={["weighted","sequence","attribute"]}
            fn={function(v){up({distributionMode:v})}}/>
          <Se l="wrap" v={p.wrap||"clamp"} opts={["clamp","repeat"]}
            fn={function(v){up({wrap:v})}}/>
        </div>
      </div>
    )
  }
  if(efx.type==="combine") return (
    <div>
      <PR l="set A"><input type="text" value={p.setA||""} placeholder="modifier set (blank=all)"
        onChange={function(e){up({setA:e.target.value})}}
        style={{flex:1,fontFamily:"'IBM Plex Mono',monospace",fontSize:11}}/></PR>
      <PR l="set B"><input type="text" value={p.setB||""} placeholder="modifier set (blank=all)"
        onChange={function(e){up({setB:e.target.value})}}
        style={{flex:1,fontFamily:"'IBM Plex Mono',monospace",fontSize:11}}/></PR>
      <Se l="mode" v={p.mode||"union"} opts={["union","intersection"]}
        fn={function(v){up({mode:v})}}/>
      <PR l="output set"><input type="text" value={p.outputSet||""} placeholder="output set name"
        onChange={function(e){up({outputSet:e.target.value})}}
        style={{flex:1,fontFamily:"'IBM Plex Mono',monospace",fontSize:11}}/></PR>
      <div style={{fontSize:9,color:"var(--mu)",padding:"4px 0 0 84px",fontStyle:"italic",lineHeight:1.5}}>
        Merges two named point sets into one output set
      </div>
    </div>)
  if(efx.type==="separate") return (
    <div>
      <Se l="split by" v={p.by||"opacity"}
        opts={allAttrs}
        fn={function(v){up({by:v})}}/>
      <Sl l="threshold" v={p.threshold==null?.5:p.threshold} mn={0} mx={1} st={.01}
        fmt={function(v){return v.toFixed(2)}} fn={function(v){up({threshold:v})}}/>
      <PR l="output A"><input type="text" value={p.outputA||""} placeholder="set name for ≥ threshold"
        onChange={function(e){up({outputA:e.target.value})}}
        style={{flex:1,fontFamily:"'IBM Plex Mono',monospace",fontSize:11}}/></PR>
      <PR l="output B"><input type="text" value={p.outputB||""} placeholder="set name for < threshold"
        onChange={function(e){up({outputB:e.target.value})}}
        style={{flex:1,fontFamily:"'IBM Plex Mono',monospace",fontSize:11}}/></PR>
      <div style={{fontSize:9,color:"var(--mu)",padding:"4px 0 0 84px",fontStyle:"italic",lineHeight:1.5}}>
        Tags points with _setGroup A or B — use filter to split downstream
      </div>
    </div>)
  if(efx.type==="filter") return (
    <div>
      <Se l="attribute" v={p.attr||"opacity"}
        opts={allAttrs}
        fn={function(v){up({attr:v})}}/>      <PR l="operator">
        <div style={{display:"flex",gap:4,flex:1}}>
          {[">",">=","<","<=","==","!="].map(function(op){
            return <button key={op}
              className={(p.op||">")===op?"ac":"ghost"}
              style={{flex:1,fontSize:11,minHeight:32,fontFamily:"'IBM Plex Mono',monospace"}}
              onClick={function(){up({op:op})}}>{op}</button>
          })}
        </div>
      </PR>
      <Sl l="value" v={p.value==null?.5:p.value} mn={-10} mx={10} st={.01}
        fmt={function(v){return v.toFixed(2)}} fn={function(v){up({value:v})}}/>
      <div style={{fontSize:9,color:"var(--mu)",padding:"4px 0 0 84px",fontStyle:"italic",lineHeight:1.5}}>
        Keeps only points where {p.attr||"attr"} {p.op||">"} {(p.value==null?.5:p.value).toFixed(2)}
      </div>
    </div>)
  if(efx.type==="delete") return (
    <div>
      <Se l="attribute" v={p.attr||"opacity"}
        opts={allAttrs}
        fn={function(v){up({attr:v})}}/>      <PR l="operator">
        <div style={{display:"flex",gap:4,flex:1}}>
          {[">",">=","<","<=","==","!="].map(function(op){
            return <button key={op}
              className={(p.op||"<")===op?"ac":"ghost"}
              style={{flex:1,fontSize:11,minHeight:32,fontFamily:"'IBM Plex Mono',monospace"}}
              onClick={function(){up({op:op})}}>{op}</button>
          })}
        </div>
      </PR>
      <Sl l="value" v={p.value==null?.1:p.value} mn={-10} mx={10} st={.01}
        fmt={function(v){return v.toFixed(2)}} fn={function(v){up({value:v})}}/>
      <div style={{fontSize:9,color:"var(--mu)",padding:"4px 0 0 84px",fontStyle:"italic",lineHeight:1.5}}>
        Removes points where {p.attr||"attr"} {p.op||"<"} {(p.value==null?.1:p.value).toFixed(2)}
      </div>
    </div>)
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
  var collSt=useState(false); var collapsed=collSt[0], setCollapsed=collSt[1]
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
        <button onClick={function(){setCollapsed(!collapsed)}}
          style={{fontSize:11,color:"var(--mu)",background:"none",border:"none",
            cursor:"pointer",padding:"0 2px",alignSelf:"stretch",display:"flex",alignItems:"center"}}>
          {collapsed?"▸":"▾"}
        </button>
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
      {!collapsed && <TabBar tabs={tabs} active={tab} onChange={setTab}/>}
      {!collapsed && (
        <div style={{display:tab==="source"?"":"none"}} className="card-body">
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
          <Sl l="fill" v={mk.fillOpacity==null?100:mk.fillOpacity} mn={0} mx={100} st={1}
            fmt={function(v){return Math.round(v)+"%"}}
            fn={function(v){props.onChange(Object.assign({},mk,{fillOpacity:v}))}}/>
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
      {!collapsed && (
        <div style={{display:tab==="layer"?"":"none"}} className="card-body">
          <Se l="blend" v={mk.blendMode} opts={MBMS}
            fn={function(v){props.onChange(Object.assign({},mk,{blendMode:v}))}}/>
          <Sl l="opacity" v={mk.opacity} mn={0} mx={100} st={1}
            fmt={function(v){return Math.round(v)+"%"}}
            fn={function(v){props.onChange(Object.assign({},mk,{opacity:v}))}}/>
<BlendIfAccordion>
            <BlendIfSlider label="This"
              values={((mk.blendIf||{}).thisLayer)||{s0:0,s1:0,h1:255,h0:255}}
              onChange={function(v){props.onChange(Object.assign({},mk,{blendIf:Object.assign({},mk.blendIf||{},{thisLayer:v})}))}}/>
            <BlendIfSlider label="Below" disabled={true}
              values={((mk.blendIf||{}).underlyingLayer)||{s0:0,s1:0,h1:255,h0:255}}
              onChange={function(v){props.onChange(Object.assign({},mk,{blendIf:Object.assign({},mk.blendIf||{},{underlyingLayer:v})}))}}/>
          </BlendIfAccordion>
        </div>
      )}
      {!collapsed && (
        <div style={{display:tab==="effects"?"":"none",paddingTop:8}} className="card-body">
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
  var collSt=useState(false); var cardCollapsed=collSt[0], setColl=collSt[1]
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
        <button onClick={function(){setColl(!cardCollapsed)}}
          style={{fontSize:11,color:"var(--mu)",background:"none",border:"none",
            cursor:"pointer",padding:"0 2px",alignSelf:"stretch",display:"flex",alignItems:"center"}}>
          {cardCollapsed?"▸":"▾"}
        </button>
        <div style={{display:"flex",flexDirection:"column",flexShrink:0}}>
          <button className="icon-btn sm" onClick={function(){props.onMove(-1)}} disabled={props.isFirst} style={{fontSize:11,height:20,width:28}}>▲</button>
          <button className="icon-btn sm" onClick={function(){props.onMove(1)}}  disabled={props.isLast}  style={{fontSize:11,height:20,width:28}}>▼</button>
        </div>
        <button className="icon-btn sm" onClick={function(){props.onChange(Object.assign({},efx,{enabled:!efx.enabled}))}} style={{color:efx.enabled?"var(--ac)":"var(--mu)",fontSize:18}}>
          {efx.enabled?"●":"○"}
        </button>

        {/* Type badge — tap ⇄ to open effect-swap picker */}
        <div style={{display:"flex",alignItems:"stretch",flexShrink:0}}>
          <span style={{fontSize:10,padding:"1px 7px",borderRadius:"4px 0 0 4px",
            fontFamily:"'IBM Plex Mono',monospace",
            background:"rgba(255,255,255,.06)",
            color:efx.enabled?"var(--di)":"var(--mu)",
            border:"1px solid var(--bd)",borderRight:"none",
            display:"flex",alignItems:"center"}}>
            {efx.type}
          </span>
          <button ref={swapAnchorRef} onClick={function(){setSwap(swap==="picking"?null:"picking")}}
            title="Swap effect type"
            style={{fontSize:9,padding:"0 5px",borderRadius:"0 4px 4px 0",
              fontFamily:"'IBM Plex Mono',monospace",
              background:"rgba(255,255,255,.06)",
              color:swap==="picking"?"var(--di)":"var(--mu)",
              border:"1px solid var(--bd)",cursor:"pointer",
              display:"flex",alignItems:"center"}}>
            ⇄
          </button>
        </div>
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
                    onClick={function(e){e.stopPropagation();pickType(t)}}
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
      {!cardCollapsed && (
        <div style={{display:tab==="primary"?"":"none"}} className="card-body">
          <EfxPrimary efx={efx} onChange={props.onChange} nodes={props.nodes} selfId={props.selfId} iC={props.iC} sourceId={props.sourceId}/>
        </div>
      )}
      {(
        <div style={{display:tab==="layer"?"":"none"}} className="card-body">
          <Sl l="opacity" v={efx.opacity} mn={0} mx={100} st={1} fmt={function(v){return Math.round(v)+"%"}} fn={function(v){props.onChange(Object.assign({},efx,{opacity:v}))}}/>
          <Se l="blend" v={efx.blendMode||"normal"} opts={EBMS} fn={function(v){props.onChange(Object.assign({},efx,{blendMode:v}))}}/>
          <PR l="channels">
            <div style={{display:"flex",gap:4}}>
              {["R","G","B","A"].map(function(ch){
                var bc=efx.blendChannels||{R:true,G:true,B:true,A:true}
                var on=bc[ch]!==false
                var cols={R:"#e05050",G:"#50d050",B:"#5080f0",A:"var(--mu)"}
                return <button key={ch} onClick={function(){
                    var nb=Object.assign({R:true,G:true,B:true,A:true},bc)
                    nb[ch]=!on; props.onChange(Object.assign({},efx,{blendChannels:nb}))}}
                  style={{padding:"4px 0",borderRadius:4,fontSize:10,fontFamily:"'IBM Plex Mono',monospace",
                    cursor:"pointer",border:"1px solid "+(on?cols[ch]:"var(--bd)"),
                    background:on?"rgba(255,255,255,.06)":"none",color:on?cols[ch]:"var(--mu)",
                    width:36,textAlign:"center"}}>
                  {ch}</button>})}
            </div>
          </PR>
<BlendIfAccordion>
            <BlendIfSlider label="This"
              values={((efx.blendIf||{}).thisLayer)||{s0:0,s1:0,h1:255,h0:255}}
              onChange={function(v){props.onChange(Object.assign({},efx,{blendIf:Object.assign({},efx.blendIf||{},{thisLayer:v})}))}}/>
            <BlendIfSlider label="Below" disabled={true}
              values={((efx.blendIf||{}).underlyingLayer)||{s0:0,s1:0,h1:255,h0:255}}
              onChange={function(v){props.onChange(Object.assign({},efx,{blendIf:Object.assign({},efx.blendIf||{},{underlyingLayer:v})}))}}/>
          </BlendIfAccordion>
        </div>
      )}
      {!cardCollapsed && (
        <div style={{display:tab==="mask"?"":"none",paddingTop:8}} className="card-body">
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
  {label:"Colour",   items:["hue-shift","saturation","vibrance","colour-map","colour"]},
  {label:"Pixel",    items:["blur","dir-blur","sharpen","invert","threshold","pixelate","vignette","chromatic-ab","glow","emboss","edge-detect","solarise","duotone"]},
  {label:"Distort",  items:["wave","twirl","bulge","uv-texture","uv-distort","polar-to-cart","cart-to-polar"]},
  {label:"Transform",items:["match","transform"]},
  {label:"Points",   items:["show-points","point-map","source-at-points","attributes","combine","separate","filter","delete"]},
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
  var displayGroups=(props.filterTypes
    ?EFX_GROUPS.map(function(g){var fi=g.items.filter(function(t){return props.filterTypes.includes(t)});return fi.length?{label:g.label,items:fi}:null}).filter(Boolean)
    :EFX_GROUPS
  ).filter(function(g){return !(props.excludeGroups||[]).includes(g.label)})
  return (
    <div ref={anchorRef} style={{position:"relative",flex:2,minWidth:0}}>
      <button className="ac" style={{width:"100%",height:"100%"}} onClick={function(){setOpen(!open)}}>+ effect</button>
      {open&&pos&&createPortal(
        <div ref={menuRef} className="eff-menu" style={pos}>
          {displayGroups.map(function(grp){
            return (
              <div key={grp.label}>
                <div className="drop-grp">{grp.label}</div>
                {grp.items.map(function(t){
                  return (
                    <div key={t} className="drop-item" onClick={function(e){e.stopPropagation();props.onAdd(t);setOpen(false)}}>{t}</div>
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
      <div style={{padding:"2px 10px 1px"}}>
        <span style={{fontSize:7,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",letterSpacing:".04em"}}>↓ applies top → bottom</span>
      </div>
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
            sourceId={props.sourceId}
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
        {/* bypass all toggle */}
        {props.stack.length>0&&(function(){
          var anyDisabled=props.stack.some(function(e){return e.enabled===false})
          return (
            <button title={anyDisabled?"Enable all":"Disable all"}
              onClick={function(){
                var en=anyDisabled
                props.onChange(props.stack.map(function(e){return Object.assign({},e,{enabled:en})}))
              }}
              style={{fontSize:14,width:36,flexShrink:0,borderRadius:6,cursor:"pointer",
                color:anyDisabled?"var(--mu)":"var(--ac)",
                background:"none",border:"1px solid var(--bd)"}}>
              {anyDisabled?"○":"●"}
            </button>
          )
        })()}
        {/* + effect — 2 parts */}
        <AddEfxMenu onAdd={addEfx} filterTypes={props.filterTypes} excludeGroups={props.excludeGroups}/>
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
        {/* bypass all toggle */}
        {props.stack.length>0&&(function(){
          var anyDisabled=props.stack.some(function(m){return m.enabled===false})
          return (
            <button title={anyDisabled?"Enable all":"Disable all"}
              onClick={function(){
                var en=anyDisabled
                props.onChange(props.stack.map(function(m){return Object.assign({},m,{enabled:en})}))
              }}
              style={{fontSize:14,width:36,flexShrink:0,borderRadius:6,cursor:"pointer",
                color:anyDisabled?"var(--mu)":"var(--lv)",
                background:"none",border:"1px solid var(--bd)"}}>
              {anyDisabled?"○":"●"}
            </button>
          )
        })()}
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
    {id:"effects",label:((props.context||props.node&&props.node.context)==="point"?"Modifiers":"Effects")+(nEfx>0?" ("+nEfx+")":""),color:"ac"},
    {id:"masks",  label:((props.context||props.node&&props.node.context)==="point"?"Isolate":"Masks")+(nMask>0?" ("+nMask+")":""),color:"lv"},
  ]
  var inner = (
    <>
      <TabBar tabs={tabs} active={tab} onChange={setTab}/>
      {(
        <div style={{display:tab==="source"?"":"none"}} className="card-body">
          <NRef l="source" v={slot.refId} nodes={nodes} selfId={selfId} iC={props.iC} fn={function(v){onChange(Object.assign({},slot,{refId:v}))}}/>
          <Sl l="fill" v={slot.fillOpacity==null?100:slot.fillOpacity} mn={0} mx={100} st={1}
            fmt={function(v){return Math.round(v)+"%"}}
            fn={function(v){onChange(Object.assign({},slot,{fillOpacity:v}))}}/>
        </div>
      )}
      {(
        <div style={{display:tab==="effects"?"":"none",padding:10}}>
          <EfxStack key={(props.slotKey||"slot")+"_efx"}
            stack={slot.effectStack||[]} nodes={nodes} selfId={selfId} navPush={props.navPush}
            sourceId={slot.refId}
            excludeGroups={["Points"]}
            basePath={{slotKey:(props.slotKey||"")+".effectStack", steps:[]}}
            onNavigate={props.onNavigate}
            onPromote={props.onPromote}
            onChange={function(es){onChange(Object.assign({},slot,{effectStack:es}))}}
            onExtract={props.onExtract ? function(){props.onExtract({slot:props.slotKey,slotObj:slot,kind:"effect",owner:props.owner})} : null}/>
        </div>
      )}
      {(
        <div style={{display:tab==="masks"?"":"none",padding:10}}>
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
                  key={top.id+"_masks"}
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
                key={top.id+"_efxdrll"}
                stack={stackToShow}
                nodes={nodes} selfId={node.id}
                navPush={navPush}
                filterTypes={ISOLATE_MASK_EFFECTS}
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
    {id:"effects",label:(isPoint?"Modifiers":"Effects")+(nOutEfx>0?" ("+nOutEfx+")":""),color:"ac"},
    {id:"masks",  label:(isPoint?"Isolate":"Masks")+(nOutMask>0?" ("+nOutMask+")":""),color:"lv"},
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

        {COMMUTATIVE_MODES[node.mode] && (
          <div style={{fontSize:9,color:"var(--mu)",padding:"0 0 4px 84px",lineHeight:1.5,fontStyle:"italic"}}>
            order has no effect in {node.mode} mode
          </div>
        )}
        <PR l="channels">
          <div style={{display:"flex",gap:4}}>
            {["R","G","B","A"].map(function(ch){
              var bc=node.blendChannels||{R:true,G:true,B:true,A:true}
              var on=bc[ch]!==false
              var cols={R:"#e05050",G:"#50d050",B:"#5080f0",A:"var(--mu)"}
              return <button key={ch} onClick={function(){
                  var nb=Object.assign({R:true,G:true,B:true,A:true},bc)
                  nb[ch]=!on; onChange(Object.assign({},node,{blendChannels:nb}))}}
                style={{padding:"4px 0",borderRadius:4,fontSize:10,fontFamily:"'IBM Plex Mono',monospace",
                  cursor:"pointer",border:"1px solid "+(on?cols[ch]:"var(--bd)"),
                  background:on?"rgba(255,255,255,.06)":"none",color:on?cols[ch]:"var(--mu)",
                  width:36,textAlign:"center"}}>
                {ch}</button>})}
          </div>
        </PR>
        <BlendIfAccordion>
          <BlendIfSlider label={"Input A"+(node.switched?"":" (top)")}
            values={(node.blendIf&&node.blendIf.thisLayer)||{s0:0,s1:0,h1:255,h0:255}}
            onChange={function(v){onChange(Object.assign({},node,{blendIf:Object.assign({},node.blendIf||{},{thisLayer:v})}))}}/>
          <BlendIfSlider label={"Input B"+(node.switched?" (top)":"")}
            values={(node.blendIf&&node.blendIf.underlyingLayer)||{s0:0,s1:0,h1:255,h0:255}}
            onChange={function(v){onChange(Object.assign({},node,{blendIf:Object.assign({},node.blendIf||{},{underlyingLayer:v})}))}}/>
        </BlendIfAccordion>
      </div>
    )
    var masksBody=(
      <div className="card-body">
        <Se l="mode" v={node.maskMode||"add"} opts={MASK_BMODES}
          fn={function(v){onChange(Object.assign({},node,{maskMode:v}))}}/>
        <Sl l="amount" v={node.maskAmount==null?100:node.maskAmount} mn={0} mx={100} st={1}
          fmt={function(v){return Math.round(v)+"%"}}
          fn={function(v){onChange(Object.assign({},node,{maskAmount:v}))}}/>
        <BlendIfAccordion>
          <BlendIfSlider label={"Input A"+(node.switched?"":" (top)")}
            values={(node.maskBlendIf&&node.maskBlendIf.thisLayer)||{s0:0,s1:0,h1:255,h0:255}}
            onChange={function(v){onChange(Object.assign({},node,{maskBlendIf:Object.assign({},node.maskBlendIf||{},{thisLayer:v})}))}}/>
          <BlendIfSlider label={"Input B"+(node.switched?" (top)":"")}
            values={(node.maskBlendIf&&node.maskBlendIf.underlyingLayer)||{s0:0,s1:0,h1:255,h0:255}}
            onChange={function(v){onChange(Object.assign({},node,{maskBlendIf:Object.assign({},node.maskBlendIf||{},{underlyingLayer:v})}))}}/>
        </BlendIfAccordion>
      </div>
    )
    var body=(<div><TabBar tabs={blendTabs} active={blendTab} onChange={setBlendTab}/>{blendTab==="pixels"?pixelsBody:masksBody}</div>)
    if(headless) return body
    return (
      <div className="card" style={{marginBottom:10}}>
        <div className="card-hdr">
          <span style={{flex:1,fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,textTransform:"uppercase",letterSpacing:".1em",color:"var(--di)"}}>Blend</span>
          <button onClick={function(){onChange(Object.assign({},node,{switched:!node.switched}))}}
            className={node.switched?"ac":"ghost"}
            style={{fontSize:10,padding:"0 10px",minHeight:28}}>
            {node.switched?"B over A":"A over B"}
          </button>
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
        <div className="card-body" style={{paddingBottom:0}}>
{!(props.context==="point")&&          <Sl l="fill" v={node.outFillOpacity==null?100:node.outFillOpacity} mn={0} mx={100} st={1}
            fmt={function(v){return Math.round(v)+"%"}}
            fn={function(v){onChange(Object.assign({},node,{outFillOpacity:v}))}}/>}
          <Sl l="opacity" v={node.outOpacity==null?100:node.outOpacity} mn={0} mx={100} st={1}
            fmt={function(v){return Math.round(v)+"%"}}
            fn={function(v){onChange(Object.assign({},node,{outOpacity:v}))}}/>
        </div>
        <TabBar tabs={outTabs} active={outTab} onChange={setOutTab}/>
        {(
          <div style={{display:outTab==="effects"?"":"none",padding:10}}>
            <EfxStack stack={node.outEfx||[]} nodes={nodes} selfId={node.id} navPush={navPush}
              excludeGroups={["Points"]}
              basePath={{slotKey:"outEfx", steps:[]}}
              onNavigate={props.onNavigate}
              onPromote={wrappedPromote}
              onChange={function(es){onChange(Object.assign({},node,{outEfx:es}))}}
              onExtract={props.onExtract ? function(){props.onExtract({slot:"outEfx",slotObj:{effectStack:node.outEfx||[]},kind:"effect",owner:node})} : null}/>
          </div>
        )}
        {(
          <div style={{display:outTab==="masks"?"":"none",padding:10}}>
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
  // extra: optional JSX rendered right-aligned in the header (e.g. A over B toggle)
  // Uses a wrapper div so the extra element can stopPropagation without nesting buttons
  function Acc(sKey, label, accent, headerBg, renderFn, extra){
    var isCollapsed = !!collapsed[sKey]
    return (
      <div key={sKey} className="card" style={{marginBottom:10}}>
        <div style={{display:"flex",alignItems:"center",
          background:headerBg||"var(--sf)",
          borderBottom:isCollapsed?"none":"1px solid var(--bd)",
          borderRadius:isCollapsed?8:"8px 8px 0 0",minHeight:"var(--tap)"}}>
          <button onClick={function(){toggleCollapse(sKey)}}
            style={{flex:1,display:"flex",alignItems:"center",gap:8,
              padding:"0 10px",background:"none",border:"none",
              color:accent||"var(--tx)",cursor:"pointer",minHeight:"var(--tap)",
              fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,
              textTransform:"uppercase",letterSpacing:".1em",textAlign:"left"}}>
            <span className={"bp-chevron"+(isCollapsed?"":" open")} style={{color:accent||"var(--mu)"}}>›</span>
            <span style={{flex:1}}>{label}</span>
          </button>
          {extra&&(<div onClick={function(e){e.stopPropagation()}} style={{paddingRight:8,flexShrink:0}}>
            {extra}
          </div>)}
        </div>
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
          {Acc("inputA","Input A","var(--ac)","rgba(36,204,168,.06)",renderInputA,
            (function(){
              var ownerId=node.id
              var ds=props.dispSlot
              var isThis=ds&&ds.nodeId===ownerId&&ds.slot==="inputA"
              var icon=!isThis?"◎":ds.mode==="pixels"?"◉":"◈"
              var col=!isThis?"var(--mu)":"var(--lv)"
              return props.dspSlot?<button className="icon-btn sm"
                onClick={function(e){e.stopPropagation();props.dspSlot(ownerId,"inputA")}}
                style={{color:col,fontSize:18}}
                title={!isThis?"Preview":ds&&ds.mode==="pixels"?"Pixels · tap mask":"Mask · tap off"}>
                {icon}</button>:null
            })())}
          {Acc("blend", "Blend",  "var(--di)",null, renderBlend,
            <button onClick={function(){onChange(Object.assign({},node,{switched:!node.switched}))}}
              className={node.switched?"ac":"ghost"}
              style={{fontSize:10,padding:"0 10px",minHeight:28}}>
              {node.switched?"B over A":"A over B"}
            </button>)}
          {Acc("inputB","Input B","var(--co)","rgba(208,72,152,.06)",renderInputB,
            (function(){
              var ownerId=node.id
              var ds=props.dispSlot
              var isThis=ds&&ds.nodeId===ownerId&&ds.slot==="inputB"
              var icon=!isThis?"◎":ds.mode==="pixels"?"◉":"◈"
              var col=!isThis?"var(--mu)":"var(--lv)"
              return props.dspSlot?<button className="icon-btn sm"
                onClick={function(e){e.stopPropagation();props.dspSlot(ownerId,"inputB")}}
                style={{color:col,fontSize:18}}
                title={!isThis?"Preview":ds&&ds.mode==="pixels"?"Pixels · tap mask":"Mask · tap off"}>
                {icon}</button>:null
            })())}
          {Acc("output","Output", "var(--lv)","rgba(176,96,240,.06)",renderOutput,
            (function(){
              var ownerId=node.id
              var ds=props.dispSlot
              var isThis=ds&&ds.nodeId===ownerId&&ds.slot==="output"
              var icon=!isThis?"◎":ds.mode==="pixels"?"◉":"◈"
              var col=!isThis?"var(--mu)":"var(--lv)"
              return props.dspSlot?<button className="icon-btn sm"
                onClick={function(e){e.stopPropagation();props.dspSlot(ownerId,"output")}}
                style={{color:col,fontSize:18}}
                title={!isThis?"Preview":ds&&ds.mode==="pixels"?"Pixels · tap mask":"Mask · tap off"}>
                {icon}</button>:null
            })())}
        </div>
      )}
    </div>
  )
}

/* ─── NODE ITEM ───────────────────────────────────────── */
var TDOT={"solid":"#3850a0","shape":"#18b860","gradient":"#7820b0","noise":"#a87018","pattern":"#1878b0","image":"#2060a8","tile":"#20a890","grid":"#48a8d0","spiral":"#d0a048","polar-grid":"#a048d0","phyllotaxis":"#48d090","scatter":"#d07048","blender":"#b82880","layers":"#e06828","stack":"#24acc4","promoted":"#d4b428","point-comp":"#24cca8"}
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
        {node.type==="stack"?(node.stackType||"effect")+" stack":node.type==="layers"?"layer comp":node.type==="point-comp"?"point comp ◉":node.type}
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
  var s1standard=[{t:"solid",l:"Solid Colour"},{t:"shape",l:"Geometry"},{t:"gradient",l:"Gradient"},{t:"noise",l:"Noise Field"},{t:"pattern",l:"Pattern"},{t:"image",l:"Image"}]
  var s1advanced=[{t:"tile",l:"Tile"},{t:"uv-create",l:"UV Create"}]
  var s2items=[{t:"blender",l:"Blender"},{t:"layers",l:"Layer Comp"},{t:"stack-effect",l:"Effect Stack"},{t:"stack-mask",l:"Mask Stack"},{t:"__div__",l:"Point Context"},{t:"point-comp",l:"Point Comp ◉"}]
  return (
    <div ref={anchorRef} style={{position:"relative"}}>
      <button className="ac" style={{fontSize:10,padding:"0 10px"}} onClick={function(){setOpen(!open)}}>+ Add</button>
      {open&&pos&&createPortal(
        <div ref={menuRef} className="drop-menu" style={pos}>
          {props.sec===1?[
            s1standard.map(function(item){return <div key={item.t} className="drop-item" onPointerDown={function(e){e.preventDefault();props.onAdd(item.t,props.sec);setOpen(false)}}>{item.l}</div>}),
            <div key="__adv__" style={{padding:"5px 14px 4px",fontSize:8,color:"var(--mu)",
              textTransform:"uppercase",letterSpacing:".1em",fontFamily:"'IBM Plex Mono',monospace",
              borderTop:"1px solid var(--bd)",borderBottom:"1px solid var(--bd)",background:"var(--bg)"}}>
              Advanced
            </div>,
            s1advanced.map(function(item){return <div key={item.t} className="drop-item" onPointerDown={function(e){e.preventDefault();props.onAdd(item.t,props.sec);setOpen(false)}}>{item.l}</div>})
          ]:s2items.map(function(item){
  if(item.t==="__div__") return <div key={item.t} className="drop-grp" style={{borderTop:"1px solid var(--bd)",marginTop:4}}>{item.l}</div>
  return <div key={item.t} className="drop-item" onPointerDown={function(e){e.preventDefault();props.onAdd(item.t,props.sec);setOpen(false)}}>{item.l}</div>
})}
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
  var bSt=useState(true); var barsVis=bSt[0], setBarsVis=bSt[1]
  var fsStyle = props.fullscreen
    ? {position:"fixed",top:0,left:0,width:"100%",height:"100%",
       zIndex:500,background:"var(--bg)",WebkitOverflowScrolling:"touch"}
    : {flex:1,minHeight:0}
  return (
    <div style={Object.assign({display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},fsStyle)}>
      {/* Floating bars toggle — always visible, floats above the top bar */}
      <button
        title={barsVis?"Hide bars":"Show bars"}
        onClick={function(){setBarsVis(function(v){return !v})}}
        style={{
          position:"absolute",top:6,right:6,zIndex:10,
          width:32,height:32,fontSize:16,flexShrink:0,
          background:barsVis?"var(--pn)":"rgba(36,204,168,.18)",
          border:"1px solid "+(barsVis?"var(--bd)":"rgba(36,204,168,.5)"),
          borderRadius:6,cursor:"pointer",display:"flex",alignItems:"center",
          justifyContent:"center",
          color:barsVis?"var(--di)":"var(--ac)",
          boxShadow:barsVis?"none":"0 0 0 1px rgba(36,204,168,.2)"
        }}>
        {barsVis?"⊡":"⊠"}
      </button>
      {/* Top bar */}
      {barsVis&&(
        <div style={{display:"flex",alignItems:"center",gap:4,padding:"6px 10px",
          paddingRight:46,
          background:"var(--pn)",borderBottom:"1px solid var(--bd)",flexShrink:0,overflowX:"auto"}}>
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
      )}
      {/* Canvas area — expands to fill all available space when bars are hidden */}
      <div className="checker" style={{flex:1,overflow:"auto",display:"flex",alignItems:"center",justifyContent:"center",padding:20,position:"relative"}}>
        {!props.active && (
          <div style={{position:"absolute",textAlign:"center",pointerEvents:"none"}}>
            <div style={{fontSize:40,color:"var(--bd)",marginBottom:12}}>◎</div>
            <div style={{fontSize:12,color:"var(--mu)"}}>Tap ◎ on any item to preview</div>
          </div>
        )}
        <div style={{transform:"scale("+zoom+")",transformOrigin:"center center",boxShadow:"0 12px 60px rgba(0,0,0,.85)",outline:"1px solid var(--bd)",lineHeight:0}}>
          <canvas ref={props.cvRef} width={props.sz} height={props.sz} style={{display:"block",imageRendering:zoom>2?"pixelated":"auto"}}/>
        </div>
      </div>
      {/* Bottom bar */}
      {barsVis&&(
        <div style={{display:"flex",alignItems:"center",gap:8,padding:"5px 12px",background:"var(--pn)",borderTop:"1px solid var(--bd)",flexShrink:0}}>
          <span style={{fontSize:9,color:"var(--mu)"}}>{props.sz}x{props.sz}px</span>
          {props.active && <span style={{fontSize:9,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace"}}>[{props.active.type}]</span>}
          <span style={{flex:1}}/>
          <span style={{fontSize:9,color:"var(--mu)",letterSpacing:".08em",fontFamily:"'IBM Plex Mono',monospace"}}>{(typeof __BUILD_HASH__!=="undefined"?__BUILD_HASH__:"dev")+" · Selena"}</span>
        </div>
      )}
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
  // Start blank — default project loads from localStorage if set (see startup useEffect)
  return {nodes:[], dispId:null}
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
    <div className="sheet-scrim" style={{pointerEvents:"auto",background:"rgba(4,4,18,.72)"}}>
      <div style={{position:"absolute",inset:0}} onClick={props.onClose}/>
      <div className="sheet-body" style={{position:"relative"}}>
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
            <div className="setting-grp-lbl">Project</div>
            <div className="setting-row">
              <span className="setting-lbl">Auto-save interval</span>
              <select value={props.autoSaveInt||0} onChange={function(e){props.onAutoSaveInt(Number(e.target.value))}}
                style={{background:"var(--el)",color:"var(--tx)",border:"1px solid var(--bd)",
                  borderRadius:4,padding:"4px 8px",fontSize:11,fontFamily:"'IBM Plex Mono',monospace"}}>
                <option value={0}>Off</option>
                <option value={1}>1 min</option>
                <option value={2}>2 min</option>
                <option value={5}>5 min</option>
                <option value={10}>10 min</option>
              </select>
            </div>
            <div className="setting-desc">Auto-saves locally on interval and on app close. Use ↓ to save a file.</div>
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
    {id:"effects", label:(props.context==="point"?"Modifiers":"Fx")+(nEfx>0?" ("+nEfx+")":""), color:"ac"},
    {id:"masks",   label:(props.context==="point"?"Isolate":"Mask")+(nMask>0?" ("+nMask+")":""), color:"lv"},
  ].concat(props.context==="point"?[]:[{id:"layer", label:"Layer"}])
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
      {!isCollapsed && (
        <div style={{display:layerTab==="source"?"":"none"}} className="card-body">
          <NRef l="source" v={lyr.refId} nodes={props.nodes} selfId={props.selfId} iC={props.iC} mode="source"
            fn={function(v){props.onChange({refId:v})}}/>
          <Sl l="fill" v={lyr.fillOpacity==null?100:lyr.fillOpacity} mn={0} mx={100} st={1}
            fmt={function(v){return Math.round(v)+"%"}}
            fn={function(v){props.onChange({fillOpacity:v})}}/>
        </div>
      )}
      {!isCollapsed && (
        <div style={{display:layerTab==="effects"?"":"none",padding:10}}>
          <EfxStack
            key={lyr.id+"_efx"}
            stack={lyr.effectStack||[]} nodes={props.nodes} selfId={props.selfId}
            navPush={props.navPush} iC={props.iC}
            sourceId={lyr.refId}
            context={props.context}
            excludeGroups={["Points"]}
            basePath={{slotKey:"layers["+li+"].effectStack", steps:[]}}
            onNavigate={props.onNavigate}
            onPromote={props.onPromote}
            onChange={function(es){props.onChange({effectStack:es})}}/>
        </div>
      )}
      {!isCollapsed && (
        <div style={{display:layerTab==="masks"?"":"none",padding:10}}>
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
      {!isCollapsed && (
          <div style={{display:layerTab==="layer"?"":"none"}}>
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
          <PR l="channels">
            <div style={{display:"flex",gap:4}}>
              {["R","G","B","A"].map(function(ch){
                var bc=lyr.blendChannels||{R:true,G:true,B:true,A:true}
                var on=bc[ch]!==false
                var cols={R:"#e05050",G:"#50d050",B:"#5080f0",A:"var(--mu)"}
                return <button key={ch} onClick={function(){
                    var nb=Object.assign({R:true,G:true,B:true,A:true},bc)
                    nb[ch]=!on; props.onChange({blendChannels:nb})}}
                  style={{padding:"4px 0",borderRadius:4,fontSize:10,fontFamily:"'IBM Plex Mono',monospace",
                    cursor:"pointer",border:"1px solid "+(on?cols[ch]:"var(--bd)"),
                    background:on?"rgba(255,255,255,.06)":"none",color:on?cols[ch]:"var(--mu)",
                    width:36,textAlign:"center"}}>
                  {ch}</button>})}
            </div>
          </PR>
<BlendIfAccordion>
            <BlendIfSlider label="This"
              values={((lyr.blendIf||{}).thisLayer)||{s0:0,s1:0,h1:255,h0:255}}
              onChange={function(v){props.onChange({blendIf:Object.assign({},lyr.blendIf||{},{thisLayer:v})})}}/>
            <BlendIfSlider label="Below"
              hidden={props.isLast}
              values={((lyr.blendIf||{}).underlyingLayer)||{s0:0,s1:0,h1:255,h0:255}}
              onChange={function(v){props.onChange({blendIf:Object.assign({},lyr.blendIf||{},{underlyingLayer:v})})}}/>
          </BlendIfAccordion>
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
  var layerCtxSt=useState(node.context||"pixel"); var layerCtx=layerCtxSt[0]
  function setCtx(c){layerCtxSt[1](c);props.onChange(Object.assign({},node,{context:c}))}
  var isPoint=layerCtx==="point"
  var layerCtxSt=useState(node.context||"pixel"); var layerCtx=layerCtxSt[0]
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
              key={top.id+"_masks"}
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
              key={top.id+"_efxdrll"}
              stack={stackToShow}
              nodes={nodes} selfId={node.id}
              navPush={navPush} iC={props.iC}
              filterTypes={ISOLATE_MASK_EFFECTS}
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
    var newLyr=mkLayer()
    newLyr.name="layer "+(layers.length+1)
    onChange(Object.assign({},node,{layers:[newLyr].concat(layers)}))
  }
  function delLayer(idx){
    if(layers.length<=1) return
    onChange(Object.assign({},node,{layers:layers.filter(function(_,i){return i!==idx})}))
  }
  function moveLayer(idx, dir){
    var ni=Math.max(0,Math.min(layers.length-1,idx+dir))
    if(ni===idx) return
    // Ensure both layers have stored names before swapping
    // so the name travels with the layer rather than staying positional
    var a=layers.map(function(l,i){
      return (!l.name||!l.name.trim())?Object.assign({},l,{name:"layer "+(layers.length-i)}):l
    })
    var tmp=a[idx]; a[idx]=a[ni]; a[ni]=tmp
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
            <LayerCard key={lyr.id} lyr={lyr} li={li} context={layerCtx}
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
        <div className="card-body" style={{paddingBottom:0}}>
          <Sl l="fill" v={node.outFillOpacity==null?100:node.outFillOpacity} mn={0} mx={100} st={1}
            fmt={function(v){return Math.round(v)+"%"}}
            fn={function(v){onChange(Object.assign({},node,{outFillOpacity:v}))}}/>
          <Sl l="opacity" v={node.outOpacity==null?100:node.outOpacity} mn={0} mx={100} st={1}
            fmt={function(v){return Math.round(v)+"%"}}
            fn={function(v){onChange(Object.assign({},node,{outOpacity:v}))}}/>
        </div>
        <TabBar tabs={outTabs} active={outTab} onChange={setOutTab}/>
        {outTab==="effects" && (
          <div style={{padding:10}}>
            <EfxStack stack={node.outEfx||[]} nodes={nodes} selfId={node.id} navPush={navPush}
              excludeGroups={["Points"]}
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


/* ─── POINT CHAIN ITEM CARD ──────────────────────────── */
// A single modifier in the chain. Each item is one point-context operation.
// Isolate restricts which points this modifier affects.
function PointChainItemCard(props) {
  var item=props.item, ci=props.index
  var collSt=useState(false); var coll=collSt[0], setColl=collSt[1]
  var armedSt=useState(false); var armed=armedSt[0], setArmed=armedSt[1]
  var tabSt=useState("primary"); var tab=tabSt[0], setTab=tabSt[1]
  var timerRef=useRef(null)
  var swapOpenSt=useState(false); var swapOpen=swapOpenSt[0], setSwapOpen=swapOpenSt[1]
  var swapAnchorRef=useRef(null), swapMenuRef=useRef(null)
  var swapPos=usePopoverPosition(swapAnchorRef,swapOpen,"below")
  useEffect(function(){return function(){if(timerRef.current)clearTimeout(timerRef.current)}},[])
  useEffect(function(){
    if(!swapOpen) return
    function h(e){
      if(swapAnchorRef.current&&swapAnchorRef.current.contains(e.target)) return
      if(swapMenuRef.current&&swapMenuRef.current.contains(e.target)) return
      setSwapOpen(false)
    }
    document.addEventListener("mousedown",h)
    return function(){document.removeEventListener("mousedown",h)}
  },[swapOpen])
  function pickModifier(t){
    if(t===item.type){setSwapOpen(false);return}
    var newItem=Object.assign({},mkPointChainItem(t),{
      id:item.id, name:item.name, enabled:item.enabled,
      isolate:item.isolate||[], isolateAttr:item.isolateAttr||""
    })
    props.onChange(newItem); setSwapOpen(false)
  }
  var nIso=(item.isolate||[]).length
  // Modifier groups for the swap picker
  var modGroups=EFX_GROUPS.map(function(g){
    var fi=g.items.filter(function(t){return POINT_CONTEXT_EFFECTS.includes(t)})
    return fi.length?{label:g.label,items:fi}:null
  }).filter(Boolean)
  function handleDel(){
    if(!armed){setArmed(true);timerRef.current=setTimeout(function(){setArmed(false)},3000)}
    else{clearTimeout(timerRef.current);setArmed(false);props.onDel()}
  }
  // Render utilities (show-points, source-at-points) don't support isolate masking
  var isRenderUtil=item.type==="show-points"||item.type==="source-at-points"
  var isShowPoints=item.type==="show-points"
  // show-points: per-instance label list and global label settings
  var spLabels=isShowPoints?(item.params&&item.params.labels||[]):[]
  var spAllAttrs=isShowPoints?computeAllAttrs(props.nodes,props.selfId,props.sourceId):[]
  function upSP(np){props.onChange(Object.assign({},item,{params:Object.assign({},item.params,np)}))}
  // Main preview is "active" when the dispSlot points to this chain item's isolate
  var isoDispActive=!!(props.dispSlot&&props.dispSlot.nodeId===props.nodeId
    &&(props.dispSlot.slot==="chain_isolate_"+ci||props.dispSlot.slot==="out_isolate_"+ci))
  var tabs=isShowPoints
    ? [{id:"primary",label:"Primary"},{id:"attributes",label:"Attributes"+(spLabels.length>0?" ("+spLabels.length+")":""),color:"di"}]
    : isRenderUtil
      ? [{id:"primary",label:"Primary"}]
      : [{id:"primary",label:"Primary"},{id:"isolate",label:"Isolate"+(nIso>0?" ("+nIso+")":""),color:"lv"}]
  return (
    <div className="card" style={{marginBottom:8}}>
      <div className="card-hdr" style={{background:"rgba(36,204,168,.06)",
        borderBottom:coll?"none":"1px solid var(--bd)",
        borderRadius:coll?8:"8px 8px 0 0"}}>
        <span className={"bp-chevron"+(coll?"":" open")}
          onClick={function(){setColl(!coll)}}
          style={{color:"var(--ac)",flexShrink:0,fontSize:18}}>›</span>
        <div style={{display:"flex",flexDirection:"column",flexShrink:0}}>
          <button className="icon-btn sm" onClick={function(){props.onMove(-1)}} disabled={props.isFirst} style={{fontSize:11,height:20,width:28}}>▲</button>
          <button className="icon-btn sm" onClick={function(){props.onMove(1)}}  disabled={props.isLast}  style={{fontSize:11,height:20,width:28}}>▼</button>
        </div>
        <button className="icon-btn sm"
          onClick={function(){props.onChange(Object.assign({},item,{enabled:item.enabled===false}))}}
          style={{color:item.enabled===false?"var(--mu)":"var(--ac)",fontSize:18}}>
          {item.enabled===false?"○":"●"}
        </button>
        <div style={{display:"flex",alignItems:"stretch",flexShrink:0}}>
          <span style={{fontSize:10,padding:"1px 7px",borderRadius:"4px 0 0 4px",
            fontFamily:"'IBM Plex Mono',monospace",
            background:"rgba(36,204,168,.12)",color:"var(--ac)",
            border:"1px solid rgba(36,204,168,.25)",borderRight:"none",
            display:"flex",alignItems:"center"}}>
            {item.type}
          </span>
          <button ref={swapAnchorRef} title="Swap modifier type"
            onClick={function(){setSwapOpen(!swapOpen)}}
            style={{fontSize:9,padding:"0 5px",borderRadius:"0 4px 4px 0",
              fontFamily:"'IBM Plex Mono',monospace",
              background:"rgba(36,204,168,.08)",color:swapOpen?"var(--ac)":"rgba(36,204,168,.5)",
              border:"1px solid rgba(36,204,168,.25)",cursor:"pointer",
              display:"flex",alignItems:"center"}}>
            ⇄
          </button>
        </div>
        {swapOpen&&swapPos&&createPortal(
          <div ref={swapMenuRef} className="eff-menu" style={swapPos}>
            {modGroups.map(function(grp){return (
              <div key={grp.label}>
                <div className="drop-grp">{grp.label}</div>
                {grp.items.map(function(t){return (
                  <div key={t} className={"drop-item"+(t===item.type?" sel":"")}
                    onClick={function(e){e.stopPropagation();pickModifier(t)}}
                    style={t===item.type?{color:"var(--ac)"}:{}}>
                    {t}{t===item.type?" ✓":""}
                  </div>
                )})}
              </div>
            )})}
          </div>,
          document.body
        )}
        <InlineRename value={item.name} fallback=""
          onChange={function(nw){props.onChange(Object.assign({},item,{name:nw}))}}
          labelStyle={{fontSize:11,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",
            fontStyle:"italic",padding:"2px 0"}}/>
        <button onClick={handleDel} style={{minHeight:32,padding:"0 10px",fontSize:armed?10:14,
          background:armed?"rgba(224,48,96,.2)":"none",border:armed?"1px solid var(--dng)":"none",
          color:armed?"var(--dng)":"var(--mu)",borderRadius:6,minWidth:armed?70:32}}>
          {armed?"confirm ×":"×"}
        </button>
      </div>
      {!coll&&<TabBar tabs={tabs} active={tab} onChange={setTab}/>}
      {!coll&&(
        <div style={{display:tab==="primary"?"":"none"}} className="card-body">
          <EfxPrimary efx={item} onChange={props.onChange}
            nodes={props.nodes} selfId={props.selfId} iC={props.iC}
            sourceId={props.sourceId}/>
        </div>
      )}
      {!coll&&(
        <div style={{display:tab==="isolate"?"":"none",padding:10}}>
          <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:8}}>
            <span style={{fontSize:9,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",
              textTransform:"uppercase",letterSpacing:".07em",flexShrink:0}}>attr</span>
            <input value={item.isolateAttr||""} placeholder={"isolate_"+(ci+1)}
              onChange={function(e){props.onChange(Object.assign({},item,{isolateAttr:e.target.value}))}}
              style={{flex:1,fontSize:10,padding:"3px 6px",background:"var(--sf)",border:"1px solid var(--bd)",
                borderRadius:4,color:"var(--tx)",fontFamily:"'IBM Plex Mono',monospace"}}/>

          </div>
          <MaskStackPanel
            key={(item.isolate||[]).map(function(m){return m.id}).join(",")}
            stack={item.isolate||[]} nodes={props.nodes} selfId={props.selfId}
            navPush={props.navPush} iC={props.iC}
            basePath={{slotKey:"chain["+ci+"].isolate", steps:[]}}
            onNavigate={props.onNavigate}
            onChange={function(ms){props.onChange(Object.assign({},item,{isolate:ms}))}}/>
        </div>
      )}
      {/* Attributes tab — show-points only: global label positioning + per-label list */}
      {!coll&&isShowPoints&&(
        <div style={{display:tab==="attributes"?"":"none"}}>
          {/* Global positioning settings — apply to all labels */}
          <div className="card-body" style={{borderBottom:"1px solid var(--bd)"}}>
            <Sl l="X offset" v={item.params&&item.params.labelOffsetX!=null?item.params.labelOffsetX:10}
              mn={-60} mx={120} st={1} fmt={function(v){return Math.round(v)+"px"}}
              fn={function(v){upSP({labelOffsetX:v})}}/>
            <Sl l="Y offset" v={item.params&&item.params.labelOffsetY!=null?item.params.labelOffsetY:-4}
              mn={-60} mx={60} st={1} fmt={function(v){return Math.round(v)+"px"}}
              fn={function(v){upSP({labelOffsetY:v})}}/>
            <Sl l="line space" v={item.params&&item.params.labelLineSpacing!=null?item.params.labelLineSpacing:11}
              mn={6} mx={40} st={.5} fmt={function(v){return v.toFixed(1)+"px"}}
              fn={function(v){upSP({labelLineSpacing:v})}}/>
          </div>
          {/* Per-label list */}
          <div style={{padding:10}}>
            {spLabels.length===0&&(
              <div className="empty" style={{padding:"6px 0 10px"}}>no labels — tap + to add</div>
            )}
            {spLabels.map(function(lbl,li){
              function updLbl(patch){
                upSP({labels:spLabels.map(function(l,i){return i===li?Object.assign({},l,patch):l})})
              }
              return (
                <div key={lbl.id||li} style={{borderBottom:"1px solid var(--bd)",paddingBottom:8,marginBottom:8}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:4}}>
                    <button onClick={function(){updLbl({enabled:lbl.enabled===false?true:false})}}
                      style={{width:16,height:16,minWidth:16,minHeight:16,borderRadius:"50%",
                        border:"2px solid "+(lbl.enabled===false?"var(--bd)":"var(--ac)"),
                        background:lbl.enabled===false?"none":"var(--ac)",
                        flexShrink:0,cursor:"pointer",padding:0,boxSizing:"content-box"}}/>
                    <span style={{flex:1,fontSize:9,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",
                      textDecoration:lbl.enabled===false?"line-through":"none"}}>label {li+1}</span>
                    <button onClick={function(){upSP({labels:spLabels.filter(function(_,i){return i!==li})})}}
                      className="ghost" style={{fontSize:11,padding:"2px 8px"}}>×</button>
                  </div>
                  <Se l="attr" v={lbl.attr||(spAllAttrs[0]||"pointIndex")}
                    opts={spAllAttrs.length?spAllAttrs:["pointIndex"]}
                    fn={function(v){updLbl({attr:v})}}/>
                  <Co l="colour" v={lbl.color||"#ffffff"} fn={function(v){updLbl({color:v})}}/>
                  <Sl l="size" v={lbl.size||9} mn={5} mx={72} st={1}
                    fmt={function(v){return Math.round(v)+"px"}}
                    fn={function(v){updLbl({size:v})}}/>
                </div>
              )
            })}
            <button className="ac" style={{width:"100%"}} onClick={function(){
              upSP({labels:spLabels.concat([{id:String(Date.now()),attr:spAllAttrs[0]||"pointIndex",color:"#ffffff",size:9,enabled:true}])})
            }}>+ add label</button>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── POINT COMP PROPS ────────────────────────────────── */
function PointCompProps(props) {
  var node=props.node, onChange=props.onChange, nodes=props.nodes
  var navSt=useState([]); var navStack=navSt[0], setNavStack=navSt[1]
  // Source card tabs: Source | Modifiers | Isolate
  var srcTabSt=useState("source"); var srcTab=srcTabSt[0], setSrcTab=srcTabSt[1]
  // Output tabs: Modifiers | Mask
  var outTabSt=useState("modifiers"); var outTab=outTabSt[0], setOutTab=outTabSt[1]
  // Source chain add-modifier popover
  var addModOpenSt=useState(false); var addModOpen=addModOpenSt[0], setAddModOpen=addModOpenSt[1]
  var addModAnchorRef=useRef(null), addModMenuRef=useRef(null)
  var addModPos=usePopoverPosition(addModAnchorRef, addModOpen, "above")
  useEffect(function(){
    if(!addModOpen) return
    function h(e){
      if(addModAnchorRef.current&&addModAnchorRef.current.contains(e.target)) return
      if(addModMenuRef.current&&addModMenuRef.current.contains(e.target)) return
      setAddModOpen(false)
    }
    document.addEventListener("mousedown",h)
    return function(){document.removeEventListener("mousedown",h)}
  },[addModOpen])
  // Output chain add-modifier popover
  var outAddModOpenSt=useState(false); var outAddModOpen=outAddModOpenSt[0], setOutAddModOpen=outAddModOpenSt[1]
  var outAddModAnchorRef=useRef(null), outAddModMenuRef=useRef(null)
  var outAddModPos=usePopoverPosition(outAddModAnchorRef, outAddModOpen, "above")
  useEffect(function(){
    if(!outAddModOpen) return
    function h(e){
      if(outAddModAnchorRef.current&&outAddModAnchorRef.current.contains(e.target)) return
      if(outAddModMenuRef.current&&outAddModMenuRef.current.contains(e.target)) return
      setOutAddModOpen(false)
    }
    document.addEventListener("mousedown",h)
    return function(){document.removeEventListener("mousedown",h)}
  },[outAddModOpen])
  function navPush(item){setNavStack(function(s){return s.concat([item])})}
  var lastAddRef=useRef(0)  // must be above drill-view early return (hooks must be unconditional)

  // Drill-down: isolate mask → effect stack editing
  if(navStack.length>0){
    var top=navStack[navStack.length-1]
    var topSteps=(top.parentSteps||[]).concat(top.kind?[{kind:top.kind,id:top.id}]:top.steps||[])
    var drillTarget=resolvePath(node,top.slotKey,topSteps)
    if(!drillTarget){setTimeout(function(){setNavStack([])},0)
      return <div style={{padding:20,color:"var(--mu)",fontSize:11}}>Target gone — returning…</div>}
    function jumpTo(idx){setNavStack(function(s){return s.slice(0,idx)})}
    var isEffDrill=top.kind==="effect"
    var drillStack=isEffDrill?(drillTarget.maskStack||[]):(drillTarget.effectStack||[])
    return (
      <div style={{display:"flex",flexDirection:"column",minHeight:300}}>
        <div className="breadcrumb">
          <span className="bc-item" onClick={function(){setNavStack([])}}>{node.name}</span>
          {navStack.map(function(n,i){
            var isCur=i===navStack.length-1
            return (
              <span key={i} style={{display:"flex",alignItems:"center",gap:4,flexShrink:0}}>
                <span style={{color:"var(--mu)",margin:"0 2px"}}>›</span>
                <span className={"bc-item"+(isCur?" cur":"")} onClick={function(){jumpTo(i)}}>{n.label}</span>
              </span>
            )
          })}
        </div>
        <div style={{flex:1,overflowY:"auto",padding:10}}>
          {isEffDrill
            ? <MaskStackPanel key={top.id+"_masks"}
                stack={drillStack} nodes={nodes} selfId={node.id}
                navPush={navPush} iC={props.iC}
                basePath={{slotKey:top.slotKey,steps:topSteps}}
                onNavigate={props.onNavigate}
                onChange={function(ms){onChange(updatePath(node,top.slotKey,topSteps,function(e){return Object.assign({},e,{maskStack:ms})}))}}/>
            : <EfxStack key={top.id+"_efxdrll"}
                stack={drillStack} nodes={nodes} selfId={node.id}
                navPush={navPush} filterTypes={ISOLATE_MASK_EFFECTS}
                iC={props.iC}
                basePath={{slotKey:top.slotKey,steps:topSteps}}
                onNavigate={props.onNavigate}
                onChange={function(es){
                  var slk=top.slotKey,stp=topSteps.slice()
                  var upd=updatePath(node,slk,stp,function(m){return Object.assign({},m,{effectStack:es})})
                  if(upd) onChange(upd)
                }}/>
          }
        </div>
      </div>
    )
  }

  var chain=node.chain||[]
  var nChain=chain.filter(function(it){return it.type!=="_source"}).length
  var nIso=(node.isolate||[]).length
  var nOutMask=(node.outMask||[]).length

  function updChain(idx,patch){
    var nc=chain.map(function(it,i){return i===idx?Object.assign({},it,patch):it})
    onChange(Object.assign({},node,{chain:nc}))
  }
  function delChain(idx){onChange(Object.assign({},node,{chain:chain.filter(function(_,i){return i!==idx})}))}
  function moveChain(idx,dir){
    var ni=Math.max(0,Math.min(chain.length-1,idx+dir)); if(ni===idx)return
    var a=chain.slice(); var tmp=a[idx]; a[idx]=a[ni]; a[ni]=tmp
    onChange(Object.assign({},node,{chain:a}))
  }
  function addModifier(t){
    var now=Date.now()
    if(now-lastAddRef.current<250) return  // guard against duplicate fires
    lastAddRef.current=now
    onChange(Object.assign({},node,{chain:chain.concat([mkPointChainItem(t)])}))
  }
  // Toggle chain item isolate mask display in the main preview
  function dispChainIso(chainIdx){
    if(!props.dspSlot) return
    props.dspSlot(node.id,"chain_isolate_"+chainIdx)
  }
  function dispOutChainIso(outIdx){
    if(!props.dspSlot) return
    props.dspSlot(node.id,"out_isolate_"+outIdx)
  }
  function dispSourceIso(){
    if(!props.dspSlot) return
    props.dspSlot(node.id,"source_isolate")
  }

  // Output chain handlers (point context — runs before render)
  var outMods=node.outModifiers||[]
  var nOutMod=outMods.length
  function updOutChain(idx,patch){
    var nc=outMods.map(function(it,i){return i===idx?Object.assign({},it,patch):it})
    onChange(Object.assign({},node,{outModifiers:nc}))
  }
  function delOutChain(idx){onChange(Object.assign({},node,{outModifiers:outMods.filter(function(_,i){return i!==idx})}))}
  function moveOutChain(idx,dir){
    var ni=Math.max(0,Math.min(outMods.length-1,idx+dir)); if(ni===idx)return
    var a=outMods.slice(); var tmp=a[idx]; a[idx]=a[ni]; a[ni]=tmp
    onChange(Object.assign({},node,{outModifiers:a}))
  }
  function addOutModifier(t){
    var now=Date.now()
    if(now-lastAddRef.current<250) return
    lastAddRef.current=now
    onChange(Object.assign({},node,{outModifiers:outMods.concat([mkPointChainItem(t)])}))
  }

  var modGroups=EFX_GROUPS.map(function(g){
    var fi=g.items.filter(function(t){return POINT_CONTEXT_EFFECTS.includes(t)})
    return fi.length?{label:g.label,items:fi}:null
  }).filter(Boolean)

  var srcTabs=[
    {id:"source",    label:"Source"},
    {id:"modifiers", label:"Modifiers"+(nChain>0?" ("+nChain+")":""), color:"ac"},
    {id:"isolate",   label:"Isolate"+(nIso>0?" ("+nIso+")":""),       color:"lv"},
  ]
  var outTabs=[
    {id:"modifiers",label:"Modifiers"+(nOutMod>0?" ("+nOutMod+")":""),color:"ac"},
    {id:"masks",    label:"Masks"+(nOutMask>0?" ("+nOutMask+")":""),  color:"lv"},
  ]

  return (
    <div style={{padding:10,overflowY:"auto"}}>

      {/* ── Source card: Source | Modifiers | Isolate (mirrors LayerCard pattern) */}
      <div className="card" style={{marginBottom:10}}>
        <div className="card-hdr" style={{background:"rgba(176,96,240,.06)"}}>
          <span style={{flex:1,fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,
            textTransform:"uppercase",letterSpacing:".1em",color:"var(--lv)"}}>Source</span>
        </div>
        <TabBar tabs={srcTabs} active={srcTab} onChange={setSrcTab}/>

        {(
          <div style={{display:srcTab==="source"?"":"none"}} className="card-body">
            <NRef l="source" v={node.refId||null} nodes={nodes} selfId={node.id}
              iC={props.iC} mode="source"
              fn={function(v){onChange(Object.assign({},node,{refId:v}))}}/>
          </div>
        )}

        {(
          <div style={{display:srcTab==="modifiers"?"":"none",padding:10}}>
            {nChain===0&&<div className="empty">no modifiers — tap + to add</div>}
            {chain.filter(function(it){return it.type!=="_source"}).map(function(item,ci2,filt){
              var realIdx=chain.indexOf(item)
              return (
                <PointChainItemCard key={item.id} item={item} index={realIdx}
                  isFirst={ci2===0} isLast={ci2===filt.length-1}
                  nodes={nodes} selfId={node.id} iC={props.iC}
                  sourceId={node.refId}
                  navPush={navPush} onNavigate={props.onNavigate}
                  nodeId={node.id} dispSlot={props.dispSlot}
                  onDispIso={dispChainIso}
                  onMove={function(dir){moveChain(realIdx,dir)}}
                  onDel={function(){delChain(realIdx)}}
                  onChange={function(patch){updChain(realIdx,patch)}}/>
              )
            })}
            <div ref={addModAnchorRef} style={{display:"flex",gap:4,position:"relative",marginTop:nChain>0?6:0}}>
              {nChain>0&&(function(){
                var srcChain=chain.filter(function(it){return it.type!=="_source"})
                var anyDisabled=srcChain.some(function(it){return it.enabled===false})
                return (
                  <button title={anyDisabled?"Enable all":"Disable all"}
                    onClick={function(){
                      var en=anyDisabled
                      onChange(Object.assign({},node,{chain:chain.map(function(it){
                        return it.type==="_source"?it:Object.assign({},it,{enabled:en})
                      })}))
                    }}
                    style={{fontSize:14,width:36,flexShrink:0,borderRadius:6,cursor:"pointer",
                      color:anyDisabled?"var(--mu)":"var(--ac)",
                      background:"none",border:"1px solid var(--bd)"}}>
                    {anyDisabled?"○":"●"}
                  </button>
                )
              })()}
              <button className="ac" style={{flex:1,fontSize:11,minHeight:36}}
                onClick={function(){setAddModOpen(!addModOpen)}}>+ modifier</button>
              {addModOpen&&addModPos&&createPortal(
                <div ref={addModMenuRef} className="eff-menu" style={addModPos}>
                  {modGroups.map(function(grp){return (
                    <div key={grp.label}>
                      <div className="drop-grp">{grp.label}</div>
                      {grp.items.map(function(t){return (
                        <div key={t} className="drop-item"
                          onClick={function(e){e.stopPropagation();addModifier(t);setAddModOpen(false)}}>{t}</div>
                      )})}
                    </div>
                  )})}
                </div>,
                document.body
              )}
            </div>
          </div>
        )}

        {(
          <div style={{display:srcTab==="isolate"?"":"none",padding:10}}>
            <div style={{fontSize:9,color:"var(--mu)",marginBottom:6,lineHeight:1.5}}>
              Spatial filter — restricts which points from the source enter the modifier chain.
            </div>
            <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:8}}>
              <span style={{fontSize:9,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",textTransform:"uppercase",letterSpacing:".07em",flexShrink:0}}>attr</span>
              <input value={node.isolateAttr||""} placeholder="isolate"
                onChange={function(e){onChange(Object.assign({},node,{isolateAttr:e.target.value}))}}
                style={{flex:1,fontSize:10,padding:"3px 6px",background:"var(--sf)",border:"1px solid var(--bd)",
                  borderRadius:4,color:"var(--tx)",fontFamily:"'IBM Plex Mono',monospace"}}/>

            </div>
            <MaskStackPanel
              key={(node.isolate||[]).map(function(m){return m.id}).join(",")}
              stack={node.isolate||[]} nodes={nodes} selfId={node.id}
              navPush={navPush} iC={props.iC}
              basePath={{slotKey:"isolate",steps:[]}}
              onNavigate={props.onNavigate}
              onChange={function(ms){onChange(Object.assign({},node,{isolate:ms}))}}/>
          </div>
        )}
      </div>

      {/* ── Output card: second point-context chain + output mask ─── */}
      <div className="card">
        <div className="card-hdr" style={{background:"rgba(176,96,240,.06)"}}>
          <span style={{flex:1,fontSize:11,fontFamily:"'Syne',sans-serif",fontWeight:700,
            textTransform:"uppercase",letterSpacing:".1em",color:"var(--lv)"}}>Output</span>
        </div>
        <TabBar tabs={[
          {id:"modifiers",label:"Modifiers"+(nOutMod>0?" ("+nOutMod+")":""),color:"ac"},
          {id:"mask",     label:"Mask"+(nOutMask>0?" ("+nOutMask+")":""),   color:"lv"},
        ]} active={outTab} onChange={setOutTab}/>
        {(
          <div style={{display:outTab==="modifiers"?"":"none",padding:10}}>
            {nOutMod===0&&<div className="empty">no output modifiers — tap + to add</div>}
            {outMods.map(function(item,oi){
              return (
                <PointChainItemCard key={item.id} item={item} index={oi}
                  isFirst={oi===0} isLast={oi===outMods.length-1}
                  nodes={nodes} selfId={node.id} iC={props.iC}
                  sourceId={node.refId}
                  navPush={navPush} onNavigate={props.onNavigate}
                  nodeId={node.id} dispSlot={props.dispSlot}
                  onDispIso={dispOutChainIso}
                  onMove={function(dir){moveOutChain(oi,dir)}}
                  onDel={function(){delOutChain(oi)}}
                  onChange={function(patch){updOutChain(oi,patch)}}/>
              )
            })}
            <div ref={outAddModAnchorRef} style={{display:"flex",gap:4,position:"relative",marginTop:nOutMod>0?6:0}}>
              {nOutMod>0&&(function(){
                var anyDisabled=outMods.some(function(it){return it.enabled===false})
                return (
                  <button title={anyDisabled?"Enable all":"Disable all"}
                    onClick={function(){
                      var en=anyDisabled
                      onChange(Object.assign({},node,{outModifiers:outMods.map(function(it){return Object.assign({},it,{enabled:en})})}))
                    }}
                    style={{fontSize:14,width:36,flexShrink:0,borderRadius:6,cursor:"pointer",
                      color:anyDisabled?"var(--mu)":"var(--ac)",
                      background:"none",border:"1px solid var(--bd)"}}>
                    {anyDisabled?"○":"●"}
                  </button>
                )
              })()}
              <button className="ac" style={{flex:1,fontSize:11,minHeight:36}}
                onClick={function(){setOutAddModOpen(!outAddModOpen)}}>+ modifier</button>
              {outAddModOpen&&outAddModPos&&createPortal(
                <div ref={outAddModMenuRef} className="eff-menu" style={outAddModPos}>
                  {modGroups.map(function(grp){return (
                    <div key={grp.label}>
                      <div className="drop-grp">{grp.label}</div>
                      {grp.items.map(function(t){return (
                        <div key={t} className="drop-item"
                          onClick={function(e){e.stopPropagation();addOutModifier(t);setOutAddModOpen(false)}}>{t}</div>
                      )})}
                    </div>
                  )})}
                </div>,
                document.body
              )}
            </div>
          </div>
        )}
        {(
          <div style={{display:outTab==="mask"?"":"none",padding:10}}>
            <MaskStackPanel stack={node.outMask||[]} nodes={nodes} selfId={node.id}
              navPush={navPush} iC={props.iC}
              basePath={{slotKey:"outMask",steps:[]}} onNavigate={props.onNavigate}
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
            ? <CreatorProps node={props.node} onUpdate={props.onUpdate} onLoad={props.onLoad} nodes={props.nodes} iC={props.iC}/>
            : props.node.type==="stack"
              ? <StackProps node={props.node} onChange={props.onUpdate} nodes={props.nodes} iC={props.iC}
                  onPromote={props.onPromote} onExtract={props.onExtract} onNavigate={props.onNavigate}/>
              : props.node.type==="layers"
                ? <LayerCompProps node={props.node} onChange={props.onUpdate} nodes={props.nodes} iC={props.iC}
                    onPromote={props.onPromote} onNavigate={props.onNavigate}/>
                : props.node.type==="point-comp"
                  ? <PointCompProps node={props.node} onChange={props.onUpdate} nodes={props.nodes} iC={props.iC} onNavigate={props.onNavigate}/>
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
            filterTypes={ISOLATE_MASK_EFFECTS}
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
                      ? <CreatorProps node={node} onUpdate={props.onUpd} onLoad={props.onLoad} nodes={props.nodes} iC={props.iC}/>
                      : node.type==="blender"
                        ? <BlenderProps node={node} onChange={props.onUpd} nodes={props.nodes} iC={props.iC} onExtract={props.onExtract} onPromote={props.onPromote} dspSlot={props.dspSlot} dispSlot={props.dispSlot} onDsp={props.onDsp} dispId={props.dispId} dispMask={props.dispMask} onNavigate={props.onNavigate}/>
                        : node.type==="layers"
                          ? <LayerCompProps node={node} onChange={props.onUpd} nodes={props.nodes} iC={props.iC} onPromote={props.onPromote} onNavigate={props.onNavigate}/>
                        : node.type==="stack"
                          ? <StackProps node={node} onChange={props.onUpd} nodes={props.nodes} iC={props.iC} onPromote={props.onPromote} onNavigate={props.onNavigate}/>
                          : node.type==="point-comp"
                            ? <PointCompProps node={node} onChange={props.onUpd} nodes={props.nodes} iC={props.iC} onNavigate={props.onNavigate} dspSlot={props.dspSlot} dispSlot={props.dispSlot}/>
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
                        {node.type==="point-comp"
                          ? <PointCompProps node={node} onChange={props.onUpd} nodes={props.nodes} iC={props.iC} onNavigate={props.onNavigate} dspSlot={props.dspSlot} dispSlot={props.dispSlot}/>
                          : <PromotedProps node={node} nodes={props.nodes}/>}
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
          <Section sec={1} title="§1 · Creators" {...props.sp}
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
      <Section sec={1} title="§1 · Creators" {...props.sp}
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
  var projNameSt=useState("Untitled"); var projName=projNameSt[0],setProjName=projNameSt[1]
  var autoSaveIntSt=useState(0); var autoSaveInt=autoSaveIntSt[0],setAutoSaveInt=autoSaveIntSt[1]
  var autoSaveTmr=useRef(null)
  var fileInputRef=useRef(null)
  var loadDialogSt=useState(false); var loadDialog=loadDialogSt[0],setLoadDialog=loadDialogSt[1]
  var saveDialogSt=useState(false); var saveDialog=saveDialogSt[0],setSaveDialog=saveDialogSt[1]
  var recentProjSt=useState(function(){
    try{var r=localStorage.getItem("nlics:recent");return r?JSON.parse(r):[]}catch(e){return[]}
  }); var recentProj=recentProjSt[0],setRecentProj=recentProjSt[1]

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
  // ── Project save / load ──────────────────────────────────────────────────
  function saveProject(setDefault) {
    try {
      var savedAt=new Date().toISOString()
      var payload={version:"1.0",appName:"Selena",fileType:"nlics",name:projName,savedAt:savedAt,nodes:nodes,_uid:_uid,dispId:dispId}
      var data = JSON.stringify(payload, null, 2)
      var blob = new Blob([data], {type:"application/json"})
      var url = URL.createObjectURL(blob)
      var a = document.createElement("a")
      a.href=url; a.download=(projName||"Untitled").replace(/[^a-z0-9_-]/gi,"_")+".nlics"
      document.body.appendChild(a); a.click()
      document.body.removeChild(a); URL.revokeObjectURL(url)
      // Store in recent projects list
      var entry={name:projName,savedAt:savedAt,nodeCount:nodes.length,_legacy:false,data:payload}
      var recent=recentProj.filter(function(r){return r.name!==projName}).slice(0,9)
      recent.unshift(entry)
      setRecentProj(recent)
      // Store metadata only — omit .data to stay within localStorage quota
      var recentMeta=recent.map(function(r){return {name:r.name,savedAt:r.savedAt,nodeCount:r.nodeCount,_legacy:r._legacy}})
      try{localStorage.setItem("nlics:recent",JSON.stringify(recentMeta))}catch(e){}
      // Optionally set as default startup project
      if(setDefault) {
        try{localStorage.setItem("nlics:default-project",data);localStorage.setItem("nlics:default-project-name",projName)}catch(e){}
      }
    } catch(e) { console.error("Save failed",e) }
  }
  function applyLoadedProject(data) {
    if(!data||!Array.isArray(data.nodes)){
      console.error("applyLoadedProject: invalid data",data)
      alert("Could not load — file does not contain valid project data")
      return
    }
    console.log("Loading project:",data.name,"nodes:",data.nodes.length)
    // Pre-load any embedded image data URLs into iC
    data.nodes.forEach(function(n){
      if(n.type==="image"&&n.props&&n.props.url&&n.props.url.startsWith("data:")){
        var img=new Image(); img.src=n.props.url
        iC.current.set(n.props.url,img)
      }
    })
    pushHistory({nodes:nodes})
    restoreUid(data._uid, data.nodes)
    // Apply all state updates together
    setNodes(data.nodes)
    setProjName(data.name||"Untitled")
    iC.current = new Map()
    // Set display to last enabled §2 node
    var s2=data.nodes.filter(function(n){return n.section===2&&n.enabled!==false})
    // Use saved dispId if valid, else fall back to last §2 node
    var savedDisp=data.dispId&&data.nodes.find(function(n){return n.id===data.dispId})
    var newDispId=savedDisp?data.dispId:(s2.length>0?s2[s2.length-1].id:null)
    console.log("Setting dispId to:",newDispId)
    setDispId(newDispId)
    setDispMask(false)
    setDispSlot(null)
    setSelId(null)
    showToast()
    // Add to recent
    var entry={name:data.name||"Untitled",savedAt:data.savedAt||new Date().toISOString(),
      nodeCount:data.nodes.length,_legacy:!data._uid,data:data}
    var recent=recentProj.filter(function(r){return r.name!==(data.name||"Untitled")}).slice(0,9)
    recent.unshift(entry)
    setRecentProj(recent)
    // Store metadata only — omit .data to stay within localStorage quota
    var recentMeta=recent.map(function(r){return {name:r.name,savedAt:r.savedAt,nodeCount:r.nodeCount,_legacy:r._legacy}})
    try{localStorage.setItem("nlics:recent",JSON.stringify(recentMeta))}catch(e){}
  }
  function loadProject(file) {
    if(!file){console.warn("loadProject: no file");return}
    console.log("loadProject: reading",file.name,file.size,"bytes")
    // Use modern Promise API if available, fallback to FileReader
    if(file.text){
      file.text().then(function(text){
        try{
          var data=JSON.parse(text)
          applyLoadedProject(data)
        }catch(e){
          console.error("loadProject parse error:",e)
          alert("Could not load — file is not valid JSON: "+e.message)
        }
      }).catch(function(e){
        console.error("loadProject read error:",e)
        alert("Could not read file: "+e.message)
      })
    } else {
      var reader=new FileReader()
      reader.onload=function(ev){
        try{
          var data=JSON.parse(ev.target.result)
          applyLoadedProject(data)
        }catch(e){
          console.error("loadProject parse error:",e)
          alert("Could not load — file is not valid JSON: "+e.message)
        }
      }
      reader.onerror=function(e){
        console.error("FileReader error:",e)
        alert("Could not read file")
      }
      reader.readAsText(file)
    }
  }
  function autoSaveNow() {
    try {
      var st=stRef.current
      var data = JSON.stringify({version:"1.0",name:st.projName||projName,nodes:st.nodes||nodes,
        savedAt:new Date().toISOString(),_uid:_uid,dispId:st.dispId||dispId})
      localStorage.setItem("nlics:autosave",data)
      localStorage.setItem("nlics:autosave:name",st.projName||projName)
    } catch(e) {}
  }
  // Auto-save interval
  useEffect(function(){
    if(autoSaveTmr.current) clearInterval(autoSaveTmr.current)
    if(autoSaveInt>0) autoSaveTmr.current=setInterval(autoSaveNow, autoSaveInt*60000)
    return function(){if(autoSaveTmr.current)clearInterval(autoSaveTmr.current)}
  },[autoSaveInt, nodes, projName])
  // Auto-save on page unload
  useEffect(function(){
    function onUnload(){autoSaveNow()}
    window.addEventListener("beforeunload",onUnload)
    return function(){window.removeEventListener("beforeunload",onUnload)}
  },[nodes,projName])

  function doUndo() {
    var ring = histRef.current
    if (ring.length === 0) return
    var snap = ring.pop()
    setNodes(snap.nodes)
    showToast()
  }

  useEffect(function(){stRef.current={nodes:nodes,dispId:dispId,dispMask:dispMask,dispSlot:dispSlot,projName:projName}},[nodes,dispId,dispMask,dispSlot,projName])

  // ── Persist settings via localStorage ───────────────────────────────────
  // Works on GitHub Pages, local dev, and any browser.
  // Wrapped in try/catch — localStorage throws in private mode with full quota.
  // Load default project on startup if set
  useEffect(function(){
    try {
      var def=localStorage.getItem("nlics:default-project")
      var defName=localStorage.getItem("nlics:default-project-name")
      if(defName==="__blank__"){
        setNodes([]); setProjName("Untitled")
      } else if(def&&defName){
        try{
          var d=JSON.parse(def)
          if(d&&d.nodes){
            if(!d.name)d.name=defName
            applyLoadedProject(d)
          }
        }catch(de){console.warn("Default project parse failed",de)}
      }
    }catch(e){console.warn("Default project load failed:",e)}
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

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
  function add(type,sec){pushHistory({nodes:nodes});var n=type==="blender"?mkBlender():type==="layers"?mkLayerComp():type==="point-comp"?mkPointComp():type==="rasterise"?mkRasterise():type==="isolate"?mkIsolate():type==="stack-effect"?mkStack("effect"):type==="stack-mask"?mkStack("mask"):mkNode(type);n.section=sec;setNodes(function(p){return p.concat([n])});setSelId(n.id)}
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
        <span style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:800,color:"var(--ac)",letterSpacing:".2em"}}>Selena</span>
        <input defaultValue={projName}
          onBlur={function(e){setProjName(e.target.value)}}
          onKeyDown={function(e){if(e.key==="Enter"||e.key==="Escape")e.target.blur()}}
          style={{fontSize:10,fontFamily:"'IBM Plex Mono',monospace",color:"var(--tx)",
            background:"none",border:"none",borderBottom:"1px solid var(--bd)",
            outline:"none",width:90,padding:"1px 4px",marginLeft:4}}
          placeholder="project name"/>
        <button onClick={function(){saveProject(false)}} className="hico" title="Save project">↓</button>
        <button onClick={function(){setLoadDialog(true)}} className="hico" title="Load project">↑</button>
        <input ref={fileInputRef} type="file"
          accept=".nlics,.json,application/json,application/octet-stream"
          style={{display:"none"}} onChange={function(e){loadProject(e.target.files[0]);e.target.value="";setLoadDialog(false)}}/>
        <span style={{flex:1}}/>
        <button className="hico" title="Layout settings" onClick={function(){setSettingsOpen(true)}}>⚙</button>
        <button className={"hico"+(rightFS?" exit":"")} title={rightFS?"Exit preview fullscreen":"Fullscreen preview"} onClick={function(){setRightFS(!rightFS)}}>{rightFS?"⊠":"⊡"}</button>
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
        <button className={"hico"+(rightFS?" exit":"")} title={rightFS?"Exit full screen":"Full screen preview"}
          onClick={function(){setRightFS(!rightFS)}}>{rightFS?"⊠":"⊡"}</button>
      </div>
    )
  }


  // ── Load project dialog ────────────────────────────────────────────────────
  var armedDelIdxSt=useState(null); var armedDelIdx=armedDelIdxSt[0],setArmedDelIdx=armedDelIdxSt[1]
  var LoadDialog = loadDialog ? (
    <div style={{position:"fixed",inset:0,zIndex:9999,background:"rgba(4,4,18,.88)",display:"flex",alignItems:"flex-end"}}
      onClick={function(e){if(e.target===e.currentTarget){setLoadDialog(false);setArmedDelIdx(null)}}}>
      <div style={{width:"100%",background:"var(--pn)",borderRadius:"18px 18px 0 0",maxHeight:"70vh",display:"flex",flexDirection:"column",overflow:"hidden"}}>
        <div style={{display:"flex",alignItems:"center",padding:"14px 16px 8px",borderBottom:"1px solid var(--bd)"}}>
          <span style={{flex:1,fontFamily:"'Syne',sans-serif",fontWeight:700,fontSize:13}}>Load Project</span>
          <button className="icon-btn" onClick={function(){setLoadDialog(false);setArmedDelIdx(null)}} style={{fontSize:20,color:"var(--mu)"}}>×</button>
        </div>
        <div style={{overflowY:"auto",flex:1,padding:"8px 0"}} onClick={function(e){
          // Reset armed delete when clicking anywhere in dialog that isn't a × button
          if(e.target.textContent!=="confirm ×"&&e.target.textContent!=="×") setArmedDelIdx(null)
        }}>
          {/* Blank project — always available as default option */}
          <div style={{padding:"6px 16px 3px",fontSize:8,color:"var(--mu)",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"'IBM Plex Mono',monospace"}}>Blank</div>
          {(function(){
            var blankIsDefault=(localStorage.getItem("nlics:default-project-name")||"")==="__blank__"
            return (
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 16px",borderBottom:"1px solid var(--bd)"}}>
                <div style={{flex:1,cursor:"pointer"}} onClick={function(){
                  setNodes([]);setProjName("Untitled");setLoadDialog(false)
                }}>
                  <div style={{fontSize:12,color:blankIsDefault?"var(--lv)":"var(--tx)"}}>Blank Project</div>
                  <div style={{fontSize:9,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",marginTop:2}}>Start with an empty canvas</div>
                </div>
                {blankIsDefault
                  ? <span style={{fontSize:8,color:"var(--lv)",fontFamily:"'IBM Plex Mono',monospace",border:"1px solid var(--lv)",borderRadius:3,padding:"1px 5px",flexShrink:0,letterSpacing:".06em",textTransform:"uppercase"}}>default</span>
                  : <button onClick={function(){
                      try{localStorage.setItem("nlics:default-project-name","__blank__");localStorage.removeItem("nlics:default-project")}catch(e){}
                      setLoadDialog(false); setTimeout(function(){setLoadDialog(true)},0)
                    }} style={{width:20,height:20,minWidth:20,minHeight:20,borderRadius:"50%",border:"2px solid var(--bd)",background:"none",flexShrink:0,cursor:"pointer",padding:0}}/>
                }
              </div>
            )
          })()}
          {recentProj.length>0&&<div>
            <div style={{display:"flex",alignItems:"center",padding:"6px 16px 3px"}}>
              <span style={{flex:1,fontSize:8,color:"var(--mu)",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"'IBM Plex Mono',monospace"}}>Recent</span>
              <button onClick={function(){
                var confirmed=window.confirm("Clear all recent projects?")
                if(confirmed){setRecentProj([]);try{localStorage.removeItem("nlics:recent")}catch(e){}}
              }} style={{fontSize:9,color:"var(--mu)",background:"none",border:"none",cursor:"pointer",
                fontFamily:"'IBM Plex Mono',monospace",padding:"0 0 0 8px"}}>clear all</button>
            </div>
            {recentProj.map(function(r,i){
              var defName=localStorage.getItem("nlics:default-project-name")||""
              var isDefault=r.name===defName
              var hasData=r.data&&Array.isArray(r.data.nodes)
              return (
                <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"10px 16px",borderBottom:"1px solid var(--bd)"}}>
                  <div style={{flex:1,cursor:"pointer",minWidth:0}} onClick={function(){
                    if(hasData){
                      applyLoadedProject(r.data)
                      setLoadDialog(false)
                    }
                    // legacy: file input is rendered inline below
                  }}>
                    <div style={{fontSize:12,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",
                      color:isDefault?"var(--lv)":r._legacy?"var(--mu)":"var(--tx)",
                      fontStyle:r._legacy?"italic":"normal"}}>
                      {r.name}{r._legacy?" ⚠":""}
                    </div>
                    <div style={{fontSize:9,color:"var(--mu)",fontFamily:"'IBM Plex Mono',monospace",marginTop:2}}>
                      {r.nodeCount} nodes · {new Date(r.savedAt).toLocaleDateString()}
                      {!hasData&&<span> · <label style={{color:"var(--ac)",cursor:"pointer",textDecoration:"underline"}}>
                        browse to load
                        <input type="file" accept=".nlics,.json,application/json,application/octet-stream"
                          style={{display:"none"}} onChange={function(e){
                            var f=e.target.files&&e.target.files[0]
                            if(f){loadProject(f);setLoadDialog(false)}
                            e.target.value=""
                          }}/>
                      </label></span>}
                    </div>
                  </div>
                  {isDefault
                    ? <span style={{fontSize:8,color:"var(--lv)",fontFamily:"'IBM Plex Mono',monospace",
                        border:"1px solid var(--lv)",borderRadius:3,padding:"1px 5px",
                        flexShrink:0,letterSpacing:".06em",textTransform:"uppercase"}}>default</span>
                    : <button onClick={function(){
                        try{
                          localStorage.setItem("nlics:default-project-name",r.name)
                          if(hasData){
                            // If this is the currently loaded project, use the live dispId
                            // so a display change after the last explicit save is honoured
                            var defData=r.name===projName
                              ?Object.assign({},r.data,{dispId:dispId})
                              :r.data
                            localStorage.setItem("nlics:default-project",JSON.stringify(defData))
                          }
                        }catch(e){}
                        setLoadDialog(false); setTimeout(function(){setLoadDialog(true)},0)
                      }} style={{width:20,height:20,minWidth:20,minHeight:20,borderRadius:"50%",
                        border:"2px solid var(--bd)",background:"none",
                        flexShrink:0,cursor:"pointer",padding:0}}/>
                  }
                  {(function(){
                    var armed=armedDelIdx===i
                    return <button
                      onClick={function(){
                        if(armed){
                          var newRecent=recentProj.filter(function(_,ri){return ri!==i})
                          setRecentProj(newRecent)
                          setArmedDelIdx(null)
                          try{localStorage.setItem("nlics:recent",JSON.stringify(newRecent))}catch(e){}
                        } else { setArmedDelIdx(i) }
                      }}
                      onBlur={function(){setArmedDelIdx(null)}}
                      style={{fontSize:10,color:armed?"var(--dng)":"var(--mu)",background:"none",
                        border:armed?"1px solid var(--dng)":"none",
                        borderRadius:3,cursor:"pointer",padding:armed?"2px 6px":"2px 4px",
                        flexShrink:0,fontFamily:"'IBM Plex Mono',monospace",transition:"all .15s"}}>
                      {armed?"confirm ×":"×"}
                    </button>
                  })()}
                </div>
              )
            })}
          </div>}
          <div style={{padding:"6px 16px 3px",fontSize:8,color:"var(--mu)",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"'IBM Plex Mono',monospace",marginTop:8}}>Current project</div>
          <div style={{padding:"10px 16px",display:"flex",gap:10,alignItems:"center"}}>
            <div style={{flex:1,fontSize:12,color:"var(--tx)"}}>{projName} <span style={{fontSize:9,color:"var(--mu)"}}>({nodes.length} nodes)</span></div>
            <button onClick={function(){saveProject(false)}} style={{fontSize:10,padding:"4px 12px",borderRadius:4,border:"1px solid var(--ac)",color:"var(--ac)",background:"rgba(36,204,168,.08)",cursor:"pointer",fontFamily:"'IBM Plex Mono',monospace"}}>
              save
            </button>
          </div>
          <div style={{padding:"6px 16px 3px",fontSize:8,color:"var(--mu)",textTransform:"uppercase",letterSpacing:".1em",fontFamily:"'IBM Plex Mono',monospace",marginTop:8}}>Browse files</div>
          <div style={{padding:"10px 16px"}}>
            <button onClick={function(){fileInputRef.current&&fileInputRef.current.click()}}
              style={{width:"100%",padding:"12px",borderRadius:8,border:"1px solid var(--bd)",
                background:"var(--el)",color:"var(--tx)",cursor:"pointer",fontSize:12,fontFamily:"'IBM Plex Mono',monospace"}}>
              Browse .nlics files…
            </button>
            <div style={{fontSize:9,color:"var(--mu)",marginTop:6,lineHeight:1.5}}>
              Opens your device file picker. Navigate to where your .nlics files are saved.
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null

  return (
    <div ref={appRef} onPointerMove={handleRootPointerMove} onPointerUp={handleRootPointerUp}
      style={{display:settings.viewMode==="unified"?"block":"flex",flexDirection:isVert?"column":"row",height:"100vh",width:"100vw",overflow:"hidden",background:"var(--bg)",fontFamily:"'IBM Plex Mono','Courier New',monospace",fontSize:12,color:"var(--tx)"}}>
      {LoadDialog}
      <StyleInjector />

      <SettingsSheet open={settingsOpen} onClose={function(){setSettingsOpen(false)}}
        settings={settings} onSettings={setSettings}
        isVert={isVert} onIsVert={setIsVert}
        flipped={flipped} onFlipped={setFlipped}
        autoSaveInt={autoSaveInt} onAutoSaveInt={setAutoSaveInt}/>

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
              ? <LivePreview cvRef={cvRef} active={active} sz={sz} onResize={handleResize} onExport={doExport} fullscreen={rightFS} onFullscreen={function(){setRightFS(!rightFS)}}/>
              : <div style={{display:"flex",flexDirection:"column",flex:1,overflow:"hidden",position:"relative"}}>
                  <Section sec={1} title="§1 · Creators" {...sp}
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
                  <Section sec={1} title="§1 · Creators" {...sp}
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
              : <LivePreview cvRef={cvRef} active={active} sz={sz} onResize={handleResize} onExport={doExport} fullscreen={rightFS} onFullscreen={function(){setRightFS(!rightFS)}}/>
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
