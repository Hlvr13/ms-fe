import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDA7cKmo7YBeLJTOD0TUCsQAb_hUOE35Ic",
    authDomain: "musicsoul-3f0f9.firebaseapp.com",
    databaseURL: "https://musicsoul-3f0f9.firebaseio.com",
    projectId: "musicsoul-3f0f9",
    storageBucket: "musicsoul-3f0f9.appspot.com",
    messagingSenderId: "861681555601"
}

export default firebase.initializeApp(config);