const fs = require('fs');
const { createKeyValue } = require('./utils');
const { UTF8, USER_JSON_PATH, USERS_TODOS_PATH } = require('./constants');
const TodoList = require('./model/todoList');

const doesUserExists = function(cache, userid) {
  const existingUserIds = Object.keys(cache.users);
  return existingUserIds.includes(userid);
};

const writeUserDetails = function(users, usersTodo) {
  fs.writeFileSync(USER_JSON_PATH, JSON.stringify(users), UTF8);
  fs.writeFileSync(USERS_TODOS_PATH, JSON.stringify(usersTodo), UTF8);
};

const createNewUser = function(cache, res, userDetails) {
  const { name, userid, password } = userDetails;
  cache.users[userid] = { name, password };
  cache.usersTodo[userid] = new TodoList({ id: 0, todoLists: {} });
  writeUserDetails(cache.users, cache.usersTodo);
  res.redirect('/login.html');
};

const signupHandler = function(cache, req, res) {
  const userDetails = createKeyValue(req.body);
  if (doesUserExists(cache, userDetails.userid)) return res.redirect('/signup.html');
  createNewUser(cache, res, userDetails);
};

module.exports = {
  signupHandler
};
