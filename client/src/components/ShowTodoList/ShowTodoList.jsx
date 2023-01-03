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
    const res = await axios.get(
      "https://fullstack-todolisd.onrender.com/api/todo"
    );
    try {
      // console.log(res.data);
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
    setUpdate(!update);
  }

  function handleDelete(e) {
    axios.delete(
      `https://fullstack-todolisd.onrender.com/api/todo/${e.target.name}`
    );

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
      <section className="content">
        <h1 className="content__title">FullStack Todo</h1>
        <div className="content__dates">
          <div className="content__date">
            <div className="content__date-section-1">
              <p className="content__date-day">{day}</p>
            </div>
            <div className="content__date-section-2">
              <p className="content__date-month">{month}</p>
              <p className="content__date-year">{year}</p>
            </div>
          </div>
          <div className="content__date-dayName">{dayName}</div>
        </div>
        <ul className="content__list">
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
              todo={todo}
              handleClose={handleClose}
              handleUpdate={handleUpdate}
            />
          </div>
        </section>
      ) : (
        ""
      )}
      <div className="content__submit">
        <CreateTodo handleGetTodo={handleGetTodo} />
      </div>
    </section>
  );
}
