import { useState } from "react"

export default function AddTask({ tasks, setTasks, setAlert }) {
    const [taskText, setTaskText] = useState("");
    function handleAdd(e) {
        e.preventDefault();
        if (taskText.trim()) {
            localStorage.setItem("tasks", JSON.stringify([...tasks, { id: Date.now(), text: taskText, done: false }]));
            setTasks([...tasks, { id: Date.now(), text: taskText, done: false }]);
            setTaskText("");
        }
        else {
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 2000);
        }
    }
    return <>
        <form className="add-task" onSubmit={(e) => handleAdd(e)}>
            <input type="text" id="task-input" placeholder="Add a new task" value={taskText} onChange={(e) => setTaskText(e.target.value)} />
            <button id="add-btn">+</button>
        </form>
    </>
}
