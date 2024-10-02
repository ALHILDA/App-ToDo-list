'use strict';

const addBtn = document.querySelector('.add-btn');
const filterSelect = document.querySelector('.filter-select');
const taskList = document.querySelector('.task-list');
const modalWindow = document.querySelector('.modal-window');
const taskInput = document.querySelector('.task-input');
const saveBtn = document.querySelector('.save-btn');
const closeBtn = document.querySelector('.close-btn');
const titleInput = document.querySelector('.task-title');
const error = document.querySelector('#error');
const todo = document.querySelector('.todo-list');
const time = document.querySelector('.timestamp');
let currentTask;

function createTaskHTML(title, task, timestamp) {
  return `
    <li>
      <div class="task-title">${title}</div>
      <div class="task-item">
        <input class="checkbox" type="checkbox">
        <span class="task-text">${task}</span>
        <button class="edit-btn">
          <img class="todo-controls" src="./Asset/images/draw.png"/>
        </button>
        <button class="delete-btn">
          <img class="todo-controls" src="./Asset/images/bin.png"/>
        </button>
      </div>
      <div class="timestamp">${timestamp}</div>
    </li>
  `;
}

closeBtn.addEventListener('click', () => {
  modalWindow.style.display = 'none';
  taskInput.value = '';
  titleInput.value = '';
});

taskList.addEventListener('click', (e) => {
  if (e.target.closest('.delete-btn')) {
    const taskLi = e.target.closest('li');
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      taskLi.remove();
    }
  } else if (e.target.closest('.edit-btn')) {
    editTask(e);
  } else if (e.target.classList.contains('checkbox')) {
    const taskText = e.target.parentNode.querySelector('.task-text');
    const taskTitle = e.target.parentNode.parentNode.querySelector('.task-title');
    const timestamp = e.target.parentNode.parentNode.querySelector('.timestamp');
    taskText.style.textDecoration = e.target.checked ? 'line-through' : 'none';
    taskTitle.style.textDecoration = e.target.checked ? 'line-through' : 'none';
    timestamp.style.textDecoration = e.target.checked ? 'line-through' : 'none';
  }
});

function editTask(e) {
  const taskLi = e.target.closest('li');
  const taskText = taskLi.querySelector('.task-text').textContent;
  const taskTitle = taskLi.querySelector('.task-title').textContent;
  taskInput.value = taskText;
  titleInput.value = taskTitle;
  modalWindow.style.display = 'block';
  currentTask = taskLi;
}

saveBtn.addEventListener('click', () => {
  if (titleInput.value.trim() === '') {
    alert('Title is required');
    return false;
  }

  if (taskInput.value.trim() === '') {
    alert('Description is required');
    return false;
  }

  const title = titleInput.value;
  const task = taskInput.value;
  const timestamp = new Date().toLocaleString();

  if (currentTask) {
    currentTask.querySelector('.task-title').textContent = title;
    currentTask.querySelector('.task-text').textContent = task;
    currentTask.querySelector('.timestamp').textContent = timestamp;
    currentTask = null;
  } else {
    const taskHTML = createTaskHTML(title, task, timestamp);
    taskList.insertAdjacentHTML('beforeend', taskHTML);
  }

  modalWindow.style.display = 'none';
  taskInput.value = '';
  titleInput.value = '';
  todo.style.display = 'block';
});

addBtn.addEventListener('click', () => {
  modalWindow.style.display = 'block';
});

filterSelect.addEventListener('change', () => {
  const filterValue = filterSelect.value;
  const tasks = taskList.children;
  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const checkbox = task.querySelector('.checkbox');
    if (filterValue === 'completed' && !checkbox.checked) {
      task.style.visibility = 'hidden';
    } else if (filterValue === 'incompleted' && checkbox.checked) {
      task.style.visibility = 'hidden';
    } else {
      task.style.visibility = 'visible';
    }
  }
});
