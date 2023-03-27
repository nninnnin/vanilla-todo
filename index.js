// 한 일을 나타내는 건 아직 구현 중입니다!
let todoList = [];
let successList = [];

const toDoForm = document.querySelector('#todo-form');
const todoListElement = document.querySelector('.todo-list');
const toDoInput = toDoForm.querySelector('input');

const TODOS_KEY = 'todos';

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todoList));
}

function deleteTodo(event) {
  const div = event.target.parentElement;
  div.remove();
  todoList = todoList.filter((toDo) => toDo.id !== parseInt(div.id));
  saveToDos();
}

function successTodo(event) {
  const div = event.target.parentElement;
  div.remove();
  todoList = todoList.filter((toDo) => toDo.id === parseInt(div.id));
  successList.push(todoList);
  localStorage.setItem('success', JSON.stringify(successList));
}

function paintToDo(newTodo) {
  const div = document.createElement('div');
  div.id = newTodo.id;
  div.className = 'todo-item';
  const span = document.createElement('span');
  span.className = 'todo-item-span';
  span.innerText = newTodo.text;
  const button_delete = document.createElement('button');
  button_delete.innerText = '❌';
  button_delete.addEventListener('click', deleteTodo);
  const button_success = document.createElement('button');
  button_success.innerText = '👌';
  button_delete.addEventListener('click', successTodo);
  div.appendChild(span);
  div.appendChild(button_delete);
  div.appendChild(button_success);
  todoList.push(newTodo);
  todoListElement.appendChild(div);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  toDoInput.value = '';
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener('submit', handleToDoSubmit);
const savedToDos = localStorage.getItem(TODOS_KEY);

if (savedToDos) {
  const parsedToDos = JSON.parse(savedToDos);
  parsedToDos.forEach(paintToDo);
}
