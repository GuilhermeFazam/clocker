import firebase from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDOzb9aTFvrvTEmLoa5xxdWPHKc9eEaaH4",
    authDomain: "clocker-codar.firebaseapp.com",
    projectId: "clocker-codar",
    storageBucket: "clocker-codar.appspot.com",
    messagingSenderId: "739659246978",
    appId: "1:739659246978:web:fa103c105bc6779636b39b",
    measurementId: "G-FP0Q32RDTB",
};

export default firebase.apps.length
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig);
// firebase.analytics();
