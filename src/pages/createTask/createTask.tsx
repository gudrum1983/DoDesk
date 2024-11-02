import {useState} from "react";
import {useAddTaskMutation} from "../../shared/api/tasksApi.ts";
import {useNavigate} from 'react-router-dom';
import Page from "../../shared/ui/page/page.tsx";
import Header from "../../shared/ui/header/header.tsx";
import style from './createTask.module.scss'

export default function CreateTask() {

  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [addTask, {}] = useAddTaskMutation();
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  }

  const handleAddTask = async () => {
    if (newTaskTitle && newTaskDescription) {
      await addTask({
        title: newTaskTitle,
        description: newTaskDescription,
        newStatus: true,
        highPriority: isChecked
      }).unwrap();
      setNewTaskTitle('');
      setNewTaskDescription('');
      setIsChecked(false);
      navigate('/');
    }
  };


  return (
    <Page>
      <Header textButton="На гравную" url=""/>
      <div className={style.createTaskContainer}>
        <input className={style.titleInput}
               placeholder="Введите заголовок"
               name="Title"
               type="text"
               onChange={(e) => setNewTaskTitle(e.target.value)} value={newTaskTitle}
        />
        <textarea className={style.descriptionInput}
                  placeholder="Введите описание задачи"
                  name="Description"
                  rows={4}
                  cols={50}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  value={newTaskDescription}
        />
        <div className={style.buttonBox}>
          <div className={style.priorityToggle}>
            <input type="checkbox" id="priorityToggle" name="highPriority" checked={isChecked}
                   onChange={handleCheckboxChange}/>
            <label className={style.label} htmlFor="priorityToggle">Важная задача</label>
          </div>
          <button className={style.button} onClick={handleAddTask}>Создать задачу</button>
        </div>
      </div>
    </Page>
  )

}
