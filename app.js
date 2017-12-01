function onReady() {
  let toDos = [];
  let id = 0
  if(localStorage.getItem('toDos')) {
    toDos = JSON.parse(localStorage.getItem('toDos'));
    id = toDos.length;
    renderTheUI();
  }
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

    localStorage.setItem('toDos', JSON.stringify(toDos));
    renderTheUI();
    console.log(toDos);
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

      if(toDo.complete === true) {
        checkbox.checked = true;
      }

      newLi.textContent = toDo.title;

      toDoList.appendChild(newLi);
      newLi.appendChild(checkbox);
      newLi.appendChild(deleteButton);

      deleteButton.onclick = function () {
        deleteToDo(toDo.id);
        toDoList.removeChild(newLi);
      };

      checkbox.onclick = function () {
        if(checkbox.checked) {
          toDo.complete = true;
          localStorage.setItem('toDos', JSON.stringify(toDos));
        } else {
          toDo.complete = false;
          localStorage.setItem('toDos', JSON.stringify(toDos));
        }
      };

    });


  };

  function deleteToDo(id) {
    toDos = toDos.filter(item => item.id !== id);
    localStorage.setItem('toDos', JSON.stringify(toDos));
  };

};

window.onload = function() {
  onReady();
};
