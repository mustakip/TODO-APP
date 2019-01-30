const fs = require('fs');
const { SESSIONS_PATH, UTF8, HOME_PAGE, LOGIN_PAGE } = require('./constants');
const {
  getUsers,
  createKeyValue,
  redirectTo,
  getSessions
} = require('./utils');

const users = getUsers();
const activeSessions = getSessions();

const addSession = function(userid, cookie) {
  activeSessions[cookie] = userid;
  fs.writeFileSync(SESSIONS_PATH, JSON.stringify(activeSessions), UTF8);
};

const isValidUser = function(userid, password) {
  return users[userid] && users[userid].password === password;
};

const renderHome = function(userid, res) {
  const cookie = new Date().getTime();
  addSession(userid, cookie);
  res.setHeader('Set-Cookie', `session=${cookie}`);
  redirectTo(res, HOME_PAGE);
};

const loginHandler = function(req, res) {
  const { userid, password } = createKeyValue(req.body);
  if (isValidUser(userid, password)) return renderHome(userid, res);
  redirectTo(res, LOGIN_PAGE);
};

module.exports = { loginHandler };
