import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { setUser } from '../redux/slice'
import { useDispatch } from 'react-redux'
import darklog from '../assets/darklog.jpg'
import axios from 'axios'

const Regester = () => {
  const backendURL = 'http://localhost:7000/api/auth';
  const navigate =useNavigate()
  const dispatch = useDispatch()
  const [formdata ,setFormData]=useState({
    name:'',
    email:'',
    password:''
  })


  const [err,seterr]=useState('')
  const [showerr,showErrSet]=useState(false)
  const  handleChange=(e)=>{
    setFormData({
      ...formdata,
      [e.target.name]:e.target.value
    })
  }
 const  handleSubmitt=async(e)=>{
  e.preventDefault()
  console.log(formdata)
  const {name,email,password}=formdata
  console.log(name,email,password)

  if(!name || !email||!password){
    showErrSet(true)
    seterr('please fill the form ') 
    return
  }

  try{  
    const res = await axios.post(`${backendURL}/register`,formdata)
    if(res.status == 400){
      showErrSet(true)
      seterr(res.data)
      return
    }
      const {token ,user}=res.data
      localStorage.setItem('token',token)
    dispatch(setUser(res.data))
    navigate('/')

  }catch(err){
    console.log(err,'from the register side ')
  }
  
  }
  return (
<div
      className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${darklog})`
      }}
    >
      <div className="bg-black bg-opacity-70 p-8 rounded-xl w-[90%] max-w-sm shadow-2xl backdrop-blur-md">
        <h2 className="text-white text-3xl font-bold mb-6 text-center">Register</h2>
        {showerr&&(
          <h5 className='text-red-500 text-center'>{err}</h5>
        )}

        <form className="flex flex-col space-y-4" onSubmit={handleSubmitt}>
          <input
            type="text"
            name='name'
            placeholder="Username"
            value={formdata.name}
            onChange={handleChange}
            className="p-3 rounded-md bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="email"
            name='email'
            value={formdata.email}
            onChange={handleChange}
            placeholder="Email"
            className="p-3 rounded-md bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="password"
            name='password'
            value={formdata.password}
            onChange={handleChange}
            placeholder="Password"
            className="p-3 rounded-md bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>  )
}

export default Regester