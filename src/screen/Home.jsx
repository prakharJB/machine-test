import React, { useState, useEffect } from "react";
// import "./App.css";
import { getTasks, addTask, updateTask, deleteTask } from "../mockAPI";
import Header from "../component/Header/Header";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [userName , setUserName] = useState("")

  useEffect(() => {
    // Load tasks from local storage on initial render
    setTasks(getTasks());
    userNameGet()
  }, []);



  const userNameGet = () => {
    const username = localStorage.getItem('username');
    setUserName(username);
  };

  const handleAddTask = () => {
    if (newTask.trim() === "") return;

    const addedTask = addTask(newTask);
    setTasks([...tasks, addedTask]);
    setNewTask("");
  };

  const handleEditTask = (id, newTitle) => {
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      updatedTasks[taskIndex].title = newTitle;
      updateTask(id, newTitle, updatedTasks[taskIndex].completed);
      setTasks(updatedTasks);
    }
  };

  const handleToggleCompletion = (id) => {
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex((task) => task.id === id);
    if (taskIndex !== -1) {
      updatedTasks[taskIndex].completed = !updatedTasks[taskIndex].completed;
      updateTask(
        id,
        updatedTasks[taskIndex].title,
        updatedTasks[taskIndex].completed
      );
      setTasks(updatedTasks);
    }
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    deleteTask(id);
    setTasks(updatedTasks);
  };

  return (
    <>
      <Header />
      <div className="App">
        <h1>To Do List</h1>
        <h1>{userName}</h1>
        <div className="task-form">
          <input
            type="text"
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleCompletion(task.id)}
              />
              {task.title}
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
              <button
                onClick={() => {
                  const newTitle = prompt("Edit task:", task.title);
                  if (newTitle !== null) {
                    handleEditTask(task.id, newTitle);
                  }
                }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Home;
