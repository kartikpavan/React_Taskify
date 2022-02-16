import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

function List({ items, removeTodo, toggleComplete }) {
  return (
    <div>
      {items.map((todo) => {
        return (
          <div
            className="flex justify-between mx-9 my-4 p-3 rounded-full shadow-md shadow-gray-700/50"
            key={todo.id}
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                class="form-checkbox h-4 w-4 text-purple-600"
                onClick={() => toggleComplete(todo.id)}
              />
              <h3
                className="text-lg"
                style={{
                  textDecoration: todo.completed ? "line-through" : null,
                }}
              >
                {todo.task}{" "}
              </h3>
            </div>
            <button onClick={() => removeTodo(todo.id)}>
              <AiFillDelete />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default List;
