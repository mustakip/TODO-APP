const fs = require('fs');
const { HOME_DIR, NOT_FOUND_MESSAGE } = require('./constants');
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

module.exports = {
  serveFile,
  resolveRequestedRoute,
  send,
  logRequest
};
