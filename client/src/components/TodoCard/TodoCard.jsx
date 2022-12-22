import "./TodoCard.scss";
export const TodoCard = ({ data, handleEdit, handleDelete }) => {
  const { _id, title, description } = data;

  return (
    <div className="todoContainer">
      <div key={_id} className="todoContainer__title-description">
        <h4>{title}</h4>
        <h5>{description}</h5>
      </div>

      <div className="button-container">
        <button className="button" name={_id} onClick={handleEdit}>
          ✏️
        </button>
        <button className="button" name={_id} onClick={handleDelete}>
          🗑️
        </button>
      </div>
    </div>
  );
};
