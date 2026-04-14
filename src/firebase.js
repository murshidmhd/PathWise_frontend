import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDZ-XliEVCkZ6jVXWg0MUQ1XpcPOd47M78",
  authDomain: "pathwise-4add3.firebaseapp.com",
  projectId: "pathwise-4add3",
  storageBucket: "pathwise-4add3.firebasestorage.app",
  messagingSenderId: "154120616056",
  appId: "1:154120616056:web:941779d368a3af7e12d58d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Messaging and export it
export const messaging = getMessaging(app);
export { getToken, onMessage };