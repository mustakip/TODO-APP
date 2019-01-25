const TodoList = require('../src/model/todoList');
const Todo = require('../src/model/todo');
const expect = require('chai').expect;

describe('todoList', () => {
  it('should create a new Todo List', () => {
    const todoList = new TodoList();
    expect(todoList)
      .have.a.property('id')
      .equals(0);
    expect(todoList)
      .have.a.property('todoLists')
      .to.be.an('Object');
  });

  it('should update the id', () => {
    const todoList = new TodoList();
    todoList.updateID();
    expect(todoList)
      .to.have.property('id')
      .equals(1);
  });

  it('should add a new todo', () => {
    const todoList = new TodoList();
    const todo = new Todo('office', 'birthday');
    todoList.addTodo(todo);
    expect(todoList)
      .to.have.property('todoLists')
      .to.be.an('Object');
  });

  it('should delete todo of the given id', () => {
    const todoList = new TodoList();
    const todo1 = new Todo('office', 'birthday');
    const todo2 = new Todo('home', 'birthday');
    todoList.addTodo(todo1);
    todoList.addTodo(todo2);
    todoList.deleteTodo(2);
    expect(todoList)
      .to.have.property('todoLists')
      .to.be.an('Object')
      .to.not.have.property(2);
  });
});
