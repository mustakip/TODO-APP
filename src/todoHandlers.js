const Todo = require('../src/model/todo');
const TodoList = require('../src/model/todoList');
const fs = require('fs');
const { USERS_TODO, UTF8 } = require('./constants');
const { send } = require('./handlers');
const { getUsersTodo, getSessions } = require('./utils');

let todoCollection = getUsersTodo();
const activeSessions = getSessions();

const initialiseTodo = function(requestBody) {
  const todoDetails = JSON.parse(requestBody);
  todoDetails.id = 0;
  todoDetails.todoTasks = new Object();
  return todoDetails;
};

const writeAndResponse = function(res, todoCollection) {
  fs.writeFile(USERS_TODO, JSON.stringify(todoCollection), () => {
    send(res, JSON.stringify(todoCollection));
  });
};
const getCurrenUser = function(req) {
  const cookie = req.headers.cookie;
  const sessionId = cookie.split('=')[1];
  return activeSessions[sessionId];
};

const createTodo = function(req, res) {
  const currentUser = getCurrenUser(req);
  const todoDetails = initialiseTodo(req.body);
  const todo = new Todo(todoDetails);
  todoCollection[currentUser].addTodo(todo);
  writeAndResponse(res, todoCollection);
};

const addTask = function(req, res) {
  const currentUser = getCurrenUser(req);
  const task = req.body;
  todoCollection[currentUser].todoLists[1].addTask(task);
  writeAndResponse(res, todoCollection);
};

module.exports = {
  createTodo,
  addTask
};
