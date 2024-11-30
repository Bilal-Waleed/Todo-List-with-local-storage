const todoForm = document.getElementById("todoForm");
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");

function getTodos() {
  return JSON.parse(localStorage.getItem("todos")) || [];
}

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderData() {
  const todos = getTodos();
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const listItem = document.createElement("li");
    listItem.className = todo.done ? "done" : "";

    const content = document.createElement("span");
    content.textContent = todo.text;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    const saveButton = document.createElement("button");
    saveButton.textContent = "Save";
    saveButton.style.display = "none";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    const doneButton = document.createElement("button");
    doneButton.textContent = "Done";


    deleteButton.onclick = () => {
      todos.splice(index, 1);
      saveTodos(todos);
      renderData();
    };


    doneButton.onclick = () => {
      todos[index].done = true;
      saveTodos(todos);
      renderData();
    };


    editButton.onclick = () => {
      todoInput.value = todo.text;
      editButton.disabled = true;
      deleteButton.disabled = true;
      doneButton.disabled = true;
      saveButton.style.display = "inline";
    };


    saveButton.onclick = () => {
      todos[index].text = todoInput.value;
      saveTodos(todos);
      renderData();
    };

    listItem.append(content, editButton, saveButton, deleteButton);
    if (!todo.done) listItem.appendChild(doneButton);

    todoList.appendChild(listItem);
  });
}

todoForm.onsubmit = (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (text) {
    const todos = getTodos();
    todos.push({ text, done: false });
    saveTodos(todos);
    renderData();
    todoInput.value = "";
  }
};

renderData();
