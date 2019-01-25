const Todo = require('../src/model/todo');
const { send } = require('./handlers');

const createTodo = function(req, res) {
  const { title, description } = JSON.parse(req.body);
  const todo = new Todo(title, description);
  send(res, JSON.stringify(todo));
};

module.exports = {
  createTodo
};
