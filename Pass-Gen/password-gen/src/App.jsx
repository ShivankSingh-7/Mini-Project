import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("")

  const passwordGenrator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += "!@#$%^&*~?|"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length)
      pass += str.charAt(char);
    }
    setPassword(pass);

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenrator()
  }, [length, numberAllowed, charAllowed])

  const copypass = useCallback(()=>{
    window.navigator.clipboard.writeText(password)
  },[password])
  
  const passwordref = useRef(null)

  return (
    <>
      <div className='bg-black w-[100vw] h-[100vh] items-center flex flex-col gap-5'>
        <h1 className='text-4xl text-white'>Pass-Gen</h1>
        <div className="container w-1/2 h-1/4 bg-slate-900 p-2">
          <div className="password">
            <input ref={passwordref} className='w-2/3 bg-white rounded-l-lg px-2 py-1 text-lg outline-0' type="text" value={password} placeholder='password' readOnly />
            <button onClick={copypass} className='bg-blue-900 text-white font-bold active:bg-blue-500  px-2 py-1 text-lg rounded-r-lg'>copy</button>
          </div>
          <div className="container2 mt-6 flex gap-3">
            <div className="length flex align-middle gap-2">
              <input type="range"
                min={5}
                max={100}
                value={length}
                onChange={(e) => { setlength(e.target.value) }}
              />
              <label className='text-white'>Length: {length}</label>
            </div>
            <div className="checkBox flex gap-2">
              <input type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={()=>{
                  setNumberAllowed((prev)=>!prev)
                }}
              />
              <label className='text-white'>Numbers</label>
            </div>
            <div className="checkBox flex gap-2">
              <input type="checkbox"
                defaultChecked={charAllowed}
                id="charInput"
                onChange={()=>{
                  setCharAllowed((prev)=>!prev)
                }}
              />
              <label className='text-white'>Characters</label>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
