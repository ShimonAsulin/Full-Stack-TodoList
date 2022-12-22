import "./App.scss";
import { ShowTodoList } from "./components/ShowTodoList/ShowTodoList";
import { CreateTodo } from "./components/CreateTodo/CreateTodo";

const App = () => {
  return (
    <div className="app__container">
      <div className="app__content">
        <ShowTodoList />
      </div>
    </div>
  );
};

export default App;
