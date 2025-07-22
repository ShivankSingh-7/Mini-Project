import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
function App() {
  const [todo, settodo] = useState([])
  const [todos, settodos] = useState([])

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  
  }, [])
  

  const saveToLs = (params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }])
    settodo("")
    saveToLs()
  }
  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    settodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    })

    settodos(newTodos)

    saveToLs()
  }
  const handleDel = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })

    settodos(newTodos)
    saveToLs()
  }

  const handleChange = (e) => {
    settodo(e.target.value)
  }

  const handleCheckbx = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)

    saveToLs()
  }


  return (
    <>
      <Navbar />
      <div className="container mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <div className="addTodo">
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} className='w-1/2 bg-white outline-0 text-sm p-1 rounded-xl px-5 font-bold' type="text" name="" id="" />
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md m-6'>Add</button>
        </div>
        <h2 className='text-xl font-bold'>Your Todos</h2>
        <div className='todos'>
          {todos.length === 0 && <div className='bg-amber-700 w-1/3 flex justify-center my-5 rounded-xl text-white font-bold px-2'>No Todos to display</div>}
          {todos.map(item => {
            return (
              <div key={item.id} className="todo flex gap-2 w-1/2 justify-between my-3">
                <div className='flex gap-5'>
                  <input name={item.id} onChange={handleCheckbx} type="checkbox" value={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex gap-1">
                  <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>edit</button>
                  <button onClick={(e) => { handleDel(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>delete</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
