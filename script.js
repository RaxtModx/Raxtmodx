// script.js - Raxt Mods (login, mods, admin and owner panels)
// Keys
const ADMIN_KEY = "Tadellin.1";
const OWNER_KEY = "1406";
// initial demo mods (5 items)
const DEMO_MODS = [
  {id:1, title:"Roblox Parkour Plus", desc:"Salta y crea plataformas dinámicas en Roblox. Mods de ejemplo.", video:"aqz-KE-bpKQ", link:"https://www.mediafire.com/"},
  {id:2, title:"FreeFire Aim Helper", desc:"Herramienta de práctica - modo entrenamiento. Ejemplo genérico.", video:"YE7VzlLtp-4", link:"https://www.mediafire.com/"},
  {id:3, title:"Blood Strike FX Pack", desc:"Paquete de efectos y skins - demo.", video:"2vjPBrBU-TM", link:"https://www.mediafire.com/"},
  {id:4, title:"Roblox Visuals Lite", desc:"Mejoras visuales para mapas - demo.", video:"M7lc1UVf-VE", link:"https://www.mediafire.com/"},
  {id:5, title:"FreeFire Map Tools", desc:"Herramientas de mapas y utilidades - demo.", video:"LXb3EKWsInQ", link:"https://www.mediafire.com/"}
];

// UTIL: get/set mods in localStorage
function loadMods(){
  const raw = localStorage.getItem('raxt_mods');
  if(!raw){
    localStorage.setItem('raxt_mods', JSON.stringify(DEMO_MODS));
    return DEMO_MODS.slice();
  }
  try { return JSON.parse(raw); } catch(e){ localStorage.setItem('raxt_mods', JSON.stringify(DEMO_MODS)); return DEMO_MODS.slice(); }
}
function saveMods(mods){ localStorage.setItem('raxt_mods', JSON.stringify(mods)); }

// Render grid on index.html
function renderModsGrid(){
  const container = document.getElementById('modsGrid');
  if(!container) return;
  const mods = loadMods();
  container.innerHTML = mods.map(m=>`
    <div class="mod-card">
      <h3>${escapeHtml(m.title)}</h3>
      <p>${escapeHtml(m.desc)}</p>
      <div class="video-wrap"><iframe src="https://www.youtube.com/embed/${m.video}" frameborder="0" allowfullscreen></iframe></div>
      <div class="mod-actions"><a class="btn" target="_blank" href="${m.link}">Descargar</a></div>
    </div>
  `).join('');
}

// Simple escape
function escapeHtml(s){ return String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }

// LOGIN (index)
document.addEventListener('DOMContentLoaded', ()=>{
  // login UI
  const loginBtn = document.getElementById('loginBtn');
  if(loginBtn){
    loginBtn.addEventListener('click', ()=>{
      const name = document.getElementById('loginName').value.trim();
      const pass = document.getElementById('loginPass').value.trim();
      if(!name||!pass){ alert('Completa ambos campos'); return; }
      localStorage.setItem('raxt_user', JSON.stringify({name}));
      // log
      const logs = JSON.parse(localStorage.getItem('login_logs')||'[]');
      logs.push({user:name, date:new Date().toLocaleString()});
      localStorage.setItem('login_logs', JSON.stringify(logs));
      document.getElementById('login-area').style.display='none';
      document.getElementById('content-area').style.display='block';
      renderModsGrid();
    });
  }
  // if already logged in
  if(localStorage.getItem('raxt_user')){
    const la=document.getElementById('login-area');
    const ca=document.getElementById('content-area');
    if(la) la.style.display='none';
    if(ca) ca.style.display='block';
  }

  // admin page init
  if(location.pathname.endsWith('admin.html')){
    // require admin session
    if(localStorage.getItem('admin_access')!=='true'){ alert('Acceso denegado. Inicia sesión en admin-login.'); location.href='admin-login.html'; return; }
    renderModsEditor();
  }
  // when on owner page verify ownerAccess
  if(location.pathname.endsWith('owner.html')){
    if(localStorage.getItem('owner_access')!=='true'){ alert('Acceso denegado.'); location.href='admin-login.html'; return; }
    renderLoginLogs();
  }
});

