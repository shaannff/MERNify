import React, { useState } from 'react'
import darklog from '../assets/darklog.jpg'
import axios from 'axios';
import { setUser } from '../redux/slice'
import { useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'


const Login = () => {

  const backendURL = 'http://localhost:7000/api/auth';
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formData,setFormData]=useState({
    email:'',
    password:''
  })
  const [err,setErr]=useState('')
  const [showerr,setErrShow]=useState(false)
  const onChangeHandle = async(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const {email,password}=formData

    if(!email || !password){
      setErrShow(true)
      setErr('please fill the form ')
      return
    }
    const res = await axios.post(`${backendURL}/login`,formData)
    if(res.status == 400){
          setErrShow(true)
          setErr(res.data)
          return
        }
        console.log(res.data)
        const {token ,user}=res.data
        localStorage.setItem('token',token)
        dispatch(setUser(res.data))
        navigate('/')

  }


  return (

    <div
          className="h-screen w-screen bg-cover bg-center flex items-center justify-center"
          style={{
            backgroundImage: `url(${darklog})`
          }}
        >
          <div className="bg-black bg-opacity-70 p-8 rounded-xl w-[90%] max-w-sm shadow-2xl backdrop-blur-md">
            <h2 className="text-white text-3xl font-bold mb-6 text-center">Login</h2>
            {showerr && (
              <h5 className='text-red-500 text-center'>{err}</h5>
            )  }
    
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
             
              <input
                type="email"
                name='email'
                value={formData.email}
                placeholder="Email"
                onChange={onChangeHandle}
                className="p-3 rounded-md bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="password"
                name='password'
                value={formData.password}
                placeholder="Password"
                onChange={onChangeHandle}
                className="p-3 rounded-md bg-gray-900 text-white outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
              >
                login
              </button>
            </form>
          </div>
        </div>


  )
}

export default Login