const REDIRECTS = { '/': './public/index.html' };
const { HOME_DIR } = require('./constants');

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

const send = function(res, content, statusCode = 200) {
  res.statusCode = statusCode;
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

module.exports = {
  createKeyValue,
  redirectTo,
  send,
  resolveRequestedRoute,
  isValidCookie
};
