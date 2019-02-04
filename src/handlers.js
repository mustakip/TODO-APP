const { HOME_PAGE, INDEX_PAGE } = require('./constants');
const { isValidCookie } = require('./utils');

const restrictedURLsWhenLoggedIn = [
  '/',
  '/index.html',
  '/login.html',
  '/signup.html'
];

const restrictedURLsWhenNotLoggedIn = [
  '/home.html',
  'todo.html',
  '/todos',
  '/getTodo',
  '/renderTodo',
  '/createTodo',
  '/addTask',
  '/deleteTodo',
  '/editTitle',
  '/editDescription',
  '/editTask',
  '/deleteTask',
  '/toggleStatus',
  '/logout',
  '/javascript/fetch.js',
  '/javascript/main.js',
  '/javascript/usersTodo.js',
  '/javascript/utils/htmlEntities.js',
  '/javascript/userTask.js'
];

const logRequest = function(req, res, next) {
  console.log(req.method, req.url);
  next();
};

const readPostBody = function(req, res, next) {
  let content = '';
  req.on('data', chunk => (content += chunk));
  req.on('end', () => {
    req.body = content;
    next();
  });
};

const redirect = function(cache, req, res, next) {
  const cookie = req.cookies.session;
  if (restrictedURLsWhenLoggedIn.includes(req.url)) {
    if (isValidCookie(cache, cookie)) {
      return res.redirect(HOME_PAGE);
    }
  }
  if (restrictedURLsWhenNotLoggedIn.includes(req.url)) {
    if (!isValidCookie(cache, cookie)) {
      return res.redirect(INDEX_PAGE);
    }
  }
  next();
};

module.exports = {
  logRequest,
  readPostBody,
  redirect
};
