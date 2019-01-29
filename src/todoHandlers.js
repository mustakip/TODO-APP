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

const writeAndResponse = function(res, todoCollection, content) {
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
  writeAndResponse(res, todoCollection, todoCollection[currentUser]);
};

const deleteTodo = function(req, res) {
  const currentUser = getCurrenUser(req);
  const id = req.body;
  todoCollection[currentUser].deleteTodo(id);
  writeAndResponse(res, todoCollection, todoCollection[currentUser]);
};

const editTitle = function(req, res) {
  const currentUser = getCurrenUser(req);
  const id = req.cookies.todo;
  const newTitle = req.body;
  todoCollection[currentUser].todoLists[id].editTitle(newTitle);
  writeAndResponse(
    res,
    todoCollection,
    todoCollection[currentUser].todoLists[id]
  );
};

const editDescription = function(req, res) {
  const currentUser = getCurrenUser(req);
  const id = req.cookies.todo;
  const newDescription = req.body;
  todoCollection[currentUser].todoLists[id].editDescription(newDescription);
  writeAndResponse(
    res,
    todoCollection,
    todoCollection[currentUser].todoLists[id]
  );
};

const addTask = function(req, res) {
  const currentUser = getCurrenUser(req);
  const task = req.body;
  const id = req.cookies.todo;
  todoCollection[currentUser].todoLists[id].addTask(task);
  const userTodo = todoCollection[currentUser].todoLists[id];
  writeAndResponse(res, todoCollection, userTodo);
};

const provideTodos = function(req, res) {
  const currentUser = getCurrenUser(req);
  send(res, JSON.stringify(todoCollection[currentUser]));
};

const provideCurrentTodo = function(req, res) {
  const currentUser = getCurrenUser(req);
  const id = req.cookies.todo;
  const todo = todoCollection[currentUser].todoLists[id];
  send(res, JSON.stringify(todo));
};

module.exports = {
  createTodo,
  addTask,
  provideTodos,
  provideCurrentTodo,
  editTitle,
  editDescription,
  deleteTodo
};
