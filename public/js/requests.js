const API_URL = '/tasks';

async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
                    <div class="task-info">
                        <h3>${task.title}</h3>
                        <p>${task.description || 'No description'}</p>
                    </div>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
                `;
    list.appendChild(li);
  });
}

async function createTask() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  if (!title) return alert('Title is required');

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });

  document.getElementById('title').value = '';
  document.getElementById('description').value = '';
  fetchTasks();
}

let taskIdToDelete = null;

function openModal(id) {
  taskIdToDelete = id;
  const modal = document.getElementById('confirmModal');
  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('confirmModal');
  modal.classList.remove('active');
  taskIdToDelete = null;
}

document
  .getElementById('confirmDeleteBtn')
  .addEventListener('click', async () => {
    if (taskIdToDelete) {
      await fetch(`${API_URL}/${taskIdToDelete}`, { method: 'DELETE' });
      closeModal();
      fetchTasks();
    }
  });

async function deleteTask(id) {
  openModal(id);
}

fetchTasks();
