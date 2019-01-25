const fetchTitleAndDescription = function() {
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
  fetch('/createTodo', {
    method: 'POST',
    body: JSON.stringify({ title, description })
  })
    .then(res => res.text())
    .then(details => alert(details));
};

window.onload = () => {
  document.getElementById('create_todo_btn').onclick = fetchTitleAndDescription;
};
