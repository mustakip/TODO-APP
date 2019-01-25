const TodoList = require('../src/model/todoList');
const Todo = require('../src/model/todo');
const expect = require('chai').expect;

describe('todoList', () => {
  beforeEach(() => {
    todoList = new TodoList({
      id: 0,
      todoLists: new Object()
    });
  });

  it('should create a new Todo List', () => {
    expect(todoList)
      .have.a.property('id')
      .equals(0);
    expect(todoList)
      .have.a.property('todoLists')
      .to.be.an('Object');
  });

  it('should update the id', () => {
    todoList.updateID();
    expect(todoList)
      .to.have.property('id')
      .equals(1);
  });

  it('should add a new todo', () => {
    const todo = new Todo({
      title: 'office',
      description: 'birthday',
      id: 0,
      todoTasks: {}
    });
    todoList.addTodo(todo);
    expect(todoList)
      .to.have.property('todoLists')
      .to.be.an('Object');
  });

  it('should delete todo of the given id', () => {
    const todo1 = new Todo({
      title: 'office',
      description: 'birthday',
      id: 0,
      todoTasks: {}
    });
    const todo2 = new Todo({
      title: 'home',
      description: 'birthday',
      id: 0,
      todoTasks: {}
    });
    todoList.addTodo(todo1);
    todoList.addTodo(todo2);
    todoList.deleteTodo(2);
    expect(todoList)
      .to.have.property('todoLists')
      .to.be.an('Object')
      .to.not.have.property(2);
  });
});
