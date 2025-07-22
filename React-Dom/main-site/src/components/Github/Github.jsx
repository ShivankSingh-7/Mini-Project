import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';
const Github = () => {
    // const [data, setdata] = useState([])

    // useEffect(()=>{
    //     fetch('https://api.github.com/users/ShivankSingh-7')
    //     .then(res => res.json())
    //     .then(data=>setdata(data))
    // },[])

    const data = useLoaderData();
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text flex items-center gap-4'>
      <img className='h-60 rounded-full' src={data.avatar_url} alt="" />
      <p className='font-bold text-5xl'>Github Followers: {data.followers}</p>
    </div>
  )
}

export default Github

export const githubInfoLoader = async()=>{
    const response = await fetch('https://api.github.com/users/ShivankSingh-7')
    return response.json()
}
