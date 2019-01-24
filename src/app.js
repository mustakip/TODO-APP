const Express = require('./express');
const app = new Express();
const { serveFile, logRequest } = require('./handlers');

app.use(logRequest);
app.use(serveFile);

module.exports = app.handleRequest.bind(app);
