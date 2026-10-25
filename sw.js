const CACHE="nurlan-home-shell-v10";
const SHELL=["./","./index.html","./manifest.json"];
self.addEventListener("install",event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).catch(()=>{}));self.skipWaiting()});
self.addEventListener("activate",event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("nurlan-home-shell-")&&k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET"||new URL(event.request.url).origin!==self.location.origin)return;
  const requestURL=new URL(event.request.url);
  if(event.request.mode==="navigate"||requestURL.pathname.endsWith("/index.html")||requestURL.pathname.endsWith("/")){
    event.respondWith(fetch(event.request,{cache:"no-store",headers:new Headers(event.request.headers)}).then(response=>{
      if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
      return response;
    }).catch(()=>caches.match(event.request).then(cached=>cached||caches.match("./index.html"))));
    return;
  }
  event.respondWith(fetch(event.request).then(response=>{
    if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
    return response;
  }).catch(()=>caches.match(event.request)));
});
self.addEventListener("push",event=>{let data={title:"Nurlan Home",body:"Ev üçün yeni xəbərdarlıq",url:"./"};try{data={...data,...event.data.json()}}catch(e){if(event.data)data.body=event.data.text()}event.waitUntil(self.registration.showNotification(data.title,{body:data.body,icon:"./icon-192.png",badge:"./icon-192.png",data:{url:data.url||"./"},tag:data.tag||"nurlan-home-alert",renotify:false}))});
self.addEventListener("notificationclick",event=>{event.notification.close();event.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{const existing=list.find(c=>c.url.startsWith(self.location.origin));if(existing){existing.focus();return existing.navigate(event.notification.data?.url||"./")}return clients.openWindow(event.notification.data?.url||"./")}))});
