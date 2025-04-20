import Home from "../pages/home/home.tsx";
import {Route, Routes} from "react-router-dom";
import CreateTask from "../pages/createTask/createTask.tsx";
import EditTask from "../pages/editTask/editTask.tsx";
import styles from "./app.module.scss";


function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element=<Home/>/>
        <Route path="/create" element=<CreateTask/>/>
        <Route path="/:id" element=<EditTask/>/>
        <Route path="/*" element=<Home/>/>
      </Routes>
    </div>
  )
}

export default App