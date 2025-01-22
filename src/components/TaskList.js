import React, { useState } from "react";

const TaskList = ({ tasks, editTask, deleteTask }) => {
  const [sorting, setSorting] = useState("none");
  const [expandedTaskId, setExpandedTaskId] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sorting === "high") return a.priority === "high" ? -1 : 1;
    if (sorting === "low") return a.priority === "low" ? -1 : 1;
    if (sorting === "medium") return a.priority === "medium" ? -1 : 1;
    return 0; // Default order
  });

  const toggleExpand = (id) => {
    setExpandedTaskId(expandedTaskId === id ? null : id);
  };

  const handleEdit = (task) => {
    setEditTaskId(task.id);
    setEditedTask({ ...task });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    editTask(editTaskId, editedTask);
    setEditTaskId(null); // Close the edit form after saving
  };

  return (
    <div className="task-list">
      <div className="sorting-controls">
        <label htmlFor="sort">Sort by Priority: </label>
        <select
          id="sort"
          value={sorting}
          onChange={(e) => setSorting(e.target.value)}
        >
          <option value="none">None</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      {sortedTasks.length > 0 ? (
        sortedTasks.map((task) => (
          <div key={task.id} className={`task-card priority-${task.priority}`}>
            <div className="task-card-header">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  editTask(task.id, { ...task, completed: !task.completed })
                }
              />
              <h4>{task.title}</h4>
              <button onClick={() => toggleExpand(task.id)}>
                {expandedTaskId === task.id ? "Hide Task" : "View Task"}
              </button>
              <button onClick={() => handleEdit(task)}>Edit</button>
            </div>
            {expandedTaskId === task.id && (
              <div className="task-card-content">
                <p>{task.description}</p>
                <p>
                  <strong>Priority:</strong> {task.priority}
                </p>
                <p>
                  <strong>Due Date:</strong> {task.dueDate}
                </p>
                <button
                  onClick={() =>
                    editTask(task.id, { ...task, completed: !task.completed })
                  }
                >
                  {task.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            )}
            {editTaskId === task.id && (
              <div className="task-card-edit-form">
                <h4>Edit Task</h4>
                <form>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editedTask.title}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={editedTask.description}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={editedTask.priority}
                    onChange={handleChange}
                    required
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                  <label htmlFor="dueDate">Due Date</label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={editedTask.dueDate}
                    min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
                    onChange={handleChange}
                    required
                  />
                  <button type="button" onClick={handleSave}>
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => setEditTaskId(null)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No tasks available. Add a task to get started!</p>
      )}
    </div>
  );
};

export default TaskList;
