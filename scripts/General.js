let crud =document.getElementById("Crud");

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
   
  if(administrador.email=="administrador.mve@gmail.com"){
    crud.innerHTML='<li class="nav-item"><a class="nav-link" href="../pages/admin.html">Administrador</a></li>';
  }
}

