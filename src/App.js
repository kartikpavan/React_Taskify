import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import Navbar from "./components/Navbar";
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
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [list, setList] = useState(getLocalStorage());
  const [todo, setTodo] = useState({
    id: "",
    task: "",
    completed: false,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (!todo.task) {
      showAlert(true, "danger", "ERROR!! Please enter Value");
      console.log("NO you cant do");
    } else {
      const newItem = { ...todo, id: new Date().getTime().toString() };
      setList([...list, newItem]);
      setTodo({ ...todo, task: "" });
      showAlert(true, "success", "SUCCESS! Task added to the List ");
    }
  };

  //! alert function
  const showAlert = (show = false, type = "", message = "") => {
    setAlert({ show, type, message });
  };

  //! remove Single todo item
  const removeTodo = (id) => {
    setList(list.filter((item) => item.id !== id));
    showAlert(true, "success", "SUCCESS! Task Removed from the List ");
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
    showAlert(true, "success", "TASK COMPLETED!!");
  };

  //! local storage
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  //! Todays date
  let options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  return (
    <div>
      <Navbar />
      <div className=" w-2/6 mt-20 p-4 mx-auto text-center text-gray-200 rounded-xl shadow bg-gradient-to-br from-purple-600 to-blue-500 ">
        <article>
          {alert.show ? (
            <Alert {...alert} showAlert={showAlert} list={list} />
          ) : null}
        </article>
        <header>
          <h1 className="text-3xl font-bold mt-1 mb-6 ">
            ({new Date().toLocaleDateString("en-us", options)})
          </h1>
          <form onSubmit={submitHandler} className="flex justify-center ">
            <input
              className="w-80 h-12 px-2 rounded-lg mx-2 bg-white text-black font-semibold text-xl"
              type="text"
              name="task"
              value={todo.task}
              onChange={(e) => setTodo({ ...todo, task: e.target.value })}
            />
            <button type="submit" className=" btn btn-secondary-content">
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
              className="btn btn-primary btn-md"
              onClick={() => {
                setList([]);
                showAlert(true, "danger", "ALL ITEMS REMOVED");
              }}
            >
              Clear ALL
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
