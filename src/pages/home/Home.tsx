import {
  useGetTasksQuery,
} from "../../shared/api/tasksApi.ts";
import './styles.scss'
import { FixedSizeList as List } from 'react-window';
import {useNavigate} from "react-router-dom";

function Home() {

  const navigate = useNavigate();
  const {data = [], isLoading: isFullLoading} = useGetTasksQuery('');

  const handleShowTask = async (id: string | undefined) => {
    if (id) {
      try {
        navigate(`/${id}`);
      } catch (err) {
        console.error('Navigation error:', err);
      }
    } else {
      console.error('Invalid task ID');
    }
  };

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
          className={"taskList"}
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
                  className={`taskCard ${data[index].newStatus ? "new" : ""} ${data[index].highPriority ? "highPriority" : ""}`}>
                <div className="infoTask">
                  <p className="text"><span className={'bold'}>{index + 1}. {data[index].title} </span>
                  {data[index].description}</p>
                </div>
                <div className="buttonBox">
                  <button onClick={() => {
                    handleShowTask(data[index].id)
                  }}>Посмотреть
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