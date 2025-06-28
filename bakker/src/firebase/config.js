// src/firebase/config.js

// استيراد الوظائف الأساسية من Firebase
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// تكوين تطبيق Firebase الخاص بك
const firebaseConfig = {
  apiKey: "AIzaSyAT9WUzJhiz_TiD_LPky_TBRTh07ds8PkE",
  authDomain: "bacc-8ed51.firebaseapp.com",
  projectId: "bacc-8ed51",
  storageBucket: "bacc-8ed51.firebasestorage.app",
  messagingSenderId: "570715122823",
  appId: "1:570715122823:web:918705150bbb685c0c9c22",
  measurementId: "G-JRP54Z9B3X"
};

// تهيئة Firebase فقط إذا لم تكن هناك تطبيقات موجودة بالفعل
// هذا مهم لـ Next.js لتجنب محاولة تهيئة التطبيق مرتين
let firebaseApp;
let analytics;
let db;
let auth;
let storage;

if (typeof window !== 'undefined' && !getApps().length) {
  // تهيئة Firebase
  firebaseApp = initializeApp(firebaseConfig);
  
  // تهيئة Analytics (فقط في المتصفح)
  analytics = getAnalytics(firebaseApp);
  
  // تهيئة خدمات Firebase الأخرى
  db = getFirestore(firebaseApp);
  auth = getAuth(firebaseApp);
  storage = getStorage(firebaseApp);
} else {
  // في حالة SSR، نتجنب تهيئة analytics
  firebaseApp = initializeApp(firebaseConfig);
  db = getFirestore(firebaseApp);
  auth = getAuth(firebaseApp);
  storage = getStorage(firebaseApp);
}

// تصدير الكائنات التي سيتم استخدامها في باقي التطبيق
export { firebaseApp, analytics, db, auth, storage };