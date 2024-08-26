/* eslint-disable no-undef */

importScripts('https://www.gstatic.com/firebasejs/9.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.12.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyB0drW4BSbg9YLcoOTRxqXOq_eXLILvbXE",
    authDomain: "payment-notifications-94adf.firebaseapp.com",
    projectId: "payment-notifications-94adf",
    storageBucket: "payment-notifications-94adf.appspot.com",
    messagingSenderId: "591219931678",
    appId: "1:591219931678:web:1757fdb619e83f1a970c0f",
    measurementId: "G-6YXPQ1DRLY"
};

firebase.initializeApp(firebaseConfig);
console.log("in service worker")
const messaging = firebase.messaging();

messaging.onMessage((payload) => {
    console.log("Received message ", payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    if (Notification.permission === "granted")
        new Notification(notificationTitle, notificationOptions).show()
    else if (Notification.permission === "denied") {
        Notification.requestPermission().then((permission) => {
            if (permission === "granted") {
                new Notification(notificationTitle, notificationOptions).show()
            }
        })
    }

});