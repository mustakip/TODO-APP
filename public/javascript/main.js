const getTodoDiv = document => document.getElementById('todo_list');
const getTask = document => document.getElementById('task').value;
const createElement = element => document.createElement(element);

const fetchTitleAndDescription = function() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  fetch('/createTodo', {
    method: 'POST',
    body: JSON.stringify({ title, description })
  })
    .then(response => response.json())
    .then(todos => {
      displayExistingTodos(todos);
    });
};

const fetchTodo = function(id) {
  document.cookie = 'todo=' + id;
  window.location.href = '/todo.html';
};

const deleteTodo = function(id) {
  fetch('/deleteTodo', { method: 'POST', body: id })
    .then(res => res.json())
    .then(todos => {
      displayExistingTodos(todos);
    });
};

const generateTodoView = function(id, title, description) {
  return `<div id=${id} class="todo_div" >
           <div onclick="fetchTodo(${id})">
            <h1>${id}. ${title}</h1>
            <h4>${description}</h4>
           </div>
           <div><button type="submit" onclick="deleteTodo(${id})">Delete</button></div>`;
};

const getTitle = (todos, id) => todos.todoLists[id].title;
const getDescription = (todos, id) => todos.todoLists[id].description;

const displayExistingTodos = function(todos) {
  const todoHTML = Object.keys(todos.todoLists).map(id =>
    generateTodoView(id, getTitle(todos, id), getDescription(todos, id))
  );

  const todoDiv = getTodoDiv(document);
  todoDiv.innerHTML = todoHTML.join('');
};

const fetchTodoJson = function() {
  fetch('/todos')
    .then(response => response.json())
    .then(todos => {
      displayExistingTodos(todos);
    });
};

window.onload = () => {
  document.getElementById('create_todo_btn').onclick = fetchTitleAndDescription;
  document.getElementById('todo_list').onclick = fetchTodoJson();
};
