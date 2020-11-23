const db = firebase.firestore();
const taskForm = document.getElementById("task-form");
const taskContainer = document.getElementById("tasks-container");
let editStatus = false;
let id;

async function uploadImage(file) {
  const ref = firebase.storage().ref();
  const name = new Date() + "-" + file.name;
  const metadata = { contentType: file.type };
  const snapshot = await ref.child(name).put(file, metadata);
  const url = await snapshot.ref.getDownloadURL();
  return url;
}

const saveTask = (title, description, category, fileurl) =>
  db.collection("tasks").doc().set({
    title,
    description,
    category,
    fileurl
  });

const getTasks = () => db.collection("tasks").get();

const onGetTasks = (callback) => db.collection("tasks").onSnapshot(callback);

const deleteTask = (id) => db.collection("tasks").doc(id).delete();

const getTask = (id) => db.collection("tasks").doc(id).get();

const updateTask = (id, updatedTask) =>
  db.collection("tasks").doc(id).update(updatedTask);

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
      
      <div class="card card-body mt-2">
      <h3 class="h5">${task.title}</h3>
      <p>${task.description}</p>
      <img class="img-fluid" src="${task.fileurl}" />
      
      <div>
      <p class="badge badge-pill badge-light">${task.category}</p><br>
          <button class="btn btn-secondary btn-delete" data-id="${task.id}">Borrar</button>
          <button class="btn btn-info btn-edit" data-id="${task.id}">Editar</button>
      </div>
  </div>
`;
      const btnDelete = document.querySelectorAll(".btn-delete");

      btnDelete.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          await deleteTask(e.target.dataset.id);
        });
      });

      const btnEdit = document.querySelectorAll(".btn-edit");

      btnEdit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const task = await getTask(e.target.dataset.id);

          editStatus = true;
          id = task.id;
          taskForm["task-title"].value = task.data().title;
          taskForm["task-description"].value = task.data().description;
          taskForm["task-category"].value = task.data().category;
          taskForm["btn-task-form"].innerHTML = "Guardar cambios";
        });
      });
    });
  });
});
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = taskForm["task-title"];
  const description = taskForm["task-description"];
  const category = taskForm["task-category"];
  const file = taskForm["task-image"].files[0];

  let fileurl = null;

  if (file) {
    fileurl = await uploadImage(file);
  }

  if (!editStatus) {
    await saveTask(title.value, description.value, category.value, fileurl);
  } else {
    if (file) {
      await updateTask(id, {
        title: title.value,
        description: description.value,
        category: category.value,
        fileurl
      });
    } else {
      await updateTask(id, {
        title: title.value,
        description: description.value,
        category: category.value
      });
    }

    editStatus = false;
    id = "";
    taskForm["btn-task-form"].innerHTML = "Crear";
  }

  getTasks();
  taskForm.reset();
  title.focus();
});
