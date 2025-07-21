import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const[items, setitems] = useState([])

  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => setitems(data))
  },[])

  return (
    <>
      <div className="main bg-slate-800 w-[100vw] h-[100vh]">
        <nav className='bg-neutral-700'>
          <ul className='flex gap-8 p-2 text-white'>
            <li className='cursor-pointer px-6 py-2 hover:rounded-full hover:bg-black'>home</li>
            <li className='cursor-pointer px-6 py-2 hover:rounded-full hover:bg-black'>services</li>
            <li className='cursor-pointer px-6 py-2 hover:rounded-full hover:bg-black'>contacts</li>
            <li className='cursor-pointer px-6 py-2 hover:rounded-full hover:bg-black'>about us</li>
          </ul>
        </nav>
        <div className="container flex flex-wrap">
          {items.map(item=>{
            return(

              <div key={item.id} className="card border bg-amber-600">
              <p>`the user id is: {item.userId}`</p>
              <p>{item.title}</p>
              <p>{item.body}</p>
            </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
