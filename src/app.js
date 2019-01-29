const Express = require('./express');
const { loginHandler } = require('./login.js');
const { signupHandler } = require('./createUser');
const app = new Express();
const {
  serveFile,
  logRequest,
  readPostBody,
  readCookie
} = require('./handlers');
const {
  createTodo,
  addTask,
  provideTodos,
  provideCurrentTodo,
  deleteTodo,
  editTitle,
  editDescription,
  editTask
} = require('./todoHandlers');

app.use(logRequest);
app.use(readPostBody);
app.use(readCookie);
app.post('/signup', signupHandler);
app.post('/login', loginHandler);
app.post('/createTodo', createTodo);
app.post('/addTask', addTask);
app.post('/deleteTodo', deleteTodo);
app.post('/editTitle', editTitle);
app.post('/editDescription', editDescription);
app.post('/editTask', editTask);
app.get('/todos', provideTodos);
app.get('/getTodo', provideCurrentTodo);
app.use(serveFile);

module.exports = app.handleRequest.bind(app);
