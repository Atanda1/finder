// console.log(document.querySelector('#lost_items'));
var firebaseConfig = {
    apiKey: "AIzaSyDnu7wxYQNay5_EAroXWzX8PdUBzfwPnZg",
    authDomain: "finder-app-9ec75.firebaseapp.com",
    databaseURL: "https://finder-app-9ec75.firebaseio.com",
    projectId: "finder-app-9ec75",
    storageBucket: "finder-app-9ec75.appspot.com",
    messagingSenderId: "1045507956536",
    appId: "1:1045507956536:web:450340d66c416bf065ebcd",
    measurementId: "G-EMKFV07MRR"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const auth =firebase.auth();
const db =firebase.firestore();
const storage = firebase.storage().ref();
db.settings({ timestampsInSnapshots: true });   


auth.onAuthStateChanged(user => {
    if (user) {
        console.log("user logged in", user)
        setupUI(user);
        db.collection('lost').onSnapshot(snapshot => {
            setupGuides(snapshot.docs);
          });
    } else {
      setupUI();
      console.log("user logged out")
      setupGuides([]);
    }
  });

//Toggle the Menu conditionally
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const setupUI = (user) => {
    if (user) {
      // toggle user UI elements
      loggedInLinks.forEach(item => item.style.display = 'block');
      loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
      // toggle user elements
      loggedInLinks.forEach(item => item.style.display = 'none');
      loggedOutLinks.forEach(item => item.style.display = 'block');
      document.querySelectorAll(".lostItem").forEach(item => {
          item.addEventListener('click', function (e) {
            e.preventDefault();
            location.href = "././signup.html";
          });
    });
    }
  };
  
  //logout 
  const logout = document.querySelector('.logout');
  logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});



//adding a lost file

