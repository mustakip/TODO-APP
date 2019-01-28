const fs = require('fs');
const { USERS_TODO, USER_JSON, UTF8, SESSIONS_JSON } = require('./constants');
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
  const sessions = fs.readFileSync(SESSIONS_JSON, UTF8);
  return JSON.parse(sessions);
};

const getUsers = function() {
  const users = fs.readFileSync(USER_JSON, UTF8);
  return JSON.parse(users);
};

const getUsersTodo = function() {
  const usersTodo = JSON.parse(fs.readFileSync(USERS_TODO, UTF8));
  const userIds = Object.keys(usersTodo);
  userIds.forEach(userid => {
    usersTodo[userid] = new TodoList(usersTodo[userid]);
    const todos = Object.keys(usersTodo[userid].todoLists);
    todos.forEach(todo => {
      usersTodo[userid].todoLists[todo] = new Todo(
        usersTodo[userid].todoLists[todo]
      );
    });
  });
  return usersTodo;
};

const redirectTo = function(res, location) {
  res.statusCode = 302;
  res.setHeader('Location', location);
  res.end();
};

module.exports = {
  createKeyValue,
  redirectTo,
  getUsers,
  getUsersTodo,
  getSessions
};
