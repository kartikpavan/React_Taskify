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

  //! Todays date
  let options = { weekday: "short", month: "short", day: "numeric" };

  return (
    <div className=" w-2/6 mt-20 p-4 mx-auto text-center text-gray-200 rounded-xl shadow bg-gradient-to-br from-purple-600 to-blue-500 ">
      <header>
        <h1 className="text-3xl font-bold mt-1 mb-6 ">
          Todo App ({new Date().toLocaleDateString("en-us", options)})
        </h1>
        <form onSubmit={submitHandler} className="flex justify-center ">
          <input
            className="w-80 h-10 px-2 rounded-lg mx-2 text-gray-700 font-semibold text-xl"
            type="text"
            name="task"
            value={todo.task}
            onChange={(e) => setTodo({ ...todo, task: e.target.value })}
          />
          <button
            type="submit"
            className=" w-20 text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700"
          >
            ADD
          </button>
        </form>
      </header>
      {list.length > 0 ? (
        <div>
          <List
            items={list}
            removeTodo={removeTodo}
            toggleComplete={toggleComplete}
          ></List>
          <button
            // className="bg-red-800 w-full rounded-lg py-1 text-lg mt-4 "
            class="py-2.5 px-5 mr-2 w-full mt-4 mb-0 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => setList([])}
          >
            Clear ALL
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
