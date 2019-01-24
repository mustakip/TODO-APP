const fs = require('fs');
const { createKeyValue, redirectTo } = require('./utils');
const { UTF8, USER_JSON } = require('./constants');

const users = fs.readFileSync(USER_JSON, UTF8);

const createNewUser = function(req, res) {
  let userDetails = createKeyValue(req.body);
  const usersJson = JSON.parse(users);
  usersJson.push(userDetails);
  fs.writeFileSync(USER_JSON, JSON.stringify(usersJson), UTF8);
  redirectTo(res, '/login.html');
};

module.exports = {
  createNewUser
};
