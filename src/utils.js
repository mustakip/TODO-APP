const REDIRECTS = { '/': './public/index.html' };
const { HOME_DIR, MIME_TEXT_PLAIN, MIME_TYPES } = require('./constants');

const decodeURI = value => unescape(value).replace(/\+/g, ' ');

const createKeyValue = function(text) {
  const keyValuePair = new Object();
  const splittedText = text.split('&').map(pair => pair.split('='));
  const assignKeyValue = ([key, value]) => (keyValuePair[key] = decodeURI(value));
  splittedText.forEach(assignKeyValue);
  return keyValuePair;
};

const redirectTo = function(res, location) {
  res.statusCode = 302;
  res.setHeader('Location', location);
  res.end();
};

const send = function(res, content, contentType, statusCode = 200) {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.write(content);
  res.end();
};

const resolveRequestedRoute = function(url) {
  return REDIRECTS[url] || HOME_DIR + url;
};

const isValidCookie = function(cache, cookie) {
  const allCookies = Object.keys(cache.sessions);
  return allCookies.includes(cookie);
};

const resolveMIMEType = function(fileExtension) {
  return MIME_TYPES[fileExtension] || MIME_TEXT_PLAIN;
};

module.exports = {
  createKeyValue,
  redirectTo,
  send,
  resolveRequestedRoute,
  isValidCookie,
  resolveMIMEType
};
