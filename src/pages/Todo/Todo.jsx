import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import deleteIcon from '../../assets/delete.png';
import BackButton from '../../components/BackButton';

const Todo = () => {
  // Load todos from localStorage
  const [todo, setTodo] = useState(() => {
    try {
      const savedTodos = localStorage.getItem('todoList');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Error parsing local storage", error);
      return [];
    }
  });

  // New task form state
  const [newTask, setNewTask] = useState({
    text: "",
    priority: "Medium",
    category: "Personal",
    dueDate: ""
  });

  // Search and Filter state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPriority, setFilterPriority] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const inputTaskRef = useRef(null);

  // Save to localStorage whenever todo list changes
  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todo));
  }, [todo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({ ...prev, [name]: value }));
  };

  const addTask = () => {
    if (newTask.text.trim() === '') {
      Swal.fire({
        icon: "error",
        title: "Please add a task!",
      });
      return;
    }

    const taskToAdd = {
      id: Date.now(),
      task: newTask.text,
      priority: newTask.priority,
      category: newTask.category,
      dueDate: newTask.dueDate,
      completed: false
    };

    setTodo([...todo, taskToAdd]);
    setNewTask({ text: "", priority: "Medium", category: "Personal", dueDate: "" });
    if(inputTaskRef.current) inputTaskRef.current.focus();
  };

  const deleteTask = (id) => {
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
        setTodo(todo.filter((t) => t.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Your task has been deleted.",
          icon: "success"
        });
      }
    });
  };

  const completeTask = (id) => {
    setTodo(todo.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
    // Optional feedback for completion could go here, but might be too noisy if user toggles fast
  };

  // Filter Logic
  const filteredTodos = todo.filter(t => {
    const matchesSearch = t.task.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === "All" || t.priority === filterPriority;
    const matchesCategory = filterCategory === "All" || t.category === filterCategory;
    const matchesStatus = filterStatus === "All" || 
                          (filterStatus === "Completed" && t.completed) || 
                          (filterStatus === "Pending" && !t.completed);
    
    return matchesSearch && matchesPriority && matchesCategory && matchesStatus;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityBorder = (priority) => {
    switch (priority) {
        case 'High': return 'border-red-400';
        case 'Medium': return 'border-yellow-400';
        case 'Low': return 'border-green-400';
        default: return 'border-gray-300';
      }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center py-10 font-sans relative px-4'>
      <BackButton />
      <h1 className="text-4xl font-bold text-gray-800 mb-8 mt-4">Todo List</h1>

      {/* Add Task Form */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Task</h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <input 
            ref={inputTaskRef}
            name="text"
            value={newTask.text}
            onChange={handleInputChange}
            type="text" 
            placeholder="What needs to be done?" 
            className="col-span-1 md:col-span-5 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onKeyDown={(e) => { if (e.key === 'Enter') addTask() }} 
          />
          
          <div className="col-span-1 md:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-2">
            <select 
                name="priority" 
                value={newTask.priority} 
                onChange={handleInputChange}
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
            </select>

            <select 
                name="category" 
                value={newTask.category} 
                onChange={handleInputChange}
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Shopping">Shopping</option>
                <option value="Health">Health</option>
                <option value="Others">Others</option>
            </select>

            <input 
                name="dueDate"
                value={newTask.dueDate}
                onChange={handleInputChange}
                type="date" 
                className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            
            <button 
                onClick={addTask} 
                className='bg-orange-500 text-white p-3 rounded-lg hover:bg-orange-600 transition-all shadow-md font-medium whitespace-nowrap'
            >
                Add
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
         <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="w-full md:w-1/3">
                <input 
                type="text" 
                placeholder="🔍 Search tasks..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 outline-none"
                />
            </div>
            
            <div className="w-full md:w-2/3 flex flex-wrap gap-2 justify-end">
                <select 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="p-2 rounded-lg border border-gray-300 outline-none text-sm"
                >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>
                
                <select 
                    value={filterPriority} 
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="p-2 rounded-lg border border-gray-300 outline-none text-sm"
                >
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <select 
                    value={filterCategory} 
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="p-2 rounded-lg border border-gray-300 outline-none text-sm"
                >
                    <option value="All">All Categories</option>
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Health">Health</option>
                    <option value="Others">Others</option>
                </select>
            </div>
         </div>
      </div>

      {/* Todo List */}
      <ul className="w-full max-w-4xl space-y-4 pb-10">
        {filteredTodos.length === 0 ? (
            <div className="text-center text-gray-500 mt-10 text-lg">
                {todo.length === 0 ? "Start by adding a task above!" : "No tasks match your filters."}
            </div>
        ) : (
            filteredTodos.map((val) => (
              <div 
                key={val.id} 
                className={`flex flex-col md:flex-row items-start md:items-center justify-between p-4 rounded-xl shadow-sm hover:shadow-md transition-all bg-white border-l-4 
                ${val.completed ? 'border-gray-400 bg-gray-50' : getPriorityBorder(val.priority)}`}
              >
                <div className="flex-grow w-full md:w-auto mb-4 md:mb-0 md:mr-4">
                    <div className="flex items-center gap-3 mb-1">
                        <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${getPriorityColor(val.priority)}`}>
                            {val.priority}
                        </span>
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-700">
                            {val.category}
                        </span>
                        {val.dueDate && (
                            <span className="text-xs text-gray-500 flex items-center gap-1">
                                📅 {val.dueDate}
                            </span>
                        )}
                    </div>
                    <div className={`text-lg font-medium break-all ${val.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                        {val.task}
                    </div>
                </div>
                
                <div className="flex items-center gap-3 self-end md:self-center">
                  <button 
                    onClick={() => completeTask(val.id)} 
                    className={`px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors shadow-sm w-28 text-center
                    ${val.completed ? 'bg-gray-400 hover:bg-gray-500' : 'bg-green-500 hover:bg-green-600'}`}
                  >
                    {val.completed ? "Undo" : "Complete"}
                  </button>
                  
                  <button 
                    onClick={() => deleteTask(val.id)}
                    className="p-2 rounded-full hover:bg-red-50 transition-colors text-red-500"
                    title="Delete"
                  >
                    <img src={deleteIcon} className="w-5 h-5 opacity-70 hover:opacity-100" alt="delete" />
                  </button>
                </div>
              </div>
            ))
        )}
      </ul>
    </div>
  )
}

export default Todo;