import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDwu9n7NsxF6WSnqfYTkTzq5HINnkB0tgU",
  authDomain: "royal-exchange-a977a.firebaseapp.com",
  projectId: "royal-exchange-a977a",
  storageBucket: "royal-exchange-a977a.appspot.com",
  messagingSenderId: "147128645262",
  appId: "1:147128645262:web:40962c9bc48bde49dffbdf",
  measurementId: "G-ZN5PDJ1TFD",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth and firestore references
const auth = getAuth();
const db = getFirestore(app);

//User Login
//user login
const loginForm = document.querySelector("#loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["email"].value;
  const password = loginForm["password"].value;
  //   const loginCode = Math.floor(1000 + Math.random() * 9000);
  //   const loginCodeString = loginCode.toString();
  //   function sendMail() {
  //     let params = {
  //       message: "Your Login Code Is " + loginCodeString,
  //       email: email,
  //     };
  //     emailjs
  //       .send("service_yh5kngj", "template_u18ot1b", params)
  //       .then(console.log("successful"))
  //       .catch((error) => console.log(error));
  //     console.log("email function ran");
  //   }
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      // await sendMail();
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Login Successful",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(function () {
        window.location = "/dashboard.html";
      }, 1500);
      loginForm.reset();
    })
    .catch((error) => {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    });
});
