import {useState} from 'react'
import {useGetTasksQuery, useAddTaskMutation, useDeleteTaskMutation} from "../shared/api/tasksApi.ts";
import {Task} from "../entities/Task.ts";
import './styles.scss'

function App() {
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const {data = [], isLoading} = useGetTasksQuery('');
  const [addTask, {}] = useAddTaskMutation();
  const [deleteTask, {}] = useDeleteTaskMutation();

  const handleAddTask = async () => {
    if (newTaskTitle && newTaskDescription) {
      try {
        await addTask({title: newTaskTitle, description: newTaskDescription}).unwrap();
        setNewTaskTitle('');
        setNewTaskDescription('');
      } catch (err) {
      }
      console.error('error');
    }
  }

  const handleDeleteTask = async (id: string) => {
    if (id) {
      try {
        await deleteTask(id).unwrap();
      } catch (err) {
      }
      console.error('error');
    }
  }

  if (isLoading) return <h1>Загрузка....</h1>

  if (data.length < 1) return <h1>Пустой список</h1>

  return (
    <div className="appContainer">
      <div className="header">
        <div><h1>DoDesk</h1></div>

        <div className="createTaskContainer">
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
      </div>

      <ol className='taskList'>
        {data.map((task: Task, index: number) => (
          <li key={task.id} className='taskCard'>
            <div className="infoTask">
              <h3 className="text">{index + 1}. {task.title}</h3>
              <p className="text">{task.description}</p>
            </div>
            <button onClick={() => {
              handleDeleteTask(task.id)
            }}>delete
            </button>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default App
