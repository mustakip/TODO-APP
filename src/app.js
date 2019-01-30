const Express = require('./express');
const { loginHandler } = require('./login');
const { signupHandler } = require('./signup');
const app = new Express();
const {
  serveFile,
  logRequest,
  readPostBody,
  readCookie,
  redirect
} = require('./handlers');
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
  logoutHandler
} = require('./todoHandlers');

app.use(logRequest);
app.use(readPostBody);
app.use(readCookie);
app.get('/', redirect);
app.get('/todos', provideTodos);
app.get('/getTodo', provideCurrentTodo);
app.post('/signup', signupHandler);
app.post('/login', loginHandler);
app.post('/createTodo', createTodo);
app.post('/addTask', addTask);
app.post('/deleteTodo', deleteTodo);
app.post('/editTitle', editTitle);
app.post('/editDescription', editDescription);
app.post('/editTask', editTask);
app.post('/deleteTask', deleteTask);
app.post('/toggleStatus', toggleStatus);
app.post('/logout', logoutHandler);
app.use(serveFile);

module.exports = app.handleRequest.bind(app);
