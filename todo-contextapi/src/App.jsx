import { useState, useEffect } from 'react'
import './App.css'
import { Todoprovider } from './context'
import TodoItem from './Components/TodoItem'
import TodoForm from './Components/TodoForm'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length>0){
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  
  

  const addTodo = (todo) =>{
    setTodos((prev) =>[{id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) =>{
    setTodos((prev)=> prev.map((prevTodo)=> (prevTodo.is === id ? todo : prevTodo)))
  }

  const deleteTodo = (id)=>{
    setTodos((prev)=> prev.filter((prevTodo)=> prevTodo.id !== id))
  }

  const toggleComplete = (id) =>{
    setTodos((prev)=> prev.map((todo)=> todo.id == id? {...todo, completed: !todo.completed} : "todo"))
  }

  return (
    <Todoprovider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            <TodoForm/>
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo)=>(
              <div key={todo.id} className='w-full'>
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Todoprovider>
  )
}

export default App
