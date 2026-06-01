import { o as onAuthStateChanged, g as getAuth, s as signInAnonymously } from "../_chunks/_libs/@firebase/auth.mjs";
import { o as onSnapshot, q as query, a as orderBy, w as where, c as collection, d as doc, s as setDoc, g as getFirestore } from "../_chunks/_libs/@firebase/firestore.mjs";
import { c as getApps, i as initializeApp } from "../_chunks/_libs/@firebase/app.mjs";
const firebaseConfig = {
  apiKey: void 0,
  authDomain: void 0,
  projectId: void 0,
  storageBucket: void 0,
  messagingSenderId: void 0,
  appId: void 0
};
const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.appId
);
let app = null;
let db = null;
let auth = null;
function getFirebaseApp() {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured.");
  }
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  }
  return app;
}
function getDb() {
  if (!db) db = getFirestore(getFirebaseApp());
  return db;
}
function getFirebaseAuth() {
  if (!auth) auth = getAuth(getFirebaseApp());
  return auth;
}
async function ensureFirebaseUser() {
  const firebaseAuth = getFirebaseAuth();
  if (firebaseAuth.currentUser) {
    return firebaseAuth.currentUser.uid;
  }
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      unsubscribe();
      if (user) {
        resolve(user.uid);
        return;
      }
      try {
        const cred = await signInAnonymously(firebaseAuth);
        resolve(cred.user.uid);
      } catch (error) {
        reject(error);
      }
    });
  });
}
const LOCAL_KEY = "subvime_checklists";
function readLocalChecklists() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function writeLocalChecklists(checklists) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(checklists));
}
function subscribeToChecklists(userId, onData, onError) {
  if (!isFirebaseConfigured) {
    onData(readLocalChecklists().filter((c) => c.userId === userId));
    const interval = window.setInterval(() => {
      onData(readLocalChecklists().filter((c) => c.userId === userId));
    }, 1e3);
    return () => window.clearInterval(interval);
  }
  return onSnapshot(
    query(
      collection(getDb(), "checklists"),
      where("userId", "==", userId),
      orderBy("updatedAt", "desc")
    ),
    (snap) => {
      onData(snap.docs.map((d) => d.data()));
    },
    (error) => onError?.(error)
  );
}
function subscribeToChecklist(checklistId, onData, onError) {
  if (!isFirebaseConfigured) {
    const found = readLocalChecklists().find((c) => c.id === checklistId) ?? null;
    onData(found);
    return () => {
    };
  }
  return onSnapshot(
    doc(getDb(), "checklists", checklistId),
    (snap) => {
      onData(snap.exists() ? snap.data() : null);
    },
    (error) => onError?.(error)
  );
}
async function saveChecklist(checklist) {
  const payload = { ...checklist, updatedAt: Date.now() };
  if (!isFirebaseConfigured) {
    const all = readLocalChecklists();
    const index = all.findIndex((c) => c.id === payload.id);
    if (index >= 0) all[index] = payload;
    else all.unshift(payload);
    writeLocalChecklists(all);
    return;
  }
  await setDoc(doc(getDb(), "checklists", payload.id), payload, { merge: true });
}
export {
  saveChecklist as a,
  subscribeToChecklist as b,
  ensureFirebaseUser as e,
  isFirebaseConfigured as i,
  subscribeToChecklists as s
};
