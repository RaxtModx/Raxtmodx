<script src="https://www.gstatic.com/firebasejs/9.6.11/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.11/firebase-auth-compat.js"></script>

<script src="script.js"></script>

// =============================
// 🔥 FIREBASE
// =============================
const firebaseConfig = {
  apiKey: "AIzaSyC196C_wPdnT3xdGp2R0y0J_Ka7HlzcLBo",
  authDomain: "drackchat-9090b.firebaseapp.com",
  projectId: "drackchat-9090b",
  storageBucket: "drackchat-9090b.firebasestorage.app",
  messagingSenderId: "367359393362",
  appId: "1:367359393362:web:7380b6dea2bd9bee51298b"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// =============================
// KEYS
// =============================
const ADMIN_KEY = "Tadellin.1";
const OWNER_KEY = "1406";

// =============================
// DEMO MODS (SOLO SI DB ESTÁ VACÍA)
// =============================
const DEMO_MODS = [
  {title:"Roblox Parkour Plus", desc:"Salta y crea plataformas dinámicas en Roblox.", video:"aqz-KE-bpKQ", link:"https://www.mediafire.com/"},
  {title:"FreeFire Aim Helper", desc:"Herramienta de práctica.", video:"YE7VzlLtp-4", link:"https://www.mediafire.com/"},
  {title:"Blood Strike FX Pack", desc:"Paquete de efectos.", video:"2vjPBrBU-TM", link:"https://www.mediafire.com/"},
  {title:"Roblox Visuals Lite", desc:"Mejoras visuales.", video:"M7lc1UVf-VE", link:"https://www.mediafire.com/"},
  {title:"FreeFire Map Tools", desc:"Herramientas de mapas.", video:"LXb3EKWsInQ", link:"https://www.mediafire.com/"}
];

// =============================
// HELPERS
// =============================
function escapeHtml(s){
  return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;");
}

// =============================
// 🔽 CARGAR MODS DESDE FIREBASE
// =============================
async function loadMods(){
  const snap = await db.collection("mods").get();
  if(snap.empty){
    // primera vez → subir demo
    for(const m of DEMO_MODS){
      await db.collection("mods").add(m);
    }
    return DEMO_MODS.slice();
  }

  return snap.docs.map(d => ({id:d.id, ...d.data()}));
}

// =============================
// 💾 GUARDAR MOD EDITADO
// =============================
async function saveModToDB(id, data){
  await db.collection("mods").doc(id).update(data);
}

// =============================
// ➕ NUEVO MOD
// =============================
async function createEmptyMod(){
  const ref = await db.collection("mods").add({
    title:"Nuevo mod",
    desc:"Descripción...",
    video:"aqz-KE-bpKQ",
    link:"https://www.mediafire.com/"
  });
  return ref.id;
}

// =============================
// ❌ ELIMINAR MOD
// =============================
async function deleteModFromDB(id){
  await db.collection("mods").doc(id).delete();
}

// =============================
// 🖼️ GRID PÚBLICO
// =============================
async function renderModsGrid(){
  const container = document.getElementById("modsGrid");
  if(!container) return;

  const mods = await loadMods();

  container.innerHTML = mods.map(m=>`
    <div class="mod-card">
      <h3>${escapeHtml(m.title)}</h3>
      <p>${escapeHtml(m.desc)}</p>

      <div class="video-wrap">
        <iframe src="https://www.youtube.com/embed/${m.video}" frameborder="0" allowfullscreen></iframe>
      </div>

      <div class="mod-actions">
        <a class="btn" target="_blank" href="${m.link}">Descargar</a>
      </div>
    </div>
  `).join("");
}

// =============================
// 👤 LOGIN NORMAL
// =============================
document.addEventListener("DOMContentLoaded", ()=>{

  const loginBtn = document.getElementById("loginBtn");
  if(loginBtn){
    loginBtn.addEventListener("click", ()=>{
      const name = document.getElementById("loginName").value.trim();
      const pass = document.getElementById("loginPass").value.trim();
      if(!name||!pass){ alert("Completa ambos campos"); return; }

      localStorage.setItem("raxt_user", JSON.stringify({name}));

      const logs = JSON.parse(localStorage.getItem("login_logs")||"[]");
      logs.push({user:name, date:new Date().toLocaleString()});
      localStorage.setItem("login_logs", JSON.stringify(logs));

      document.getElementById("login-area").style.display="none";
      document.getElementById("content-area").style.display="block";
      renderModsGrid();
    });
  }

  if(localStorage.getItem("raxt_user")){
    const la=document.getElementById("login-area");
    const ca=document.getElementById("content-area");
    if(la) la.style.display="none";
    if(ca) ca.style.display="block";
  }

  if(location.pathname.endsWith("admin.html")){
    if(localStorage.getItem("admin_access")!=="true"){
      alert("Acceso denegado. Inicia sesión en admin-login.");
      location.href="admin-login.html";
      return;
    }
    renderModsEditor();
  }

  if(location.pathname.endsWith("owner.html")){
    if(localStorage.getItem("owner_access")!=="true"){
      alert("Acceso denegado.");
      location.href="admin-login.html";
      return;
    }
    renderLoginLogs();
  }

});

// =============================
// 🔐 LOGIN ADMIN
// =============================
function checkAdmin(){
  const user = document.getElementById("adminUser").value.trim();
  const key = document.getElementById("adminKey").value.trim();

  if(!user||!key){ alert("Completa los campos"); return; }

  if(key===OWNER_KEY){
    localStorage.setItem("owner_access","true");
    location.href="owner.html";
    return;
  }

  if(key===ADMIN_KEY){
    localStorage.setItem("admin_access","true");
    localStorage.setItem("admin_name", user);
    location.href="admin.html";
  } else {
    alert("Usuario o clave incorrecta");
  }
}

// =============================
// 🛠️ EDITOR DE MODS (ADMIN)
// =============================
async function renderModsEditor(){
  const container = document.getElementById("modsEditor");
  if(!container) return;

  const mods = await loadMods();

  container.innerHTML = mods.map((m)=>`
    <div class="row" data-id="${m.id}">
      <input class="input" data-field="title" value="${escapeHtml(m.title)}"/>
      <input class="input" data-field="video" value="${escapeHtml(m.video)}" placeholder="YouTube ID"/>
      <input class="input" data-field="link" value="${escapeHtml(m.link)}" placeholder="MediaFire link"/>

      <button class="btn" onclick="saveMod('${m.id}')">Guardar</button>
      <button class="btn ghost" onclick="deleteMod('${m.id}')">Eliminar</button>
    </div>

    <div class="small" style="margin-bottom:8px">${escapeHtml(m.desc)}</div>
  `).join("");
}

async function addEmptyMod(){
  await createEmptyMod();
  await renderModsEditor();
  alert("Nuevo mod añadido.");
}

async function saveMod(id){
  const row = document.querySelector(`.row[data-id="${id}"]`);
  if(!row) return;

  const title = row.querySelector('[data-field="title"]').value.trim();
  const video = row.querySelector('[data-field="video"]').value.trim();
  const link  = row.querySelector('[data-field="link"]').value.trim();

  await saveModToDB(id, {title,video,link});
  alert("Guardado");
  renderModsEditor();
}

async function deleteMod(id){
  if(!confirm("Eliminar mod?")) return;
  await deleteModFromDB(id);
  renderModsEditor();
}

// =============================
// 👑 OWNER
// =============================
function renderLoginLogs(){
  const el = document.getElementById("loginLogs");
  if(!el) return;

  const logs = JSON.parse(localStorage.getItem("login_logs")||"[]");
  el.textContent = logs.map(l=>`👤 ${l.user} — ${l.date}`).join("\n") || "Sin registros";
}

function logoutOwner(){
  localStorage.removeItem("owner_access");
  location.href="index.html";
}

function logoutAdmin(){
  localStorage.removeItem("admin_access");
  location.href="index.html";
      }
