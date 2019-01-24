class TodoList {
  constructor() {
    this.id = 0;
    this.todoLists = {};
  }

  updateID() {
    this.id = this.id + 1;
  }

  addTodo(todo) {
    this.updateID();
    this.todoLists[this.id] = todo;
  }

  deleteTodo(id) {
    delete this.todoLists[id];
  }
}
