import "./App.css";
import { ShowTodoList } from "./components/ShowTodoList/ShowTodoList";


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
