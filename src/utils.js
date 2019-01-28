const fs = require('fs');
const { USERS_TODO, USER_JSON, UTF8 } = require('./constants');

const createKeyValue = function(text) {
  const keyValuePair = new Object();
  const splittedText = text.split('&').map(pair => pair.split('='));
  const assignKeyValue = ([key, value]) => (keyValuePair[key] = value);
  splittedText.forEach(assignKeyValue);
  return keyValuePair;
};

const getUsers = function() {
  const users = fs.readFileSync(USER_JSON, UTF8);
  return JSON.parse(users);
};

const getUsersTodo = function() {
  const usersTodo = fs.readFileSync(USERS_TODO, UTF8);
  return JSON.parse(usersTodo);
};

const redirectTo = function(res, location) {
  res.statusCode = 302;
  res.setHeader('Location', location);
  res.end();
};

module.exports = { createKeyValue, redirectTo, getUsers, getUsersTodo };
