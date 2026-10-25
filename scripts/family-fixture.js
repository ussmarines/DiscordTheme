// Synthetic token contrast checks, deliberately separate from native Discord QA.
const fs = require('node:fs');
const { compileSourceCss, FONT_IMPORT } = require('./lib/build-theme');
const { FLAVORS } = require('./lib/flavors');
const candidates = FLAVORS.map(f => ({ id: f.id, css: compileSourceCss(f.id).replace(`@import url('${FONT_IMPORT}');`, '') }));
const script = `
const candidates=${JSON.stringify(candidates)};
(async()=>{
 const results=[];
 for(const candidate of candidates){
  const frame=document.createElement('iframe');frame.width=1101;frame.height=801;
  const ready=new Promise(resolve=>frame.onload=resolve);
  frame.srcdoc='<style>'+candidate.css+'</style><body class="theme-dark"><div id="app-mount"><nav class="guilds__5e434"><div data-list-item-id="guildsnav___home" style="color:white"><div class="childWrapper__6e9f8"><svg id="home"></svg></div></div></nav><div class="messagesWrapper__36d07">Test</div></div></body>';
  document.body.append(frame);await ready;
  const d=frame.contentDocument,w=frame.contentWindow;
  const canvas=d.createElement('canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true});
  const token=name=>{const el=d.createElement('i');el.style.color='var('+name+')';d.body.append(el);ctx.clearRect(0,0,1,1);ctx.fillStyle=w.getComputedStyle(el).color;ctx.fillRect(0,0,1,1);el.remove();return [...ctx.getImageData(0,0,1,1).data].slice(0,3)};
  const lum=c=>c.map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((sum,x,i)=>sum+x*[.2126,.7152,.0722][i],0);
  const ratio=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
  for(const surface of ['canvas','index','control','raised'])for(const text of ['foreground','muted','heading']){
   const value=ratio(token('--sibnight-'+text),token('--sibnight-'+surface));
   results.push({flavor:candidate.id,pair:text+'/'+surface,ratio:Math.round(value*100)/100,pass:value>=4.5});
  }
  const probe=d.createElement('i');probe.style.color='var(--sibnight-nord8)';d.body.append(probe);
  results.push({flavor:candidate.id,pair:'home-icon-accent',pass:w.getComputedStyle(d.querySelector('#home')).color===w.getComputedStyle(probe).color});probe.remove();
  const art=w.getComputedStyle(d.querySelector('.messagesWrapper__36d07')).backgroundImage;
  results.push({flavor:candidate.id,pair:'artwork',pass:(candidate.id==='sibylla'||candidate.id==='spatial')?art.includes('data:image'):art==='none'});
  frame.remove();
 }
 document.querySelector('pre').textContent=JSON.stringify(results,null,2);document.title=results.every(r=>r.pass)?'Family checks PASS':'Family checks FAIL';
})();`;
fs.writeFileSync('output/family-checks.html', `<!doctype html><meta charset="utf-8"><title>Family checks running</title><h1>Synthetic palette guards — not native Discord proof</h1><pre>Running</pre><script>${script.replaceAll('</', '<\\/')}</script>`);
console.log('output/family-checks.html written');
