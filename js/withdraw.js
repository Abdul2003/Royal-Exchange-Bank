import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  arrayUnion,
  updateDoc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import {
  onAuthStateChanged,
  getAuth,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

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
const app = initializeApp(firebaseConfig);

const withdrawForm = document.getElementById("withdrawForm");
const auth = getAuth();

onAuthStateChanged(auth, async (user) => {
  const db = getFirestore(app);
  const docRef = doc(db, "Transactions", user.email);
  const docSnap = await getDoc(docRef);
  withdrawForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (
      withdrawForm["walletOptions"].value == "" ||
      withdrawForm["walletId"].value == "" ||
      withdrawForm["amount"].value == ""
    ) {
      alert(`Empty Fields Not Allowed`);
    } else {
      var getDate = new Date();
      const walletOptions = withdrawForm["walletOptions"].value;
      const walletId = withdrawForm["walletId"].value;
      const amount = withdrawForm["amount"].value;
      // if (docSnap.exists()) {
      updateDoc(docRef, {
        Transaction: arrayUnion({
          date: getDate.toLocaleString(),
          walletType: walletOptions,
          walletId: walletId,
          amount: amount,
          status: "Pending",
        }),
      });

      Swal.fire({
        title: "Pending",
        text: "Transaction Pending",
        icon: "warning",
      });
      withdrawForm.reset();
    }
  });
});
