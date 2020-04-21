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

      db.collection('users').doc(user.uid).get().then( doc => {
        const welcome = `
          <div> Welcome, ${doc.data().name}</div>        
        `;
        document.getElementById('signinn').innerHTML = welcome;
      })
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
    if (confirm('Are you sure')){
      e.preventDefault();
      auth.signOut();
      return true
     } else {
      e.preventDefault();
       console.log('whew')
     window.location.href = "././index.html"
   //    return false
       
     }
 
});


function myFunction() {
  var input, filter, pretext, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  main = document.getElementById("lost-list");
  pretext = document.getElementById("text__pre");
  article = main.getElementsByTagName("article");
  for (i = 0; i < article.length; i++) {   
     a = article[i].getElementsByTagName("h3")[0]
     txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
          article[i].style.display = "";
          console.log('juve')
      } else {
          article[i].style.display = "none";
          console.log('chealsea')
      }
      console.log('chdalsea')
  }
  console.log('chealsea')
}
//adding a lost file

