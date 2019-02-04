const HOME_DIR = './public';
const UTF8 = 'utf8';
const USER_JSON_PATH = './private/users.json';
const USERS_TODOS_PATH = './private/todo.json';
const SESSIONS_PATH = './private/sessions.json';
const HOME_PAGE = '/home.html';
const LOGIN_PAGE = '/login.html';
const INDEX_PAGE = '/index.html';
const INTERNAL_SERVER_ERROR = 'INTERNAL SERVER ERROR';
const MIME_TEXT_PLAIN = 'text/plain';
const MIME_TYPES = {
  css: 'text/css',
  html: 'text/html',
  js: 'text/javascript',
  csv: 'text/csv',
  gif: 'image/gif',
  htm: 'text/html',
  html: 'text/html',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  json: 'application/json',
  png: 'image/png',
  xml: 'text/xml',
  pdf: 'application/pdf'
};

module.exports = {
  HOME_DIR,
  UTF8,
  USER_JSON_PATH,
  USERS_TODOS_PATH,
  SESSIONS_PATH,
  HOME_PAGE,
  LOGIN_PAGE,
  INDEX_PAGE,
  INTERNAL_SERVER_ERROR,
  MIME_TEXT_PLAIN,
  MIME_TYPES
};
