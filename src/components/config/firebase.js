import * as firebase from 'firebase';

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDPGjGe7qW465Ys-HD1noYbPnH9hnIGVTY",
    authDomain: "saylani98-487f6.firebaseapp.com",
    databaseURL: "https://saylani98-487f6.firebaseio.com",
    projectId: "saylani98-487f6",
    storageBucket: "saylani98-487f6.appspot.com",
    messagingSenderId: "379806371411"
  };
  firebase.initializeApp(config);

  export default firebase;