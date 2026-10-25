const fs = require('node:fs');
const { compileSourceCss, FONT_IMPORT } = require('./lib/build-theme');
const css = compileSourceCss().replace(`@import url('${FONT_IMPORT}');`, '').replaceAll('</', '<\\/');
const html = `<!doctype html><meta charset="utf-8"><title>North Polar isolated CSS checks</title>
<h1>North Polar synthetic guards — not a Discord runtime test</h1><pre id="results">Running</pre>
<script>
const css=${JSON.stringify(css)};
(async()=>{
 const results=[];
 for(const width of [1600,1101]){
  const frame=document.createElement('iframe');frame.style.cssText='width:'+width+'px;height:801px';
  const ready=new Promise(r=>frame.onload=r);
  frame.srcdoc='<!doctype html><style>'+css+'</style><body class="theme-dark"><div id="app-mount"><div class="base__5e434"><aside class="sidebar__5e434"><nav class="guilds__5e434"><div class="listItem__650eb"><div class="blobContainer_e5445c"><div class="wrapper__6e9f8" data-list-item-id="guildsnav___home"><div class="childWrapper__6e9f8"><svg><path d="M0 0h1"/></svg></div></div></div></div></nav><div class="sidebarList__5e434">Index <span class="unread__2ea32">Unread</span></div></aside><div class="toolbar__9293f"><button class="iconWrapper__9293f" aria-label="Fils"><svg><path/></svg></button><button aria-label="Paramètres de notification"><svg><path/></svg></button><button aria-label="Messages épinglés"><svg><path/></svg></button></div><form class="form_f75fb0"><div class="channelTextArea_f75fb0"><div class="scrollableContainer__74017"><div class="inner__74017"><div class="attachWrapper__0923f"><button><svg/></button></div><div class="slateTextArea_ec4baf" contenteditable="true">Composer</div></div></div></div></form><div class="layerContainer__59d0d"><div class="menu_c1e9c4">Menu</div></div><div class="custom-user-profile-theme theme-dark" style="--background-primary:#123456;background:var(--background-primary)">Custom profile</div><button id="focus">Focus</button><div id="notice" style="color:var(--notice-text-critical);background:var(--notice-background-critical)">Critical notice</div></div></div></body>';
  document.body.append(frame);await ready;
  const d=frame.contentDocument,w=frame.contentWindow;
  const q=s=>d.querySelector(s),style=s=>w.getComputedStyle(q(s));
  const canvas=d.createElement('canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true});
  const rgb=c=>{ctx.clearRect(0,0,1,1);ctx.fillStyle=c;ctx.fillRect(0,0,1,1);return [...ctx.getImageData(0,0,1,1).data].slice(0,3)};
  const token=n=>{const p=d.createElement('span');p.style.color='var('+n+')';d.body.append(p);const c=rgb(w.getComputedStyle(p).color);p.remove();return c};
  const lum=c=>c.map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0);
  const contrast=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
  const surfaces=['--sibnight-canvas','--sibnight-index','--sibnight-control'].map(token);
  q('#focus').focus();
  // Reproduce the native grid and the distinct call/text header branches.
  // A nested thread header must not receive the main history reservation.
  const regression=d.createElement('div');
  regression.className='base__5e434 history-regression';
  regression.style.cssText='display:grid;grid-template-areas:"titleBar titleBar" "channelsList page";grid-template-columns:var(--sibnight-sidebar) 1fr;grid-template-rows:36px auto;position:relative';
  regression.innerHTML='<div class="bar_c38106"><div class="title_c38106">App title</div><div class="leading_c38106"><div class="backForwardButtons__63abb" style="display:flex"><div role="button" class="button__63abb" aria-label="Back"><svg width="16" height="16"></svg></div><div role="button" class="button__63abb" aria-label="Forward"><svg width="16" height="16"></svg></div></div></div><div class="trailing_c38106">Window controls</div></div><aside style="grid-area:channelsList">Index</aside><main class="page__5e434" style="grid-area:page"><div class="headerWrapper_cb9592"><div class="subtitleContainer__49508"><section class="headerBar__49508 container__9293f"><span class="probe-title">Voice title</span></section></div></div><section class="container__9293f probe-thread">Nested thread title</section></main>';
  q('#app-mount').append(regression);
  const historyRight=()=>regression.querySelector('.backForwardButtons__63abb').getBoundingClientRect().right;
  const voiceClear=regression.querySelector('.probe-title').getBoundingClientRect().left>=historyRight();
  const nestedUnshifted=w.getComputedStyle(regression.querySelector('.probe-thread')).paddingInlineStart!=='112px';
  regression.querySelector('.headerWrapper_cb9592').className='subtitleContainer_f75fb0';
  regression.querySelector('.subtitleContainer__49508').className='';
  regression.querySelector('.headerBar__49508').className='title_f75fb0 container__9293f';
  const textClear=regression.querySelector('.probe-title').getBoundingClientRect().left>=historyRight();
  regression.remove();
  // Native quality SVG children carry the levels; the theme must not flatten them.
  const quality=d.createElement('div');quality.className='connection_e131a9';
  quality.innerHTML=['Fine','Average','Bad'].map((level,i)=>'<span class="rtcConnectionQuality'+level+'__06d62"><svg class="ping__06d62 largePing__06d62" viewBox="0 0 16 16"><path fill-opacity="1" d="M1 12h3v3H1z"/><path fill-opacity="'+(i<2?1:.25)+'" d="M6 7h3v8H6z"/><path fill-opacity="'+(i===0?1:.25)+'" d="M11 1h3v14h-3z"/></svg></span>').join('');
  q('#app-mount').append(quality);
  const qualityStates=[...quality.querySelectorAll('svg')].every((svg,i)=>w.getComputedStyle(svg).maskImage==='none'&&svg.getBoundingClientRect().width===16&&svg.getBoundingClientRect().height===16&&[...svg.children].every(p=>w.getComputedStyle(p).opacity==='1')&&w.getComputedStyle(svg.lastElementChild).fillOpacity===(i===0?'1':'0.25'));
  quality.remove();
  const nativeSwitch=d.createElement('div');nativeSwitch.className='container_a28278';
  nativeSwitch.innerHTML='<div class="switchIndicator_a28278" style="background-color:rgb(88,101,242)"></div><span class="hiddenVisually_b18fe2"><input type="checkbox" role="switch" checked></span>';
  q('#app-mount').append(nativeSwitch);
  const track=nativeSwitch.firstElementChild;
  const checkedSwitch=contrast(rgb(w.getComputedStyle(track).backgroundColor),[255,255,255])>=3&&w.getComputedStyle(track).backgroundColor==='rgb(94, 129, 172)';
  nativeSwitch.querySelector('input').checked=false;track.style.backgroundColor='rgba(0,0,0,.12)';
  const uncheckedSwitch=w.getComputedStyle(track).backgroundColor==='rgba(0, 0, 0, 0.12)';
  nativeSwitch.remove();
  // Minimal native portal topology: the call and lower chat must not intersect.
  const split=d.createElement('div');split.className='voice-probe';
  split.style.cssText='position:relative;width:calc(100vw - var(--sibnight-sidebar));height:765px';
  split.innerHTML='<style>.voice-probe>.wrapper_cb9592{height:100%;width:100%;display:flex}.voice-probe .callContainer_cb9592{flex:1;height:100%}.voice-probe>.layerContainer__59d0d{position:absolute;inset:0;pointer-events:none}.voice-probe .chatLayerWrapper__01ae2{position:absolute;top:0;right:0;height:100%}.voice-probe .container__01ae2{position:absolute;top:0;bottom:0;right:0;width:450px;box-sizing:border-box}</style><section class="wrapper_cb9592 sidebarOpen_cb9592"><div class="callContainer_cb9592">Stage</div></section><div class="layerContainer__59d0d"><div class="chatLayerWrapper__01ae2 connectedRight__01ae2"><div class="container__01ae2 floating__01ae2" style="width:450px">Chat</div></div></div>';
  q('#app-mount').append(split);
  const stageRect=split.querySelector('.wrapper_cb9592').getBoundingClientRect(),chatRect=split.querySelector('.container__01ae2').getBoundingClientRect();
  const stackedClear=width>1200||chatRect.top>=stageRect.bottom-1;
  const stackedFullWidth=width>1200||Math.abs(chatRect.width-stageRect.width)<1;
  const stackedChatFits=width>1200||chatRect.bottom<=split.getBoundingClientRect().bottom+1;
  split.style.height='500px';
  const shortStage=split.querySelector('.wrapper_cb9592').getBoundingClientRect(),shortChat=split.querySelector('.container__01ae2').getBoundingClientRect();
  const shortSplitClear=width>1200||(shortChat.top>=shortStage.bottom-1&&shortChat.bottom<=split.getBoundingClientRect().bottom+1);
  split.remove();
  // Native sizing contracts: theme rules must not defeat the user's width or virtual rows.
  const sidebarWidths=[300,444].map(size=>{
   d.documentElement.style.setProperty('--custom-guild-sidebar-width',size+'px');
   return q('.sidebar__5e434').getBoundingClientRect().width===size;
  });
  d.documentElement.style.removeProperty('--custom-guild-sidebar-width');
  const nativeGeometry=d.createElement('div');
  nativeGeometry.innerHTML='<style>.native-geometry .wrapper_c19a55{position:relative;height:100px;--chat-avatar-size:40px;--custom-message-avatar-size:40px;--custom-message-avatar-decoration-size:48px;--custom-message-margin-horizontal:16px}.native-geometry .avatar_c19a55{position:absolute;top:0;left:var(--custom-message-margin-horizontal);width:var(--chat-avatar-size);height:var(--chat-avatar-size);margin-top:2px}.native-geometry .avatarDecoration_c19a55{position:absolute;top:0;left:calc(var(--custom-message-margin-horizontal) - (var(--custom-message-avatar-decoration-size) - var(--custom-message-avatar-size))/2);width:var(--custom-message-avatar-decoration-size);height:var(--custom-message-avatar-decoration-size);margin-top:-2px}.native-geometry .containerDefault__29444{padding-top:16px;height:24px;box-sizing:content-box}.native-geometry .link__2ea32{height:32px}.native-geometry .member_c8ffbb{background:rgb(10,20,30)}</style><div class="cozy_c19a55 wrapper_c19a55"><div class="avatar_c19a55"></div><div class="avatarDecoration_c19a55"></div></div><div class="containerDefault__29444"></div><div class="link__2ea32"></div><div class="member_c8ffbb">Member</div>';
  nativeGeometry.className='native-geometry';q('#app-mount').append(nativeGeometry);
  const avatar=nativeGeometry.querySelector('.avatar_c19a55').getBoundingClientRect(),decoration=nativeGeometry.querySelector('.avatarDecoration_c19a55').getBoundingClientRect();
  const avatarAligned=Math.abs(avatar.x+avatar.width/2-decoration.x-decoration.width/2)<.1&&Math.abs(avatar.y+avatar.height/2-decoration.y-decoration.height/2)<.1;
  const nativeCategory=nativeGeometry.querySelector('.containerDefault__29444').getBoundingClientRect().height===40;
  const nativeChannel=nativeGeometry.querySelector('.link__2ea32').getBoundingClientRect().height===32;
  const memberClear=w.getComputedStyle(nativeGeometry.querySelector('.member_c8ffbb')).backgroundColor==='rgba(0, 0, 0, 0)';
  nativeGeometry.remove();
  const checks={
   userSidebarWidthsPreserved:sidebarWidths.every(Boolean),
   avatarDecorationCentred:avatarAligned,
   virtualCategoryHeightPreserved:nativeCategory,
   virtualChannelHeightPreserved:nativeChannel,
   memberRestBackgroundClear:memberClear,
   nativeQualityStatesPreserved:qualityStates,
   selectedSwitchContrast:contrast(token('--switch-background-selected-default'),token('--switch-thumb-background-selected-default'))>=3,
   legacyCheckedSwitchContrast:checkedSwitch,
   legacyUncheckedSwitchPreserved:uncheckedSwitch,
   stackedCallChatClear:stackedClear,
   stackedChatFullWidth:stackedFullWidth,
   stackedChatFits:stackedChatFits,
   shortCallChatClear:shortSplitClear,
   mainVoiceHeaderClear:voiceClear,
   nestedHeaderUnshifted:nestedUnshifted,
   mainTextHeaderClear:textClear,
   foregroundContrast:Math.min(...surfaces.map(bg=>contrast(token('--sibnight-foreground'),bg)))>=4.5,
   mutedContrast:Math.min(...surfaces.map(bg=>contrast(token('--sibnight-muted'),bg)))>=4.5,
   focusContrast:Math.min(...surfaces.map(bg=>contrast(token('--sibnight-focus'),bg)))>=3,
   attentionBadgeContrast:contrast(token('--sibnight-nord6'),token('--sibnight-attention'))>=4.5,
   criticalNoticeContrast:contrast(rgb(style('#notice').color),rgb(style('#notice').backgroundColor))>=4.5,
   overlayTransparent:style('.layerContainer__59d0d').backgroundColor==='rgba(0, 0, 0, 0)',
   unreadVisible:style('.unread__2ea32').display!=='none',
   nativeProfilePreserved:style('.custom-user-profile-theme').backgroundColor==='rgb(18, 52, 86)',
   focusVisible:style('#focus').outlineStyle==='solid'&&style('#focus').outlineWidth==='2px',
   rail72:style('.guilds__5e434').width==='72px',
   icon40:q('.wrapper__6e9f8').getBoundingClientRect().width===40&&q('.wrapper__6e9f8').getBoundingClientRect().height===40,
   readChannelContrast:contrast(token('--sibnight-channel-rest'),token('--sibnight-index'))>=4.5,
   sidebarTrack:style('.sidebar__5e434').width==='344px',
   composerInnerTransparent:style('.scrollableContainer__74017').backgroundColor==='rgba(0, 0, 0, 0)',
   composerHeight:parseFloat(style('.inner__74017').minHeight)>=56,
   homeHasMessageIcon:style('.childWrapper__6e9f8 svg').maskImage.startsWith('url('),
   threadHasIcon:style('[aria-label="Fils"] svg').maskImage.startsWith('url('),
   pinHasIcon:style('[aria-label="Messages épinglés"] svg').maskImage.startsWith('url('),
   bellStatePreserved:style('[aria-label="Paramètres de notification"] svg').maskImage==='none'
  };
  d.documentElement.classList.add('reduce-motion');
  checks.discordReducedMotion=style('.menu_c1e9c4').animationName==='none';
  results.push({width,checks,pass:Object.values(checks).every(Boolean)});frame.remove();
 }
 document.querySelector('#results').textContent=JSON.stringify(results,null,2);
})();
</script>`;
fs.mkdirSync('output', { recursive: true });
fs.writeFileSync('output/north-polar-checks.html', html);
console.log('Serve output/north-polar-checks.html on loopback; read both result rows.');
