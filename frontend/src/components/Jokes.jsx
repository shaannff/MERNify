import React, { useState } from 'react'
import Naam from '../assets/Naam.png'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Jokes = () => {


  useEffect(()=>{
    fetchJokes()
  },[])
    const backendURL = 'http://localhost:7000/api/auth';
    const user =useSelector((state)=>state.user.userInfo)

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isFormOpen,setIsFormOpen]=useState(false)
    const [category,setCategory]=useState('')
    const [joke,Setjoke]=useState('')
    const [err,seterr]=useState('')
    const [showJoke,setShowJoke]=useState([])
    
    const fetchJokes=async()=>{
      const res = await axios.get(`${backendURL}/getAllJokes`)
      console.log(res.data)
      setShowJoke(res.data.jokes)

    }

    const handleSubmitt =async(e)=>{
      seterr('')
      e.preventDefault()
      if(!category || !joke.trim()){
        seterr('please fill the fields')
        return 
      }
      console.log(user)
      const formdata={category,joke,user}
      const token = localStorage.getItem('token');


      const res = await axios.post(`${backendURL}/addjokes`,formdata,{
        headers:{
                  Authorization: `Bearer ${token}`, // ✅ Send token to backend

        },
      })
      console.log(res.data)
      setIsFormOpen(false)
      setCategory('')
      Setjoke('')
      fetchJokes()
    }

    const categoryBasedFilter=async(wantedCategory)=>{
      console.log(1122)
      const res = await axios.get(`${backendURL}/categoryBased`,{
          params: { category: wantedCategory }

      })
      console.log(res.data)
      setShowJoke([])
      setShowJoke(res.data.jokes)
    }

  return (
    <div className='h-screen w-screen bg-black overflow-hidden relative'>

    

      <div  className="w-[100%] h-[100%] mx-auto mt-20 rounded-xl overflow-hidden shadow-lg">
        {/* <img src={Naam} alt=""  className="w-full h-full object-cover"/> */}


        <button className="absolute top-4 left-4 z-20 pt-[5%] text-white text-3xl focus:outline-none" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>☰</button>
        <button className="absolute top-4 right-4 z-20 pt-[6%]  text-white text-shadow-md px-4 py-2 rounded-b-md shadow" onClick={()=>setIsFormOpen(true)} >Add Jokes</button>

         <div
        className={`fixed top-0 left-0 h-full w-60 bg-gray-900 text-white p-4 z-10 transform  ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
        >
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul className="space-y-2 pt-[30%]">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={()=>categoryBasedFilter('Funny')}>Funny</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={()=>categoryBasedFilter('18+')}>18+</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={()=>categoryBasedFilter('Dirtymind')}>Dirty mind</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={()=>categoryBasedFilter('Sarcasm')}>Sarcasm</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={()=>categoryBasedFilter('All')}>All</li>
        </ul>
      </div>

       <div className="p-4 pt-10">
      {showJoke.map((joke) => (
        <div key={joke._id} className="bg-black p-1 rounded shadow mb-4 place-self-center">
          <p className="text-white ">{joke.text}</p>
          {/* <small className="text-gray-600">Category: {joke.category}</small> */}
        </div>
      ))}
    </div>


      </div>


      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white text-black rounded-lg p-6 w-full max-w-md shadow-lg relative">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-500 text-2xl leading-none hover:text-gray-800"
              onClick={() => setIsFormOpen(false)}
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4">Add a Joke</h2>
            {err&& <h4 className='text-red-500 place-self-center'>{err}</h4>}
            <form onSubmit={handleSubmitt} className="flex flex-col gap-4">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-2 rounded border"
              >
                <option value="">Select Category</option>
                <option value="Funny">Funny</option>
                <option value="18+">18+</option>
                <option value="Dirtymind">Dirty Minded</option>
                <option value="Sarcasm">Sarcasm</option>
              </select>
              <textarea
                value={joke}
                onChange={(e) => Setjoke(e.target.value)}
                placeholder="Enter your joke..."
                rows="3"
                className="p-2 rounded border"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

 

    </div>
  )
}

export default Jokes