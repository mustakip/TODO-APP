const Todo = require('../src/model/todo');
const fs = require('fs');
const { USERS_TODO } = require('./constants');
const { send } = require('./handlers');
const { getUsersTodo, getSessions } = require('./utils');

const todoCollection = getUsersTodo();

const initialiseTodo = function(requestBody) {
  const todoDetails = JSON.parse(requestBody);
  todoDetails.id = 0;
  todoDetails.todoTasks = new Object();
  return todoDetails;
};

const writeAndRespond = function(res, todoCollection, content) {
  fs.writeFile(USERS_TODO, JSON.stringify(todoCollection), () => {
    send(res, JSON.stringify(content));
  });
};

const getCurrenUser = function(req) {
  const activeSessions = getSessions();
  const sessionId = req.cookies.session;
  return activeSessions[sessionId];
};

const createTodo = function(req, res) {
  const currentUser = getCurrenUser(req);
  const todoDetails = initialiseTodo(req.body);
  const todo = new Todo(todoDetails);
  todoCollection[currentUser].addTodo(todo);
  writeAndRespond(res, todoCollection, todoCollection[currentUser]);
};

const deleteTodo = function(req, res) {
  const currentUser = getCurrenUser(req);
  const todoId = req.body;
  todoCollection[currentUser].deleteTodo(todoId);
  writeAndRespond(res, todoCollection, todoCollection[currentUser]);
};

const editTitle = function(req, res) {
  const currentUser = getCurrenUser(req);
  const todoId = req.cookies.todo;
  const newTitle = req.body;
  todoCollection[currentUser].todoLists[todoId].editTitle(newTitle);
  const currentTodo = todoCollection[currentUser].todoLists[todoId];
  writeAndRespond(res, todoCollection, currentTodo);
};

const editDescription = function(req, res) {
  const currentUser = getCurrenUser(req);
  const todoId = req.cookies.todo;
  const newDescription = req.body;
  todoCollection[currentUser].todoLists[todoId].editDescription(newDescription);
  const currentTodo = todoCollection[currentUser].todoLists[todoId];
  writeAndRespond(res, todoCollection, currentTodo);
};

const addTask = function(req, res) {
  const currentUser = getCurrenUser(req);
  const task = req.body;
  const todoId = req.cookies.todo;
  todoCollection[currentUser].todoLists[todoId].addTask(task);
  const userTodo = todoCollection[currentUser].todoLists[todoId];
  writeAndRespond(res, todoCollection, userTodo);
};

const provideTodos = function(req, res) {
  const currentUser = getCurrenUser(req);
  send(res, JSON.stringify(todoCollection[currentUser]));
};

const provideCurrentTodo = function(req, res) {
  const currentUser = getCurrenUser(req);
  const todoId = req.cookies.todo;
  const todo = todoCollection[currentUser].todoLists[todoId];
  send(res, JSON.stringify(todo));
};

const editTask = function(req, res) {
  const currentUser = getCurrenUser(req);
  const todoId = req.cookies.todo;
  const { taskId, newTask } = JSON.parse(req.body);
  todoCollection[currentUser].todoLists[todoId].editTask(taskId, newTask);
  const currentTodo = todoCollection[currentUser].todoLists[todoId];
  writeAndRespond(res, todoCollection, currentTodo);
};

const deleteTask = function(req, res) {
  const currentUser = getCurrenUser(req);
  const todoId = req.cookies.todo;
  const taskId = req.body;
  todoCollection[currentUser].todoLists[todoId].deleteTask(taskId);
  const currentTodo = todoCollection[currentUser].todoLists[todoId];
  writeAndRespond(res, todoCollection, currentTodo);
};

const toggleStatus = function(req, res) {
  const currentUser = getCurrenUser(req);
  const todoId = req.cookies.todo;
  const taskId = req.body;
  todoCollection[currentUser].todoLists[todoId].toggleStatus(taskId);
  const currentTodo = todoCollection[currentUser].todoLists[todoId];
  writeAndRespond(res, todoCollection, currentTodo);
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
  toggleStatus
};
