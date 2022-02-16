import React, { useState } from "react";

function List({ items, removeTodo, toggleComplete }) {
  return (
    <div>
      {items.map((todo) => {
        return (
          <div style={{ display: "flex", alignItems: "center" }} key={todo.id}>
            <input type="checkbox" onClick={() => toggleComplete(todo.id)} />
            <h3
              style={{ textDecoration: todo.completed ? "line-through" : null }}
            >
              {todo.task}{" "}
            </h3>
            <button onClick={() => removeTodo(todo.id)}>delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default List;
