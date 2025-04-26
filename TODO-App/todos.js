console.log("JS loaded!");

let todos = [];


  
function addTodo() {
  const id = document.getElementById("taskId").value;
  const task = document.getElementById("task").value.trim();
  const priority = document.getElementById("priority").value;

  if (!task || !priority) {
    alert("Please enter task and priority.");
    return;
  }

  if (id !== "") {
    let todo = todos.find((todo) => todo.id == id);
    if (todo) {
      todo.task = task;
      todo.priority = priority;
    }
  } else {
    let todo = {
        id: new Date().getTime(),
        task: task,
        priority: priority,
        completed: false,
      };
    todos.push(todo);
  }

  document.getElementById("task").value = "";
  document.getElementById("taskId").value = "";
  renderTodos();
}

function renderTodos() {
    const tbody = document.getElementById("todosList");
    let strTodos = "";
  
    todos.forEach((todo) => {
      const completedClass = todo.completed ? "text-decoration-line-through text-muted" : "";
  
      strTodos += `<tr>
        <td class='d-none'>${todo.id}</td>
        <td class="${completedClass}">${todo.task}</td>
        <td class="${completedClass}">${todo.priority}</td>
        <td>
          <button class="btn btn-success btn-sm" onclick="toggleComplete(${todo.id})">
            ${todo.completed ? "Undo" : "Complete"}
          </button>
        </td>
        <td>
          <button class="btn btn-warning btn-sm" onclick="editTodo(${todo.id})">Update</button>
        </td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteTodo(${todo.id})">Delete</button>
        </td>
      </tr>`;
    });
  
    tbody.innerHTML = strTodos;
}
 
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id != id);
  renderTodos();
}

function editTodo(id) {
  const todo = todos.find((todo) => todo.id == id);
  if (todo) {
    document.getElementById("taskId").value = todo.id;
    document.getElementById("task").value = todo.task;
    document.getElementById("priority").value = todo.priority;
  }
}
function toggleComplete(id) {
    const todo = todos.find((todo) => todo.id == id);
    if (todo) {
      todo.completed = !todo.completed;
      renderTodos();
    }
}
   

document.addEventListener("DOMContentLoaded", renderTodos);
