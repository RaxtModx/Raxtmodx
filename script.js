// Firebase integrado automáticamente
mport { fetchMods, saveModToDB } from "./firebase.js";
// script.js - Raxt Mods (login, mods, admin and owner panels)
mport { fetchMods, saveModToDB } from "./firebase.js";
// Keys
mport { fetchMods, saveModToDB } from "./firebase.js";
const ADMIN_KEY = "Tadellin.1";
mport { fetchMods, saveModToDB } from "./firebase.js";
const OWNER_KEY = "1406";
mport { fetchMods, saveModToDB } from "./firebase.js";
// initial demo mods (5 items)
mport { fetchMods, saveModToDB } from "./firebase.js";
const DEMO_MODS = [
mport { fetchMods, saveModToDB } from "./firebase.js";
  {id:1, title:"Roblox Parkour Plus", desc:"Salta y crea plataformas dinámicas en Roblox. Mods de ejemplo.", video:"aqz-KE-bpKQ", link:"https://www.mediafire.com/"},
mport { fetchMods, saveModToDB } from "./firebase.js";
  {id:2, title:"FreeFire Aim Helper", desc:"Herramienta de práctica - modo entrenamiento. Ejemplo genérico.", video:"YE7VzlLtp-4", link:"https://www.mediafire.com/"},
mport { fetchMods, saveModToDB } from "./firebase.js";
  {id:3, title:"Blood Strike FX Pack", desc:"Paquete de efectos y skins - demo.", video:"2vjPBrBU-TM", link:"https://www.mediafire.com/"},
mport { fetchMods, saveModToDB } from "./firebase.js";
  {id:4, title:"Roblox Visuals Lite", desc:"Mejoras visuales para mapas - demo.", video:"M7lc1UVf-VE", link:"https://www.mediafire.com/"},
mport { fetchMods, saveModToDB } from "./firebase.js";
  {id:5, title:"FreeFire Map Tools", desc:"Herramientas de mapas y utilidades - demo.", video:"LXb3EKWsInQ", link:"https://www.mediafire.com/"}
mport { fetchMods, saveModToDB } from "./firebase.js";
];
mport { fetchMods, saveModToDB } from "./firebase.js";

mport { fetchMods, saveModToDB } from "./firebase.js";
// UTIL: get/set mods in localStorage
mport { fetchMods, saveModToDB } from "./firebase.js";
function loadMods(){
mport { fetchMods, saveModToDB } from "./firebase.js";
  const raw = localStorage.getItem('raxt_mods');
mport { fetchMods, saveModToDB } from "./firebase.js";
  if(!raw){
mport { fetchMods, saveModToDB } from "./firebase.js";
    localStorage.setItem('raxt_mods', JSON.stringify(DEMO_MODS));
mport { fetchMods, saveModToDB } from "./firebase.js";
    return DEMO_MODS.slice();
mport { fetchMods, saveModToDB } from "./firebase.js";
  }
mport { fetchMods, saveModToDB } from "./firebase.js";
  try { return JSON.parse(raw); } catch(e){ localStorage.setItem('raxt_mods', JSON.stringify(DEMO_MODS)); return DEMO_MODS.slice(); }
mport { fetchMods, saveModToDB } from "./firebase.js";
}
mport { fetchMods, saveModToDB } from "./firebase.js";
function saveMods(mods){ localStorage.setItem('raxt_mods', JSON.stringify(mods)); }
mport { fetchMods, saveModToDB } from "./firebase.js";

mport { fetchMods, saveModToDB } from "./firebase.js";
// Render grid on index.html
mport { fetchMods, saveModToDB } from "./firebase.js";
function renderModsGrid(){
mport { fetchMods, saveModToDB } from "./firebase.js";
  const container = document.getElementById('modsGrid');
mport { fetchMods, saveModToDB } from "./firebase.js";
  if(!container) return;
mport { fetchMods, saveModToDB } from "./firebase.js";
  const mods = loadMods();
mport { fetchMods, saveModToDB } from "./firebase.js";
  container.innerHTML = mods.map(m=>`
mport { fetchMods, saveModToDB } from "./firebase.js";
    <div class="mod-card">
mport { fetchMods, saveModToDB } from "./firebase.js";
      <h3>${escapeHtml(m.title)}</h3>
mport { fetchMods, saveModToDB } from "./firebase.js";
      <p>${escapeHtml(m.desc)}</p>
mport { fetchMods, saveModToDB } from "./firebase.js";
      <div class="video-wrap"><iframe src="https://www.youtube.com/embed/${m.video}" frameborder="0" allowfullscreen></iframe></div>
mport { fetchMods, saveModToDB } from "./firebase.js";
      <div class="mod-actions"><a class="btn" target="_blank" href="${m.link}">Descargar</a></div>
mport { fetchMods, saveModToDB } from "./firebase.js";
    </div>
mport { fetchMods, saveModToDB } from "./firebase.js";
  `).join('');
mport { fetchMods, saveModToDB } from "./firebase.js";
}
mport { fetchMods, saveModToDB } from "./firebase.js";

