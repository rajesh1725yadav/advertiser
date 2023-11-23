// import React from 'react'
// Scripts for firebase and firebase messaging
import 'https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js';
import 'https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js';

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
    apiKey: "AIzaSyD2tJ0mxsOuIAbhXl49rlMjYIyeImF9w8o",
    authDomain: "searchppc-ccdf2.firebaseapp.com",
    projectId: "searchppc-ccdf2",
    storageBucket: "searchppc-ccdf2.appspot.com",
    messagingSenderId: "547559966720",
    appId: "1:547559966720:web:e40668c063ab90730630e5",
    measurementId: "G-LW1N39K2JH"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});