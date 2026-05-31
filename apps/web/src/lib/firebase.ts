import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  query,
  where,
  orderBy,
  type Firestore,
} from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged, type Auth } from "firebase/auth";
import type { Checklist } from "@/types/checklist";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.appId,
);

let app: FirebaseApp | null = null;
let db: Firestore | null = null;
let auth: Auth | null = null;

function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured.");
  }
  if (!app) {
    app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
  }
  return app;
}

export function getDb(): Firestore {
  if (!db) db = getFirestore(getFirebaseApp());
  return db;
}

export function getFirebaseAuth(): Auth {
  if (!auth) auth = getAuth(getFirebaseApp());
  return auth;
}

export async function ensureFirebaseUser(): Promise<string> {
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

function readLocalChecklists(): Checklist[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as Checklist[]) : [];
  } catch {
    return [];
  }
}

function writeLocalChecklists(checklists: Checklist[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(checklists));
}

export async function listChecklists(userId: string): Promise<Checklist[]> {
  if (!isFirebaseConfigured) {
    return readLocalChecklists().filter((c) => c.userId === userId);
  }

  const snap = await getDocs(
    query(
      collection(getDb(), "checklists"),
      where("userId", "==", userId),
      orderBy("updatedAt", "desc"),
    ),
  );
  return snap.docs.map((d) => d.data() as Checklist);
}

export function subscribeToChecklists(
  userId: string,
  onData: (checklists: Checklist[]) => void,
  onError?: (error: Error) => void,
): () => void {
  if (!isFirebaseConfigured) {
    onData(readLocalChecklists().filter((c) => c.userId === userId));
    const interval = window.setInterval(() => {
      onData(readLocalChecklists().filter((c) => c.userId === userId));
    }, 1000);
    return () => window.clearInterval(interval);
  }

  return onSnapshot(
    query(
      collection(getDb(), "checklists"),
      where("userId", "==", userId),
      orderBy("updatedAt", "desc"),
    ),
    (snap) => {
      onData(snap.docs.map((d) => d.data() as Checklist));
    },
    (error) => onError?.(error),
  );
}

export function subscribeToChecklist(
  checklistId: string,
  onData: (checklist: Checklist | null) => void,
  onError?: (error: Error) => void,
): () => void {
  if (!isFirebaseConfigured) {
    const found = readLocalChecklists().find((c) => c.id === checklistId) ?? null;
    onData(found);
    return () => {};
  }

  return onSnapshot(
    doc(getDb(), "checklists", checklistId),
    (snap) => {
      onData(snap.exists() ? (snap.data() as Checklist) : null);
    },
    (error) => onError?.(error),
  );
}

export async function saveChecklist(checklist: Checklist): Promise<void> {
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

export async function getChecklist(checklistId: string): Promise<Checklist | null> {
  if (!isFirebaseConfigured) {
    return readLocalChecklists().find((c) => c.id === checklistId) ?? null;
  }

  const snap = await getDoc(doc(getDb(), "checklists", checklistId));
  return snap.exists() ? (snap.data() as Checklist) : null;
}

export async function deleteChecklist(checklistId: string): Promise<void> {
  if (!isFirebaseConfigured) {
    writeLocalChecklists(readLocalChecklists().filter((c) => c.id !== checklistId));
    return;
  }

  await deleteDoc(doc(getDb(), "checklists", checklistId));
}
