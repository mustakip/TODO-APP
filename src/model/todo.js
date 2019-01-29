class Todo {
  constructor(todoDetails) {
    this.title = todoDetails.title;
    this.description = todoDetails.description;
    this.id = todoDetails.id;
    this.todoTasks = todoDetails.todoTasks;
  }

  updateID() {
    this.id = this.id + 1;
  }

  addTask(description) {
    this.updateID();
    this.todoTasks[this.id] = { task: description, done: false };
  }

  deleteTask(id) {
    delete this.todoTasks[id];
  }

  markAsDone(id) {
    this.todoTasks[id].done = true;
  }

  markAsUndone(id) {
    this.todoTasks[id].done = false;
  }

  toggleStatus(id) {
    this.todoTasks[id].done = !this.todoTasks[id].done;
  }

  editTask(id, description) {
    this.todoTasks[id].task = description;
  }

  editTitle(newTitle) {
    this.title = newTitle;
  }
  editDescription(newDescription) {
    this.description = newDescription;
  }
}

module.exports = Todo;
