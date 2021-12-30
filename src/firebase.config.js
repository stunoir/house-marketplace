import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA-duOAGC8QW7iq4-eyVQKwwpAi9u_CGIM',
  authDomain: 'house-marketplace-app-d623e.firebaseapp.com',
  projectId: 'house-marketplace-app-d623e',
  storageBucket: 'house-marketplace-app-d623e.appspot.com',
  messagingSenderId: '420024033135',
  appId: '1:420024033135:web:8d13b9fb713ff5cb62129a',
}

// Initialize Firebase
initializeApp(firebaseConfig)
export const db = getFirestore()
