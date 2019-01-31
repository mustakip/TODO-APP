const fs = require('fs');
const { SESSIONS_PATH, UTF8, HOME_PAGE, LOGIN_PAGE } = require('./constants');
const { createKeyValue, redirectTo } = require('./utils');

const addSession = function(cache, userid, cookie) {
  cache.sessions[cookie] = userid;
  fs.writeFileSync(SESSIONS_PATH, JSON.stringify(cache.sessions), UTF8);
};

const isValidUser = function(cache, userid, password) {
  return cache.users[userid] && cache.users[userid].password === password;
};

const renderHome = function(cache, userid, res) {
  const cookie = new Date().getTime();
  addSession(cache, userid, cookie);
  res.setHeader('Set-Cookie', `session=${cookie}`);
  redirectTo(res, HOME_PAGE);
};

const loginHandler = function(cache, req, res) {
  const { userid, password } = createKeyValue(req.body);
  if (isValidUser(cache, userid, password)) return renderHome(cache, userid, res);
  redirectTo(res, LOGIN_PAGE);
};

module.exports = { loginHandler };
