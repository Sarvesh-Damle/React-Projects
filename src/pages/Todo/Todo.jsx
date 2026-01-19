import React, { useState, useRef } from 'react'
import './Todo.css'
import Swal from 'sweetalert2'
import deleteIcon from '../../assets/delete.png';

const Todo = () => {
  const [todo, setTodo] = useState([])
  const [currentTask, setCurrentTask] = useState("")
  const inputTask = useRef(null)

  // add task
  const addTask = () => {
    // empty task
    if (currentTask === '') {
      Swal.fire({
        icon: "error",
        title: "Please add a task!",
      });
      return;
    }

    // duplicate task
    if (todo.find(t => t.task.toLowerCase() === currentTask.toLowerCase())) {
      Swal.fire({
        icon: "error",
        title: "Duplicate task!",
        text: "This task is already in your todo list."
      });
      return;
    }
    setTodo([...todo, { task: currentTask, completed: false }]);
    inputTask.current.value = "";
    setCurrentTask("")
  }

  // delete task
  const deleteTask = (taskToDelete) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setTodo(todo.filter((t) => {
          return t.task !== taskToDelete
        }))
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success"
        });
      }
    });
  }

  // complete task
  const completeTask = (taskToComplete) => {
    setTodo(todo.map(t => {
      return t.task === taskToComplete ? { task: taskToComplete, completed: true } : { task: t.task, completed: t.completed }
    }))
    Swal.fire({
      title: "Good job!",
      text: "You completed the task!",
      icon: "success"
    });
  }
  

  return (
    <div className='Todo'>
      <h1>Todo List</h1>
      <div>
        <input ref={inputTask} type="text" placeholder="Task..." onKeyDown={(e) => { if (e.keyCode === 13) addTask() }} onChange={e => setCurrentTask(e.target.value)} />
        <button onClick={addTask} className='todo-buttons'>Add Task</button>
        {/* Or no need of useRef and .current.value line, just add this value={currentTask} in input and you are done*/}
      </div>
      {todo.length > 0 && <hr />}
      <ul>
        {todo?.map((val, key) => (
          <div id="task" key={key} className={val.completed ? 'task-completed' : 'task-pending'}>
            <li key={key}>{val.task}</li>
            <button onClick={() => completeTask(val.task)} className='todo-buttons' disabled={val.completed}>{val.completed ? "Completed" : "Complete"}</button>
            <img src={deleteIcon} width={40} height={40} alt="delete-icon" onClick={() => deleteTask(val.task)} className='deleteButton' />
            <h2>{val.completed ? "Task Completed!" : "Task Not Completed!"}</h2>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Todo;