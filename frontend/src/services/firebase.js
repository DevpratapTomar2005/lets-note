
import { initializeApp } from "firebase/app";
import { getMessaging,getToken,onMessage} from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyDC7c7kY6C5BAivTVO7UWLrPiAFtaPz4sA",
    authDomain: "lets-note-a2d61.firebaseapp.com",
    projectId: "lets-note-a2d61",
    storageBucket: "lets-note-a2d61.firebasestorage.app",
    messagingSenderId: "25907335372",
    appId: "1:25907335372:web:c47aa360b1f2f4dabdb269",
    measurementId: "G-PV2B946JGK"
  };

  const vapidKey=import.meta.env.VITE_FIREBASE_VAPID_KEY
  const app = initializeApp(firebaseConfig);

  const messaging = getMessaging(app);

export const requestFCMToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      throw new Error("Permission denied");
    }
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log("Service Worker registered:", registration);
    const token = await getToken(messaging, {
      vapidKey: vapidKey,
      serviceWorkerRegistration: registration
    });
    return token;
  } catch (err) {
    console.log("Error:", err);
  }
};

  onMessage(messaging,(payload) => {
    
    if (Notification.permission === 'granted') {
      new Notification(payload.notification.title, {
        body: payload.notification.body,
       
      });
    }
  });

  
  