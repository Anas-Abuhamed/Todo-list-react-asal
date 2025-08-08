import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function TaskItem({ task, tasks, setTasks, setMessagePopup }) {
    const [done, setDone] = useState(task.done);
    const [edit, setEdit] = useState(false);
    const [textInput, setTextInput] = useState(task.text)
    function handleDone() {
        setDone(!done);
        let editedTasks = [...tasks];
        editedTasks.forEach(targetTask => {
            if (targetTask.id === task.id)
                targetTask.done = !done;
        });
        setTasks([...editedTasks]);
        localStorage.setItem("tasks", JSON.stringify(editedTasks));
    }
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            handleEdit(e);
            setEdit(false);
        }
        else if (e.key === "Escape") {
            setTextInput(task.text)
            setEdit(false);
        }
    }
    function handleDelete(id) {
            setMessagePopup({
            text: "Are you sure you want to delete this task?",
            onConfirm: () => {
                let newTasks = tasks.filter(task => task.id !== id);
                localStorage.setItem("tasks", JSON.stringify(newTasks));
                setTasks(newTasks);
            },
            onCancel: () => setEdit(false)
        });
    }
    function handleEdit(e) {
        setMessagePopup({
            text: "Are you sure you want to edit this task?",
            onConfirm: () => {
                let editedTasks = [...tasks];
                editedTasks.forEach(targetTask => {
                    if (targetTask.id === task.id)
                        targetTask.text = e.target.value;
                });
                setTasks([...editedTasks]);
                setEdit(false);
                localStorage.setItem("tasks", JSON.stringify(editedTasks));
            },
            onCancel: () => {setTextInput(task.text); setEdit(false);}
        });
    }
    return <li className={done ? "done" : null}>

            {edit ? <input className="edit-input" type="text" value={textInput} onChange={(e) => setTextInput(e.target.value)} onKeyDown={handleKeyDown} onBlur={handleEdit} autoFocus /> : <span className="task-text">{task.text}</span>}
            <div className="actions">
                <FontAwesomeIcon icon={faCheck} className="complete" onClick={handleDone} />
                <FontAwesomeIcon icon={faEdit} className="edit" onClick={() => setEdit(!edit)} />
                <FontAwesomeIcon icon={faTrash} className="delete" onClick={() => handleDelete(task.id)} />
            </div>
    </li>
}