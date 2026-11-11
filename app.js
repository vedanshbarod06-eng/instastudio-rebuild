const root=document.getElementById("app");
let currentView="launcher";
let activeTab="home";
let query="";
const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const icon=(name)=>({home:"⌂",search:"⌕",reels:"▣",profile:"◉",create:"＋"}[name]);
function launcher(){
 root.innerHTML=`<main class="launcher">
  <header class="launcher-header"><div class="brand"><span class="logo"></span><div><b>InstaStudio</b><small>App launcher</small></div></div><span class="launcher-label">MY APPS</span></header>
  <section class="launcher-content"><h1>Find your app</h1><p>Search for an app and open it.</p>
   <label class="search-wrap"><span>⌕</span><input id="app-search" type="search" placeholder="Search apps" value="${esc(query)}"></label>
   <div id="app-list">${(!query||"instagram".includes(query.toLowerCase()))?`<button class="app-item" id="open-instagram"><span class="instagram-icon"><i></i></span><span class="app-copy"><b>Instagram</b><small>Social</small></span><span class="open-label">Open</span></button>`:'<p class="empty-state">No apps found.</p>'}</div>
  </section><footer>InstaStudio</footer></main>`;
 const input=document.getElementById("app-search");
 input.addEventListener("input",()=>{query=input.value;const p=input.selectionStart;launcher();const n=document.getElementById("app-search");n.focus();n.setSelectionRange(p,p)});
 const open=document.getElementById("open-instagram");if(open)open.onclick=()=>{currentView="instagram";activeTab="home";instagram()};
}
function topbar(){return `<header class="ig-top"><b>Instagram</b><div><button aria-label="Create" data-tab="create">＋</button><button aria-label="Notifications">♡</button><button aria-label="Messages">➤</button></div></header>`}
function bottomNav(){return `<nav class="ig-nav">${["home","search","create","reels","profile"].map(t=>`<button data-tab="${t}" class="${activeTab===t?"selected":""}">${icon(t)}</button>`).join("")}</nav>`}
function stories(){return `<div class="stories">${["Your story","cristiano","leomessi","f1","nba","virat"].map((s,i)=>`<div class="story"><span class="story-ring ${i===0?"own":""}">${i===0?"+":s.slice(0,2).toUpperCase()}</span><small>${s}</small></div>`).join("")}</div>`}
function feed(){return `<div class="feed-tabs"><b>For you</b><span>Following</span></div>
 <article class="ig-post"><div class="post-head"><span class="avatar">CR</span><b>cristiano <small>✓</small></b><span class="dots">•••</span></div>
 <div class="post-media football"><span>CR7</span><small>PORTUGAL · 7</small></div>
 <div class="post-actions"><span>♡　◯　➤</span><span>▱</span></div><b class="likes">641,203 likes</b><p><b>cristiano</b> Still the same hunger. 🏆</p><small class="comments">View all 8,421 comments</small><small class="time">2 HOURS AGO</small></article>
 <article class="ig-post"><div class="post-head"><span class="avatar purple">LM</span><b>leomessi <small>✓</small></b><span class="dots">•••</span></div><div class="post-media stadium"><span>THE GAME</span></div><div class="post-actions">♡　◯　➤</div><b class="likes">421,908 likes</b><p><b>leomessi</b> Another special night.</p></article>`}
function reels(){return `<div class="reels-screen"><div class="reel-video"><span>▶</span><div class="reel-overlay"><b>cristiano ✓</b><p>Still the same hunger 🏆</p><small>Original audio · cristiano</small></div><aside>♡<small>1.2M</small>▢<small>12.4K</small>➤</aside></div></div>`}
function searchPage(){return `<main class="ig-search"><h2>Search</h2><input placeholder="Search" value=""><div class="search-grid">${Array.from({length:12},(_,i)=>`<div class="search-tile tile-${i%4}">${["⚽","🏎️","🏀","🏆"][i%4]}</div>`).join("")}</div></main>`}
function profile(){return `<main class="ig-profile"><div class="profile-top"><b>cristiano ✓</b><span>☰</span></div><div class="profile-stats"><span class="profile-pic">CR7</span><div><b>3,734</b><small>posts</small></div><div><b>641M</b><small>followers</small></div><div><b>594</b><small>following</small></div></div><b>Cristiano Ronaldo</b><p>SIUUU 🇵🇹<br>⠀</p><div class="profile-buttons"><button>Edit profile</button><button>Share profile</button></div><div class="highlights"><span>CR7</span><span>🇵🇹</span><span>🏆</span><span>⚽</span></div><div class="profile-grid">${Array.from({length:12},(_,i)=>`<div class="grid-tile tile-${i%4}">${["⚽","🏆","CR7","🇵🇹"][i%4]}</div>`).join("")}</div></main>`}
function createPage(){return `<main class="create-page"><h2>New post</h2><div class="upload-placeholder">＋<p>Choose a photo or video</p></div><button class="blue-button">Select from device</button></main>`}
function instagram(){
 const content=activeTab==="home"?feed():activeTab==="reels"?reels():activeTab==="profile"?profile():activeTab==="search"?searchPage():createPage();
 root.innerHTML=`<div class="instagram-clone">${topbar()}<div class="ig-content">${content}</div>${bottomNav()}</div>`;
 root.querySelectorAll("[data-tab]").forEach(b=>b.addEventListener("click",()=>{activeTab=b.dataset.tab;instagram()}));
}
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&currentView==="instagram"){currentView="launcher";launcher()}});
launcher();