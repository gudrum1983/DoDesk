import {useState} from "react";
import {useAddTaskMutation} from "../../shared/api/tasksApi.ts";
import { useNavigate } from 'react-router-dom';



export default function CreateTask() {

  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  const [addTask, {}] = useAddTaskMutation();
  const navigate = useNavigate();

  // Функция для обработки изменения состояния чекбокса
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);}

  const handleAddTask = async () => {
    if (newTaskTitle && newTaskDescription) {
      try {
        await addTask({title: newTaskTitle, description: newTaskDescription, newStatus: true, highPriority: isChecked}).unwrap();
        setNewTaskTitle('');
        setNewTaskDescription('');
        setIsChecked(false);
        navigate('/');
      } catch (err) {
      }
      console.error('error');
    }
  }

  return (

    <div className="createTaskContainer">

      <a href={`/`}>Вернуться</a>
      <div>
        <input type="checkbox" id="priorityToggle" name="highPriority" checked={isChecked}
               onChange={handleCheckboxChange}/>
        <label htmlFor="priorityToggle">Важная задача</label>
      </div>

      <input className="titleInput"
             placeholder="Введите заголовок"
             name="Title"
             type="text"
             onChange={(e) => setNewTaskTitle(e.target.value)} value={newTaskTitle}
      />
      <textarea className="descriptionInput"
                placeholder="Введите описание задачи"
                name="Description"
                rows={4}
                cols={50}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                value={newTaskDescription}
      />
      <button onClick={handleAddTask}>Создать задачу
      </button>
    </div>
  )

}
