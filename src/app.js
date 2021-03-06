const Express = require('express');
const app = new Express();
const cookieParser = require('cookie-parser');
const { loginHandler } = require('./login');
const { signupHandler } = require('./signup');
const { initialiseCache } = require('./cache');
const { logRequest, readPostBody, redirect } = require('./handlers');
const {
  createTodo,
  addTask,
  provideTodos,
  provideCurrentTodo,
  deleteTodo,
  editTitle,
  editDescription,
  editTask,
  deleteTask,
  toggleStatus,
  logoutHandler,
  renderTodo
} = require('./todoHandlers');

const cache = initialiseCache();

app.use(logRequest);
app.use(readPostBody);
app.use(cookieParser());
app.use(redirect.bind(null, cache));
app.get('/todos', provideTodos.bind(null, cache));
app.get('/getTodo', provideCurrentTodo.bind(null, cache));
app.post('/signup', signupHandler.bind(null, cache));
app.post('/login', loginHandler.bind(null, cache));
app.post('/renderTodo', renderTodo.bind(null, cache));
app.post('/createTodo', createTodo.bind(null, cache));
app.post('/addTask', addTask.bind(null, cache));
app.post('/deleteTodo', deleteTodo.bind(null, cache));
app.post('/editTitle', editTitle.bind(null, cache));
app.post('/editDescription', editDescription.bind(null, cache));
app.post('/editTask', editTask.bind(null, cache));
app.post('/deleteTask', deleteTask.bind(null, cache));
app.post('/toggleStatus', toggleStatus.bind(null, cache));
app.post('/logout', logoutHandler.bind(null, cache));
app.use(Express.static('public'));

module.exports = app;
