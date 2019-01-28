const Express = require('./express');
const { loginHandler } = require('./login.js');
const { signupHandler } = require('./createUser');
const app = new Express();
const { serveFile, logRequest, readPostBody } = require('./handlers');
const { createTodo, addTask, createTodoList } = require('./todoHandlers');

app.use(logRequest);
app.use(readPostBody);
app.post('/signup', signupHandler);
app.post('/login', loginHandler);
app.get('/home.html', createTodoList);
app.post('/createTodo', createTodo);
app.post('/addTask', addTask);
app.use(serveFile);

module.exports = app.handleRequest.bind(app);
