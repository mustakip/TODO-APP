const decodeURI = value => unescape(value).replace(/\+/g, ' ');

const createKeyValue = function(text) {
  const keyValuePair = new Object();
  const splittedText = text.split('&').map(pair => pair.split('='));
  const assignKeyValue = ([key, value]) => (keyValuePair[key] = decodeURI(value));
  splittedText.forEach(assignKeyValue);
  return keyValuePair;
};

const isValidCookie = function(cache, cookie) {
  const allCookies = Object.keys(cache.sessions);
  return allCookies.includes(cookie);
};

module.exports = {
  createKeyValue,
  isValidCookie
};
