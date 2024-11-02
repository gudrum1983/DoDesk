import Home from "../pages/home/Home.tsx";
import {Route, Routes} from "react-router-dom";
import CreateTask from "../pages/createTask/createTask.tsx";
import EditTask from "../pages/editTask/editTask.tsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element=<Home/>/>
        <Route path="/create" element=<CreateTask/>/>
        <Route path="/:id" element=<EditTask/>/>
      </Routes>
    </div>
  )
}

export default App
