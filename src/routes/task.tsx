import {useState} from "react";
import {useAddTaskMutation} from "../shared/api/tasksApi.ts";


export default function Task() {

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [addTask, {}] = useAddTaskMutation();


  const handleAddTask = async () => {
    if (newTaskTitle && newTaskDescription) {
      try {
        await addTask({title: newTaskTitle, description: newTaskDescription, new: true, highPriority: false}).unwrap();
        setNewTaskTitle('');
        setNewTaskDescription('');
      } catch (err) {
      }
      console.error('error');
    }
  }

  return (

    <div className="createTaskContainer">

      <a href={`/`}>Вернуться</a>


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
