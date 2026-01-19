import React, { useState, useRef } from 'react'
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
    <div className='min-h-screen bg-gray-100 flex flex-col items-center py-10 font-sans'>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Todo List</h1>
      <div className="flex flex-col sm:flex-row gap-4 mb-8 w-full max-w-md px-4">
        <input 
          ref={inputTask} 
          type="text" 
          placeholder="Task..." 
          className="flex-grow p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
          onKeyDown={(e) => { if (e.keyCode === 13) addTask() }} 
          onChange={e => setCurrentTask(e.target.value)} 
        />
        <button 
          onClick={addTask} 
          className='bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-transform transform active:scale-95 shadow-md font-medium whitespace-nowrap'
        >
          Add Task
        </button>
      </div>
      
      {todo.length > 0 && <div className="w-full max-w-3xl px-4 border-t border-gray-300 pt-8" />}
      
      <ul className="w-full max-w-3xl px-4 space-y-4">
        {todo?.map((val, key) => (
          <div 
            key={key} 
            className={`flex flex-col md:flex-row items-center justify-between p-4 rounded-xl shadow-md transition-all hover:shadow-lg bg-white border-l-4 ${val.completed ? 'border-green-400' : 'border-orange-400'}`}
          >
            <div className={`flex-grow text-lg font-medium px-4 py-2 rounded-md mb-4 md:mb-0 md:mr-4 w-full md:w-auto ${val.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
              {val.task}
            </div>
            
            <div className="flex items-center gap-4">
               <span className={`text-sm font-semibold ${val.completed ? 'text-green-600' : 'text-orange-600'}`}>
                 {val.completed ? "Done" : "Pending"}
               </span>

              <button 
                onClick={() => completeTask(val.task)} 
                className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors shadow-sm ${val.completed ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'}`}
                disabled={val.completed}
              >
                {val.completed ? "Completed" : "Complete"}
              </button>
              
              <button 
                onClick={() => deleteTask(val.task)}
                className="p-2 rounded-full hover:bg-red-50 transition-colors"
                title="Delete"
              >
                <img src={deleteIcon} className="w-6 h-6" alt="delete" />
              </button>
            </div>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default Todo;