// ADMIN LOGIN check at admin-login.html
function checkAdmin(){
  const user = document.getElementById('adminUser').value.trim();
  const key = document.getElementById('adminKey').value.trim();
  if(!user||!key){ alert('Completa los campos'); return; }
  // owner key -> owner panel
  if(key===OWNER_KEY){
    localStorage.setItem('owner_access','true');
    // record log
    const logs = JSON.parse(localStorage.getItem('login_logs')||'[]');
    logs.push({user: user+' (Dueño)', date:new Date().toLocaleString()});
    localStorage.setItem('login_logs', JSON.stringify(logs));
    location.href='owner.html';
    return;
  }
  // admin key check - check saved admins list
  const admins = JSON.parse(localStorage.getItem('raxt_admins')||'[]');
  const found = admins.find(a=>a.user===user && a.key===key);
  if(found || key===ADMIN_KEY){
    // allow access
    localStorage.setItem('admin_access','true');
    localStorage.setItem('admin_name', user);
    const logs = JSON.parse(localStorage.getItem('login_logs')||'[]');
    logs.push({user, date:new Date().toLocaleString()});
    localStorage.setItem('login_logs', JSON.stringify(logs));
    location.href='admin.html';
  } else {
    alert('Usuario o clave incorrecta');
  }
}

// RENDER editor interface on admin.html
function renderModsEditor(){
  const container = document.getElementById('modsEditor');
  const mods = loadMods();
  container.innerHTML = mods.map((m,i)=>`
    <div class="row" data-i="${i}">
      <input class="input" data-field="title" value="${escapeHtml(m.title)}"/>
      <input class="input" data-field="video" value="${escapeHtml(m.video)}" placeholder="YouTube ID"/>
      <input class="input" data-field="link" value="${escapeHtml(m.link)}" placeholder="MediaFire link"/>
      <button class="btn" onclick="saveMod(${i})">Guardar</button>
      <button class="btn ghost" onclick="deleteMod(${i})">Eliminar</button>
    </div>
    <div style="margin-bottom:8px" class="small">${escapeHtml(m.desc)}</div>
  `).join('');
}

// add new empty mod
function addEmptyMod(){
  const mods = loadMods();
  mods.push({id:Date.now(), title:'Nuevo mod', desc:'Descripción...', video:'aqz-KE-bpKQ', link:'https://www.mediafire.com/'});
  saveMods(mods);
  renderModsEditor();
  alert('Nuevo mod añadido (guardar para confirmar).');
}

// save single mod when editing
function saveMod(i){
  const rows = document.querySelectorAll('#modsEditor .row');
  const row = Array.from(rows).find(r=>parseInt(r.dataset.i)===i);
  if(!row) return;
  const title = row.querySelector('[data-field="title"]').value.trim();
  const video = row.querySelector('[data-field="video"]').value.trim();
  const link = row.querySelector('[data-field="link"]').value.trim();
  const mods = loadMods();
  mods[i].title = title || mods[i].title;
  mods[i].video = video || mods[i].video;
  mods[i].link = link || mods[i].link;
  saveMods(mods);
  alert('Guardado mod #' + (i+1));
  renderModsEditor();
}

// delete mod
function deleteMod(i){
  if(!confirm('Eliminar mod?')) return;
  const mods = loadMods(); mods.splice(i,1); saveMods(mods); renderModsEditor();
}

// save all mods (re-render)
function saveAllMods(){
  // simply reload editors to ensure saved
  alert('Asegúrate de usar "Guardar" en cada mod individual. Los cambios se guardan localmente.');
}

// logout admin
function logoutAdmin(){ localStorage.removeItem('admin_access'); location.href='index.html'; }

// OWNER functions
function createAdmin(){
  const u = document.getElementById('newAdminUser').value.trim();
  const k = document.getElementById('newAdminKey').value.trim();
  if(!u||!k){ alert('Completa ambos campos'); return; }
  const admins = JSON.parse(localStorage.getItem('raxt_admins')||'[]');
  if(admins.find(a=>a.user===u)){ alert('Ya existe ese usuario'); return; }
  admins.push({user:u,key:k}); localStorage.setItem('raxt_admins', JSON.stringify(admins));
  alert('Admin creado: ' + u);
  document.getElementById('newAdminUser').value=''; document.getElementById('newAdminKey').value='';
}

// render logs
function renderLoginLogs(){
  const el = document.getElementById('loginLogs');
  const logs = JSON.parse(localStorage.getItem('login_logs')||'[]');
  el.textContent = logs.map(l=>'👤 '+l.user+' — '+l.date).join('\n') || 'Sin registros';
}

// logout owner
function logoutOwner(){ localStorage.removeItem('owner_access'); location.href='index.html'; }
