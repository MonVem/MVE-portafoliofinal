const db = firebase.firestore();
const taskContainer = document.getElementById("tasks-container");



const getTasks = () => db.collection("tasks").get();

const onGetTasks = (callback) => db.collection("tasks").onSnapshot(callback);

const getTask = (id) => db.collection("tasks").doc(id).get();


window.addEventListener("DOMContentLoaded", async (e) => {
  onGetTasks((querySnapshot) => {
    taskContainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      const task = doc.data();
      task.id = doc.id;
      if (!task.fileurl) {
        task.fileurl =
          "https://firebasestorage.googleapis.com/v0/b/crud-tarea-bf62c.appspot.com/o/fiesta.png?alt=media&token=726ee673-f94c-4984-8581-85bf073f8e2a";
      }
      taskContainer.innerHTML += `
      <div class="product-item" category="${task.category}">
      <img class="card-img-top image-fluid" src="${task.fileurl}" />
      <a href="#"><h5 class="card-title" id="imgtit">${task.title}</h5></a>
    </div>
     
`; 
          
    });
  });
});

  