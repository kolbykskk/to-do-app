function onReady() {
  let id = 0;
  let toDos = [];
  const addToDoForm = document.getElementById('addToDoForm');
  const newToDoText = document.getElementById('newToDoText');

  function createNewToDo() {
    if(!newToDoText.value) {
      return;
    }

    toDos.push({
      title: newToDoText.value,
      complete: false,
      id: id
    });

    id++;

    newToDoText.value = '';

    renderTheUI();
  }

  addToDoForm.addEventListener('submit', event => {
    event.preventDefault();
    createNewToDo();
    newToDoText.value = '';
  });

  function renderTheUI() {
    const toDoList = document.getElementById('toDoList');

    toDoList.textContent = '';

    toDos.forEach(function(toDo) {
      const newLi = document.createElement('li');
      const checkbox = document.createElement('input');
      const deleteButton = document.createElement('button');
      checkbox.type = "checkbox";
      deleteButton.type = "submit";
      deleteButton.textContent = "Delete";

      newLi.textContent = toDo.title;

      toDoList.appendChild(newLi);
      newLi.appendChild(checkbox);
      newLi.appendChild(deleteButton);

      deleteButton.onclick = function () {
        deleteToDo(toDo.id);
        toDoList.removeChild(newLi);
      };

    });


  };

  function deleteToDo(id) {
    toDos = toDos.filter(item => item.id !== id);
  };

};

window.onload = function() {
  onReady();
};
