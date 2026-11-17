const V='orbita-e1f321e12c8e2c11';
const CORE=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-maskable-512.png','./apple-touch-icon.png',"./art/espaco.webp", "./art/estudio.webp", "./art/floresta.webp", "./art/games.webp", "./art/neon.webp", "./art/neve.webp", "./art/oceano.webp", "./art/pet-axolote.webp", "./art/pet-dragao.webp", "./art/pet-gato.webp", "./art/pet-raposa.webp", "./art/pet-robo.webp", "./art/zen.webp"];
const FONTS="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Press+Start+2P&family=Unbounded:wght@500;700&family=Nunito:wght@400;600;700;800&display=swap";
self.addEventListener('install',e=>{e.waitUntil((async()=>{
  const c=await caches.open(V);await c.addAll(CORE);
  try{const r=await fetch(FONTS);if(r.ok){const css=await r.clone().text();await c.put(FONTS,r);
    const urls=[...css.matchAll(/url\((https:[^)]+)\)/g)].map(m=>m[1]);
    await Promise.all(urls.map(u=>fetch(u,{mode:'cors'}).then(f=>f.ok&&c.put(u,f)).catch(()=>{})));}}catch(err){}
  await self.skipWaiting();})());});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  if(req.mode==='navigate'){e.respondWith(fetch(req).then(r=>{const cp=r.clone();caches.open(V).then(c=>c.put('./index.html',cp));return r;}).catch(()=>caches.match('./index.html')));return;}
  e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>{if(r.ok||r.type==='opaque'){const cp=r.clone();caches.open(V).then(c=>c.put(req,cp));}return r;}).catch(()=>hit)));
});
