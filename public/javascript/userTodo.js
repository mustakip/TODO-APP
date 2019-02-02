const getTitleDiv = document => document.getElementById('todo_title');
const getEditTitleDiv = document => document.getElementById('edit_title');

const getDescriptionDiv = document => document.getElementById('todo_description');

const getTodoTitle = document => document.getElementById('todo_title').textContent;

const getTodoDescription = document =>
  document.getElementById('todo_description').textContent;

const getEditDescriptionDiv = document =>
  document.getElementById('edit_description');

const displayTodo = function(todo) {
  const titleDiv = getTitleDiv(document);
  const descriptionDiv = getDescriptionDiv(document);
  const tasksDiv = getTasksContainer(document);
  generateTaskView(todo.todoTasks, tasksDiv);
  titleDiv.innerHTML = todo.title;
  descriptionDiv.innerText = todo.description;
};

const updateTodoPage = function(todo) {
  const editTitleBtn = createButton(
    'edit_title_btn',
    EDIT_UNICODE,
    createEditTitleBox
  );
  const editDescriptionBtn = createButton(
    'edit_description_btn',
    EDIT_UNICODE,
    createEditDescriptionBox
  );
  const editTitleBtnDiv = getEditTitleDiv(document);
  const editDescriptionBtnDiv = getEditDescriptionDiv(document);
  appendChildren(editTitleBtnDiv, [editTitleBtn]);
  appendChildren(editDescriptionBtnDiv, [editDescriptionBtn]);

  displayTodo(todo);
};

const createEditTitleBox = function() {
  const title = getTodoTitle(document);
  const editTitleInput = createInputField('text', 'new_title', title);
  const editTitleBtn = createButton('add_title', 'Edit Title', editTitle);
  const editTitleBox = [editTitleInput, editTitleBtn];
  const editTitleDiv = getEditTitleDiv(document);
  appendChildren(editTitleDiv, editTitleBox);
};

const createEditDescriptionBox = function() {
  const description = getTodoDescription(document);
  const editDescriptionInput = createInputField(
    'text',
    'new_description',
    description
  );
  const addDescriptionBtn = createButton(
    'add_description',
    'Edit Description',
    editDescription
  );
  const editDescriptionDiv = getEditDescriptionDiv(document);
  appendChildren(editDescriptionDiv, [editDescriptionInput, addDescriptionBtn]);
};

const displayNameAndTasks = function(content) {
  displayTodo(content.todo);
  displayUsername(content.username);
};

window.onload = () => {
  getUserTasks();
  document.getElementById('add_task_btn').onclick = addTask;
  document.getElementById('edit_title_btn').onclick = createEditTitleBox;
  document.getElementById('edit_description_btn').onclick = createEditDescriptionBox;
};
