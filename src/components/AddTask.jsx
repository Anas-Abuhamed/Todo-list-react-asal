import { useState } from "react"

const AddTask = ({ onAdd }) => {
    const [taskText, setTaskText] = useState("");
    const newTask = { id: Date.now(), text: taskText, done: false };
    function handleAdd(e) {
        e.preventDefault();
        setTaskText("");
        onAdd(newTask);
    }
    return <>
        <form className="add-task" onSubmit={handleAdd}>
            <input type="text" id="task-input" placeholder="Add a new task" value={taskText} onChange={(e) => setTaskText(e.target.value)} />
            <button id="add-btn">+</button>
        </form>
    </>
}
export default AddTask;