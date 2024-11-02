import {useEffect, useState} from "react";
import {useDeleteTaskMutation, useGetTaskQuery, useUpdateTaskMutation} from "../../shared/api/tasksApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import Page from "../../shared/ui/page/page.tsx";
import Header from "../../shared/ui/header/header.tsx";
import style from './editTask.module.scss'


export default function EditTask() {
  const params = useParams();
  const navigate = useNavigate();
  const idCurrentItem = params.id;
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [updateTask] = useUpdateTaskMutation();
  const [initialTask, setInitialTask] = useState({title: '', description: '',  highPriority: false});

  useEffect(() => {
    if (!idCurrentItem) {
      navigate(`/`);
    }
  }, [idCurrentItem, navigate]);

  const {data: task} = useGetTaskQuery(idCurrentItem!, {
    refetchOnMountOrArgChange: true,
  });


  useEffect(() => {
    if (task) {
      const {highPriority, description, id, title, newStatus} = task

      setIsChecked(highPriority);
      setNewTaskTitle(title);
      setNewTaskDescription(description);
      setInitialTask({title, description, highPriority});

      if (newStatus) {
        try {
          updateTask({id, highPriority, description, title, newStatus: false}).unwrap()
        } catch (err) {
          console.error("Failed to update task:", err);
        }
      }
    }
  }, [task]);

  const [deleteTask] = useDeleteTaskMutation();
  const [updTask] = useUpdateTaskMutation();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const isModified = () => {
    return (
      newTaskTitle !== initialTask?.title ||
      newTaskDescription !== initialTask?.description ||
      isChecked !== initialTask?.highPriority
    );
  };

  const handleDeleteTask = async (id: string) => {
    if (id) {
      try {
        await deleteTask(id).unwrap();
        navigate('/');
      } catch (err) {
        console.error('error');
      }
    }
  };

  const handleUpdTask = async () => {
    if (newTaskTitle && newTaskDescription && task) {
      try {
        await updTask({
          id: task.id,
          title: newTaskTitle,
          description: newTaskDescription,
          newStatus: false,
          highPriority: isChecked
        }).unwrap();
        setNewTaskTitle('');
        setNewTaskDescription('');
        setIsChecked(false);
        navigate('/');
      } catch (err) {
        console.error('error');
      }
    }
  };

  return (
    <Page>
      <Header textButton="На гравную" url=""/>


      {task && (
        <div className={style.createTaskContainer}>
          <input
            className="titleInput"
            placeholder="Введите заголовок"
            name="Title"
            type="text"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <textarea
            className="descriptionInput"
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
            <div className={style.buttonPlace}>

              <button className={style.button} onClick={handleUpdTask} disabled={!isModified()}>Изменить задачу</button>
              <button className={style.button} onClick={() => handleDeleteTask(task.id)}>Удалить</button>
            </div>
          </div>
        </div>


      )}
    </Page>
  );
}
