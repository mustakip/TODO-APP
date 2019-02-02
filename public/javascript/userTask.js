const getTask = document => document.getElementById('task_input_box').value;
const getTasksContainer = document => document.getElementById('todo_tasks');

const getCurrentTask = (document, id) => document.getElementById(id).textContent;
const getEditButton = (document, id) => document.getElementById(id);
const getTaskDiv = (document, id) => document.getElementById(id);

const EMPTY = '';
const EDIT_UNICODE = '&#x270D';

const status = {
  true: '/images/item_done.png',
  false: '/images/item_not_done.png'
};

const getTaskIds = function(id) {
  const editId = `${id}edit_task`;
  const deleteId = `${id}delete_task`;
  const toggleId = `${id}toggle_task`;
  const newTaskId = `${id}new_task`;
  return { editId, deleteId, toggleId, newTaskId };
};

const strikeItem = item => `<strike>${item}</strike>`;

const createEditTaskButton = function(editId, editTaskEvent) {
  const editTaskButton = createImage('/images/edit.png', 36, 36);
  editTaskButton.onclick = editTaskEvent;
  editTaskButton.id = editId;
  editTaskButton.onmouseover = () => (event.target.src = '/images/edit_hover.png');
  editTaskButton.onmouseout = () => (event.target.src = '/images/edit.png');
  editTaskButton.className = 'img_btn';
  return editTaskButton;
};

const createDeleteTaskButton = function(deleteId, deleteTaskEvent) {
  const deleteTaskButton = createImage('/images/delete.png', 36, 36);
  deleteTaskButton.onclick = deleteTaskEvent;
  deleteTaskButton.id = deleteId;
  deleteTaskButton.onmouseover = () =>
    (event.target.src = '/images/delete_hover.png');
  deleteTaskButton.onmouseout = () => (event.target.src = '/images/delete.png');
  deleteTaskButton.className = 'img_btn';
  return deleteTaskButton;
};

const createToggleTaskButton = function(toggleId, toggleTaskEvent, currentStatus) {
  const toggleTaskButton = createImage(status[currentStatus], 36, 36);
  toggleTaskButton.id = toggleId;
  toggleTaskButton.onclick = toggleTaskEvent;
  toggleTaskButton.className = 'img_btn';
  return toggleTaskButton;
};

const generateTaskViewOptions = function(task, id, status) {
  const { editId, deleteId, toggleId } = getTaskIds(id);
  if (status === true) task = strikeItem(task);

  const taskContainer = createDiv('task', EMPTY, EMPTY);
  const taskDetailsContainer = createDiv(EMPTY, id, task);
  const taskOptionsContainer = createDiv('task_option', EMPTY, EMPTY);

  const editTaskEvent = displayEditTaskBox.bind(null, id);
  const deleteTaskEvent = deleteTask.bind(null, id);
  const toggleTaskEvent = toggleStatus.bind(null, id);

  const editTaskButton = createEditTaskButton(editId, editTaskEvent);
  const deleteTaskButton = createDeleteTaskButton(deleteId, deleteTaskEvent);
  const toggleTaskButton = createToggleTaskButton(toggleId, toggleTaskEvent, status);
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
    const task = generateTaskViewOptions(tasks[id].task, id, tasks[id].done);
    taskDiv.appendChild(task);
  });
};
