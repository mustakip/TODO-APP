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
  titleDiv.innerText = todo.title;
  descriptionDiv.innerText = todo.description;
  tasksDiv.innerHTML = tasksHTML;
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

window.onload = () => {
  document.getElementById('add_task_btn').onclick = addTask;
  getUserTasks();
};
