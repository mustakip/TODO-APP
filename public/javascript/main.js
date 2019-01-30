const getTodoDiv = document => document.getElementById('todo_list');
const getTask = document => document.getElementById('task').value;
const createElement = element => document.createElement(element);

const fetchTodo = function(id) {
  document.cookie = 'todo=' + id;
  window.location.href = '/todo.html';
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

const generateTodoView = function(id, title, description) {
  return `<div id=${id} class="todo_div" >
           <div onclick="fetchTodo(${id})">
            <h1>${title}</h1>
            <h3>${description}</h3>
           </div>
           <div><button type="submit" onclick="deleteTodo(${id})">&#x274C;</button></div></div>`;
};

window.onload = () => {
  document.getElementById('create_todo_btn').onclick = fetchTitleAndDescription;
  document.getElementById('todo_list').onclick = fetchTodoJson;
  fetchTodoJson();
};
