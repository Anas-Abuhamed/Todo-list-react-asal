// why vite 
import { useState } from 'react'
import './styles/App.css'
import AddTask from './components/AddTask'
import Container from './components/Container'
import Popup from './components/Popup'
import SearchTask from './components/SearchTask'
import TaskList from './components/TaskList'
import TodoHeader from './components/TodoHeader'
import TaskItem from './components/TaskItem'

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

  return (
    <>
      <Container>
        <TodoHeader>ToDo List</TodoHeader>
        <AddTask onAdd={handleAdd} />
        <SearchTask search={search} setSearch={setSearch} />
        <TaskList>
          {filteredTasks.map(task => {
                return <TaskItem key={task.id} task={task} tasks={tasks} setTasks={updatedTasks} setMessagePopup={setMessagePopup} />
            })}
        </TaskList>
      </Container>
      {messagePopup.text || showAlert  || isLoading ? 
      <Popup message={messagePopup} setMessagePopup={setMessagePopup} showAlert={showAlert} loading={isLoading} /> 
      : null}
    </>
  )
}
export default App
