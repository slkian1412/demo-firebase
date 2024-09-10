import { initializeApp } from 'firebase/app';
import { getMessaging, onMessage } from 'firebase/messaging';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAZWQkte3AnGEgT5A0Tj9VrQmSgNxDQD5E',
  authDomain: 'fir-firebase-f0992.firebaseapp.com',
  projectId: 'fir-firebase-f0992',
  storageBucket: 'fir-firebase-f0992.appspot.com',
  messagingSenderId: '807845222708',
  appId: '1:807845222708:web:ba12ff94cb818b4adc2d61',
  measurementId: 'G-QFL2ZSLDRE',
};

// Khởi tạo firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const messaging = getMessaging(app);

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

// Hàm gửi thông báo
export const addNotification = async (notification) => {
  try {
    const docRef = await addDoc(collection(db, 'notifications'), notification);
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// Hàm nhận thông báo
export const getNotifications = async () => {
  const querySnapshot = await getDocs(collection(db, 'notifications'));
  const notifications = [];
  querySnapshot.forEach((doc) => {
    notifications.push({ id: doc.id, ...doc.data() });
  });
  return notifications;
};

export const onNotificationsSnapshot = (callback) => {
  return onSnapshot(collection(db, 'notifications'), (snapshot) => {
    const notifications = [];
    snapshot.forEach((doc) => {
      notifications.push({ id: doc.id, ...doc.data() });
    });
    notifications.sort((a, b) => a.timestamp - b.timestamp);
    callback(notifications);
  });
};
