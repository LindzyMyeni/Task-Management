import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Add a new task
  const addTask = (task) => {
    setTasks([...tasks, { id: Date.now(), ...task }]);
  };

  // Edit a task
  const editTask = (id, updatedTask) => {
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Admin Dashboard</h1>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
    </div>
  );
};

export default App;
