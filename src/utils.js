const createKeyValue = function(text) {
  const keyValuePair = new Object();
  const splittedText = text.split('&').map(pair => pair.split('='));
  const assignKeyValue = ([key, value]) => (keyValuePair[key] = value);
  splittedText.forEach(assignKeyValue);
  return keyValuePair;
};

const redirectTo = function(res, location) {
  res.statusCode = 302;
  res.setHeader('Location', location);
  res.end();
};

module.exports = { createKeyValue, redirectTo };
