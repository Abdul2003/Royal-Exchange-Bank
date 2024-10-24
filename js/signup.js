import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
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
//User Signup

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const signupForm = document.querySelector("#signupForm");
  const email = signupForm["email"].value;
  const password = signupForm["password"].value;
  const confirmPassword = signupForm["confirmPassword"].value;
  const firstName = signupForm["first_name"].value;
  const lastName = signupForm["last_name"].value;

  if (password.length < 6) {
    Swal.fire({
      position: "top",
      icon: "error",
      title: "Password Should Be More Than 6 Characters",
      showConfirmButton: false,
      timer: 1000,
    });
  } else if (password != confirmPassword) {
    Swal.fire({
      position: "top",
      icon: "error",
      title: "Password Doesnt Match",
      showConfirmButton: false,
      timer: 1000,
    });
  } else {
    createUserWithEmailAndPassword(auth, email, password)
      .then((credential) => {
        console.log(credential);
        setDoc(doc(db, "Transactions", email), {});
        setDoc(doc(db, "Users", email), {
          firstName: firstName,
          lastName: lastName,
          balance: "0",
          profitReturn: "0",
          totalDeposit: "0",
          totalWithdrawal: "0",
        }).then(function () {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Registered Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(function () {
            window.location = "/signin.html";
          }, 1500);
          signupForm.reset();
        });
      })

      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      });
  }
});
