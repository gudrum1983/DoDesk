import Home from "../pages/home/home.tsx";
import {Route, Routes} from "react-router-dom";
import CreateTask from "../pages/createTask/createTask.tsx";
import EditTask from "../pages/editTask/editTask.tsx";
import styles from "./app.module.scss";

const baseUrl = import.meta.env.BASE_URL || '/';


console.log("baseUrl", baseUrl);


function App() {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path={baseUrl} element=<Home/>/>
        <Route path={`${baseUrl}create`} element=<CreateTask/>/>
        <Route path={`${baseUrl}:id`} element=<EditTask/>/>
        <Route path={`${baseUrl}*`} element=<Home/>/>
      </Routes>
    </div>
  )
}

export default App