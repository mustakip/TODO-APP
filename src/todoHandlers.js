const Todo = require('../src/model/todo');
const fs = require('fs');
const { send } = require('./handlers');
const todos = fs.readFileSync('./private/todo.json', 'utf8');

const createTodo = function(req, res) {
  const { title, description } = JSON.parse(req.body);
  const todo = new Todo(title, description);
  const parsedTodos = JSON.parse(todos);
  parsedTodos.push(todo);
  fs.writeFile('./private/todo.json', JSON.stringify(parsedTodos), () => {
    send(res, JSON.stringify(todo));
  });
};

module.exports = {
  createTodo
};