mport { fetchMods, saveModToDB } from "./firebase.js";
// Simple escape
mport { fetchMods, saveModToDB } from "./firebase.js";
function escapeHtml(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }
mport { fetchMods, saveModToDB } from "./firebase.js";

mport { fetchMods, saveModToDB } from "./firebase.js";
// LOGIN (index)
mport { fetchMods, saveModToDB } from "./firebase.js";
document.addEventListener('DOMContentLoaded', ()=>{
mport { fetchMods, saveModToDB } from "./firebase.js";
  // login UI
mport { fetchMods, saveModToDB } from "./firebase.js";
  const loginBtn = document.getElementById('loginBtn');
mport { fetchMods, saveModToDB } from "./firebase.js";
  if(loginBtn){
mport { fetchMods, saveModToDB } from "./firebase.js";
    loginBtn.addEventListener('click', ()=>{
mport { fetchMods, saveModToDB } from "./firebase.js";
      const name = document.getElementById('loginName').value.trim();
mport { fetchMods, saveModToDB } from "./firebase.js";
      const pass = document.getElementById('loginPass').value.trim();
mport { fetchMods, saveModToDB } from "./firebase.js";
      if(!name||!pass){ alert('Completa ambos campos'); return; }
mport { fetchMods, saveModToDB } from "./firebase.js";
      localStorage.setItem('raxt_user', JSON.stringify({name}));
mport { fetchMods, saveModToDB } from "./firebase.js";
      // log
mport { fetchMods, saveModToDB } from "./firebase.js";
      const logs = JSON.parse(localStorage.getItem('login_logs')||'[]');
mport { fetchMods, saveModToDB } from "./firebase.js";
      logs.push({user:name, date:new Date().toLocaleString()});
mport { fetchMods, saveModToDB } from "./firebase.js";
      localStorage.setItem('login_logs', JSON.stringify(logs));
mport { fetchMods, saveModToDB } from "./firebase.js";
      document.getElementById('login-area').style.display='none';
mport { fetchMods, saveModToDB } from "./firebase.js";
      document.getElementById('content-area').style.display='block';
mport { fetchMods, saveModToDB } from "./firebase.js";
      renderModsGrid();
mport { fetchMods, saveModToDB } from "./firebase.js";
    });
mport { fetchMods, saveModToDB } from "./firebase.js";
  }
mport { fetchMods, saveModToDB } from "./firebase.js";
  // if already logged in
mport { fetchMods, saveModToDB } from "./firebase.js";
  if(localStorage.getItem('raxt_user')){
mport { fetchMods, saveModToDB } from "./firebase.js";
    const la=document.getElementById('login-area');
mport { fetchMods, saveModToDB } from "./firebase.js";
    const ca=document.getElementById('content-area');
mport { fetchMods, saveModToDB } from "./firebase.js";
    if(la) la.style.display='none';
mport { fetchMods, saveModToDB } from "./firebase.js";
    if(ca) ca.style.display='block';
mport { fetchMods, saveModToDB } from "./firebase.js";
  }
mport { fetchMods, saveModToDB } from "./firebase.js";

mport { fetchMods, saveModToDB } from "./firebase.js";
  // admin page init
mport { fetchMods, saveModToDB } from "./firebase.js";
  if(location.pathname.endsWith('admin.html')){
mport { fetchMods, saveModToDB } from "./firebase.js";
    // require admin session
mport { fetchMods, saveModToDB } from "./firebase.js";
    if(localStorage.getItem('admin_access')!=='true'){ alert('Acceso denegado. Inicia sesión en admin-login.'); location.href='admin-login.html'; return; }
mport { fetchMods, saveModToDB } from "./firebase.js";
    renderModsEditor();
mport { fetchMods, saveModToDB } from "./firebase.js";
  }
mport { fetchMods, saveModToDB } from "./firebase.js";
  // when on owner page verify ownerAccess
mport { fetchMods, saveModToDB } from "./firebase.js";
  if(location.pathname.endsWith('owner.html')){
mport { fetchMods, saveModToDB } from "./firebase.js";
    if(localStorage.getItem('owner_access')!=='true'){ alert('Acceso denegado.'); location.href='admin-login.html'; return; }
mport { fetchMods, saveModToDB } from "./firebase.js";
    renderLoginLogs();
mport { fetchMods, saveModToDB } from "./firebase.js";
  }
mport { fetchMods, saveModToDB } from "./firebase.js";
});
mport { fetchMods, saveModToDB } from "./firebase.js";

