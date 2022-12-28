import axios from "axios";
import { useState, useEffect } from "react";
import { UpdateTodo } from "../UpdateTodo/UpdateTodo";
import { TodoCard } from "../TodoCard/TodoCard";
import "./ShowTodoList.css";
import { CreateTodo } from "../CreateTodo/CreateTodo";

export function ShowTodoList() {
  const [todo, setTodo] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [update, setUpdate] = useState(false);

  const handleGetTodo = async () => {
    const res = await axios.get("https://fullstack-todolisd.onrender.com/api/todo");
    try {
      console.log(res.data);
      setTodo(res.data);
    } catch {
      console.log("error");
    }
  };

  useEffect(() => {
    handleGetTodo();
  }, [update]);

  function handleEdit(e) {
    setId(e.target.name);
    setOpen(true);
  }

  function handleUpdate() {
    // console.log("update:", update, !update);
    setUpdate(!update);
  }

  function handleDelete(e) {
    axios.delete(`https://fullstack-todolisd.onrender.com/api/todo/${e.target.name}`);

    setTodo((data) => {
      return data.filter((todo) => todo._id !== e.target.name);
    });
  }

  function handleClose() {
    setId("");
    setOpen(false);
  }

  const date = new Date();
  const [month, day, dayName, year] = [
    date.toLocaleDateString("en", { month: "short" }),
    date.getDate(),
    date.toLocaleDateString("en", { weekday: "long" }),
    date.getFullYear(),
  ];

  return (
    <section className="container">
      <section className="contents">
        <h1 className="contents__title">FullStack Todo</h1>
        <div className="contents__dates">
          <div className="contents__date">
            <div className="contents__date-section-1">
              <p className="contents__date-day">{day}</p>
            </div>
            <div className="contents__date-section-2">
              <p className="contents__date-month">{month}</p>
              <p className="contents__date-year">{year}</p>
            </div>
          </div>
          <div className="contents__date-dayName">{dayName}</div>
        </div>
        <ul className="contents__list">
          {todo.map((data) => (
            <TodoCard
              key={data._id}
              data={data}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      </section>
      {open ? (
        <section className="update-container">
          <div className="update-contents">
            <UpdateTodo
              _id={id}
              handleClose={handleClose}
              handleUpdate={handleUpdate}
            />
          </div>
        </section>
      ) : (
        ""
      )}
      <div className="center">
        <CreateTodo handleGetTodo={handleGetTodo} />
      </div>
    </section>
  );
}
