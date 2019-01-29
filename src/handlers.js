const fs = require('fs');
const { HOME_DIR, NOT_FOUND_MESSAGE } = require('./constants');
const { redirectTo, getSessions } = require('./utils');
const REDIRECTS = { '/': './public/index.html' };

const activeSessions = getSessions();
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
      try {
        const [name, value] = element.split('=');
        cookies[name.trim()] = value.trim();
      } catch (err) {
        console.log(err);
      }
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

const isValidCookie = function(cookie) {
  const allCookies = Object.keys(activeSessions);
  return allCookies.includes(cookie);
};

const redirect = function(req, res) {
  const cookie = req.cookies.session;
  if (cookie && isValidCookie(cookie)) {
    return redirectTo(res, '/home.html');
  }
  redirectTo(res, '/index.html');
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
