const getTodoDiv = document => document.getElementById('todo_list');
const getTask = document => document.getElementById('task').value;
const createElement = element => document.createElement(element);
const EMPTY = '';
const DELETE_UNICODE = '&#x274C';

const renderTodoPage = function(id) {
  document.cookie = 'todo=' + id;
  window.location.href = '/todo.html';
};

const getTitle = (todos, id) => todos.todoLists[id].title;
const getDescription = (todos, id) => todos.todoLists[id].description;

const assignTodoAttributes = function(todos, id) {
  const title = getTitle(todos, id);
  const description = getDescription(todos, id);
  const todoDetailsDiv = generateTodoView(id, title, description);
  return todoDetailsDiv;
};

const displayExistingTodos = function(todos) {
  const todoDiv = getTodoDiv(document);
  const todoHTML = Object.keys(todos.todoLists).map(id =>
    assignTodoAttributes(todos, id)
  );
  appendChildren(todoDiv, todoHTML);
};

const createDeleteButton = function(id) {
  const deleteBtn = createImage('/images/delete.png', 48, 48);
  deleteBtn.onclick = deleteTodo.bind(null, id);
  deleteBtn.onmouseover = () => (event.target.src = '/images/delete_hover.png');
  deleteBtn.onmouseout = () => (event.target.src = '/images/delete.png');
  deleteBtn.className = 'img_btn';

  return deleteBtn;
};

const createTitlteDescriptionDiv = function(id, title, description) {
  const titleDescriptionDiv = createDiv('list_info', EMPTY, EMPTY);
  titleDescriptionDiv.onclick = renderTodoPage.bind(null, id);

  const titleHeading = createHeading('h1', title);
  const descriptionHeading = createHeading('h3', description);

  appendChildren(titleDescriptionDiv, [titleHeading, descriptionHeading]);
  return titleDescriptionDiv;
};

const generateTodoView = function(id, title, description) {
  const todoDiv = createDiv('todo_div', id, EMPTY);
  const deleteButton = createDeleteButton(id);
  const titleDescriptionDiv = createTitlteDescriptionDiv(id, title, description);

  appendChildren(todoDiv, [titleDescriptionDiv, deleteButton]);
  return todoDiv;
};

const displayNameAndTodos = function(content) {
  displayExistingTodos(content.todo);
  displayUsername(content.username);
};

window.onload = () => {
  document.getElementById('create_todo_btn').onclick = fetchTitleAndDescription;
  document.getElementById('todo_list').onclick = fetchTodoJson;
  fetchTodoJson();
};