mport { fetchMods, saveModToDB } from "./firebase.js";
// ADMIN LOGIN check at admin-login.html
mport { fetchMods, saveModToDB } from "./firebase.js";
function checkAdmin(){
  alert("👉 checkAdmin SI está funcionando");

  try {

    const user = document.getElementById('adminUser').value.trim();
    const key = document.getElementById('adminKey').value.trim();

    alert("Usuario: " + user + " | Key: " + key);

    if(!user||!key){ alert('Completa los campos'); return; }

    if(key===OWNER_KEY){
      alert("ENTRASTE COMO DUEÑO");
      localStorage.setItem('owner_access','true');
      location.href='owner.html';
      return;
    }

    const admins = JSON.parse(localStorage.getItem('raxt_admins')||'[]');
    const found = admins.find(a=>a.user===user && a.key===key);

    if(found || key===ADMIN_KEY){
      alert("ENTRASTE COMO ADMIN");
      localStorage.setItem('admin_access','true');
      localStorage.setItem('admin_name', user);
      location.href='admin.html';
    } else {
      alert('Usuario o clave incorrecta');
    }

  } catch(e){
    alert("❌ ERROR: " + e.message);
  }
}
mport { fetchMods, saveModToDB } from "./firebase.js";
  const user = document.getElementById('adminUser').value.trim();
mport { fetchMods, saveModToDB } from "./firebase.js";
  const key = document.getElementById('adminKey').value.trim();
mport { fetchMods, saveModToDB } from "./firebase.js";
  if(!user||!key){ alert('Completa los campos'); return; }
mport { fetchMods, saveModToDB } from "./firebase.js";
  // owner key -> owner panel
mport { fetchMods, saveModToDB } from "./firebase.js";
  if(key===OWNER_KEY){
mport { fetchMods, saveModToDB } from "./firebase.js";
    localStorage.setItem('owner_access','true');
mport { fetchMods, saveModToDB } from "./firebase.js";
    // record log
mport { fetchMods, saveModToDB } from "./firebase.js";
    const logs = JSON.parse(localStorage.getItem('login_logs')||'[]');
mport { fetchMods, saveModToDB } from "./firebase.js";
    logs.push({user: user+' (Dueño)', date:new Date().toLocaleString()});
mport { fetchMods, saveModToDB } from "./firebase.js";
    localStorage.setItem('login_logs', JSON.stringify(logs));
mport { fetchMods, saveModToDB } from "./firebase.js";
    location.href='owner.html';
mport { fetchMods, saveModToDB } from "./firebase.js";
    return;
mport { fetchMods, saveModToDB } from "./firebase.js";
  }
mport { fetchMods, saveModToDB } from "./firebase.js";
  // admin key check - check saved admins list
mport { fetchMods, saveModToDB } from "./firebase.js";
  const admins = JSON.parse(localStorage.getItem('raxt_admins')||'[]');
mport { fetchMods, saveModToDB } from "./firebase.js";
  const found = admins.find(a=>a.user===user && a.key===key);
mport { fetchMods, saveModToDB } from "./firebase.js";
  if(found || key===ADMIN_KEY){
mport { fetchMods, saveModToDB } from "./firebase.js";
    // allow access
mport { fetchMods, saveModToDB } from "./firebase.js";
    localStorage.setItem('admin_access','true');
mport { fetchMods, saveModToDB } from "./firebase.js";
    localStorage.setItem('admin_name', user);
mport { fetchMods, saveModToDB } from "./firebase.js";
    const logs = JSON.parse(localStorage.getItem('login_logs')||'[]');
mport { fetchMods, saveModToDB } from "./firebase.js";
    logs.push({user, date:new Date().toLocaleString()});
mport { fetchMods, saveModToDB } from "./firebase.js";
    localStorage.setItem('login_logs', JSON.stringify(logs));
mport { fetchMods, saveModToDB } from "./firebase.js";
    location.href='admin.html';
mport { fetchMods, saveModToDB } from "./firebase.js";
  } else {
mport { fetchMods, saveModToDB } from "./firebase.js";
    alert('Usuario o clave incorrecta');
mport { fetchMods, saveModToDB } from "./firebase.js";
  }
