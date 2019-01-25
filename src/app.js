const Express = require('./express');
const app = new Express();
const { serveFile, logRequest, readPostBody } = require('./handlers');
const { createNewUser } = require('./createUser');
const { createTodo, addTask, createTodoList } = require('./todoHandlers');

app.use(logRequest);
app.use(readPostBody);
app.post('/signup', createNewUser);
app.post('/createTodo', createTodo);
app.post('/addTask', addTask);
app.get('/home.html', createTodoList);
app.use(serveFile);

module.exports = app.handleRequest.bind(app);
