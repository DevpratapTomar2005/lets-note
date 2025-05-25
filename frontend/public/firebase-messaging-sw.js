


importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');


  firebase.initializeApp({apiKey: "AIzaSyDC7c7kY6C5BAivTVO7UWLrPiAFtaPz4sA",
    authDomain: "lets-note-a2d61.firebaseapp.com",
    projectId: "lets-note-a2d61",
    storageBucket: "lets-note-a2d61.firebasestorage.app",
    messagingSenderId: "25907335372",
    appId: "1:25907335372:web:c47aa360b1f2f4dabdb269",
    measurementId: "G-PV2B946JGK"});

 const messaging = firebase.messaging();


messaging.onBackgroundMessage(function (payload) {
  console.log('[SW] Firebase background message received:', payload);

  const notificationTitle = payload.notification?.title || 'Background Message';
  const notificationOptions = {
    body: payload.notification?.body
  
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});




