"use strict";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signOut} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref,push, set } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCELM-00gCgQzG2upcmCER-N971eQYv3fQ",
    authDomain: "game-50b12.firebaseapp.com",
    databaseURL: "https://game-50b12-default-rtdb.firebaseio.com",
    projectId: "game-50b12",
    storageBucket: "game-50b12.appspot.com",
    messagingSenderId: "923902245237",
    appId: "1:923902245237:web:7409954b2f303772c67b3c",
    measurementId: "G-S6H42D5PQW"
};
// Initialize Firebase
var app = initializeApp(firebaseConfig)
var auth = getAuth(app);

// function signOutUser() {
//     auth.signOut().then(() => {
//       console.log('User signed out.');
//       localStorage.clear();
//       // Optionally, redirect the user to another page
//       window.location.href = 'login.html';
//     }).catch((error) => {
//       console.error('Sign Out Error', error);
//     });
//   }


// function addData(email,song ) {

//     const database = getDatabase();
//     set(ref(database,'Youtube/'+email.split('@')[0]), {
//         id:email,
//         song,
//     }).then(() => {

//         //Hide Alert Message After Seven Seconds(6)
//         setTimeout(function () {
//             document.querySelector('.alert').style.display = 'none';
//         }, 7000);
//         document.getElementById('registrationform').reset();
//     }).catch((error) => {
//         signOutUser();
//     })
// }
// addData(localStorage.getItem('email'),'12345dggs');
// Function to add data incrementally to the Firebase database without replacing existing data
function addData(email, song) {
    const database = getDatabase();
    const userRef = ref(database, 'Youtube/' + email.split('@')[0]);
    const newSongRef = push(userRef);  // Generate a new unique key for the new song

    set(newSongRef, {
        song,
    }).then(() => {
        // Hide Alert Message After Seven Seconds (7)
        setTimeout(function () {
            document.querySelector('.alert').style.display = 'none';
        }, 7000);
        document.getElementById('registrationform').reset();
    }).catch((error) => {
    });
}

// Example usage
addData(localStorage.getItem('email'), '12345dggs');
