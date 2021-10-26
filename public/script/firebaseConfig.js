 // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyBxuH8ZUtPxDhlXX7Lwku4-adc72FlhRqU",
        authDomain: "fit3170-49455.firebaseapp.com",
        databaseURL: "https://fit3170-49455-default-rtdb.firebaseio.com",
        projectId: "fit3170-49455",
        storageBucket: "fit3170-49455.appspot.com",
        messagingSenderId: "1065835602184",
        appId: "1:1065835602184:web:bf04b9999b9053db608cbd",
        measurementId: "G-FTLG6S75L5"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    var db = firebase.firestore();
