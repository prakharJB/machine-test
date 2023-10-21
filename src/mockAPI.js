const TASKS_STORAGE_KEY = "tasks";

function initializeTasks() {
  const storedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
  if (storedTasks) {
    return JSON.parse(storedTasks);
  } else {
    return [];
  }
}

let tasks = initializeTasks();

export function getTasks() {
  return tasks;
}

export function addTask(title) {
  const newTask = { id: tasks.length + 1, title, completed: false };
  tasks = [...tasks, newTask];
  saveTasksToLocalStorage(tasks);
  return newTask;
}

export function updateTask(id, title, completed) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, title, completed } : task
  );
  saveTasksToLocalStorage(tasks);
}

export function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasksToLocalStorage(tasks);
}

function saveTasksToLocalStorage(updatedTasks) {
  localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(updatedTasks));
}
