const button1 = document.getElementById("enviar");
button1.onclick =function(){
  enviar();
  return false;
};

function enviar(){
  let email = document.getElementById("correo").value;
  let pass = document.getElementById("pass").value;

  firebase.auth().createUserWithEmailAndPassword(email, pass)
  // .then((user) => {
  //   // Signed in 
  //   // ...
  // })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
    alert(errorMessage);
  });
 taskForm.reset();
};

