import React, { useState } from "react";

const TaskForm = ({ addTask }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim() || !task.description.trim() || !task.dueDate) {
      setError("All fields are required!");
      return;
    }
    addTask(task);
    setTask({ title: "", description: "", priority: "medium", dueDate: "" });
    setError(""); // Clear error after successful submission
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {error && <p style={{ color: "red" }}>{error}</p>}
      <label>
        Title:
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={task.title}
          onChange={handleChange}
          style={{ padding: "5px", width: "100%" }}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          placeholder="Task Description"
          value={task.description}
          onChange={handleChange}
          style={{ padding: "5px", width: "100%" }}
          rows={3}
          required
        />
      </label>
      <label>
        Priority:
        <select
          name="priority"
          value={task.priority}
          onChange={handleChange}
          style={{ padding: "5px", width: "100%" }}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </label>
      <label>
        Due Date:
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
          style={{ padding: "5px", width: "100%" }}
          required
        />
      </label>
      <button
        type="submit"
        style={{
          padding: "10px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "3px",
          cursor: "pointer",
        }}
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
