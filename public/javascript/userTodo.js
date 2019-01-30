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

const getTaskIds = function(id) {
  const editId = `${id}edit_task`;
  const deleteId = `${id}delete_task`;
  const toggleId = `${id}toggle_task`;
  return { editId, deleteId, toggleId };
};

const generateTaskViewOptions = function(task, id, status) {
  const { editId, deleteId, toggleId } = getTaskIds(id);

  const taskContainer = createDiv('task', '', '');
  const taskDetailsContainer = createDiv('', id, task);
  const taskOptionsContainer = createDiv('task_option', '', '');

  const editTaskEvent = displayEditTaskBox.bind(null, id);
  const deleteTaskEvent = deleteTask.bind(null, id);
  const toggleTaskEvent = toggleStatus.bind(null, id);

  const editTaskButton = createButton(editId, '&#x270D', editTaskEvent);
  const deleteTaskButton = createButton(deleteId, '&#x274C', deleteTaskEvent);
  const toggleTaskButton = createButton(toggleId, status, toggleTaskEvent);
  const optionButtons = [editTaskButton, deleteTaskButton, toggleTaskButton];

  appendChildren(taskOptionsContainer, optionButtons);
  appendChildren(taskContainer, [taskDetailsContainer, taskOptionsContainer]);

  return taskContainer;
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

const status = {
  true: '&#x2705;',
  false: '&#x2611;&#xFE0F;'
};

const generateTaskView = function(tasks, taskDiv) {
  taskDiv.innerHTML = '';
  const taskIDs = Object.keys(tasks);
  taskIDs.forEach(id => {
    const currentStatus = status[tasks[id].done];
    const task = generateTaskViewOptions(tasks[id].task, id, currentStatus);
    taskDiv.appendChild(task);
  });
};

const displayTodo = function(todo) {
  const titleDiv = getTitleDiv(document);
  const descriptionDiv = getDescriptionDiv(document);
  const tasksDiv = getTasksDiv(document);
  generateTaskView(todo.todoTasks, tasksDiv);
  titleDiv.innerHTML = todo.title;
  descriptionDiv.innerText = todo.description;
};

const updateTodoPage = function(todo) {
  const editTitleBtn = `<button id="edit_title_btn" onclick="createEditTitleBox()">&#x270D</button>`;
  const editDescriptionBtn = `<button id="edit_description_btn" onclick="createEditDescriptionBox()">&#x270D</button>`;
  getEditTitleDiv(document).innerHTML = editTitleBtn;
  getEditDescriptionDiv(document).innerHTML = editDescriptionBtn;
  displayTodo(todo);
};

const createEditTitleBox = function() {
  const title = getTodoTitle(document);
  const editTitleBox = `<input type="text" id="new_title" value="${title}"/>
                        <button id ="add_title" onclick="editTitle()">Edit Title</button>`;
  document.getElementById('edit_title').innerHTML = editTitleBox;
};

const createEditDescriptionBox = function() {
  const description = getTodoDescription(document);
  const editDescriptionBox = `<input type="text" id="new_description" value="${description}"/>
                              <button id ="add_description" onclick="editDescription()">Edit Description</button>`;
  document.getElementById('edit_description').innerHTML = editDescriptionBox;
};

window.onload = () => {
  getUserTasks();
  document.getElementById('add_task_btn').onclick = addTask;
  document.getElementById('edit_title_btn').onclick = createEditTitleBox;
  document.getElementById(
    'edit_description_btn'
  ).onclick = createEditDescriptionBox;
};
