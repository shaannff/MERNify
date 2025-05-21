import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { logout } from '../redux/slice'

function Navbar() {
  const user = useSelector((state)=>state.user.userInfo)
  const dispatch=useDispatch()
  const navigate = useNavigate()
  if(user){

    console.log(user)
  }

  const handleLogout=async(e)=>{
    e.preventDefault()
    dispatch(logout())
    navigate('/')
  }
    return (
        <nav className="w-full bg-black text-white px-6 py-4 flex justify-between items-center shadow-md fixed top-0 left-0 z-50">
          {/* Left - Logo or Home */}
          <Link to={'/'}>
          <div className="text-2xl text-gray-300 font-bold ml-10">Home</div>

          </Link>
    
          {/* Right - Links */}


          {!user ?(
 <div className="flex gap-6 text-lg font-medium">
 <Link to={'/login'}>
 <button className="hover:text-gray-300 transition">Login</button>
 </Link>
 <Link to={'/regester'}>
 
 <button className="hover:text-gray-300 transition">Register</button>
 </Link>
</div>
          ):(
             <div className="flex gap-6 text-lg font-medium">
              <Link to={'/jokes'}>
              <button className="hover:text-gray-300 transition" > Memes</button>
              </Link>

            <button className="hover:text-gray-300 transition " onClick={handleLogout} > Logout</button>
  </div>
)}
          
         
        </nav>
      )
}

export default Navbar