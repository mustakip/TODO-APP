const getTodoDiv = document => document.getElementById('todo_list');
const getTask = document => document.getElementById('task').value;
const createElement = element => document.createElement(element);

const fetchTitleAndDescription = function() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  createTodo(title, description);
  fetch('/createTodo', {
    method: 'POST',
    body: JSON.stringify({ title, description })
  });
};

const addTask = function() {
  const task = getTask(document);
  fetch('/addTask', {
    method: 'POST',
    body: task
  });
  const list = document.getElementById('tasks');
  list.innerHTML += `<li> ${task}</li>`;
};

const createTodoTask = function() {
  const tasks = createElement('ul');
  tasks.id = 'tasks';
  return tasks;
};

const decorateTodo = function(title, description) {
  return `<h2> ${title}</h2>
          <h3> ${description}</h3>
          <input type= "text" id="task" />
          <button id="add_task">Add task</button>`;
};

const createTodoAttributes = function(title, description) {
  const todo = createElement('div');
  todo.className = 'todo_item';
  todo.id = 'todo_item';
  todo.innerHTML = decorateTodo(title, description);
  todo.appendChild(createTodoTask());
  return todo;
};

const createTodo = function(title, description) {
  const todoDiv = getTodoDiv(document);
  const todo = createTodoAttributes(title, description);

  todoDiv.appendChild(todo);
  document.getElementById('add_task').onclick = addTask;
};

window.onload = () => {
  document.getElementById('create_todo_btn').onclick = fetchTitleAndDescription;
};
