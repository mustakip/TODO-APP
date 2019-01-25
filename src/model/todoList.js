class TodoList {
  constructor(ListDetails) {
    this.id = ListDetails.id;
    this.todoLists = ListDetails.todoLists;
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

module.exports = TodoList;
