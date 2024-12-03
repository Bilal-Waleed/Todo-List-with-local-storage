function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderData() {
    var todos = getTodos();
    todoList.innerHTML = "";
  
    todos.forEach(function (todo, index) {
      var listItem = document.createElement("li");
      listItem.className = todo.done ? "done" : "";
  
      var content = document.createElement("span");
      content.textContent = todo.text;

      var editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = todo.text;
      editInput.style.display = "none";

      var editButton = document.createElement("button");
      editButton.textContent = "Edit";

      var saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      saveButton.style.display = "none";

      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";

      var doneButton = document.createElement("button");
      doneButton.textContent = "Done";

      deleteButton.onclick = function () {
        todos.splice(index, 1); 
        saveTodos(todos);
        renderData();
      };

      doneButton.onclick = function () {
        todos[index].done = true; 
        saveTodos(todos);
        renderData();
      };

      editButton.onclick = function () {
        content.style.display = "none";
        editInput.style.display = "inline"; 
        editButton.style.display = "none"; 
        deleteButton.style.display = "none"; 
        doneButton.style.display = "none"; 
        saveButton.style.display = "inline";
      };

      saveButton.onclick = function () {
        var updatedText = editInput.value.trim();
        if (updatedText) {
          todos[index].text = updatedText; 
          saveTodos(todos);
          renderData();
        }
      };

      listItem.append(content, editInput, saveButton, deleteButton);
  
      if (!todo.done) {
        listItem.append(editButton, doneButton);
      }
  
      todoList.appendChild(listItem);
    });
  }
  
  todoForm.onsubmit = function (e) {
    e.preventDefault(); 
    var text = todoInput.value.trim();
    if (text) {
      var todos = getTodos();
      todos.push({ text: text, done: false });
      saveTodos(todos);
      renderData();
      todoInput.value = ""; 
    }
  };
  
  renderData();
  