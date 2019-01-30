const fs = require('fs');
const { createKeyValue, redirectTo, getUsers, getUsersTodo } = require('./utils');
const { UTF8, USER_JSON_PATH, USERS_TODOS_PATH } = require('./constants');
const TodoList = require('./model/todoList');

const users = getUsers();
const usersTodo = getUsersTodo();

const doesUserExists = function(userid) {
  const existingUserIds = Object.keys(users);
  return existingUserIds.includes(userid);
};

const writeUserDetails = function(users, usersTodo) {
  fs.writeFileSync(USER_JSON_PATH, JSON.stringify(users), UTF8);
  fs.writeFileSync(USERS_TODOS_PATH, JSON.stringify(usersTodo), UTF8);
};

const createNewUser = function(res, userDetails) {
  const { name, userid, password } = userDetails;
  users[userid] = { name, password };
  usersTodo[userid] = new TodoList({ id: 0, todoLists: {} });
  writeUserDetails(users, usersTodo);
  redirectTo(res, '/login.html');
};

const signupHandler = function(req, res) {
  const userDetails = createKeyValue(req.body);
  if (doesUserExists(userDetails.userid)) return redirectTo(res, '/signup.html');
  createNewUser(res, userDetails);
};

module.exports = {
  signupHandler
};
