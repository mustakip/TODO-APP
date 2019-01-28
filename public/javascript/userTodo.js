const getTasksHTML = function(tasks) {
  const ids = Object.keys(tasks);
  const taskHTML = ids.map(id => {
    const task = tasks[id].task;
    return `<li>${task}</li>`;
  });
  return `<ul>${taskHTML.join('')}</ul>`;
};

const displayTodo = function(todo) {
  const titleDiv = document.getElementById('todo_title');
  const descriptionDiv = document.getElementById('todo_description');
  const tasksDiv = document.getElementById('todo_tasks');
  const tasksHTML = getTasksHTML(todo.todoTasks);
  titleDiv.innerText = todo.title;
  descriptionDiv.innerText = todo.description;
  tasksDiv.innerHTML = tasksHTML;
};

const addTask = function() {
  const task = document.getElementById('task_input_box').value;
  fetch('/addTask', {
    method: 'POST',
    body: task
  })
    .then(res => {
      return res.json();
    })
    .then(todo => {
      displayTodo(todo);
    });
};

const getuserTasks = function() {
  fetch('/getTodo')
    .then(res => {
      return res.json();
    })
    .then(todo => {
      displayTodo(todo);
    });
};

window.onload = () => {
  document.getElementById('add_task_btn').onclick = addTask;
  getuserTasks();
};
