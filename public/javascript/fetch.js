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
  doFetchRequest('/getTodo', {}, displayNameAndTasks);
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

const getUsernameDiv = document => document.getElementById('username');

const displayUsername = function(username) {
  const usernameDiv = getUsernameDiv(document);
  usernameDiv.innerText = username;
};

const fetchTodoJson = function() {
  doFetchRequest('/todos', {}, displayNameAndTodos);
};

const deleteTodo = function(id) {
  const headers = { method: 'POST', body: id };
  doFetchRequest('/deleteTodo', headers, displayExistingTodos);
};

const doFetchRequest = function(url, headers, callback) {
  fetch(url, headers)
    .then(res => {
      if (res.redirected) {
        window.location.href = res.url;
        return;
      }
      return res.json();
    })
    .then(content => {
      callback(content);
    });
};
