importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.9.1/firebase-messaging.js');
if (!firebase.apps.length) {
firebase.initializeApp({
    apiKey: "AIzaSyC1dwrKFk6gzD7hBKz35GaNrAvQxVJAb-A",
    authDomain: "pushnotification-e92f5.firebaseapp.com",
    databaseURL: "https://pushnotification-e92f5.firebaseio.com",
    projectId: "pushnotification-e92f5",
    storageBucket: "pushnotification-e92f5.appspot.com",
    messagingSenderId: "145279976713",
    appId: "1:145279976713:web:f612a0cb3ee8f9ab6a3fd8",
    measurementId: "G-D9R2S5BLG4"
});
const abc = firebase.messaging();

//background notifications will be received here
firebase.messaging().setBackgroundMessageHandler((payload) => console.log('payload', payload));
}