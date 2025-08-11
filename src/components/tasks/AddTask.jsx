import { useState } from "react"
import Input from "../global/Input";

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
            <Input type="text" id="task-input" placeholder="Add a new task" value={taskText} setValue={setTaskText} />
            <button id="add-btn">+</button>
        </form>
    </>
}
export default AddTask;