import {
  useGetTasksQuery,
  useDeleteTaskMutation,
} from "../../shared/api/tasksApi.ts";
import './styles.scss'
import { FixedSizeList as List } from 'react-window';

function Home() {


  const {data = [], isLoading: isFullLoading} = useGetTasksQuery('');

  const [deleteTask, {}] = useDeleteTaskMutation();



  const handleShowTask = async (id: string) => {
    if (id) {
      try {
        //await deleteTask(id).unwrap();
        window.alert("тук-тук")
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

  return (
    <div className="appContainer">
      <div className="header">
        <div><h1>DoDesk</h1></div>
        <a href={`/create`}>Создать задачу</a>

      </div>

      {isFullLoading && <h1>Загрузка....</h1>}

      {data.length < 1 && <h1>Пустой список</h1>}

      <div className="box">

        <List
          height={700}
          innerElementType="ol"
          itemData={data}
          itemCount={data.length}
          itemSize={65}
          width={'100%'}
        >
          {({index, style }) => {
            return (
              <li key={data[index].id} style={style}
                  className={`taskCard ${data[index].new ? "new" : ""} ${data[index].highPriority ? "highPriority" : ""}`}>
                <div className="infoTask">
                  <h3 className="text">{index + 1}. {data[index].title}</h3>
                  <p className="text">{data[index].description}</p>
                </div>
                <div className="buttonBox">
                  <button onClick={() => {
                    handleShowTask(data[index].id)
                  }}>Посмотреть
                  </button>
                  <button onClick={() => {
                    handleDeleteTask(data[index].id)
                  }}>delete
                  </button>
                </div>
              </li>
            );
          }}
        </List>
      </div>
    </div>

  )
}

export default Home