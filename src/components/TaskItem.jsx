import { faCheck, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Input from "./Input";
const TaskItem = ({ task, tasks, setTasks, setMessagePopup }) => {
    const [done, setDone] = useState(task.done);
    const [edit, setEdit] = useState(false);
    const [textInput, setTextInput] = useState(task.text)
    function resetMode() {
        setTextInput(task.text);
        setEdit(false);
    }
    function handleDone() {
        setDone(!done);

        let editedTasks = [...tasks];
        editedTasks.forEach(targetTask => {
            if (targetTask.id === task.id)
                targetTask.done = !done;
        });
        setTasks(editedTasks);
    }
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            if (textInput.trim() === "") {
                resetMode()
                return;
            }
            handleEdit();

        }
        else if (e.key === "Escape") {
            resetMode()
        }
    }
    function handleDelete(id) {
        setMessagePopup({
            text: "Are you sure you want to delete this task?",
            onConfirm: () => {
                let newTasks = tasks.filter(task => task.id !== id);
                setTasks(newTasks);
            },
            onCancel: () => setEdit(false)
        });
    }
    function handleEdit() {
        setMessagePopup({
            text: "Are you sure you want to edit this task?",
            onConfirm: () => {
                let editedTasks = tasks.map(targetTask => {
                    if (targetTask.id === task.id)
                        return { ...targetTask, text: textInput };
                    return targetTask;
                });
                setTasks(editedTasks);
                setEdit(false);
            },
            onCancel: () => { setTextInput(task.text); setEdit(false); }
        });
    }

    return <li className={done ? "done" : null}>

        {edit ? <Input className="edit-input" type="text" value={textInput} setValue={setTextInput} keyDown={handleKeyDown} focus={true} /> : <span className="task-text">{task.text}</span>}
        <div className="actions">
            <FontAwesomeIcon icon={faCheck} className="complete" onClick={handleDone} />
            <FontAwesomeIcon icon={faEdit} className="edit" onClick={() => setEdit(!edit)} />
            <FontAwesomeIcon icon={faTrash} className="delete" onClick={() => handleDelete(task.id)} />
        </div>
    </li>
}
export default TaskItem