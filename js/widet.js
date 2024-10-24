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
const userName = document.querySelector(".mb-0");
const name = document.querySelector("#headerName");

onAuthStateChanged(auth, async (user) => {
  const userDocRef = doc(db, "Users", user.email);
  const userDocSnap = await getDoc(userDocRef);
  const transactionDocRef = doc(db, "Transactions", user.email);
  const transactionDocSnap = await getDoc(transactionDocRef);

  if (userDocSnap.exists()) {
    userName.innerHTML =
      userDocSnap.data().firstName + " " + userDocSnap.data().lastName;
    name.innerHTML =
      userDocSnap.data().firstName + " " + userDocSnap.data().lastName;
  }
  if (transactionDocSnap.exists()) {
    console.log("hety");
    if (transactionDocSnap.data().Transaction != undefined) {
      console.log("this worked");
      transactionDocSnap
        .data()
        .Transaction.reverse()
        .map((item) => {
          console.log(item.date);
          const parent = document.getElementById("transactionHistory");
          const transactionItem = document.createElement("div");
          transactionItem.classList.add(
            "d-flex",
            "align-items-center",
            "border-bottom",
            "py-3"
          );
          const innerParent = document.createElement("div");
          innerParent.classList.add("w-100", "ms-3");
          const container = document.createElement("div");
          container.classList.add("d-flex", "w-100", "justify-content-between");
          const amount = document.createElement("h6");
          amount.classList.add("mb-0");
          amount.innerHTML = item.amount + " " + item.walletType;
          const time = document.createElement("small");
          time.innerHTML = item.date;
          const address = document.createElement("span");
          address.innerHTML = "Address: " + item.walletId;
          const status = document.createElement("p");
          status.innerHTML = item.status;

          if (item.status == "Pending") {
            status.style.color = "rgb(230, 230, 16)";
          } else if (item.status == "Failed") {
            status.style.color = "rgb(217, 34, 17)";
          } else if (item.status == "Successful") {
            status.style.color = "rgb(17, 217, 37)";
          }
          container.appendChild(status);
          container.appendChild(amount);
          container.appendChild(time);
          innerParent.appendChild(container);
          innerParent.appendChild(address);

          transactionItem.appendChild(innerParent);
          parent.appendChild(transactionItem);
        });
    }
  }
});
