const toggleStatus = function(taskId) {
  const headers = { method: 'POST', body: taskId };
  doFetchRequest('/toggleStatus', headers, updateTodoPage);
};

const deleteTask = function(taskId) {
  const headers = { method: 'POST', body: taskId };
  doFetchRequest('/deleteTask', headers, updateTodoPage);
};

const editTask = function(taskId) {
  const newTaskId = `${taskId}new_task`;
  const newTask = document.getElementById(newTaskId).value;
  const headers = {
    method: 'POST',
    body: JSON.stringify({ taskId, newTask })
  };
  doFetchRequest('/editTask', headers, updateTodoPage);
};

const addTask = function() {
  const task = getTask(document);
  const headers = { method: 'POST', body: task };
  doFetchRequest('/addTask', headers, displayTodo);
};

const getUserTasks = function() {
  doFetchRequest('/getTodo', {}, displayTodo);
};

const editTitle = function() {
  const title = document.getElementById('new_title').value;
  const headers = { method: 'POST', body: title };
  doFetchRequest('/editTitle', headers, updateTodoPage);
};

const editDescription = function() {
  const description = document.getElementById('new_description').value;
  const headers = { method: 'POST', body: description };
  doFetchRequest('/editDescription', headers, updateTodoPage);
};

const fetchTodoJson = function() {
  doFetchRequest('/todos', {}, displayExistingTodos);
};

const deleteTodo = function(id) {
  const headers = { method: 'POST', body: id };
  doFetchRequest('/deleteTodo', headers, displayExistingTodos);
};

const fetchTitleAndDescription = function() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const headers = {
    method: 'POST',
    body: JSON.stringify({ title, description })
  };
  doFetchRequest('/createTodo', headers, displayExistingTodos);
};

const doFetchRequest = function(url, headers, callback) {
  fetch(url, headers)
    .then(res => res.json())
    .then(content => callback(content));
};
