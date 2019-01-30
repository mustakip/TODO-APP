const fs = require('fs');
const {
  HOME_DIR,
  NOT_FOUND_MESSAGE,
  HOME_PAGE,
  INDEX_PAGE
} = require('./constants');
const { redirectTo, getSessions } = require('./utils');
const REDIRECTS = { '/': './public/index.html' };

const logRequest = function(req, res, next) {
  console.log(req.method, req.url);
  next();
};

const send = function(res, content, statusCode = 200) {
  res.statusCode = statusCode;
  res.write(content);
  res.end();
};

const resolveRequestedRoute = function(url) {
  return REDIRECTS[url] || HOME_DIR + url;
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

const isValidCookie = function(cache, cookie) {
  const allCookies = Object.keys(cache.sessions);
  return allCookies.includes(cookie);
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
