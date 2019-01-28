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
const { createTodo, addTask, provideTodos } = require('./todoHandlers');

app.use(logRequest);
app.use(readPostBody);
app.use(readCookie);
app.post('/signup', signupHandler);
app.post('/login', loginHandler);
app.post('/createTodo', createTodo);
app.post('/addTask', addTask);
app.get('/todos', provideTodos);
app.use(serveFile);

module.exports = app.handleRequest.bind(app);
