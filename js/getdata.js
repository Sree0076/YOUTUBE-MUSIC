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

async function fetchData(email) {
    try {
        const db = getDatabase();
        const dbRef = ref(db);
        
        const snapshot = await get(child(dbRef, 'Youtube/'+email.split('@')[0]));
        
        if (snapshot.exists()) {
            console.log(snapshot.val());
            const myArray = Object.values(snapshot.val());
            localStorage.setItem('test', JSON.stringify(myArray));
             localStorage.setItem('highScore',myArray[0])
          
        } else {
            console.log("No data available for", ('Players/'));
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
 window.location.href = "landinpage.html";
}
