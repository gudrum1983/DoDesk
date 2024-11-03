import {
  useGetTasksQuery,
} from "../../shared/api/tasksApi.ts";
import styles from './home.module.scss'
import {FixedSizeList as List} from 'react-window';
import {useNavigate} from "react-router-dom";
import Page from "../../shared/ui/page/page.tsx";
import Header from "../../shared/ui/header/header.tsx";

const server: string = import.meta.env.VITE_SERVER || 'web';
const textLoader: string = (server === 'web') ? 'JSON Server на \'https://render-json-db-toso.onrender.com/\' работает не быстро... 🕙 ожидайте... ' : '🕙 Загрузка....'

console.log(textLoader)
console.log(server)

function Home() {

  const navigate = useNavigate();
  const {data = [], isLoading: isFullLoading} = useGetTasksQuery('');

  const handleShowTask = (id: string | undefined) => {
    if (id) navigate(`/${id}`);
  };

  return (
    <Page>
      <Header textButton="Создать задачу" url="create"/>
      <div className={styles.box}>
        {isFullLoading
          ? <h1>{textLoader}</h1>
          : <List
            className={styles.taskList}
            height={700}
            innerElementType="ol"
            itemData={data}
            itemCount={data.length}
            itemSize={65}
            width={'100%'}

          >
            {({index, style}) => {
              return (
                <li key={data[index].id} style={style}
                    className={`${styles.taskCard} ${data[index].newStatus ? styles.new : ""} ${data[index].highPriority ? styles.highPriority : ""}`}
                >
                  <div className={styles.infoTask}>
                    <p className={styles.text}><span className={styles.bold}>{index + 1}. {data[index].title} </span>
                      {data[index].description}</p>
                  </div>
                  <button onClick={() => handleShowTask(data[index].id)}>Посмотреть</button>

                </li>
              );
            }}
          </List>}
      </div>
    </Page>

  )
}

export default Home