// why vite 
import { useState } from 'react'
import './styles/App.css'
import AddTask from './components/tasks/AddTask'
import Container from './components/layout/Container'
import Popup from './components/popup/Popup'
import SearchTask from './components/tasks/SearchTask'
import TaskList from './components/tasks/TaskList'
import TodoHeader from './components/global/TodoHeader'
import TaskItem from './components/tasks/TaskItem'

const App = () => {
  const items = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
  const [tasks, setTasks] = useState(items);
  const [search, setSearch] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [messagePopup, setMessagePopup] = useState({ text: null, onConfirm: null, onCancel: null });
  const [isLoading, setIsLoading] = useState(false);
  let filteredTasks = search === "" ? tasks : tasks.filter(task =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (task) => {
        if (task.text.trim()) {
            updatedTasks([...tasks, task]);
        }
        else { // add loader, put it in middle
            setIsLoading(true)
            setTimeout(() => {
                setIsLoading(false)
                setShowAlert(true)
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000)
            }, 1000);
        }
    }

    const updatedTasks = (tasks) => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setTasks(tasks);
    }

    const popupProps ={
      message: messagePopup,
      setMessagePopup,
      showAlert,
      loading: isLoading
    }
    const taskItemProps = {
      tasks,
      setTasks: updatedTasks,
      setMessagePopup
    }
    const searchTaskProps = {
      search,
      setSearch
    }

  return (
    <>
      <Container>
        <TodoHeader>ToDo List</TodoHeader>
        <AddTask onAdd={handleAdd} />
        <SearchTask {...searchTaskProps} />
        <TaskList>
          {filteredTasks.map(task => {
                return <TaskItem key={task.id} task={task} {...taskItemProps} />
            })}
        </TaskList>
      </Container>
      {messagePopup.text || showAlert  || isLoading ? 
      <Popup {...popupProps} /> 
      : null}
    </>
  )
}
export default App
