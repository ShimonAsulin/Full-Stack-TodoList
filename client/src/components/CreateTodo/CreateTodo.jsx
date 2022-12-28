import { useState } from "react";
import "./CreateTodo.css";
import axios from "axios";

export function CreateTodo(props) {
  const [data, setData] = useState({ title: "", description: "" });
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    togglePopup();

    const post = await axios.post("http://localhost:8000/api/todo", data);

    try {
      setData({ title: "", description: "" });
      console.log(post.data.message);
    } catch (err) {
      console.log("Error couldn't create TODO");
      console.log(err.message);
    }

    props.handleGetTodo();
  };

  return (
    <section className="create__todo">
      <div className="create__todo-btn-div">
        <button className="create__todo__add-btn" onClick={togglePopup}>
          +
        </button>
      </div>

      {isOpen && (
        <section className="popup">
          <form onSubmit={handleSubmit} className="popup__form">
            <div className="popup__form-inputs">
              <label className="label" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={data.title}
                onChange={handleChange}
                className="popup__form-input"
                required
              />
              <label className="label" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                name="description"
                value={data.description}
                onChange={handleChange}
                className="popup__form-input"
                required
              />
              <button type="submit" className="popup__form-submit button">
                Create Todo
              </button>
            </div>
          </form>
          <div className="center">
            <button className="popup__close-icon" onClick={togglePopup}>
              x
            </button>
          </div>
        </section>
      )}
    </section>
  );
}
