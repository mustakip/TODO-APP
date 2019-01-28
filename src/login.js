const { getUsers, createKeyValue, redirectTo } = require('./utils');

const users = getUsers();

const renderHome = function(req, res) {
  const { userid, password } = createKeyValue(req.body);
  if (users[userid] && users[userid].password === password) {
    res.setHeader('Set-Cookie', `userid=${userid}`);
    return redirectTo(res, '/home.html');
  }
  redirectTo(res, '/login.html');
};

module.exports = { renderHome };
