const taskForm = document.getElementById("task-form");
let crud =document.getElementById("Crud");
let notlog=document.getElementById("contenedor");

function entrar(){
  event.preventDefault();
  let correo = document.getElementById("email").value;
  let password = document.getElementById("contra").value;

  firebase.auth().signInWithEmailAndPassword(correo, password)
  // .then((user) => {
  //   // Signed in 
  //   // ...
  // })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    
    alert(errorMessage);
  });
  taskForm.reset();
};

function observador(){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("si");
      let administrador =firebase.auth().currentUser;
      Logged(administrador);
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      // ...
    } else {
      console.log("no");
      Notlogged();
      // User is signed out
      // ...
    }
  });
  return false;
}
observador();

function Logged(administrador){
   var contenido = document.getElementById("contenedor");
   contenido.innerHTML = '<br><p><br>Bienvenido al Portafolio MonseVEM</p><br><button onclick="cerrar()">Logout</button><br><br><br><br>';
   if(administrador.email=="administrador.mve@gmail.com"){
    crud.innerHTML='<li class="nav-item"><a class="nav-link" href="../pages/admin.html">Administrador</a></li>';
  }
}
function Notlogged(){
notlog.innerHTML=` <h4>¡Bienvenido!</h4>
<input class="controls form-control" type="email"  id="email" placeholder="Ingrese su Correo">
<input class="controls form-contol" type="password"  id="contra" placeholder="Ingrese su Contraseña">
<p>Estoy de acuerdo con <a href="../pages/TermCo.html">Terminos y Condiciones</a></p>
<button onclick="entrar()">Login</button>
<p><a href="../pages/Registro.html">Registrarse</a></p>`;
}

function cerrar(){
firebase.auth().signOut().then(function()
{console.log('saliendo...')
crud.innerHTML=" ";
})
.catch(function(error){
  console.log(error)
})
return false;
}