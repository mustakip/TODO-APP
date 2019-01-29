const generateTaskView = function(tasks) {
  const taskIDs = Object.keys(tasks);
  const taskHTML = taskIDs.map(id => `<li>${tasks[id].task}</li>`);
  return `<ul>${taskHTML.join('')}</ul>`;
};

const getTitleDiv = document => document.getElementById('todo_title');
const getDescriptionDiv = document =>
  document.getElementById('todo_description');
const getTasksDiv = document => document.getElementById('todo_tasks');

const displayTodo = function(todo) {
  const titleDiv = getTitleDiv(document);
  const descriptionDiv = getDescriptionDiv(document);
  const tasksDiv = getTasksDiv(document);
  const tasksHTML = generateTaskView(todo.todoTasks);
  titleDiv.innerHTML = todo.title;
  descriptionDiv.innerText = todo.description;
  tasksDiv.innerHTML = tasksHTML;
};

const updateTodoPage = function(todo) {
  const editTitleBtn = `<button id="edit_title_btn" onclick="createEditTitleBox()">Edit</button>`;
  const editDescriptionBtn = `<button id="edit_description_btn" onclick="createEditDescriptionBox()">Edit</button>`;
  document.getElementById('edit_title').innerHTML = editTitleBtn;
  document.getElementById('edit_description').innerHTML = editDescriptionBtn;
  displayTodo(todo);
};

const addTask = function() {
  const task = document.getElementById('task_input_box').value;
  fetch('/addTask', {
    method: 'POST',
    body: task
  })
    .then(res => res.json())
    .then(todo => displayTodo(todo));
};

const getUserTasks = function() {
  fetch('/getTodo')
    .then(res => res.json())
    .then(todo => displayTodo(todo));
};

const createEditTitleBox = function() {
  const title = document.getElementById('todo_title').textContent;
  const editTitleBox = `<input type="text" id="new_title" value="${title}"/>
                        <button id ="add_title" onclick="editTitle()">Add Title</button>`;
  document.getElementById('edit_title').innerHTML = editTitleBox;
};

const editTitle = function() {
  const title = document.getElementById('new_title').value;
  fetch('/editTitle', { method: 'POST', body: title })
    .then(res => res.json())
    .then(todo => updateTodoPage(todo));
};

const createEditDescriptionBox = function() {
  const description = document.getElementById('todo_description').textContent;
  const editDescriptionBox = `<input type="text" id="new_description" value="${description}"/>
                        <button id ="add_description" onclick="editDescription()">Add description</button>`;
  document.getElementById('edit_description').innerHTML = editDescriptionBox;
};

const editDescription = function() {
  const description = document.getElementById('new_description').value;
  fetch('/editDescription', { method: 'POST', body: description })
    .then(res => res.json())
    .then(todo => updateTodoPage(todo));
};

window.onload = () => {
  getUserTasks();
  document.getElementById('add_task_btn').onclick = addTask;
  document.getElementById('edit_title_btn').onclick = createEditTitleBox;
  document.getElementById(
    'edit_description_btn'
  ).onclick = createEditDescriptionBox;
};
