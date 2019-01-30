const Todo = require('../src/model/todo');
const fs = require('fs');
const { USERS_TODOS_PATH, SESSIONS_PATH, UTF8 } = require('./constants');
const { send } = require('./handlers');
const { getUsersTodo, getSessions, redirectTo, getUsers } = require('./utils');

const initialiseTodo = function(requestBody) {
  const todoDetails = JSON.parse(requestBody);
  todoDetails.id = 0;
  todoDetails.todoTasks = new Object();
  return todoDetails;
};

const writeAndRespond = function(res, usersTodo, content) {
  fs.writeFile(USERS_TODOS_PATH, JSON.stringify(usersTodo), () => {
    send(res, JSON.stringify(content));
  });
};

const getCurrentUser = function(cache, req) {
  const sessionId = req.cookies.session;
  return cache.sessions[sessionId];
};

const createTodo = function(cache, req, res) {
  const currentUser = getCurrentUser(cache, req);
  const todoDetails = initialiseTodo(req.body);
  const todo = new Todo(todoDetails);
  cache.usersTodo[currentUser].addTodo(todo);
  writeAndRespond(res, cache.usersTodo, cache.usersTodo[currentUser]);
};

const deleteTodo = function(cache, req, res) {
  const currentUser = getCurrentUser(cache, req);
  const todoId = req.body;
  cache.usersTodo[currentUser].deleteTodo(todoId);
  writeAndRespond(res, cache.usersTodo, cache.usersTodo[currentUser]);
};

const editTitle = function(cache, req, res) {
  const currentUser = getCurrentUser(cache, req);
  const todoId = req.cookies.todo;
  const newTitle = req.body;
  cache.usersTodo[currentUser].todoLists[todoId].editTitle(newTitle);
  const currentTodo = cache.usersTodo[currentUser].todoLists[todoId];
  writeAndRespond(res, cache.usersTodo, currentTodo);
};

const editDescription = function(cache, req, res) {
  const currentUser = getCurrentUser(cache, req);
  const todoId = req.cookies.todo;
  const newDescription = req.body;
  cache.usersTodo[currentUser].todoLists[todoId].editDescription(newDescription);
  const currentTodo = cache.usersTodo[currentUser].todoLists[todoId];
  writeAndRespond(res, cache.usersTodo, currentTodo);
};

const addTask = function(cache, req, res) {
  const currentUser = getCurrentUser(cache, req);
  const todoId = req.cookies.todo;
  const task = req.body;
  cache.usersTodo[currentUser].todoLists[todoId].addTask(task);
  const userTodo = cache.usersTodo[currentUser].todoLists[todoId];
  writeAndRespond(res, cache.usersTodo, userTodo);
};

const provideTodos = function(cache, req, res) {
  const users = cache.users;
  const currentUser = getCurrentUser(cache, req);
  const username = users[currentUser].name;
  const todo = cache.usersTodo[currentUser];
  send(res, JSON.stringify({ username, todo }));
};

const provideCurrentTodo = function(cache, req, res) {
  const users = cache.users;
  const currentUser = getCurrentUser(cache, req);
  const username = users[currentUser].name;
  const todoId = req.cookies.todo;
  const todo = cache.usersTodo[currentUser].todoLists[todoId];
  send(res, JSON.stringify({ username, todo }));
};

const editTask = function(cache, req, res) {
  const currentUser = getCurrentUser(cache, req);
  const todoId = req.cookies.todo;
  const { taskId, newTask } = JSON.parse(req.body);
  cache.usersTodo[currentUser].todoLists[todoId].editTask(taskId, newTask);
  const currentTodo = cache.usersTodo[currentUser].todoLists[todoId];
  writeAndRespond(res, cache.usersTodo, currentTodo);
};

const deleteTask = function(cache, req, res) {
  const currentUser = getCurrentUser(cache, req);
  const todoId = req.cookies.todo;
  const taskId = req.body;
  cache.usersTodo[currentUser].todoLists[todoId].deleteTask(taskId);
  const currentTodo = cache.usersTodo[currentUser].todoLists[todoId];
  writeAndRespond(res, cache.usersTodo, currentTodo);
};

const toggleStatus = function(cache, req, res) {
  const currentUser = getCurrentUser(cache, req);
  const todoId = req.cookies.todo;
  const taskId = req.body;
  cache.usersTodo[currentUser].todoLists[todoId].toggleStatus(taskId);
  const currentTodo = cache.usersTodo[currentUser].todoLists[todoId];
  writeAndRespond(res, cache.usersTodo, currentTodo);
};

const deleteSession = function(cache, req) {
  const sessionId = req.cookies.session;
  delete cache.sessions[sessionId];
  fs.writeFile(SESSIONS_PATH, JSON.stringify(cache.sessions), UTF8, () => {});
};

const logoutHandler = function(cache, req, res) {
  deleteSession(cache, req);
  const expiryDate = new Date().toUTCString();
  res.setHeader('Set-Cookie', `session=;expires=${expiryDate}`);
  redirectTo(res, '/');
};

module.exports = {
  createTodo,
  addTask,
  provideTodos,
  provideCurrentTodo,
  editTitle,
  editDescription,
  deleteTodo,
  editTask,
  deleteTask,
  toggleStatus,
  logoutHandler
};
