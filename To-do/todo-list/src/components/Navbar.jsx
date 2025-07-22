import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='bg-slate-700 flex gap-6'>
        <div className="logo p-2">
            <span className='font-bold text-xl text-white'>Skies-list</span>
        </div>
        <ul className='flex gap-8 text-white text-center'>
            <li className='cursor-pointer hover:bg-slate-500 rounded-full px-4 m-2 py-1'>home</li>
            <li className='cursor-pointer hover:bg-slate-500 rounded-full px-4 m-2 py-1'>settings</li>
            <li className='cursor-pointer hover:bg-slate-500 rounded-full px-4 m-2 py-1'>services</li>
            <li className='cursor-pointer hover:bg-slate-500 rounded-full px-4 m-2 py-1'>about us</li>
            <li className='cursor-pointer hover:bg-slate-500 rounded-full px-4 m-2 py-1'>sign-in</li>
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
