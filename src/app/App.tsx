import Home from "../pages/home/Home.tsx";
import {Route, Routes} from "react-router-dom";
import Task from "../routes/task.tsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element=<Home/>/>
        <Route path="/create" element=<Task/>/>
      </Routes>
    </div>
  )
}

export default App
