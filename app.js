function renderData() {
    var todos = getTodos();
    todoList.innerHTML = ""; // Clear the current list
  
    todos.forEach(function (todo, index) {
      var listItem = document.createElement("li");
      listItem.className = todo.done ? "done" : ""; // Add 'done' class if completed
  
      // Create a span to display the todo text
      var content = document.createElement("span");
      content.textContent = todo.text;
  
      // Create an input for editing (hidden by default)
      var editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = todo.text;
      editInput.style.display = "none";
  
      // Edit button
      var editButton = document.createElement("button");
      editButton.textContent = "Edit";
  
      // Save button (hidden by default)
      var saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      saveButton.style.display = "none";
  
      // Delete button
      var deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
  
      // Done button
      var doneButton = document.createElement("button");
      doneButton.textContent = "Done";
  
      // Delete functionality
      deleteButton.onclick = function () {
        todos.splice(index, 1); // Remove the todo
        saveTodos(todos);
        renderData();
      };
  
      // Mark as done functionality
      doneButton.onclick = function () {
        todos[index].done = true; // Mark as done
        saveTodos(todos);
        renderData();
      };
  
      // Edit functionality
      editButton.onclick = function () {
        content.style.display = "none"; // Hide text display
        editInput.style.display = "inline"; // Show input field
        editButton.style.display = "none"; // Hide Edit button
        deleteButton.style.display = "none"; // Hide Delete button
        doneButton.style.display = "none"; // Hide Done button
        saveButton.style.display = "inline"; // Show Save button
      };
  
      // Save functionality
      saveButton.onclick = function () {
        var updatedText = editInput.value.trim();
        if (updatedText) {
          todos[index].text = updatedText; // Update todo text
          saveTodos(todos);
          renderData(); // Re-render the list
        }
      };
  
      // Append elements to the list item
      listItem.append(content, editInput, saveButton, deleteButton);
  
      // Only add buttons if not marked as done
      if (!todo.done) {
        listItem.append(editButton, doneButton);
      } else {
        listItem.classList.add("strike-through"); // Add a class to style as crossed out
      }
  
      // Append the list item to the list
      todoList.appendChild(listItem);
    });
  }
  
  // Fetch todos from localStorage
  function getTodos() {
    return JSON.parse(localStorage.getItem("todos")) || [];
  }
  
  // Save todos to localStorage
  function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  // Add new todos
  todoForm.onsubmit = function (e) {
    e.preventDefault(); // Prevent form submission
    var text = todoInput.value.trim();
    if (text) {
      var todos = getTodos();
      todos.push({ text: text, done: false });
      saveTodos(todos);
      renderData();
      todoInput.value = ""; // Clear the input field
    }
  };
  
  // Initial rendering of todos
  renderData();
  