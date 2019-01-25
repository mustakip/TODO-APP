const Todo = require('../src/model/todo');
const TodoList = require('../src/model/todoList');
const fs = require('fs');
const { USERS_TODO, UTF8 } = require('./constants');
const { send } = require('./handlers');

const createTodoList = function(req, res, next) {
  const newTodoList = new TodoList({ id: 0, todoLists: {} });
  fs.writeFile(USERS_TODO, JSON.stringify(newTodoList), () => {});
  next();
};

const createTodoJson = function() {
  const todoCollection = fs.readFileSync(USERS_TODO, UTF8);
  return JSON.parse(todoCollection);
};

let todoCollection = createTodoJson();

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
  todoCollection = new TodoList(todoCollection);
  const todoDetails = initialiseTodo(req.body);
  const todo = new Todo(todoDetails);
  todoCollection.addTodo(todo);
  writeAndResponse(res, todoCollection);
};

const addTask = function(req, res) {
  const task = req.body;
  const currentTodo = new Todo(todoCollection.todoLists[1]);
  currentTodo.addTask(task);
  todoCollection.todoLists[1] = currentTodo;
  writeAndResponse(res, todoCollection);
};

module.exports = {
  createTodo,
  addTask,
  createTodoList
};
