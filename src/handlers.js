const fs = require('fs');
const { NOT_FOUND_MESSAGE, HOME_PAGE, INDEX_PAGE } = require('./constants');
const {
  redirectTo,
  send,
  isValidCookie,
  resolveRequestedRoute,
  resolveMIMEType,
  getFileExtension
} = require('./utils');

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

const serveFile = function(req, res) {
  const requestedRoute = resolveRequestedRoute(req.url);
  const fileExtension = getFileExtension(requestedRoute);
  fs.readFile(requestedRoute, (error, content) => {
    if (error) return send(res, NOT_FOUND_MESSAGE, resolveMIMEType(), 404);
    send(res, content, resolveMIMEType(fileExtension));
  });
};

const readCookie = function(req, res, next) {
  const cookie = req.headers.cookie;
  const cookies = {};
  if (cookie) {
    cookie.split(';').forEach(element => {
      const [name, value] = element.split('=');
      cookies[name.trim()] = value.trim();
    });
  }
  req.cookies = cookies;
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
      return redirectTo(res, HOME_PAGE);
    }
  }
  if (restrictedURLsWhenNotLoggedIn.includes(req.url)) {
    if (!isValidCookie(cache, cookie)) {
      return redirectTo(res, INDEX_PAGE);
    }
  }
  next();
};

module.exports = {
  serveFile,
  resolveRequestedRoute,
  send,
  logRequest,
  readPostBody,
  readCookie,
  redirect
};
