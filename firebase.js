import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC196C_wPdnT3xdGp2R0y0J_Ka7HlzcLBo",
  authDomain: "drackchat-9090b.firebaseapp.com",
  projectId: "drackchat-9090b",
  storageBucket: "drackchat-9090b.firebasestorage.app",
  messagingSenderId: "367359393362",
  appId: "1:367359393362:web:7380b6dea2bd9bee51298b"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export async function fetchMods() {
  const querySnapshot = await getDocs(collection(db, "mods"));
  return querySnapshot.docs.map(d => d.data());
}
export async function saveModToDB(mod) {
  await setDoc(doc(db, "mods", String(mod.id)), mod);
}
