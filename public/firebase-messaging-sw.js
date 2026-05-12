// 1. Load the scripts using the 'Compat' version
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// 2. Your config
const firebaseConfig = {
  apiKey: "AIzaSyDZ-XliEVCkZ6jVXWg0MUQ1XpcPOd47M78",
  authDomain: "pathwise-4add3.firebaseapp.com",
  projectId: "pathwise-4add3",
  storageBucket: "pathwise-4add3.firebasestorage.app",
  messagingSenderId: "154120616056",
  appId: "1:154120616056:web:941779d368a3af7e12d58d"
};

// 3. Initialize Firebase (Note the lowercase 'firebase')
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// 4. Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/logo192.png', // Ensure this file exists in your public folder!
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});