mport { fetchMods, saveModToDB } from "./firebase.js";
}
mport { fetchMods, saveModToDB } from "./firebase.js";

mport { fetchMods, saveModToDB } from "./firebase.js";
// RENDER editor interface on admin.html
mport { fetchMods, saveModToDB } from "./firebase.js";
function renderModsEditor(){
mport { fetchMods, saveModToDB } from "./firebase.js";
  const container = document.getElementById('modsEditor');
mport { fetchMods, saveModToDB } from "./firebase.js";
  const mods = loadMods();
mport { fetchMods, saveModToDB } from "./firebase.js";
  container.innerHTML = mods.map((m,i)=>`
mport { fetchMods, saveModToDB } from "./firebase.js";
    <div class="row" data-i="${i}">
mport { fetchMods, saveModToDB } from "./firebase.js";
      <input class="input" data-field="title" value="${escapeHtml(m.title)}"/>
mport { fetchMods, saveModToDB } from "./firebase.js";
      <input class="input" data-field="video" value="${escapeHtml(m.video)}" placeholder="YouTube ID"/>
mport { fetchMods, saveModToDB } from "./firebase.js";
      <input class="input" data-field="link" value="${escapeHtml(m.link)}" placeholder="MediaFire link"/>
mport { fetchMods, saveModToDB } from "./firebase.js";
      <button class="btn" onclick="saveMod(${i})">Guardar</button>
mport { fetchMods, saveModToDB } from "./firebase.js";
      <button class="btn ghost" onclick="deleteMod(${i})">Eliminar</button>
mport { fetchMods, saveModToDB } from "./firebase.js";
    </div>
mport { fetchMods, saveModToDB } from "./firebase.js";
    <div style="margin-bottom:8px" class="small">${escapeHtml(m.desc)}</div>
mport { fetchMods, saveModToDB } from "./firebase.js";
  `).join('');
mport { fetchMods, saveModToDB } from "./firebase.js";
}
mport { fetchMods, saveModToDB } from "./firebase.js";

mport { fetchMods, saveModToDB } from "./firebase.js";
// add new empty mod
mport { fetchMods, saveModToDB } from "./firebase.js";
function addEmptyMod(){
mport { fetchMods, saveModToDB } from "./firebase.js";
  const mods = loadMods();
mport { fetchMods, saveModToDB } from "./firebase.js";
  mods.push({id:Date.now(), title:'Nuevo mod', desc:'Descripción...', video:'aqz-KE-bpKQ', link:'https://www.mediafire.com/'});
mport { fetchMods, saveModToDB } from "./firebase.js";
  saveMods(mods);
mport { fetchMods, saveModToDB } from "./firebase.js";
  renderModsEditor();
mport { fetchMods, saveModToDB } from "./firebase.js";
  alert('Nuevo mod añadido (guardar para confirmar).');
mport { fetchMods, saveModToDB } from "./firebase.js";
}
mport { fetchMods, saveModToDB } from "./firebase.js";

mport { fetchMods, saveModToDB } from "./firebase.js";
// save single mod when editing
mport { fetchMods, saveModToDB } from "./firebase.js";
function saveMod(i){
mport { fetchMods, saveModToDB } from "./firebase.js";
  const rows = document.querySelectorAll('#modsEditor .row');
mport { fetchMods, saveModToDB } from "./firebase.js";
  const row = Array.from(rows).find(r=>parseInt(r.dataset.i)===i);
mport { fetchMods, saveModToDB } from "./firebase.js";
  if(!row) return;
mport { fetchMods, saveModToDB } from "./firebase.js";
  const title = row.querySelector('[data-field="title"]').value.trim();
mport { fetchMods, saveModToDB } from "./firebase.js";
  const video = row.querySelector('[data-field="video"]').value.trim();
mport { fetchMods, saveModToDB } from "./firebase.js";
  const link = row.querySelector('[data-field="link"]').value.trim();
mport { fetchMods, saveModToDB } from "./firebase.js";
  const mods = loadMods();
mport { fetchMods, saveModToDB } from "./firebase.js";
  mods[i].title = title || mods[i].title;
mport { fetchMods, saveModToDB } from "./firebase.js";
  mods[i].video = video || mods[i].video;
mport { fetchMods, saveModToDB } from "./firebase.js";
  mods[i].link = link || mods[i].link;
mport { fetchMods, saveModToDB } from "./firebase.js";
  saveMods(mods);
mport { fetchMods, saveModToDB } from "./firebase.js";
  alert('Guardado mod #' + (i+1));
mport { fetchMods, saveModToDB } from "./firebase.js";
  renderModsEditor();
mport { fetchMods, saveModToDB } from "./firebase.js";
}
mport { fetchMods, saveModToDB } from "./firebase.js";

