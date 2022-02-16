import React, { useState, useEffect } from "react";
import List from "./List";

//! Displaying list items on Page RELOAD if there are any (Local Storage)
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [list, setList] = useState(getLocalStorage());
  const [todo, setTodo] = useState({
    id: "",
    task: "",
    completed: false,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (!todo.task) {
      alert("ERROR!! Please fill the empty field");
    } else {
      const newItem = { ...todo, id: new Date().getTime().toString() };
      setList([...list, newItem]);
      setTodo({ ...todo, task: "" });
    }
  };

  //! remove Single todo item
  const removeTodo = (id) => {
    setList(list.filter((item) => item.id !== id));
  };
  //!toggle Complete todo
  const toggleComplete = (id) => {
    setList(
      list.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  };

  //! local storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div>
      <header>
        <h1>Todo App</h1>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="task"
            value={todo.task}
            onChange={(e) => setTodo({ ...todo, task: e.target.value })}
          />
          <button type="submit"> Add</button>
        </form>
      </header>
      {list.length > 0 ? (
        <div>
          <List
            items={list}
            removeTodo={removeTodo}
            toggleComplete={toggleComplete}
          ></List>
          <button onClick={() => setList([])}>Clear all</button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
