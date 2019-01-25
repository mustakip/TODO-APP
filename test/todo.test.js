const Todo = require('../src/model/todo');
const expect = require('chai').expect;

describe('Todo', () => {
  beforeEach(() => {
    todo = new Todo('office', 'birthday');
  });

  it('should create a new Todo', () => {
    expect(todo)
      .to.have.property('title')
      .equals('office');
    expect(todo)
      .to.have.property('description')
      .equals('birthday');
    expect(todo)
      .to.have.property('id')
      .equals(0);
    expect(todo)
      .to.have.property('todoTasks')
      .to.be.an('Object');
  });

  it('should update the id', () => {
    todo.updateID();
    expect(todo)
      .to.have.property('id')
      .equals(1);
  });

  it('should add a task to the todo', () => {
    todo.addTask('buy cake');
    expect(todo)
      .to.have.property('todoTasks')
      .to.be.an('Object')
      .to.have.property('1')
      .to.be.an('Object')
      .to.have.property('task')
      .equals('buy cake');
    expect(todo)
      .to.have.property('todoTasks')
      .to.be.an('Object')
      .to.have.property('1')
      .to.be.an('Object')
      .to.have.property('done')
      .equals(false);
  });

  it('should delete the task of the given id', () => {
    todo.addTask('buy cake');
    todo.addTask('buy gift');
    todo.deleteTask(2);
    expect(todo)
      .to.have.property('todoTasks')
      .to.be.an('Object')
      .to.not.have.property('2');
  });
  it('should mark the task as done', () => {
    todo.addTask('buy cake');
    todo.markAsDone(1);
    expect(todo)
      .to.have.property('todoTasks')
      .to.be.an('Object')
      .to.have.property('1')
      .to.be.an('Object')
      .to.have.property('done')
      .equals(true);
  });
  it('should mark the task as undone', () => {
    todo.addTask('buy cake');
    todo.markAsDone(1);
    todo.markAsUndone(1);
    expect(todo)
      .to.have.property('todoTasks')
      .to.be.an('Object')
      .to.have.property('1')
      .to.be.an('Object')
      .to.have.property('done')
      .equals(false);
  });
  it('should edit the task of the given id', () => {
    todo.addTask('buy cake');
    todo.editTask(1, 'buy gift');
    expect(todo)
      .to.have.property('todoTasks')
      .to.be.an('Object')
      .to.have.property('1')
      .to.be.an('Object')
      .to.have.property('task')
      .equals('buy gift');
  });
  it('should edit the title of the todo', () => {
    todo.editTitle('home');
    expect(todo)
      .to.have.property('title')
      .equals('home');
  });
  it('should edit the description of the todo', () => {
    todo.editDescription('in office');
    expect(todo)
      .to.have.property('description')
      .equals('in office');
  });
});