mport { fetchMods, saveModToDB } from "./firebase.js";
// delete mod
mport { fetchMods, saveModToDB } from "./firebase.js";
function deleteMod(i){
mport { fetchMods, saveModToDB } from "./firebase.js";
  if(!confirm('Eliminar mod?')) return;
mport { fetchMods, saveModToDB } from "./firebase.js";
  const mods = loadMods(); mods.splice(i,1); saveMods(mods); renderModsEditor();
mport { fetchMods, saveModToDB } from "./firebase.js";
}
mport { fetchMods, saveModToDB } from "./firebase.js";

mport { fetchMods, saveModToDB } from "./firebase.js";
// save all mods (re-render)
mport { fetchMods, saveModToDB } from "./firebase.js";
function saveAllMods(){
mport { fetchMods, saveModToDB } from "./firebase.js";
  // simply reload editors to ensure saved
mport { fetchMods, saveModToDB } from "./firebase.js";
  alert('Asegúrate de usar "Guardar" en cada mod individual. Los cambios se guardan localmente.');
mport { fetchMods, saveModToDB } from "./firebase.js";
}
mport { fetchMods, saveModToDB } from "./firebase.js";

mport { fetchMods, saveModToDB } from "./firebase.js";
// logout admin
mport { fetchMods, saveModToDB } from "./firebase.js";
function logoutAdmin(){ localStorage.removeItem('admin_access'); location.href='index.html'; }
mport { fetchMods, saveModToDB } from "./firebase.js";

mport { fetchMods, saveModToDB } from "./firebase.js";
// OWNER functions
mport { fetchMods, saveModToDB } from "./firebase.js";
function createAdmin(){
mport { fetchMods, saveModToDB } from "./firebase.js";
  const u = document.getElementById('newAdminUser').value.trim();
mport { fetchMods, saveModToDB } from "./firebase.js";
  const k = document.getElementById('newAdminKey').value.trim();
mport { fetchMods, saveModToDB } from "./firebase.js";
  if(!u||!k){ alert('Completa ambos campos'); return; }
mport { fetchMods, saveModToDB } from "./firebase.js";
  const admins = JSON.parse(localStorage.getItem('raxt_admins')||'[]');
mport { fetchMods, saveModToDB } from "./firebase.js";
  if(admins.find(a=>a.user===u)){ alert('Ya existe ese usuario'); return; }
mport { fetchMods, saveModToDB } from "./firebase.js";
  admins.push({user:u,key:k}); localStorage.setItem('raxt_admins', JSON.stringify(admins));
mport { fetchMods, saveModToDB } from "./firebase.js";
  alert('Admin creado: ' + u);
mport { fetchMods, saveModToDB } from "./firebase.js";
  document.getElementById('newAdminUser').value=''; document.getElementById('newAdminKey').value='';
mport { fetchMods, saveModToDB } from "./firebase.js";
}
mport { fetchMods, saveModToDB } from "./firebase.js";

mport { fetchMods, saveModToDB } from "./firebase.js";
// render logs
mport { fetchMods, saveModToDB } from "./firebase.js";
function renderLoginLogs(){
mport { fetchMods, saveModToDB } from "./firebase.js";
  const el = document.getElementById('loginLogs');
mport { fetchMods, saveModToDB } from "./firebase.js";
  const logs = JSON.parse(localStorage.getItem('login_logs')||'[]');
mport { fetchMods, saveModToDB } from "./firebase.js";
  el.textContent = logs.map(l=>'👤 '+l.user+' — '+l.date).join('\n') || 'Sin registros';
mport { fetchMods, saveModToDB } from "./firebase.js";
}
mport { fetchMods, saveModToDB } from "./firebase.js";

mport { fetchMods, saveModToDB } from "./firebase.js";
// logout owner
mport { fetchMods, saveModToDB } from "./firebase.js";
function logoutOwner(){ localStorage.removeItem('owner_access'); location.href='index.html'; }
mport { fetchMods, saveModToDB } from "./firebase.js";

    
