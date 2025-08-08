import { useState } from 'react'
import './App.css'
import AddTask from './components/AddTask'
import Alert from './components/Alert'
import Container from './components/Container'
import Popup from './components/Popup'
import SearchTask from './components/SearchTask'
import TaskList from './components/TaskList'
import TodoHeader from './components/TodoHeader'

function App() {
  const items = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
  const [tasks, setTasks] = useState(items);
  const [search, setSearch] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [messagePopup, setMessagePopup] = useState({text: null, onConfirm: null, onCancel: null});
  let filteredTasks = search === "" ? tasks :tasks.filter(task =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Container>
        <TodoHeader />
        <AddTask tasks={tasks} setTasks={setTasks} alert={showAlert} setAlert={setShowAlert} />
        <SearchTask search={search} setSearch={setSearch} />
        <TaskList filteredTasks={filteredTasks} tasks={tasks} setTasks={setTasks} setMessagePopup={setMessagePopup} />
      </Container>
      {showAlert && <Alert />}
      {messagePopup.text && <Popup message={messagePopup} setMessagePopup={setMessagePopup} />}
    </>
  )
}

export default App
