if(!self.define){let e,r={};const s=(s,i)=>(s=new URL(s+".js",i).href,r[s]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=r,document.head.appendChild(e)}else e=s,importScripts(s),r()})).then((()=>{let e=r[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,n)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(r[o])return;let d={};const c=e=>s(e,o),t={module:{uri:o},exports:d,require:c};r[o]=Promise.all(i.map((e=>t[e]||c(e)))).then((e=>(n(...e),d)))}}define(["./workbox-30e9d199"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index.88d52cdc.js",revision:null},{url:"assets/index.964aa6d6.css",revision:null},{url:"assets/Results.383fa18d.js",revision:null},{url:"assets/workbox-window.e5dea35c.js",revision:null},{url:"index.html",revision:"16cc7474798cb5b9f583c302d39f7c26"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"apple-touch-icon.png",revision:"4dfd967d988ebfcdf1bbe110d8965fa4"},{url:"android-chrome-192x192.png",revision:"46b749d1bc90378fa4280ec93a559441"},{url:"android-chrome-512x512.png",revision:"d133c2d626942c4ee86832923dd3ca27"},{url:"icons/arrow-left.svg",revision:"5344bb894484f478b2ad912ef0440436"},{url:"fonts/Inter-Bold.woff2",revision:"444a7284663a3bc886683eb81450b294"},{url:"fonts/Inter-Medium.woff2",revision:"75db5319e7e87c587019a5df08d7272c"},{url:"fonts/Inter-Regular.woff2",revision:"dc131113894217b5031000575d9de002"},{url:"manifest.webmanifest",revision:"477d1b0794c34ba6bbc84a85c536c099"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));