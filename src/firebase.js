import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyD2tJ0mxsOuIAbhXl49rlMjYIyeImF9w8o",
    authDomain: "searchppc-ccdf2.firebaseapp.com",
    projectId: "searchppc-ccdf2",
    storageBucket: "searchppc-ccdf2.appspot.com",
    messagingSenderId: "547559966720",
    appId: "1:547559966720:web:e40668c063ab90730630e5",
    measurementId: "G-LW1N39K2JH"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const messaging = getMessaging(app)

//   export const getToken = (setTokenFound) => {
//     return getToken(messaging, {vapidKey: 'GENERATED_MESSAGING_KEY'}).then((currentToken) => {
//       if (currentToken) {
//         console.log('current token for client: ', currentToken);
//         setTokenFound(true);
//         // Track the token -> client mapping, by sending to backend server
//         // show on the UI that permission is secured
//       } else {
//         console.log('No registration token available. Request permission to generate one.');
//         setTokenFound(false);
//         // shows on the UI that permission is required 
//       }
//     }).catch((err) => {
//       console.log('An error occurred while retrieving token. ', err);
//       // catch error while creating client token
//     });
//   }
// Add the public key generated from the console here.
// messaging.getToken({vapidKey: "BKagOny0KF_2pCJQ3m....moL0ewzQ8rZu"});

if(Notification.permission != "granted") {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission not granted.');
      }
    })
}

getToken(messaging, { vapidKey: 'BLiVTEed3UTWs6z8VoXQojA2vHa-RMO5SCS8MLh4tIzxx3watJ0ud46DnKBdMUQLfRpkT8OS7NAYQ5fRlmWeLTY' }).then((currentToken) => {
    if (currentToken) {
        console.log(currentToken);
      // Send the token to your server and update the UI if necessary
      // ...
    } else {
      // Show permission request UI
      console.log('No registration token available. Request permission to generate one.');
      // ...
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
  });