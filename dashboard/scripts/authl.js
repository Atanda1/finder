
document.getElementById('signin').addEventListener('submit', signin);

function signin(event){
    event.preventDefault();  
    email = document.getElementById('inputEmail1').value;
    inputpassword = document.getElementById('inputPassword1').value;
    invalid_login = document.getElementById('invalid_login');

    auth.signInWithEmailAndPassword(email, inputpassword).then(res => {
        console.log(res)
    })
        .then(data => window.location.href = "./index.html").catch(e => alert(e.message));
}