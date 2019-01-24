class Todo {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.id = 0;
    this.todoTasks = {};
  }

  updateID() {
    this.id = this.id + 1;
  }

  addTask(description) {
    this.updateID();
    this.todoTasks[this.id] = { Task: description, done: false };
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

  editTask(id, description) {
    this.todoTasks[id].Task = description;
  }

  editTitle(newTitle) {
    this.title = newTitle;
  }
  editDescription(newDescription) {
    this.description = newDescription;
  }
}
