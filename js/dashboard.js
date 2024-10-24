import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
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

const balance = document.querySelector("#balance");
const profitReturn = document.querySelector("#profitReturn");
const totalDeposit = document.querySelector("#totalDeposit");
const totalWithdrawal = document.querySelector("#totalWithdrawal");

const name = document.querySelector(".mb-0");

onAuthStateChanged(auth, async (user) => {
  const userDocRef = doc(db, "Users", user.email);
  const userDocSnap = await getDoc(userDocRef);
  const transactionDocRef = doc(db, "Transactions", user.email);
  const transactionDocSnap = await getDoc(transactionDocRef);

  console.log(user.email);

  if (userDocSnap.exists()) {
    console.log("Document data:", userDocSnap.data());
    console.log("transaction data:", transactionDocSnap.data());
    balance.innerHTML = "$" + userDocSnap.data().balance;
    profitReturn.innerHTML = "$" + userDocSnap.data().profitReturn;
    totalDeposit.innerHTML = "$" + userDocSnap.data().totalDeposit;
    totalWithdrawal.innerHTML = "$" + userDocSnap.data().totalWithdrawal;
    name.innerHTML =
      userDocSnap.data().firstName + " " + userDocSnap.data().lastName;
    userName.innerHTML =
      userDocSnap.data().firstName + " " + userDocSnap.data().lastName;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  console.log("here is " + transactionDocSnap.exists());
  console.log("heloooooooooooo");
  if (transactionDocSnap.exists()) {
    console.log("hety");
    if (transactionDocSnap.data().Transaction != undefined) {
      transactionDocSnap
        .data()
        .Transaction.reverse()
        .map((item) => {
          console.log(transactionDocSnap.data().Transaction);
          const parent = document.querySelector("#transactionHistory");
          const transactionItem = document.createElement("div");
          transactionItem.classList.add(
            "d-flex align-items-center border-bottom py-3"
          );
          const innerParent = document.createElement("div");
          innerParent.classList.add("w-100 ms-3");
          const container = document.createElement("div");
          container.classList.add("d-flex w-100 justify-content-between");
          const amount = document.createElement("h6");
          amount.classList.add("mb-0");
          amount.innerHTML = item.amount;
          const time = document.createElement("small");
          time.innerHTML = item.date;
          const address = document.createElement("span");
          address.innerHTML = item.walletId;

          container.appendChild(amount);
          container.appendChild(time);
          innerParent.appendChild(container);
          innerParent.appendChild(address);

          transactionItem.appendChild(innerParent);
          parent.appendChild(transactionItem);
        });
    }
  } else {
    ("nooo");
  }
});
