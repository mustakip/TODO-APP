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

const createTodoHTML = function(id, title, description) {
  return `<div class="todo_div">
          <h1>${id}. ${title}</h1>
          <h4>${description}</h4>
          </div>`;
};

const getTitle = (todos, id) => todos.todoLists[id].title;
const getDescription = (todos, id) => todos.todoLists[id].description;

const displayExistingTodos = function(todos) {
  const todoHTML = Object.keys(todos.todoLists).map(id =>
    createTodoHTML(id, getTitle(todos, id), getDescription(todos, id))
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
  fetchTodoJson();
};
