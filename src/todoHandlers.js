const Todo = require('../src/model/todo');
const fs = require('fs');
const { USERS_TODO, UTF8 } = require('./constants');
const { send } = require('./handlers');

const createTodoJson = function() {
  const todoCollection = fs.readFileSync(USERS_TODO, UTF8);
  return JSON.parse(todoCollection);
};

const todoCollection = createTodoJson();

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

const createTodo = function(req, res) {
  const todoDetails = initialiseTodo(req.body);
  const todo = new Todo(todoDetails);
  todoCollection.push(todo);
  writeAndResponse(res, todoCollection);
};

const addTask = function(req, res) {
  const task = req.body;
  const todoDetails = new Todo(todoCollection[0]);
  todoDetails.addTask(task);
  todoCollection[0] = todoDetails;
  writeAndResponse(res, todoCollection);
};

module.exports = {
  createTodo,
  addTask
};
