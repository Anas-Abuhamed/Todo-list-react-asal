import TaskItem from "./TaskItem";

export default function TaskList({filteredTasks, tasks, setTasks, setMessagePopup}) {
    return (
        <ul id="task-list">
            {filteredTasks.map(task => {
                return <TaskItem key={task.id} task={task} tasks={tasks} setTasks={setTasks} setMessagePopup={setMessagePopup} />
            })}
        </ul>
    );
}