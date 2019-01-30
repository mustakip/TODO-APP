const fs = require('fs');
const {
  USERS_TODOS_PATH,
  USER_JSON_PATH,
  UTF8,
  SESSIONS_PATH
} = require('./constants');
const TodoList = require('./model/todoList');
const Todo = require('./model/todo');

const createKeyValue = function(text) {
  const keyValuePair = new Object();
  const splittedText = text.split('&').map(pair => pair.split('='));
  const assignKeyValue = ([key, value]) => (keyValuePair[key] = value);
  splittedText.forEach(assignKeyValue);
  return keyValuePair;
};

const getSessions = function() {
  const sessions = fs.readFileSync(SESSIONS_PATH, UTF8);
  return JSON.parse(sessions);
};

const getUsers = function() {
  const users = fs.readFileSync(USER_JSON_PATH, UTF8);
  return JSON.parse(users);
};

const retainTodoMethods = function(todoList) {
  const newTodoList = new TodoList(todoList);
  const todos = Object.keys(newTodoList.todoLists);
  todos.forEach(todo => {
    newTodoList.todoLists[todo] = new Todo(newTodoList.todoLists[todo]);
  });
  return newTodoList;
};

const retainTodoListMethods = function(userIds, usersTodo) {
  userIds.forEach(userid => {
    usersTodo[userid] = retainTodoMethods(usersTodo[userid]);
  });
  return usersTodo;
};

const getUsersTodo = function() {
  const usersTodo = JSON.parse(fs.readFileSync(USERS_TODOS_PATH, UTF8));
  const userIds = Object.keys(usersTodo);
  return retainTodoListMethods(userIds, usersTodo);
};

const redirectTo = function(res, location) {
  res.statusCode = 302;
  res.setHeader('Location', location);
  res.end();
};

const initialiseCache = function() {
  const usersTodo = getUsersTodo();
  const users = getUsers();
  const sessions = getSessions();
  return { usersTodo, users, sessions };
};

module.exports = {
  createKeyValue,
  redirectTo,
  getUsers,
  getUsersTodo,
  getSessions,
  initialiseCache
};
