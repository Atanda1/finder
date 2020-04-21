var fullName, mobileNumber, address, email, inputpassword, confirmPassword, gender;        
document.getElementById('registerform').addEventListener('submit', registerform);

function registerform(event){
  event.preventDefault();
    fullName = document.getElementById('fullName').value;
    mobileNumber = document.getElementById('mobileNumber').value;
    address = document.getElementById('address').value;
    email = document.getElementById('email').value;
    inputpassword = document.getElementById('inputpassword').value;
    confirmPassword = document.getElementById('confirmPassword').value;
    document.getElementsByName('gender').forEach(el => {
      if(el.checked){
        gender = el.value;
      }
});
          
          
   
    if(inputpassword != "" && inputpassword ==  confirmPassword) {
      if(inputpassword.length < 8) {
        errorMessage.innerHTML = "Error: Password must contain at least 8 characters , at least one uppercase, and a number!";
        document.getElementById('inputpassword').focus();
        return false;
      }
      re = /[0-9]/;
      if(!re.test(inputpassword)) {
        errorMessage.innerHTML="Error: password must contain at least one number (0-9)!";
        document.getElementById('inputpassword').focus();
        return false;
      }
      re = /[a-z]/;
      if(!re.test(inputpassword)) {
        errorMessage.innerHTML= "Error: password must contain at least one lowercase letter (a-z)";
        document.getElementById('inputpassword').focus();
        return false;
      }
      re = /[A-Z]/;
      if(!re.test(inputpassword)) {
        errorMessage.innerHTML="Error: password must contain at least one uppercase letter (A-Z)!";
        document.getElementById('inputpassword').focus();
        return false;
       } 
    }else {
      errorMessage.innerHTML="Error: Please check that you've entered and confirmed your password!";
      document.getElementById('inputpassword').focus();
      return false;
    }
    console.log(fullName);
    auth.createUserWithEmailAndPassword(email, inputpassword).then( cred => {
      return db.collection('users').doc(cred.user.uid).set ({
        name : fullName,
        phone_number : mobileNumber,
        email: email,
        address :address
      })
    }).then(() => {
      window.location.href = "./index.html";
      console.log("posted")
    }).catch(e => 
    errorMessage.innerHTML = e.message
    );
}
         
             

