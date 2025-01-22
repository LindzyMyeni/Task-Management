import React, { useState } from "react";

const TaskList = ({ tasks, editTask, deleteTask }) => {
    const [sorting, setSorting] = useState("none");

    const sortedTasks = [...tasks].sort((a, b) => {
        if (sorting === "high")return a.priority === "high" ? -1 : 1;
        if (sorting === "low") return a.priority === "low" ? -1 : 1;
        return 0; // Default order
      });

      return (
        <div>
          <div style={{ marginBottom: "10px" }}>
            <label>Sort by Priority: </label>
            <select
              onChange={(e) => setSorting(e.target.value)}
              style={{ padding: "5px", marginLeft: "5px" }}
            >
              <option value="none">None</option>
              <option value="high">High</option>
              <option value="low">Low</option>
            </select>
          </div>
          {sortedTasks.length > 0 ? (
            sortedTasks.map((task) => (
              <div className="task-card" key={task.id}>
                <h4>{task.title}</h4>
                <p>{task.description}</p>
                <p>
                  <strong>Priority:</strong>{" "}
                  <span className={`priority-${task.priority}`}>
                    {task.priority}
                  </span>
                </p>
                <p>
                  <strong>Due Date:</strong> {task.dueDate}
                </p>
                <button
                  onClick={() => editTask(task.id, { ...task, completed: !task.completed })}
                  style={{ marginRight: "10px" }}
                   >
                   {task.completed ? "Mark Incomplete" : "Mark Complete"}
                </button>

                <button onClick={() => deleteTask(task.id)} style={{ marginLeft: "10px" }}>
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No tasks available. Add a task to get started!</p>
          )}
        </div>
      );
    };

export default TaskList;
