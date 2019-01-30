const createInputField = function(type, id, value) {
  const inputField = document.createElement('input');
  inputField.type = type;
  inputField.value = value;
  inputField.id = id;
  return inputField;
};

const createDiv = function(className, id, innerHTML) {
  const divElement = document.createElement('div');
  divElement.id = id;
  divElement.className = className;
  divElement.innerHTML = innerHTML;
  return divElement;
};

const createButton = function(id, value, onclickEvent) {
  const buttonElement = document.createElement('button');
  buttonElement.id = id;
  buttonElement.innerHTML = value;
  buttonElement.onclick = onclickEvent;
  return buttonElement;
};

const appendChildren = function(parent, children) {
  parent.innerHTML = '';
  children.forEach(child => {
    parent.appendChild(child);
  });
};
