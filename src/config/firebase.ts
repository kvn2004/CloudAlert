import AsyncStorage from '@react-native-async-storage/async-storage';
import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { Auth, getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// Placeholder configuration - User needs to replace this
const firebaseConfig = {
apiKey: "AIzaSyD88q06sIkf0IfCKlCA4mL9THct3Xjp4oo",
  authDomain: "cloudalert-2955f.firebaseapp.com",
  projectId: "cloudalert-2955f",
  storageBucket: "cloudalert-2955f.firebasestorage.app",
  messagingSenderId: "171229360481",
  appId: "1:171229360481:web:bbb41063b68dc5fcf85520",
  measurementId: "G-FX054HPC89"
};

// Initialize Firebase
let app: FirebaseApp;
let auth: Auth;
let firestore: ReturnType<typeof getFirestore>;
try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
    // Use AsyncStorage for persistence in React Native / Expo
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  } else {
    app = getApp();
    auth = getAuth(app);
    firestore = getFirestore(app);
  }
} catch (error) {
  console.log("Firebase initialization error:", error);
}

export { auth, firestore };

