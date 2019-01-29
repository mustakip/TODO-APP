const getTitleDiv = document => document.getElementById('todo_title');
const getDescriptionDiv = document =>
  document.getElementById('todo_description');
const getTasksDiv = document => document.getElementById('todo_tasks');

const getTodoTitle = document =>
  document.getElementById('todo_title').textContent;

const getTodoDescription = document =>
  document.getElementById('todo_description').textContent;

const getTask = document => document.getElementById('task_input_box').value;
const getEditTitleDiv = document => document.getElementById('edit_title');
const getEditDescriptionDiv = document =>
  document.getElementById('edit_description');

const generateTaskViewOptions = function(task, id, status) {
  const editId = `${id}edit_task`;
  const deleteId = `${id}delete_task`;
  const toggleId = `${id}toggle_task`;
  return `<div class="task">
          <div id='${id}'>${task}</div><div class="task_options">
          <button id="${editId}" onclick="displayEditTaskBox(${id})">Edit</button>
          <button id="${deleteId}" onclick="deleteTask(${id})">Delete</button>
          <button id="${toggleId}" onclick="toggleStatus(${id})">${status}</button></div></div>`;
};

const toggleStatus = function(taskId) {
  fetch('/toggleStatus', { method: 'POST', body: taskId })
    .then(res => res.json())
    .then(todo => updateTodoPage(todo));
};

const deleteTask = function(taskId) {
  fetch('/deleteTask', { method: 'POST', body: taskId })
    .then(res => res.json())
    .then(todo => updateTodoPage(todo));
};

const displayEditTaskBox = function(id) {
  const editId = `${id}edit_task`;
  const newTaskId = `${id}new_task`;
  const currentTask = document.getElementById(id).textContent;
  const editButton = document.getElementById(editId);
  const editTaskBox = `<input type="text" id="${newTaskId}" value="${currentTask}"/>`;
  document.getElementById(id).innerHTML = editTaskBox;
  editButton.onclick = editTask.bind(null, id);
};

const editTask = function(taskId) {
  const newTaskId = `${taskId}new_task`;
  const newTask = document.getElementById(newTaskId).value;
  fetch('/editTask', {
    method: 'POST',
    body: JSON.stringify({ taskId, newTask })
  })
    .then(res => res.json())
    .then(todo => updateTodoPage(todo));
};

const generateTaskView = function(tasks) {
  const taskIDs = Object.keys(tasks);
  const taskHTML = taskIDs.map(id =>
    generateTaskViewOptions(tasks[id].task, id, tasks[id].done)
  );
  return taskHTML.join('');
};

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
  getEditTitleDiv(document).innerHTML = editTitleBtn;
  getEditDescriptionDiv(document).innerHTML = editDescriptionBtn;
  displayTodo(todo);
};

const addTask = function() {
  const task = getTask(document);
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
  const title = getTodoTitle(document);
  const editTitleBox = `<input type="text" id="new_title" value="${title}"/>
                        <button id ="add_title" onclick="editTitle()">Edit Title</button>`;
  document.getElementById('edit_title').innerHTML = editTitleBox;
};

const editTitle = function() {
  const title = document.getElementById('new_title').value;
  fetch('/editTitle', { method: 'POST', body: title })
    .then(res => res.json())
    .then(todo => updateTodoPage(todo));
};

const createEditDescriptionBox = function() {
  const description = getTodoDescription(document);
  const editDescriptionBox = `<input type="text" id="new_description" value="${description}"/>
                              <button id ="add_description" onclick="editDescription()">Edit Description</button>`;
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
