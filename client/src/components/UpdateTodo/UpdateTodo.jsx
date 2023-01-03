import { useState } from "react";
import axios from "axios";
import "./UpdateTodo.scss";

export function UpdateTodo({ _id, handleClose, handleUpdate, todo }) {
  const [data, setData] = useState({ title: "", description: "" });
  const [value, setValue] = useState(todo);

  setValue(value.filter((value) => value._id === _id));

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .put(`https://fullstack-todolisd.onrender.com/api/todo/${_id}`, data)
      .then((res) => {
        setData({ title: "", description: "" });
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Failed to update todo");
        console.log(err.message);
      });
  }

  return (
    <section className="popup__update">
      <form
        className="popup__update-form"
        onSubmit={(e) => {
          handleSubmit(e);
          handleUpdate();
          handleClose();
        }}
      >
        <div className="popup__update-form-inputs">
          <label htmlFor="title" className="label">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="popup__update-form-input"
            // value={todo[0].title}
            onChange={handleChange}
            required
          />
          <label htmlFor="description" className="label">
            Description
          </label>
          <input
            type="text"
            name="description"
            className="popup__update-form-input"
            onChange={handleChange}
            // required
          />
          <button type="submit" className="popup__update-form-submit button">
            Submit
          </button>
        </div>
      </form>
      <div className="center">
        <button className="popup__update-icon" onClick={handleClose}>
          x
        </button>
      </div>
    </section>
  );
}
