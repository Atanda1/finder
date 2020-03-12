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
        errorMessage.innerHTML = "Error: Password must contain at least six characters!";
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
  
                    /*  axios.post('https://cors-anywhere.herokuapp.com/http://finder.nutrichef.com.ng/api/v1/signup', {
                      full_name :fullName, 
                      email:email,  
                      mobile_number:mobileNumber, 
                      gender: gender, 
                      address: address,  
                      password: inputpassword,  
                      password_confirmation: confirmPassword
            })
            .then(function (response) {
              console.log(response);
            })
            .then((data) => {
                localStorage.setItem('access_token', data.token);
                window.location.href = "./dashboard.html";
              })
            .catch(function (error) {
              console.log(error);
              document.getElementById("errorMessage").innerHTML= "Email has already been taken";
            }); */

            auth.createUserWithEmailAndPassword(email, inputpassword).then(response => {
              return db.collection('users').doc(response.user.uid).set({
                fullName: fullName,
                mobileNumber : mobileNumber,
                address: address
            })}).then((data) => {
               
                window.location.href = "./index.html";
              }).catch(e => alert(e.message));
         }
         
             
