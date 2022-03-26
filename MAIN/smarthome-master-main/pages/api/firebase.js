import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAppiMGURm4NOm1HktLJ4WRazKN1XzVof4",
  authDomain: "animelist-project.firebaseapp.com",
  projectId: "animelist-project",
  storageBucket: "animelist-project.appspot.com",
  messagingSenderId: "1041327264146",
  appId: "1:1041327264146:web:6b935239aefece117e714b",
  measurementId: "G-CC6FEZEZSQ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;
