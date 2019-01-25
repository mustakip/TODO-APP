const fetchTitleAndDescription = function() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  fetch('/createTodo', {
    method: 'POST',
    body: JSON.stringify({ title, description })
  })
    .then(res => res.text())
    .then(details => {
      generateTodoDiv(title, description);
    });
};

const generateTodoDiv = function(title, description) {
  const todoDiv = document.getElementById('todo_list');
  const newTodo = document.createElement('div');
  newTodo.className = 'todo_item';
  newTodo.innerHTML = `<h1> ${title}</h1><h2> ${description}</h2>`;
  todoDiv.appendChild(newTodo);
};

window.onload = () => {
  document.getElementById('create_todo_btn').onclick = fetchTitleAndDescription;
};
