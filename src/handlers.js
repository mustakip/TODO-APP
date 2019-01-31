const fs = require('fs');
const {
  NOT_FOUND_MESSAGE,
  HOME_PAGE,
  INDEX_PAGE
} = require('./constants');
const {
  redirectTo,
  send,
  isValidCookie,
  resolveRequestedRoute
} = require('./utils');

const logRequest = function(req, res, next) {
  console.log(req.method, req.url);
  next();
};



const serveFile = function(req, res) {
  const requestedRoute = resolveRequestedRoute(req.url);
  fs.readFile(requestedRoute, (error, content) => {
    if (error) return send(res, NOT_FOUND_MESSAGE, 404);
    send(res, content);
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


const redirect = function(cache, req, res) {
  const cookie = req.cookies.session;
  if (isValidCookie(cache, cookie)) {
    return redirectTo(res, HOME_PAGE);
  }
  redirectTo(res, INDEX_PAGE);
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
