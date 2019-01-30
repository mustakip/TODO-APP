const getTask = document => document.getElementById('task_input_box').value;
const getTitleDiv = document => document.getElementById('todo_title');
const getEditTitleDiv = document => document.getElementById('edit_title');
const getTasksContainer = document => document.getElementById('todo_tasks');

const getDescriptionDiv = document => document.getElementById('todo_description');

const getTodoTitle = document => document.getElementById('todo_title').textContent;

const getTodoDescription = document =>
  document.getElementById('todo_description').textContent;

const getEditDescriptionDiv = document =>
  document.getElementById('edit_description');

const getCurrentTask = (document, id) => document.getElementById(id).textContent;
const getEditButton = (document, id) => document.getElementById(id);
const getTaskDiv = (document, id) => document.getElementById(id);

const EMPTY = '';
const EDIT_UNICODE = '&#x270D';
const DELETE_UNICODE = '&#x274C';
const DONE_UNICODE = '&#x2705;';
const UNDONE_UNICODE = '&#x2611;&#xFE0F;';

const status = {
  true: DONE_UNICODE,
  false: UNDONE_UNICODE
};

const getTaskIds = function(id) {
  const editId = `${id}edit_task`;
  const deleteId = `${id}delete_task`;
  const toggleId = `${id}toggle_task`;
  const newTaskId = `${id}new_task`;
  return { editId, deleteId, toggleId, newTaskId };
};

const generateTaskViewOptions = function(task, id, status) {
  const { editId, deleteId, toggleId } = getTaskIds(id);

  const taskContainer = createDiv('task', EMPTY, EMPTY);
  const taskDetailsContainer = createDiv(EMPTY, id, task);
  const taskOptionsContainer = createDiv('task_option', EMPTY, EMPTY);

  const editTaskEvent = displayEditTaskBox.bind(null, id);
  const deleteTaskEvent = deleteTask.bind(null, id);
  const toggleTaskEvent = toggleStatus.bind(null, id);

  const editTaskButton = createButton(editId, EDIT_UNICODE, editTaskEvent);
  const deleteTaskButton = createButton(deleteId, DELETE_UNICODE, deleteTaskEvent);
  const toggleTaskButton = createButton(toggleId, status, toggleTaskEvent);
  const optionButtons = [editTaskButton, deleteTaskButton, toggleTaskButton];

  appendChildren(taskOptionsContainer, optionButtons);
  appendChildren(taskContainer, [taskDetailsContainer, taskOptionsContainer]);

  return taskContainer;
};

const displayEditTaskBox = function(id) {
  const { editId, newTaskId } = getTaskIds(id);
  const currentTask = getCurrentTask(document, id);
  const editButton = getEditButton(document, editId);
  const editTaskBox = createInputField('text', newTaskId, currentTask);
  const taskDiv = getTaskDiv(document, id);
  appendChildren(taskDiv, [editTaskBox]);
  editButton.onclick = editTask.bind(null, id);
};

const generateTaskView = function(tasks, taskDiv) {
  taskDiv.innerHTML = EMPTY;
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
  const tasksDiv = getTasksContainer(document);
  generateTaskView(todo.todoTasks, tasksDiv);
  titleDiv.innerHTML = todo.title;
  descriptionDiv.innerText = todo.description;
};

const updateTodoPage = function(todo) {
  const editTitleBtn = createButton(
    'edit_title_btn',
    EDIT_UNICODE,
    createEditTitleBox
  );
  const editDescriptionBtn = createButton(
    'edit_description_btn',
    EDIT_UNICODE,
    createEditDescriptionBox
  );
  const editTitleBtnDiv = getEditTitleDiv(document);
  const editDescriptionBtnDiv = getEditDescriptionDiv(document);
  appendChildren(editTitleBtnDiv, [editTitleBtn]);
  appendChildren(editDescriptionBtnDiv, [editDescriptionBtn]);

  displayTodo(todo);
};

const createEditTitleBox = function() {
  const title = getTodoTitle(document);
  const editTitleInput = createInputField('text', 'new_title', title);
  const editTitleBtn = createButton('add_title', 'Edit Title', editTitle);
  const editTitleBox = [editTitleInput, editTitleBtn];
  const editTitleDiv = getEditTitleDiv(document);
  appendChildren(editTitleDiv, editTitleBox);
};

const createEditDescriptionBox = function() {
  const description = getTodoDescription(document);
  const editDescriptionInput = createInputField(
    'text',
    'new_description',
    description
  );
  const addDescriptionBtn = createButton(
    'add_description',
    'Edit Description',
    editDescription
  );
  const editDescriptionDiv = getEditDescriptionDiv(document);
  appendChildren(editDescriptionDiv, [editDescriptionInput, addDescriptionBtn]);
};

const displayNameAndTasks = function(content) {
  displayTodo(content.todo);
  displayUsername(content.username);
};

window.onload = () => {
  getUserTasks();
  document.getElementById('add_task_btn').onclick = addTask;
  document.getElementById('edit_title_btn').onclick = createEditTitleBox;
  document.getElementById('edit_description_btn').onclick = createEditDescriptionBox;
};
